const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function sendChat(messages: any[]) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "No response from AI"
  );
}

/* ---------------------------------
   NEW: Explain Medication
--------------------------------- */
export async function explainMedication(medName: string) {
  const messages = [
    {
      role: "user",
      parts: [
        {
          text: `Explain what the medication "${medName}" is used for and one important precaution. Keep it short.`,
        },
      ],
    },
  ];

  return await sendChat(messages);
}
