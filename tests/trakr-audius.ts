import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TrakrAudius } from "../target/types/trakr_audius";

describe("trakr-audius", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TrakrAudius as Program<TrakrAudius>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
