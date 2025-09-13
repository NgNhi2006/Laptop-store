function renderAccount() {
  const accountDiv = document.getElementById("account");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const displayName = user.username.includes("@")
      ? user.username.split("@")[0]
      : user.username;

    let dropdownHTML = `
            <div class="dropdown-item" onclick="location.href='#'">Tài khoản của tôi</div>
            <div class="dropdown-item" id="logoutBtn">Đăng xuất</div>
            <div class="dropdown-item" id="darkModeToggle">Chế độ tối</div>
          `;

    if (user.role === "admin") {
      dropdownHTML =
        `
              <div class="dropdown-item" onclick="location.href='#'">Dashboard</div>
            ` + dropdownHTML;
    }

    accountDiv.innerHTML = `
            <div class="user-info">
              <i class="fa fa-user"></i>
              <span>${displayName}</span>
              <div class="dropdown-content-account">
                ${dropdownHTML}
              </div>
            </div>
          `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.reload();
    });

    document.getElementById("darkModeToggle").addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  } else {
    accountDiv.innerHTML = `
            <a href="login.html">
              <i class="fa fa-user"></i> <span>Đăng nhập / Đăng ký</span>
            </a>
          `;
  }
}

document.addEventListener("DOMContentLoaded", renderAccount);
