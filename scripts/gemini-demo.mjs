
import { GoogleGenAI } from "@google/genai";

// Asegúrate de tener la variable de entorno GOOGLE_API_KEY configurada
// o pásala en el constructor: new GoogleGenAI({ apiKey: "TU_API_KEY" });
const ai = new GoogleGenAI({});

async function main() {
  const modelName = "gemini-2.0-flash-exp"; // O el modelo que tengas disponible ("gemini-1.5-flash", etc.)

  console.log("--- 1. Consulta Estándar (Sin Internet) ---");
  // Esta consulta tirará de lo que el modelo "recuerda" de su entrenamiento.
  // Si preguntas algo muy reciente (ej. clima de hoy), probablemente no lo sepa o alucine.
  try {
    const response1 = await ai.models.generateContent({
      model: modelName,
      contents: "Who won the Super Bowl in 2025? If it hasn't happened yet, tell me based on your training data cutoff.",
    });
    console.log("Respuesta:", response1.text);
  } catch (err) {
    console.error("Error en consulta estándar:", err.message);
  }

  console.log("\n--- 2. Consulta con Google Search (Con Internet) ---");
  // Aquí activamos la herramienta de búsqueda.
  try {
    const response2 = await ai.models.generateContent({
      model: modelName,
      contents: "What is the current stock price of Apple (AAPL) right now?",
      config: {
        tools: [
          {
            googleSearch: {} // <--- ESTO ACTIVA LA BÚSQUEDA EN INTERNET
          }
        ]
      }
    });
    
    // La respuesta suele incluir metadatos de "grounding" (fuentes)
    console.log("Respuesta:", response2.text);
    
    // En algunos SDKs, puedes ver las fuentes utilizadas en remoteMetadata o groundingMetadata
    if (response2.candidates && response2.candidates[0].groundingMetadata) {
        console.log("\nFuentes consultadas:", response2.candidates[0].groundingMetadata.searchEntryPoint);
    }
  } catch (err) {
    console.error("Error en consulta con búsqueda:", err.message);
  }
}

await main();
