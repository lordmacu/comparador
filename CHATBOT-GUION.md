# Guion del Chatbot - Asesor Virtual de Internet

## Objetivo
Simular una conversación natural con un asesor que recopila información del usuario y lo dirige a contactar por WhatsApp o llenar el formulario.

## Flujo de Conversación

### 1. Mensaje de Bienvenida (Auto-aparece después de 2-3 segundos en la página)

**Asesor:** "¡Hola! 👋 Soy Laura, asesora virtual. ¿Te ayudo a encontrar el plan de internet perfecto para ti?"

**Opciones:**
- "Sí, quiero información"
- "Solo estoy mirando"

---

### 2. Si elige "Sí, quiero información"

**Asesor:** "¡Perfecto! Para mostrarte las mejores opciones, ¿qué proveedor te interesa?"

**Opciones:**
- "Claro"
- "Movistar"
- "ETB"
- "No estoy seguro/a"

---

### 3A. Si elige un proveedor específico (ej: Claro)

**Asesor:** "¡Excelente elección! Claro tiene la mejor cobertura nacional y velocidades hasta 900 Mbps 🚀"

**Asesor:** "¿Para cuántas personas es el internet?"

**Opciones:**
- "1-2 personas"
- "3-4 personas"
- "5 o más personas"

---

### 3B. Si elige "No estoy seguro/a"

**Asesor:** "No te preocupes, te ayudo a decidir 😊 ¿En qué ciudad vives?"

**Opciones:**
- "Bogotá"
- "Medellín"
- "Cali"
- "Otra ciudad"

**Respuesta según ciudad:**
- **Bogotá**: "En Bogotá tienes todas las opciones: Claro, Movistar y ETB. ETB es local y tiene promociones especiales 🎁"
- **Otras ciudades**: "Claro y Movistar tienen excelente cobertura en tu ciudad"

---

### 4. Después de conocer el uso

**Asesor:** "Perfecto. ¿Qué uso le darás principalmente?"

**Opciones:**
- "Trabajo remoto"
- "Gaming y streaming"
- "Redes sociales y navegación"
- "Todo lo anterior"

---

### 5. Recomendación según respuestas

**Ejemplos de recomendaciones:**

**Para trabajo remoto:**
"Para trabajo remoto te recomiendo mínimo 300 Mbps, mejor si es simétrica (misma velocidad de subida y bajada) para videollamadas sin cortes 💼"

**Para gaming:**
"Para gaming necesitas velocidad alta (500-900 Mbps) y baja latencia. Fibra óptica es lo mejor 🎮"

**Para familia grande:**
"Para 5+ personas te recomiendo mínimo 500 Mbps, idealmente 900 Mbps para que todos puedan conectarse sin problemas 👨‍👩‍👧‍👦"

---

### 6. Pregunta sobre servicios adicionales

**Asesor:** "¿Te interesa también TV o telefonía?"

**Opciones:**
- "Sí, TV también"
- "Sí, un paquete completo (Internet + TV + Telefonía)"
- "Solo internet"

**Si elige paquete:**
"¡Perfecto! Los paquetes Dúo y Trío tienen descuentos especiales. Con un solo recibo pagas todo 📺💰"

---

### 7. Llamado a la acción final

**Asesor:** "Basándome en lo que me dijiste, [PROVEEDOR] con [VELOCIDAD] Mbps sería ideal para ti."

**Asesor:** "¿Quieres que un asesor te contacte para confirmar disponibilidad en tu zona y darte los precios exactos?"

**Opciones:**
- "Sí, que me llamen"
- "Prefiero WhatsApp"
- "Déjame pensarlo"

---

### 8A. Si elige "Sí, que me llamen"

**Asesor:** "¡Genial! Solo necesito tu número de celular y te llamamos en los próximos minutos 📞"

**[Mostrar input de teléfono]**

**Después de enviar:**
"¡Listo! ✅ Un asesor te contactará muy pronto. Mientras tanto, aquí tienes más información sobre [PROVEEDOR]"

**[Mostrar link a la página del proveedor]**

---

### 8B. Si elige "Prefiero WhatsApp"

**Asesor:** "¡Perfecto! Te redirijo al WhatsApp de [PROVEEDOR]. Menciona que vienes de la web para ofertas exclusivas 🎁"

**[Botón de WhatsApp con mensaje pre-llenado]**

Mensaje pre-llenado:
"Hola, vengo de la web. Me interesa un plan de internet [PROVEEDOR] para [NÚMERO DE PERSONAS] personas, uso principal: [USO]"

---

### 8C. Si elige "Déjame pensarlo"

**Asesor:** "¡Sin problema! Te dejo la información aquí para cuando te decidas:"

**[Mostrar resumen]**
- ✅ Proveedor recomendado: [PROVEEDOR]
- ✅ Velocidad sugerida: [VELOCIDAD] Mbps
- ✅ Ideal para: [USO]
- ✅ Paquete: [TIPO DE PAQUETE]

**Asesor:** "Si cambias de opinión, aquí abajo están los botones de contacto 😊"

---

### 9. Si elige "Solo estoy mirando" (desde el inicio)

**Asesor:** "¡Entendido! Estoy aquí si necesitas ayuda. Solo escribe 'ayuda' cuando quieras hablar 😊"

**[El chat se minimiza pero queda disponible]**

---

## Mensajes de Transición (mientras "escribe")

Para dar sensación de realismo, el bot debe "escribir" por 1-2 segundos antes de cada mensaje:

- "..." (animación de typing)
- Delay aleatorio entre 800ms - 1500ms

---

## Variaciones de Personalidad

El asesor debe ser:
- ✅ Amigable y cercano
- ✅ Usar emojis con moderación (1 por mensaje máximo)
- ✅ Lenguaje natural, no robótico
- ✅ Frases cortas y directas
- ✅ Respuestas rápidas (sensación de chat real)

---

## Casos Especiales

### Si el usuario escribe algo fuera del flujo:

**Usuario escribe texto libre (ej: "cuánto cuesta")**

**Asesor:** "Los precios varían según tu zona y promociones vigentes. ¿Quieres que un asesor te contacte con la información exacta?"

**Opciones:**
- "Sí, que me contacten"
- "Volver al inicio"

---

### Si el usuario tarda mucho en responder (60+ segundos):

**Asesor:** "¿Sigues ahí? Si necesitas más tiempo está bien, estaré aquí cuando vuelvas 😊"

---

## Datos a Capturar (backend/analytics)

Durante la conversación capturar:
1. Proveedor de interés
2. Ciudad
3. Número de personas
4. Uso principal
5. Interés en TV/paquetes
6. Método de contacto preferido
7. Teléfono (si lo provee)

Esto sirve para analytics y para personalizar el seguimiento.

---

## Implementación Técnica Sugerida

1. **Componente ChatBot** (React)
2. **Estado de conversación** (useState con el paso actual)
3. **Animación de typing** (CSS + setTimeout)
4. **Botones de opciones** (más fácil que input libre)
5. **Persistencia** (localStorage para no perder progreso si refrescan)
6. **Integración con formularios** existentes
7. **Tracking** (Google Analytics events para cada paso)

---

## Ejemplo de Conversación Completa

```
[Chat aparece después de 3 segundos]

🤖 Laura: ¡Hola! 👋 Soy Laura, asesora virtual. ¿Te ayudo a encontrar el plan de internet perfecto para ti?

[Sí, quiero información] [Solo estoy mirando]

👤 Usuario: [Sí, quiero información]

🤖 Laura: ¡Perfecto! Para mostrarte las mejores opciones, ¿qué proveedor te interesa?

[Claro] [Movistar] [ETB] [No estoy seguro/a]

👤 Usuario: [Claro]

🤖 Laura: ¡Excelente elección! Claro tiene la mejor cobertura nacional y velocidades hasta 900 Mbps 🚀

🤖 Laura: ¿Para cuántas personas es el internet?

[1-2 personas] [3-4 personas] [5 o más personas]

👤 Usuario: [3-4 personas]

🤖 Laura: Perfecto. ¿Qué uso le darán principalmente?

[Trabajo remoto] [Gaming y streaming] [Redes sociales] [Todo lo anterior]

👤 Usuario: [Gaming y streaming]

🤖 Laura: Para gaming y streaming con 3-4 personas necesitas buena velocidad. Te recomiendo mínimo 500 Mbps de fibra óptica 🎮

🤖 Laura: ¿Te interesa también TV o telefonía?

[Sí, TV también] [Paquete completo] [Solo internet]

👤 Usuario: [Paquete completo]

🤖 Laura: ¡Perfecto! Los paquetes Trío (Internet + TV + Telefonía) de Claro tienen descuentos especiales 📺💰

🤖 Laura: ¿Quieres que un asesor te contacte para confirmar disponibilidad en tu zona y darte los precios exactos?

[Sí, que me llamen] [Prefiero WhatsApp] [Déjame pensarlo]

👤 Usuario: [Sí, que me llamen]

🤖 Laura: ¡Genial! Solo necesito tu número de celular y te llamamos en los próximos minutos 📞

[Input: _ _ _ _ _ _ _ _ _ _]

👤 Usuario: 3001234567

🤖 Laura: ¡Listo! ✅ Un asesor de Claro te contactará muy pronto. Mientras tanto, aquí tienes más información:

[Ver servicios de Claro →]

🤖 Laura: ¿Necesitas ayuda con algo más?
```

---

## Próximos Pasos de Implementación

1. ✅ Definir guion (este documento)
2. ⏳ Crear componente ChatWidget UI
3. ⏳ Implementar lógica de conversación
4. ⏳ Agregar animación de typing
5. ⏳ Integrar con formularios/WhatsApp
6. ⏳ Testing y ajustes
