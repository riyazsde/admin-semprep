import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutes from "./Routes/Route";
import { ScrollToTop } from "./utils/utils";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={3000}
        toastOptions={{
          style: {
            borderRadius: "10px",
            fontSize: "14px",
          },
        }}
      />
      <ScrollToTop />
      <Routes>
        {allRoutes.map((routeConfig, index) => (
          <Route
            path={routeConfig.route}
            element={routeConfig.component}
            key={`routeConfig${index}`}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;