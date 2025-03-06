import { useAccount, useIsAuthenticated } from "jazz-react";
import { Group } from "jazz-tools";
import { useNavigate } from "react-router";
import { ChessGameState, ChessGameMoves } from "../schema";
import { ColorSelection } from "@/components/chess/Pawn";
import { PlayerButton } from "@/components/chess/PlayerButton";
import { SignInButton } from "@/components/layout/SignInButton";

function Home() {
  const { me } = useAccount();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  const startGame = (color: ColorSelection) => {
    if (!me) return;

    const group = Group.create();
    group.addMember("everyone", "writer");

    const pickedWhite =
      color === "white"
        ? true
        : color === "black"
        ? false
        : Math.random() > 0.5;

    const game = ChessGameState.create(
      {
        whitePlayer: pickedWhite ? me : undefined,
        blackPlayer: pickedWhite ? undefined : me,
        moves: ChessGameMoves.create([], group),
      },
      group
    );

    navigate(`/game/${game.id}`);
  };

  return (
    <div className="px-4 py-12 flex flex-col flex-1 gap-8 items-center">
      <h2 className="text-5xl font-display">New game?</h2>

      {!isAuthenticated && <SignInButton text="Sign in to start a game" />}

      <div className="flex gap-4 flex-wrap">
        <PlayerButton
          color="white"
          onClick={() => startGame("white")}
          disabled={!isAuthenticated}
        />

        <PlayerButton
          color="black"
          onClick={() => startGame("black")}
          disabled={!isAuthenticated}
        />

        <PlayerButton
          color="random"
          onClick={() => startGame("random")}
          disabled={!isAuthenticated}
        />
      </div>
    </div>
  );
}

export default Home;
