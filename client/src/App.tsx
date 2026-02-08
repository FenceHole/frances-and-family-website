import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Family from "@/pages/family";
import MediaKit from "@/pages/media-kit";
import Socials from "@/pages/socials";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/family" component={Family} />
      <Route path="/media-kit" component={MediaKit} />
      <Route path="/socials" component={Socials} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
