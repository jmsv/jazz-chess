import { useState } from "react";
import { ChessBoard } from "./ChessBoard";
import { Chess, Move } from "chess.js";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

interface ChessGameProps {}

export const ChessGame: React.FC<ChessGameProps> = () => {
  const [game, setGame] = useState(new Chess());

  const safeGameMutate = (modify: (_game: Chess) => void) => {
    setGame((g) => {
      const newGame = new Chess(g.fen());
      modify(newGame);
      return newGame;
    });
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    let move: Move | null = null;

    safeGameMutate((x) => {
      try {
        move = x.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase(),
        });
      } catch (error) {
        console.error(error);
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
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        x.move(possibleMoves[randomIndex]);
      });
    }

    setTimeout(makeRandomMove, 500);

    return true;
  };

  return (
    <div>
      <ChessBoard
        id="TODO"
        game={game}
        boardOrientation="black"
        onPieceDrop={onDrop}
      />
    </div>
  );
};
