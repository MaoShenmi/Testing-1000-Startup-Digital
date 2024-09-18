import { test, expect, _baseTest } from '@playwright/test';


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
        
        await page.getByPlaceholder('Alamat e-mail Anda').fill(email);
        await expect(page.getByPlaceholder('Alamat e-mail Anda')).toHaveValue(email);
        await page.getByPlaceholder('Kata sandi', { exact: true }).fill(sandi);
        await expect(page.getByPlaceholder('Kata sandi', { exact: true })).toHaveValue(sandi);
        await page.getByPlaceholder('Konfirmasi Kata sandi').fill(ksandi);
        await expect(page.getByPlaceholder('Konfirmasi Kata sandi')).toHaveValue(ksandi);
    };

    const syaratKebijakan = async ( page, link ) => {
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: link }).click();
        const page1 = await page1Promise;
        const syarat = await page1.getByRole('heading', { name: 'Syarat & Ketentuan' });
        const kebijakan = await page1.getByRole('heading', { name: 'Kebijakan Privasi' });

        try {
            await expect(syarat).toBeVisible();
            await page1.getByRole('button', { name: 'A. PEMBUKAAN AKUN ANDA' }).click();
            // await page1.waitForTimeout(1500);
            await expect(page1.getByLabel('A. PEMBUKAAN AKUN ANDA')).toBeVisible();
            await page1.getByRole('button', { name: 'B. INFORMASI PRIBADI ANDA' }).click();
            // await page1.waitForTimeout(1500);
            await expect(page1.getByLabel('B. INFORMASI PRIBADI ANDA')).toBeVisible();
            await page1.getByRole('button', { name: 'C. AKSES TERHADAP PLATFORM' }).click();
            // await page1.waitForTimeout(1500);
            await page1.getByLabel('C. AKSES TERHADAP PLATFORM').click();
            
        } catch (error) {
            await expect(kebijakan).toBeVisible();
            await page1.getByRole('button', { name: 'A. INFORMASI PRIBADI YANG' }).click();
            // await page1.waitForTimeout(1500);
            await expect(page1.getByLabel('A. INFORMASI PRIBADI YANG')).toBeVisible();
            await page1.getByRole('button', { name: 'B. PENGGUNAAN INFORMASI' }).click();
            // await page1.waitForTimeout(1500);
            await expect(page1.getByLabel('B. PENGGUNAAN INFORMASI')).toBeVisible();
            await page1.getByRole('button', { name: 'C. PENGUNGKAPAN INFORMASI' }).click();
            // await page1.waitForTimeout(1500);
            await expect(page1.getByLabel('C. PENGUNGKAPAN INFORMASI')).toBeVisible();
        }
        
        await page1.getByRole('button', { name: 'D. PENGGUNAAN YANG DILARANG' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('D. PENGGUNAAN YANG DILARANG')).toBeVisible();
        await page1.getByRole('button', { name: 'E. HAK KEKAYAAN INTELEKTUAL' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('E. HAK KEKAYAAN INTELEKTUAL')).toBeVisible();
        await page1.getByRole('button', { name: 'F. PENGUNGGAHAN KONTEN PADA' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('F. PENGUNGGAHAN KONTEN PADA')).toBeVisible();
        await page1.getByRole('button', { name: 'G. LAYANAN INTERAKTIF' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('G. LAYANAN INTERAKTIF')).toBeVisible();
        await page1.getByRole('button', { name: 'H. LAPORAN KEMUNGKINAN' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('H. LAPORAN KEMUNGKINAN')).toBeVisible();
        await page1.getByRole('button', { name: 'I. TINDAKAN YANG KAMI ANGGAP' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('I. TINDAKAN YANG KAMI ANGGAP')).toBeVisible();
        await page1.getByRole('button', { name: 'J. MEMBUAT LINK KE PLATFORM' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('J. MEMBUAT LINK KE PLATFORM')).toBeVisible();
        await page1.getByRole('button', { name: 'K. LINK PIHAK KETIGA PADA' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('K. LINK PIHAK KETIGA PADA')).toBeVisible();
        await page1.getByRole('button', { name: 'L. TANGGUNG JAWAB ANDA' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('L. TANGGUNG JAWAB ANDA')).toBeVisible();
        await page1.getByRole('button', { name: 'M. BATASAN TANGGUNG JAWAB KAMI' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('M. BATASAN TANGGUNG JAWAB KAMI')).toBeVisible();
        await page1.getByRole('button', { name: 'N. KEADAAN KAHAR (FORCE' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('N. KEADAAN KAHAR (FORCE')).toBeVisible();
        await page1.getByRole('button', { name: 'O. HUKUM YANG BERLAKU' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('O. HUKUM YANG BERLAKU')).toBeVisible();
        await page1.getByRole('button', { name: 'P. KETENTUAN LAINNYA' }).click();
        // await page1.waitForTimeout(1500);
        await expect(page1.getByLabel('P. KETENTUAN LAINNYA')).toBeVisible();
    }
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
        await daftar(page, 'aac', 'Laki-laki', 'BALI', 'cobatestqa@gmail.com', 'cobatest', 'cobatest');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.locator('.v-overlay__scrim')).toBeVisible();
    });

    test('Mengosongkan Nama', async ({ page }) => {
        // await daftar(page, '', 'Laki-laki', 'BALI', '1500invalid1@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });

    test('Mengosongkan Jenis Kelamin', async ({ page }) => {
        // await daftar(page, 'jenis kelamin kosong', null, 'BALI', '1500invalid2@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });
    
    test('Mengosongkan Domisili', async ({ page }) => {
        // await daftar(page, 'Domisili Kosong', 'laki-laki', null, '1500invalid3@gmail.com', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });
    
    test('Mengosongkan Email', async ({ page }) => {
        await daftar(page, 'Email Kosong', 'laki-laki', 'BALI', '', 'cobacoba', 'cobacoba');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByText('Data belum lengkap.')).toBeVisible();
    });
    
    test('Kata Sandi dan Konfirmasi Sandi tidak sesuai', async ({ page }) => {
        // await daftar(page, 'Sandi & Konfirmasi tidak sesuai', 'laki-laki', 'BALI', '1500invalid5@gmail.com', 'cobacoba', 'cobacoba11');
        await page.getByRole('button', { name: 'Daftar' }).click();
        await expect(page.getByRole('heading', { name: 'Kata Sandi & Konfirmasi Kata' })).toBeVisible();
        // await validasiDaftar(page);
    });
    
    test('Syarat dan Ketentuan', async ({ page }) => {
        await syaratKebijakan(page, 'Syarat dan Ketentuan');
    });
    
    test('Kebijakan Privasi', async ({ page }) => {
        await syaratKebijakan(page, 'Kebijakan Privasi');
    });