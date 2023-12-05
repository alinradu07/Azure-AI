import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

function ChatCompletion() {
  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );

  const messages = [
    {
      role: "system",
      content: "You are an AI assistant that helps people find information.",
    },

    { role: "user", content: "how many days does a week have?" },
    { role: "assistant", content: "A week typically has seven days." },
    { role: "user", content: "tell me last question that I've asked" },
  ];

  async function handleSend() {
    console.log("== Chat Completions Sample ==");

    const deploymentId = "FinGPTechBot";

    try {
      const result = await client.getChatCompletions(deploymentId, messages);
      for (const choice of result.choices) {
        console.log(choice.message);
      }
    } catch (err) {
      console.error("The sample encountered an error:", err);
    }
  }

  return (
    <>
      <button onClick={handleSend}>Test</button>
    </>
  );
}

export default ChatCompletion;
