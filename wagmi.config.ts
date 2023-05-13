import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import * as chains from "wagmi/chains";

export default defineConfig({
  out: "generated.ts",
  plugins: [
    foundry({
      deployments: {
        AboutTimer: {
          [chains.foundry.id]: "0x8a5592b0E95767886642269AEb0B7A80dAa22c8f",
        },
        BOBX: {
          [chains.foundry.id]: "0x673D41ebC2b499d3545E5a0309124cD94edA3FB0",
        },
      },
    }),
    react(),
  ],
});
