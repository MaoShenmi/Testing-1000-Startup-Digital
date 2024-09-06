import { test, expect, _baseTest } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://web.1000startupdigital.id/authorization/login');
    await page.locator('#input-14').fill('cobatestqa@gmail.com');
    await page.locator('#input-17').fill('cobatest');
    await page.context().storageState({ path: 'loginSession.json' });
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
});

test.use({ storageState: 'loginSession.json' });

test('Pencarian Data', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('label:text("Cari kegiatan, video, buku,")', { state: 'visible' });
    await page.getByLabel('Cari kegiatan, video, buku,').click();
    await page.locator('#input-57').fill('Hipster');
    // await page.waitForSelector('role=menuitem[name="‍ [HIPSTER] Sekolah Beta Kelompok Belajar 02 : Product Research"]');
    await page.getByRole('menuitem', { name: '👩🏼‍🎨 [HIPSTER] Sekolah Beta Kelompok Belajar 02 : Product Research' }).click();
    await expect(page.getByText('Minggu lalu kita sudah')).toBeVisible();
});

test('Sidebar', async ({ page }) => {
    await page.getByRole('link', { name: 'Workshop' }).click();
    await expect(page.locator('.information-box')).toBeVisible();
    await page.getByRole('link', { name: 'Beranda' }).click();
    await expect(page.getByText('Tahapan yang berlangsung saat ini Seminar online yang memberikan pemahaman dan')).toBeVisible();
    await page.getByRole('link', { name: 'Activity Forum' }).click();
    await page.screenshot({path: "forum.png"});
    await expect(page.getByRole('link', { name: 'Sekolah Beta' })).toBeVisible();
    await page.getByRole('link', { name: 'Sekolah Beta' }).click();
    await page.screenshot({path: "sekolahBeta.png"});
    await page.getByRole('link', { name: 'Markas' }).click();
    await expect(page.getByRole('main').locator('div').filter({ hasText: 'Gain knowledge. Get mentored' }).nth(3)).toBeVisible();
    await page.getByRole('link', { name: 'Startup' }).click();
    await expect(page.locator('.col').first()).toBeVisible();
    await page.getByRole('link', { name: 'Profil' }).click();
    await expect(page.locator('#profile-page')).toBeVisible();
});

test('Page Beranda', async ({ page }) => {
    await page.locator('div:nth-child(2) > .img-text').click();
    await expect(page.locator('#home-page div').filter({ hasText: 'Pembekalan pengetahuan teknis' }).nth(4)).toBeVisible();
    await page.locator('.flex > .img-text').first().click();
    await expect(page.locator('#home-page div').filter({ hasText: 'Seminar online yang' }).nth(4)).toBeVisible();
    await page.locator('div:nth-child(3) > .img-text').click();
    await expect(page.locator('#home-page div').filter({ hasText: 'Kegiatan Ideathon luring' }).nth(4)).toBeVisible();
    await page.locator('div:nth-child(4) > .img-text').click();
    await expect(page.locator('#home-page div').filter({ hasText: 'Kegiatan pendampingan dengan' }).nth(4)).toBeVisible();
    await page.locator('div:nth-child(5) > .img-text').click();
    await expect(page.locator('#home-page div').filter({ hasText: 'Tahapan persiapan serta' }).nth(4)).toBeVisible();
    await page.locator('div:nth-child(6) > .img-text').click();
    await expect(page.locator('#home-page div').filter({ hasText: 'Hatch! adalah program' }).nth(4)).toBeVisible();
    await page.getByLabel('Next visual').click();  
});

test('Page Workshop', async ({ page }) => {
    await page.getByRole('link', { name: 'Workshop' }).click();
    await expect(page.locator('.information-box')).toBeVisible();
    await page.getByText('PENCAPAIAN SAYA 0%').first().click();
    await expect(page.locator('.workshop-box-module').first()).toBeVisible();
    await page.getByText('HIPSTER - Modul 1').click();
    await expect(page.locator('.container > div > div').first()).toBeVisible();
    await page.goto('https://web.1000startupdigital.id/workshop/HIP');
    await expect(page.getByRole('tab', { name: 'Progress Modul' })).toBeVisible();
    await page.getByRole('tab', { name: 'Progress Modul' }).click();
    await expect(page.locator('.container > div > div').first()).toBeVisible();  
});

test('Page Markas', async ({ page }) => {
    await page.getByRole('link', { name: 'Markas' }).click();
    await page.locator('div').filter({ hasText: /^Gedung Tersedia Lihat Semua$/ }).locator('h6').click();
    await expect(page.getByText('MARKAS Markas Aceh Coming')).toBeVisible();
    await page.locator('.row > div:nth-child(2)').click();
    await expect(page.getByText('MARKAS Markas Bali Deskripsi')).toBeVisible();
});

test('Page Startup', async ({ page }) => {
    await page.getByRole('link', { name: 'Startup', exact: true }).click();
    await expect(page.locator('.col > .container > div')).toBeVisible();
    await page.getByRole('main').getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Kota Pelaksanaan' }).click();
    await page.locator('div').filter({ hasText: /^Hub 10 \(Bali, NTB, Maluku\)$/ }).first().click();
    await page.locator('div:nth-child(5) > div > .item-wrapper').click();
    await expect(page.locator('.container > div > div').first()).toBeVisible();
});

test('Page profil', async ({ page }) => {
    await page.getByRole('link', { name: 'Profil' }).click();
    await expect(page.locator('#profile-page')).toBeVisible();
    await page.getByRole('link', { name: 'Tim Startup Kamu' }).click();
    await expect(page.getByText('Buat Team Startup Kamu Buatlah tim startup dengan minimal 3 orang. Setiap tim')).toBeVisible();
    await page.getByRole('link', { name: 'Pengaturan Profil' }).click();
    await expect(page.locator('#desktop-screen div').filter({ hasText: 'Ganti Foto Ubah Biodata Diri' }).first()).toBeVisible();
    await page.getByRole('link', { name: 'Guidelines' }).click();
    await expect(page.locator('#guideline div').filter({ hasText: 'Guideline Bagaimana Cara' }).nth(3)).toBeVisible();
    await page.locator('#guideline').getByRole('img').first().click();
    await expect(page.locator('#guideline div').filter({ hasText: 'Bagaimana Cara Mengikuti Tahapan Workshop #1000StartupDigital? Bagaimana Cara' }).nth(3)).toBeVisible();
    await page.getByRole('link', { name: 'Guidelines' }).click();
    await page.getByLabel('Next visual').click();
    await page.getByLabel('Next visual').click();
    await page.getByLabel('Next visual').click();
    await page.getByLabel('Next visual').click();
    await page.getByText('Call Center').click();
    await page.screenshot({path: "callcenter.png"});
    await page.getByText('Riwayat Markas').click();
    await expect(page.getByRole('main').locator('div').filter({ hasText: 'MARKAS' }).first()).toBeVisible();

});

test('Ubah Data Diri', async ({ page }) => {
    await page.getByRole('link', { name: 'Profil' }).click();
    await expect(page.locator('#desktop-screen div').filter({ hasText: 'Ganti Foto Ubah Biodata Diri' }).first()).toBeVisible();
    await page.getByPlaceholder('Tuliskan nama lengkap').fill('Coba Test QA');
    await page.getByPlaceholder('Contoh: Kreasi Digital').fill('-');
    await page.getByPlaceholder('Contoh: Graphic Designer').fill('Graphic Designer');
    await page.getByPlaceholder('Contoh: 081233445566').fill('0987654321098');
    await page.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'Hub 5 (Kalimantan Barat,' }).locator('div').first().click();
    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByText('Data berhasil disimpan')).toBeVisible();
    await page.getByRole('button', { name: 'OKAY' }).click();
    await page.getByRole('link', { name: 'Profil' }).click();
});
