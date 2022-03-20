console.log("Supporting!")

globalThis.onmessage = (e) => {
  switch (e.data.type) {
    default:
      console.log("unhandled message", { event })
  }
}

export {}
