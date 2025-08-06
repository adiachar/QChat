import axios from "axios";
import "dotenv/config";

export const getOpenAiResponse = async (messages, instruction) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        }
    }

    const payload = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: instruction,
            },
            ...messages,
        ]
    }

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, config); 
        if(response.status == 200) {
            return response.data.choices[0].message.content;
        }
    } catch(err) {
        return "";
    }
}