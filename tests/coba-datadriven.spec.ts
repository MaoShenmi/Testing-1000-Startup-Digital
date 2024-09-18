import { test, expect } from '@playwright/test';
import csvParser from 'csv-parser';
import fs from 'fs';


async function readCsvData(filePath: string): Promise<Array<{ email: string; sandi: string }>> {
  const results: { email: string; sandi: string }[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error',   
 (err) => reject(err));
  });
}

const login = async (page, credentials: { email: string; sandi: string }) => {
    if (credentials.email) {
      await page.locator('#input-14').fill(credentials.email);
    }
    if (credentials.sandi) {
      await page.locator('#input-17').fill(credentials.sandi);
    }
};

  test('Login csv', async ({ page }) => {
    const csvData = await readCsvData('data/data-login.csv');
    await page.goto('https://web.1000startupdigital.id/authorization/login');
    
    for (const credentials of csvData) {
        await login(page, credentials);
        await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    
        if (credentials.email === '' || credentials.sandi === '') {
          
          if (credentials.email === '') {
            await page.screenshot({path: "emailnull.png"});
            await expect(page.getByText('Masukan email kamu terlebih dahulu')).toBeVisible();
          }
          else{
            await page.screenshot({path: "passwordnull.png"});
            await expect(page.getByText('Kata sandi wajib diisi')).toBeVisible();
          }
        }
        else if (credentials.email && credentials.sandi) {
          if (credentials.email === 'cobatestqa@gmail.com' && credentials.sandi === 'cobatest') {
            await page.screenshot({path: "berhasil.png"});
            await expect(page.getByRole('heading', { name: 'Tahapan yang berlangsung saat' })).toBeVisible();
          }
          else if (credentials.email !== 'cobatestqa@gmail.com') {
            await page.screenshot({path: "belumterdaftar.png"});
            await expect(page.getByText('Email kamu belum terdaftar,')).toBeVisible();
          }
        }       
      }
  });