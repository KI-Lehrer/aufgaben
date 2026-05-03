const { verifyAdminRequest } = require("../_lib/firebase-admin");

function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}

function formatISODate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function createSampleState() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = addDays(today, 7);

  const subjects = [
    { id: "fach-mathe", name: "Mathematik", color: "#4f8bff", teacher: "Frau Keller", room: "B204" },
    { id: "fach-deutsch", name: "Deutsch", color: "#22c55e", teacher: "Herr Weiss", room: "A102" },
    { id: "fach-englisch", name: "Englisch", color: "#f97316", teacher: "Ms. Clarke", room: "C110" },
    { id: "fach-biologie", name: "Biologie", color: "#14b8a6", teacher: "Herr Steiner", room: "Bio-Lab" }
  ];

  const timetable = [
    { id: generateId("lesson"), weekday: "Mo", fachId: "fach-mathe", startTime: "08:00", endTime: "08:45", room: "B204" },
    { id: generateId("lesson"), weekday: "Mo", fachId: "fach-deutsch", startTime: "09:00", endTime: "09:45", room: "A102" },
    { id: generateId("lesson"), weekday: "Mo", fachId: "fach-biologie", startTime: "11:00", endTime: "11:45", room: "Bio-Lab" },
    { id: generateId("lesson"), weekday: "Di", fachId: "fach-englisch", startTime: "08:00", endTime: "08:45", room: "C110" },
    { id: generateId("lesson"), weekday: "Di", fachId: "fach-mathe", startTime: "10:00", endTime: "10:45", room: "B204" },
    { id: generateId("lesson"), weekday: "Di", fachId: "fach-biologie", startTime: "13:00", endTime: "13:45", room: "Bio-Lab" },
    { id: generateId("lesson"), weekday: "Mi", fachId: "fach-deutsch", startTime: "08:00", endTime: "08:45", room: "A102" },
    { id: generateId("lesson"), weekday: "Mi", fachId: "fach-englisch", startTime: "09:00", endTime: "09:45", room: "C110" },
    { id: generateId("lesson"), weekday: "Mi", fachId: "fach-mathe", startTime: "12:00", endTime: "12:45", room: "B204" },
    { id: generateId("lesson"), weekday: "Do", fachId: "fach-biologie", startTime: "08:00", endTime: "08:45", room: "Bio-Lab" },
    { id: generateId("lesson"), weekday: "Do", fachId: "fach-deutsch", startTime: "10:00", endTime: "10:45", room: "A102" },
    { id: generateId("lesson"), weekday: "Do", fachId: "fach-englisch", startTime: "14:00", endTime: "14:45", room: "C110" },
    { id: generateId("lesson"), weekday: "Fr", fachId: "fach-mathe", startTime: "08:00", endTime: "08:45", room: "B204" },
    { id: generateId("lesson"), weekday: "Fr", fachId: "fach-deutsch", startTime: "11:00", endTime: "11:45", room: "A102" },
    { id: generateId("lesson"), weekday: "Fr", fachId: "fach-biologie", startTime: "13:00", endTime: "13:45", room: "Bio-Lab" }
  ];

  const homework = [
    {
      id: generateId("hw"),
      fachId: "fach-mathe",
      title: "Arbeitsblatt Bruchgleichungen",
      description: "Löse die Aufgaben 4 bis 9 und notiere den Rechenweg sauber ins Heft.",
      dueDate: formatISODate(today),
      status: "offen",
      note: "Im Unterricht noch Aufgabe 10 nachfragen.",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId("hw"),
      fachId: "fach-deutsch",
      title: "Kapitelzusammenfassung schreiben",
      description: "Eine halbe Seite zur Lektüre verfassen und zentrale Figuren beschreiben.",
      dueDate: formatISODate(addDays(today, 2)),
      status: "offen",
      note: "Zitate mit Seitenzahl ergänzen.",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId("hw"),
      fachId: "fach-englisch",
      title: "Vocabulary lernen",
      description: "Die neuen Wörter aus Unit 5 mit Beispielsätzen wiederholen.",
      dueDate: formatISODate(addDays(today, -1)),
      status: "offen",
      note: "Focus on irregular verbs.",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId("hw"),
      fachId: "fach-biologie",
      title: "Bericht zum Experiment",
      description: "Einen kurzen Bericht mit Hypothese, Durchführung und Ergebnis verfassen.",
      dueDate: formatISODate(addDays(today, 4)),
      status: "offen",
      note: "Fotos vom Experiment einfügen.",
      createdAt: new Date().toISOString()
    }
  ];

  const exams = [
    {
      id: generateId("exam"),
      fachId: "fach-biologie",
      title: "Kurztest Zellbiologie",
      date: formatISODate(addDays(today, 3)),
      topics: ["Zellorganellen", "Mitose", "Mikroskopieren"],
      learningChecklist: [
        { id: generateId("check"), text: "Kapitel 1 wiederholen", done: true },
        { id: generateId("check"), text: "Mitose-Schema zeichnen", done: false },
        { id: generateId("check"), text: "Fachbegriffe lernen", done: false }
      ],
      note: "Besonders Unterschiede zwischen Tier- und Pflanzenzelle anschauen.",
      createdAt: new Date().toISOString()
    },
    {
      id: generateId("exam"),
      fachId: "fach-mathe",
      title: "Prüfung Geometrie",
      date: formatISODate(addDays(nextWeek, 3)),
      topics: ["Dreiecke", "Pythagoras", "Flächenberechnung"],
      learningChecklist: [
        { id: generateId("check"), text: "Formelsammlung ordnen", done: false },
        { id: generateId("check"), text: "Aufgabenblatt 7 lösen", done: false }
      ],
      note: "Lineal und Geodreieck bereitlegen.",
      createdAt: new Date().toISOString()
    }
  ];

  return {
    subjects,
    homework,
    exams,
    timetable,
    drafts: {},
    settings: {
      klasse: "2B",
      darkMode: "auto",
      erinnerungen: true
    }
  };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { firestore } = await verifyAdminRequest(req);

    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (e) {
      body = {};
    }

    const uid = String(body.uid || "").trim();
    if (!uid) {
      res.status(400).json({ error: "Missing uid" });
      return;
    }

    const sampleState = createSampleState();

    // Write sample state to user document
    await firestore.collection("users").doc(uid).set(
      {
        state: sampleState,
        updatedAt: new Date(),
        seededAt: new Date().toISOString()
      },
      { merge: true }
    );

    // Ensure user is approved
    await firestore.collection("approvals").doc(uid).set(
      {
        approved: true,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );

    res.status(200).json({
      success: true,
      message: `Sample data written for user ${uid}`,
      summary: {
        subjects: sampleState.subjects.length,
        homework: sampleState.homework.length,
        exams: sampleState.exams.length,
        lessons: sampleState.timetable.length
      }
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Seed request failed"
    });
  }
};
