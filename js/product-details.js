document.addEventListener("DOMContentLoaded", () => {
  // Load product data from js/products.json and populate the page
  (function loadProductData() {
    const productId = getProductIdFromPage();
    if (!productId) return;

    const jsonPath = getJsonPath();
    fetch(jsonPath)
      .then((res) => res.json())
      .then((products) => {
        const product = products.find((p) => p.id == productId);
        if (product && product.specs) {
          applyProductToDom(product);
        }
      })
      .catch((err) => console.error("Error loading products.json", err));

    function getJsonPath() {
      const path = window.location.pathname;
      // product pages live under /products/... so ../../js/products.json works in most cases
      if (path.includes("/products/")) return "../../js/products.json";
      return "js/products.json";
    }

    function getProductIdFromPage() {
      const path = window.location.pathname;
      const match = path.match(/product(\d+)\.html$/);
      if (match) return parseInt(match[1]);
      const titleEl = document.querySelector(".product-title");
      if (titleEl) {
        const m = titleEl.textContent.match(/(\d+)/);
        if (m) return parseInt(m[1]);
      }
      return null;
    }

    function applyProductToDom(product) {
      const titleEl = document.querySelector(".product-title");
      if (titleEl && product.name) titleEl.textContent = product.name;

      const priceEl = document.querySelector(".product-price");
      if (priceEl && product.price)
        priceEl.textContent = `Giá: ${product.price}`;

      const specsEl = document.querySelector(".product-specifications");
      if (specsEl && product.specs) {
        specsEl.innerHTML = `\n          <strong>Thông số kỹ thuật:</strong> <br />\n          CPU: ${product.specs.cpu} <br />\n          Card đồ họa: ${product.specs.gpu} <br />\n          RAM: ${product.specs.ram} <br />\n          Ổ cứng: ${product.specs.storage} <br />\n          Màn hình: ${product.specs.display} <br />\n          Pin: ${product.specs.battery} <br />\n          Trọng lượng: ${product.specs.weight}\n        `;
      }

      const descEl = document.querySelector(".product-description ul");
      if (descEl && product.specs) {
        descEl.innerHTML = `
          <li><strong>CPU:</strong> ${product.specs.cpu}</li>
          <li><strong>GPU:</strong> ${product.specs.gpu}</li>
          <li><strong>RAM:</strong> ${product.specs.ram}</li>
          <li><strong>Ổ cứng:</strong> ${product.specs.storage}</li>
          <li><strong>Màn hình:</strong> ${product.specs.display}</li>
          <li><strong>Cổng giao tiếp:</strong> ${product.specs.ports}</li>
          <li><strong>Wi-Fi:</strong> ${product.specs.wifi}</li>
          <li><strong>Hệ điều hành:</strong> ${product.specs.os}</li>
          <li><strong>Pin:</strong> ${product.specs.battery}</li>
          <li><strong>Trọng lượng:</strong> ${product.specs.weight}</li>
        `;
      }
      // update main image if product has image property (optional)
      if (product.image) {
        const mainImg = document.querySelector(".main-image");
        if (mainImg) mainImg.src = product.image;
      }
    }
  })();

  // Cart handling (preserve original behavior)
  const addToCartButton = document.querySelector(".add-to-cart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const productTitle = document.querySelector(".product-title").innerText;
      const productPrice = document.querySelector(".product-price").innerText;
      const productImage = document.querySelector(".main-image").src;

      const product = {
        id: Date.now(),
        title: productTitle,
        price: productPrice.replace("Giá: ", ""),
        image: productImage,
        quantity: 1,
      };

      addToCart(product);
    });
  }

  function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.title === product.title);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push(product);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${product.title} đã được thêm vào giỏ hàng!`);
  }
});
