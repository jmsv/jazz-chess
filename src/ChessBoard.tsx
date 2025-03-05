import { Chess } from "chess.js";
import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import type {
  CustomPieces,
  Piece,
} from "react-chessboard/dist/chessboard/types";

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

  return (
    <Chessboard
      {...props}
      position={game.fen()}
      customDarkSquareStyle={{ backgroundColor: "#9a8fff" }}
      customLightSquareStyle={{ backgroundColor: "#edebff" }}
      customPieces={customPieces}
      customBoardStyle={{
        borderRadius: "4px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
      }}
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
