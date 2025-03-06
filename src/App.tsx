import { Route, Routes } from "react-router";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { Layout } from "./components/layout/Layout";

function App() {
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

export default App;
