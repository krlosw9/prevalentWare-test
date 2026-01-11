import { test, expect } from '@playwright/test';

test.describe('Smoke Test - Public Pages', () => {
  test('debe redirigir al login si no está autenticado', async ({ page }) => {
    await page.goto('/');
    // Debería redirigir a /sign-in
    await expect(page).toHaveURL(/.*sign-in/);
  });

  test('la página de login debe cargar correctamente', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.getByText('Iniciar Sesión')).toBeVisible();
    await expect(page.getByText('Continuar con GitHub')).toBeVisible();
  });

  test('debe redirigir al login si se intenta acceder a /movements sin sesión', async ({ page }) => {
    await page.goto('/movements');
    await expect(page).toHaveURL(/.*sign-in/);
  });

  test('debe redirigir al login si se intenta acceder a /reports sin sesión', async ({ page }) => {
    await page.goto('/reports');
    await expect(page).toHaveURL(/.*sign-in/);
  });
});
