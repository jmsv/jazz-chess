import { cn } from "@/lib/utils";

export type ColorSelection = "white" | "black" | "random";

interface PawnProps extends React.ComponentProps<"svg"> {
  color: ColorSelection;
}

export const Pawn: React.FC<PawnProps> = ({ color, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" {...props}>
      <path
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M22.5 9a4 4 0 0 0-3.22 6.38 6.48 6.48 0 0 0-.87 10.65c-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47a6.46 6.46 0 0 0-.87-10.65A4.01 4.01 0 0 0 22.5 9z"
        className={cn(
          "stroke-black",
          color === "white" ? "fill-white" : "fill-black",
          color === "random" && "animate-[flash_1s_ease-in-out_infinite]"
        )}
      />
    </svg>
  );
};
