// @ts-check
const { test, expect } = require('@playwright/test');
import dataSiteTest from '../../dataSite.json'; 
import { dataLogin } from '../../DataLogin';
import { dataCancelFulfill } from '././DataCancelFulfill';
import fs from 'fs';
import path from 'path';
import { } from '@playwright/test';



/**
 * Case 1: Pass -> Action [Cancel Fulfill]
 */

function ActionCancelFulfill () {

    test('Action Cancel Fulfill', async ({ page }) => {

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
    await page.getByRole('button', { name: 'Setting' }).click(); //Thanh menu - Click Setting
    await page.getByRole('link', { name: 'SKU' }).click(); //Thanh menu - click SKU 
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "setting/sku");
    await page.getByText('Add').click(); //Click btn Add SKU
    await page.waitForTimeout(1000);
    await expect(page.getByText('Add Sku')).toBeVisible();
    await page.getByPlaceholder('Name').fill(dataCancelFulfill.SKUname); //Nhập tên SKU 
    await page.getByPlaceholder('Basecost').fill(dataCancelFulfill.Basecost); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(dataCancelFulfill.FirstItem); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(dataCancelFulfill.NextItem); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(dataCancelFulfill.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await page.waitForTimeout(1000);
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Product' }).click(); //Thanh menu - Click Product
    await page.getByRole('link', { name: 'Create' }).click(); //Thanh menu - Click Create
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
    await page.getByPlaceholder('Input title').fill(dataCancelFulfill.TitleName); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Upload Image
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn add image
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataCancelFulfill.FileName); //Chọn file ảnh 
    await page.getByRole('button', { name: 'Add variant' }).click(); //Click btn add Variants - Color
    await page.getByPlaceholder('Option name').fill(dataCancelFulfill.Option); //Nhập Option name
    await page.getByPlaceholder('Options value...').fill(dataCancelFulfill.Variant); //Nhập Options value
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: dataCancelFulfill.Variant }).click(); // Nhập data option Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh
    await page.getByPlaceholder('Price', { exact: true }).fill(dataCancelFulfill.Price); //Nhập giá
    await page.getByPlaceholder('SKU').fill(dataCancelFulfill.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Click ô input chọn store
    await page.getByRole('option', { name: dataCancelFulfill.StoreName }). click(); //Chọn tên store 
    await page.getByRole('button', { name: 'Create Product' }).click(); // Click create product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Create product successfully')).toBeVisible();

        // Truy cập store order
    await page.goto(dataSiteTest[3].linkSite);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(dataLogin.userStore); //Tên đăng nhập store
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill(dataLogin.pwStore);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL(dataSiteTest[3].linkSite + dataLogin.linkStore); //Expect điều hướng đến link store
    await page.getByRole('link', { name: 'Orders New' }).click(); //Click Order
    await expect(page.getByText('Orders:All locations')).toBeVisible();
    await page.keyboard.press('F5'); //F5 load lại trang
    await page.getByRole('link', { name: 'Create order' }).click(); //Click btn Create Order
    await expect(page.getByText('Create order', { exact: true })).toBeVisible();
    await page.getByLabel('Browse products').click(); //Click btn Browse products
    await page.getByText('All products').click(); //Click All products
    await page.getByLabel('All products').getByPlaceholder('Search products').fill(dataCancelFulfill.TitleName); //Click - Search product 
    await page.getByText(dataCancelFulfill.TitleName).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').fill(dataCancelFulfill.Quantity); //Nhập số lượng order
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Search or create a customer').click(); //Click search customer
    await page.getByText(dataCancelFulfill.SelectCustomer).click(); // Select Customer đã có trên hệ thống
    await page.getByRole('button', { name: 'Collect payment' }).click(); // Click btn để chọn thanh toán
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để thanh toán order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

        // Truy cập ADMIN - Thao tác action [Request fulfillment]
            // Check hiển thị tại tab All - Các thông tin giống với store order
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "dashboard");
    await page.locator('div').filter({ hasText: /^Order$/ }).nth(2).click(); //Click sitebar - Order
    await page.keyboard.press('F5'); //F5 load lại danh sách
    await expect(page.getByText(dataCancelFulfill.TitleName).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.getByRole('cell', { name: dataCancelFulfill.Quantity, exact: true }).first()).toBeVisible(); //Check hiển thị Quantity (số lượng)
    await expect(page.getByRole('cell', { name:dataCancelFulfill.Total }).first()).toBeVisible

            // Add Design
    await page.waitForTimeout(1000);
    await page.locator('.py-1 > div > .p-1').first().click(); //Click icon add design
    await expect(page.getByRole('heading', { name: 'Upload design' })).toBeVisible();
    await expect(page.getByText( dataCancelFulfill.Variant , { exact: true })).toBeVisible();  //Check hiển thị đúng variant
    await page.getByRole('checkbox').nth(1).click();
    const fileChooserPromise1 = page.waitForEvent('filechooser'); // Upload Image 
    await page.getByRole('button', { name: 'Add design', exact: true }).click(); //Click btn upload image
    const fileChooser1 = await fileChooserPromise1;
    await fileChooser1.setFiles(dataCancelFulfill.FileName); //Chọn file upload
    await expect(page.locator('img').nth(1)).toBeVisible(); //Sau khi upload ảnh -> có hiển thị ảnh
    await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
    await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị text add design thành công 

            // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(1000);
    await page.getByRole('tab', { name: 'Unfulfilled' }).click(); //Click tab Unfulfilled -> Tại tab này mới Request Fulfillment được
    await page.waitForTimeout(1000);
    await page.locator('.flex > .inline-flex').first().click(); //Click icon load danh sách
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator("(//label[normalize-space()='Action'])[1]").click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await expect(page.locator('p').filter({ hasText: dataCancelFulfill.Costs }).locator('span').first()).toBeVisible(); //Check hiển thị costs - tại popup Fulfillment Confirmation
    await expect(page.locator('p').filter({ hasText: dataCancelFulfill.Costs }).locator('span').nth(1)).toBeVisible();  //Check hiển thị costs - tại popup Fulfillment Confirmation
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.thông báo Request Fulfillment thành công.

            //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(1000);
    await page.getByRole('tab', { name: 'Processing' }).click();
    await page.keyboard.press('F5'); //F5 load lại danh sách
    await expect(page.getByRole('cell', { name: dataCancelFulfill.TitleName }).first()).toBeVisible(); //Check hiển thị order 
    await expect(page.locator("(//div[normalize-space()='awaiting'])[2]")).toBeVisible(); //Check hiển thị status [awaiting] 

            // Thao tác action [Cancel Fulfill]
    await page.waitForTimeout(1000);
    await page.locator('div#__nuxt tr:nth-child(1) > td:nth-child(3) > div > button').click(); //Click ID Order
    await page.locator("div.w-full.flex.justify-between > button[type=\"button\"]").click(); //Click item Cancel Fulfill
    await page.getByRole('button', { name: 'Cancel fulfill' }).first().click(); //Click btn Cancel fulfill
    await page.getByRole('button', { name: 'Continue' }).click(); //Click btn confirmn Cancel fulfill
    await page.waitForTimeout(1000);
    await expect(page.getByText('Request cancel successful,')).toBeVisible();

        // Check hiển thị order cancel fulfill tại tab Error
    await page.waitForTimeout(1000);
    await page.getByRole('tab', { name: 'Error' }).click(); //Click tab Error
    await page.keyboard.press('F5'); //F5 load lại danh sách 
    await expect(page.getByRole('cell', { name: dataCancelFulfill.TitleName }).first()).toBeVisible(); //Check hiển thị order 
    await expect(page.getByText('cancel-produce').first()).toBeVisible(); //Hiển thị trạng thái cancel-produce

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Product', exact: true }).click(); //Thanh menu - click Product
    await page.getByRole('link', { name: 'List' }).click(); //Thanh menu - Click List
    await page.keyboard.press('F5'); //F5 load lại danh sách
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(1000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.keyboard.press('F5'); //F5 load lại danh sách
    await expect(page.getByText('draft').first()).toBeVisible(); // Check list hiển thị status [Drafr]

        // Delete SKU
    await page.goto(dataSiteTest[1].linkSite + "setting/sku");
    await page.locator("(//button[@type='button'])[11]").click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete sku successfully')).toBeVisible();

            });
    } 

function main (){

    ActionCancelFulfill ();
    

}
main()