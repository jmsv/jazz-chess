import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-center items-center h-16 border-b-4 border-x-4 border-foreground bg-gradient-to-t from-indigo-600 via-indigo-700 to-indigo-800 rounded-b-lg">
        <Link to="/">
          <h1 className="text-3xl font-display text-center font-bold">
            Jazz Chess
          </h1>
        </Link>
      </header>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
