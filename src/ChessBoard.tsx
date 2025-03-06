import { Chess } from "chess.js";
import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import type {
  CustomPieces,
  Piece,
} from "react-chessboard/dist/chessboard/types";

const USE_CUSTOM_PIECES = true;

interface ChessBoardProps
  extends Omit<React.ComponentProps<typeof Chessboard>, "position"> {
  game: Chess;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ game, ...props }) => {
  const customPieces = useMemo(() => {
    const pieceComponents: CustomPieces = {};
    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/pieces/${piece}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
    });

    return pieceComponents;
  }, []);

  const fen = useMemo(() => game.fen(), [game]);

  return (
    <Chessboard
      position={fen}
      customDarkSquareStyle={{ backgroundColor: "var(--chess-dark)" }}
      customLightSquareStyle={{ backgroundColor: "var(--chess-light)" }}
      customPieces={USE_CUSTOM_PIECES ? customPieces : undefined}
      customBoardStyle={{ borderRadius: "var(--radius)" }}
      {...props}
    />
  );
};
const pieces: Piece[] = [
  "wP",
  "wN",
  "wB",
  "wR",
  "wQ",
  "wK",
  "bP",
  "bN",
  "bB",
  "bR",
  "bQ",
  "bK",
];
