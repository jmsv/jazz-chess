import { NavLink } from "react-router";

function Home() {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <p>
        <NavLink to="/game/abc123">Start a new game</NavLink>
      </p>
    </div>
  );
}

export default Home;
