import { ID } from "jazz-tools";
import { ChessBoard } from "./ChessBoard";
import { useGame } from "./hooks/useGame";
import type { ChessGameState } from "./schema";

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
      <div>
        <button
          disabled={Boolean(players.white)}
          onClick={() => joinGame("white")}
        >
          Join as White
        </button>

        <button
          disabled={Boolean(players.black)}
          onClick={() => joinGame("black")}
        >
          Join as Black
        </button>

        <button onClick={() => joinGame("spectator")}>Spectate</button>
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
