// @ts-check
const { test, expect } = require('@playwright/test');
import dataSiteTest from '../../dataSite.json';
import { dataLogin } from '../../DataLogin';
import  { dataTemplate }  from '././DataTemplate';
import fs from 'fs';
import path from 'path'; 


/**
 * Case 1: Pass -> Tạo Template - Tạo thường
 */

function AddTemplate () {

    test('Create Template', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công 
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Product - Create Template
    await page.getByRole('button', { name: 'Product' }).click(); //Thanh menu - click Product
    await page.getByRole('link', { name: 'Create' }).click(); //Thanh menu - click Create
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
    await page.getByPlaceholder('Input title').fill(dataTemplate.Title); // Nhập Title 
                // Chọn Image
    const fileChooserPromise = page.waitForEvent('filechooser'); //Add Image 1
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn add image
    const fileChooser = await fileChooserPromise; //Chờ thời gian chọn file
    await fileChooser.setFiles(dataTemplate.FileName);  // Chọn image - Black-Tshirt 
        const fileChooserPromise1 = page.waitForEvent('filechooser'); //Add Image 2
        await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn add image
        const fileChooser1 = await fileChooserPromise1; //Chờ thời gian chọn file
        await fileChooser1.setFiles(dataTemplate.FileName1);   // Chọn image - Red Tshirt
                // Nhập Variants - Size
    await page.getByRole('button', { name: 'Add variant' }).click(); //Click btn Add variant
    await page.getByPlaceholder('Option name').fill(dataTemplate.OptionS); //Nhập Option name 1
    await page.getByPlaceholder('Options value...').fill(dataTemplate.VariantS1); //Nhập Options value 1
    await page.getByPlaceholder('Options value...').press('Enter'); //Enter Save Options value 1
    await page.getByPlaceholder('Options value...').fill(dataTemplate.VariantS2); //Nhập Options value 2
    await page.getByPlaceholder('Options value...').press('Enter'); //Enter Save Options value 2
                // Nhập Variants - Color
    await page.getByRole('button', { name: 'Add variant' }).click(); //Click btn Add variant
    await page.getByPlaceholder('Option name').nth(1).fill(dataTemplate.OptionC); //Nhập Option name 2
    await page.getByPlaceholder('Options value...').nth(1).fill(dataTemplate.VariantC1); //Enter Save Options value 1
    await page.getByPlaceholder('Options value...').nth(1).press('Enter'); //Enter Save Options value 1
    await page.getByPlaceholder('Options value...').nth(1).fill(dataTemplate.VariantC2 ); //Enter Save Options value 2
    await page.getByPlaceholder('Options value...').nth(1).press('Enter'); //Enter Save Options value 2
                // Chọn ảnh option Black
    await page.locator('button').filter({ hasText: dataTemplate.VariantC1 }).click(); 
    await page.getByRole('img').first().click();
    await page.getByRole('button', { name: 'Save Change' }).click();
                // Chọn ảnh option Red
    await page.locator('button').filter({ hasText: dataTemplate.VariantC2 }).click();
    await page.getByRole('img').nth(1).click();
    await page.getByRole('button', { name: 'Save Change' }).click();
                // Create template - Chọn store 
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataTemplate.StoreName }). click();
                // Nhập tên Template
    await page.getByPlaceholder('Template Name').fill(dataTemplate.TemplateName);
                // Click btn - Lưu Template
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(page.getByText('Create template successfully')).toBeVisible();
                // Check hiển thị  Template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(1)")
                        .getByText(dataTemplate.TemplateName)).toBeVisible(); //Hiển thị tại list template

        // Xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await page.getByRole('row', { name: dataTemplate.TemplateName }).getByRole('button').nth(2).click();
    await page.getByText('Continue').click();
    await expect(page.getByText('Delete template successfully')).toBeVisible();
    await page.goto(dataSiteTest[1].linkSite + "products/list_template"); //Truy cập list_template
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(1)")
                        .getByText(dataTemplate.TemplateName)).not.toBeVisible(); // Check hiển thị List Template - Sau xóa template
    
        });
    } 

/**
 * Case 2: Pass -> Tạo Template - Từ Product ID 
 */

function AddTemplateProductID () {

    test('Create Template Product ID', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công 
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Product - Create Template
    await page.getByRole('button', { name: 'Product' }).click();
    await page.getByRole('link', { name: 'Create' }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
        // Create template - Chọn store 
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataTemplate.StoreName }). click();
        // Nhập ID product khác
    await page.getByPlaceholder('Product ID').fill(dataTemplate.ProductID);
    await page.getByRole('button', { name: 'Load' }).click();
        // Nhập Template Name
    await page.getByPlaceholder('Template Name').fill(dataTemplate.TemplateName1);
        // Click btn Create - Lưu Template
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(page.getByText('Create template successfully')).toBeVisible();
        // Check hiển thị  Template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(1)")
                        .getByText(dataTemplate.TemplateName1)).toBeVisible(); //Hiển thị tại list template

        // Xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await page.getByRole('row', { name: dataTemplate.TemplateName1 }).getByRole('button').nth(2).click();
    await page.getByText('Continue').click();
    await expect(page.getByText('Delete template successfully')).toBeVisible();
        // Check hiển thị List Template - Sau xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(1)")
                    .getByText(dataTemplate.TemplateName1)).not.toBeVisible();

        });
    } 

/**
 * Case 3: Pass -> Tạo Template - Từ Product ID Auto Sync
 */

function AddTemplateProductIDAutoSync () {

    test('Create Template Product ID Auto Sync', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công 
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Product - Create Template
    await page.getByRole('button', { name: 'Product' }).click();
    await page.getByRole('link', { name: 'Create' }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
        // Create template - Chọn store 
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataTemplate.StoreName }). click();
        // Nhập ID product khác
    await page.getByPlaceholder('Product ID').fill(dataTemplate.ProductID);
    await page.getByRole('button', { name: 'Load' }).click();
        // Nhập Template Name
    await page.getByPlaceholder('Template Name').fill(dataTemplate.TemplateName2);
        //  Check Auto sync 
    await page.getByRole('checkbox').click();
        // Click btn Create - Lưu Template
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await expect(page.getByText('Create template successfully')).toBeVisible();
        // Check hiển thị  Template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(1)")
                        .getByText(dataTemplate.TemplateName2)).toBeVisible(); //Hiển thị tại list template
    
        // Xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await page.getByRole('row', { name: dataTemplate.TemplateName2 }).getByRole('button').nth(2).click();
    await page.getByText('Continue').click();
    await expect(page.getByText('Delete template successfully')).toBeVisible();
        // Check hiển thị List Template - Sau xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(1)")
                        .getByText(dataTemplate.TemplateName2)).not.toBeVisible();

        });
    } 


function main (){

    AddTemplate ();
    AddTemplateProductID();
    AddTemplateProductIDAutoSync();
}
main()