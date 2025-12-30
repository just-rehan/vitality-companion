
import fetch from 'node-fetch';

async function testChat() {
    try {
        console.log("Sending request to http://localhost:3001/api/chat...");

        // This payload matches what the frontend sends (an array of messages)
        const frontendPayload = {
            messages: [{ role: "user", parts: [{ text: "Hello" }] }]
        };

        const response = await fetch('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(frontendPayload)
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Test Failed:", error);
    }
}

testChat();
