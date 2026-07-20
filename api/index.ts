import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import { createApp } from '../server/src/app.js';
import { initDb } from '../server/src/db/index.js';

let appInstance: any = null;

function getApp() {
  if (!appInstance) {
    const dbPath = process.env.FREEAPI_DB_PATH || path.join('/tmp', 'freeapi.db');
    try {
      initDb(dbPath, { ensureDir: true });
    } catch (err) {
      console.error('Failed to initialize serverless DB:', err);
    }
    appInstance = createApp({ serveStaticAssets: false });
  }
  return appInstance;
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const app = getApp();
  return app(req, res);
}
