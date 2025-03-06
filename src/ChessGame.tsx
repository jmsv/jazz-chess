import { ID } from "jazz-tools";
import { ChessBoard } from "./ChessBoard";
import { useGame } from "./hooks/useGame";
import type { ChessGameState } from "./schema";
import {
  PlayerButton,
  PlayerButtonSpectate,
} from "./components/chess/PlayerButton";

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
      <div className="px-4 py-12 flex flex-col flex-1 gap-8 items-center">
        <h2 className="text-5xl font-display">Join game</h2>

        <div className="flex gap-4 flex-wrap">
          <PlayerButton
            color="white"
            onClick={() => joinGame("white")}
            disabled={Boolean(players.white)}
          />
          <PlayerButton
            color="black"
            onClick={() => joinGame("black")}
            disabled={Boolean(players.black)}
          />
          <PlayerButtonSpectate onClick={() => joinGame("spectator")} />
        </div>
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
