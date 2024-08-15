(async () => {
    const response = await fetch('http://localhost:3000/translate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: 'hello',
            to: 'th'
        })
    })
    console.log(await response.text())
})()