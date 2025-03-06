import { Account } from "jazz-tools";
import { cn } from "@/lib/utils";

interface ChessPlayerProps {
  color: "white" | "black";
  player?: Account;
  active: boolean;
  reverse: boolean;
}

export const ChessPlayer: React.FC<ChessPlayerProps> = ({
  color,
  player,
  active,
  reverse,
}) => {
  const align =
    (color === "white" && !reverse) || (color === "black" && reverse)
      ? "left"
      : "right";

  return (
    <div
      className={cn(
        "relative px-4 py-2 rounded-lg border-2 w-fit min-w-3/5 max-w-full transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4",
        {
          "bg-white text-black border-black": color === "white",
          "bg-black text-white border-white": color === "black",
          "shadow-glow": active,
          "opacity-50": !active,
        },
        align === "left" ? "ml-auto md:flex-row-reverse" : "mr-auto"
      )}
    >
      <div className="text-lg font-display">
        {player?.profile?.name ?? "Waiting..."}
      </div>

      <div className="font-display font-bold text-xs">{color}</div>
    </div>
  );
};
