import { Request, Response } from "express";
import type { Express } from "express";
import { ViteDevServer } from "vite";
declare class Server {
    expressApp: Express;
    vite: ViteDevServer;
    constructor(vite: ViteDevServer);
    configureServer(): Promise<void>;
    handleRequest(req: Request, res: Response): Promise<void>;
}
export default function createServer(vite: ViteDevServer): Server;
export {};
