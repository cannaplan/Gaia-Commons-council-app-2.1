import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import Dashboard from "@/pages/Dashboard";
import ClusterBuilder from "@/pages/ClusterBuilder";
import NotFound from "@/pages/not-found";
import './lib/i18n';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/cluster-builder" component={ClusterBuilder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
