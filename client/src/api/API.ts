function getHistory() {
    const chatLogs = document.querySelectorAll(".chat-log");
    const messages = [];
    for (let index = 0; index < chatLogs.length; index++) {
        const element = chatLogs[index];
        console.log(element.classList)
        if (index % 2 === 0) {
            messages.push({
                content: element.innerHTML,
                role: "assistant",
            });
        } else {
            messages.push({
                content: element.innerHTML,
                role: "user",
            });
        }
    }
    return messages;
}

export default class API {
    static baseUrl = "http://localhost:1337/v1";
    static async completeChat(payload = "") {
        const historyMesssages = getHistory();
        const body = {
            messages: [
                {
                    content: "You are a helpful assistant.",
                    role: "system",
                },
                ...historyMesssages,
                {
                    content: payload,
                    role: "user",
                },
            ],
            model: "gpt-4o",
            stream: false,
            max_tokens: 2048,
            stop: ["hello"],
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.7,
            top_p: 0.95,
        };
        const response = await fetch(`${API.baseUrl}/chat/completions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const responseJson = await response.json();
        return responseJson.choices[0].message.content;
    }
}
