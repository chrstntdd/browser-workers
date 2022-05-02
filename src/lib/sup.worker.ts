/* Top-level worker supervisor. */

import { MSG_FROM_SUPERVISOR, MSG_TO_SUPERVISOR } from "../msg"

let state = {
  help: new Map()
}

globalThis.onmessage = (event: MessageEvent<{ type: MSG_TO_SUPERVISOR }>) => {
  switch (event.data.type) {
    case MSG_TO_SUPERVISOR.GREET:
      postMessage({
        type: MSG_FROM_SUPERVISOR.WELCOME,
        value: { some: "data" }
      })

      break

    case MSG_TO_SUPERVISOR.CREATE_ANOTHER_WORKER:
      let worker = new Worker(new URL("./kid.worker.ts", import.meta.url), {
        type: "module"
      })
      let id = state.help.size
      state.help.set(id, worker)
      postMessage({
        type: MSG_FROM_SUPERVISOR.CREATED_WORKER,
        value: { id }
      })

      break

    default:
      console.log("unhandled message", { event })
  }
}

export {}
