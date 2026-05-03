const { verifyAdminRequest } = require("../_lib/firebase-admin");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { auth } = await verifyAdminRequest(req);

    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (e) {
      body = {};
    }

    const uid = String(body.uid || "").trim();
    const password = String(body.password || "").trim();

    if (!uid) {
      res.status(400).json({ error: "Missing uid" });
      return;
    }

    if (!password || password.length < 4) {
      res.status(400).json({ error: "Password must be at least 4 characters" });
      return;
    }

    await auth.updateUser(uid, { password });

    res.status(200).json({ success: true, message: `Password updated for ${uid}` });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Password reset failed"
    });
  }
};
