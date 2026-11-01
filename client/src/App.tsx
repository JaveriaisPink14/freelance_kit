import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import { FeeCalculator, InvoiceGenerator, PricingCalculator, ProposalGenerator, ReplyGenerator } from "./pages/ToolPages";
import { AboutPage, BlogArticlePage, BlogPage, ContactPage, NotFoundPage, PolicyPage, TemplatesPage } from "./pages/ContentPages";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/fee-calculator" component={FeeCalculator} />
    <Route path="/pricing-calculator" component={PricingCalculator} />
    <Route path="/invoice-generator" component={InvoiceGenerator} />
    <Route path="/proposal-generator" component={ProposalGenerator} />
    <Route path="/client-reply-generator" component={ReplyGenerator} />
    <Route path="/templates" component={TemplatesPage} />
    <Route path="/blog" component={BlogPage} />
    <Route path="/blog/:slug" component={BlogArticlePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/contact" component={ContactPage} />
    <Route path="/privacy-policy"><PolicyPage path="/privacy-policy" /></Route>
    <Route path="/terms"><PolicyPage path="/terms" /></Route>
    <Route path="/disclaimer"><PolicyPage path="/disclaimer" /></Route>
    <Route path="/affiliate-disclosure"><PolicyPage path="/affiliate-disclosure" /></Route>
    <Route path="/404" component={NotFoundPage} />
    <Route component={NotFoundPage} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><Router /></ThemeProvider></ErrorBoundary>;
}
