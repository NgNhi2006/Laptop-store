document.addEventListener("DOMContentLoaded", () => {
  // Banner
  let currentImageIndex = 0;
  const images = document.querySelectorAll(".banner-image");

  function showImage(index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  }

  if (images.length > 0) {
    setInterval(nextImage, 3000);
  }

  // Fetch and render products
  fetch("js/products.json")
    .then((response) => response.json())
    .then((products) => {
      renderProducts(products, "new", ".new-products", 26, Infinity);
      renderProducts(products, "hot", ".hot-products", 10, 19);
      renderProducts(products, "acer", ".acer-products");
      renderProducts(products, "asus", ".asus-products");
      renderProducts(products, "HP", ".HP-products");
      renderProducts(products, "LG", ".LG-products");
      renderProducts(products, "MSI", ".MSI-products");

    });

  function renderProducts(
    products,
    type,
    containerSelector,
    minIndex,
    maxIndex
  ) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let filteredProducts = products;
    if (type !== "all") {
      if (type === "new") {
        filteredProducts = products.filter((p, index) => index >= minIndex);
      } else if (type === "hot") {
        filteredProducts = products.filter(
          (p, index) => index > minIndex && index < maxIndex
        );
      } else {
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

  // Scroll to top button
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
