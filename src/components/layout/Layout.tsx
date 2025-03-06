import { Link, Outlet } from "react-router";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-center items-center h-16 text-foreground underline underline-offset-4 decoration-primary">
        <Link to="/">
          <h1 className="text-3xl font-display text-center font-bold">
            Jazz Chess
          </h1>
        </Link>
      </header>

      <main className="flex flex-1 flex-col">{children ?? <Outlet />}</main>
    </div>
  );
};
