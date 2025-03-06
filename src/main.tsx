import { ClerkProvider, useClerk } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { JazzProviderWithClerk } from "jazz-react-auth-clerk";
import { dark } from "@clerk/themes";
import { apiKey } from "./apiKey";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk publishable key to the .env.local file");
}

function JazzProvider({ children }: { children: React.ReactNode }) {
  const clerk = useClerk();

  return (
    <JazzProviderWithClerk
      clerk={clerk}
      sync={{
        peer: `wss://cloud.jazz.tools/?key=${apiKey}`,
        when: "signedUp",
      }}
    >
      {children}
    </JazzProviderWithClerk>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{ baseTheme: dark }}
      >
        <JazzProvider>
          <App />
        </JazzProvider>
      </ClerkProvider>
    </HashRouter>
  </StrictMode>
);
