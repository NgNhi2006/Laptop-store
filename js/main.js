/*
========================================
JAVASCRIPT CHÍNH - MAIN.JS
========================================
Mục đích: Xử lý tất cả tương tác và logic chính của website
Cách hoạt động: Chạy khi DOM đã load xong (DOMContentLoaded)
Chức năng chính:
- Banner slider tự động
- Load và hiển thị sản phẩm
- Xử lý tìm kiếm
- Quản lý giỏ hàng
- Xử lý sự kiện click
*/

// Chờ DOM load xong rồi mới chạy JavaScript
document.addEventListener("DOMContentLoaded", () => {
  
  /* 
  ========================================
  BANNER SLIDER - TRƯỢT BANNER TỰ ĐỘNG
  ========================================
  Mục đích: Tạo hiệu ứng trượt banner tự động trên trang chủ
  Cách hoạt động: 
  - Lấy tất cả hình ảnh banner
  - Hiển thị từng hình theo thứ tự
  - Tự động chuyển hình sau 3 giây
  */
  let currentImageIndex = 0;                    // Chỉ số hình ảnh hiện tại
  const images = document.querySelectorAll(".banner-image"); // Lấy tất cả hình banner

  // Hàm hiển thị hình ảnh theo chỉ số
  function showImage(index) {
    images.forEach((img, i) => {
      // Chỉ hiển thị hình có chỉ số trùng khớp, ẩn các hình khác
      img.style.display = i === index ? "block" : "none";
    });
  }

  // Hàm chuyển sang hình tiếp theo
  function nextImage() {
    // Tăng chỉ số lên 1, nếu vượt quá thì quay về 0 (vòng lặp)
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex); // Hiển thị hình mới
  }

  // Nếu có hình ảnh thì bắt đầu slider tự động
  if (images.length > 0) {
    setInterval(nextImage, 3000); // Chuyển hình mỗi 3 giây
  }

  /* 
  ========================================
  LOAD SẢN PHẨM TỪ JSON
  ========================================
  Mục đích: Tải dữ liệu sản phẩm từ file JSON và hiển thị lên trang
  Cách hoạt động:
  - Sử dụng Fetch API để tải file products.json
  - Parse JSON thành JavaScript object
  - Gọi hàm renderProducts để hiển thị từng loại sản phẩm
  */
  fetch("js/products.json")                    // Tải file JSON
    .then((response) => response.json())       // Chuyển đổi thành JavaScript object
    .then((products) => {
      // Hiển thị các loại sản phẩm khác nhau
      renderProducts(products, "new", ".new-products", 26, Infinity);    // Sản phẩm mới (từ index 26)
      renderProducts(products, "hot", ".hot-products", 10, 19);          // Sản phẩm hot (từ index 10-19)
      renderProducts(products, "acer", ".acer-products");                // Sản phẩm Acer
      renderProducts(products, "asus", ".asus-products");                // Sản phẩm Asus
      renderProducts(products, "HP", ".HP-products");                    // Sản phẩm HP
      renderProducts(products, "LG", ".LG-products");                    // Sản phẩm LG
      renderProducts(products, "MSI", ".MSI-products");                  // Sản phẩm MSI
    });

  /* 
  ========================================
  RENDER PRODUCTS - HIỂN THỊ SẢN PHẨM
  ========================================
  Mục đích: Tạo HTML cho danh sách sản phẩm và hiển thị lên trang
  Tham số:
  - products: Mảng chứa dữ liệu sản phẩm
  - type: Loại sản phẩm (new, hot, acer, asus, etc.)
  - containerSelector: CSS selector của container chứa sản phẩm
  - minIndex: Chỉ số bắt đầu (cho sản phẩm mới/hot)
  - maxIndex: Chỉ số kết thúc (cho sản phẩm hot)
  */
  function renderProducts(
    products,                    // Mảng sản phẩm từ JSON
    type,                       // Loại sản phẩm cần hiển thị
    containerSelector,          // CSS selector của container
    minIndex,                   // Chỉ số bắt đầu
    maxIndex                    // Chỉ số kết thúc
  ) {
    // Tìm container trong DOM để hiển thị sản phẩm
    const container = document.querySelector(containerSelector);
    if (!container) return;     // Nếu không tìm thấy container thì dừng

    // Lọc sản phẩm theo loại
    let filteredProducts = products;
    if (type !== "all") {
      if (type === "new") {
        // Sản phẩm mới: lấy từ minIndex trở đi
        filteredProducts = products.filter((p, index) => index >= minIndex);
      } else if (type === "hot") {
        // Sản phẩm hot: lấy trong khoảng minIndex đến maxIndex
        filteredProducts = products.filter(
          (p, index) => index > minIndex && index < maxIndex
        );
      } else {
        // Sản phẩm theo brand: lọc theo tên thương hiệu
        filteredProducts = products.filter(
          (p) => p.type.toLowerCase() === type.toLowerCase()
        );
      }
    }

    container.innerHTML = filteredProducts
      .map((product) => {
        const productUrl =
          type === "new"
            ? `products/NewProducts/product${product.id}.html`
            : `products/${product.type}/product${product.id}.html`;
        return `
          <li class="product">
            <a href="${productUrl}">
              <div class="product-img">
                <img src="img/product/${product.id}.jpg" alt="${product.name}" />
              </div>
              <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
              </div>
            </a>
          </li>
        `;
      })
      .join("");
  }

  const mybutton = document.getElementById("myBtn");
  if (mybutton) {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    mybutton.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
});
