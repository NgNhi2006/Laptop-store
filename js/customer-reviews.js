// Customer Reviews System - Simple 5-star reviews
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
    return path.includes('product') && path.includes('.html') && !path.includes('index.html');
  }

  getReviews() {
    return [
      {
        id: 1,
        name: 'Nguyễn Minh Anh',
        avatar: 'NM',
        rating: 5,
        comment: 'Laptop gaming tuyệt vời! RTX 4090 chạy mọi game AAA mượt mà, màn hình 4K sắc nét. Thiết kế đẹp, build quality cao. Đáng đồng tiền bát gạo!',
        date: '2024-01-20',
        verified: true
      },
      {
        id: 2,
        name: 'Trần Đức Thành',
        avatar: 'TD',
        rating: 5,
        comment: 'Mua được 2 tháng rồi, laptop vẫn chạy như mới. Hiệu năng mạnh mẽ, render video 4K nhanh như chớp. Pin trâu, dùng cả ngày không lo hết pin.',
        date: '2024-01-18',
        verified: true
      },
      {
        id: 3,
        name: 'Vũ Minh Tuấn',
        avatar: 'VM',
        rating: 5,
        comment: 'Đỉnh cao! RTX 4090 + Intel i9, combo không thể chê. Chơi Cyberpunk 2077 max setting 60fps ổn định. Màn hình 4K 144Hz mượt mà tuyệt đối.',
        date: '2024-01-08',
        verified: true
      },
      {
        id: 4,
        name: 'Phạm Văn Đức',
        avatar: 'PV',
        rating: 5,
        comment: 'Tuyệt vời! Thiết kế đẹp, hiệu năng cao. Phù hợp cho công việc đồ họa và gaming. Bàn phím RGB đẹp, touchpad mượt. Khuyến nghị mua!',
        date: '2024-01-12',
        verified: true
      },
      {
        id: 5,
        name: 'Bùi Văn Hùng',
        avatar: 'BV',
        rating: 5,
        comment: 'Rất hài lòng! Giao hàng nhanh, đóng gói cẩn thận. Sản phẩm đúng như mô tả, không có lỗi gì. Hỗ trợ khách hàng nhiệt tình.',
        date: '2024-01-03',
        verified: true
      },
      {
        id: 6,
        name: 'Lý Văn Nam',
        avatar: 'LV',
        rating: 5,
        comment: 'Tuyệt vời! Thiết kế gaming đẹp mắt, hiệu năng mạnh mẽ. Chạy mọi game AAA mượt mà. Build quality cao, bền bỉ. Đáng đầu tư!',
        date: '2023-12-28',
        verified: true
      },
      {
        id: 7,
        name: 'Phan Văn Long',
        avatar: 'PL',
        rating: 5,
        comment: 'Đỉnh cao của gaming laptop! RTX 4090 siêu mạnh, chơi game 4K mượt mà. Thiết kế đẹp, RGB lighting tuyệt đẹp. Khuyến nghị mua!',
        date: '2023-12-22',
        verified: true
      },
      {
        id: 8,
        name: 'Hoàng Văn Quang',
        avatar: 'HQ',
        rating: 5,
        comment: 'Tuyệt vời! Hiệu năng mạnh mẽ, thiết kế đẹp. Chạy mọi phần mềm mượt mà. Bàn phím cơ tốt, touchpad chính xác. Đáng mua!',
        date: '2023-12-18',
        verified: true
      },
      {
        id: 9,
        name: 'Dương Văn Tài',
        avatar: 'DT',
        rating: 5,
        comment: 'Đỉnh cao! RTX 4090 + Intel i9 combo không thể chê. Chơi game 4K 60fps ổn định. Màn hình 144Hz mượt mà tuyệt đối.',
        date: '2023-12-12',
        verified: true
      },
      {
        id: 10,
        name: 'Cao Văn Đức',
        avatar: 'CD',
        rating: 5,
        comment: 'Tuyệt vời! Hiệu năng mạnh mẽ, thiết kế gaming đẹp mắt. Chạy mọi game AAA mượt mà. RGB lighting tuyệt đẹp. Khuyến nghị!',
        date: '2023-12-08',
        verified: true
      },
      {
        id: 11,
        name: 'Nguyễn Văn Tuấn',
        avatar: 'NT',
        rating: 5,
        comment: 'Đỉnh cao của gaming laptop! RTX 4090 siêu mạnh, chơi game 4K mượt mà. Thiết kế đẹp, build quality cao. Đáng đầu tư!',
        date: '2023-12-03',
        verified: true
      },
      {
        id: 12,
        name: 'Trần Minh Quân',
        avatar: 'TQ',
        rating: 5,
        comment: 'Laptop ASUS ROG Zephyrus M tuyệt vời! RTX 4090 + Intel i9 combo mạnh mẽ. Thiết kế đẹp, màn hình 4K 144Hz sắc nét. Chơi game AAA mượt mà tuyệt đối!',
        date: '2024-01-19',
        verified: true
      }
    ];
  }

  addReviewsToPage() {
    // Check if reviews already exist
    if (document.querySelector('.customer-reviews')) {
      return;
    }

    // Add CSS
    this.addCSS();

    // Add HTML
    this.addHTML();

    // Add JavaScript functionality
    this.addJS();
  }

  addCSS() {
    if (document.querySelector('link[href*="customer-reviews.css"]')) {
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '../../css/customer-reviews.css';
    document.head.appendChild(cssLink);
  }

  addHTML() {
    const reviewsHTML = this.generateReviewsHTML();
    
    // Find the best place to insert reviews
    const footer = document.querySelector('footer');
    if (footer) {
      footer.insertAdjacentHTML('beforebegin', reviewsHTML);
    } else {
      const body = document.querySelector('body');
      if (body) {
        body.insertAdjacentHTML('beforeend', reviewsHTML);
      }
    }
  }

  generateReviewsHTML() {
    const reviewsHTML = this.reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <div class="customer-avatar">${review.avatar}</div>
          <div class="customer-info">
            <h4>${review.name}</h4>
            <p>Khách hàng</p>
          </div>
          <div class="rating-stars">
            ${'★'.repeat(review.rating)}
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
          ${review.verified ? '<div class="verified-badge"><i class="fa fa-check"></i> Đã mua</div>' : ''}
        </div>
      </div>
    `).join('');

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
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  addJS() {
    // Add any additional JavaScript functionality if needed
    this.addScrollAnimation();
  }

  addScrollAnimation() {
    // Add scroll animation for review cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    // Apply animation to review cards
    setTimeout(() => {
      const reviewCards = document.querySelectorAll('.review-card');
      reviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    }, 100);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CustomerReviews();
});

