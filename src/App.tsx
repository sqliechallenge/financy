import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AllAssetsPage from "./pages/AllAssetsPage";
import SettingsPage from "./pages/SettingsPage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import { ThemeProvider } from "./components/ui/theme-provider";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assets" element={<AllAssetsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/ai-advisor" element={<AIAdvisorPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
