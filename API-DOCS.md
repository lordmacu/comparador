# API Documentation - ChatGPT Assistant Server

Servidor local para automatizar ChatGPT sin API keys.

**Base URL:** `http://localhost:54321`

---

## 📋 Índice

- [Estado del Sistema](#estado-del-sistema)
- [Gestión de Prompts](#gestión-de-prompts)
- [Guardar Respuestas](#guardar-respuestas)
- [Conversaciones](#conversaciones)
- [Sistema de Bloqueo](#sistema-de-bloqueo)

---

## Estado del Sistema

### GET `/api/status`

Consulta si el sistema está disponible o procesando un prompt.

**Respuesta cuando está disponible:**
```json
{
  "isProcessing": false,
  "taskId": null,
  "available": true
}
```

**Respuesta cuando está ocupado:**
```json
{
  "isProcessing": true,
  "taskId": 1738012345678,
  "available": false
}
```

**Ejemplo:**
```bash
curl http://localhost:54321/api/status
```

---

## Gestión de Prompts

### GET `/api/prompt`

Obtiene el prompt actual del archivo `prompt.json`. 

**⚠️ Importante:** Este endpoint **bloquea automáticamente** el sistema cuando detecta un prompt nuevo.

**Respuesta:**
```json
{
  "prompt": "Escribe una historia corta sobre robots",
  "newChat": true,
  "saveLastMessageOnly": false,
  "id": 12345,
  "extractJson": false,
  "isImage": false,
  "focused": false,
  "isProcessing": false,
  "taskId": null
}
```

**Parámetros:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `prompt` | string | Texto a enviar a ChatGPT |
| `newChat` | boolean | `true`: Crea nueva conversación<br>`false`: Continúa en la misma |
| `saveLastMessageOnly` | boolean | `true`: Guarda solo la respuesta<br>`false`: Guarda toda la conversación |
| `id` | string/number/null | ID personalizado para el archivo (nombre del JSON) |
| `extractJson` | boolean | `true`: Extrae JSON de la respuesta<br>`false`: Guarda texto completo |
| `isImage` | boolean | `true`: La respuesta esperada es una imagen |
| `focused` | boolean | `true`: Ventana de ChatGPT aparece en primer plano<br>`false`: Se abre en segundo plano |

**Ejemplo:**
```bash
curl http://localhost:54321/api/prompt
```

---

### POST `/api/prompt/set`

Establece un nuevo prompt para procesar.

**⚠️ Protección:** Rechaza con error **409** si el sistema está ocupado.

**Body (JSON):**
```json
{
  "prompt": "Dame 3 ideas de nombres para una startup de IA",
  "newChat": true,
  "saveLastMessageOnly": true,
  "id": "nombres_startup",
  "extractJson": false,
  "isImage": false,
  "focused": false
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Prompt establecido correctamente",
  "data": {
    "prompt": "Dame 3 ideas de nombres para una startup de IA",
    "newChat": true,
    "saveLastMessageOnly": true,
    "id": "nombres_startup",
    "extractJson": false,
    "isImage": false,
    "focused": false
  }
}
```

**Error (sistema ocupado):**
```json
{
  "error": "El sistema está ocupado procesando un prompt. Intenta de nuevo más tarde.",
  "isProcessing": true,
  "taskId": 1738012345678
}
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:54321/api/prompt/set \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explica qué es la computación cuántica en 50 palabras",
    "newChat": true,
    "saveLastMessageOnly": true,
    "id": "computacion_cuantica",
    "extractJson": false
  }'
```

**Ejemplo con JavaScript:**
```javascript
async function enviarPrompt(texto, idArchivo) {
  const response = await fetch('http://localhost:54321/api/prompt/set', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: texto,
      newChat: true,
      saveLastMessageOnly: true,
      id: idArchivo,
      extractJson: false
    })
  });
  
  return await response.json();
}

// Uso
await enviarPrompt('Escribe un poema sobre el mar', 'poema_mar');
```

**Ejemplo con Python:**
```python
import requests

def enviar_prompt(texto, id_archivo):
    url = 'http://localhost:54321/api/prompt/set'
    data = {
        'prompt': texto,
        'newChat': True,
        'saveLastMessageOnly': True,
        'id': id_archivo,
        'extractJson': False
    }
    
    response = requests.post(url, json=data)
    return response.json()

# Uso
resultado = enviar_prompt('Escribe un haiku sobre la luna', 'haiku_luna')
print(resultado)
```

---

### POST `/api/prompt/clear`

Limpia el prompt actual y resetea a valores por defecto.

**Respuesta:**
```json
{
  "success": true
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:54321/api/prompt/clear
```

---

## Guardar Respuestas

### POST `/api/save`

**⚠️ Uso interno:** Este endpoint es llamado automáticamente por la extensión cuando ChatGPT termina de responder. **Desbloquea automáticamente** el sistema.

**Body (JSON):**
```json
{
  "text": "Aquí está la respuesta de ChatGPT...",
  "prompt": "El prompt original",
  "extractJson": false,
  "promptId": "mi_id_personalizado"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Respuesta guardada correctamente",
  "conversationId": "mi_id_personalizado",
  "messageCount": 2,
  "total": 1
}
```

---

## Conversaciones

### GET `/api/conversations`

Lista todas las conversaciones guardadas.

**Respuesta:**
```json
{
  "conversations": [
    {
      "id": "historia_001",
      "createdAt": "2026-01-26T10:30:00.000Z",
      "updatedAt": "2026-01-26T10:31:45.000Z",
      "messageCount": 4
    },
    {
      "id": "conv_1738012345678_abc123",
      "createdAt": "2026-01-26T09:15:00.000Z",
      "updatedAt": "2026-01-26T09:16:20.000Z",
      "messageCount": 2
    }
  ]
}
```

**Ejemplo:**
```bash
curl http://localhost:54321/api/conversations
```

---

### GET `/api/conversations/:id`

Obtiene una conversación específica por su ID.

**⚠️ Importante:** Si el campo `text` contiene JSON, se parsea automáticamente y se devuelve como objeto.

**Respuesta (texto normal):**
```json
{
  "id": "historia_001",
  "createdAt": "2026-01-26T10:30:00.000Z",
  "updatedAt": "2026-01-26T10:31:45.000Z",
  "promptId": "historia_001",
  "messages": [
    {
      "role": "user",
      "text": "Escribe una historia sobre robots",
      "timestamp": "2026-01-26T10:30:00.000Z"
    },
    {
      "role": "assistant",
      "text": "Había una vez un robot llamado R2...",
      "timestamp": "2026-01-26T10:31:45.000Z"
    }
  ]
}
```

**Respuesta (con JSON parseado):**
```json
{
  "id": "productos_json",
  "messages": [
    {
      "role": "assistant",
      "text": {
        "nombre": "Laptop Pro",
        "precio": 1299,
        "categoria": "Electrónica"
      },
      "timestamp": "2026-01-26T10:35:00.000Z"
    }
  ]
}
```

**Error (archivo no existe):**
```json
{
  "error": "Aún no se ha generado el archivo",
  "id": "archivo_inexistente"
}
```

**Ejemplo:**
```bash
curl http://localhost:54321/api/conversations/historia_001
```

**Ejemplo con JavaScript:**
```javascript
async function obtenerConversacion(id) {
  const response = await fetch(`http://localhost:54321/api/conversations/${id}`);
  if (response.status === 404) {
    console.log('Archivo aún no generado');
    return null;
  }
  return await response.json();
}

// Uso
const conversacion = await obtenerConversacion('mi_historia');
```

**Ejemplo con Python:**
```python
import requests
import time

def esperar_conversacion(id_archivo, max_intentos=30):
    """Espera a que se genere la conversación"""
    url = f'http://localhost:54321/api/conversations/{id_archivo}'
    
    for i in range(max_intentos):
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json()
        
        print(f'Intento {i+1}/{max_intentos} - Esperando...')
        time.sleep(2)
    
    return None

# Uso
conv = esperar_conversacion('mi_historia')
if conv:
    print('Respuesta:', conv['messages'][-1]['text'])
```

---

### GET `/api/conversations/current`

Obtiene la conversación actual activa.

**Respuesta:**
```json
{
  "conversationId": "conv_1738012345678_abc123",
  "conversation": {
    "id": "conv_1738012345678_abc123",
    "messages": [...]
  }
}
```

**Si no hay conversación activa:**
```json
{
  "conversationId": null,
  "conversation": null
}
```

**Ejemplo:**
```bash
curl http://localhost:54321/api/conversations/current
```

---

## Sistema de Bloqueo

El servidor implementa un sistema de bloqueo para **evitar procesamiento simultáneo** de prompts.

### Cómo funciona:

1. **Bloqueo automático:** Cuando `GET /api/prompt` detecta un prompt nuevo, marca `isProcessing = true`
2. **Protección:** `POST /api/prompt/set` rechaza con error **409** si `isProcessing = true`
3. **Desbloqueo automático:** Cuando `POST /api/save` guarda la respuesta, marca `isProcessing = false`
4. **Timeout de seguridad:** Si el sistema está bloqueado por **más de 3 minutos**, se resetea automáticamente

### Flujo completo seguro:

```javascript
async function procesarPromptSeguro(texto, id) {
  // 1. Verificar disponibilidad
  let status = await fetch('http://localhost:54321/api/status').then(r => r.json());
  
  while (!status.available) {
    console.log('Sistema ocupado, esperando...');
    await new Promise(r => setTimeout(r, 2000));
    status = await fetch('http://localhost:54321/api/status').then(r => r.json());
  }
  
  // 2. Enviar prompt
  const response = await fetch('http://localhost:54321/api/prompt/set', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: texto,
      newChat: true,
      saveLastMessageOnly: true,
      id: id
    })
  });
  
  if (response.status === 409) {
    console.log('Conflicto - reintentar');
    await new Promise(r => setTimeout(r, 2000));
    return procesarPromptSeguro(texto, id); // Reintentar
  }
  
  // 3. Esperar a que se genere la conversación
  let intentos = 0;
  while (intentos < 60) { // Máximo 2 minutos
    const conv = await fetch(`http://localhost:54321/api/conversations/${id}`)
      .then(r => r.status === 200 ? r.json() : null);
    
    if (conv) {
      return conv; // ¡Listo!
    }
    
    await new Promise(r => setTimeout(r, 2000));
    intentos++;
  }
  
  throw new Error('Timeout esperando respuesta');
}

// Uso
const resultado = await procesarPromptSeguro('Explica la fotosíntesis', 'fotosintesis');
console.log(resultado.messages[0].text);
```

---

## Casos de Uso Completos

### 1. Generar múltiples historias

```javascript
const historias = [
  { id: 'historia_1', prompt: 'Escribe sobre un viaje espacial' },
  { id: 'historia_2', prompt: 'Escribe sobre un detective robot' },
  { id: 'historia_3', prompt: 'Escribe sobre un dragón amigable' }
];

for (const historia of historias) {
  // Esperar disponibilidad
  let disponible = false;
  while (!disponible) {
    const status = await fetch('http://localhost:54321/api/status').then(r => r.json());
    disponible = status.available;
    if (!disponible) await new Promise(r => setTimeout(r, 2000));
  }
  
  // Enviar prompt
  await fetch('http://localhost:54321/api/prompt/set', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: historia.prompt,
      id: historia.id,
      newChat: true,
      saveLastMessageOnly: true
    })
  });
  
  console.log(`Prompt "${historia.id}" enviado`);
  
  // Esperar a que termine (el sistema se desbloquea cuando guarda)
  await new Promise(r => setTimeout(r, 5000));
}
```

### 2. Extraer JSON estructurado

```bash
# Enviar prompt que genera JSON
curl -X POST http://localhost:54321/api/prompt/set \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Genera un JSON con 3 productos. Cada uno debe tener: nombre, precio, categoría. SOLO JSON, sin explicaciones.",
    "id": "productos",
    "extractJson": true,
    "saveLastMessageOnly": true,
    "newChat": true
  }'

# Esperar unos segundos...
sleep 10

# Obtener resultado parseado
curl http://localhost:54321/api/conversations/productos
```

### 3. Generar imágenes con DALL-E

```bash
curl -X POST http://localhost:54321/api/prompt/set \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Genera una imagen de un gato astronauta en el espacio",
    "id": "gato_astronauta",
    "isImage": true,
    "saveLastMessageOnly": true,
    "newChat": true
  }'

# Las imágenes se guardan como base64 en el campo text
```

---

## Notas Importantes

### Timeout de 3 minutos
Si el sistema queda bloqueado por más de 3 minutos (por error o fallo), se resetea automáticamente.

### Puerto configurable
El puerto por defecto es **54321**, pero puedes cambiarlo editando la variable de entorno `PORT` en el archivo plist.

### Logs
Los logs del servidor se guardan en:
- Output: `/Users/cristian/aiextension/test-server/logs/output.log`
- Errores: `/Users/cristian/aiextension/test-server/logs/error.log`

### Archivos generados
Las conversaciones se guardan en:
`/Users/cristian/aiextension/test-server/conversations/{id}.json`

---

## Troubleshooting

### El servidor no responde
```bash
# Verificar que el servicio esté corriendo
launchctl list | grep chatgpt

# Ver logs de errores
tail -f /Users/cristian/aiextension/test-server/logs/error.log

# Reiniciar servicio
launchctl unload ~/Library/LaunchAgents/com.chatgpt.assistant.plist
launchctl load ~/Library/LaunchAgents/com.chatgpt.assistant.plist
```

### Error 409 (Conflict)
El sistema está ocupado. Espera unos segundos y reintenta, o verifica el estado con `/api/status`.

### Error 404 en conversación
El archivo aún no se ha generado. La extensión aún está procesando el prompt en ChatGPT.

### Sistema bloqueado permanentemente
Si por alguna razón el sistema queda bloqueado y no se resetea solo después de 3 minutos, puedes reiniciar el servidor manualmente.

---

## Ejemplos de Integración

### Node.js / Express
```javascript
const axios = require('axios');

async function usarChatGPT(prompt, id) {
  try {
    await axios.post('http://localhost:54321/api/prompt/set', {
      prompt,
      id,
      newChat: true,
      saveLastMessageOnly: true
    });
    
    // Esperar resultado
    let intentos = 0;
    while (intentos < 30) {
      try {
        const response = await axios.get(`http://localhost:54321/api/conversations/${id}`);
        return response.data;
      } catch (error) {
        if (error.response?.status === 404) {
          await new Promise(r => setTimeout(r, 2000));
          intentos++;
        } else {
          throw error;
        }
      }
    }
    throw new Error('Timeout');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### Python / Flask
```python
import requests
import time

def usar_chatgpt(prompt, id_archivo):
    # Enviar prompt
    requests.post('http://localhost:54321/api/prompt/set', json={
        'prompt': prompt,
        'id': id_archivo,
        'newChat': True,
        'saveLastMessageOnly': True
    })
    
    # Esperar resultado
    for _ in range(30):
        try:
            response = requests.get(f'http://localhost:54321/api/conversations/{id_archivo}')
            if response.status_code == 200:
                return response.json()
        except:
            pass
        time.sleep(2)
    
    raise Exception('Timeout')
```

---

**Versión:** 1.0  
**Puerto:** 54321  
**Última actualización:** 26 de enero de 2026
