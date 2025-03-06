import { useClerk } from "@clerk/clerk-react";
import { useIsAuthenticated } from "jazz-react";
import { Link, Outlet } from "react-router";
import { Button } from "../ui/button";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const clerk = useClerk();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-center items-center h-16 text-foreground underline underline-offset-4 decoration-primary">
        <Link to="/">
          <h1 className="text-3xl font-display text-center font-bold">
            Jazz Chess
          </h1>
        </Link>
      </header>

      <main className="flex flex-1 flex-col">
        {isAuthenticated ? (
          children ?? <Outlet />
        ) : (
          <div className="flex flex-col gap-8 px-4 py-16 items-center">
            <h2 className="text-5xl font-display">Let's play!</h2>

            <Button size="lg" onClick={() => clerk.redirectToSignIn()}>
              Sign in
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
