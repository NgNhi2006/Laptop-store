const API_URL = "http://localhost:3000"; // server

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `toast ${type}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function toggleForm(formType) {
  if (formType === "login") {
    document.querySelector(".login-form").style.display = "block";
    document.querySelector(".register-form").style.display = "none";
  } else {
    document.querySelector(".login-form").style.display = "none";
    document.querySelector(".register-form").style.display = "block";
  }
}

// Đăng ký
async function registerUser() {
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const rePassword = document.getElementById("registerRePassword").value;

  if (!email || !password || !rePassword) {
    showToast("⚠️ Vui lòng nhập đầy đủ thông tin!", "error");
    return;
  }

  if (password !== rePassword) {
    showToast("⚠️ Mật khẩu không khớp!", "error");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      showToast("✅ Đăng ký thành công! Mời bạn đăng nhập.");
      toggleForm("login");
    } else {
      showToast("❌ " + (data.error || "Lỗi không xác định!"), "error");
    }
  } catch (err) {
    showToast("❌ Lỗi kết nối server!", "error");
    console.error(err);
  }
}

// Đăng nhập
async function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showToast("⚠️ Vui lòng nhập đầy đủ thông tin!", "error");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      showToast("🎉 Đăng nhập thành công!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } else {
      showToast("❌ " + (data.message || "Sai email hoặc mật khẩu!"), "error");
    }
  } catch (err) {
    showToast("❌ Lỗi kết nối server!", "error");
    console.error(err);
  }
}

// Quên mật khẩu
function forgotPassword() {
  showToast("ℹ️ Chức năng quên mật khẩu chưa hỗ trợ liên hệ bộ phận hỗ trợ để được hỗ trợ.", "info");
}
