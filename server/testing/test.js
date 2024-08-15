(async () => {
    const messages = [
        { role: "user", content: "what up dog" }
    ]
    const response = await fetch('http://localhost:3000/chat', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages,
            llm: "groq-llama3"
        })
    })
    console.log(await response.json())
})()