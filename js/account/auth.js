document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const userStatusContainer = document.getElementById("user-status-container");

  if (!userStatusContainer) {
    console.error("Element with ID 'user-status-container' not found.");
    return;
  }

  if (user) {
    userStatusContainer.innerHTML = `
            <div class="user-info">
                <span><i class="fa-solid fa-user"></i> ${user.username}</span>
                <div class="user-dropdown-content">
                    <p>Số dư: 0đ</p>
                    <button class="deposit-btn">Nạp tiền</button>
                    <button onclick="logout()" class="logout-btn">Đăng xuất</button>
                </div>
            </div>
        `;
  } else {
    userStatusContainer.innerHTML = `
            <a href="login.html">
                <div class="login">
                    <i class="fa-solid fa-user"></i>
                    <p>Đăng nhập/Đăng ký</p>
                </div>
            </a>
        `;
  }
});

function logout() {
  localStorage.removeItem("user");

  const toast = document.createElement("div");
  toast.textContent = "✅ Đã đăng xuất thành công!";
  toast.className = `toast success show`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
    window.location.reload();
  }, 1500);
}
