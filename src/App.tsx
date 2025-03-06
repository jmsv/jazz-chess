import { SignInButton } from "@clerk/clerk-react";
import { useIsAuthenticated } from "jazz-react";
import { Route, Routes } from "react-router";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { Layout } from "./components/layout/Layout";

function App() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="game">
            <Route path=":gameId" element={<Game />} />
          </Route>
        </Route>
      </Routes>
    );
  }

  return (
    <div className="container">
      <h1>You're not logged in</h1>
      <SignInButton />
    </div>
  );
}

export default App;
