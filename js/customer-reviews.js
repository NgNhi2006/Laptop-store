class CustomerReviews {
  constructor() {
    this.reviews = this.getReviews();
    this.init();
  }

  init() {
    if (this.isProductPage()) {
      this.addReviewsToPage();
    }
  }

  isProductPage() {
    const path = window.location.pathname;
    return (
      path.includes("product") &&
      path.includes(".html") &&
      !path.includes("index.html")
    );
  }

  getReviews() {
    return [
      {
        id: 1,
        name: "Lại Thanh Điệp",
        avatar: "LD",
        rating: 5,
        comment:
          "SHOP ANH NHI MÃI ĐỈNH.Em là 1 người nghiện game lâu năm em luôn muốn tìm 1 chiếc laptop gamming để chơi game rất may mắn đã tìm thấy shop anh bên anh hỗ trợ rất nhiệt tình em rất vui vì đã tìm được 1 máy gamming chơi game xịn như vậy.Đối với 1 người nghiện game như em shop anh đúng là 1 lựa chọn tuyệt vời.Shop anh NHi mãi đỉnh mãi đỉnh em sẽ ủng hộ dài dài.hihi",
        date: "2025-10-28",
        verified: true,
      },
      {
        id: 2,
        name: "Nguyễn ĐỨc Anh Tuấn",
        avatar: "AT",
        rating: 5,
        comment:
          "em chào anh sau khi mua máy ở bên anh về em cảm thấy rất tự hào vì được anh bán máy cho em cảm thấy rất vinh hạnh khi được cầm máy ở cửa hàng anh trên tay chưa bao giờ em thấy vui như vậy em xin hứa sẽ mua nhiều hơn để ủng hộ anh thêm nữa mãi iu laptopstore em chỉ muốn vào công ty anh làm một nhân viên để giúp anh bán hàng nhiều hơn .",
        date: "2024-01-18",
        verified: true,
      },
      {
        id: 3,
        name: "Mạc Văn Khoa",
        avatar: "MK",
        rating: 5,
        comment:
          "Máy tính của anh xịn quá em mua về mà không nỡ dùng cất trong tủ kính trưng bày để ngắm mỗi ngày em ước mơ được vào công ty anh làm kỹ thuật ạ em đã liên hệ qua zalo cho anh rất lâu rồi em hi vọng 1 ngày nào đó anh em mình có thể ngồi chung với nhau cùng làm việc hihi:33",
        date: "2024-01-08",
        verified: true,
      },
      {
        id: 4,
        name: "Phạm Văn Thắng",
        avatar: "PV",
        rating: 5,
        comment:
          "Thật tuyệt vời máy tính rất xịn shop rất uy tín anh Nhi của em mãi đỉnh em không ngờ anh bán máy lại đỉnh như vậy giá cả quá hợp lý em hâm mộ anh từ hồi anh vẫn còn trong bụng mẹ em sẽ ủng hộ anh thêm 10 con msi GF63 nữa hihi:>>",
        date: "2024-01-12",
        verified: true,
      },
      {
        id: 5,
        name: "Bùi Đức Long",
        avatar: "BL",
        rating: 5,
        comment:
          "Tuy tôi là người han cuoc nhung toy rat thic san pham cua ca ban toi rat vui kki duoc mua laptop cua ban toi rat muon mua laptop cua ban them lan nua 감사해요.",
        date: "2024-01-03",
        verified: true,
      },
      {
        id: 6,
        name: "Lý Văn Nam",
        avatar: "LV",
        rating: 5,
        comment:
          "Tuyệt vời! Thiết kế gaming đẹp mắt, hiệu năng mạnh mẽ. Chạy mọi game AAA mượt mà. Build quality cao, bền bỉ. Đáng đầu tư!",
        date: "2023-12-28",
        verified: true,
      },
      {
        id: 7,
        name: "Phan Văn Long",
        avatar: "PL",
        rating: 5,
        comment:
          "Đỉnh cao của gaming laptop! RTX 4090 siêu mạnh, chơi game 4K mượt mà. Thiết kế đẹp, RGB lighting tuyệt đẹp. Khuyến nghị mua!",
        date: "2023-12-22",
        verified: true,
      },
      {
        id: 8,
        name: "Hoàng Văn Quang",
        avatar: "HQ",
        rating: 5,
        comment:
          "Tuyệt vời! Hiệu năng mạnh mẽ, thiết kế đẹp. Chạy mọi phần mềm mượt mà. Bàn phím cơ tốt, touchpad chính xác. Đáng mua!",
        date: "2023-12-18",
        verified: true,
      },
      {
        id: 9,
        name: "Dương Văn Tài",
        avatar: "DT",
        rating: 5,
        comment:
          "Đỉnh cao! RTX 4090 + Intel i9 combo không thể chê. Chơi game 4K 60fps ổn định. Màn hình 144Hz mượt mà tuyệt đối.",
        date: "2023-12-12",
        verified: true,
      },
      {
        id: 10,
        name: "Cao Văn Đức",
        avatar: "CD",
        rating: 5,
        comment:
          "Tuyệt vời! Hiệu năng mạnh mẽ, thiết kế gaming đẹp mắt. Chạy mọi game AAA mượt mà. RGB lighting tuyệt đẹp. Khuyến nghị!",
        date: "2023-12-08",
        verified: true,
      },
      {
        id: 11,
        name: "Nguyễn Văn Tuấn",
        avatar: "NT",
        rating: 5,
        comment:
          "Đỉnh cao của gaming laptop! RTX 4090 siêu mạnh, chơi game 4K mượt mà. Thiết kế đẹp, build quality cao. Đáng đầu tư!",
        date: "2023-12-03",
        verified: true,
      },
      {
        id: 12,
        name: "Trần Minh Quân",
        avatar: "TQ",
        rating: 5,
        comment:
          "Laptop ASUS ROG Zephyrus M tuyệt vời! RTX 4090 + Intel i9 combo mạnh mẽ. Thiết kế đẹp, màn hình 4K 144Hz sắc nét. Chơi game AAA mượt mà tuyệt đối!",
        date: "2024-01-19",
        verified: true,
      },
    ];
  }

  addReviewsToPage() {
    if (document.querySelector(".customer-reviews")) {
      return;
    }

    this.addCSS();

    this.addHTML();

    this.addJS();
  }

  addCSS() {
    if (document.querySelector('link[href*="customer-reviews.css"]')) {
      return;
    }

    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "../../css/customer-reviews.css";
    document.head.appendChild(cssLink);
  }

  addHTML() {
    const reviewsHTML = this.generateReviewsHTML();

    const footer = document.querySelector("footer");
    if (footer) {
      footer.insertAdjacentHTML("beforebegin", reviewsHTML);
    } else {
      const body = document.querySelector("body");
      if (body) {
        body.insertAdjacentHTML("beforeend", reviewsHTML);
      }
    }
  }

  generateReviewsHTML() {
    const reviewsHTML = this.reviews
      .map(
        (review) => `
      <div class="review-card">
        <div class="review-header">
          <div class="customer-avatar">${review.avatar}</div>
          <div class="customer-info">
            <h4>${review.name}</h4>
            <p>Khách hàng</p>
          </div>
          <div class="rating-stars">
            ${"★".repeat(review.rating)}
          </div>
        </div>
        <div class="review-content">
          ${review.comment}
        </div>
        <div class="review-meta">
          <div class="review-date">
            <i class="fa fa-calendar"></i>
            ${this.formatDate(review.date)}
          </div>
          ${
            review.verified
              ? '<div class="verified-badge"><i class="fa fa-check"></i> Đã mua</div>'
              : ""
          }
        </div>
      </div>
    `
      )
      .join("");

    return `
      <div class="customer-reviews">
        <div class="reviews-header">
          <h2 class="reviews-title">Đánh giá khách hàng</h2>
          <p class="reviews-subtitle">Những chia sẻ chân thực từ khách hàng đã sử dụng sản phẩm</p>
        </div>
        <div class="reviews-grid">
          ${reviewsHTML}
        </div>
      </div>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  addJS() {
    this.addScrollAnimation();
  }

  addScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const reviewCards = document.querySelectorAll(".review-card");
      reviewCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = `opacity 0.6s ease ${
          index * 0.1
        }s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CustomerReviews();
});
