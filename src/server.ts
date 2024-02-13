import fs from "fs/promises";
import express, { Request, Response } from "express";
import type { Express } from "express";
import "vite/modulepreload-polyfill";
import compression from "compression";
import sirv from "sirv";
import { ViteDevServer } from "vite";
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

class Server {
  expressApp: Express;
  vite: ViteDevServer;

  // Private constructor to prevent instantiation
  constructor(vite: ViteDevServer) {
    //loadAssets()
    //app.use("*", handleRequest(vite));
    this.vite = vite;
    this.expressApp = express();
    this.configureServer();
  }

  async configureServer() {
    if (!isProduction) {
      this.expressApp.use(this.vite.middlewares);
    } else {
      this.expressApp.use(compression());
      this.expressApp.use(base, sirv("./dist/client", { extensions: [] }));
    }
    const socket = await import("socket.io");
    const http = await import("http");
    const server = http.createServer(this.expressApp);
    const io = new socket.Server(server);

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
      socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
      });
    });

    this.expressApp.use("/*", this.handleRequest.bind(this));

    // Start http server
    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  }

  async handleRequest(req: Request, res: Response) {
    try {
      const url = req.originalUrl.replace(base, "");
      let template;
      let render;
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile("./index.html", "utf-8");
        template = await this.vite.transformIndexHtml(url, template);
        render = (await this.vite.ssrLoadModule("/src/entry-server.tsx"))
          .render;
      } else {
        template = templateHtml;
        render = (await import("../dist/server/entry-server.js")).render;
      }

      const rendered = await render(url, ssrManifest);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? "");

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (err) {
      const e = err as Error;
      //   console.log(this);
      //   console.log(this.vite);
      //   this.vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  }
}

export default function createServer(vite: ViteDevServer) {
  return new Server(vite);
}
