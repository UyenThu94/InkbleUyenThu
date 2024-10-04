// @ts-check
const { test, expect } = require('@playwright/test');
import dataSiteTest from '../../dataSite.json';
import { dataLogin } from '../../DataLogin';
import { dataProduct } from './DataProduct';
import fs from 'fs';
import path from 'path'; 
import { } from '@playwright/test';

/**
 * Case 1: Pass -> Action [Request fulfillment]
 */

function CreateProduct () {

    test('Create Product', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Product - Create (Tạo sản phẩm)
    await page.getByRole('button', { name: 'Product' }).click();
    await page.getByRole('link', { name: 'Create' }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
                // Nhập title1
    await page.getByPlaceholder('Input title').fill(dataProduct.Title);
                // Chọn ảnh sản phẩm - Black-Tshirt 2D
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataProduct.FileName);  
                // Chọn ảnh sản phẩm - Red   
    const fileChooserPromise1 = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Add', exact: true }).click(); 
    const fileChooser1 = await fileChooserPromise1;
    await fileChooser1.setFiles(dataProduct.FileName1);  
                // Nhập Variants - Size
    await page.getByRole('button', { name: 'Add variant' }).click();
    await page.getByPlaceholder('Option name').fill(dataProduct.OptionS);
    await page.getByPlaceholder('Options value...').fill(dataProduct.VariantS1);
    await page.getByPlaceholder('Options value...').press('Enter');
    await page.getByPlaceholder('Options value...').fill(dataProduct.VariantS2);
    await page.getByPlaceholder('Options value...').press('Enter');
                // Nhập Variants - Color
    await page.getByRole('button', { name: 'Add variant' }).click();
    await page.getByPlaceholder('Option name').nth(1).fill(dataProduct.OptionC);
    await page.getByPlaceholder('Options value...').nth(1).fill(dataProduct.VarianC1);
    await page.getByPlaceholder('Options value...').nth(1).press('Enter');
    await page.getByPlaceholder('Options value...').nth(1).fill(dataProduct.VariantC2);
    await page.getByPlaceholder('Options value...').nth(1).press('Enter');
                // Chọn ảnh option Black
    await page.waitForTimeout(1000);
    await page.locator('button').filter({ hasText: dataProduct.VarianC1 }).click();
    await page.getByRole('img').first().click();
    await page.getByRole('button', { name: 'Save Change' }).click();
                // Chọn ảnh option Red
    await page.waitForTimeout(1000);
    await page.locator('button').filter({ hasText: dataProduct.VariantC2 }).click();
    await page.getByRole('img').nth(1).click();
    await page.getByRole('button', { name: 'Save Change' }).click();
                // Chọn store 
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataProduct.StoreName }). click();
                // Nhập giá 
    await page.getByPlaceholder('Pricing').fill(dataProduct.Gia);
                // Click create product
    await page.getByRole('button', { name: 'Create Product' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Create product successfully')).toBeVisible();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
    await page.waitForTimeout(2000);

        // Check list product
    await page.getByRole('link', { name: 'List' }).click(); //Click thanh menu - List
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/list");
    await page.keyboard.press('F5');
    await expect(page.getByRole('link', { name: dataProduct.Title })).toBeVisible();

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(2000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list")
    await expect(page.getByText('draft').first()).toBeVisible();
    
        });
    } 


/**
 * Case 2: Pass -> Tạo từ product khác
 */
function CreateProductID () {

test('Create Product ID', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Product - Create (Tạo sản phẩm)
    await page.getByRole('button', { name: 'Product' }).click();
    await page.getByRole('link', { name: 'Create' }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
                // Create product -> Chọn store
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataProduct.StoreName }). click();
                // Nhập ID product khác
    await page.getByPlaceholder('Product ID').fill(dataProduct.ProductID);
    await page.getByRole('button', { name: 'Load' }).click();
                // Nhập Title 2
    await page.getByPlaceholder('Input title').click();
    await page.getByPlaceholder('Input title').fill(dataProduct.Title1);
                // Click create product
    await page.getByRole('button', { name: 'Create Product' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Create product successfully')).toBeVisible();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");
                // Check list product
    await page.waitForTimeout(1000); 
    await page.goto(dataSiteTest[1].linkSite + "products/list");
    await expect(page.getByRole('link', { name: dataProduct.Title1 })).toBeVisible();
    await page.locator("(//*[name()='svg'][@class='icon w-5 h-5'])[1]").click(); //Click icon load lại danh sách  
    await expect(page.getByRole('link', { name: dataProduct.Title1 })).toBeVisible();
    await page.waitForTimeout(1000);

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(2000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list")
    await expect(page.getByText('draft').first()).toBeVisible();

        });
    }
 

/**
 * Case 3: Pass -> Tạo từ template product ID - fixed
 */
function CreateProductTemplateFixed () {

test('Create Product Template Fixed', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Create Template - Tạo Template fixed 
    await page.getByRole('button', { name: 'Product' }).click();
    await page.getByRole('link', { name: 'Create' }).click();
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataProduct.StoreName }). click(); //Chọn TenStore
    await page.getByPlaceholder('Product ID').fill(dataProduct.ProductID); //Nhập ProductID
    await page.getByRole('button', { name: 'Load' }).click(); 
    await page.getByPlaceholder('Template Name').fill(dataProduct.TemplateName); //Nhập TemplateName1
    await page.getByRole('button', { name: 'Create', exact: true }).click(); //Click btn Lưu Template
    await expect(page.getByText('Create template successfully')).toBeVisible();

        // Đăng nhập Shopify -> Edit Product
    await page.goto(dataSiteTest[3].linkSite);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(dataLogin.userStore); //Tên đăng nhập store
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await page.getByLabel('Password', { exact: true }).clear();
    await page.getByLabel('Password', { exact: true }).fill(dataLogin.pwStore);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(dataSiteTest[3].linkSite + dataLogin.linkStore); //Expect điều hướng đến link store
                // Edit Product
    await page.getByRole('button', { name: 'Search CTRL K' }).click(); //Search product ID
    await page.getByPlaceholder('Search').fill(dataProduct.ProductID);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
                // Chọn thêm ảnh sản phẩm 
    await page.locator('._DropZonePlaceholder_1phti_4').click(); 
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Add media' }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataProduct.FileName2);
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Color Black' }).click();
    await page.getByPlaceholder('Add another value').fill(dataProduct.ColorStore); //Nhập ColorStore
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(1000);
    await page.getByLabel('Select image for White variant').click(); //Click chọn ảnh variant
    await page.waitForTimeout(1000);
    await page.locator('._Thumbnail_1sg7c_83').first().click(); //Chọn ảnh variant
    await page.waitForTimeout(1000);
    await page.getByLabel('Select image', { exact: true }).getByRole('button', { name: 'Done' }).click();
    await page.locator('#AppFrameScrollable').getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Product saved', { exact: true })).toBeVisible();  

        // Đăng nhập admin check template fixed ko không hiển thị sản phẩm mới thêm 
    await page.goto(dataSiteTest[1].linkSite + 'products/create');
    await page.waitForTimeout(1000);
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataProduct.StoreName }). click(); //Chọn store
    await page.locator('button').filter({ hasText: 'Choose template...' }).click(); //Chọn Template fixed 
    await page.getByText(dataProduct.TemplateName).first().click();
                // Check Template Fixed ko hiển thị sản phẩm mới thêm
    await expect(page.locator('img').nth(2)).not.toBeVisible();
    await expect(page.locator('button').filter({ hasText: dataProduct.ColorStore })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: dataProduct.ColorStore })).not.toBeVisible();
                // Edit Title 
    await page.getByPlaceholder('Input title').click();
    await page.getByPlaceholder('Input title').fill(dataProduct.Title2);
                // Click create product
    await page.getByRole('button', { name: 'Create Product' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Create product successfully')).toBeVisible();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");

        // Check list product
    await page.waitForTimeout(1000); 
    await page.getByRole('button', { name: 'Product', exact: true }).click();
    await page.waitForTimeout(1000); 
    await page.getByRole('link', { name: 'List' }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/list");
    await expect(page.getByRole('link', { name: dataProduct.Title2 }).first()).toBeVisible();
    await page.locator("(//*[name()='svg'][@class='icon w-5 h-5'])[1]").click(); //Click icon load lại danh sách  
    await expect(page.getByRole('link', { name: dataProduct.Title2 }).first()).toBeVisible();
    await page.waitForTimeout(1000);

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(2000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list")
    await expect(page.getByText('draft').first()).toBeVisible();

        // Xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");//Truy cập list_template
    await page.locator("(//button[@type='button'])[7]").click(); //Click icon xóa
    await page.getByRole('button', { name: 'Continue' }).click(); //Click btn confirmn xóa template
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete template successfully')).toBeVisible();

        // Xóa sản phẩm thêm tại Store 
    await page.goto(dataSiteTest[3].linkSite + dataProduct.StoreLinkProductID ); //StoreLinkProductID = Link sản phẩm trên Store
    await page.getByLabel('Select', { exact: true }).nth(1).click();
    await page.getByLabel('Remove', { exact: true }).click(); //Click Xóa Image
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Color Black ' + dataProduct.ColorStore  }).click();
    await page.waitForTimeout(1000);
    await page.getByLabel('Delete option').nth(1).click(); //Click Xóa option
    await expect(page.getByText('value deletedUndo')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Done' }).click(); //Click btn Done Variant
    await page.waitForTimeout(1000);
    await page.locator('#AppFrameScrollable').getByRole('button', { name: 'Save' }).click(); //Click btn Save
    await page.getByRole('button', { name: 'Save product' }).click(); //Click btn Save product
    await page.waitForTimeout(2000);
    await expect(page.locator('.Polaris-Frame-Toast')
                        .getByText('Product saved')).toBeVisible();    
    
        });
    }


/**
 * Case 4: Pass -> Tạo template - Auto sync
 * => Đồng bộ trạng thái của product từ store
 */
function CreateProductTemplateAutosync () {

test('Create Product Template Auto sync', async ({ page }) => {

            test.slow();
        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Click Create Template - Tạo Template Auto sync
    await page.getByRole('button', { name: 'Product' }).click();
    await page.getByRole('link', { name: 'Create' }).click();
    await page.getByText('Choose store...').first().click();
    await page.getByRole('option', { name: dataProduct.StoreName }). click(); //Chọn TenStore
    await page.getByPlaceholder('Product ID').fill(dataProduct.ProductID); //Nhập ProductID
    await page.getByRole('button', { name: 'Load' }).click(); 
    await page.getByPlaceholder('Template Name').fill(dataProduct.TemplateName1); //Nhập TemplateName1
    await page.getByRole('checkbox').click(); // Check Auto sync
    await page.getByRole('button', { name: 'Create', exact: true }).click(); //Click btn Lưu Template
    await expect(page.getByText('Create template successfully')).toBeVisible();

        // Đăng nhập Shopify -> Edit Product
    await page.goto(dataSiteTest[3].linkSite);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(dataLogin.userStore); //Tên đăng nhập store
    await page.getByRole('button', { name: 'Continue with email' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill(dataLogin.pwStore);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(dataSiteTest[3].linkSite + dataLogin.linkStore); //Expect điều hướng đến link store
                // Edit Product
    await page.getByRole('button', { name: 'Search CTRL K' }).click(); //Search product ID
    await page.getByPlaceholder('Search').fill(dataProduct.ProductID);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
                // Chọn thêm ảnh sản phẩm  
    await page.locator('._DropZonePlaceholder_1phti_4').click(); 
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Add media' }).click(); 
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(dataProduct.FileName2);
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Color Black' }).click();
    await page.getByPlaceholder('Add another value').fill(dataProduct.ColorStore); //Nhập ColorStore
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Done' }).click();
    await page.waitForTimeout(1000);
    await page.getByLabel('Select image for White variant').click(); //Click chọn ảnh variant
    await page.waitForTimeout(1000);
    await page.locator('._Thumbnail_1sg7c_83').first().click(); //Chọn ảnh variant
    await page.waitForTimeout(1000);
    await page.getByLabel('Select image', { exact: true }).getByRole('button', { name: 'Done' }).click();
    await page.locator('#AppFrameScrollable').getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Product saved', { exact: true })).toBeVisible();  

        // Check Template Auto sync có hiển thị sản phẩm mới thêm
    await page.goto(dataSiteTest[1].linkSite + 'products/create');
    await page.waitForTimeout(1000);
    await page.locator('button').filter({ hasText: 'Choose template...' }).click();
    await page.getByText(dataProduct.TemplateName1).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('img').nth(2)).toBeVisible();
    await expect(page.locator('button').filter({ hasText: dataProduct.ColorStore })).toBeVisible();
    await expect(page.getByRole('cell', { name: dataProduct.ColorStore })).toBeVisible();
                // Edit Title 4
    await page.getByPlaceholder('Input title').click();
    await page.getByPlaceholder('Input title').fill(dataProduct.Title3);
                // Click create product
    await page.getByRole('button', { name: 'Create Product' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText('Create product successfully')).toBeVisible();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/create");

        // Check list product
    await page.waitForTimeout(2000); 
    await page.getByRole('button', { name: 'Product', exact: true }).click();
    await page.getByRole('link', { name: 'List' }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "products/list");
    await page.locator("(//*[name()='svg'][@class='icon w-5 h-5'])[1]").click(); //Click icon load lại danh sách  
    await expect(page.getByRole('link', { name: dataProduct.Title3 })).toBeVisible();

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(2000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(1000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list")
    await expect(page.getByText('draft').first()).toBeVisible();

        // Xóa template
    await page.goto(dataSiteTest[1].linkSite + "products/list_template");//Truy cập list_template
    await page.locator("(//button[@type='button'])[7]").click(); //Click icon xóa
    await page.getByRole('button', { name: 'Continue' }).click(); //Click btn confirmn xóa template
    await page.waitForTimeout(1000);
    await expect(page.getByText('Delete template successfully')).toBeVisible();

        // Xóa sản phẩm thêm tại Store 
    await page.goto(dataSiteTest[3].linkSite + dataProduct.StoreLinkProductID ); //StoreLinkProductID = Link sản phẩm trên Store
    await page.waitForTimeout(1000);
    await page.getByLabel('Select', { exact: true }).nth(1).click();
    await page.getByLabel('Remove', { exact: true }).click(); //Click Xóa Image
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Color Black ' + dataProduct.ColorStore  }).click();
    await page.waitForTimeout(1000);
    await page.getByLabel('Delete option').nth(1).click(); //Click Xóa option
    await page.waitForTimeout(1000);
    await expect(page.getByText('value deletedUndo')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Done' }).click(); //Click btn Done Variant
    await page.waitForTimeout(1000);
    await page.locator('#AppFrameScrollable').getByRole('button', { name: 'Save' }).click(); //Click btn Save
    await page.getByRole('button', { name: 'Save product' }).click(); //Click btn Save product
    await page.waitForTimeout(2000);
    await expect(page.locator('.Polaris-Frame-Toast')
                        .getByText('Product saved')).toBeVisible();    

        });
    }

/**
 * Case 5: Pass -> Tạo product - Từ Catalog
 */
function CreateProductCatalog () {

    test('Create Product Catalog', async ({ page }) => {
    
        test.slow();
        // Đăng nhập CMS thành công  
    await page.goto(dataSiteTest[0].linkSite);
    await page.getByPlaceholder('username, Email or phone').fill(dataLogin.adminLogin);
    await page.getByPlaceholder('Password').fill(dataLogin.pwAdmin);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "organization");
    await page.getByText(dataLogin.orgLogin).click();
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "dashboard");

        // Tạo Product từ Catalog
    await page.getByText('Catalog').click(); //Click thanh menu - Catalog
    await expect(page).toHaveURL(dataSiteTest[1].linkSite + "catalog-user");
    await page.getByPlaceholder('Search...').fill(dataProduct.ProductCatalog); //Nhập tìm kiếm Product Catalog
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.getByRole('link', { name: dataProduct.ProductCatalog }).click(); //Click chọn Product Catalog
    await expect(page.getByText(dataProduct.ProductCatalog)).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Create Product' }).click(); //Click btn Create Product
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Input title').fill(dataProduct.Title4); //Nhập title
    await page.getByText('Choose store...').click(); //Click ô input chọn store
    await page.getByRole('option', { name: dataProduct.StoreName }).click(); //Click chọn store 
    await page.getByPlaceholder('Pricing').fill(dataProduct.Gia1); //Nhập giá
                // Xóa bớt ảnh để thời gian lưu nhanh hơn - Xóa còn 3 ảnh
        await page.locator("(//*[name()='svg'][@role='img'])[19]").click();
        await page.locator("(//*[name()='svg'][@role='img'])[18]").click();
        await page.locator("(//*[name()='svg'][@role='img'])[17]").click();
        await page.locator("(//*[name()='svg'][@role='img'])[16]").click();
        await page.locator("(//*[name()='svg'][@role='img'])[15]").click();
        await page.locator("(//*[name()='svg'][@role='img'])[14]").click();
    await page.getByRole('button', { name: 'Create Product' }).click(); //Click btn Save Product
    await page.waitForTimeout(7000);
    await expect(page.getByText('Create product successfully')).toBeVisible();

        // Check hiển thị product tại danh sách 
    await page.getByRole('button', { name: 'Product', exact: true }).click(); //Thanh menu - click Product
    await page.getByRole('link', { name: 'List' }).click(); //Thanh menu - click List
    await page.keyboard.press('F5'); //F5 load lại danh sách 
    await expect(page.getByRole('link', { name: dataProduct.Title4 }).first()).toBeVisible(); //Check hiển thị product tại list

        // Update Status Product - [Drafr]
    await page.waitForTimeout(1000);
    await page.locator('button:nth-child(2) > .inline-flex').first().click(); //Click Product edit status
    await page.waitForTimeout(2000);
    await page.locator('button').filter({ hasText: 'Active' }).click(); //Click btn edit status 
    await page.locator("(//div[@role='option'])[3]").click(); //Click status Draft 
    await page.getByRole('button', { name: 'Update Product' }).click(); //Click btn Update Product
    await page.waitForTimeout(2000);
    await expect(page.getByText('Update product successfully')).toBeVisible();
                // Check list hiển thị status [Drafr]
    await page.goto(dataSiteTest[1].linkSite + "products/list")
    await expect(page.getByText('draft').first()).toBeVisible();

        });
    }

function main (){

    CreateProduct();
    CreateProductID();
    CreateProductTemplateFixed();
    CreateProductTemplateAutosync();
    CreateProductCatalog();

}
main()
