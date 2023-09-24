import { ipfs } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/MyYactClub/MyYactClub";
import { User } from "../generated/schema";

export function handleTransfer2(event: TransferEvent): void {
  const userId = event.transaction.from.toString();
  let user = User.load(userId);
  if (!user) {
    user = new User(userId);
    user.name = event.transaction.gasPrice.toString();
  } else {
    user.name = "test";
  }

  ipfs.mapJSON("");
  user.save();
}
