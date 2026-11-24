// GET HTML ELEMENTS
const form = document.getElementById("product-form");
const result = document.getElementById("result");
result.textContent = "Welcome! Select a product and calculate its recommended giveaway date. Your results will appear here.";
const productList = document.getElementById("product-list");

const clearButton = document.getElementById("clear-list");
const csvButton = document.getElementById("download-csv");
const pdfButton = document.getElementById("download-pdf");
const productInput = document.getElementById("product");
const productOptions = document.getElementById("product-options");
const customProductForm = document.getElementById("custom-product-form");
const customProductName = document.getElementById("custom-product-name");
const customStorageDays = document.getElementById("custom-storage-days");
const customQuantity = document.getElementById("custom-quantity");
const customArrivalDate = document.getElementById("custom-arrival-date");


// FRESHDATE FOOD DATABASE
// Storage estimates are preliminary planning references.
// They are not food-safety deadlines.

const foodDatabase = {

    vegetables: [
        { name: "Broccoli", storageDays: 3 },
        { name: "Carrots", storageDays: 21 },
        { name: "Cauliflower", storageDays: 3 },
        { name: "Celery", storageDays: 14 },
        { name: "Cucumber", storageDays: 4 },
        { name: "Green Beans", storageDays: 5 },
        { name: "Lettuce", storageDays: 5 },
        { name: "Mushrooms", storageDays: 3 },
        { name: "Spinach", storageDays: 5 },
        { name: "Zucchini", storageDays: 4 },
        { name: "Bell Peppers", storageDays: 7 },
        { name: "Cabbage", storageDays: 7 },
        { name: "Asparagus", storageDays: 3 },
        { name: "Brussels Sprouts", storageDays: 5 },
        { name: "Corn", storageDays: 3 },
        { name: "Eggplant", storageDays: 5 },
        { name: "Kale", storageDays: 5 },
        { name: "Radishes", storageDays: 7 },
        { name: "Beets", storageDays: 7 },
        { name: "Green Onions", storageDays: 7 },
        { name: "Tomatoes", storageDays: 3 },
        { name: "Peas", storageDays: 3 },
        { name: "Turnips", storageDays: 7 },
        { name: "Artichokes", storageDays: 5 },
        { name: "Bok Choy", storageDays: 3 }
    ],

    fruits: [
        { name: "Apples", storageDays: 28 },
        { name: "Bananas", storageDays: 3 },
        { name: "Blueberries", storageDays: 7 },
        { name: "Strawberries", storageDays: 3 },
        { name: "Raspberries", storageDays: 2 },
        { name: "Blackberries", storageDays: 3 },
        { name: "Grapes", storageDays: 7 },
        { name: "Oranges", storageDays: 21 },
        { name: "Lemons", storageDays: 21 },
        { name: "Limes", storageDays: 21 },
        { name: "Pears", storageDays: 5 },
        { name: "Peaches", storageDays: 3 },
        { name: "Nectarines", storageDays: 3 },
        { name: "Plums", storageDays: 5 },
        { name: "Cherries", storageDays: 5 },
        { name: "Pineapple", storageDays: 3 },
        { name: "Watermelon", storageDays: 7 },
        { name: "Cantaloupe", storageDays: 5 },
        { name: "Mango", storageDays: 5 },
        { name: "Papaya", storageDays: 3 },
        { name: "Kiwi", storageDays: 14 },
        { name: "Avocado", storageDays: 3 },
        { name: "Grapefruit", storageDays: 14 },
        { name: "Pomegranate", storageDays: 14 },
        { name: "Clementines", storageDays: 14 }
    ],

    chicken: [
        { name: "Raw Whole Chicken", storageDays: 1 },
        { name: "Raw Chicken Breast", storageDays: 1 },
        { name: "Raw Chicken Thighs", storageDays: 1 }
    ],

    beef: [
        { name: "Ground Beef", storageDays: 1 },
        { name: "Beef Steak", storageDays: 3 },
        { name: "Beef Roast", storageDays: 3 },
        { name: "Beef Stew Meat", storageDays: 1 }
    ],

    milk: [
        { name: "Whole Milk", storageDays: 5 },
        { name: "Skim Milk", storageDays: 5 },
        { name: "Lactose-Free Milk", storageDays: 5 }
    ],

    cheese: [
        { name: "Cheddar Cheese", storageDays: 7 },
        { name: "Mozzarella", storageDays: 7 },
        { name: "Cream Cheese", storageDays: 7 },
        { name: "Parmesan", storageDays: 14 }
    ],

    eggs: [
        { name: "Fresh Shell Eggs", storageDays: 21 },
        { name: "Hard-Boiled Eggs", storageDays: 7 }
    ],

    rice: [
        { name: "Uncooked White Rice", storageDays: 365 },
        { name: "Uncooked Brown Rice", storageDays: 90 }
    ],

    bread: [
        { name: "White Bread", storageDays: 5 },
        { name: "Whole Wheat Bread", storageDays: 5 },
        { name: "Sourdough Bread", storageDays: 5 }
    ]

};

// AUTOCOMPLETE PRODUCT SEARCH

const categoryProducts = {
    produce: [
        ...foodDatabase.vegetables,
        ...foodDatabase.fruits
    ],

    poultry: foodDatabase.chicken,

    meat: foodDatabase.beef,

    milk: foodDatabase.milk,

    cheese: foodDatabase.cheese,

    eggs: foodDatabase.eggs,

    rice: foodDatabase.rice,

    bread: foodDatabase.bread
};

function updateProductOptions() {

    const selectedCategory = document.getElementById("category").value;

    const products = categoryProducts[selectedCategory] || [];

    productOptions.innerHTML = "";
    productInput.value = "";

    products.forEach(function(item) {

        const option = document.createElement("option");

        option.value = item.name;

        productOptions.appendChild(option);

    });
}

productInput.addEventListener("input", function() {

    const selectedCategory = document.getElementById("category").value;
    const products = categoryProducts[selectedCategory] || [];

    const searchText = productInput.value.toLowerCase();

    productOptions.innerHTML = "";

    const matchingProducts = products.filter(function(item) {
        return item.name.toLowerCase().startsWith(searchText);
    });

    matchingProducts.forEach(function(item) {

        const option = document.createElement("option");

        option.value = item.name;

        productOptions.appendChild(option);

    });

});

// UPDATE PRODUCTS WHEN CATEGORY CHANGES
document.getElementById("category").addEventListener("change", updateProductOptions);

// STORE PRODUCTS
let products = [];
let currentProduct = null;

// CALCULATE GIVEAWAY DATE
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const product = productInput.value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const startingDate = document.getElementById("starting-date").value;

    if (!category || !product || !quantity || !startingDate) {
        result.textContent = "Please enter valid information.";
        return;
    }

    // FIND PRODUCT IN DATABASE
    const selectedProduct = Object.values(foodDatabase)
        .flat()
        .find(item => item.name.toLowerCase() === product.toLowerCase());

    if (!selectedProduct) {
        result.textContent = "Product not found in database.";
        return;
    }

    // CALCULATE GIVEAWAY DATE
    const giveawayDate = new Date(startingDate + "T12:00:00");

    giveawayDate.setDate(
        giveawayDate.getDate() + selectedProduct.storageDays - 1
    );

    const formattedDate = giveawayDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    currentProduct = {
        category: category,
        product: product,
        quantity: quantity,
        arrivalDate: new Date(startingDate + "T12:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric" }),
        storageDays: selectedProduct.storageDays,
        giveawayDate: giveawayDate.toISOString().slice(0, 10),
        formattedDate: formattedDate
    };

    result.textContent = `Suggested giveaway date: ${formattedDate}`;

    const oldButton = document.getElementById("add-product");

    if (oldButton) {
        oldButton.remove();
    }

    const addButton = document.createElement("button");
    addButton.id = "add-product";
    addButton.type = "button";
    addButton.textContent = "Add to List";

    result.appendChild(document.createElement("br"));
    result.appendChild(addButton);

    addButton.addEventListener("click", addProduct);
});

// CUSTOM PRODUCT FORM
customProductForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = customProductName.value.trim();
    const quantity = customQuantity.value.trim();
    const arrivalDate = customArrivalDate.value;
    const storageDays = Number(customStorageDays.value);

    if (!name || !quantity || !arrivalDate ||
        !Number.isInteger(storageDays) || storageDays < 1) {
        alert("Please complete all fields correctly.");
        return;
    }

    // FORMAT ARRIVAL DATE
    const formattedArrivalDate = new Date(arrivalDate + "T12:00:00")
        .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });

    // CALCULATE GIVEAWAY DATE
    const giveawayDate = new Date(arrivalDate + "T12:00:00");

    giveawayDate.setDate(
        giveawayDate.getDate() + storageDays - 1
    );

    // FORMAT GIVEAWAY DATE
    const formattedDate = giveawayDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    // CREATE CUSTOM PRODUCT
    const customProduct = {
        category: "custom",
        product: name,
        quantity: quantity,
        arrivalDate: formattedArrivalDate,
        storageDays: storageDays,
        giveawayDate: giveawayDate.toISOString().slice(0, 10),
        formattedDate: formattedDate
    };

    products.push(customProduct);

    displayProducts();

    customProductForm.reset();
});
// ADD PRODUCT TO LIST
function addProduct() {
    if (!currentProduct) return;

    products.push(currentProduct);
    products.sort((a, b) =>
        a.giveawayDate.localeCompare(b.giveawayDate)
    );

    displayProducts();

    currentProduct = null;
    result.textContent = "Product added to your giveaway list.";
}

// DISPLAY PRODUCTS
// DISPLAY PRODUCTS
function displayProducts() {
    productList.innerHTML = "";

    products.forEach(function(item, index) {
        const row = document.createElement("tr");

        const values = [
            item.product,
            item.quantity,
            item.arrivalDate,
            item.storageDays,
            item.formattedDate
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // CREATE REMOVE BUTTON
        const removeCell = document.createElement("td");
        removeCell.className = "action-column";
        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.className = "remove-product";
        removeButton.dataset.index = index;

        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        productList.appendChild(row);
    });
}

// REMOVE INDIVIDUAL PRODUCT
productList.addEventListener("click", function(event) {

    if (event.target.classList.contains("remove-product")) {

        const index = Number(event.target.dataset.index);

        products.splice(index, 1);

        displayProducts();
    }

});

// CLEAR LIST
clearButton.addEventListener("click", function() {
    products = [];
    displayProducts();
    result.textContent = "Giveaway list cleared.";
});

// DOWNLOAD CSV
csvButton.addEventListener("click", function() {
    if (products.length === 0) {
        alert("Your giveaway list is empty.");
        return;
    }

    const rows = [
        ["Category", "Product", "Quantity","Arrival Date","Storage Days", "Suggested Giveaway Date"],
        ...products.map(item => [
            item.category,
            item.product,
            item.quantity,
            item.arrivalDate,
            item.storageDays,
            item.formattedDate
        ])
    ];

    const csvContent = rows.map(row =>
        row.map(value =>
            `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
    ).join("\r\n");

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "freshdate-giveaway-list.csv";
    link.click();

    URL.revokeObjectURL(link.href);
});

// DOWNLOAD PDF
pdfButton.addEventListener("click", function() {

    if (products.length === 0) {
        alert("Your giveaway list is empty.");
        return;
    }

    window.print();

});