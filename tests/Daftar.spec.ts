import { test, expect, _baseTest } from '@playwright/test';


test.describe('Daftar', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto('https://web.1000startupdigital.id/authorization/registration/');
    });

    const daftar = async (page, nama, jenis_kelamin, domisili, email, sandi, ksandi) => {
        if(nama){
            await page.getByPlaceholder('Tuliskan nama lengkap').fill(nama)
            await expect(page.getByPlaceholder('Tuliskan nama lengkap')).toHaveValue(nama);
        }
        
        await page.getByRole('button').first().click()
        if(jenis_kelamin){
            await page.getByText(jenis_kelamin).click();
            await expect(page.getByRole('button', { name: jenis_kelamin })).toBeVisible();
        }
        
        await page.getByRole('combobox').locator('i').click();
        if(domisili){
            await page.getByText(domisili).click()
            await expect(page.getByPlaceholder('Pilih Domisili')).toHaveValue(domisili);
        }

        // await page.getByText(jenis_kelamin).click()
        // await expect(page.getByRole('button', { name: jenis_kelamin })).toBeVisible();
        await page.getByPlaceholder('Alamat e-mail Anda').fill(email);
        await expect(page.getByPlaceholder('Alamat e-mail Anda')).toHaveValue(email);
        await page.getByPlaceholder('Kata sandi', { exact: true }).fill(sandi);
        await expect(page.getByPlaceholder('Kata sandi', { exact: true })).toHaveValue(sandi);
        await page.getByPlaceholder('Konfirmasi Kata sandi').fill(ksandi);
        await expect(page.getByPlaceholder('Konfirmasi Kata sandi')).toHaveValue(ksandi);
    };

    // const validasiDaftar = async (page) => {

    //     try {
    //         switch (await expect(page.getByRole('heading', { name: 'Berhasil registrasi, link' })).toBeVisible()) { // Ganti 'kondisi' dengan variabel yang sesuai
    //             case 1:
    //                 console.log('Registrasi berhasil!');
    //                 break;
    //             case 2:
    //                 await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    //                 console.log('Data belum lengkap');
    //                 break;
    //             default:
    //                 await expect(page.getByRole('heading', { name: 'Kata Sandi & Konfirmasi Kata' })).toBeVisible();
    //                 console.log('Data belum lengkap');
    //         }
    //     } catch (error) {
    //         console.error('Terjadi kesalahan:', error);
    //     }
    // }

    test('valid Daftar', async ({ page }) => {
        await daftar(page, 'aac', 'Laki-laki', 'BALI', '1000validregis1@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.locator('.v-overlay__scrim')).toBeVisible();
    });

    test('Mengosongkan Nama', async ({ page }) => {
        await daftar(page, '', 'Laki-laki', 'BALI', '1000invalid1@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });

    test('Mengosongkan Jenis Kelamin', async ({ page }) => {
        await daftar(page, 'jenis kelamin kosong', null, 'BALI', '1000invalid2@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });
    
    test('Mengosongkan Domisili', async ({ page }) => {
        await daftar(page, 'Domisili Kosong', 'laki-laki', null, '1000invalid3@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });
    
    test('Mengosongkan Email', async ({ page }) => {
        await daftar(page, 'Email Kosong', 'laki-laki', 'BALI', '', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });
    
    test('Kata Sandi dan Konfirmasi Sandi tidak sesuai', async ({ page }) => {
        await daftar(page, 'Sandi & Konfirmasi tidak sesuai', 'laki-laki', 'BALI', '1000invalid5@gmail.com', 'cobacoba', 'cobacoba11');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByRole('heading', { name: 'Kata Sandi & Konfirmasi Kata' })).toBeVisible();
        // await validasiDaftar(page);
    });

});