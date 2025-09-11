document.addEventListener("DOMContentLoaded", () => {
  // Đợi cái web load xong, không lại đổ lỗi cho dev

  const cartItemsContainer = document.getElementById("cart-items"); // cái máng nhốt hàng
  const cartTotalElement = document.getElementById("cart-total"); // cái bảng nợ
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // lấy từ localStorage, còn trống thì thôi nghèo cũng đừng mua

  const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = ""; // reset, dọn cứt cũ đi
    let cartTotal = 0; // tổng tiền, chuẩn bị rút máu khách

    cartItems.forEach((item, index) => {
      const price =
        typeof item.price === "string"
          ? parseInt(item.price.replace(/[^\d]/g, "")) // lọc ra số, chứ chữ thì ăn được à?
          : item.price;
      const itemTotal = price * item.quantity; // nhẩm toán lớp 1
      cartTotal += itemTotal; // góp gạch xây biệt thự cho shop

      const row = document.createElement("tr");
      row.innerHTML = `
              <td><img src="${item.img || item.image || ""}" alt="${
        item.title
      }" class="cart-item-image" width="80"></td> <!-- Ảnh cho đỡ xấu -->
              <td>${item.title}</td> <!-- Tên hàng, có gì hot đâu -->
              <td>${
                price ? price.toLocaleString("de-DE") : 0
              }₫</td> <!-- Giá, khỏi mặc cả -->
              <td><input type="number" value="${
                item.quantity
              }" data-index="${index}" class="item-quantity" min="1"></td> <!-- chỉnh số lượng, nghịch ngu thì tự chịu -->
              <td>${
                itemTotal ? itemTotal.toLocaleString("de-DE") : 0
              }₫</td> <!-- tiền nhiều vãi -->
              <td><button class="remove-item" data-index="${index}">Xóa</button></td> <!-- lỡ nghèo thì bấm -->
            `;
      cartItemsContainer.appendChild(row); // tống nó vào bảng
    });

    cartTotalElement.innerText = cartTotal
      ? cartTotal.toLocaleString("de-DE")
      : 0; // tổng tiền, nhìn mà khóc 😭
  };

  cartItemsContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("item-quantity")) {
      const index = event.target.dataset.index;
      cartItems[index].quantity = parseInt(event.target.value) || 1;
      // nhập số bậy bạ tao auto sửa, khỏi cãi
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay(); // update lại cho đỡ lòi cái ngu
    }
  });

  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      const index = event.target.dataset.index;
      cartItems.splice(index, 1); // bye món hàng, chắc hết tiền hả 😏
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay(); // vẽ lại, giỏ trống nhìn tội vl
    }
  });

  updateCartDisplay(); // chạy phát đầu cho khách biết mình nghèo
});

function goToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartItems.length === 0) {
    alert("Giỏ hàng trống, nghèo thì đi ngủ đi 🤡");
    // rảnh rang bấm checkout làm chi
    return;
  }
  localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
  window.location.href = "../checkout.html"; // bay qua trang thanh toán, móc ví lẹ
}
