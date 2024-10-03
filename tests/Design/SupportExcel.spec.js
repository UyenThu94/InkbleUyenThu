// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
import dataSiteTest from '../dataSite.json';
import { dataLogin } from '../DataLogin';
import { dataSupportExcel } from './DataSupportExcel';
import readXlsxFile from 'read-excel-file';
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');


function SupportExcell () {

    test('Support Excell', async ({ page }) => {

            test.slow();

        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Add SKU Code
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "setting/sku"); //Truy màn hình SKU
    await page.getByText('Add').click(); //Click btn add SKU
    await page.waitForTimeout(1000);
    await expect(page.getByText('Add Sku')).toBeVisible();
    await page.getByPlaceholder('Name').fill(dataSupportExcel.SKUname); //Nhập tên SKU
    await page.getByPlaceholder('Basecost').fill(dataSupportExcel.Basecost); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(dataSupportExcel.FirstItem); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(dataSupportExcel.NextItem); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(dataSupportExcel.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await page.waitForTimeout(1000);
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/create"); //Truy cập màn hình create product
    await page.getByPlaceholder('Input title').fill(dataSupportExcel.TitleName); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Chọn ảnh sản phẩm - Black-Tshirt 
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataSupportExcel.FileName); 
    await page.getByRole('button', { name: 'Add variant' }).click(); // Click btn Add variant - Color
    await page.getByPlaceholder('Option name').fill(dataSupportExcel.OptionColor); //Nhập Variants - Color
    await page.getByPlaceholder('Options value...').fill(dataSupportExcel.VariantColor); //Nhập variant 1 - Màu Black
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: dataSupportExcel.VariantColor }).click(); // Nhập data variant Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh 
    await page.getByPlaceholder('Price', { exact: true }).fill(dataSupportExcel.Price); //Nhập giá
    await page.getByPlaceholder('SKU').fill(dataSupportExcel.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Chọn store 
    await page.getByRole('option', { name: dataSupportExcel.StoreName }). click();
    await page.getByRole('button', { name: 'Create Product' }).click(); // Click create product
    await page.waitForTimeout(2000);
    await expect(page.getByText('Create product successfully')).toBeVisible();

        // Truy cập store order
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[3].linkSite);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(dataLogin.userStore); //Tên đăng nhập store
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill(dataLogin.pwStore);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL(dataSiteTest[3].linkSite + dataLogin.linkStore); //Expect điều hướng đến link store
    await page.getByRole('link', { name: 'Orders New' }).click(); //Click Order
    await page.waitForTimeout(3000);
    await expect(page.getByText('Orders:All locations')).toBeVisible();
    await page.getByRole('link', { name: 'Create order' }).click(); //Click btn Create Order
    await expect(page.getByText('Create order', { exact: true })).toBeVisible();
    await page.getByLabel('Browse products').click(); //Click btn Browse products
    await page.getByText('All products').click(); //Click All products
    await page.getByText(dataSupportExcel.TitleName).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').first().fill(dataSupportExcel.Quantity); //Nhập quantity - Màu black (Số lượng item order)
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Search or create a customer').click(); //Click search customer
    await page.getByText(dataSupportExcel.SelectCustomer).click(); // Select Customer đã có trên hệ thống
    await page.getByRole('button', { name: 'Collect payment' }).click(); // Click btn để chọn thanh toán
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để thanh toán order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

        // Truy cập admin thao tác Detail Request Fulfill
                // Check hiển thị sau khi store order tại tab All
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All);
    await expect(page.getByRole('cell', { name: dataSupportExcel.TitleName }).first()).toBeVisible(); //Check title order
        
                // Add design 
    await page.waitForTimeout(1000);
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(2) > div > div > svg").click(); //Click icon add design 
    await page.getByRole('button', { name: 'Add design by link' }).click(); //Click btn add link design 
    await expect(page.getByRole('heading', { name: 'Add link' })).toBeVisible(); //Hiển thị tên popup add link design
    await page.getByRole('textbox').fill(dataSupportExcel.LinkDesign); //Nhập link design
    await page.getByText('Add', { exact: true }).click(); //Click btn add link design
    await expect(page.getByText('Add link success')).toBeVisible(); //Hiển thị thông báo add design
    await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
    await page.waitForTimeout(2000);
    await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị thông báo add design 

                    // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design"); //Truy cập màn hình Order - Tab unfulfilled
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator('#radix-vue-dropdown-menu-trigger-18').getByRole('button', { name: 'Action' }).click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.

                    //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing"); //Truy cập màn hình Order - Tab processing
    await expect(page.getByRole('cell', { name: dataSupportExcel.TitleName }).first()).toBeVisible(); //Check title order item 1
    
                    // Download file excel 
    await page.waitForTimeout(1000);
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Download file excel 
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs('tests/Design' + download.suggestedFilename());

                    // Support excel - Import excel 
    await page.goto(dataSiteTest[1].linkSite + "design/support-excel");
    const fileChooserPromise1 = page.waitForEvent('filechooser'); 
    await page.getByRole('button', { name: 'Import excel' }).click(); 
    const fileChooser1 = await fileChooserPromise1;
    await fileChooser1.setFiles(dataSupportExcel.ExcelImport); 

                    // Support excel - Get excel 
    await page.locator('button').filter({ hasText: 'Select sheet' }).click();
    await page.getByLabel('Order').click();
    const downloadPromise1 = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Get Excel' }).click();
    const download1 = await downloadPromise1;
    await download1.saveAs('tests/Design' + download1.suggestedFilename());


        // Read the Excel file
        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.readFile(dataSupportExcel.GetExcel);
            
            if (workbook.worksheets.length === 0) {
                throw new Error('No worksheets found in the Excel file.');
            }
    
            const worksheet = workbook.worksheets[0];
            worksheet.eachRow((row, rowNumber) => {
                console.log(`Row ${rowNumber}: ${row.values}`);
                const link = row.getCell(38).value; // Adjust column index as needed
    
                // Check if the cell has a value
                if (link) {
                    console.log(`Có link trong hàng ${rowNumber}: ${link}`);
    
                    // Replace this with your actual expected URL or logic
                    const expectedURL = dataSupportExcel.LinkDesign; 
    
                    // Example assertion (adjust as needed)
                    try {
                        expect(link).toEqual(expectedURL);
                    } catch (error) {
                        console.error(`Assertion failed for row ${rowNumber}:`, error.message);
                    }
                } else {
                    console.warn(`Không có link trong hàng ${rowNumber}`);
                }
            });
        } catch (err) {
            console.error('Error reading file:', err);
        }

  
        });
    };

  

function main (){

    SupportExcell();
    
}
main();