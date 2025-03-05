import { Chess, Move } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

interface ChessBoardProps {}

export const ChessBoard: React.FC<ChessBoardProps> = () => {
  const [game, setGame] = useState(new Chess());
  const [currentTimeout, setCurrentTimeout] = useState<number>();

  const safeGameMutate = (modify: (_game: Chess) => void) => {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  };

  return (
    <div>
      <Chessboard
        id="PlayVsRandom"
        position={game.fen()}
        customDarkSquareStyle={{ backgroundColor: "#9a8fff" }}
        customLightSquareStyle={{ backgroundColor: "#edebff" }}
        onPieceDrop={(sourceSquare, targetSquare, piece) => {
          let move: Move | null = null;

          safeGameMutate((x) => {
            try {
              move = x.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: piece.toLowerCase() ?? "q",
              });
            } catch (_error) {
              move = null;
            }
          });

          if (move === null) return false;

          function makeRandomMove() {
            safeGameMutate((x) => {
              const possibleMoves = x.moves();
              if (x.isGameOver() || x.isDraw() || possibleMoves.length === 0) {
                return x;
              }
              const randomIndex = Math.floor(
                Math.random() * possibleMoves.length
              );
              x.move(possibleMoves[randomIndex]);
            });
          }

          setCurrentTimeout(setTimeout(makeRandomMove, 500));

          return true;
        }}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      />
      <button
        onClick={() => {
          clearTimeout(currentTimeout);
          safeGameMutate((x) => x.reset());
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          clearTimeout(currentTimeout);
          safeGameMutate((x) => x.undo());
        }}
      >
        undo
      </button>
    </div>
  );
};
