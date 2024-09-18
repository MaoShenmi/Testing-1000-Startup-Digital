import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://web.1000startupdigital.id/authorization/login');
});

const login = async (page, email, sandi) => {
    if (email) {
        await page.locator('#input-14').fill(email);
    }
    if (sandi) {
        await page.locator('#input-17').fill(sandi);
    }

};

test('Password Kosong', async ({ page }) => {
    await login(page, 'cobatestqa@gmail.com', null);
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await expect(page.getByText('Kata sandi wajib diisi')).toBeVisible();
});

test('Email Kosong', async ({ page }) => {
    await login(page, null, 'cobatest');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await expect(page.getByText('Masukan email kamu terlebih dahulu')).toBeVisible();
});

test('Email tidak terdaftar', async ({ page }) => {
    await login(page, 'tidakterdaftar@gmail.com', 'cobatest');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await expect(page.getByText('Email kamu belum terdaftar,')).toBeVisible();
    await page.getByRole('button', { name: 'Batal' }).click();
});

test('Password salah', async ({ page }) => {
    await login(page, 'cobatestqa@gmail.com', 'cobacoba');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await expect(page.getByText('Masuk gagal, mohon periksa')).toBeVisible();
    await page.getByRole('button', { name: 'OKAY' }).click();
});

test('Login Valid', async ({ page }) => {

    await login(page, 'cobatestqa@gmail.com', 'cobatest');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await page.context().storageState({ path: 'loginSession.json' });
    await expect(page.getByRole('heading', { name: 'Tahapan yang berlangsung saat' })).toBeVisible();
}); 

test.use({ storageState: 'loginSession.json' });

test('Logout', async ({ page }) => {
    await page.goto('https://web.1000startupdigital.id/home?activeItem=0')
    await login(page, 'cobatestqa@gmail.com', 'cobatest');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Tahapan yang berlangsung saat' })).toBeVisible();
    await expect(page.getByText('Tahapan yang berlangsung saat ini Seminar online yang memberikan pemahaman dan')).toBeVisible();
    await expect(page.getByText('Keluar')).toBeVisible();
    await page.getByText('Keluar').click();
    await expect(page.locator('#app div').filter({ hasText: 'Satukan keberagaman jadi' }).nth(3)).toBeVisible();
});