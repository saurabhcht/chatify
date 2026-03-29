// // frontend/src/lib/textCorrector.js

// export const correctText = async (text) => {
//   try {
//     const res = await fetch("https://api.languagetool.org/v2/check", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `text=${encodeURIComponent(text)}&language=en-US`,
//     });

//     const data = await res.json();

//     let corrected = text;

//     data.matches.forEach((match) => {
//       if (match.replacements.length > 0) {
//         const wrongWord = match.context.text.substr(
//           match.context.offset,
//           match.context.length
//         );

//         corrected = corrected.replace(
//           wrongWord,
//           match.replacements[0].value
//         );
//       }
//     });

//     return corrected;
//   } catch (err) {
//     console.error("Correction error:", err);
//     return text; // fallback
//   }
// };
// export const correctText = async (text) => {
//   try {
//     const res = await fetch("/api/correct", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data = await res.json();
//     return data.corrected;
//   } catch (err) {
//     console.error(err);
//     return text;
//   }
// };

// export const correctText = async (text) => {
//   try {
//     const res = await fetch("https://chatify-backend-nwgb.onrender.com/api/correct", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data = await res.json();

//     return data.corrected || text;
//   } catch (err) {
//     console.error(err);
//     return text;
//   }
// };

// export const correctText = async (text) => {
//   try {
//     const BASE_URL =
//       window.location.hostname === "localhost"
//         ? "http://localhost:3000"
//         : "https://chatify-backend-nwgb.onrender.com";

//     const res = await fetch(`${BASE_URL}/api/correct`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data = await res.json();

//     return data.corrected || text;
//   } catch (err) {
//     console.error(err);
//     return text;
//   }
// };


export const correctText = async (text) => {
  try {
    const BASE_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://chatify-backend-nwgb.onrender.com";

    const res = await fetch(`${BASE_URL}/api/correct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    let corrected = data?.choices?.[0]?.message?.content || data.corrected || text;

    // remove extra lines if model adds
    corrected = corrected.split("\n")[0].trim();

    return corrected;
  } catch (err) {
    console.error(err);
    return text;
  }
};