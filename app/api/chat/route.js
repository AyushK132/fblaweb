import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    return NextResponse.json({ text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ text: "Error: " + err.message }, { status: 500 });
  }
}
