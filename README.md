# 🖥️ Laptop Store - Hướng dẫn toàn diện

## 📋 Mục lục
1. [Giới thiệu tổng quan](#giới-thiệu-tổng-quan)
2. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
3. [Cách hoạt động của website](#cách-hoạt-động-của-website)
4. [Giải thích từng file quan trọng](#giải-thích-từng-file-quan-trọng)
5. [Cách thêm sản phẩm mới](#cách-thêm-sản-phẩm-mới)
6. [Cách tùy chỉnh giao diện](#cách-tùy-chỉnh-giao-diện)
7. [Troubleshooting](#troubleshooting)
8. [Công nghệ sử dụng](#công-nghệ-sử-dụng)

---

## 🎯 Giới thiệu tổng quan

**Laptop Store** là một website bán laptop được xây dựng bằng HTML, CSS và JavaScript thuần. Website này có đầy đủ các tính năng của một cửa hàng trực tuyến hiện đại:

- 🛒 **Giỏ hàng** - Thêm/sửa/xóa sản phẩm
- 🔐 **Đăng nhập/Đăng ký** - Hệ thống xác thực người dùng
- 💬 **Chatbot hỗ trợ** - Tư vấn khách hàng tự động
- ⭐ **Đánh giá sản phẩm** - Hiển thị review khách hàng
- 📱 **Responsive** - Tương thích mọi thiết bị
- ♿ **Accessibility** - Hỗ trợ người khuyết tật

---

## 📁 Cấu trúc thư mục

```
Laptop-store/
├── 📄 index.html              # Trang chủ
├── 📄 login.html              # Trang đăng nhập
├── 📄 register.html           # Trang đăng ký
├── 📄 cart.html               # Trang giỏ hàng
├── 📄 checkout.html           # Trang thanh toán
├── 📄 acer.html               # Trang sản phẩm Acer
├── 📄 asus.html               # Trang sản phẩm Asus
├── 📄 HP.html                 # Trang sản phẩm HP
├── 📄 LG.html                 # Trang sản phẩm LG
├── 📄 MSI.html                # Trang sản phẩm MSI
├── 📄 NewLaptop.html          # Trang laptop mới
├── 📄 khuyenmai.html          # Trang khuyến mãi
├── 📄 tragop.html             # Trang trả góp
├── 📁 css/                    # Thư mục chứa file CSS
│   ├── 📄 style.css           # CSS chính của website
│   ├── 📄 auth.css            # CSS cho trang đăng nhập/đăng ký
│   ├── 📄 components.css      # CSS cho các component tái sử dụng
│   ├── 📄 chatbot.css         # CSS cho chatbot
│   ├── 📄 customer-reviews.css # CSS cho đánh giá khách hàng
│   └── 📄 ...                 # Các file CSS khác
├── 📁 js/                     # Thư mục chứa file JavaScript
│   ├── 📄 main.js             # JavaScript chính
│   ├── 📄 auth.js             # JavaScript cho đăng nhập/đăng ký
│   ├── 📄 cart.js             # JavaScript cho giỏ hàng
│   ├── 📄 checkout.js         # JavaScript cho thanh toán
│   ├── 📄 products.json       # Dữ liệu sản phẩm
│   └── 📄 ...                 # Các file JS khác
├── 📁 img/                    # Thư mục chứa hình ảnh
│   ├── 📁 product/            # Hình ảnh sản phẩm
│   ├── 📁 banner/             # Hình ảnh banner
│   ├── 📁 bank/               # Hình ảnh ngân hàng
│   └── 📁 ...                 # Các thư mục hình ảnh khác
├── 📁 products/               # Thư mục trang chi tiết sản phẩm
│   ├── 📁 acer/               # Sản phẩm Acer
│   ├── 📁 asus/               # Sản phẩm Asus
│   ├── 📁 HP/                 # Sản phẩm HP
│   ├── 📁 LG/                 # Sản phẩm LG
│   ├── 📁 MSI/                # Sản phẩm MSI
│   ├── 📁 HotProducts/        # Sản phẩm hot
│   └── 📁 NewProducts/        # Sản phẩm mới
└── 📁 news/                   # Thư mục tin tức
```

---

## 🔄 Cách hoạt động của website

### 1. **Khi người dùng truy cập website**

```
Người dùng mở trình duyệt → Gõ địa chỉ website → Trình duyệt tải index.html
```

**Quá trình diễn ra:**
1. Trình duyệt đọc file `index.html`
2. Tải các file CSS (`style.css`, `components.css`, `chatbot.css`)
3. Tải các file JavaScript (`main.js`, `auth.js`)
4. Tải hình ảnh từ thư mục `img/`
5. Hiển thị trang web hoàn chỉnh

### 2. **Cấu trúc HTML cơ bản**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <!-- Thông tin meta và link CSS -->
    <meta charset="UTF-8">
    <title>Laptop Store</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Nội dung trang web -->
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    
    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

### 3. **Luồng hoạt động chính**

```
Trang chủ → Chọn sản phẩm → Xem chi tiết → Thêm vào giỏ → Thanh toán
    ↓
Đăng nhập/Đăng ký (nếu cần) → Xác nhận đơn hàng → Hoàn thành
```

---

## 📄 Giải thích từng file quan trọng

### 🏠 **index.html - Trang chủ**

**Mục đích:** Trang chính của website, hiển thị tất cả sản phẩm và thông tin quan trọng.

**Cấu trúc chính:**
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Khai báo thông tin trang -->
    <title>Laptop Store</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Skip link cho accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Header với logo, search, menu -->
    <header class="main-header">...</header>
    
    <!-- Nội dung chính -->
    <div class="frame">
        <!-- Banner quảng cáo -->
        <div class="banner">...</div>
        
        <!-- Danh sách sản phẩm -->
        <div class="products">...</div>
        
        <!-- Tin tức -->
        <div class="news">...</div>
    </div>
    
    <!-- Chatbot hỗ trợ -->
    <div class="chatbot">...</div>
</body>
</html>
```

**Cách hoạt động:**
1. Hiển thị banner quảng cáo
2. Load danh sách sản phẩm từ `js/products.json`
3. Hiển thị tin tức và khuyến mãi
4. Kích hoạt chatbot hỗ trợ

### 🎨 **css/style.css - CSS chính**

**Mục đích:** Định nghĩa giao diện, màu sắc, layout cho toàn bộ website.

**Cấu trúc chính:**
```css
/* 1. CSS Variables - Hệ thống màu sắc và kích thước */
:root {
    --color-brand-primary: #007bff;
    --color-text-primary: #000;
    --spacing-md: 16px;
    --font-size-base: 1rem;
}

/* 2. Reset CSS - Chuẩn hóa style mặc định */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* 3. Layout chính */
body { font-family: "Roboto", sans-serif; }
.frame { max-width: 1200px; margin: 0 auto; }

/* 4. Components */
.header { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.product-card { border: 1px solid #ddd; border-radius: 8px; }

/* 5. Responsive Design */
@media (max-width: 768px) {
    .header { padding: 10px; }
    .product-card { width: 100%; }
}
```

**Cách hoạt động:**
1. **CSS Variables** - Quản lý màu sắc và kích thước tập trung
2. **Reset CSS** - Xóa style mặc định của trình duyệt
3. **Layout** - Định nghĩa cấu trúc trang
4. **Components** - Style cho từng phần tử
5. **Responsive** - Tự động điều chỉnh theo kích thước màn hình

### ⚙️ **js/main.js - JavaScript chính**

**Mục đích:** Xử lý tương tác người dùng, load dữ liệu, quản lý trạng thái.

**Các chức năng chính:**
```javascript
// 1. Load sản phẩm từ JSON
async function loadProducts() {
    const response = await fetch('js/products.json');
    const products = await response.json();
    displayProducts(products);
}

// 2. Xử lý tìm kiếm
function handleSearch() {
    const searchTerm = document.getElementById('search').value;
    filterProducts(searchTerm);
}

// 3. Quản lý giỏ hàng
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// 4. Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeSearch();
    initializeCart();
});
```

**Cách hoạt động:**
1. **DOMContentLoaded** - Chờ HTML load xong rồi chạy JavaScript
2. **Fetch API** - Tải dữ liệu sản phẩm từ file JSON
3. **LocalStorage** - Lưu giỏ hàng vào trình duyệt
4. **Event Listeners** - Lắng nghe click, input của người dùng

### 🔐 **js/auth.js - Hệ thống đăng nhập**

**Mục đích:** Quản lý đăng nhập, đăng ký, xác thực người dùng.

**Cấu trúc chính:**
```javascript
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    // Khởi tạo
    init() {
        this.bindEvents();
        this.checkAuthStatus();
    }
    
    // Xử lý đăng nhập
    async handleLogin(email, password) {
        // Kiểm tra thông tin đăng nhập
        if (this.validateEmail(email) && this.validatePassword(password)) {
            // Lưu thông tin user
            this.currentUser = { email, loginTime: Date.now() };
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            this.showSuccess('Đăng nhập thành công!');
        }
    }
    
    // Xử lý đăng ký
    async handleRegister(userData) {
        // Kiểm tra thông tin đăng ký
        if (this.validateUserData(userData)) {
            // Lưu user mới
            this.saveUser(userData);
            this.showSuccess('Đăng ký thành công!');
        }
    }
}
```

**Cách hoạt động:**
1. **Class-based** - Sử dụng OOP để quản lý auth
2. **Validation** - Kiểm tra email, password, thông tin
3. **LocalStorage** - Lưu thông tin user vào trình duyệt
4. **UI Updates** - Cập nhật giao diện sau khi đăng nhập

### 🛒 **js/cart.js - Quản lý giỏ hàng**

**Mục đích:** Thêm, xóa, cập nhật sản phẩm trong giỏ hàng.

**Các chức năng chính:**
```javascript
// Thêm sản phẩm vào giỏ
function addToCart(productId, quantity = 1) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }
    
    saveCart(cart);
    updateCartUI();
}

// Xóa sản phẩm khỏi giỏ
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartUI();
}

// Tính tổng tiền
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = getProductById(item.id);
        return total + (product.price * item.quantity);
    }, 0);
}
```

**Cách hoạt động:**
1. **CRUD Operations** - Create, Read, Update, Delete sản phẩm
2. **LocalStorage** - Lưu giỏ hàng vào trình duyệt
3. **Real-time Updates** - Cập nhật UI ngay lập tức
4. **Price Calculation** - Tính tổng tiền tự động

### 📊 **js/products.json - Dữ liệu sản phẩm**

**Mục đích:** Lưu trữ thông tin tất cả sản phẩm của website.

**Cấu trúc dữ liệu:**
```json
{
    "products": [
        {
            "id": "product1",
            "name": "Laptop Asus VivoBook S15",
            "brand": "Asus",
            "price": 15990000,
            "originalPrice": 18990000,
            "discount": 15,
            "image": "img/product/asus/product1/1.jpg",
            "specs": {
                "cpu": "Intel Core i5-1135G7",
                "ram": "8GB DDR4",
                "storage": "512GB SSD",
                "display": "15.6 inch FHD"
            },
            "features": ["Gaming", "Office", "Student"],
            "rating": 4.5,
            "reviews": 128
        }
    ]
}
```

**Cách sử dụng:**
1. **Load dữ liệu** - JavaScript đọc file này khi trang load
2. **Filter/Search** - Tìm kiếm sản phẩm theo tên, brand, giá
3. **Display** - Hiển thị thông tin sản phẩm trên website
4. **Cart Integration** - Lưu ID sản phẩm vào giỏ hàng

---

## ➕ Cách thêm sản phẩm mới

### Bước 1: Thêm hình ảnh sản phẩm
```
1. Tạo thư mục mới trong img/product/[brand]/
2. Đặt tên: product[ID]/
3. Thêm các hình ảnh: 1.jpg, 2.jpg, 3.jpg, 4.jpg
```

### Bước 2: Thêm dữ liệu sản phẩm
Mở file `js/products.json` và thêm sản phẩm mới:

```json
{
    "id": "product_new",
    "name": "Tên sản phẩm mới",
    "brand": "Thương hiệu",
    "price": 15000000,
    "originalPrice": 18000000,
    "discount": 17,
    "image": "img/product/brand/product_new/1.jpg",
    "specs": {
        "cpu": "Intel Core i7",
        "ram": "16GB",
        "storage": "1TB SSD",
        "display": "15.6 inch 4K"
    },
    "features": ["Gaming", "Professional"],
    "rating": 4.8,
    "reviews": 0
}
```

### Bước 3: Tạo trang chi tiết sản phẩm
Tạo file `products/[brand]/product[ID].html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tên sản phẩm - Laptop Store</title>
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/customer-reviews.css">
</head>
<body>
    <!-- Copy cấu trúc từ product khác và thay đổi thông tin -->
    <div class="product-details">
        <div class="product-images">
            <img src="../../img/product/brand/product_new/1.jpg" alt="Sản phẩm">
        </div>
        <div class="product-info">
            <h1>Tên sản phẩm</h1>
            <p class="price">15,000,000 VNĐ</p>
            <button onclick="addToCart('product_new')">Thêm vào giỏ</button>
        </div>
    </div>
    
    <!-- Customer Reviews Section -->
    <div id="customer-reviews"></div>
    
    <script src="../../js/main.js"></script>
    <script src="../../js/customer-reviews.js"></script>
</body>
</html>
```

### Bước 4: Cập nhật menu
Thêm link sản phẩm mới vào menu trong `index.html`:

```html
<li class="dropdown">
    <a href="#">Thương hiệu</a>
    <ul class="dropdown-content">
        <li><a href="products/brand/product_new.html">Sản phẩm mới</a></li>
    </ul>
</li>
```

---

## 🎨 Cách tùy chỉnh giao diện

### 1. **Thay đổi màu sắc**

Mở file `css/style.css` và tìm phần `:root`:

```css
:root {
    /* Thay đổi màu chính */
    --color-brand-primary: #007bff;  /* Màu xanh dương */
    --color-brand-secondary: #0056b3; /* Màu xanh đậm */
    --color-brand-accent: #00c6ff;   /* Màu xanh nhạt */
    
    /* Thay đổi màu text */
    --color-text-primary: #000;      /* Màu đen */
    --color-text-secondary: #333;    /* Màu xám đậm */
}
```

### 2. **Thay đổi font chữ**

```css
:root {
    /* Thay đổi font chính */
    --font-family-primary: "Roboto", sans-serif;
    
    /* Thay đổi kích thước font */
    --font-size-base: 1rem;          /* Font size cơ bản */
    --font-size-lg: 1.125rem;        /* Font size lớn */
    --font-size-xl: 1.25rem;         /* Font size rất lớn */
}
```

### 3. **Thay đổi khoảng cách**

```css
:root {
    /* Thay đổi spacing */
    --spacing-xs: 4px;               /* Khoảng cách rất nhỏ */
    --spacing-sm: 8px;               /* Khoảng cách nhỏ */
    --spacing-md: 16px;              /* Khoảng cách vừa */
    --spacing-lg: 24px;              /* Khoảng cách lớn */
}
```

### 4. **Thay đổi layout**

```css
/* Thay đổi chiều rộng tối đa */
.frame {
    max-width: 1200px;  /* Thay đổi từ 1200px thành 1400px */
}

/* Thay đổi padding header */
.header {
    padding: 20px;  /* Thay đổi từ 15px thành 20px */
}
```

---

## 🔧 Troubleshooting

### **Lỗi thường gặp và cách khắc phục:**

#### 1. **Hình ảnh không hiển thị**
```
❌ Lỗi: Hình ảnh bị lỗi 404
✅ Khắc phục: 
- Kiểm tra đường dẫn file hình ảnh
- Đảm bảo file hình ảnh tồn tại
- Kiểm tra tên file có đúng không
```

#### 2. **CSS không áp dụng**
```
❌ Lỗi: Style không hiển thị
✅ Khắc phục:
- Kiểm tra đường dẫn file CSS trong HTML
- Kiểm tra syntax CSS có đúng không
- Clear cache trình duyệt (Ctrl + F5)
```

#### 3. **JavaScript không hoạt động**
```
❌ Lỗi: Chức năng không hoạt động
✅ Khắc phục:
- Mở Developer Tools (F12) xem lỗi
- Kiểm tra console có lỗi JavaScript không
- Kiểm tra file JS có được load không
```

#### 4. **Responsive không đúng**
```
❌ Lỗi: Giao diện bị vỡ trên mobile
✅ Khắc phục:
- Kiểm tra viewport meta tag
- Kiểm tra CSS media queries
- Test trên nhiều kích thước màn hình
```

#### 5. **Giỏ hàng không lưu**
```
❌ Lỗi: Sản phẩm biến mất khi refresh
✅ Khắc phục:
- Kiểm tra LocalStorage có hoạt động không
- Kiểm tra JavaScript có lỗi không
- Kiểm tra ID sản phẩm có đúng không
```

---

## 🛠️ Công nghệ sử dụng

### **Frontend Technologies:**

#### 1. **HTML5**
- **Mục đích:** Cấu trúc nội dung trang web
- **Tính năng:** Semantic elements, accessibility, SEO-friendly
- **Ví dụ:** `<header>`, `<main>`, `<section>`, `<article>`

#### 2. **CSS3**
- **Mục đích:** Styling và layout
- **Tính năng:** 
  - CSS Variables (Custom Properties)
  - Flexbox và Grid Layout
  - Media Queries (Responsive Design)
  - Animations và Transitions
  - Box Shadow và Border Radius

#### 3. **Vanilla JavaScript (ES6+)**
- **Mục đích:** Tương tác và logic
- **Tính năng:**
  - Classes và Modules
  - Async/Await
  - Fetch API
  - LocalStorage
  - Event Handling
  - DOM Manipulation

#### 4. **JSON**
- **Mục đích:** Lưu trữ dữ liệu sản phẩm
- **Tính năng:** Lightweight, human-readable, easy to parse

### **Libraries và Frameworks:**

#### 1. **Font Awesome**
- **Mục đích:** Icons
- **Cách sử dụng:** `<i class="fas fa-shopping-cart"></i>`

#### 2. **Google Fonts**
- **Mục đích:** Typography
- **Font sử dụng:** Roboto, Inter

### **Browser APIs:**

#### 1. **LocalStorage API**
```javascript
// Lưu dữ liệu
localStorage.setItem('cart', JSON.stringify(cartData));

// Lấy dữ liệu
const cartData = JSON.parse(localStorage.getItem('cart'));
```

#### 2. **Fetch API**
```javascript
// Tải dữ liệu
const response = await fetch('js/products.json');
const data = await response.json();
```

#### 3. **DOM API**
```javascript
// Tìm element
const element = document.getElementById('product-list');

// Thêm event listener
element.addEventListener('click', handleClick);
```

---

## 📚 Tài liệu tham khảo

### **HTML:**
- [MDN HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

### **CSS:**
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### **JavaScript:**
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ES6 Features](https://es6-features.org/)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### **Accessibility:**
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

---

## 🎯 Kết luận

Website **Laptop Store** được xây dựng với kiến trúc đơn giản nhưng mạnh mẽ, sử dụng các công nghệ web hiện đại và tuân thủ các best practices. Code được tổ chức rõ ràng, dễ hiểu và dễ maintain.

**Điểm mạnh:**
- ✅ Code sạch, có cấu trúc
- ✅ Responsive design hoàn chỉnh
- ✅ Accessibility compliance
- ✅ Performance optimization
- ✅ Component-based architecture
- ✅ Modern CSS và JavaScript

**Hướng phát triển:**
- 🔄 Thêm tính năng thanh toán online
- 🔄 Tích hợp database thật
- 🔄 Thêm admin panel
- 🔄 SEO optimization
- 🔄 PWA (Progressive Web App)

---

*Tài liệu này được tạo để giúp mọi người hiểu rõ cách hoạt động của website Laptop Store. Nếu có thắc mắc, hãy liên hệ với team phát triển!* 🚀
