const { verifyAdminRequest } = require("../_lib/firebase-admin");

function normalizeState(state) {
  const safeState = state && typeof state === "object" ? state : {};
  return {
    subjects: Array.isArray(safeState.subjects) ? safeState.subjects : [],
    homework: Array.isArray(safeState.homework) ? safeState.homework : [],
    exams: Array.isArray(safeState.exams) ? safeState.exams : [],
    timetable: Array.isArray(safeState.timetable) ? safeState.timetable : [],
    drafts: safeState.drafts && typeof safeState.drafts === "object" ? safeState.drafts : {},
    settings: safeState.settings && typeof safeState.settings === "object" ? safeState.settings : {}
  };
}

function summaryFromState(state) {
  const normalized = normalizeState(state);
  return {
    subjects: normalized.subjects.length,
    homework: normalized.homework.length,
    openHomework: normalized.homework.filter((item) => item?.status !== "erledigt").length,
    exams: normalized.exams.length,
    lessons: normalized.timetable.length
  };
}

async function listAllAuthUsers(auth) {
  const users = [];
  let nextPageToken;

  do {
    const result = await auth.listUsers(1000, nextPageToken);
    users.push(...result.users);
    nextPageToken = result.pageToken;
  } while (nextPageToken);

  return users;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { auth, firestore } = await verifyAdminRequest(req);
    const selectedUid = String(req.query.uid || "").trim();

    if (selectedUid) {
      const [userRecord, userDoc, approvalDoc] = await Promise.all([
        auth.getUser(selectedUid),
        firestore.collection("users").doc(selectedUid).get(),
        firestore.collection("approvals").doc(selectedUid).get()
      ]);
      const state = userDoc.exists ? userDoc.data().state || {} : {};
      const isApproved = approvalDoc.exists ? approvalDoc.data().approved === true : false;

      res.status(200).json({
        user: {
          uid: userRecord.uid,
          email: userRecord.email || "",
          displayName: userRecord.displayName || "",
          disabled: Boolean(userRecord.disabled),
          approved: isApproved,
          provider: userRecord.providerData[0]?.providerId || "password",
          createdAt: userRecord.metadata.creationTime || "",
          updatedAt: userDoc.exists && userDoc.data().updatedAt
            ? userDoc.data().updatedAt.toDate().toISOString()
            : "",
          summary: summaryFromState(state),
          state: normalizeState(state)
        }
      });
      return;
    }

    const [authUsers, userDocs, approvalDocs] = await Promise.all([
      listAllAuthUsers(auth),
      firestore.collection("users").get(),
      firestore.collection("approvals").get()
    ]);

    const statesByUid = new Map();
    userDocs.forEach((docSnapshot) => {
      statesByUid.set(docSnapshot.id, docSnapshot.data() || {});
    });

    const approvalsByUid = new Map();
    approvalDocs.forEach((docSnapshot) => {
      approvalsByUid.set(docSnapshot.id, docSnapshot.data()?.approved === true);
    });

    const users = authUsers.map((userRecord) => {
      const docData = statesByUid.get(userRecord.uid) || {};
      const state = docData.state || {};
      return {
        uid: userRecord.uid,
        email: userRecord.email || "",
        displayName: userRecord.displayName || "",
        disabled: Boolean(userRecord.disabled),
        approved: approvalsByUid.get(userRecord.uid) || false,
        provider: userRecord.providerData[0]?.providerId || "password",
        createdAt: userRecord.metadata.creationTime || "",
        updatedAt: docData.updatedAt ? docData.updatedAt.toDate().toISOString() : "",
        summary: summaryFromState(state)
      };
    });

    res.status(200).json({ users });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Admin request failed"
    });
  }
};
