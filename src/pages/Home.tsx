import { useAccount } from "jazz-react";
import { Group } from "jazz-tools";
import { useNavigate } from "react-router";
import { ChessGameState, ChessGameMoves } from "../schema";

function Home() {
  const { me } = useAccount();

  const navigate = useNavigate();

  const startGame = () => {
    if (!me) return;

    const group = Group.create();
    group.addMember("everyone", "writer");

    const white = Math.random() > 0.5;

    const game = ChessGameState.create(
      {
        whitePlayer: white ? me : undefined,
        blackPlayer: white ? undefined : me,
        moves: ChessGameMoves.create([], group),
      },
      group
    );

    navigate(`/game/${game.id}`);
  };

  return (
    <div className="container">
      <h1>Welcome!</h1>
      <button onClick={() => startGame()}>Start a new game</button>
    </div>
  );
}

export default Home;
