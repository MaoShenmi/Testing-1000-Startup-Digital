import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://1000startupdigital.id/');
    });

test('Dashboard Konten', async ({ page }) => {
    await page.getByRole('link', { name: 'Daftar Sekarang' }).click();
    await page.locator('#menu-item-22').getByRole('link', { name: 'Beranda' }).click();
    await expect(page.locator('section').filter({ hasText: '01 Ignition Seminar online' })).toBeVisible();
    // await expect(page.getByRole('tablist').locator('div').filter({ hasText: 'Workshop' })).toBeVisible();
    // await page.getByRole('button', { name: 'Workshop' }).click();
    // await page.getByRole('button', { name: 'Hacksprint' }).click();
    // await page.getByRole('button', { name: 'Bootcamp' }).click();
    // await page.getByRole('button', { name: 'Hatch' }).click();
    // await page.getByRole('button', { name: 'Ignition' }).click();
    await page.getByRole('link', { name: 'Lihat Semua' }).first().click();
    await page.locator('#menu-item-22').getByRole('link', { name: 'Beranda' }).click();
    // await page.locator('.link-block').first().click();
    // await page.locator('#menu-item-22').getByRole('link', { name: 'Beranda' }).click();
    // await page.locator('div:nth-child(2) > div > div > .elementor-section > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap > div:nth-child(4) > .elementor-widget-container > .link-block').click();
    // await page.locator('#menu-item-22').click();
    // await page.locator('div:nth-child(3) > div > div > .elementor-section > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap > div:nth-child(4) > .elementor-widget-container > .link-block').click();
    // await page.locator('#menu-item-22').click();
});

test('Dashboard Header', async ({ page }) => {
    await page.locator('#menu-item-29').getByRole('link', { name: 'Tentang' }).click();
    await expect(page.locator('#content').getByRole('heading', { name: 'Tentang' })).toBeVisible();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('heading', { name: 'Rintis startupmu bersama' }).click();
    // await expect(page.locator('#menu-item-68').getByText('IgnitionWorkshopHacksprintBootcampHatch')).toBeVisible();
    // await page.locator('#menu-item-68').getByRole('link', { name: 'Ignition' }).click();
    // await page.locator('#menu-item-68').getByRole('link', { name: 'Workshop' }).click();
    // await page.locator('#menu-item-68').getByRole('link', { name: 'Hacksprint' }).click();
    // await page.locator('#menu-item-68').getByRole('link', { name: 'Bootcamp' }).click();
    // await page.locator('#menu-item-68').getByRole('link', { name: 'Hatch' }).click();
    await page.locator('#menu-item-5468').getByRole('link', { name: 'Blog' }).click();
    // await page.locator('#menu-item-9813').getByRole('link', { name: 'Forum' }).click();
    // await page.frameLocator('iframe[src="https\\:\\/\\/forum\\.1000startupdigital\\.id\\/\\?_gl\\=1\\*1iictyu\\*_gcl_au\\*ODg1NDU4NDM4LjE3MjUzODY5MzQ\\.\\*_ga\\*MTM2Njk4NzkzMi4xNzI1Mzg2OTIz\\*_ga_WVZB4TLKBP\\*MTcyNTM4NjkyMy4xLjEuMTcyNTM4Nzk0MC4wLjAuMA\\.\\.\\*_ga_8M015JTGCF\\*MTcyNTM4NjkyNC4xLjEuMTcyNTM4Nzk0MC4zNy4wLjA\\.\\&_ga\\=2\\.147085556\\.2597539\\.1725386924-1366987932\\.1725386923"]').locator('body').click();
    await page.locator('#menu-item-9819').getByRole('link', { name: 'Aplikasi' }).click();
    await page.goto('https://1000startupdigital.id/aplikasi/');
    await page.locator('li').filter({ hasText: 'Search for: Search' }).click();
    await page.getByPlaceholder('Search …').click();
    await page.getByPlaceholder('Search …').fill('Sekolah Beta');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('heading', { name: 'Search Results for: Sekolah' })).toBeVisible();
});

test('Dashboard Footer', async ({ page }) => {
    await page.locator('#menu-item-2402').getByRole('link', { name: 'Blog' }).click();
    await page.locator('#menu-item-92').getByRole('link', { name: 'Beranda' }).click();
    await page.locator('#menu-item-2410').getByRole('link', { name: 'Tentang' }).click();
    await page.locator('#menu-item-2411').getByRole('link', { name: 'Program' }).click();
    await page.getByRole('link', { name: 'Mentor' }).click();
    await page.getByRole('link', { name: 'Startup', exact: true }).click();
    await page.getByRole('link', { name: 'Penggerak' }).click();
    await page.goto('https://1000startupdigital.id/startup/');
    await page.getByRole('link', { name: 'Buku Saku Rintisan' }).click();
    await page.goto('https://1000startupdigital.id/startup/');
    await page.getByRole('link', { name: 'Sekolah Beta Kelas Daring' }).click();
    await page.goto('https://1000startupdigital.id/startup/');
    await page.locator('#menu-item-10224').getByRole('link', { name: 'Cakap Startup' }).click();
    await page.goto('https://1000startupdigital.id/startup/');
    await page.getByRole('link', { name: 'Komunitas' }).click();
    await page.getByRole('link', { name: 'Kalender' }).click();
    await page.getByRole('link', { name: 'FAQ' }).click();
    await page.getByRole('link', { name: 'Brand Guideline' }).click();
    await page.getByRole('link', { name: 'Kontak' }).click();
});
