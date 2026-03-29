// import express from "express";
// const router = express.Router();

// import router from "./auth.route";

// router.post("/", async (req, res) => {
//   try {
//     const { text } = req.body;

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer YOUR_OPENAI_API_KEY`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are a smart text corrector.

// Rules:
// 1. Fix spelling mistakes
// 2. Fix grammar
// 3. Convert Hinglish (Hindi written in English) into proper Hindi words in English script
// 4. Make sentence natural and correct

// Examples:
// kasa ho app → kaise ho aap
// mai kal aunga → main kal aaunga
// whne are you → when are you

// Only return corrected sentence. Do not explain.
// `
              
//           },
//           {
//             role: "user",
//             content: text,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();

//     const corrected = data.choices[0].message.content;

//     res.json({ corrected });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Correction failed" });
//   }
// });

// export default router;



// import express from "express";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { text } = req.body;

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "mistralai/mistral-7b-instruct",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are a smart text corrector.

// Rules:
// - Fix spelling mistakes
// - Fix grammar
// - Convert Hinglish to proper Hindi (in English letters)
// - Make sentence natural

// Examples:
// kasa ho app → kaise ho aap
// mai kal aunga → main kal aaunga
// whne are you → when are you

// Only return corrected sentence.
// `,
//           },
//           {
//             role: "user",
//             content: text,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();

//     const corrected = data?.choices?.[0]?.message?.content;

//     res.json({ corrected: corrected || text });

//   } catch (err) {
//     console.error("ERROR:", err);
//     res.status(500).json({ error: "Correction failed" });
//   }
// });

// export default router;


import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     console.log("🔥 Correct API HIT");

//     const { text } = req.body;
//     console.log("TEXT RECEIVED:", text);


// console.log("🔥 API HIT");
// console.log("TEXT:", text);
// console.log("API KEY:", process.env.OPENROUTER_API_KEY);


//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "mistralai/mistral-7b-instruct",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are a smart text corrector.

// Rules:
// - Fix spelling mistakes
// - Fix grammar
// - Convert Hinglish to proper Hindi (in English letters)
// - Make sentence natural

// Examples:
// kasa ho app → kaise ho aap
// mai kal aunga → main kal aaunga
// whne are you → when are you

// Only return corrected sentence.
// `,
//           },
//           {
//             role: "user",
//             content: text,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();

//     console.log("AI RESPONSE:", data);
//     console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

//     const corrected = data?.choices?.[0]?.message?.content;

//     console.log("FINAL OUTPUT:", corrected);

//     res.json({ corrected: corrected || text });

//   } catch (err) {
//     console.error("ERROR:", err);
//     res.status(500).json({ error: "Correction failed" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    // console.log("🔥 API HIT");
    // console.log("TEXT:", text);
    // console.log("API KEY:", process.env.OPENROUTER_API_KEY);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:"meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are a Hinglish text correction engine.

STRICT RULES:
- ONLY correct spelling mistakes
- DO NOT translate to English
- DO NOT add extra words
- DO NOT change sentence meaning
- DO NOT explain anything
- KEEP original sentence structure

If input is Hinglish → return Hinglish only  
If input is English → return English only  

Examples:
kasa ho app → kaise ho aap
kal college ana hia ky → kal college aana hai kya
whne are you → when are you

IMPORTANT:
Return ONLY the corrected sentence.
Do not add anything else.
`
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    });

    const data = await response.json();

    // console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

   let corrected = data?.choices?.[0]?.message?.content || text;

// ✅ remove extra lines if model adds
corrected = corrected.split("\n")[0].trim();

    res.json({
      corrected: corrected && corrected.trim() ? corrected.trim() : text,
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Correction failed" });
  }
});

export default router;
