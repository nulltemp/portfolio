import { defineConfig, devices } from "@playwright/test";

const port = 4173;

// UI テストは、本番と同じく vite-ssg でプリレンダリングした dist/ を vite preview で配信して実行する。
// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] }
    }
  ],
  webServer: {
    command: `npm run build && npm run serve -- --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000
  }
});
