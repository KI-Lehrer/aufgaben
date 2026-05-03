import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const host = "127.0.0.1";
const port = Number(process.env.PORT || 4173);

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const raw = readFileSync(filePath, "utf8");
  return Object.fromEntries(
    raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separatorIndex = line.indexOf("=");
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim().replace(/^"(.*)"$/, "$1");
        return [key, value];
      })
  );
}

const localEnv = {
  ...loadEnvFile(path.join(__dirname, ".env.local")),
  ...process.env
};

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".css": "text/css; charset=utf-8",
    ".txt": "text/plain; charset=utf-8"
  };
  return types[extension] || "application/octet-stream";
}

async function serveFile(res, filePath) {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType(filePath) });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Datei nicht gefunden");
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${host}:${port}`);

  if (url.pathname === "/api/config") {
    const config = {
      apiKey: localEnv.FIREBASE_API_KEY || "",
      authDomain: localEnv.FIREBASE_AUTH_DOMAIN || "",
      projectId: localEnv.FIREBASE_PROJECT_ID || "",
      storageBucket: localEnv.FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: localEnv.FIREBASE_MESSAGING_SENDER_ID || "",
      appId: localEnv.FIREBASE_APP_ID || ""
    };

    const missing = Object.entries(config)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missing.length) {
      json(res, 500, {
        error: "Missing Firebase environment variables for local dev",
        missing
      });
      return;
    }

    json(res, 200, config);
    return;
  }

  if (url.pathname.startsWith("/api/admin/")) {
    json(res, 501, {
      error: "Lokaler Admin-Endpunkt ist ohne npm/vercel hier nicht aktiv. Nutze dafuer Vercel mit gesetzten FIREBASE_ADMIN_* Variablen."
    });
    return;
  }

  const normalizedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(__dirname, safePath);
  await serveFile(res, filePath);
});

server.listen(port, host, () => {
  console.log(`Stop & Learn lokal erreichbar: http://${host}:${port}/`);
});
