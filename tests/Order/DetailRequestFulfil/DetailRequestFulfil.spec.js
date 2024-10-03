// @ts-check
const { test, expect } = require('@playwright/test');
import dataSiteTest from '../../dataSite.json'; 
import { dataLogin } from '../../DataLogin';
import { DetailRequestFulfill } from '././DetailRequestFulfill';
import fs from 'fs';
import path from 'path';
import { } from '@playwright/test';
import exp from 'constants';



/**
 * Case 1: Pass - Detail Request Fulfill
 */

function ActionDetailRequestFulfill () {

    test('Detail Request Fulfill', async ({ page }) => {

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
    await page.getByPlaceholder('Name').fill(DetailRequestFulfill.SKUname); //Nhập tên SKU
    await page.getByPlaceholder('Basecost').fill(DetailRequestFulfill.Basecost); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(DetailRequestFulfill.FirstItem); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(DetailRequestFulfill.NextItem); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(DetailRequestFulfill.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await page.waitForTimeout(1000);
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/create"); //Truy cập màn hình create product
    await page.getByPlaceholder('Input title').fill(DetailRequestFulfill.TitleName); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Chọn ảnh sản phẩm - Black-Tshirt 
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(DetailRequestFulfill.FileNameBlack); 
            const fileChooserPromise1 = page.waitForEvent('filechooser');  // Chọn ảnh sản phẩm - Red-Tshirt
            await page.getByRole('button', { name: 'Add', exact: true }).click(); 
            const fileChooser1 = await fileChooserPromise1;
            await fileChooser1.setFiles(DetailRequestFulfill.FileNameRed); 
    await page.getByRole('button', { name: 'Add variant' }).click(); // Click btn Add variant - Color
    await page.getByPlaceholder('Option name').fill(DetailRequestFulfill.OptionColor); //Nhập Variants - Color
    await page.getByPlaceholder('Options value...').fill(DetailRequestFulfill.VariantColor); //Nhập variant 1 - Màu Black
    await page.getByPlaceholder('Options value...').press('Enter');
            await page.getByPlaceholder('Options value...').fill(DetailRequestFulfill.VariantColor1); //Nhập variant 2 - Màu Red
            await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: DetailRequestFulfill.VariantColor }).click(); // Nhập data variant Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh 
    await page.getByPlaceholder('Price', { exact: true }).fill(DetailRequestFulfill.Price); //Nhập giá
    await page.getByPlaceholder('SKU').fill(DetailRequestFulfill.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
            await page.locator('button').filter({ hasText: DetailRequestFulfill.VariantColor1 }).click(); // Nhập data variant Color - Red
            await page.getByRole('img').nth(1).first().click(); //Chọn ảnh
            await page.getByPlaceholder('Price', { exact: true }).fill(DetailRequestFulfill.Price); //Nhập giá
            await page.getByPlaceholder('SKU').fill(DetailRequestFulfill.Skucode); //Nhập mã SKU
            await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Chọn store 
    await page.getByRole('option', { name: DetailRequestFulfill.StoreName }). click();
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
    await page.getByText(DetailRequestFulfill.TitleName).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').first().fill(DetailRequestFulfill.QuantityBlack); //Nhập quantity - Màu black (Số lượng item order)
        await page.getByLabel('available quantity').nth(1).fill(DetailRequestFulfill.QuantityRed); //Nhập quantity - màu red (Số lượng item order)
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Search or create a customer').click(); //Click search customer
    await page.getByText(DetailRequestFulfill.SelectCustomer).click(); // Select Customer đã có trên hệ thống
    await page.getByRole('button', { name: 'Collect payment' }).click(); // Click btn để chọn thanh toán
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để thanh toán order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

        // Truy cập admin thao tác Detail Request Fulfill
                // Check hiển thị sau khi store order tại tab All
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All);
    const variantColorElement = await page.getByText(DetailRequestFulfill.VariantColor).first(); // Màu đen
    const variantColor1Element = await page.getByText(DetailRequestFulfill.VariantColor1).first(); // Màu đỏ
    await expect(page.getByRole('cell', { name: DetailRequestFulfill.TitleName }).first()).toBeVisible(); //Check title order item 1
    if (await variantColorElement.isVisible()) {
        await expect(variantColorElement).toBeVisible(); // Hiển thị màu đen
    } else {
        await expect(variantColor1Element).toBeVisible(); // Hiển thị màu đỏ
    } // Kiểm tra màu đen
        await expect(page.getByRole('cell', { name: DetailRequestFulfill.TitleName }).nth(1)).toBeVisible(); //Check title order item 2
        const variantColorElement2 = await page.getByText(DetailRequestFulfill.VariantColor1).nth(1); // Màu đỏ thứ hai
        if (await variantColorElement2.isVisible()) {
            await expect(variantColorElement2).toBeVisible(); // Hiển thị màu đỏ thứ hai
        } else {
            await expect(variantColorElement).toBeVisible(); // Hiển thị màu đen
        } // Kiểm tra màu đỏ 
                 
               // Add Design
    await page.waitForTimeout(1000);
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(2) > div > div > svg").click(); //Click icon add design order line item 1
            const colorBlack = await page.getByText(DetailRequestFulfill.VariantColor).first(); // Màu đen
            const colorRed = await page.getByText(DetailRequestFulfill.VariantColor1).first(); // Màu đỏ
                        // Add design Màu đen
    if (await colorBlack.isVisible()) {
        const fileChooserPromise3 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế 
        await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
        const fileChooser3 = await fileChooserPromise3;
        await fileChooser3.setFiles(DetailRequestFulfill.FileNameBlack); 
    } else {
        const fileChooserPromise4 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế 
        await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
        const fileChooser4 = await fileChooserPromise4;
        await fileChooser4.setFiles(DetailRequestFulfill.FileNameRed); 
    }       
        await expect(page.locator('img').nth(1)).toBeVisible(); //Sau khi upload ảnh -> có hiển thị ảnh
        await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
        await page.waitForTimeout(2000);
        await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị text add design thành công 
                        // Add design Màu đỏ
            await page.waitForTimeout(1000);
            await page.locator("div#__nuxt tr:nth-child(2) > td:nth-child(2) > div > div > svg").click(); //Click icon add design order line item 2
            if (await colorRed.isVisible()) {
                const fileChooserPromise5 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế 
                await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
                const fileChooser5 = await fileChooserPromise5;
                await fileChooser5.setFiles(DetailRequestFulfill.FileNameRed); 
            } else {
                const fileChooserPromise6 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế 
                await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
                const fileChooser6 = await fileChooserPromise6;
                await fileChooser6.setFiles(DetailRequestFulfill.FileNameBlack); 
            }
                await expect(page.locator('img').nth(1)).toBeVisible(); //Sau khi upload ảnh -> có hiển thị ảnh
                await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
                await page.waitForTimeout(2000);
                await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị text add design thành công 
        
                // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design"); //Truy cập màn hình Order - Tab unfulfilled
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order line item 1 Request Fulfillment
        await page.locator("(//button[@role='checkbox'])[3]").click(); //Click Order line item 2 Request 
    await page.locator('#radix-vue-dropdown-menu-trigger-18').getByRole('button', { name: 'Action' }).click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.

                //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing"); //Truy cập màn hình Order - Tab processing
            const variantColorElement3 = await page.getByText(DetailRequestFulfill.VariantColor).first(); // Màu đen
            const variantColor1Element4 = await page.getByText(DetailRequestFulfill.VariantColor1).first(); // Màu đỏ
    await expect(page.getByRole('cell', { name: DetailRequestFulfill.TitleName }).first()).toBeVisible(); //Check title order item 1
    await expect(page.locator("(//div[normalize-space()='awaiting'])[2]")).toBeVisible(); //Check hiển thị status [awaiting] 
    if (await variantColorElement3.isVisible()) {
        await expect(variantColorElement3).toBeVisible(); // Hiển thị màu đen
    } else {
        await expect(variantColor1Element4).toBeVisible(); // Hiển thị màu đỏ
    } // Kiểm tra màu đen
            await expect(page.getByRole('cell', { name: DetailRequestFulfill.TitleName }).nth(1)).toBeVisible(); //Check title order item 2
            await expect(page.locator("(//div[normalize-space()='awaiting'])[3]")).toBeVisible(); //Check hiển thị status [awaiting] 
            const variantColor1Element5 = await page.getByText(DetailRequestFulfill.VariantColor1).nth(1); // Màu đỏ thứ hai
            if (await variantColor1Element5.isVisible()) {
                await expect(variantColor1Element4).toBeVisible(); // Hiển thị màu đỏ thứ hai
            } else {
                await expect(variantColorElement3).toBeVisible(); // Hiển thị màu đen
            } // Kiểm tra màu đỏ 

            // Click Detail Request Fulfill
    await page.waitForTimeout(1000);
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(3) > div > button").click(); //Click order line item 1
    await expect(page.getByRole('heading', { name: 'Detail line item #' })).toBeVisible(); 
    await page.getByRole('button', { name: 'Detail request fulfill' }).click(); //Click btn Detail request fulfill
                // Check hiển thị Item fulfill = QuantityBlack + QuantityRed
    await expect(page.getByText('Status code: awaiting').first()).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(1)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(2)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(3)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(4)).toBeVisible();
    await expect(page.getByText('Status code: awaiting').nth(5)).toBeVisible();
    await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
        await page.locator("div#__nuxt tr:nth-child(2) > td:nth-child(3) > div > button").click(); //Click order line item 2
        await expect(page.getByRole('heading', { name: 'Detail line item #' })).toBeVisible(); 
        await page.getByRole('button', { name: 'Detail request fulfill' }).click(); //Click btn Detail request fulfill
                    // Check hiển thị Item fulfill = QuantityBlack + QuantityRed
        await expect(page.getByText('Status code: awaiting').first()).toBeVisible();
        await expect(page.getByText('Status code: awaiting').nth(1)).toBeVisible();
        await expect(page.getByText('Status code: awaiting').nth(2)).toBeVisible();
        await expect(page.getByText('Status code: awaiting').nth(3)).toBeVisible();
        await expect(page.getByText('Status code: awaiting').nth(4)).toBeVisible();
        await expect(page.getByText('Status code: awaiting').nth(5)).toBeVisible();

        // Update Status Product - [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list");
    await page.waitForTimeout(1000);
    await page.locator('div#__nuxt tr:nth-child(1) > td:nth-child(7) > div > button:nth-child(2) > button').first().click(); //Click Product edit status
    await page.locator('div#__nuxt div:nth-child(3) > div > button[type=\"button\"]').click(); //Click btn edit status
    await page.waitForTimeout(1000);
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(2000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list")
    await expect(page.getByText('draft').first()).toBeVisible();

        // Delete SKU
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "setting/sku");
    await page.locator("(//button[@type='button'])[11]").click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete sku successfully')).toBeVisible();


                });
    } 

function main (){

    ActionDetailRequestFulfill ();
    

}
main()