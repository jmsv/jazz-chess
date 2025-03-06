import { PopcornIcon } from "lucide-react";
import { ColorSelection, Pawn } from "@/components/chess/Pawn";
import { cn } from "@/lib/utils";

interface PlayerButtonProps extends React.ComponentProps<"button"> {
  color: ColorSelection;
}

export const PlayerButton: React.FC<PlayerButtonProps> = ({
  color,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        "border-primary rounded-lg pt-2 h-36 w-32 bg-white flex flex-col items-center justify-center border-4 group overflow-hidden hover:bg-primary hover:text-primary-foreground text-black transition-all duration-200 ease-out hover:border-primary-foreground",
        { "opacity-50 pointer-events-none": disabled }
      )}
      {...props}
    >
      <div className="font-display text-sm group-hover:scale-150 transition-all duration-300 ease-out group-hover:translate-y-4">
        {color}
      </div>

      <Pawn
        color={color}
        className="h-24 -mt-2 group-hover:scale-250 transition-all duration-300 ease-out group-hover:translate-y-16 group-hover:opacity-50"
      />
    </button>
  );
};

export const PlayerButtonSpectate: React.FC<React.ComponentProps<"button">> = ({
  ...props
}) => {
  return (
    <button
      className="border-primary rounded-lg pt-2 h-36 w-32 bg-white flex flex-col items-center justify-center border-4 group overflow-hidden hover:bg-primary hover:text-primary-foreground text-black transition-all duration-200 ease-out hover:border-primary-foreground"
      {...props}
    >
      <div className="font-display text-sm group-hover:scale-130 transition-all duration-300 ease-out group-hover:translate-y-4">
        Spectate
      </div>

      <PopcornIcon className="w-24 h-24 -mt-2 scale-80 translate-y-1 group-hover:scale-120 transition-all duration-300 ease-out group-hover:translate-y-10 group-hover:opacity-50" />
    </button>
  );
};
