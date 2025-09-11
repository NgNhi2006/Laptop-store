const orderItems =
  JSON.parse(localStorage.getItem("checkoutItems")) || // lấy hàng từ checkout
  JSON.parse(localStorage.getItem("cartItems")) || // nếu chưa checkout thì lấy giỏ hàng
  []; // nếu không có gì -> ăn mì gói

const orderList = document.getElementById("order-items"); // nơi trưng bày hàng hóa
let total = 0; // ví của khách (tạm thời vẫn đầy)

orderItems.forEach((item) => {
  const price =
    typeof item.price === "string"
      ? parseInt(item.price.replace(/[^\d]/g, "")) // bóc vỏ tiền cho sạch số
      : item.price; // nếu đã là số rồi thì khỏi tắm
  const quantity = Number(item.quantity) || 1; // nếu quên nhập số lượng thì auto 1
  const img = item.image || item.img || ""; // fallback ảnh phòng khi shop lười

  const li = document.createElement("li"); // tạo dòng hóa đơn
  li.innerHTML = `
      <img src="${img}" alt="${item.title}">
      <div class="order-item-info">
        <div>${item.title}</div>
        <div>Số lượng: ${quantity}</div>
      </div>
      <div class="order-item-price">
        ${(price * quantity).toLocaleString("de-DE")}₫
      </div>
    `; // nhìn phát biết ngay phá ví
  orderList.appendChild(li); // gắn vào danh sách

  total += price * quantity; // ví khách bắt đầu khóc
});

document.getElementById("order-total").textContent =
  total.toLocaleString("de-DE") + "₫"; // báo cáo tổng thiệt hại

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // tập đoàn ký tự
  return Array.from(
    { length },
    () => chars.charAt(Math.floor(Math.random() * chars.length)) // quay random như xổ số
  ).join("");
}

let selected = null; // chờ xem chọn ngân hàng nào
let qrContent = ""; // nội dung CK
document.querySelectorAll(".bank, .ewallet").forEach((el) => {
  el.addEventListener("click", function () {
    document
      .querySelectorAll(".bank, .ewallet")
      .forEach((e) => e.classList.remove("selected")); // ai cũng muốn được chọn nhưng chỉ 1
    this.classList.add("selected"); // chọn duy nhất

    document.getElementById("qr-section").style.display = "block"; // hiện QR lên
    document.getElementById("qr-img").src = "img/bank/qrcode.jpg"; // QR dùng chung như wifi chùa

    qrContent = randomString(9); // random nội dung chuyển khoản
    document.getElementById("qr-content").textContent =
      "Nội dung chuyển khoản: " + qrContent; // nhắc khách: nhớ ghi cái này, ko là lost order
  });
});

document.getElementById("pay-btn").addEventListener("click", function () {
  if (!selected) {
    alert("Vui lòng chọn phương thức thanh toán!"); // chưa chọn bank mà đòi trả tiền? không nha
    return;
  }

  const fullname = document.getElementById("fullname").value.trim(); // tên khách
  const phone = document.getElementById("phone").value.trim(); // số liên hệ
  const email = document.getElementById("email").value.trim(); // chỗ để spam
  const address = document.getElementById("address").value.trim(); // nơi ship hàng

  if (!fullname || !phone || !email || !address) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng!"); // không nhập đủ thì ai ship cho?
    return;
  }

  document.getElementById("thankyou-banner").style.display = "flex"; // bắn pháo hoa cảm ơn
  localStorage.removeItem("cartItems"); // dọn giỏ
  localStorage.removeItem("checkoutItems"); // dọn checkout -> sạch sẽ
});
