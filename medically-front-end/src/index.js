import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NavigationProgress } from "@mantine/nprogress";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="849400113254-u2khpt6rrpupmsc5h33ko6dmr6gfs5t8.apps.googleusercontent.com">
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NavigationProgress />
        <UserProvider>
          <App />
        </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
