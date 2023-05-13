import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import * as chains from "wagmi/chains";

export default defineConfig({
  out: "generated.ts",
  plugins: [
    foundry({
      deployments: {
        AboutTimer: {
          [chains.foundry.id]: "0x9D76393e381FE089950c5bFbDD603f033BfB08c2",
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
