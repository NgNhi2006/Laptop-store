document.addEventListener("DOMContentLoaded", () => {
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
