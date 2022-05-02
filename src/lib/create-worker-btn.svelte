<script lang="ts">
  import { getContext, onMount } from "svelte"
  import { MSG_FROM_SUPERVISOR, MSG_TO_SUPERVISOR } from "../msg"

  const worker: Worker = getContext("sup")

  let workerCount = 0

  onMount(() => {
    worker.postMessage({ type: MSG_TO_SUPERVISOR.GREET, value: "AYY" })

    worker.onmessage = (e: MessageEvent<{ type: MSG_FROM_SUPERVISOR }>) => {
      switch (e.data.type) {
        case MSG_FROM_SUPERVISOR.WELCOME:
          worker.postMessage({ type: MSG_TO_SUPERVISOR.GREET })
          break

        case MSG_FROM_SUPERVISOR.CREATED_WORKER:
          workerCount++
          // @ts-expect-error
          // Need a better type for the msg to include a `value` typed A
          // a la xstate
          console.log("Worker address", e.data.value)
          break
      }
    }
  })

  const increment = () => {
    if (workerCount < window.navigator.hardwareConcurrency) {
      worker.postMessage({ type: MSG_TO_SUPERVISOR.CREATE_ANOTHER_WORKER })
    }
  }
</script>

<button on:click={increment}>
  Workers: {workerCount}
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
