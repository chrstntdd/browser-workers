<script lang="ts">
  import { getContext, onMount } from "svelte"

  const worker: Worker = getContext("sup")

  onMount(() => {
    worker.postMessage({ type: "GREET", value: "AYY" })

    worker.onmessage = (e) => {
      switch (e.data.type) {
        case "WELCOME":
          worker.postMessage({ type: "CREATE_ANOTHER_WORKER" })
          break
      }
    }
  })

  let count: number = 0
  const increment = () => {
    worker.postMessage({ type: "CREATE_ANOTHER_WORKER" })
    count += 1
  }
</script>

<button on:click={increment}>
  Clicks: {count}
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
