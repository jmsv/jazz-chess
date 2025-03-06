import { ID } from "jazz-tools";
import { ChessboardDnDProvider } from "react-chessboard";
import { useIsAuthenticated } from "jazz-react";
import { ChessBoard } from "./ChessBoard";
import { useGame } from "./hooks/useGame";
import type { ChessGameState } from "./schema";
import {
  PlayerButton,
  PlayerButtonSpectate,
} from "./components/chess/PlayerButton";
import { ChessPlayer } from "./components/chess/ChessPlayer";
import { cn } from "./lib/utils";
import { SignInButton } from "./components/layout/SignInButton";

interface ChessGameProps {
  gameId: ID<ChessGameState>;
}

export const ChessGame: React.FC<ChessGameProps> = ({ gameId }) => {
  const isAuthenticated = useIsAuthenticated();

  const {
    game,
    playerColor,
    isReady,
    players,
    whosTurn,
    userIsSpectator,
    onDrop,
    joinGame,
  } = useGame(gameId);

  if (!isReady) return null;

  if (!playerColor && !userIsSpectator) {
    return (
      <div className="px-4 py-12 flex flex-col flex-1 gap-8 items-center">
        <h2 className="text-5xl font-display">Join game</h2>

        {!isAuthenticated && (
          <SignInButton text="Sign in to join as a player" />
        )}

        <div className="flex gap-4 flex-wrap">
          <PlayerButton
            color="white"
            onClick={() => joinGame("white")}
            disabled={Boolean(players.white) || !isAuthenticated}
          />

          <PlayerButton
            color="black"
            onClick={() => joinGame("black")}
            disabled={Boolean(players.black) || !isAuthenticated}
          />

          <PlayerButtonSpectate onClick={() => joinGame("spectator")} />
        </div>
      </div>
    );
  }

  const reverse = playerColor === "black";

  return (
    <ChessboardDnDProvider>
      <div className="max-w-[65vh] mx-auto w-full">
        <div
          className={cn("flex flex-col gap-4", {
            "flex-col-reverse": reverse,
          })}
        >
          <ChessPlayer
            color="black"
            player={players.black}
            active={whosTurn.color === "b"}
            reverse={reverse}
          />

          <ChessBoard
            id={gameId}
            game={game}
            onPieceDrop={onDrop}
            boardOrientation={playerColor ?? "white"}
            arePiecesDraggable={whosTurn.isMe}
          />

          <ChessPlayer
            color="white"
            player={players.white}
            active={whosTurn.color === "w"}
            reverse={reverse}
          />
        </div>
      </div>
    </ChessboardDnDProvider>
  );
};
