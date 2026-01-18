import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY // ⚠️ المفتاح من Environment Variable
});

export default async function handler(req, res) {
  try {
    const { message, mode, lang } = req.body;

    let prompt = message;
    if (mode === "translate") prompt = `Translate this to ${lang === "ar" ? "Arabic" : "English"}: ${message}`;
    else if (mode === "write") prompt = `Write professional content about: ${message}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "❌ Error: Unable to get response from AI." });
  }
}
