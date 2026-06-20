/**
 * Config Loader
 * Loads environment variables from .env.local for local development
 * In production, use Firebase Hosting or GitHub Actions secrets
 */

async function loadConfig() {
  try {
    // Try to load .env.local (only works in dev with a server)
    const response = await fetch('/.env.local');
    if (response.ok) {
      const text = await response.text();
      const lines = text.split('\n');

      lines.forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, ...valueParts] = line.split('=');
          const value = valueParts.join('=').trim();

          if (key.trim()) {
            // Set as global variable for firebase-setup.js to access
            globalThis[key.trim()] = value;
          }
        }
      });

      console.log('✅ Loaded configuration from .env.local');
    }
  } catch (error) {
    // Silently fail if .env.local doesn't exist
    // This is expected in production (GitHub Pages, Firebase Hosting)
    console.debug('No .env.local file found. Using defaults or environment variables.');
  }
}

// Load config before anything else
await loadConfig();
