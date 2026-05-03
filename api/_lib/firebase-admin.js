const admin = require("firebase-admin");

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getFirebaseAdminApp() {
  if (admin.apps.length) {
    return admin.app();
  }

  const projectId = requiredEnv("FIREBASE_ADMIN_PROJECT_ID");
  const clientEmail = requiredEnv("FIREBASE_ADMIN_CLIENT_EMAIL");
  const privateKey = requiredEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n");

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });
}

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

async function verifyAdminRequest(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    const error = new Error("Missing bearer token");
    error.statusCode = 401;
    throw error;
  }

  const app = getFirebaseAdminApp();
  const decodedToken = await admin.auth(app).verifyIdToken(token);
  const adminEmails = getAdminEmails();

  if (!decodedToken.email || !adminEmails.includes(String(decodedToken.email).toLowerCase())) {
    const error = new Error("Admin access denied");
    error.statusCode = 403;
    throw error;
  }

  return {
    decodedToken,
    auth: admin.auth(app),
    firestore: admin.firestore(app)
  };
}

module.exports = {
  getFirebaseAdminApp,
  verifyAdminRequest
};
