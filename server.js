const isProduction = process.env.NODE_ENV === "production";
const base = process.env.BASE || "/";

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
}

async function GetServer() {
  if (!vite) {
    return (await vite.ssrLoadModule("./src/server.ts")).default;
  } else {
    return (await vite.ssrLoadModule("./src/server.ts")).default;
  }
  // return (

  // ).default;
}

async function start() {
  console.log("test");
  const myServer = new (await GetServer())(vite);
}
start();
