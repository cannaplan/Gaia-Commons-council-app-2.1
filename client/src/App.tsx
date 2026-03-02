import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { HighContrastProvider } from "@/components/HighContrastToggle";
import { KeyboardNavProvider } from "@/components/KeyboardNav";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "@/pages/Dashboard";
import ClusterBuilder from "@/pages/ClusterBuilder";
import BallotPresentation from "@/pages/BallotPresentation";
import DAO from "@/pages/DAO";
import NotFound from "@/pages/not-found";
import './lib/i18n';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/cluster-builder" component={ClusterBuilder} />
      <Route path="/ballot-presentation" component={BallotPresentation} />
      <Route path="/dao" component={DAO} />
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
              <ErrorBoundary>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground">
                  Skip to main content
                </a>
                <Toaster />
                <Router />
              </ErrorBoundary>
            </TooltipProvider>
          </KeyboardNavProvider>
        </HighContrastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
