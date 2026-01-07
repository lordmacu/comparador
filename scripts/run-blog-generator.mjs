#!/usr/bin/env node

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

// Verificar API key
if (!process.env.GOOGLE_AI_API_KEY && !process.env.API_KEY) {
  console.error('❌ Error: GOOGLE_AI_API_KEY no está configurada');
  console.error('Configura la variable de entorno en .env o en el sistema');
  process.exit(1);
}

// Importar y ejecutar el script principal
import('./generate-blog-post.mjs');
