const newProducts = document.querySelector(".new-products"); // Khu trưng bày hàng mới, chém giá ngất ngưởng
const hotProducts = document.querySelector(".hot-products"); // Hàng hot, hot thật hay hot ảo thì hên xui
const asusProducts = document.querySelector(".asus-products"); // Khu ổ chuột dành cho Asus
const asusProducts2 = document.querySelector(".asus-products2"); // Asus loại 2, hàng lướt có vết cắn
const acerProducts = document.querySelector(".acer-products"); // Acer – dành cho dân thích đập bàn phím
const hpProducts = document.querySelector(".HP-products"); // HP – viết hoa cho sang chứ chả ai mua
const lgProducts = document.querySelector(".LG-products"); // LG – Laptop Gì?
const msiProducts = document.querySelector(".MSI-products"); // MSI – Máy Sập Im

// Danh sách sản phẩm – nhìn số tiền mà thấy nghẹn họng
const products = [
  { id: 1, name: "ASUS ROG Zephyrus...", price: "34.600.000đ", type: "asus" },
  // ... (cả đống hàng giá trên trời, khách nghèo đọc xong auto out)
];

// Banner xoay ảnh – quảng cáo ảo lòi
let currentImageIndex = 0;
const images = document.querySelectorAll(".banner-image");

function showImage(index) {
  // Tắt hết ảnh đi, show mỗi ảnh cần – giống như chọn bồ chính trong 5 người yêu
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  images[index].style.display = "block"; // bật spotlight
}

function nextImage() {
  // quay banner như lật mặt bạn bè
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

setInterval(nextImage, 3000); // 3 giây đổi 1 ảnh, không kịp ngắm thì ráng chịu

// Hàng mới – thực ra toàn hàng xả kho
products.forEach((product, index) => {
  if (index >= 26) {
    newProducts
      ? (newProducts.innerHTML += `
        <li class="new-product">
            <a href="products/NewProducts/product${product.id}.html">
                <div class="product-img">
                    <img src="img/product/${index + 1}.jpg" alt="" />
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                </div>
            </a>
        </li>
    `)
      : ""; // nếu không có thẻ new-products thì thôi, khỏi bày
  }
});

// Hàng hot – hot trên giấy, mua về nguội lạnh
products.forEach((product, index) => {
  if (index > 9 && index < 20) {
    hotProducts
      ? (hotProducts.innerHTML += `
      <li class="product">
        <a href="products/HotProducts/product${product.id}.html">
          <div class="product-img">
              <img src="img/product/${index + 1}.jpg" alt="" />
          </div>
          <div class="product-info">
              <h3>${product.name}</h3>
              <p>${product.price}</p>
          </div>
        </a>
      </li>
      `)
      : "";
  }
});

// Asus – mua về thì nhớ mua thêm quạt công nghiệp
products.forEach((product, index) => {
  if (index <= 30 && product.type === "asus") {
    asusProducts
      ? (asusProducts.innerHTML += `
      <li class="product">
      <a href="products/asus/product${product.id}.html">
        <div class="product-img">
            <img src="img/product/${index + 1}.jpg" alt="" />
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </div>
      </a>
    </li>
    `)
      : "";
  }
});

// Acer – dành cho mấy ông thích mua về test độ bền bằng cách đập
products.forEach((product, index) => {
  if (index <= 24 && product.type === "acer") {
    acerProducts
      ? (acerProducts.innerHTML += `
      <li class="product">
      <a href="products/acer/product${product.id}.html">
        <div class="product-img">
            <img src="img/product/${index + 1}.jpg" alt="" />
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </div>
      </a>
    </li>
    `)
      : "";
  }
});

// HP – ai mua thì chuẩn bị tinh thần bị crash win
products.forEach((product, index) => {
  if (index <= 25 && product.type === "HP") {
    hpProducts
      ? (hpProducts.innerHTML += `
      <li class="product">
      <a href="products/HP/product${product.id}.html">
        <div class="product-img">
            <img src="img/product/${index + 1}.jpg" alt="" />
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </div>
      </a>
    </li>
    `)
      : "";
  }
});

// LG – mua laptop mà nhìn tên tưởng tivi
products.forEach((product, index) => {
  if (index <= 25 && product.type === "LG") {
    lgProducts
      ? (lgProducts.innerHTML += `
      <li class="product">
      <a href="products/LG/product${product.id}.html">
        <div class="product-img">
            <img src="img/product/${index + 1}.jpg" alt="" />
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </div>
      </a>
    </li>
    `)
      : "";
  }
});

// MSI – viết tắt của "Máy Sập Im"
products.forEach((product, index) => {
  if (index <= 26 && product.type === "MSI") {
    msiProducts
      ? (msiProducts.innerHTML += `
      <li class="product">
      <a href="products/MSI/product${product.id}.html">
        <div class="product-img">
            <img src="img/product/${index + 1}.jpg" alt="" />
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        </div>
      </a>
    </li>
    `)
      : "";
  }
});

// Đổi ảnh nhỏ -> ảnh to, cho khách zoom kỹ rồi vẫn không mua
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    const imageSrc = this.src;
    const mainImage = document.querySelector(".main-image");
    mainImage.src = imageSrc; // thay đổi ảnh chính
  });
});
const mainImage = document.querySelector(".main-image");
const fullscreenImageContainer = document.querySelector(
  ".fullscreen-image-container"
);
const fullscreenImage = document.querySelector(".fullscreen-image");
const closeBtn = document.querySelector(".close-btn");
mainImage.addEventListener("click", function () {
  fullscreenImage.src = this.src; // mở fullscreen – choáng vl
  fullscreenImageContainer.style.display = "flex";
});
closeBtn.addEventListener("click", function () {
  fullscreenImageContainer.style.display = "none"; // tắt, hết hứng
});

// Pop-up – kiểu popup spam làm khách phát cáu
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector(".add-to-cart");

  addToCartButton.addEventListener("click", () => {
    const product = {
      title: document.querySelector(".product-title").innerText,
      price: document
        .querySelector(".product-price")
        .innerText.replace("Giá: ", ""),
      image: document.querySelector(".main-image").getAttribute("src"),
      quantity: 1,
    };
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProductIndex = cartItems.findIndex(
      (item) => item.title === product.title
    );
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1; // thêm nữa, cho nghèo thêm
    } else {
      cartItems.push(product); // chưa có thì quăng vào giỏ
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    document.getElementById("popupContainer").style.display = "block";
    document.querySelector(".popup-content").textContent =
      "Thêm hàng rồi đó, đừng khóc khi nhìn số dư nhé 😏";
  });
});

// Nút checkout – nhấn vô cho vui, chưa chắc đã mua
document.querySelector(".checkout").addEventListener("click", function () {
  document.getElementById("popupContainer").style.display = "block";
  document.querySelector(".popup-content").textContent =
    "Chuẩn bị bị móc ví nhé 🤡";
});

// Review – khách bấm đánh giá xong, shop vứt thẳng thùng rác
document
  .querySelector(".submit-review-button")
  .addEventListener("click", function () {
    document.getElementById("popupContainer").style.display = "block";
    document.querySelector(".popup-content").textContent =
      "Ok đã ghi nhận, chứ đọc làm gì, bán vẫn bán 🤣";
  });

function closePopup() {
  document.getElementById("popupContainer").style.display = "none";
}

// Nút scroll to top – dành cho mấy ông lười kéo chuột
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Nếu cuộn xuống thì hiện nút, còn lười thì khỏi
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  // Bấm phát lên đầu trang, đỡ mỏi tay
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
