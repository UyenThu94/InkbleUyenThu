
 export const dataOrder = {
    /**
        * Data dùng chung các funtion
    */
    // Admin - data 
    StoreName: 'luyenstore',
    Option: 'Color',
    Variant: 'Black',
    FileName: 'tests/BlackTshirt 2D.jpg',
    // Store - Select Customer có trên hệ thống
    SelectCustomer: 'Caroline Brewster Brewster',

    /**
        * Case 1: Data function ActionRequestFulfillment
    */

    // Admin - Data SKU
    SKUname: 'Mã SKU THF-S25',
    Basecost: '7',
    FirstItem: '10',
    NextItem: '6',
    Skucode: 'THF-S25',
    // Admin - Data Product 
    TitleName: 'A Product Order Request fulfill lần 1 0310 Tshirt 2D',
    Price: '45',
    // Store - Data create order 
    Quantity: '5',

    // Admin - Check hiển thị Total - Costs (VD: Price=9, Quantity =3,Basecost =5, FirstItem =6, NextItem =3 ) 
    Total: '$225', //Total = quantity * price (Total= 3*9=$27)
    Costs: '', // TH Quantity = 1(n) -> Costs = Basecost + FirstItem (Costs= 5+1=11)
    Costs1: '69$', // TH Quantity = n+1 -> Costs = (Basecost*Quantity) + FirstItem + (NextItem*(n+1)) (Costs = (5*3) + 6 + (2*2) = 25$)

    //  Store - Data Create a new customer
    // FirstName: 'Caroline',
    // LastName: 'Brewster',
    // Email: 'Brewster@gmail.com',
    // Country: 'US', //United States
    // Address: '6655 Jackson Rd',
    // City: 'Ann Arbor',
    // ZIPcode: '48103',
    // Phone: '+1 734 276 3022',

    /**
        * Case 2: Data function Mark as fulfill
    */

    // Admin - Data SKU
    SKUname1: 'Mã SKU THF-B14',
    Basecost1: '8',
    FirstItem1: '6',
    NextItem1: '6',
    Skucode1: 'THF-B14',
    // Admin - Data Product 
    TitleName1: 'A Product Order Mark as fulfill lần 2 0310 Tshirt 2D',
    Price1: '45',
    // Store - Data create order 
    Quantity1: '1',
    // Admin - Check hiển thị Total - Costs  
    Total1: '$45',

    /**
        * Case 3: Data function Sync status
    */

    // Admin - Data SKU
    SKUname2: 'Mã SKU THS-L9',
    Basecost2: '7',
    FirstItem2: '5',
    NextItem2: '5',
    Skucode2: 'THS-L9',
    // Admin - Data Product 
    TitleName2: 'A Product Order Sync status lần 4 0410 Tshirt 2D',
    Price2: "40",
    // Store - Data create order 
    Quantity2: "3",
    // Admin - Check hiển thị Total - Costs 
    Total2: '$120',
    Costs2: '36$',

    RequestAt: '16:24 27/09/',

    /**
        * Case 4: Data function Re-Fulfillment
    */

    // Admin - Data SKU
    SKUname3: 'Mã SKU THS-H24',
    Basecost3: '8',
    FirstItem3: '5',
    NextItem3: '5',
    Skucode3: 'THS-H24',
    // Admin - Data Product 
    TitleName3: 'A Product Re Fulfillment lần 7 0410 Tshirt 2D',
    Price3: '67',
    // Store - Data create order 
    Quantity3: '1',
    // Admin - Check hiển thị Total - Costs 
    Total3: '$67',
    Costs3: '13$',
    // Update data không hợp lệ 
    PhoneFalse: '+17342763022ab',
    ZipFalse: '48103123',
    // Update data  hợp lệ 
    PhoneTrue: '+17342763022',
    ZipTrue: '48103',

}


