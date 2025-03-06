import { useEffect, useState } from "react";
import { Chess, Move } from "chess.js";
import type {
  BoardOrientation,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { useAccount, useCoState } from "jazz-react";
import { ID } from "jazz-tools";
import { ChessGameState, ChessMove } from "../schema";

export const useGame = (gameId: ID<ChessGameState>) => {
  const { me } = useAccount();
  const chessGame = useCoState(ChessGameState, gameId, {
    whitePlayer: {},
    blackPlayer: {},
    moves: [],
  });

  const [game, setGame] = useState(new Chess());
  const safeGameMutate = (modify: (_game: Chess) => void) => {
    setGame((g) => {
      const newGame = new Chess(g.fen());
      modify(newGame);
      return newGame;
    });
  };

  const [isReady, setIsReady] = useState(false);
  const [userIsSpectator, setUserIsSpectator] = useState(false);

  useEffect(() => {
    if (!chessGame?.moves) return;

    const unsub = chessGame.moves.subscribe([{}], (moves) => {
      const newGame = new Chess();

      for (const move of moves) {
        newGame.move({
          from: move.from,
          to: move.to,
          promotion: move.promotion,
        });
      }

      safeGameMutate((x) => x.loadPgn(newGame.pgn()));
      setIsReady(true);
    });

    return unsub;
  }, [chessGame?.id]);

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    let move: Move | null = null;

    safeGameMutate((x) => {
      try {
        move = x.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase(),
        });

        chessGame?.moves.push(
          ChessMove.create(
            {
              from: move.from,
              to: move.to,
              promotion: move.promotion,
              color: move.color,
              piece: move.piece,
              lan: move.lan,
              san: move.san,
            },
            chessGame._owner
          )
        );
      } catch (error) {
        console.error(error);
        move = null;
      }
    });

    return move !== null;
  };

  const joinGame = (joinAs: "white" | "black" | "spectator") => {
    if (!chessGame) return;
    setUserIsSpectator(joinAs === "spectator");

    if (joinAs === "white" && !chessGame.whitePlayer) {
      chessGame.whitePlayer = me;
    } else if (joinAs === "black" && !chessGame.blackPlayer) {
      chessGame.blackPlayer = me;
    }
  };

  const players = {
    white: chessGame?.whitePlayer,
    black: chessGame?.blackPlayer,
  };

  const activeColor = game.turn();

  const whosTurn = {
    color: activeColor,
    user: activeColor === "b" ? players.black : players.white,
  };
  const isUsersTurn = Boolean(whosTurn.user?.isMe);

  const playerColor: BoardOrientation | null = chessGame?.blackPlayer?.isMe
    ? "black"
    : chessGame?.whitePlayer?.isMe
    ? "white"
    : null;

  const chessGameId = chessGame?.id;

  return {
    game,
    playerColor,
    chessGameId,
    isReady,
    players,
    whosTurn,
    isUsersTurn,
    userIsSpectator,
    onDrop,
    joinGame,
  };
};
