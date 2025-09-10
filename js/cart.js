document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutButton = document.querySelector(".checkout");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = "";
    let cartTotal = 0;

    cartItems.forEach((item, index) => {
      const itemTotal =
        parseFloat(item.price.replace(/[^0-9-]+/g, "")) * item.quantity;
      cartTotal += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
                <link rel="stylesheet" href="../../css/style.css" />
 
                <td><img src="${item.image}" alt="${
        item.title
      }" class="cart-item-image"></td>
                <td class="cart-item-title">${item.title}</td>
                <td class="cart-item-price">${item.price}</td>
                <td>
                    <input type="number" value="${
                      item.quantity
                    }" data-index="${index}" class="item-quantity cart-item-quantity">
                </td>
                <td class="cart-item-total">${itemTotal.toLocaleString(
                  "de-DE",
                  { minimumFractionDigits: 0 }
                )}₫</td>
                <td><button class="remove-item cart-remove-button" data-index="${index}">Xóa</button></td>
            `;
      cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = cartTotal.toLocaleString("de-DE", {
      minimumFractionDigits: 0,
    });
  };

  cartItemsContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("item-quantity")) {
      const index = event.target.getAttribute("data-index");
      const newQuantity = event.target.value;

      cartItems[index].quantity = parseInt(newQuantity);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay();
    }
  });

  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      const index = event.target.getAttribute("data-index");

      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay();
    }
  });

  checkoutButton.addEventListener("click", () => {
    alert(
      "Thanh toán thành công! LAPTOP Oách Xà Lách Cảm Ơn Bạn Đã Tin Tưởng Mãi Iu "
    );
    localStorage.removeItem("cartItems");
    cartItems = [];

    updateCartDisplay();
  });
  updateCartDisplay();
});
