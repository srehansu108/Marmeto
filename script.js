const API_URL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

const fetchCartItems = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const item = data.items[0]; // Get the first item
        const pricePerItem = item.presentment_price; // Price per item

        // Get the cart items tbody
        const cartItemsContainer = document.getElementById("cart-items");

        // Clear existing content
        cartItemsContainer.innerHTML = "";

        // Create table row
        const row = document.createElement("tr");

        row.innerHTML = `
            <td style="text-align: left;">
                <img src="${item.image}" alt="${item.title}">
            </td>
            <td style="color:#9F9F9F;">${item.title}</td>
            <td style="color:#9F9F9F;">Rs ${pricePerItem.toFixed(2)}</td>
            <td>
                <input 
                    type="text" 
                    value="1" 
                    id="quantity-input" 
                    style="width: 50px; text-align: center;" 
                    oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                />
            </td>
            <td id="subtotal-cell">Rs ${pricePerItem.toFixed(2)}</td>
            <td>
                <img src="delete.png" alt="Delete" class="delete-icon" style="cursor: pointer;">
            </td>
        `;

        cartItemsContainer.appendChild(row);

        // Add event listener to quantity input
        const quantityInput = document.getElementById("quantity-input");
        const subtotalCell = document.getElementById("subtotal-cell");

        quantityInput.addEventListener("input", () => {
            const quantity = parseInt(quantityInput.value, 10) || 1; // Default to 1 if invalid input
            const newSubtotal = pricePerItem * quantity;

            // Update subtotal cell
            subtotalCell.innerText = `Rs ${newSubtotal.toFixed(2)}`;

            // Update total in the "Cart Totals" section
            document.querySelector(".Subtotal span").innerText = `Rs ${newSubtotal.toFixed(2)}`;
            document.querySelector(".Total span").innerText = `Rs ${newSubtotal.toFixed(2)}`;
        });
    } catch (error) {
        console.error("Failed to fetch cart items:", error);
    }
};

// Fetch items on page load
window.onload = fetchCartItems;
