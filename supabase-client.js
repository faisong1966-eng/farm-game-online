// Supabase Client - แยกจากระบบเกมเดิม
(() => {
  const config = window.FARM_GAME_SUPABASE;

  if (!config?.url || !config?.publishableKey) {
    console.error("Supabase: ไม่พบ URL หรือ Publishable Key");
    return;
  }

  if (!window.supabase?.createClient) {
    console.error("Supabase: โหลด Supabase Library ไม่สำเร็จ");
    return;
  }

  window.supabaseClient = window.supabase.createClient(
    config.url,
    config.publishableKey
  );

  console.log("Supabase: เชื่อมต่อ Client สำเร็จ");
})();