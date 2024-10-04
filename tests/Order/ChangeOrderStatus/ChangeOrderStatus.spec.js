// @ts-check
const { test, expect } = require('@playwright/test');
import dataSiteTest from '../../dataSite.json'; 
import { dataLogin } from '../../DataLogin';
import { dataOrder } from './DataOrder';
import fs from 'fs';
import path from 'path';
import { } from '@playwright/test';



/**
 * Case 1: Pass -> Action [Request fulfillment]
 */

function ActionRequestFulfillment () {

    test('Action Request fulfillment', async ({ page }) => {

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
    await page.getByPlaceholder('Name').fill(dataOrder.SKUname); //Nhập tên SKU
    await page.getByPlaceholder('Basecost').fill(dataOrder.Basecost); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(dataOrder.FirstItem); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(dataOrder.NextItem); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(dataOrder.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await page.waitForTimeout(1000);
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/create"); //Truy cập màn hình create product
    await page.getByPlaceholder('Input title').fill(dataOrder.TitleName); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Chọn ảnh sản phẩm - Black-Tshirt 
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataOrder.FileName); 
    await page.getByRole('button', { name: 'Add variant' }).click(); // Nhập Variants - Color
    await page.getByPlaceholder('Option name').fill(dataOrder.Option);
    await page.getByPlaceholder('Options value...').fill(dataOrder.Variant);
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: dataOrder.Variant }).click(); // Nhập data option Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh
    await page.getByPlaceholder('Price', { exact: true }).fill(dataOrder.Price); //Nhập giá
    await page.getByPlaceholder('SKU').fill(dataOrder.Skucode); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Chọn store 
    await page.getByRole('option', { name: dataOrder.StoreName }). click();
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
    await page.getByRole('link', { name: 'Create order' }).click(); //Click btn Create Order
    await expect(page.getByText('Create order', { exact: true })).toBeVisible();
    await page.getByLabel('Browse products').click(); //Click btn Browse products
    await page.getByText('All products').click(); //Click All products
    await page.getByText(dataOrder.TitleName).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').fill(dataOrder.Quantity); //Nhập quantity (Số lượng item order)

    //         // Thêm mới 1 cust customer
    // await page.getByText('Create a new customer', { exact: true }).click(); //Click  Create a new customer
    // await page.getByLabel('First name').fill(dataOrder.FirstName); //Nhập First name
    // await page.getByLabel('Last name').fill(dataOrder.LastName); //Nhập Last name
    // await page.getByLabel('Email', { exact: true }).fill(dataOrder.Email); //Nhập Email
    // await page.getByLabel('Country/region').click();
    // await page.getByLabel('Country/region').selectOption(dataOrder.Country); //Nhập Country
    // await page.getByLabel('Address').fill(dataOrder.Address); //Nhập Address
    // await page.getByLabel('City').fill(dataOrder.City); //Nhập City
    // await page.getByLabel('ZIP code').fill(dataOrder.ZIPcode); //Nhập ZIPcode
    // await page.getByLabel('Phone').fill(dataOrder.Phone); //Nhập Phone
    // await page.getByRole('button', { name: 'Save customer' }).click(); //Click btn Save customer
    // await page.waitForTimeout(1000);
    // await expect(page.locator('#PolarisPortalsContainer').getByText('Customer created')).toBeVisible();

            // Select Customer đã có trên hệ thống
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Search or create a customer').click(); //Click ô input để chọn Customer 
    await page.getByPlaceholder('Search or create a customer').fill(dataOrder.SelectCustomer); //Click search customer
    await page.getByText(dataOrder.SelectCustomer).click(); // Select Customer đã có trên hệ thống
    await page.getByRole('button', { name: 'Collect payment' }).click(); // Click btn để chọn thanh toán
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để thanh toán order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

        // Truy cập ADMIN - Thao tác action [Request fulfillment]
        // Để thao tác được action [Request fulfillment] -> Có Design, Đã thanh toán, đủ và đúng thông tin cá nhân, product có mã SKU -> Sau khi [Request fulfillment] => Order chuyển sang tab [Processing]
        // Check hiển thị tại tab All - Các thông tin giống với store order
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All
    await expect(page.getByRole('cell', { name: dataOrder.TitleName }).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.getByRole('cell', { name: dataOrder.Quantity, exact: true }).first()).toBeVisible(); //Check hiển thị Quantity (số lượng)
    await expect(page.getByRole('cell', { name:dataOrder.Total }).first()).toBeVisible(); //Check hiển thị total (Tổng tiền = Quantity * Price)

        // Add Design
    await page.waitForTimeout(1000);
    await page.locator('.py-1 > div > .p-1').first().click(); //Click icon add design
    await expect(page.getByRole('heading', { name: 'Upload design' })).toBeVisible();
    await expect(page.getByText( dataOrder.Variant , { exact: true })).toBeVisible();  //Check hiển thị đúng variant
    await page.getByRole('checkbox').nth(1).click();
    const fileChooserPromise1 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế - Black-Tshirt 
    await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
    const fileChooser1 = await fileChooserPromise1;
    await fileChooser1.setFiles(dataOrder.FileName); 
    await page.waitForTimeout(1000);
    await expect(page.locator('img').nth(1)).toBeVisible(); //Sau khi upload ảnh -> có hiển thị ảnh
    await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
    await page.waitForTimeout(1000);
    await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị text add design thành công 

        // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design"); //Truy cập màn hình Order - Tab unfulfilled
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator('#radix-vue-dropdown-menu-trigger-18').getByRole('button', { name: 'Action' }).click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await expect(page.locator('p').filter({ hasText: dataOrder.Costs1 }).locator('span').first()).toBeVisible(); //Check hiển thị costs - tại popup Fulfillment Confirmation
    await expect(page.locator('p').filter({ hasText: dataOrder.Costs1 }).locator('span').nth(1)).toBeVisible();  //Check hiển thị costs - tại popup Fulfillment Confirmation
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.

        //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing"); //Truy cập màn hình Order - Tab processing
    await expect(page.getByRole('cell', { name: dataOrder.TitleName }).first()).toBeVisible(); //Check hiển thị oder 
    await expect(page.locator("(//div[normalize-space()='awaiting'])[2]")).toBeVisible(); //Check hiển thị status [awaiting] 

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/list");
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(2000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.waitForTimeout(1000);
    await page.keyboard.press('F5');
    await expect(page.getByText('draft').first()).toBeVisible();

        // Delete SKU
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'SKU' }).click();
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(8)")
                .getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete sku successfully')).toBeVisible();

        });
    } 

/**
 * Case 2: Pass -> Action [Mark as fulfill]
 */

function ActionMarkAsFulfill () {

    test('Action Mark as fulfill', async ({ page }) => {

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
    await page.goto(dataSiteTest[1].linkSite + "setting/sku"); //Truy cập màn hình SKU
    await page.getByText('Add').click(); //Click btn add sku
    await page.waitForTimeout(1000);
    await expect(page.getByText('Add Sku')).toBeVisible();
    await page.getByPlaceholder('Name').fill(dataOrder.SKUname1); //Nhập tên SKU
    await page.getByPlaceholder('Basecost').fill(dataOrder.Basecost1); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(dataOrder.FirstItem1); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(dataOrder.NextItem1); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(dataOrder.Skucode1); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await page.waitForTimeout(1000);
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/create"); //Truy cập màn hình create product
    await page.getByPlaceholder('Input title').fill(dataOrder.TitleName1); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Chọn ảnh sản phẩm - Black-Tshirt 
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataOrder.FileName); 
    await page.getByRole('button', { name: 'Add variant' }).click(); // Nhập Variants - Color
    await page.getByPlaceholder('Option name').fill(dataOrder.Option);
    await page.getByPlaceholder('Options value...').fill(dataOrder.Variant);
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: dataOrder.Variant }).click(); // Nhập data option Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh
    await page.getByPlaceholder('Price', { exact: true }).fill(dataOrder.Price1
    ); //Nhập giá
    await page.getByPlaceholder('SKU').fill(dataOrder.Skucode1); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Chọn store 
    await page.getByRole('option', { name: dataOrder.StoreName }). click();
    await page.getByRole('button', { name: 'Create Product' }).click(); // Click create product
    await page.waitForTimeout(1000);
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
    await expect(page.getByText('Orders:All locations')).toBeVisible();
    await page.keyboard.press('F5'); //F5 load lại trang
    await page.getByRole('link', { name: 'Create order' }).click(); //Click btn Create Order
    await expect(page.getByText('Create order', { exact: true })).toBeVisible();
    await page.getByLabel('Browse products').click(); //Click btn Browse products
    await page.getByText('All products').click(); //Click All products
    await page.getByText(dataOrder.TitleName1).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').fill(dataOrder.Quantity1); //Nhập quantity (Số lượng item order)
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Search or create a customer').click(); //Click search customer
    await page.getByPlaceholder('Search or create a customer').fill(dataOrder.SelectCustomer); //Click search customer
    await page.getByText(dataOrder.SelectCustomer).click(); // Select Customer đã có trên hệ thống
    await page.getByRole('button', { name: 'Collect payment' }).click(); // Click btn để chọn thanh toán
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để thanh toán order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

    // Truy cập ADMIN - Thao tác action [Mark as fulfill]
        // Check hiển thị tại tab All - Các thông tin giống với store order
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All
    await expect(page.getByRole('cell', { name: dataOrder.TitleName1 }).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.getByRole('cell', { name: dataOrder.Quantity1, exact: true }).first()).toBeVisible(); //Check hiển thị Quantity (số lượng)
    await expect(page.getByRole('cell', { name:dataOrder.Total1 }).first()).toBeVisible(); //Check hiển thị total (Tổng tiền = Quantity * Price)

        // Thao tác action [Mark as fulfill]
    await page.waitForTimeout(1000);    
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click order Mark as fulfill
    await page.waitForTimeout(1000);
    await page.locator("(//label[normalize-space()='Action'])[1]").click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Mark as fulfilled' }).click(); //Click action Mark as fulfilled

        // Check hiển thị order tại tab fulfill
    await page.waitForTimeout(1000);    
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=fulfilled"); //Truy cập màn hình Order - Tab fulfilled
    await expect(page.getByRole('cell', { name: dataOrder.TitleName1 }).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.locator("(//div[normalize-space()='mark_fulfilled'])[2]")).toBeVisible(); //Check hiển thị status sau [Mark_fulfilled]

                // Check list hiển thị status [Drafr]
    await page.waitForTimeout(1000);
    await page.keyboard.press('F5');
    await expect(page.getByText('draft').first()).toBeVisible();
    
            // Delete SKU
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'SKU' }).click();
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(8)")
                .getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete sku successfully')).toBeVisible();    

        });
    } 

/**
 * Case 3: Pass -> Action [Sync status]
 */

function ActionSyncStatus () {

    test('Action Sync status', async ({ page }) => {

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
    await page.goto(dataSiteTest[1].linkSite + "setting/sku"); //Truy cập màn hình SKU
    await page.getByText('Add').click(); //Click btn add sku
    await page.waitForTimeout(1000);
    await expect(page.getByText('Add Sku')).toBeVisible();
    await page.getByPlaceholder('Name').fill(dataOrder.SKUname2); //Nhập tên SKU
    await page.getByPlaceholder('Basecost').fill(dataOrder.Basecost2); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(dataOrder.FirstItem2); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(dataOrder.NextItem2); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(dataOrder.Skucode2); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await page.waitForTimeout(1000);
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/create"); //Truy cập màn hình create product
    await page.getByPlaceholder('Input title').fill(dataOrder.TitleName2); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Chọn ảnh sản phẩm - Black-Tshirt 
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataOrder.FileName); 
    await page.getByRole('button', { name: 'Add variant' }).click(); // Nhập Variants - Color
    await page.getByPlaceholder('Option name').fill(dataOrder.Option);
    await page.getByPlaceholder('Options value...').fill(dataOrder.Variant);
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: dataOrder.Variant }).click(); // Nhập data option Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh
    await page.getByPlaceholder('Price', { exact: true }).fill(dataOrder.Price2
    ); //Nhập giá
    await page.getByPlaceholder('SKU').fill(dataOrder.Skucode2); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Chọn store 
    await page.getByRole('option', { name: dataOrder.StoreName }). click(); //Chọn Store
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Advanced' }).click(); //Click btn để thêm tag
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Create Product' }).click(); // Click create product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Create product successfully')).toBeVisible();

        // Truy cập store order
    await page.waitForTimeout(1000);
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
    await page.getByText(dataOrder.TitleName2).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').fill(dataOrder.Quantity2); //Nhập số lượng order
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Search or create a customer').fill(dataOrder.SelectCustomer); //Click search customer
    await page.getByText(dataOrder.SelectCustomer).click(); // Select Customer đã có trên hệ thống
    await page.getByRole('button', { name: 'Collect payment' }).click(); // Click btn để chọn thanh toán
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để thanh toán order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

    // Truy cập ADMIN - Thao tác action [Request fulfillment]
        // Thao tác action [Request fulfillment] 
        // Check hiển thị tại tab All - Các thông tin giống với store order
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All
    await expect(page.getByRole('cell', { name: dataOrder.TitleName2 }).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.getByRole('cell', { name: dataOrder.Quantity2, exact: true }).first()).toBeVisible(); //Check hiển thị Quantity (số lượng)
    await expect(page.getByRole('cell', { name:dataOrder.Total2 }).first()).toBeVisible(); //Check hiển thị total (Tổng tiền = Quantity * Price)

        // Add Design
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=all"); //Truy cập màn hình Order - Tab All
    await page.locator('.py-1 > div > .p-1').first().click(); //Click icon add design
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Upload design' })).toBeVisible();
    await expect(page.getByText( dataOrder.Variant , { exact: true })).toBeVisible();  //Check hiển thị đúng variant
    await page.getByRole('checkbox').nth(1).click();
    const fileChooserPromise1 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế - Black-Tshirt 
    await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
    const fileChooser1 = await fileChooserPromise1;
    await fileChooser1.setFiles(dataOrder.FileName); 
    await page.waitForTimeout(1000);
    await expect(page.locator('img').nth(1)).toBeVisible(); //Sau khi upload ảnh -> có hiển thị ảnh
    await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
    await page.waitForTimeout(1000);
    await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị text add design thành công 

        // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design"); //Truy cập màn hình Order - Tab unfulfilled
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator("(//label[normalize-space()='Action'])[1]").click(); //Click btn action -> hiển thị tootip 
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await page.waitForTimeout(1000);
    await expect(page.locator('p').filter({ hasText: dataOrder.Costs2 }).locator('span').first()).toBeVisible(); //Check hiển thị costs - tại popup Fulfillment Confirmation
    await expect(page.locator('p').filter({ hasText: dataOrder.Costs2 }).locator('span').nth(1)).toBeVisible();  //Check hiển thị costs - tại popup Fulfillment Confirmation
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.

        //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing"); //Truy cập màn hình Order - Tab processing
    await page.locator("(//*[name()='svg'][@class='icon w-5 h-5'])[1]").click(); //Click icon load lại danh sách
    await page.waitForTimeout(1000);
    await expect(page.getByRole('cell', { name: dataOrder.TitleName2 }).first()).toBeVisible(); //Check hiển thị oder 
    await expect(page.locator("(//div[normalize-space()='awaiting'])[2]")).toBeVisible(); //Check hiển thị status [awaiting] 
    await page.waitForTimeout(2000);

            // Check hiển thị trước khi thao tác action [Sync status] - Xuất hiện số bản ghi = Quantity2
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing"); //Truy cập màn hình Order - Tab processing
    await page.locator('div#__nuxt tr:nth-child(1) > td:nth-child(3) > div > button').click(); //Click ID Order
    await page.waitForTimeout(1000);
    await expect(page.getByText('Status Cancel: cancel-produce').first()).not.toBeVisible(); //Bản ghi 1
    await expect(page.getByText('Request At: ').first()).toBeVisible(); //Bản ghi 1
    await expect(page.getByText('Status Cancel: cancel-produce').nth(1)).not.toBeVisible(); //Bản ghi 2
    await expect(page.getByText('Request At: ').nth(1)).toBeVisible(); //Bản ghi 2
    await expect(page.getByText('Status Cancel: cancel-produce').nth(2)).not.toBeVisible();  //Bản ghi 3
    await expect(page.getByText('Request At: ').nth(2)).toBeVisible(); //Bản ghi 3
    await page.keyboard.press('Escape');  //Bấm Esc đóng popup 

        // Thao tác action [Sync status]
    await page.waitForTimeout(1000);
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator('#radix-vue-dropdown-menu-trigger-18').getByRole('button', { name: 'Action' }).click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Sync status' }).click(); //Click action Sync status
    await page.waitForTimeout(1000);
    await expect(page.getByText('Sync status successfully')).toBeVisible();

            // Check hiển thị sau khi thao tác action [Sync status]
    await page.waitForTimeout(1000);
    await page.locator('div#__nuxt tr:nth-child(1) > td:nth-child(3) > div > button').click(); //Click ID Order
    await page.waitForTimeout(1000);
    await expect(page.getByText('Status Cancel: cancel-produce').first()).toBeVisible(); //Hiển thị Status Cancel vị trí 1
    const cellRequestFulfillAt = page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(21) > div");  //Khai báo locator ô Request Fulfil At tại list order - tab Processing
    await expect(cellRequestFulfillAt).toHaveClass('w-full flex justify-center'); //Expect: cellRequestFulfillAt -> toHaveClass 
    const firstRequestAt = cellRequestFulfillAt.first(); //Khai báo firstRequestAt vị trí 1
    await expect(firstRequestAt).toBeVisible(); //Hiển thị firstRequestAt vị trí 1
        await expect(page.getByText('Status Cancel: cancel-produce').nth(1)).toBeVisible(); //Hiển thị Status Cancel vị trí 2
        const nth1RequestAt = cellRequestFulfillAt; //Khai báo nth1RequestAt vị trí 2
        await expect(nth1RequestAt).toBeVisible(); //Hiển thị nth1RequestAt vị trí 2
            await expect(page.getByText('Status Cancel: cancel-produce').nth(2)).toBeVisible();  //Hiển thị Status Cancel vị trí 3
            const nth2RequestAt = cellRequestFulfillAt; //Khai báo nth2RequestAt vị trí 3
            await expect(nth2RequestAt).toBeVisible(); //Hiển thị nth2RequestAt vị trí 3

        // Update Status Product - [Drafr]
    await page.getByRole('button', { name: 'Product', exact: true }).click();
    await page.getByRole('link', { name: 'List' }).click();
    await expect(page.getByRole('link', { name: dataOrder.TitleName2 })).toBeVisible();
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(1000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
        await page.keyboard.press('F5');
        await expect(page.getByText('draft').first()).toBeVisible();
    
            // Delete SKU
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'SKU' }).click();
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(8)")
                .getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete sku successfully')).toBeVisible();
        
        });
    }

/**
 * Case 4: Pass -> Action [Re-fulfillment]
 */

function ActionReFulfillment () {

    test('Action Re-fulfillment', async ({ page }) => {

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
    await page.goto(dataSiteTest[1].linkSite + "setting/sku"); //truy cập link sku
    await page.getByText('Add').click(); //Click btn add sku
    await expect(page.getByText('Add Sku')).toBeVisible();
    await page.getByPlaceholder('Name').fill(dataOrder.SKUname3); //Nhập tên SKU
    await page.getByPlaceholder('Basecost').fill(dataOrder.Basecost3); //Nhập phí Basecost
    await page.getByPlaceholder('First Item').fill(dataOrder.FirstItem3); //Nhập phí ship cho item 1
    await page.getByPlaceholder('Next Item').fill(dataOrder.NextItem3); //Nhập phí ship cho item tiếp theo (item 2 trở đi)
    await page.getByPlaceholder('Sku code').fill(dataOrder.Skucode3); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save' }).click(); //Click btn Lưu mã SKU 
    await expect(page.getByText('Created sku successfully')).toBeVisible();

        // Add Product 
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "products/create"); //Truy cập màn hình create product
    await page.getByPlaceholder('Input title').fill(dataOrder.TitleName3); // Nhập Title Name
    const fileChooserPromise = page.waitForEvent('filechooser'); // Chọn ảnh sản phẩm - Black-Tshirt 
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataOrder.FileName); 
    await page.getByRole('button', { name: 'Add variant' }).click(); // Nhập Variants - Color
    await page.getByPlaceholder('Option name').fill(dataOrder.Option);
    await page.getByPlaceholder('Options value...').fill(dataOrder.Variant);
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.waitForTimeout(1000);  
    await page.locator('button').filter({ hasText: dataOrder.Variant }).click(); // Nhập data option Color - Black
    await page.getByRole('img').first().click(); //Chọn ảnh
    await page.getByPlaceholder('Price', { exact: true }).fill(dataOrder.Price3
    ); //Nhập giá
    await page.getByPlaceholder('SKU').fill(dataOrder.Skucode3); //Nhập mã SKU
    await page.getByRole('button', { name: 'Save Change' }).click(); //Click btn Save 
    await page.getByText('Choose store...').first().click(); // Chọn store 
    await page.getByRole('option', { name: dataOrder.StoreName }). click(); //Chọn Store
    await page.getByRole('button', { name: 'Advanced' }).click(); //Click btn để thêm tag
    await page.getByRole('button', { name: 'Create Product' }).click(); // Click create product
    await expect(page.getByText('Create product successfully')).toBeVisible();

        // Truy cập store order
    await page.waitForTimeout(1000);
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
    await page.getByLabel('Browse products').click();
    await page.getByText('All products').click();
    await page.getByText(dataOrder.TitleName3).nth(1).click(); //Click Product Order
    await page.getByRole('button', { name: 'Add', exact: true }).click(); //Click btn Save Product Order
    await page.getByLabel('available quantity').fill(dataOrder.Quantity3); //Nhập số lượng order
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('Search or create a customer').click(); //Click search customer
        // Select Customer đã có trên hệ thống
    await page.getByPlaceholder('Search or create a customer').fill(dataOrder.SelectCustomer); //Click search customer
    await page.getByText(dataOrder.SelectCustomer).click(); // Select Customer đã có trên hệ thống
        // Click btn để Save Order
    await page.getByRole('button', { name: 'Collect payment' }).click();
    await page.getByRole('menuitem', { name: 'Mark as paid' }).click(); //Click Mark as paid để order -> Phải Mark as paid ADMIN mới hiển thị order
    await page.getByRole('button', { name: 'Create order' }).click(); //Click btn Create order
    await expect(page.locator('span').filter({ hasText: 'Order created' })).toBeVisible();

        // Truy cập ADMIN - Thao tác action [Request fulfillment]
        // Check hiển thị tại tab All - Các thông tin giống với store order
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20");
    await expect(page.getByText(dataOrder.TitleName3).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.getByRole('cell', { name: dataOrder.Quantity3, exact: true }).first()).toBeVisible(); //Check hiển thị Quantity (số lượng)
    await expect(page.getByRole('cell', { name:dataOrder.Total3 }).first()).toBeVisible

        // Add Design
    await page.waitForTimeout(2000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20"); //Truy cập màn hình order - Tab All
    await page.locator('.py-1 > div > .p-1').first().click(); //Click icon add design
    await expect(page.getByRole('heading', { name: 'Upload design' })).toBeVisible();
    await expect(page.getByText( dataOrder.Variant , { exact: true })).toBeVisible();  //Check hiển thị đúng variant
    await page.getByRole('checkbox').nth(1).click();
    const fileChooserPromise1 = page.waitForEvent('filechooser'); // Chọn ảnh thiết kế - Black-Tshirt 
    await page.getByRole('button', { name: 'Add design', exact: true }).click(); 
    const fileChooser1 = await fileChooserPromise1;
    await fileChooser1.setFiles(dataOrder.FileName); 
    await expect(page.locator('img').nth(1)).toBeVisible(); //Sau khi upload ảnh -> có hiển thị ảnh
    await page.getByRole('button', { name: 'Submit design' }).click(); //Click btn add design
    await expect(page.getByText('Submit design successfully')).toBeVisible(); //Hiển thị text add design thành công 

        // Update order với data không hợp lệ
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design"); //Truy cập màn hình order - Tab unfulfilled
    await page.locator('div#__nuxt tr:nth-child(1) > td:nth-child(3) > div > button').click(); //Click ID Order
    await page.getByPlaceholder('Phone').fill(dataOrder.PhoneFalse); //Update phone sai 
    await page.getByPlaceholder('Zip').fill(dataOrder.ZipFalse); //Update mã zip sai 
    await page.getByText('Update').click(); //Click btn Update order
    await expect(page.getByText('Update info successfully')).toBeVisible(); //Hiển thị thông báo update thành công

        // Thao tác action [Request Fulfillment]
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=unfulfilled&sort=has_design"); //Truy cập màn hình order - Tab unfulfilled
    await page.locator("(//button[@role='checkbox'])[2]").click(); //Click Order Request Fulfillment
    await page.locator("(//label[normalize-space()='Action'])[1]").click(); //Click btn action -> hiển thị tootip 
    await page.waitForTimeout(1000);
    await page.getByRole('menuitem', { name: 'Request fulfillment' }).click(); //Click action Request fulfillment
    await expect(page.locator('p').filter({ hasText: dataOrder.Costs3 }).locator('span').first()).toBeVisible(); //Check hiển thị costs - tại popup Fulfillment Confirmation
    await expect(page.locator('p').filter({ hasText: dataOrder.Costs3 }).locator('span').nth(1)).toBeVisible();  //Check hiển thị costs - tại popup Fulfillment Confirmation
    await page.getByRole('button', { name: 'Confirm', exact: true }).click(); //Click btn Confirm
    await page.waitForTimeout(1000);
    await expect(page.getByText('Fulfill successfully')).toBeVisible();  //Check hiển thị thông báo Request Fulfillment thành công.thông báo Request Fulfillment thành công.

        // Check hiển thị order Lỗi tại tab Error
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=error"); //Truy cập màn hình order - Tab error
    await page.keyboard.press('F5');
    await expect(page.getByText(dataOrder.TitleName3).first()).toBeVisible(); //Check hiển thị title name
    await expect(page.locator("(//div[normalize-space()='error'])[2]").first()).toBeVisible(); //Check hiển thị status error

        // Update order với data hợp lệ
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=error"); //Truy cập màn hình order - Tab error
    await page.locator('div#__nuxt tr:nth-child(1) > td:nth-child(3) > div > button').click(); //Click ID Order
    await expect(page.getByText('validate')).toBeVisible(); //Check hiển thị thông báo lỗi
    await expect(page.getByText('The address.phone format is')).toBeVisible(); //Check hiển thị thông báo lỗi
    await page.getByRole('button', { name: 'Detail request fulfill' }).click(); //Click btn hướng đến Detail Request fulfill
    await page.locator('div').filter({ hasText: /^Shipping address$/ }).getByRole('button').click(); //Click icon sửa data hợp lệ 
    await page.getByPlaceholder('Phone').fill(dataOrder.PhoneTrue); //Update phone sai 
    await page.getByPlaceholder('Zip').fill(dataOrder.ZipTrue); //Update mã zip sai 
    await page.getByRole('button', { name: 'Update', exact: true }).click(); //Click btn Update order
    await page.getByRole('button', { name: 'Continue' }).click(); //Click btn confirmn update shipping address
    await expect(page.getByText('Update request fulfill')).toBeVisible(); //Hiển thị thông báo update thành công

        // Thao tác action [Re-Fulfillment]
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Re fulfill' }).click(); //Click btn Re-Fulfillment
    await page.getByRole('button', { name: 'Continue' }).click(); //Click btn confirmn Re-Fulfillment
    await page.waitForTimeout(500);
    await expect(page.getByText('Re fulfill successfuly')).toBeVisible();

        //  Check hiển thị order tại tab Processing - Sau khi Request Fulfillment thành công
    await page.waitForTimeout(1000);
    await page.goto(dataSiteTest[1].linkSite + "order?page=1&limit=20&status=processing"); //Truy cập màn hình order - Tab processing
    await page.locator('.flex > .inline-flex').first(); //Click  icon load lại trang
    await expect(page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(4)")
                        .getByText(dataOrder.TitleName3)).toBeVisible(); //Check hiển thị order
    await expect(page.locator("(//div[normalize-space()='awaiting'])[2]")).toBeVisible(); //Check hiển thị status [awaiting] 

         // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Product', exact: true }).click();
    await page.getByRole('link', { name: 'List' }).click();
    await expect(page.getByRole('link', { name: dataOrder.TitleName3 })).toBeVisible();
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(1000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
        await page.keyboard.press('F5');
        await expect(page.getByText('draft').first()).toBeVisible();
    
            // Delete SKU
    await page.getByRole('button', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'SKU' }).click();
    await page.locator("div#__nuxt tr:nth-child(1) > td:nth-child(8)")
                .getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete sku successfully')).toBeVisible();

        });
    }

function main (){

    ActionRequestFulfillment ();
    ActionMarkAsFulfill ();
    ActionSyncStatus ();
    ActionReFulfillment ();

}
main()