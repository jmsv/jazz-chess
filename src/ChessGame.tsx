import { ChessBoard } from "./ChessBoard";
import { useGame } from "./hooks/useGame";

interface ChessGameProps {}

export const ChessGame: React.FC<ChessGameProps> = () => {
  const { game, onDrop } = useGame();

  return (
    <div>
      <ChessBoard game={game} onPieceDrop={onDrop} />
    </div>
  );
};
