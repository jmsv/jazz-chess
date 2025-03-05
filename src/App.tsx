import { SignInButton } from "@clerk/clerk-react";
import { useAccount, useIsAuthenticated } from "jazz-react";
import { ChessBoard } from "./ChessBoard";

function App() {
  const { me, logOut } = useAccount();

  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <div className="container">
        <h1>You're logged in</h1>
        <p>Welcome back, {me?.profile?.name}</p>
        <ChessBoard />
        <button onClick={() => logOut()}>Logout</button>
      </div>
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
