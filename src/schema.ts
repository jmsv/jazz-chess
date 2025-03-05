/**
 * Learn about schemas here:
 * https://jazz.tools/docs/react/schemas/covalues
 */

import { Account, CoMap, Group, co } from "jazz-tools";

/** The account root is an app-specific per-user private `CoMap`
 *  where you can store top-level objects for that user */
export class AccountRoot extends CoMap {}

export class JazzAccount extends Account {
  root = co.ref(AccountRoot);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate(this: JazzAccount) {
    if (this.root === undefined) {
      const group = Group.create();
      this.root = AccountRoot.create({}, group);
    }
  }
}
