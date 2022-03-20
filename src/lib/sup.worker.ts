/* Top-level worker supervisor. */

globalThis.onmessage = (event) => {
  let state = {
    help: new Set()
  }

  switch (event.data.type) {
    case "GREET":
      postMessage({ type: "WELCOME", value: { some: "data" } })

      break

    case "CREATE_ANOTHER_WORKER":
      // Also works
      //   import("./kid.worker?worker").then(({ default: Kid }) => {
      //     state.help.add(new Kid())
      //   })
      const worker = new Worker(new URL("./kid.worker.ts", import.meta.url), {
        type: "module"
      })
      state.help.add(worker)
      break

    default:
      console.log("unhandled message", { event })
  }
}

export {}
