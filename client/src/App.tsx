import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { HighContrastProvider } from "@/components/HighContrastToggle";
import { KeyboardNavProvider } from "@/components/KeyboardNav";
import Dashboard from "@/pages/Dashboard";
import ClusterBuilder from "@/pages/ClusterBuilder";
import BallotPresentation from "@/pages/BallotPresentation";
import NotFound from "@/pages/not-found";
import './lib/i18n';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/cluster-builder" component={ClusterBuilder} />
      <Route path="/ballot-presentation" component={BallotPresentation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HighContrastProvider>
          <KeyboardNavProvider>
            <TooltipProvider>
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <Toaster />
              <Router />
            </TooltipProvider>
          </KeyboardNavProvider>
        </HighContrastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
