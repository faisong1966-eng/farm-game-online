/* V207 ADMIN DASHBOARD — REAL SHARED CONFIG
   First live menus: Item management + Shop.
   Reads/writes game_admin_config(id="global") only.
*/
(() => {
  const TABLE = "game_admin_config";
  const ROW_ID = "global";
  let config = null;

  const clone = (v) => JSON.parse(JSON.stringify(v));

  async function loadConfig() {
    if (!window.supabaseClient) throw new Error("ไม่พบ Supabase Client");

    const { data, error } = await window.supabaseClient
      .from(TABLE)
      .select("config")
      .eq("id", ROW_ID)
      .maybeSingle();

    if (error) throw error;

    if (data && data.config && typeof data.config === "object") {
      config = clone(data.config);
    } else {
      config = {
        farm: { crops: {}, items: {} },
        gacha: { config: {}, pools: {} },
        monsters: { modes: {} },
        items: {},
        icons: {},
        loginRewards: {}
      };
    }

    config.items = config.items || {};
    config.farm = config.farm || { crops: {}, items: {} };
    config.farm.items = config.farm.items || {};
    return config;
  }

  async function saveConfig() {
    if (!window.supabaseClient) throw new Error("ไม่พบ Supabase Client");

    const { error } = await window.supabaseClient
      .from(TABLE)
      .upsert({ id: ROW_ID, config: config }, { onConflict: "id" });

    if (error) throw error;
  }

  function esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }

  function setStatus(message, isError=false) {
    const el = document.getElementById("adminLiveStatus");
    if (el) {
      el.textContent = message;
      el.style.color = isError ? "#b91c1c" : "#166534";
    }
  }

  function shell(title, inner) {
    return `
      <div class="dashboard-card">
        <h2>${title}</h2>
        <p id="adminLiveStatus">กำลังโหลดข้อมูลจาก Supabase...</p>
        ${inner}
      </div>
    `;
  }

  async function renderItems() {
    const root = document.getElementById("pageContent");
    root.innerHTML = shell("🎒 จัดการไอเทม", `
      <div style="display:grid;gap:10px;max-width:700px">
        <input id="newItemId" placeholder="ID ไอเทม เช่น iron_sword">
        <input id="newItemName" placeholder="ชื่อไอเทม">
        <input id="newItemIcon" placeholder="ไอคอน เช่น ⚔️">
        <input id="newItemPrice" type="number" min="0" placeholder="ราคา">
        <button id="addItemBtn">➕ เพิ่ม / บันทึกไอเทม</button>
      </div>
      <hr>
      <div id="itemList"></div>
    `);

    try {
      await loadConfig();
      drawItems();
      setStatus("โหลดข้อมูลสำเร็จ — การบันทึกจะเขียนลง Config กลางของเกม");
    } catch (e) {
      setStatus("โหลดข้อมูลไม่สำเร็จ: " + (e.message || e), true);
    }

    document.getElementById("addItemBtn").onclick = async () => {
      const id = document.getElementById("newItemId").value.trim();
      const name = document.getElementById("newItemName").value.trim();
      const icon = document.getElementById("newItemIcon").value.trim() || "🎁";
      const price = Math.max(0, Number(document.getElementById("newItemPrice").value || 0));

      if (!id || !name) {
        setStatus("กรุณากรอก ID และชื่อไอเทม", true);
        return;
      }

      config.items[id] = { ...(config.items[id] || {}), name, icon, price, enabled: true };

      try {
        await saveConfig();
        drawItems();
        setStatus("บันทึกไอเทมแล้ว เกมจะรับ Config กลางเมื่อโหลดใหม่");
      } catch (e) {
        setStatus("บันทึกไม่สำเร็จ: " + (e.message || e), true);
      }
    };
  }

  function drawItems() {
    const list = document.getElementById("itemList");
    if (!list) return;
    const rows = Object.entries(config.items || {});
    list.innerHTML = rows.length ? rows.map(([id, item]) => `
      <div style="padding:10px;border:1px solid #ddd;border-radius:8px;margin:8px 0">
        <b>${esc(item.icon || "🎁")} ${esc(item.name || id)}</b>
        <div>ID: ${esc(id)} | ราคา: ${Number(item.price || 0)}</div>
        <button data-delete-item="${esc(id)}">ลบไอเทม</button>
      </div>
    `).join("") : "<p>ยังไม่มีไอเทมใน Config กลาง</p>";

    list.querySelectorAll("[data-delete-item]").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.deleteItem;
        if (!confirm("ลบไอเทม " + id + " ?")) return;
        delete config.items[id];
        try {
          await saveConfig();
          drawItems();
          setStatus("ลบไอเทมและบันทึก Config แล้ว");
        } catch (e) {
          setStatus("ลบไม่สำเร็จ: " + (e.message || e), true);
        }
      };
    });
  }

  async function renderShop() {
    const root = document.getElementById("pageContent");
    root.innerHTML = shell("🛒 จัดการไอเทมวางขายในร้านค้า", `
      <p>หน้านี้แก้รายการ <code>adminConfig.items</code> ใน Config กลาง</p>
      <div id="shopList"></div>
      <button id="saveShopBtn">💾 บันทึกร้านค้าทั้งหมด</button>
    `);

    try {
      await loadConfig();
      drawShop();
      setStatus("โหลดร้านค้าสำเร็จ");
    } catch (e) {
      setStatus("โหลดข้อมูลไม่สำเร็จ: " + (e.message || e), true);
    }

    document.getElementById("saveShopBtn").onclick = async () => {
      try {
        document.querySelectorAll("[data-shop-price]").forEach(input => {
          const id = input.dataset.shopPrice;
          if (config.items[id]) config.items[id].price = Math.max(0, Number(input.value || 0));
        });
        document.querySelectorAll("[data-shop-enabled]").forEach(input => {
          const id = input.dataset.shopEnabled;
          if (config.items[id]) config.items[id].enabled = input.checked;
        });
        await saveConfig();
        setStatus("บันทึกร้านค้าแล้ว");
      } catch (e) {
        setStatus("บันทึกไม่สำเร็จ: " + (e.message || e), true);
      }
    };
  }

  function drawShop() {
    const list = document.getElementById("shopList");
    if (!list) return;
    const rows = Object.entries(config.items || {});
    list.innerHTML = rows.length ? rows.map(([id, item]) => `
      <div style="display:flex;gap:12px;align-items:center;padding:10px;border-bottom:1px solid #ddd;flex-wrap:wrap">
        <b style="min-width:180px">${esc(item.icon || "🎁")} ${esc(item.name || id)}</b>
        <label>ราคา <input type="number" min="0" value="${Number(item.price || 0)}" data-shop-price="${esc(id)}"></label>
        <label><input type="checkbox" ${item.enabled !== false ? "checked" : ""} data-shop-enabled="${esc(id)}"> วางขาย</label>
      </div>
    `).join("") : "<p>ยังไม่มีไอเทม ให้เพิ่มจากเมนูจัดการไอเทมก่อน</p>";
  }

  window.renderAdminPage = function(page) {
    if (page === "items") {
      renderItems();
      return true;
    }
    if (page === "shop") {
      renderShop();
      return true;
    }
    return false;
  };
})();
