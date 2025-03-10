import { useParams } from "react-router";
import { ID } from "jazz-tools";

import { ChessGame } from "../ChessGame";
import type { ChessGameState } from "../schema";

function Game() {
  const { gameId } = useParams() as { gameId?: ID<ChessGameState> };
  if (typeof gameId !== "string") throw new Error("Game ID is required");

  return (
    <div className="flex flex-1 flex-col p-4">
      <ChessGame gameId={gameId} />
    </div>
  );
}

export default Game;
