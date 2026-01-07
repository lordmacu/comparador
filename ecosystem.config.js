module.exports = {
  apps: [
    {
      name: 'blog-generator',
      script: './scripts/generate-blog-post.mjs',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '0 9 * * 1,3,5', // Lunes, Miércoles, Viernes a las 9 AM
      autorestart: false, // No reiniciar automáticamente
      watch: false,
      env: {
        GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY || 'TU_API_KEY_AQUI',
        NODE_ENV: 'production'
      }
    },
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
