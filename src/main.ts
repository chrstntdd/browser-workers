import App from "./App.svelte"

const app = new App({
  target: document.getElementById("app")!,
  context: new Map([
    [
      /* Initial context of the supervisor worker to make available for the whole App */
      "sup",
      new Worker(new URL("./lib/sup.worker.ts", import.meta.url), {
        type: "module"
      })
    ]
  ])
})

export default app
