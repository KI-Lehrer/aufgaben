const { verifyAdminRequest } = require("../_lib/firebase-admin");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { auth, firestore } = await verifyAdminRequest(req);
    
    // Parse body manually for Vercel Serverless
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (e) {
      body = {};
    }

    const uid = String(body.uid || "").trim();
    const approved = Boolean(body.approved);

    if (!uid) {
      res.status(400).json({ error: "Missing uid" });
      return;
    }

    if (approved) {
      await firestore.collection("approvals").doc(uid).set({
        approved,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } else {
      // User is being blocked, so we delete them entirely
      try {
        await auth.deleteUser(uid);
      } catch (err) {
        // Ignore if already deleted
      }
      await firestore.collection("users").doc(uid).delete();
      await firestore.collection("approvals").doc(uid).delete();
    }

    res.status(200).json({ success: true, approved });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Admin request failed"
    });
  }
};
