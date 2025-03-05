/**
 * Learn about schemas here:
 * https://jazz.tools/docs/react/schemas/covalues
 */

import { Account, CoList, CoMap, co } from "jazz-tools";

export class ChessMove extends CoMap {
  from = co.string;
  to = co.string;
  promotion = co.optional.string;
  color = co.literal("w", "b");
  piece = co.literal("p", "n", "b", "r", "q", "k");
  lan = co.string;
  san = co.string;
}

export class ChessGameMoves extends CoList.Of(co.ref(ChessMove)) {}

export class ChessGameState extends CoMap {
  whitePlayer = co.optional.ref(Account);
  blackPlayer = co.optional.ref(Account);
  moves = co.ref(ChessGameMoves);
}
