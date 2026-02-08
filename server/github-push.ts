import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', '.cache', '.local', '.config', '.upm', '__pycache__', 'server/public']);
const IGNORE_FILES = new Set(['.DS_Store', '.replit', 'replit.nix', '.gitattributes']);
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB GitHub limit

function shouldInclude(filePath: string): boolean {
  const parts = filePath.split('/');
  for (const dir of IGNORE_DIRS) {
    if (parts.includes(dir)) return false;
    if (filePath.startsWith(dir)) return false;
  }
  if (IGNORE_FILES.has(path.basename(filePath))) return false;
  if (filePath.endsWith('.tar.gz')) return false;
  return true;
}

function getAllFiles(dir: string, baseDir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (!shouldInclude(relativePath)) continue;
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const stat = fs.statSync(fullPath);
      if (stat.size < MAX_FILE_SIZE) {
        files.push(relativePath);
      } else {
        console.log(`  Skipping (too large): ${relativePath} (${(stat.size / 1024 / 1024).toFixed(1)}MB)`);
      }
    }
  }
  return files;
}

function isTextFile(filePath: string): boolean {
  const textExtensions = new Set([
    '.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md', '.txt',
    '.yml', '.yaml', '.toml', '.env', '.sql', '.sh', '.gitignore', '.lock',
    '.svg', '.xml', '.mjs', '.cjs', '.npmrc'
  ]);
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath).toLowerCase();
  if (textExtensions.has(ext)) return true;
  if (basename === '.gitignore' || basename === 'dockerfile' || basename === 'makefile') return true;
  return false;
}

async function pushToGitHub() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;
  const repo = 'frances-and-family-website';
  
  console.log(`\nPushing to github.com/${owner}/${repo}...`);
  
  const baseDir = '/home/runner/workspace';
  const files = getAllFiles(baseDir, baseDir);
  console.log(`Found ${files.length} files to upload\n`);

  // Initialize empty repo first if needed
  let currentSha: string | undefined;
  try {
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    currentSha = ref.object.sha;
    console.log('Found existing main branch');
  } catch (e) {
    console.log('Empty repo - initializing with README...');
    await octokit.repos.createOrUpdateFileContents({
      owner, repo,
      path: 'README.md',
      message: 'Initial commit',
      content: Buffer.from('# Frances and Family Website\n\nFull source code backup from Replit.\n').toString('base64'),
    });
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    currentSha = ref.object.sha;
    console.log('Repo initialized');
  }

  // Get current tree
  const { data: currentCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: currentSha! });
  const baseTree = currentCommit.tree.sha;

  // Upload files in batches
  const treeItems: any[] = [];
  let uploaded = 0;
  const BATCH_SIZE = 5;
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(async (file) => {
      const fullPath = path.join(baseDir, file);
      try {
        const content = fs.readFileSync(fullPath).toString('base64');
        const { data: blob } = await octokit.git.createBlob({
          owner, repo,
          content,
          encoding: 'base64'
        });
        return { path: file, mode: '100644' as const, type: 'blob' as const, sha: blob.sha };
      } catch (err: any) {
        console.error(`  Error: ${file}: ${err.message}`);
        return null;
      }
    }));
    
    for (const item of results) {
      if (item) treeItems.push(item);
    }
    
    uploaded += batch.length;
    console.log(`  Uploaded ${Math.min(uploaded, files.length)}/${files.length} files...`);
  }

  // Create tree
  console.log('\nCreating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner, repo,
    tree: treeItems,
    base_tree: baseTree
  });

  // Create commit
  console.log('Creating commit...');
  const { data: commit } = await octokit.git.createCommit({
    owner, repo,
    message: 'Full backup from Replit - Frances and Family website',
    tree: tree.sha,
    parents: [currentSha!]
  });

  // Update ref
  await octokit.git.updateRef({ owner, repo, ref: 'heads/main', sha: commit.sha });

  console.log(`\nDone! All ${uploaded} files pushed to:`);
  console.log(`https://github.com/${owner}/${repo}`);
}

pushToGitHub().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
