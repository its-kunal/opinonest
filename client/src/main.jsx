import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import AppContextProvider from "./hooks/useAppContext.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fbbf24",
    },
  },
  typography: {
    fontFamily: ["poppins"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </AppContextProvider>
  </React.StrictMode>
);
