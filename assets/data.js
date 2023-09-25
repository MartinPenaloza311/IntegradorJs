const productsData = [
    {
        id: 1,
        name: "Proteina STAR 2LS",
        bid: 7000,
        category: "Proteinas",
        cardImg: "./assets/img/products/proteinastar.png"
    },
    {
        id: 2,
        name: "Proteina STAR 3kg",
        bid: 15000,
        category: "Proteinas",
        cardImg: "./assets/img/products/proteinastar3kg.png"
    },
    {
        id: 3,
        name: "Proteina ENA 2LS",
        bid: 6400,
        category: "Proteinas",
        cardImg: "./assets/img/products/proteinaena.png"
    },
    {
        id: 4,
        name: "Proteina ENA 3kg",
        bid: 7000,
        category: "Proteinas",
        cardImg: "./assets/img/products/proteina3kg.png"
    },
    {
        id: 5,
        name: "Creatina Monohydrated STAR 300gr",
        bid: 12000,
        category: "Creatinas",
        cardImg: "./assets/img/products/creatina.png"
    },
    {
        id: 6,
        name: "Creatina Monohydrated STAR 1000gr",
        bid: 20000,
        category: "Creatinas",
        cardImg: "./assets/img/products/creatina1000grs.png"
    },
    {
        id: 7,
        name: "Creatina Monohydrated ENA 300gr",
        bid: 7000,
        category: "Creatinas",
        cardImg: "./assets/img/products/creatinaENA300gr.png"
    },
    {
        id: 8,
        name: "Creatina Growth 300gr",
        bid: 7000,
        category: "Creatinas",
        cardImg: "./assets/img/products/creatinaGrowth.png"
    },
    {
        id: 9,
        name: "Mutant Mass Star 1500gr",
        bid: 15000,
        category: "Mass Mutant",
        cardImg: "./assets/img/products/mutantmassstar.png"
    },
    {
        id: 10,
        name: "Mutant Mass ENA 1500gr",
        bid: 14000,
        category: "Mass Mutant",
        cardImg: "./assets/img/products/mutantmassena.png"
    },
    {
        id: 11,
        name: "Mutant Mass ENA 3kg",
        bid: 23000,
        category: "Mass Mutant",
        cardImg: "./assets/img/products/mutantmassena3kg.png"
    },
    {
        id: 12,
        name: "Pre-Entreno Pump v8 Star 285gr",
        bid: 6000,
        category: "Pre-Entrenos",
        cardImg: "./assets/img/products/preentrenov8.png"
    },
    {
        id: 13,
        name: "Pre-Entreno Pre WAR ENA 400gr",
        bid: 12000,
        category: "Pre-Entrenos",
        cardImg: "./assets/img/products/preentrenwarEna.png"
    },
    {
        id: 14,
        name: "Pre-Entreno Nutrilab",
        bid: 5000,
        category: "Pre-Entrenos",
        cardImg: "./assets/img/products/preentrenonutrilab.png"
    },
    {
        id: 15,
        name: "Pre-Entreno C4 380gr",
        bid: 8000,
        category: "Pre-Entrenos",
        cardImg: "./assets/img/products/prenetrenoc4.png"
    },
    
];

    
    // //función para dividir los productos en arrays de "size" productos
    const divideProductsInParts = (size) => {
        let productsList = [];
        for (let i = 0; i < productsData.length; i += size)
        productsList.push(productsData.slice(i, i + size))
        return productsList;
    };
    
    // el concepto de ESTADO
        const appState = {
        products: divideProductsInParts(6), 
        currentProductsIndex: 0, 
        productsLimit: divideProductsInParts(6).length,
        activeFilter: null
        };