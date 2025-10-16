
class AuthManager {
  constructor() {
    this.currentUser = null;              
    this.init();                          
  }

  init() {
    this.bindEvents();                    
    this.checkAuthStatus();               
    this.updateUserStatus();              
  }

  bindEvents() {
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
    }

    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener('input', (e) => this.checkPasswordMatch());
    }

    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleSocialLogin('google'));
    }

    const facebookBtn = document.querySelector('.facebook-btn');
    if (facebookBtn) {
      facebookBtn.addEventListener('click', () => this.handleSocialLogin('facebook'));
    }
  }

  checkAuthStatus() {
    const user = this.getCurrentUser();
    if (user && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
      
      window.location.href = 'index.html';
    }
  }

  updateUserStatus() {
    const container = document.getElementById('user-status-container');
    if (!container) return;

    const user = this.getCurrentUser();
    
    if (user) {
      container.innerHTML = `
        <div class="user-menu">
          <div class="user-info">
            <i class="fa fa-user-circle"></i>
            <span>Xin chào, ${user.firstName}</span>
            <i class="fa fa-chevron-down"></i>
          </div>
          <div class="user-dropdown">
            <a href="#" class="dropdown-item">
              <i class="fa fa-user"></i>
              Thông tin cá nhân
            </a>
            <a href="#" class="dropdown-item">
              <i class="fa fa-shopping-bag"></i>
              Đơn hàng của tôi
            </a>
            <a href="#" class="dropdown-item">
              <i class="fa fa-heart"></i>
              Sản phẩm yêu thích
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item" onclick="authManager.logout()">
              <i class="fa fa-sign-out-alt"></i>
              Đăng xuất
            </a>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="auth-links">
          <a href="login.html" class="auth-link login-link">
            <i class="fa fa-sign-in-alt"></i>
            Đăng nhập
          </a>
          <a href="register.html" class="auth-link register-link">
            <i class="fa fa-user-plus"></i>
            Đăng ký
          </a>
        </div>
      `;
    }
  }

  logout() {
    localStorage.removeItem('laptopStoreUser');
    sessionStorage.removeItem('laptopStoreUser');
    this.updateUserStatus();
    this.showSuccess('Đăng xuất thành công!');
    
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  }

  handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');

    if (!this.validateEmail(email) && !this.validatePhone(email)) {
      this.showError('Vui lòng nhập email hoặc số điện thoại hợp lệ');
      return;
    }

    if (!this.validatePassword(password)) {
      this.showError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    const submitBtn = e.target.querySelector('.auth-btn');
    this.setLoading(submitBtn, true);

    setTimeout(() => {
      const user = this.authenticateUser(email, password);
      
      if (user) {
        this.loginUser(user, rememberMe);
        this.showSuccess('Đăng nhập thành công!');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        this.showError('Email/số điện thoại hoặc mật khẩu không đúng');
      }
      
      this.setLoading(submitBtn, false);
    }, 1500);
  }

  handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const address = formData.get('address');
    const agreeTerms = formData.get('agreeTerms');

    if (!firstName || !lastName) {
      this.showError('Vui lòng nhập đầy đủ họ và tên');
      return;
    }

    if (!this.validateEmail(email)) {
      this.showError('Vui lòng nhập email hợp lệ');
      return;
    }

    if (!this.validatePhone(phone)) {
      this.showError('Vui lòng nhập số điện thoại hợp lệ');
      return;
    }

    if (!this.validatePassword(password)) {
      this.showError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      this.showError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!address) {
      this.showError('Vui lòng nhập địa chỉ');
      return;
    }

    if (!agreeTerms) {
      this.showError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    const submitBtn = e.target.querySelector('.auth-btn');
    this.setLoading(submitBtn, true);

    setTimeout(() => {
      const user = this.createUser({
        firstName,
        lastName,
        email,
        phone,
        password,
        address
      });
      
      if (user) {
        this.loginUser(user, false);
        this.showSuccess('Đăng ký thành công!');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        this.showError('Email đã được sử dụng');
      }
      
      this.setLoading(submitBtn, false);
    }, 1500);
  }

  checkPasswordStrength(password) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;

    let strength = 0;
    let strengthClass = 'weak';
    let strengthLabel = 'Mật khẩu yếu';

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength >= 4) {
      strengthClass = 'strong';
      strengthLabel = 'Mật khẩu mạnh';
    } else if (strength >= 3) {
      strengthClass = 'good';
      strengthLabel = 'Mật khẩu tốt';
    } else if (strength >= 2) {
      strengthClass = 'fair';
      strengthLabel = 'Mật khẩu trung bình';
    }

    strengthFill.className = `strength-fill ${strengthClass}`;
    strengthText.className = `strength-text ${strengthClass}`;
    strengthText.textContent = strengthLabel;
  }

  checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmInput = document.getElementById('confirmPassword');

    if (confirmPassword && password !== confirmPassword) {
      confirmInput.style.borderColor = '#dc3545';
    } else {
      confirmInput.style.borderColor = '#e9ecef';
    }
  }

  handleSocialLogin(provider) {
    this.showInfo(`Đăng nhập với ${provider} đang được phát triển`);
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  validatePassword(password) {
    return password && password.length >= 6;
  }

  authenticateUser(email, password) {
    const users = this.getUsers();
    return users.find(user => 
      (user.email === email || user.phone === email) && 
      user.password === password
    );
  }

  createUser(userData) {
    const users = this.getUsers();
    
    if (users.find(user => user.email === userData.email)) {
      return null;
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('laptopStoreUsers', JSON.stringify(users));
    
    return newUser;
  }

  loginUser(user, rememberMe) {
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address
    };

    if (rememberMe) {
      localStorage.setItem('laptopStoreUser', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('laptopStoreUser', JSON.stringify(userData));
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('laptopStoreUser') || sessionStorage.getItem('laptopStoreUser') || 'null');
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('laptopStoreUsers') || '[]');
  }

  setLoading(button, loading) {
    if (loading) {
      button.classList.add('loading');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showInfo(message) {
    this.showNotification(message, 'info');
  }

  showNotification(message, type) {
    
    const existing = document.querySelector('.auth-notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `auth-notification auth-notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fa fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.parentNode.querySelector('.toggle-password');
  const icon = button.querySelector('i');

  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa fa-eye';
  }
}

const notificationStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .notification-content i {
    font-size: 1.2rem;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

let authManager;
document.addEventListener('DOMContentLoaded', () => {
  authManager = new AuthManager();
});
