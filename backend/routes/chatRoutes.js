import express from "express";
import axios from "axios";

const router = express.Router();

// ============================================================
// MODELS — Working ones FIRST based on your test results
// nvidia + gemma confirmed working on your account right now
// Others kept as fallback for when rate limits reset
// ============================================================
const MODELS = [
  { id: "nvidia/nemotron-nano-9b-v2:free",                system_role: true  }, // ✅ WORKING
  { id: "google/gemma-3-27b-it:free",                     system_role: false }, // ✅ WORKING (no system role)
  { id: "meta-llama/llama-3.3-70b-instruct:free",         system_role: true  }, // 429 now but resets daily
  { id: "mistralai/mistral-small-3.1-24b-instruct:free",  system_role: true  }, // 429 now but resets daily
  { id: "nousresearch/hermes-3-llama-3.1-405b:free",      system_role: true  }, // 429 now but resets daily
];

// ============================================================
// PORTFOLIO DATA — add new projects/services here anytime
// ============================================================
const PORTFOLIO = {
  name: "Sarvathan C",
  role: "Freelance Full Stack Developer",
  location: "Tiruppur, Tamil Nadu, India",
  email: "Sarvathan9363@gmail.com",
  linkedin: "linkedin.com/in/sarvathan-c-923789315",
  availability: "Currently available for freelance projects",

  services: [
    "Landing Page — Clean, fast, responsive pages that convert visitors into customers.",
    "Business Website — Multi-page professional websites with contact forms and clean design.",
    "Full Stack Web Application — Complete apps with React frontend, Node.js backend, and MongoDB/SQL database.",
    "REST API Development — Scalable, documented APIs for web and mobile applications.",
    "Admin Dashboard — Custom panels to manage users, data, and business operations.",
    "E-Commerce Store — Product listings, cart, and checkout flows for your online business.",
  ],

  skills: [
    "HTML & CSS", "JavaScript", "React.js", "Node.js",
    "Express.js", "MongoDB", "SQL", "REST APIs", "Git & GitHub",
  ],

  projects: [
    {
      title: "Personal Portfolio Website",
      description: "Responsive portfolio built with React and Tailwind CSS, deployed on Vercel.",
      tech: ["React", "Tailwind CSS", "Vercel"],
    },
    {
      title: "Task Manager App",
      description: "Full stack to-do app with user authentication and CRUD operations.",
      tech: ["Node.js", "Express", "MongoDB", "React"],
    },
    {
      title: "E-Commerce UI",
      description: "Responsive product listing page with shopping cart functionality.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    // ADD NEW PROJECTS HERE:
    // { title: "...", description: "...", tech: ["..."] },
  ],
};

// ============================================================
// BUILD SYSTEM PROMPT
// ============================================================
function buildSystemPrompt() {
  const servicesList = PORTFOLIO.services.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const projectsList = PORTFOLIO.projects
    .map(
      (p, i) =>
        `${i + 1}. ${p.title}\n   - ${p.description}\n   - Tech: ${p.tech.join(", ")}`
    )
    .join("\n\n");

  return `You are the friendly AI assistant for ${PORTFOLIO.name}'s portfolio website.
Help potential clients understand Sarvathan's services, skills, and projects. Encourage them to get in touch.

ABOUT SARVATHAN:
- Role: ${PORTFOLIO.role}
- Location: ${PORTFOLIO.location}
- Email: ${PORTFOLIO.email}
- LinkedIn: ${PORTFOLIO.linkedin}
- Status: ${PORTFOLIO.availability}

SERVICES:
${servicesList}

SKILLS: ${PORTFOLIO.skills.join(", ")}

PROJECTS:
${projectsList}

RULES:
- Be warm, polite, and professional at all times
- Keep replies to 3-5 sentences unless more detail is needed
- For pricing questions say: "Pricing depends on your project scope — reach out at ${PORTFOLIO.email} for a free quote!"
- Always end hiring-related answers with a CTA to email ${PORTFOLIO.email}
- For greetings or vague messages like "I need a website": respond warmly and ask what kind of project they have in mind
- Never make up services, projects, or skills not listed above`;
}

// ============================================================
// BUILD MESSAGES — handles models with/without system role
// ============================================================
function buildMessages(history, supportsSystemRole) {
  const systemPrompt = buildSystemPrompt();

  const safeHistory = history
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content?.trim())
    .slice(-10);

  if (supportsSystemRole) {
    return [
      { role: "system", content: systemPrompt },
      ...safeHistory,
    ];
  } else {
    // Inject system prompt into first user message for Gemma
    const [first, ...rest] = safeHistory;
    return [
      {
        role: "user",
        content: `${systemPrompt}\n\n---\nClient: ${first?.content || "Hello"}`,
      },
      ...rest,
    ];
  }
}

// ============================================================
// CALL WITH FALLBACK
// ============================================================
async function callWithFallback(history) {
  const errors = [];

  for (const model of MODELS) {
    try {
      console.log(`[AI] Trying: ${model.id}`);

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model.id,
          max_tokens: 350,
          temperature: 0.7,
          messages: buildMessages(history, model.system_role),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
            "X-Title": "Sarvathan Portfolio Assistant",
          },
          timeout: 20000,
        }
      );

      const reply = response.data?.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error("Empty reply from model");

      console.log(`[AI] Success: ${model.id}`);
      return { reply, model: model.id };

    } catch (err) {
      const code = err.response?.data?.error?.code || err.response?.status || "timeout";
      const msg  = err.response?.data?.error?.message || err.message;
      console.error(`[AI] FAILED ${model.id} | code: ${code} | msg: ${msg}`);
      errors.push({ model: model.id, code, msg });
      continue;
    }
  }

  const err = new Error("All models failed");
  err.modelErrors = errors;
  throw err;
}

// ============================================================
// TEST ROUTE — GET /api/chat/test
// ============================================================
router.get("/test", async (req, res) => {
  const key = process.env.OPENROUTER_API_KEY;

  if (!key || key === "YOUR_OPENROUTER_API_KEY" || !key.trim()) {
    return res.status(500).json({
      success: false,
      issue: "MISSING_API_KEY",
      fix: "Set OPENROUTER_API_KEY in your .env — get a free key at https://openrouter.ai/keys",
    });
  }

  const results = [];

  for (const model of MODELS) {
    try {
      const messages = model.system_role
        ? [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user",   content: "Say hi in one word." },
          ]
        : [{ role: "user", content: "Say hi in one word." }];

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        { model: model.id, max_tokens: 20, messages },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Sarvathan Portfolio Test",
          },
          timeout: 10000,
        }
      );

      const reply = response.data?.choices?.[0]?.message?.content?.trim();
      results.push({ model: model.id, status: "OK", reply });
    } catch (err) {
      const code = err.response?.data?.error?.code || err.response?.status;
      const msg  = err.response?.data?.error?.message || err.message;
      results.push({ model: model.id, status: "FAILED", code, msg });
    }
  }

  res.json({
    success: results.some((r) => r.status === "OK"),
    api_key_prefix: key.substring(0, 14) + "...",
    results,
  });
});

// ============================================================
// MAIN CHAT ROUTE — POST /api/chat
// Body: { conversationHistory: [{role, content}, ...] }
// ============================================================
router.post("/", async (req, res) => {
  try {
    const { conversationHistory } = req.body;

    if (!Array.isArray(conversationHistory) || conversationHistory.length === 0) {
      return res.status(400).json({
        success: false,
        message: "conversationHistory must be a non-empty array.",
        example: { conversationHistory: [{ role: "user", content: "Hello" }] },
      });
    }

    const last = conversationHistory[conversationHistory.length - 1];
    if (!last || last.role !== "user" || !last.content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Last item must be { role: 'user', content: '...' }",
      });
    }

    const { reply, model } = await callWithFallback(conversationHistory);
    res.json({ success: true, reply, model });

  } catch (error) {
    console.error("\n[AI] ALL MODELS FAILED:");
    error.modelErrors?.forEach((e) =>
      console.error(`  - ${e.model}: [${e.code}] ${e.msg}`)
    );

    res.status(500).json({
      success: false,
      message:
        "AI assistant is temporarily unavailable. Please contact Sarvathan directly at Sarvathan9363@gmail.com",
      debug: {
        modelErrors: error.modelErrors || [],
        tip: "Visit GET /api/chat/test to diagnose",
      },
    });
  }
});

export default router;