const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    message.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
    return;
  }

  if (!window.supabaseClient) {
    message.textContent = "ไม่พบการเชื่อมต่อ Supabase";
    return;
  }

  message.textContent = "กำลังเข้าสู่ระบบ...";

  const { data, error } = await window.supabaseClient
    .from("game_admins")
    .select("*")
    .eq("username", username)
    .eq("password_hash", password)
    .maybeSingle();

  if (error) {
    console.error(error);
    message.textContent = "เกิดข้อผิดพลาดในการตรวจสอบแอดมิน";
    return;
  }

  if (!data) {
    message.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    return;
  }

  message.textContent = "เข้าสู่ระบบสำเร็จ";

  sessionStorage.setItem("farmGameAdmin", "true");
  sessionStorage.setItem("farmGameAdminUsername", data.username);

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
});