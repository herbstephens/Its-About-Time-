import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import * as chains from "wagmi/chains";

export default defineConfig({
  out: "generated.ts",
  plugins: [
    foundry({
      deployments: {
        AboutTimer: {
          [chains.polygon.id]: "0x717AC7dffE7f7695108AFB3b033a3C0A82d59F7d",
          [chains.foundry.id]: "0x25e67aedBA8aCe016Dd4573df46c50E4F8a97497",
        },
        ERC20: {
          [chains.polygon.id]: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B",
          [chains.foundry.id]: "0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B",
        },
      },
    }),
    react(),
  ],
});
