// @ts-check
const { test, expect } = require('@playwright/test');
import dataSiteTest from '../../dataSite.json';
import { dataLogin } from '../../DataLogin.js';
import { dataOrderImport } from './DataImportOrder.js';
const fs = require('fs');
const path = require('path');


/**
 * Case 1: Pass -> Order Import Excel
 */

function OrderImportExcel () {

    test('Order Import Excel', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Case Order Import Excel
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20"); //Truy cập trang order
    await page.getByRole('button', { name: 'Import order' }).click(); //Click btn import  order
    const fileChooserPromise = page.waitForEvent('filechooser'); 
    await page.getByRole('button', { name: 'Add file and preview' }).click(); //Click btn để chọn file 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, './ImportOrder.xlsx')); //Chọn file
    await page.locator('button').filter({ hasText: 'Select sheet' }).click(); //Chọn sheet file excel
    await page.getByLabel('Sheet1').click(); //Click chọn Sheet1 file excel
    await page.getByRole('button', { name: 'Update' }).click(); //Click btn Update import excel

        // Check hiển thị tại tab Unfulfill
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design");
    await expect(page.getByRole('button', { name: dataOrderImport.OrderName })).toBeVisible(); //Check hiển thị order name
    await expect(page.getByText(dataOrderImport.Name).first()).toBeVisible(); //Check hiển thị name
    await expect(page.getByText(dataOrderImport.Quantity , { exact: true }).first()).toBeVisible(); //Check hiển thị quantity
    await page.locator("(//div[@class='flex item-center justify-center'])[1]").click(); //Click icon line item (Line Art)
    await expect(page.getByRole('img').nth(1)).toHaveAttribute('src', dataOrderImport.ImageProduct); //Check link Image Product
    await expect(page.locator('img').nth(1)).toHaveAttribute('src', dataOrderImport.ImageDesign); //Check link Image Design
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn Submit design
    await expect(page.getByText('Submit design successfully')).toBeVisible();

        // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(1000);
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator('#radix-vue-dropdown-menu-trigger-18').getByRole('button', { name: 'Action' }).click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.

        //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing");
    await expect(page.getByRole('cell', { name: dataOrderImport.OrderName }).first()).toBeVisible(); //Check hiển thị order name
    await expect(page.getByRole('cell', { name: dataOrderImport.Name }).first()).toBeVisible(); //Check hiển thị product name
    await expect(page.locator("(//div[normalize-space()='awaiting'])[2]")).toBeVisible(); //Check hiển thị status [awaiting] 

        // Check hiển thị link image design gắn với từng item 
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: dataOrderImport.OrderName }).click();
            // Check hiển thị Item fulfill = Quantity 
    await expect(page.getByText('Status code: awaiting').first()).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(1)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(2)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(3)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(4)).toBeVisible();
            // Check hiển thị link image design từng item
    const link = dataOrderImport.ImageDesign ;  
    const linkExpect = dataOrderImport.ImageDesign ; 
    await page.locator('a > button').first().click(); //Click icon item 1
    expect(link).toEqual(linkExpect); 
    await page.locator('div:nth-child(2) > .rounded-xl > .p-4 > .text-\\[13px\\] > li:nth-child(13) > a > button').click(); //Click icon item 2
    await expect(link).toEqual(linkExpect); 
    await page.locator('div:nth-child(3) > .rounded-xl > .p-4 > .text-\\[13px\\] > li:nth-child(13) > a > button').click(); //Click icon item 3
    await expect(link).toEqual(linkExpect); 
    await page.locator('div:nth-child(4) > .rounded-xl > .p-4 > .text-\\[13px\\] > li:nth-child(13) > a > button').click(); //Click icon item 4
    await expect(link).toEqual(linkExpect);
    await page.locator('div:nth-child(5) > .rounded-xl > .p-4 > .text-\\[13px\\] > li:nth-child(13) > a > button').click(); //Click icon item 5
    await expect(link).toEqual(linkExpect);

            });
        }

    function main (){

        OrderImportExcel ();
        
    }
    main()