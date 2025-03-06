import { ID } from "jazz-tools";
import { ChessBoard } from "./ChessBoard";
import { useGame } from "./hooks/useGame";
import type { ChessGameState } from "./schema";
import { Button } from "./components/ui/button";

interface ChessGameProps {
  gameId: ID<ChessGameState>;
}

export const ChessGame: React.FC<ChessGameProps> = ({ gameId }) => {
  const {
    game,
    playerColor,
    isReady,
    players,
    isUsersTurn,
    userIsSpectator,
    onDrop,
    joinGame,
  } = useGame(gameId);

  if (!isReady) return null;

  if (!playerColor && !userIsSpectator) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          variant="outline"
          size="lg"
          disabled={Boolean(players.white)}
          onClick={() => joinGame("white")}
        >
          Join as White
        </Button>

        <Button
          variant="outline"
          size="lg"
          disabled={Boolean(players.black)}
          onClick={() => joinGame("black")}
        >
          Join as Black
        </Button>

        <Button variant="outline" onClick={() => joinGame("spectator")}>
          Spectate
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ChessBoard
        id={gameId}
        game={game}
        onPieceDrop={onDrop}
        boardOrientation={playerColor ?? "white"}
        arePiecesDraggable={isUsersTurn}
      />
    </div>
  );
};
