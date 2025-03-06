import { useAccount } from "jazz-react";
import { Group } from "jazz-tools";
import { useNavigate } from "react-router";
import { ChessGameState, ChessGameMoves } from "../schema";
import { Button } from "@/components/ui/button";

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
    <div className="p-4 flex flex-col flex-1 gap-4 items-center">
      <Button onClick={() => startGame()}>Start a new game</Button>
    </div>
  );
}

export default Home;
