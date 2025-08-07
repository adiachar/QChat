import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function getAiResponse(messages, instruction, model) {
  const completion = await getGroqChatCompletion(messages, instruction, model);
  return completion.choices[0]?.message?.content || "";
}

export const getGroqChatCompletion = async (messages, instruction, model) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: instruction,
      },

      ...messages
    ],
    model: model,
  });
};
