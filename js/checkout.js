const orderItems =
  JSON.parse(localStorage.getItem("checkoutItems")) ||
  JSON.parse(localStorage.getItem("cartItems")) ||
  [];

const orderList = document.getElementById("order-items");
let total = 0;

orderItems.forEach((item) => {
  const price =
    typeof item.price === "string"
      ? parseInt(item.price.replace(/[^\d]/g, ""))
      : item.price;
  const quantity = Number(item.quantity) || 1;
  const img = item.image || item.img || "";

  const li = document.createElement("li");
  li.innerHTML = `
      <img src="${img}" alt="${item.title}">
      <div class="order-item-info">
        <div>${item.title}</div>
        <div>Số lượng: ${quantity}</div>
      </div>
      <div class="order-item-price">
        ${(price * quantity).toLocaleString("de-DE")}₫
      </div>
    `;
  orderList.appendChild(li);

  total += price * quantity;
});

document.getElementById("order-total").textContent =
  total.toLocaleString("de-DE") + "₫";

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

let selected = null;
let qrContent = "";
document.querySelectorAll(".bank, .ewallet").forEach((el) => {
  el.addEventListener("click", function () {
    document
      .querySelectorAll(".bank, .ewallet")
      .forEach((e) => e.classList.remove("selected"));
    this.classList.add("selected");
    selected = this;

    document.getElementById("qr-section").style.display = "block";
    document.getElementById("qr-img").src = "img/bank/qrcode.jpg";

    qrContent = randomString(9);
    document.getElementById("qr-content").textContent =
      "Nội dung chuyển khoản: " + qrContent;
  });
});

document.getElementById("pay-btn").addEventListener("click", function () {
  if (!selected) {
    alert("Vui lòng chọn phương thức thanh toán!");
    return;
  }

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!fullname || !phone || !email || !address) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng!");
    return;
  }

  document.getElementById("thankyou-banner").style.display = "flex";
  localStorage.removeItem("cartItems");
  localStorage.removeItem("checkoutItems");
});
