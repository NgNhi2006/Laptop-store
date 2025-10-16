document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = "";
    let cartTotal = 0;

    cartItems.forEach((item, index) => {
      const price =
        typeof item.price === "string"
          ? parseInt(item.price.replace(/[^\d]/g, ""))
          : item.price;
      const itemTotal = price * item.quantity;
      cartTotal += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
              <td><img src="${item.img || item.image || ""}" alt="${
        item.title
      }" class="cart-item-image" width="80"></td>
              <td>${item.title}</td>
              <td>${price ? price.toLocaleString("de-DE") : 0}₫</td>
              <td><input type="number" value="${
                item.quantity
              }" data-index="${index}" class="item-quantity" min="1"></td>
              <td>${itemTotal ? itemTotal.toLocaleString("de-DE") : 0}₫</td>
              <td><button class="remove-item" data-index="${index}">Xóa</button></td>
            `;
      cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = cartTotal
      ? cartTotal.toLocaleString("de-DE")
      : 0;
  };

  cartItemsContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("item-quantity")) {
      const index = event.target.dataset.index;
      cartItems[index].quantity = parseInt(event.target.value) || 1;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay();
    }
  });

  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      const index = event.target.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay();
    }
  });

  updateCartDisplay();
});

function goToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartItems.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
  window.location.href = "../checkout.html";
}
