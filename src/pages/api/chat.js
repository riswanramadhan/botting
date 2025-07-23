import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;

  try {
     
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({
      reply: "Maaf, terjadi kesalahan saat menghubungi Gemini API."
    });
  }
}
