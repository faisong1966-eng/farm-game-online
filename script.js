// V140 — dungeon pass ticket entry costs
const SAVE_KEY = "farm_game_v17";

const crops = {
  carrot:{name:"แครอท",icon:"🥕",stages:["🌰","🌱","🌿","🥕"],growMs:90000,sell:35,cost:10},
  tomato:{name:"มะเขือเทศ",icon:"🍅",stages:["🌰","🌱","🌿","🍅"],growMs:180000,sell:80,cost:25},
  lettuce:{name:"ผักกาดหอม",icon:"🥬",stages:["🌰","🌱","🌿","🥬"],growMs:75000,sell:30,cost:9},
  cabbage:{name:"กะหล่ำปลี",icon:"🥬",stages:["🌰","🌱","🌿","🥬"],growMs:150000,sell:65,cost:18},
  corn:{name:"ข้าวโพด",icon:"🌽",stages:["🌰","🌱","🌾","🌽"],growMs:210000,sell:95,cost:28},
  potato:{name:"มันฝรั่ง",icon:"🥔",stages:["🌰","🌱","🌿","🥔"],growMs:140000,sell:60,cost:16},
  onion:{name:"หัวหอม",icon:"🧅",stages:["🌰","🌱","🌿","🧅"],growMs:125000,sell:55,cost:15},
  garlic:{name:"กระเทียม",icon:"🧄",stages:["🌰","🌱","🌿","🧄"],growMs:115000,sell:50,cost:14},
  chili:{name:"พริก",icon:"🌶️",stages:["🌰","🌱","🌿","🌶️"],growMs:190000,sell:105,cost:30},
  cucumber:{name:"แตงกวา",icon:"🥒",stages:["🌰","🌱","🌿","🥒"],growMs:160000,sell:85,cost:24},
  pumpkin:{name:"ฟักทอง",icon:"🎃",stages:["🌰","🌱","🍃","🎃"],growMs:260000,sell:150,cost:42},
  watermelon:{name:"แตงโม",icon:"🍉",stages:["🌰","🌱","🍃","🍉"],growMs:300000,sell:190,cost:55},
  eggplant:{name:"มะเขือยาว",icon:"🍆",stages:["🌰","🌱","🌿","🍆"],growMs:200000,sell:115,cost:32},
  pea:{name:"ถั่วลันเตา",icon:"🫛",stages:["🌰","🌱","🌿","🫛"],growMs:135000,sell:72,cost:20},
  strawberry:{name:"สตรอว์เบอร์รี",icon:"🍓",stages:["🌰","🌱","🌿","🍓"],growMs:220000,sell:145,cost:40},
  radish:{name:"หัวไชเท้า",icon:"🔴",stages:["🌰","🌱","🌿","🔴"],growMs:80000,sell:42,cost:11},
  spinach:{name:"ผักโขม",icon:"🌿",stages:["🌰","🌱","🌿","🥬"],growMs:85000,sell:45,cost:12},
  broccoli:{name:"บรอกโคลี",icon:"🥦",stages:["🌰","🌱","🌿","🥦"],growMs:230000,sell:130,cost:36},
  bellpepper:{name:"พริกหวาน",icon:"🫑",stages:["🌰","🌱","🌿","🫑"],growMs:205000,sell:120,cost:34},
  sweetpotato:{name:"มันเทศ",icon:"🍠",stages:["🌰","🌱","🌿","🍠"],growMs:175000,sell:90,cost:25},
  mushroom:{name:"เห็ด",icon:"🍄",stages:["⚪","🌱","🍄","🍄"],growMs:100000,sell:70,cost:19},
  sunflower:{name:"ทานตะวัน",icon:"🌻",stages:["🌰","🌱","🌿","🌻"],growMs:240000,sell:140,cost:38},
  lavender:{name:"ลาเวนเดอร์",icon:"💜",stages:["🌰","🌱","🌿","💜"],growMs:250000,sell:160,cost:44},
  pineapple:{name:"สับปะรด",icon:"🍍",stages:["🌰","🌱","🌿","🍍"],growMs:320000,sell:230,cost:65},
  grape:{name:"องุ่น",icon:"🍇",stages:["🌰","🌱","🌿","🍇"],growMs:290000,sell:210,cost:58},
  apple:{name:"แอปเปิล",icon:"🍎",stages:["🌰","🌱","🌿","🍎"],growMs:360000,sell:280,cost:80},
  peach:{name:"ลูกพีช",icon:"🍑",stages:["🌰","🌱","🌿","🍑"],growMs:340000,sell:260,cost:72},
  coconut:{name:"มะพร้าว",icon:"🥥",stages:["🌰","🌱","🌿","🥥"],growMs:420000,sell:340,cost:95},
  beet:{name:"บีตรูต",icon:"🟣",stages:["🌰","🌱","🌿","🟣"],growMs:145000,sell:68,cost:18},
  celery:{name:"ขึ้นฉ่าย",icon:"🌿",stages:["🌰","🌱","🌿","🌿"],growMs:105000,sell:52,cost:14},
  corn2:{name:"ข้าวโพดหวาน",icon:"🌽",stages:["🌰","🌱","🌾","🌽"],growMs:230000,sell:120,cost:34},
  melon:{name:"เมลอน",icon:"🍈",stages:["🌰","🌱","🍃","🍈"],growMs:280000,sell:180,cost:50}
};

function getGrowthStage(plot) {
  const progress = Math.min(1, (Date.now() - plot.plantedAt) / plot.growMs);
  if (progress >= 1) return 3;
  if (progress >= 0.66) return 2;
  if (progress >= 0.33) return 1;
  return 0;
}

let state = loadState();

// V87: power ranks are C, B, A, S, SS, SS+, SSR, REGEN.
// Migrate the temporary V86 internal key so existing saves remain compatible.
function normalizePowerRank(rank){
  return rank === "SSPLUS" ? "SSPLUS" : rank;
}
if(state?.rpgCharacter){
  state.rpgCharacter.rarity = normalizePowerRank(state.rpgCharacter.rarity);
}
if(Array.isArray(state?.rpgPowers)){
  state.rpgPowers.forEach(p => { if(p) p.rarity = normalizePowerRank(p.rarity); });
}
if(Array.isArray(state?.rpgCharacters)){
  state.rpgCharacters.forEach(p => { if(p) p.rarity = normalizePowerRank(p.rarity); });
}


// V62 test wallet: keep one shared currency source and give the test account
// enough currency to exercise every shop/enhancement path.
// Preserve the existing shared wallet instead of overwriting it on every load.
state.coins = Number(state.coins ?? 0);
state.diamonds = Number(state.diamonds ?? 0);

// V139 PASS TICKET TIMER — serverless/offline-safe elapsed-time accrual.
// The timestamp is saved, so time keeps progressing while the game is closed.
const PASS_TICKET_INTERVAL_MS = 30 * 60 * 1000;
const PASS_TICKET_MAX = 120;
const CHALLENGE_COIN_INTERVAL_MS = 60 * 60 * 1000;
const CHALLENGE_COIN_MAX = 100;
const PVP_CHALLENGE_COIN_COST = 2;
state.rpgInventory = state.rpgInventory || {};
state.rpgInventory.passTicket = Math.max(0, Math.min(PASS_TICKET_MAX, Number(state.rpgInventory.passTicket ?? 0)));
state.rpgInventory.challengeCoin = Math.max(0, Math.min(CHALLENGE_COIN_MAX, Number(state.rpgInventory.challengeCoin ?? 0)));
state.passTicketLastTick = Number(state.passTicketLastTick || Date.now());
state.rpgInventory.challengeCoin = Math.max(0, Math.min(CHALLENGE_COIN_MAX, Number(state.rpgInventory.challengeCoin||0)));
state.challengeCoinLastTick = Number(state.challengeCoinLastTick || Date.now());
state.challengeCoinLastTick = Number(state.challengeCoinLastTick || Date.now());
if (!Number.isFinite(state.passTicketLastTick) || state.passTicketLastTick <= 0) state.passTicketLastTick = Date.now();
if (!Number.isFinite(state.challengeCoinLastTick) || state.challengeCoinLastTick <= 0) state.challengeCoinLastTick = Date.now();

// V176 — Tower daily entry limit: stored inside the account state, resets by local calendar date at 00:00.
state.towerDaily = state.towerDaily || {};
saveState();

const ITEM_VISUALS = {
  revivalPotion: `<span class="unified-item-icon revival"><span class="gold-revival-vial"><span></span></span></span>`,
  moonScroll: `<span class="unified-item-icon moon"><span class="moon-relic"><i></i></span></span>`,
  soulHammer: `<span class="unified-item-icon hammer"><span class="soul-hammer-icon"><b></b><i></i></span></span>`,
  hpPotion: `<span class="unified-item-icon"><span class="potion-icon hp-potion-icon"><i></i></span></span>`,
  manaPotion: `<span class="unified-item-icon"><span class="potion-icon mana-potion-icon"><i></i></span></span>`,
  enhancementScroll: `<span class="unified-item-icon emoji-item">📜</span>`,
  magicOrb: `<span class="unified-item-icon emoji-item">🔮</span>`,
  regenScroll: `<span class="unified-item-icon regen-scroll-visual"><span class="regen-scroll-paper"><i></i><b></b></span></span>`,
  universePowder: `<span class="unified-item-icon emoji-item">🌌</span>`,
  magicPowder: `<span class="unified-item-icon emoji-item">✨</span>`,
  powerBreakthrough: `<span class="unified-item-icon emoji-item power-breakthrough-visual">△</span>`,
  passTicket: `<span class="unified-item-icon emoji-item">🎫</span>`,
  challengeCoin: `<span class="unified-item-icon emoji-item">🪙</span>`
};
function itemVisual(key){ return ITEM_VISUALS[key] || `<span class="unified-item-icon emoji-item">📦</span>`; }
function syncUnifiedShopIcons(){
  document.querySelectorAll("[data-item-visual]").forEach(el=>{
    const key=el.dataset.itemVisual;
    el.innerHTML=itemVisual(key);
  });
}
function inlineItemVisual(key){
  return `<span class="inline-item-visual">${itemVisual(key)}</span>`;
}
function purchaseNotice(key,name,q){ return `${itemVisual(key)}<span>ได้รับ${name} x${q}</span>`; }

// โหมดทดสอบ: เติมทุนเริ่มต้น 10,000,000 เหรียญ + 10,000,000 เพชรให้ครั้งเดียว
// เพื่อทดสอบร้านค้า ตลาด ตีบวก และระบบต่าง ๆ โดยไม่เติมซ้ำทุกครั้งที่รีเฟรช
if (!state.__testFundsGranted) {
  state.coins = 10000000;
  state.diamonds = 10000000;
  state.__testFundsGranted = true;
}
state.diamonds = Number(state.diamonds ?? 0);
state.topupRequests = Array.isArray(state.topupRequests) ? state.topupRequests : [];
state.seeds = state.seeds || {};
Object.keys(crops).forEach(k => { state.seeds[k] = Number(state.seeds[k] ?? 0); });
saveState();
state.water = state.water ?? 3;
state.specialWater = state.specialWater ?? 0;
state.specialFertilizer = state.specialFertilizer ?? 0;

state.rpgInventory = state.rpgInventory || {
  revivalPotion: 0,
  moonScroll: 0,
  soulHammer: 0,
  hpPotion: 0,
  manaPotion: 0,
  enhancementScroll: 0,
  magicOrb: 0,
  regenScroll: 0
};
state.rpgInventory.enhancementScroll = Number(state.rpgInventory.enhancementScroll ?? 0);
state.rpgInventory.magicOrb = Number(state.rpgInventory.magicOrb ?? 0);
state.rpgInventory.regenScroll = Number(state.rpgInventory.regenScroll ?? 0);
// Normalize all RPG shop inventory fields after loading saved data.
state.rpgInventory.universePowder = Number(state.rpgInventory.universePowder ?? 0); state.rpgInventory.universePowder = Number(state.rpgInventory.universePowder ?? 0);
state.itemInventory = state.itemInventory || {};
state.marketListings = Array.isArray(state.marketListings) ? state.marketListings : [];
state.rpgEquipment = state.rpgEquipment || {
  head: {name:"หมวกนักเดินทาง", icon:"🪖", durability:100, level:1},
  body: {name:"เกราะนักเดินทาง", icon:"🛡️", durability:100, level:1},
  arms: {name:"ปลอกแขนนักเดินทาง", icon:"🦾", durability:100, level:1},
  legs: {name:"กางเกงนักเดินทาง", icon:"👖", durability:100, level:1},
  feet: {name:"รองเท้านักเดินทาง", icon:"🥾", durability:100, level:1},
  weapon: {name:"ดาบฝึกหัด", icon:"⚔️", durability:100, level:1}
};

// V63: every new player starts with a complete basic equipment set.
// Existing saves are upgraded in-place without replacing their current levels.
const EQUIPMENT_META = {
  head:{label:"หมวก", name:"หมวกนักเดินทาง", icon:"🪖"},
  body:{label:"เกราะ", name:"เกราะนักเดินทาง", icon:"🛡️"},
  arms:{label:"ปลอกแขน", name:"ปลอกแขนนักเดินทาง", icon:"🦾"},
  legs:{label:"กางเกง", name:"กางเกงนักเดินทาง", icon:"👖"},
  feet:{label:"รองเท้า", name:"รองเท้านักเดินทาง", icon:"🥾"},
  weapon:{label:"ดาบ", name:"ดาบฝึกหัด", icon:"⚔️"}
};

// V78 — equipment uses 1–8 stars; character rarity stays separate.
// V81 — Extreme equipment power scale.
// Star power is linear inside each tier: 2★ = 2x, 3★ = 3x ... 8★ = 8x.
// Tier gaps are intentionally enormous:
// WHITE 1★ < WHITE 8★ < ORANGE 1★ < ORANGE 8★ < RED 1★ < RED 8★.
const WEAPON_TIER_META={
  NORMAL:{label:"ระดับสามัญ",color:"#f4f4f4",starColor:"#ffffff",multiplier:100},
  ORANGE:{label:"ระดับอัคนี",color:"#ff9d3d",starColor:"#ff9d3d",multiplier:1000},
  RED:{label:"ระดับโลหิต",color:"#ff4b5f",starColor:"#ff4b5f",multiplier:10000}
};
const GACHA_CONFIG={NORMAL:{coinCost:100000,diamondCost:0},ORANGE:{coinCost:1000000,diamondCost:0},RED:{coinCost:0,diamondCost:100}};
const GACHA_POOLS={
 NORMAL:[
  {slot:"weapon",name:"ดาบฝึกหัด",icon:"⚔️",baseDamage:18},{slot:"weapon",name:"ดาบทหารใหม่",icon:"🗡️",baseDamage:20},
  {slot:"body",name:"เกราะผ้าฝึกหัด",icon:"🥋"},{slot:"head",name:"หมวกผ้าฝึกหัด",icon:"🪖"},{slot:"arms",name:"ปลอกแขนผ้าฝึกหัด",icon:"🦾"},{slot:"feet",name:"รองเท้าฝึกหัด",icon:"🥾"}],
 ORANGE:[
  {slot:"weapon",name:"ดาบเพลิงอัคนี",icon:"🔥⚔️",baseDamage:38},{slot:"weapon",name:"หอกสุริยัน",icon:"☀️🔱",baseDamage:42},
  {slot:"body",name:"เกราะเพลิงอัคนี",icon:"🔥🛡️"},{slot:"head",name:"หมวกอัคนี",icon:"🟠🪖"},{slot:"arms",name:"ปลอกแขนอัคนี",icon:"🟠🦾"},{slot:"feet",name:"รองเท้าอัคนี",icon:"🔥🥾"}],
 RED:[
  {slot:"weapon",name:"ดาบโลหิตราชัน",icon:"🩸⚔️",baseDamage:70},{slot:"weapon",name:"หอกจันทราแดง",icon:"🌙🔱",baseDamage:76},
  {slot:"body",name:"เกราะโลหิตราชัน",icon:"🩸🛡️"},{slot:"head",name:"มงกุฎโลหิต",icon:"👑"},{slot:"arms",name:"ปลอกแขนราชันโลหิต",icon:"🔴🦾"},{slot:"feet",name:"รองเท้าโลหิตราชัน",icon:"🩸🥾"}]
};
function weaponTierMeta(tier){return WEAPON_TIER_META[tier]||WEAPON_TIER_META.NORMAL}
function getWeaponTier(item){return WEAPON_TIER_META[item?.weaponTier]?item.weaponTier:"NORMAL"}
function getWeaponStars(item){return Math.max(1,Math.min(8,Number(item?.stars??item?.level??1)))}
function weaponStars(n){return Array.from({length:getWeaponStars({stars:n})},()=> "★").join("")}
function weaponStarHtml(n,tier="NORMAL"){const m=weaponTierMeta(tier);return `<span class="weapon-star-display" style="--star-color:${m.starColor}">${weaponStars(n)}</span>`}
function syncWeaponStarData(item){if(!item)return;item.weaponTier=getWeaponTier(item);item.stars=getWeaponStars(item);item.level=item.stars;item.rarity="NORMAL";item.regenRank=0}
function migrateGachaItemStats(item){if(!item||!String(item.id||"").startsWith("gacha-"))return;const tier=getWeaponTier(item),stars=getWeaponStars(item),scale=stars,m=weaponTierMeta(tier).multiplier;const pool=(GACHA_POOLS[tier]||[]).find(x=>x.name===item.name)||{};const slot=item.slot||pool.slot;const baseHp=slot==="body"?18:slot==="head"?8:slot==="arms"?7:slot==="feet"?5:0;const baseDef=slot==="body"?12:slot==="head"?6:slot==="arms"?7:slot==="feet"?5:0;item.baseDamage=Math.round((pool.baseDamage||0)*scale*m);item.bonusDamage=Math.max(0,Number(item.bonusDamage||0));item.bonusHp=Math.round(baseHp*scale*m);item.bonusDef=Math.round(baseDef*scale*m);item.gachaStatModel=4}
function ensureGachaCollection(){state.rpgEquipmentCollection=Array.isArray(state.rpgEquipmentCollection)?state.rpgEquipmentCollection:[];state.rpgEquipmentCollection.forEach(item=>{if(item.gachaStatModel!==4)migrateGachaItemStats(item);item.bonusDamage=Math.max(0,Number(item.bonusDamage||0));syncWeaponStarData(item)});return state.rpgEquipmentCollection}
function gachaStarRoll(){const r=Math.random();if(r<.28)return 1;if(r<.50)return 2;if(r<.68)return 3;if(r<.82)return 4;if(r<.91)return 5;if(r<.96)return 6;if(r<.99)return 7;return 8}
function createGachaItem(tier){const p=GACHA_POOLS[tier],b=p[Math.floor(Math.random()*p.length)],stars=gachaStarRoll(),scale=stars,m=weaponTierMeta(tier).multiplier;const baseHp=b.slot==="body"?18:b.slot==="head"?8:b.slot==="arms"?7:b.slot==="feet"?5:0;const baseDef=b.slot==="body"?12:b.slot==="head"?6:b.slot==="arms"?7:b.slot==="feet"?5:0;return {id:`gacha-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,slot:b.slot,name:b.name,icon:b.icon,weaponTier:tier,stars,level:stars,durability:100,broken:false,rarity:"NORMAL",regenRank:0,baseDamage:Math.round((b.baseDamage||0)*scale*m),bonusDamage:0,bonusHp:Math.round(baseHp*scale*m),bonusDef:Math.round(baseDef*scale*m),gachaStatModel:4}}

const RARITY_META = {
  NORMAL:{label:"NORMAL",short:"N",color:"#f1f1f1",multiplier:1},
  C:{label:"C",short:"C",color:"#8fd0ff",multiplier:3},
  B:{label:"B",short:"B",color:"#67e58d",multiplier:9},
  A:{label:"A",short:"A",color:"#b58cff",multiplier:27},
  S:{label:"S",short:"S",color:"#ffd45e",multiplier:81},
  SS:{label:"SS",short:"SS",color:"#ff9c5e",multiplier:243},
  SSPLUS:{label:"SS+",short:"SS+",color:"#ff6de0",multiplier:729},
  SSR:{label:"SSR",short:"SSR",color:"#ff4d70",multiplier:2187},
  REGEN:{label:"REGEN",short:"REGEN",color:"#72e8ff",multiplier:6561}
};
const RARITY_ORDER=["NORMAL","C","B","A","S","SS","SSPLUS","SSR","REGEN"];

// V75: Character progression is now the source of skills and character rarity.
// Existing weapon rarity/REGEN is migrated once so old saves keep their progress.
state.rpgCharacter = state.rpgCharacter || {
  name: "ผู้พิทักษ์พเนจร",
  rarity: state.rpgEquipment?.weapon?.rarity || "NORMAL",
  regenRank: 0,
  stars: Math.max(1, Math.min(8, Number(state.rpgEquipment?.weapon?.stars || state.rpgEquipment?.weapon?.level || 1))),
  weaponTier: state.rpgEquipment?.weapon?.weaponTier || "NORMAL",
  level: 1,
  xp: 0,
  nextXp: 100
};
state.rpgCharacter.rarity = RARITY_META[state.rpgCharacter.rarity] ? state.rpgCharacter.rarity : "NORMAL";
state.rpgCharacter.regenRank = Math.max(0, Number(state.rpgCharacter.regenRank || 0));
state.rpgCharacter.level = Math.max(1, Math.min(200, Number(state.rpgCharacter.level || 1)));
state.rpgCharacter.xp = Math.max(0, Number(state.rpgCharacter.xp || 0));
state.rpgCharacter.nextXp = Math.max(100, Number(state.rpgCharacter.nextXp || 100));
saveState();
// V83 — Character roster: rarity/skills now belong to the hero.
// Existing saves keep their current hero and progression; newly pulled heroes start at Lv.1.
const HERO_DEFS = {
  c_wanderer:{
    id:"c_wanderer", name:"ไคเรน นักพเนจร", rarity:"C", icon:"🧑‍🌾", visual:{cloak:"#3f8a68",trim:"#9de2bb",hair:"#173a2d",accent:"#6ee8ae",skin:"#e8b992"},
    skills:[
      {name:"ลมดาบ",icon:"🌪️",key:"Q",mana:18,cd:3.5,color:"#9de8ff",desc:"ปล่อยคมลมระยะสั้น",range:145,damage:38},
      {name:"หมัดพายุ",icon:"👊",key:"1",mana:24,cd:5,color:"#7ed7ff",desc:"กระแทกศัตรูรอบตัว",range:125,damage:58},
      {name:"เกราะใบไม้",icon:"🍃",key:"2",mana:28,cd:7,color:"#7cff9c",desc:"เพิ่มพลังป้องกันชั่วคราว",range:115,damage:45},
      {name:"พุ่งเงา",icon:"💨",key:"3",mana:32,cd:8,color:"#b7b0ff",desc:"พุ่งเข้าหาศัตรู",range:190,damage:66},
      {name:"ดาวตก",icon:"☄️",key:"4",mana:45,cd:10,color:"#ffd36a",desc:"เรียกดาวตกโจมตีวงกว้าง",range:220,damage:92}
    ]
  },
  b_flame:{
    id:"b_flame", name:"เซร่า นักรบเพลิง", rarity:"B", icon:"🔥", visual:{cloak:"#6e2f24",trim:"#ffb05d",hair:"#2a1512",accent:"#ff7048",skin:"#f0b58f"},
    skills:[
      {name:"เปลวฟัน",icon:"🔥",key:"Q",mana:20,cd:3.2,color:"#ff8b4d",desc:"ฟันเป็นแนวเปลวไฟ",range:155,damage:72},
      {name:"ระเบิดเพลิง",icon:"💥",key:"1",mana:32,cd:5.2,color:"#ff5a24",desc:"ระเบิดรอบตัว",range:175,damage:105},
      {name:"โล่เถ้าถ่าน",icon:"🛡️",key:"2",mana:30,cd:7,color:"#ffb34f",desc:"ปล่อยคลื่นเถ้าร้อน",range:140,damage:82},
      {name:"ก้าวอัคคี",icon:"🔥",key:"3",mana:38,cd:7.5,color:"#ff6a2a",desc:"พุ่งทะลวงศัตรู",range:215,damage:128},
      {name:"ราชันเพลิง",icon:"🌋",key:"4",mana:55,cd:10,color:"#ffd36a",desc:"ระเบิดภูเขาไฟขนาดใหญ่",range:245,damage:190}
    ]
  },
  a_frost:{
    id:"a_frost", name:"ลูเมีย จอมเวทน้ำแข็ง", rarity:"A", icon:"❄️", visual:{cloak:"#244a68",trim:"#a9eaff",hair:"#dff7ff",accent:"#75dfff",skin:"#f3c8ae"},
    skills:[
      {name:"เข็มน้ำแข็ง",icon:"❄️",key:"Q",mana:22,cd:3,color:"#8fe8ff",desc:"ยิงผลึกน้ำแข็ง",range:190,damage:110},
      {name:"พายุหิมะ",icon:"🌨️",key:"1",mana:38,cd:5.5,color:"#b8f5ff",desc:"เรียกพายุหิมะ",range:205,damage:165},
      {name:"กำแพงเยือกแข็ง",icon:"🧊",key:"2",mana:34,cd:7,color:"#d7fbff",desc:"สร้างแรงกระแทกเย็นจัด",range:150,damage:130},
      {name:"แฟลชน้ำแข็ง",icon:"💠",key:"3",mana:42,cd:8,color:"#77dfff",desc:"เคลื่อนที่ด้วยผลึกน้ำแข็ง",range:230,damage:190},
      {name:"ศูนย์องศา",icon:"🌌",key:"4",mana:62,cd:11,color:"#c8faff",desc:"แช่แข็งพื้นที่ขนาดใหญ่",range:270,damage:280}
    ]
  },
  s_shadow:{
    id:"s_shadow", name:"เรเวน นักล่าเงา", rarity:"S", icon:"🦅", visual:{cloak:"#2b2348",trim:"#c9a8ff",hair:"#15121f",accent:"#9b6cff",skin:"#dcae9c"},
    skills:[
      {name:"คมเงา",icon:"🌑",key:"Q",mana:24,cd:2.8,color:"#b88cff",desc:"ฟันด้วยเงามืด",range:170,damage:190},
      {name:"เงาพันธนาการ",icon:"⛓️",key:"1",mana:40,cd:5,color:"#8d68ff",desc:"ตรึงศัตรูด้วยเงา",range:210,damage:275},
      {name:"หายตัว",icon:"🫥",key:"2",mana:35,cd:7,color:"#d4c4ff",desc:"ระเบิดเงารอบตัว",range:150,damage:225},
      {name:"ก้าวทมิฬ",icon:"🌀",key:"3",mana:48,cd:7.5,color:"#7548ff",desc:"พุ่งโจมตีหลายจุด",range:245,damage:330},
      {name:"คืนจันทรา",icon:"🌙",key:"4",mana:70,cd:11,color:"#e0caff",desc:"เรียกจันทร์มืดถล่มพื้นที่",range:290,damage:500}
    ]
  },
  ss_thunder:{
    id:"ss_thunder", name:"อาร์คัส ผู้พิทักษ์สายฟ้า", rarity:"SS", icon:"⚡", visual:{cloak:"#303d70",trim:"#b8d5ff",hair:"#f2f6ff",accent:"#6cb6ff",skin:"#efc0a5"},
    skills:[
      {name:"สายฟ้าฟาด",icon:"⚡",key:"Q",mana:26,cd:2.6,color:"#8fe8ff",desc:"เรียกสายฟ้าลงเป้าหมาย",range:210,damage:360},
      {name:"โซ่สายฟ้า",icon:"🔗",key:"1",mana:44,cd:5,color:"#72c9ff",desc:"สายฟ้ากระเด้งต่อเนื่อง",range:235,damage:500},
      {name:"พายุอัสนี",icon:"🌩️",key:"2",mana:40,cd:7,color:"#b5e7ff",desc:"ระเบิดสายฟ้ารอบตัว",range:175,damage:420},
      {name:"เทเลพอร์ตฟ้า",icon:"💫",key:"3",mana:52,cd:7.5,color:"#83aaff",desc:"วาร์ปและปล่อยสายฟ้า",range:265,damage:600},
      {name:"เทพอัสนี",icon:"⚡",key:"4",mana:78,cd:11,color:"#fff0a8",desc:"มหาสายฟ้าถล่มทั้งพื้นที่",range:310,damage:900}
    ]
  },
  ssplus_dragon:{
    id:"ssplus_dragon", name:"ดราเคน ราชันมังกร", rarity:"SSPLUS", icon:"🐉", visual:{cloak:"#5b2634",trim:"#ffbf7d",hair:"#3a101b",accent:"#ff5f52",skin:"#efb28e"},
    skills:[
      {name:"กรงเล็บมังกร",icon:"🐉",key:"Q",mana:28,cd:2.5,color:"#ff8b63",desc:"ฟาดกรงเล็บพลังมังกร",range:185,damage:620},
      {name:"ลมหายใจมังกร",icon:"🔥",key:"1",mana:48,cd:5,color:"#ff6038",desc:"พ่นเปลวไฟเป็นลำแสง",range:255,damage:900},
      {name:"เกล็ดสะท้อน",icon:"🛡️",key:"2",mana:44,cd:7,color:"#ffcb79",desc:"ระเบิดพลังจากเกล็ด",range:180,damage:760},
      {name:"บินทะลวง",icon:"🪽",key:"3",mana:58,cd:7.5,color:"#ff7a4f",desc:"พุ่งผ่านศัตรู",range:285,damage:1100},
      {name:"อุกกาบาตมังกร",icon:"☄️",key:"4",mana:86,cd:11,color:"#ffe08a",desc:"เรียกอุกกาบาตมังกร",range:335,damage:1800}
    ]
  },
  ssr_celestia:{
    id:"ssr_celestia", name:"เซเลสเทีย เทพดารา", rarity:"SSR", icon:"🌟", visual:{cloak:"#3d2f72",trim:"#ffe9a8",hair:"#fff5d8",accent:"#ffdd70",skin:"#f4c9b5"},
    skills:[
      {name:"แสงดาว",icon:"✨",key:"Q",mana:30,cd:2.4,color:"#fff0a8",desc:"ยิงประกายดาว",range:230,damage:1100},
      {name:"ฝนดาวตก",icon:"🌠",key:"1",mana:55,cd:5,color:"#ffd36a",desc:"เรียกฝนดาวตก",range:290,damage:1600},
      {name:"วงแหวนสุริยะ",icon:"☀️",key:"2",mana:50,cd:7,color:"#fff3b0",desc:"ปล่อยคลื่นพลังแสง",range:205,damage:1400},
      {name:"ประตูดารา",icon:"🪐",key:"3",mana:65,cd:7.5,color:"#cbb6ff",desc:"เปิดประตูมิติถล่มศัตรู",range:320,damage:2100},
      {name:"ซูเปอร์โนวา",icon:"💥",key:"4",mana:95,cd:11,color:"#ffffff",desc:"ระเบิดพลังระดับดวงดาว",range:370,damage:3400}
    ]
  },
  regen_aeon:{
    id:"regen_aeon", name:"เอออน ผู้เหนือกาลเวลา", rarity:"REGEN", icon:"♾️", visual:{cloak:"#173f49",trim:"#8ffff2",hair:"#d7ffff",accent:"#72e8ff",skin:"#eac8b6"},
    skills:[
      {name:"รอยแยกเวลา",icon:"⏳",key:"Q",mana:34,cd:2.2,color:"#8ffff2",desc:"ฉีกเวลาโจมตีศัตรู",range:250,damage:3000},
      {name:"หยุดกาลเวลา",icon:"🕰️",key:"1",mana:60,cd:5,color:"#72e8ff",desc:"คลื่นพลังหยุดเวลา",range:310,damage:4500},
      {name:"ย้อนชะตา",icon:"🔄",key:"2",mana:55,cd:7,color:"#b8fff8",desc:"ระเบิดพลังย้อนกลับ",range:230,damage:3800},
      {name:"จักรวาลพังทลาย",icon:"🌌",key:"3",mana:72,cd:7.5,color:"#9ec9ff",desc:"ฉีกมิติทั้งสนาม",range:350,damage:6000},
      {name:"อนันตกาล",icon:"♾️",key:"4",mana:110,cd:11,color:"#fffbd0",desc:"มหาพลังเหนือกาลเวลา",range:420,damage:10000}
    ]
  }
};

// V86 — POWER SYSTEM: character gender is fixed at signup; skills come from the equipped power.
const POWER_TIER_META = {
  C:{label:"C",name:"พลังเริ่มต้น",short:"C",color:"#d8e2ea",multiplier:1},
  B:{label:"B",name:"พลังชั้นสูง",short:"B",color:"#67e58d",multiplier:3},
  A:{label:"A",name:"พลังหายาก",short:"A",color:"#b58cff",multiplier:9},
  S:{label:"S",name:"พลังพิเศษ",short:"S",color:"#ffd45e",multiplier:27},
  SS:{label:"SS",name:"พลังมหากาพย์",short:"SS",color:"#ff9c5e",multiplier:81},
  SSPLUS:{label:"SS+",name:"พลังราชัน",short:"SS+",color:"#ff6de0",multiplier:243},
  SSR:{label:"SSR",name:"พลังเทวะ",short:"SSR",color:"#ff4d70",multiplier:729},
  REGEN:{label:"REGEN",name:"พลังเหนือขีดจำกัด",short:"REGEN",color:"#72e8ff",multiplier:2187}
}
const POWER_DEFS = {
  power_lightning:{id:"power_lightning",name:"สายฟ้าอัสนี",rarity:"C",type:"lightning",icon:"⚡",skills:[
    {name:"ประกายฟ้า",icon:"⚡",key:"Q",mana:18,cd:3.0,color:"#aeeaff",range:190,damage:55,desc:"ปล่อยสายฟ้าใส่เป้าหมาย"},
    {name:"โซ่อัสนี",icon:"🔗",key:"1",mana:26,cd:5.0,color:"#7fd6ff",range:210,damage:80,desc:"สายฟ้ากระเด้งระหว่างศัตรู"},
    {name:"พายุไฟฟ้า",icon:"🌩️",key:"2",mana:34,cd:7.0,color:"#9fc8ff",range:170,damage:115,desc:"ระเบิดสายฟ้ารอบตัว"},
    {name:"ก้าวสายฟ้า",icon:"💫",key:"3",mana:42,cd:8.0,color:"#8fb7ff",range:235,damage:150,desc:"พุ่งพร้อมทิ้งกระแสไฟ"},
    {name:"มหาอัสนี",icon:"⚡",key:"4",mana:65,cd:12.0,color:"#fff1a8",range:300,damage:260,desc:"Ultimate — ฟ้าผ่าขนาดใหญ่"}
  ]},
  power_fire:{id:"power_fire",name:"เปลวเพลิง",rarity:"B",type:"fire",icon:"🔥",skills:[
    {name:"เปลวพุ่ง",icon:"🔥",key:"Q",mana:20,cd:3.0,color:"#ffad62",range:175,damage:85,desc:"ยิงเปลวไฟระยะกลาง"},
    {name:"ระเบิดอัคคี",icon:"💥",key:"1",mana:30,cd:5.0,color:"#ff7338",range:180,damage:125,desc:"ระเบิดไฟรอบเป้าหมาย"},
    {name:"กำแพงเพลิง",icon:"🧱",key:"2",mana:36,cd:7.0,color:"#ffbd4a",range:155,damage:150,desc:"สร้างกำแพงไฟ"},
    {name:"ก้าวอัคคี",icon:"🔥",key:"3",mana:45,cd:8.0,color:"#ff5a28",range:245,damage:190,desc:"พุ่งทะลุพร้อมเผาไหม้"},
    {name:"นรกเพลิง",icon:"🌋",key:"4",mana:72,cd:12.0,color:"#ffe18a",range:315,damage:340,desc:"Ultimate — เปิดประตูนรก"}
  ]},
  power_storm:{id:"power_storm",name:"พายุวายุ",rarity:"A",type:"storm",icon:"🌪️",skills:[
    {name:"คมวายุ",icon:"🌬️",key:"Q",mana:22,cd:2.8,color:"#b6f0ff",range:190,damage:120,desc:"คมลมพุ่งเป็นเส้น"},
    {name:"วังวน",icon:"🌀",key:"1",mana:32,cd:5.2,color:"#91e4ff",range:185,damage:175,desc:"ดูดศัตรูเข้าสู่วังวน"},
    {name:"ลมกระแทก",icon:"💨",key:"2",mana:38,cd:7.0,color:"#d7f8ff",range:160,damage:150,desc:"ระเบิดแรงลมรอบตัว"},
    {name:"เหินวายุ",icon:"🪽",key:"3",mana:46,cd:8.0,color:"#8fdcff",range:255,damage:225,desc:"พุ่งตามกระแสลม"},
    {name:"มหาพายุ",icon:"🌪️",key:"4",mana:75,cd:12.0,color:"#e8ffff",range:330,damage:390,desc:"Ultimate — พายุหมุนขนาดมหึมา"}
  ]},
  power_ice:{id:"power_ice",name:"เหมันต์น้ำแข็ง",rarity:"S",type:"ice",icon:"❄️",skills:[
    {name:"เข็มเหมันต์",icon:"❄️",key:"Q",mana:24,cd:2.8,color:"#bff8ff",range:205,damage:180,desc:"ยิงผลึกน้ำแข็ง"},
    {name:"พายุหิมะ",icon:"🌨️",key:"1",mana:38,cd:5.5,color:"#d8ffff",range:220,damage:250,desc:"เรียกหิมะถล่ม"},
    {name:"กำแพงเยือกแข็ง",icon:"🧊",key:"2",mana:40,cd:7.0,color:"#9fefff",range:175,damage:220,desc:"สร้างคลื่นน้ำแข็ง"},
    {name:"แฟลชเยือกแข็ง",icon:"💠",key:"3",mana:52,cd:8.0,color:"#a5d8ff",range:270,damage:320,desc:"เคลื่อนที่ด้วยผลึก"},
    {name:"ศูนย์องศา",icon:"🌌",key:"4",mana:82,cd:12.5,color:"#f3ffff",range:340,damage:560,desc:"Ultimate — หยุดทุกสิ่งในเขต"}
  ]},
  power_poison:{id:"power_poison",name:"พิษอเวจี",rarity:"SS",type:"poison",icon:"☠️",skills:[
    {name:"เขี้ยวพิษ",icon:"☠️",key:"Q",mana:25,cd:2.8,color:"#b8ff79",range:185,damage:280,desc:"โจมตีพร้อมพิษ"},
    {name:"หมอกพิษ",icon:"🟢",key:"1",mana:42,cd:5.5,color:"#78ef71",range:210,damage:390,desc:"สร้างหมอกพิษ"},
    {name:"หนามอเวจี",icon:"🌿",key:"2",mana:46,cd:7.0,color:"#9bff63",range:175,damage:350,desc:"หนามพิษพุ่งจากพื้น"},
    {name:"ร่างพิษ",icon:"🧪",key:"3",mana:56,cd:8.0,color:"#d2ff73",range:260,damage:470,desc:"ระเบิดพิษรอบตัว"},
    {name:"มหาพิษ",icon:"☠️",key:"4",mana:90,cd:13.0,color:"#e5ff9a",range:345,damage:820,desc:"Ultimate — ม่านพิษอเวจี"}
  ]},
  power_nature:{id:"power_nature",name:"พฤกษาศักดิ์สิทธิ์",rarity:"SSPLUS",type:"nature",icon:"🌿",skills:[
    {name:"เถาวัลย์",icon:"🌿",key:"Q",mana:26,cd:2.8,color:"#8dff91",range:190,damage:420,desc:"เถาวัลย์ฟาดเป้าหมาย"},
    {name:"หนามพฤกษา",icon:"🌱",key:"1",mana:44,cd:5.5,color:"#67ef86",range:220,damage:560,desc:"หนามพุ่งจากพื้น"},
    {name:"วงฟื้นฟู",icon:"🍃",key:"2",mana:48,cd:7.0,color:"#b7ffb0",range:165,damage:480,desc:"พลังธรรมชาติระเบิดออก"},
    {name:"ราชาวัลย์",icon:"🌳",key:"3",mana:58,cd:8.0,color:"#6cff8e",range:275,damage:700,desc:"เรียกต้นไม้ยักษ์โจมตี"},
    {name:"ป่าพิพากษา",icon:"🌳",key:"4",mana:96,cd:13.0,color:"#d6ffd2",range:355,damage:1200,desc:"Ultimate — ป่าศักดิ์สิทธิ์กลืนสนาม"}
  ]},
  power_void:{id:"power_void",name:"ความว่างเปล่า",rarity:"SSR",type:"void",icon:"🌑",skills:[
    {name:"คมสูญ",icon:"🌑",key:"Q",mana:28,cd:2.6,color:"#d0b6ff",range:205,damage:720,desc:"ตัดมิติใส่เป้าหมาย"},
    {name:"หลุมดำ",icon:"⚫",key:"1",mana:48,cd:5.5,color:"#a77cff",range:230,damage:900,desc:"สร้างแรงดูดจากความว่าง"},
    {name:"รอยแยก",icon:"🕳️",key:"2",mana:52,cd:7.0,color:"#e0c7ff",range:185,damage:820,desc:"ฉีกพื้นเป็นรอยแยก"},
    {name:"ก้าวมิติ",icon:"🌀",key:"3",mana:62,cd:8.0,color:"#8e6cff",range:290,damage:1100,desc:"ทะลุมิติไปยังศัตรู"},
    {name:"สูญสิ้น",icon:"🌑",key:"4",mana:105,cd:13.5,color:"#f2e5ff",range:365,damage:1900,desc:"Ultimate — ลบล้างพื้นที่"}
  ]},
  power_celestial:{id:"power_celestial",name:"ดาราเทวะ",rarity:"REGEN",type:"celestial",icon:"🌟",skills:[
    {name:"ดาวตก",icon:"☄️",key:"Q",mana:30,cd:2.5,color:"#ffe9a4",range:215,damage:1200,desc:"เรียกดาวตกลงเป้าหมาย"},
    {name:"ฝนดารา",icon:"🌠",key:"1",mana:52,cd:5.5,color:"#fff0bd",range:240,damage:1500,desc:"ดาวตกหลายสาย"},
    {name:"วงแหวนสวรรค์",icon:"✨",key:"2",mana:58,cd:7.0,color:"#c9d9ff",range:195,damage:1400,desc:"วงพลังสวรรค์ระเบิด"},
    {name:"ประตูดารา",icon:"🪐",key:"3",mana:70,cd:8.0,color:"#d8c9ff",range:305,damage:1800,desc:"เปิดประตูดาราโจมตี"},
    {name:"จักรวาลพิพากษา",icon:"🌌",key:"4",mana:120,cd:14.0,color:"#ffffff",range:390,damage:3200,desc:"Ultimate — พลังจักรวาลถล่มสนาม"}
  ]}
};
const POWER_IDS_BY_RARITY = Object.fromEntries(Object.values(POWER_DEFS).map(p=>[p.rarity,p.id]));
function getActivePowerDef(){
  const p=state.rpgCharacter?.powerId ? POWER_DEFS[state.rpgCharacter.powerId] : null;
  return p || POWER_DEFS.power_lightning;
}
function getPowerMeta(power=state.rpgCharacter){
  return POWER_TIER_META[power?.rarity] || POWER_TIER_META.C;
}


// V86 migration: keep old save data, but expose only gender + equipped power.
state.gender = (state.gender==="female" || state.gender==="male") ? state.gender : "male";
if(!state.rpgCharacter) state.rpgCharacter={name:"ผู้พิทักษ์",level:1,xp:0,nextXp:100,rarity:"C"};
state.rpgCharacter.level=Math.max(1,Math.min(200,Number(state.rpgCharacter.level||1)));
state.rpgCharacter.xp=Math.max(0,Number(state.rpgCharacter.xp||0));
state.rpgCharacter.nextXp=Math.max(100,Number(state.rpgCharacter.nextXp||100));
if(!state.rpgCharacter.powerId || !POWER_DEFS[state.rpgCharacter.powerId]){
  const fallback=POWER_IDS_BY_RARITY[state.rpgCharacter.rarity] || "power_lightning";
  state.rpgCharacter.powerId=fallback;
}
state.rpgCharacter.rarity=POWER_DEFS[state.rpgCharacter.powerId]?.rarity || "C";
state.rpgCharacter.powerName=POWER_DEFS[state.rpgCharacter.powerId]?.name || "สายฟ้าอัสนี";
state.rpgCharacter.skills=POWER_DEFS[state.rpgCharacter.powerId]?.skills.map(s=>({...s})) || [];
if(!Array.isArray(state.rpgPowers)) state.rpgPowers=[];
if(!state.rpgPowers.some(p=>p.id===state.rpgCharacter.powerId)){
  state.rpgPowers.push({...state.rpgCharacter, type:"power"});
}

const HERO_RARITY_ORDER=["C","B","A","S","SS","SSPLUS","SSR","REGEN"];
const HERO_RARITY_META={C:{label:"C",color:"#8fd0ff",multiplier:3},B:{label:"B",color:"#67e58d",multiplier:9},A:{label:"A",color:"#b58cff",multiplier:27},S:{label:"S",color:"#ffd45e",multiplier:81},SS:{label:"SS",color:"#ff9c5e",multiplier:243},SSPLUS:{label:"SS+",color:"#ff6de0",multiplier:729},SSR:{label:"SSR",color:"#ff4d70",multiplier:2187},REGEN:{label:"REGEN",color:"#72e8ff",multiplier:6561}};

function ensureHeroRoster(){
  // Legacy name kept for compatibility with existing button handlers.
  if(!Array.isArray(state.rpgCharacters)) state.rpgCharacters=[];
  if(!Array.isArray(state.rpgPowers)) state.rpgPowers=[];
  const activeId=state.rpgCharacter?.powerId || "power_lightning";
  const def=POWER_DEFS[activeId]||POWER_DEFS.power_lightning;
  if(!state.rpgPowers.some(p=>p.id===activeId)){
    state.rpgPowers.push({
      id:activeId,powerId:activeId,name:def.name,icon:def.icon,rarity:def.rarity,
      level:Math.max(1,Math.min(200,Number(state.rpgCharacter?.level||1))),
      xp:Number(state.rpgCharacter?.xp||0),nextXp:Number(state.rpgCharacter?.nextXp||100),
      skills:def.skills.map(s=>({...s})),type:"power"
    });
  }
  // The old roster becomes a compatibility mirror, not a visible hero collection.
  state.rpgCharacters=state.rpgPowers;
  const active=state.rpgPowers.find(p=>p.id===activeId)||state.rpgPowers[0];
  if(active){
    state.rpgCharacter=active;
    state.rpgCharacter.powerId=active.powerId||active.id;
    state.rpgCharacter.rarity=POWER_DEFS[state.rpgCharacter.powerId]?.rarity||"C";
    state.rpgCharacter.powerName=POWER_DEFS[state.rpgCharacter.powerId]?.name||active.name;
    state.rpgCharacter.skills=POWER_DEFS[state.rpgCharacter.powerId]?.skills.map(s=>({...s}))||[];
  }
  return state.rpgPowers;
}
ensureHeroRoster();

function heroScore(h){
  const r=HERO_RARITY_META[h?.rarity]?.multiplier||3;
  return r*100000 + Number(h?.level||1)*1000 + Number(h?.xp||0);
}
function getActiveHeroDef(){
  ensureHeroRoster();
  return getActivePowerDef();
}
function syncActiveHeroRuntime(resetVitals=true){
  ensureHeroRoster();
  const h=state.rpgCharacter;
  rpg.player.level=Math.max(1,Math.min(200,Number(h.level||1)));
  rpg.player.xp=Math.max(0,Number(h.xp||0));
  rpg.player.nextXp=Math.max(100,Number(h.nextXp||100));
  if(resetVitals){
    rpg.player.maxHp=getEffectiveCharacterMaxHp();
    rpg.player.maxMana=getEffectiveCharacterMaxMana();
    rpg.player.hp=rpg.player.maxHp;
    rpg.player.mana=rpg.player.maxMana;
  }
  rpg.player.skillCds=[0,0,0,0,0];
  rpg.player.selectedSkill=0;
  skillDefs=getActivePowerDef().skills;
}

// V101: equipment slots may now remain empty after the player unequips everything.
// Keep the old starter equipment only for saves migrating into V101; never recreate removed gear later.
state.rpgEquipment=state.rpgEquipment||{};
for(const [slot,meta] of Object.entries(EQUIPMENT_META)){
  if(!state.v101EquipmentSlotsCanBeEmpty && !state.rpgEquipment[slot]){
    state.rpgEquipment[slot]={...meta,durability:100,level:1};
  }
  const item=state.rpgEquipment[slot];
  if(!item) continue;
  item.name=item.name||meta.name; item.icon=item.icon||meta.icon;
  item.level=Math.max(1,Number(item.level||1));
  item.durability=Math.max(0,Math.min(100,Number(item.durability??100)));
  item.rarity=RARITY_META[item.rarity]?item.rarity:"NORMAL";
  item.regenRank=0;
  item.weaponTier=WEAPON_TIER_META[item.weaponTier]?item.weaponTier:"NORMAL";
  item.stars=Math.max(1,Math.min(8,Number(item.stars||item.level||1)));
  item.level=item.stars;
  item.broken=Boolean(item.broken||item.durability<=0);
}
state.v101EquipmentSlotsCanBeEmpty=true;
// One-time migration: rarity/REGEN belongs to the character now. The weapon keeps its level,
// durability, breakage and enhancement history, but no longer displays a rarity tier.
if(!state.__v75CharacterRarityMigrated){
  const oldWeapon=state.rpgEquipment?.weapon;
  if(oldWeapon){
    state.rpgCharacter.rarity=RARITY_META[oldWeapon.rarity]?oldWeapon.rarity:state.rpgCharacter.rarity;
    state.rpgCharacter.regenRank=Math.max(Number(state.rpgCharacter.regenRank||0),Number(oldWeapon.regenRank||0));
    oldWeapon.rarity="NORMAL";
    oldWeapon.regenRank=0;
    oldWeapon.broken=Boolean(oldWeapon.broken||oldWeapon.durability<=0);
  }
  state.rpgWeapon=state.rpgWeapon||{};
  state.rpgWeapon.rarity="NORMAL";
  state.rpgWeapon.regenRank=0;
  state.__v75CharacterRarityMigrated=true;
}
saveState();

function defaultState() {
  const seeds = {};
  Object.keys(crops).forEach(k => seeds[k] = 0);
  seeds.carrot = 2;
  return {
    username: "", coins: 100, diamonds: 0, fertilizer: 3, specialFertilizer: 0, water: 3, specialWater: 0,
    seeds, plots: Array.from({ length: 8 }, () => null), topupRequests: []
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    return saved ? saved : defaultState();
  } catch {
    return defaultState();
  }
}

function syncCurrencyDisplays() {
  // SINGLE SOURCE OF TRUTH:
  // เหรียญและเพชรทั้งหมดต้องอ่านจาก state กลางเท่านั้น
  const coins = Number(state?.coins ?? 0);
  const diamonds = Number(state?.diamonds ?? 0);
  const coinIds = [
    "coins", "farmShopCoins", "rpgCoins", "characterTopupCoins",
    "marketCoins", "blacksmithCoins", "rpgShopCoins", "adventurerShopCoins", "bagCoins"
  ];
  const diamondIds = [
    "diamonds", "diamondBalance", "rpgDiamonds",
    "characterTopupDiamonds", "adventurerShopDiamonds", "bagDiamonds"
  ];

  coinIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = coins.toLocaleString();
  });
  diamondIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = diamonds.toLocaleString();
  });
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  saveActiveAccountState();
  syncCurrencyDisplays();
}

function syncPassTicketTimer() {
  if (!state) return;
  state.rpgInventory = state.rpgInventory || {};
  const now = Date.now();
  let count = Math.max(0, Math.min(PASS_TICKET_MAX, Number(state.rpgInventory.passTicket ?? 0)));
  let lastTick = Number(state.passTicketLastTick || now);
  if (!Number.isFinite(lastTick) || lastTick <= 0) lastTick = now;

  if (count < PASS_TICKET_MAX) {
    const elapsed = Math.max(0, now - lastTick);
    const earned = Math.floor(elapsed / PASS_TICKET_INTERVAL_MS);
    if (earned > 0) {
      const room = PASS_TICKET_MAX - count;
      const grant = Math.min(room, earned);
      count += grant;
      // Keep the remaining partial interval so offline progress continues exactly.
      lastTick += earned * PASS_TICKET_INTERVAL_MS;
      if (count >= PASS_TICKET_MAX) lastTick = now;
      state.rpgInventory.passTicket = count;
      state.passTicketLastTick = lastTick;
      saveState();
    }
  } else {
    // Do not bank unlimited hidden time while the inventory is already full.
    lastTick = now;
    state.passTicketLastTick = lastTick;
  }

  state.rpgInventory.passTicket = count;
  updatePassTicketStatus();
}

function updatePassTicketStatus() {
  const countEl = document.getElementById("passTicketCount");
  const timeEl = document.getElementById("passTicketTimer");
  if (!countEl || !timeEl || !state) return;

  const count = Math.max(0, Math.min(PASS_TICKET_MAX, Number(state.rpgInventory?.passTicket ?? 0)));
  countEl.textContent = `${count}/${PASS_TICKET_MAX}`;

  if (count >= PASS_TICKET_MAX) {
    timeEl.textContent = "เต็มแล้ว";
    return;
  }

  const now = Date.now();
  const lastTick = Number(state.passTicketLastTick || now);
  const remaining = Math.max(0, PASS_TICKET_INTERVAL_MS - Math.max(0, now - lastTick));
  const totalSeconds = Math.ceil(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timeEl.textContent = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const usernameInput = document.getElementById("usernameInput");

let selectedGender = state.gender==="female" ? "female" : "male";
document.querySelectorAll("[data-gender]").forEach(btn=>btn.addEventListener("click",()=>{
  selectedGender=btn.dataset.gender==="female"?"female":"male";
  document.querySelectorAll("[data-gender]").forEach(b=>b.classList.toggle("active",b.dataset.gender===selectedGender));
}));
const ACCOUNTS_KEY = `${SAVE_KEY}_accounts`;
const ACTIVE_ACCOUNT_KEY = `${SAVE_KEY}_active_account`;

function loadAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}; } catch { return {}; }
}
function saveAccounts(accounts) { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); }
function accountStateKey(username) { return `${SAVE_KEY}_account_${username}`; }
function loadAccountState(username) {
  try {
    const saved = JSON.parse(localStorage.getItem(accountStateKey(username)));
    return saved ? saved : defaultState();
  } catch { return defaultState(); }
}
function saveActiveAccountState() {
  if (state?.username) localStorage.setItem(accountStateKey(state.username), JSON.stringify(state));
}
function switchAuthTab(mode) {
  document.getElementById("loginForm").classList.toggle("hidden", mode !== "login");
  document.getElementById("registerForm").classList.toggle("hidden", mode !== "register");
  document.getElementById("showLoginTab").classList.toggle("active", mode === "login");
  document.getElementById("showRegisterTab").classList.toggle("active", mode === "register");
}
document.getElementById("showLoginTab").addEventListener("click", () => switchAuthTab("login"));
document.getElementById("showRegisterTab").addEventListener("click", () => switchAuthTab("register"));

document.getElementById("registerButton").addEventListener("click", () => {
  const username = document.getElementById("registerUsernameInput").value.trim();
  const password = document.getElementById("registerPasswordInput").value;
  const confirmPassword = document.getElementById("registerConfirmPasswordInput").value;
  if (!username || !password) return alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
  if (password.length < 4) return alert("รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร");
  if (password !== confirmPassword) return alert("ยืนยันรหัสผ่านไม่ตรงกัน");
  const accounts = loadAccounts();
  if (accounts[username]) return alert("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
  accounts[username] = { password, gender: selectedGender, createdAt: Date.now() };
  saveAccounts(accounts);
  state = defaultState();
  state.username = username;
  state.gender = selectedGender;
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, username);
  saveState();
  document.getElementById("passwordInput").value = password;
  document.getElementById("usernameInput").value = username;
  showGame();
});

document.getElementById("loginButton").addEventListener("click", () => {
  const name = usernameInput.value.trim();
  const password = document.getElementById("passwordInput").value;
  const account = loadAccounts()[name];
  if (!name || !password) return alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
  if (!account || account.password !== password) return alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  state = loadAccountState(name);
  state.username = name;
  state.gender = account.gender || state.gender || "male";
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, name);
  showGame();
});

document.getElementById("logoutButton").addEventListener("click", () => {
  saveActiveAccountState();
  localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
  loginScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  usernameInput.value = "";
  document.getElementById("passwordInput").value = "";
  switchAuthTab("login");
});

function showGame() {
  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  document.getElementById("playerName").textContent = `ผู้เล่น: ${state.username}`;
  syncPassTicketTimer();
  render();
  openActivityPopup();
}


// V185 — Strict real-time calendar login rewards only. Does not touch other systems.
let LOGIN_REWARD_7 = [
  {type:"coins", amount:100, icon:"🪙", name:"เหรียญ"},{type:"water", amount:2, icon:"💧", name:"น้ำ"},{type:"fertilizer", amount:2, icon:"🧪", name:"ปุ๋ย"},{type:"seed", seed:"carrot", amount:3, icon:"🥕", name:"เมล็ดแครอท"},{type:"diamonds", amount:2, icon:"💎", name:"เพชร"},{type:"specialWater", amount:1, icon:"💦", name:"น้ำพิเศษ"},{type:"coins", amount:500, icon:"🪙", name:"เหรียญ"}
];
let LOGIN_REWARD_30 = Array.from({length:30}, (_,i)=>{const cycle=[{type:"coins",amount:100,icon:"🪙",name:"เหรียญ"},{type:"water",amount:2,icon:"💧",name:"น้ำ"},{type:"fertilizer",amount:2,icon:"🧪",name:"ปุ๋ย"},{type:"seed",seed:"tomato",amount:2,icon:"🍅",name:"เมล็ดมะเขือเทศ"},{type:"diamonds",amount:1,icon:"💎",name:"เพชร"},{type:"specialWater",amount:1,icon:"💦",name:"น้ำพิเศษ"}];const reward={...cycle[i%cycle.length]};if((i+1)%10===0)Object.assign(reward,{type:"coins",amount:(i+1)*150,icon:"🪙",name:"เหรียญ"});if(i===29)Object.assign(reward,{type:"diamonds",amount:10,icon:"💎",name:"เพชร"});return reward;});
function loginRewardDateKey(now=Date.now()){const d=new Date(now);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function loginRewardDayNumber(key){const [y,m,d]=String(key).split('-').map(Number);return Math.floor(Date.UTC(y,m-1,d)/86400000);}
function ensureLoginRewardState(){
  state.loginRewards=state.loginRewards||{};
  ensureAdminLoginRewards();
  ["7","30"].forEach(kind=>{
    const total=Number(kind), old=state.loginRewards[kind]||{};
    let startDate=typeof old.startDate==='string'?old.startDate:loginRewardDateKey();
    const todayNum=loginRewardDayNumber(loginRewardDateKey()), startNum=loginRewardDayNumber(startDate);
    if(todayNum-startNum>=total){
      const cycles=Math.floor((todayNum-startNum)/total);
      startDate=new Date((startNum+cycles*total)*86400000).toISOString().slice(0,10);
      // Promote the admin-prepared set exactly when a new cycle begins.
      adminConfig.loginRewards[`active${kind}`]=adminClone(adminConfig.loginRewards[`pending${kind}`]);
      adminConfig.loginRewards[`pending${kind}`]=adminClone(adminConfig.loginRewards[`active${kind}`]);
      localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));
      syncLoginRewardConfigToGame();
      state.loginRewards[kind]={startDate,claimedDays:[],lastClaimDate:""};
    }else{
      state.loginRewards[kind]={startDate,claimedDays:Array.isArray(old.claimedDays)?[...new Set(old.claimedDays.map(Number).filter(n=>n>=1&&n<=total))]:[],lastClaimDate:typeof old.lastClaimDate==='string'?old.lastClaimDate:""};
    }
  });
  return state.loginRewards;
}
function getLoginRewardTodayIndex(kind){const d=ensureLoginRewardState()[String(kind)];return loginRewardDayNumber(loginRewardDateKey())-loginRewardDayNumber(d.startDate);}
function getLoginRewardProgress(kind){return ensureLoginRewardState()[String(kind)].claimedDays.length;}
function canClaimLoginReward(kind){const total=Number(kind),d=ensureLoginRewardState()[String(total)],index=getLoginRewardTodayIndex(total);return index>=0&&index<total&&!d.claimedDays.includes(index+1)&&d.lastClaimDate!==loginRewardDateKey();}
function grantLoginReward(reward){
  state.seeds=state.seeds||{};state.rpgInventory=state.rpgInventory||{};state.rpgEquipmentBag=state.rpgEquipmentBag||[];
  const qty=Math.max(1,Math.floor(Number(reward.amount)||1));
  switch(reward.type){
    case"coins":state.coins=(Number(state.coins)||0)+qty;return true;
    case"diamonds":state.diamonds=(Number(state.diamonds)||0)+qty;return true;
    case"water":state.water=(Number(state.water)||0)+qty;return true;
    case"specialWater":state.specialWater=(Number(state.specialWater)||0)+qty;return true;
    case"fertilizer":state.fertilizer=(Number(state.fertilizer)||0)+qty;return true;
    case"specialFertilizer":state.specialFertilizer=(Number(state.specialFertilizer)||0)+qty;return true;
    case"seed":state.seeds[reward.seed]=(Number(state.seeds[reward.seed])||0)+qty;return true;
  }
  const id=String(reward.id||"");
  if(id.startsWith("crop:")){const x=id.slice(5);state.seeds[x]=(Number(state.seeds[x])||0)+qty;return true;}
  if(id.startsWith("item:")){const x=id.slice(5);state.rpgInventory[x]=(Number(state.rpgInventory[x])||0)+qty;return true;}
  if(id.startsWith("junk:")){const x=id.slice(5);state.rpgInventory[x]=(Number(state.rpgInventory[x])||0)+qty;return true;}
  if(id.startsWith("equip:")){
    // ID ใหม่เก็บ tier/index/stars/name ทำให้ของที่ได้จากล็อกอินเป็นอุปกรณ์ระดับที่แอดมินเลือกจริง
    const parts=id.split(":");
    const tier=parts[1]||"NORMAL",index=Number(parts[2]),stars=Math.max(1,Math.min(8,Number(parts[3])||1));
    const base=(GACHA_POOLS[tier]||[])[index]||{};
    const name=base.name||String(reward.name||"อุปกรณ์").replace(/\s★+$/,"");
    for(let i=0;i<qty;i++)state.rpgEquipmentBag.push({
      adminCatalogId:id,name,icon:base.icon||reward.icon||"🎁",slot:base.slot||"weapon",
      weaponTier:tier,stars,level:stars,durability:100,broken:false,rarity:"NORMAL",regenRank:0,
      baseDamage:Math.round(Number(base.baseDamage||0)*stars*(weaponTierMeta(tier).multiplier||1)),
      bonusDamage:0,
      bonusHp:Math.round((base.slot==="body"?18:base.slot==="head"?8:base.slot==="arms"?7:base.slot==="feet"?5:0)*stars*(weaponTierMeta(tier).multiplier||1)),
      bonusDef:Math.round((base.slot==="body"?12:base.slot==="head"?6:base.slot==="arms"?7:base.slot==="feet"?5:0)*stars*(weaponTierMeta(tier).multiplier||1)),
      gachaStatModel:4
    });
    return true;
  }
  return false;
}
function getLoginRewardCountdown(){const now=new Date(),next=new Date(now);next.setHours(24,0,0,0);let sec=Math.max(0,Math.floor((next-now)/1000));const days=Math.floor(sec/86400);sec%=86400;const h=Math.floor(sec/3600);sec%=3600;const m=Math.floor(sec/60),s=sec%60;return `${days} วัน ${String(h).padStart(2,'0')} ชม. ${String(m).padStart(2,'0')} นาที ${String(s).padStart(2,'0')} วินาที`;}
function updateLoginRewardCountdown(){document.querySelectorAll('[data-login-countdown]').forEach(el=>el.textContent=`รีเซ็ตหลังเที่ยงคืน • เหลือ ${getLoginRewardCountdown()}`);}
function renderLoginRewardGrid(kind){const total=Number(kind),el=document.getElementById(total===7?'login7Grid':'login30Grid');if(!el)return;const rewards=total===7?LOGIN_REWARD_7:LOGIN_REWARD_30,data=ensureLoginRewardState()[String(total)],todayIndex=getLoginRewardTodayIndex(total);el.innerHTML='';rewards.forEach((reward,index)=>{const cell=document.createElement('div');const isClaimed=data.claimedDays.includes(index+1),isToday=index===todayIndex,isMissed=index<todayIndex&&!isClaimed,isFuture=index>todayIndex;cell.className=`login-reward-cell${isClaimed?' claimed':''}${isToday&&!isClaimed?' current':''}${isMissed?' missed':''}`;let action;if(isClaimed)action='<div class="login-reward-status">✓ รับแล้ว</div>';else if(isMissed)action='<div class="login-reward-status">หมดสิทธิ์</div>';else if(isToday)action=canClaimLoginReward(total)?`<button type="button" data-login-reward-claim="${total}">รับรางวัล</button>`:'<div class="login-reward-status">รับวันนี้แล้ว</div>';else if(isFuture)action='<button type="button" disabled>ล็อก</button>';else action='<div class="login-reward-status">สิ้นสุดแล้ว</div>';cell.innerHTML=`<div class="login-reward-day">วันที่ ${index+1}</div><div class="login-reward-icon">${reward.icon}</div><div class="login-reward-name">${reward.name}</div><div class="login-reward-amount">x${Number(reward.amount).toLocaleString()}</div>${action}`;el.appendChild(cell);});el.querySelector(`[data-login-reward-claim="${total}"]`)?.addEventListener('click',()=>claimLoginReward(total));}
function ensureLoginCountdownBars(){[['login7Grid','7'],['login30Grid','30']].forEach(([id,kind])=>{const grid=document.getElementById(id);if(!grid)return;let bar=grid.previousElementSibling;if(!bar||!bar.matches('[data-login-countdown]')){bar=document.createElement('div');bar.className='login-reward-help';bar.setAttribute('data-login-countdown',kind);grid.parentNode.insertBefore(bar,grid);}});}
function renderLoginRewards(){ensureLoginRewardState();ensureLoginCountdownBars();renderLoginRewardGrid(7);renderLoginRewardGrid(30);updateLoginRewardCountdown();}
let loginRewardClaimInProgress=false;
function claimLoginReward(kind){
  const total=Number(kind);
  if(loginRewardClaimInProgress)return;
  if(!canClaimLoginReward(total)){renderLoginRewards();return;}
  const index=getLoginRewardTodayIndex(total);
  const rewards=total===7?LOGIN_REWARD_7:LOGIN_REWARD_30;
  const reward=rewards[index];
  if(!reward){renderLoginRewards();return;}
  if(!confirm(`ยืนยันรับรางวัลวันที่ ${index+1}: ${reward.icon} ${reward.name} x${Number(reward.amount).toLocaleString()} ?`))return;

  // ล็อกทันทีเพื่อกันการกดซ้ำ และเขียนสถานะลง state ตัวปัจจุบันโดยตรง
  loginRewardClaimInProgress=true;
  try{
    const key=String(total);
    const data=ensureLoginRewardState()[key];
    const today=loginRewardDateKey();
    if(!data || data.lastClaimDate===today || data.claimedDays.includes(index+1)){
      renderLoginRewards();
      return;
    }
    if(!grantLoginReward(reward))return;
    data.claimedDays=[...new Set([...data.claimedDays,index+1])];
    data.lastClaimDate=today;
    saveState();
    render();
    renderLoginRewards();
    alert(`รับรางวัลเรียบร้อย: ${reward.icon} ${reward.name} x${Number(reward.amount).toLocaleString()}`);
  }finally{
    loginRewardClaimInProgress=false;
  }
}
setInterval(()=>{if(document.querySelector('.activity-page.active[data-activity-page="login7"],.activity-page.active[data-activity-page="login30"]')){renderLoginRewards();}},1000);

const activityOverlay = document.getElementById("activityOverlay");
const activityTabs = document.getElementById("activityTabs");

function showActivityPage(tab) {
  document.querySelectorAll(".activity-tab").forEach(btn => btn.classList.toggle("active", btn.dataset.activityTab === tab));
  document.querySelectorAll(".activity-page").forEach(page => page.classList.toggle("active", page.dataset.activityPage === tab));
  if(tab==="login7" || tab==="login30") renderLoginRewards();
}

function openActivityPopup() {
  if (!activityOverlay) return;
  // ตอนเข้าเกมให้แสดงเฉพาะประกาศ และไม่มีเมนูล็อกอินปนอยู่ในหน้าประกาศ
  activityTabs?.classList.add("hidden");
  showActivityPage("notice");
  activityOverlay.classList.remove("hidden");
}

function openLoginRewardsPopup() {
  if (!activityOverlay) return;
  // ปุ่มล็อกอินบนแถบด้านบนเปิดเฉพาะรางวัลล็อกอิน 7 วัน / 30 วัน
  activityTabs?.classList.remove("hidden");
  showActivityPage("login7");
  activityOverlay.classList.remove("hidden");
}

function closeActivityPopup() {
  activityOverlay?.classList.add("hidden");
}

document.getElementById("activityClose")?.addEventListener("click", closeActivityPopup);
document.getElementById("activityReadButton")?.addEventListener("click", closeActivityPopup);
document.getElementById("loginRewardsButton")?.addEventListener("click", openLoginRewardsPopup);
document.querySelectorAll(".activity-tab").forEach(btn => btn.addEventListener("click", () => {
  showActivityPage(btn.dataset.activityTab);
}));

function syncChallengeCoinTimer() {
  const now = Date.now();
  state.rpgInventory = state.rpgInventory || {};
  let count = Math.max(0, Math.min(CHALLENGE_COIN_MAX, Number(state.rpgInventory.challengeCoin ?? 0)));
  let lastTick = Number(state.challengeCoinLastTick || now);
  if (!Number.isFinite(lastTick) || lastTick <= 0) lastTick = now;
  if (count < CHALLENGE_COIN_MAX) {
    const elapsed = Math.max(0, now - lastTick);
    const earned = Math.floor(elapsed / CHALLENGE_COIN_INTERVAL_MS);
    if (earned > 0) {
      const room = CHALLENGE_COIN_MAX - count;
      const grant = Math.min(room, earned);
      count += grant;
      lastTick += grant * CHALLENGE_COIN_INTERVAL_MS;
      if (count >= CHALLENGE_COIN_MAX) lastTick = now;
    }
  } else { lastTick = now; }
  state.rpgInventory.challengeCoin = count;
  state.challengeCoinLastTick = lastTick;
  updateChallengeCoinStatus();
}
function updateChallengeCoinStatus(){
  const countEl=document.getElementById('challengeCoinCount');
  const timeEl=document.getElementById('challengeCoinTimer');
  const count=Math.max(0,Math.min(CHALLENGE_COIN_MAX,Number(state.rpgInventory?.challengeCoin??0)));
  if(countEl) countEl.textContent=`${count}/${CHALLENGE_COIN_MAX}`;
  if(!timeEl) return;
  if(count>=CHALLENGE_COIN_MAX){ timeEl.textContent='เต็ม'; return; }
  const now=Date.now(), lastTick=Number(state.challengeCoinLastTick||now);
  const remaining=Math.max(0,CHALLENGE_COIN_INTERVAL_MS-Math.max(0,now-lastTick));
  const h=Math.floor(remaining/3600000), m=Math.floor((remaining%3600000)/60000), sec=Math.floor((remaining%60000)/1000);
  timeEl.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

syncPassTicketTimer();
syncChallengeCoinTimer();
setInterval(()=>{syncPassTicketTimer();syncChallengeCoinTimer();}, 1000);
window.addEventListener("focus", syncPassTicketTimer);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) syncPassTicketTimer();
});


let activePlantPlot = null;

function openSeedPicker(plotIndex) {
  activePlantPlot = plotIndex;
  renderSeedPicker();
  document.getElementById("seedPickerModal").classList.remove("hidden");
}

function closeSeedPicker() {
  activePlantPlot = null;
  document.getElementById("seedPickerModal").classList.add("hidden");
}

function renderSeedPicker() {
  const box = document.getElementById("seedPickerGrid");
  if (!box) return;

  const available = Object.entries(crops).filter(([key]) => Number(state.seeds[key] || 0) > 0);

  if (!available.length) {
    box.innerHTML = `
      <div class="seed-picker-empty">
        <div>🎒</div>
        <strong>ยังไม่มีเมล็ดในกระเป๋า</strong>
        <p>ไปที่ร้านค้าเพื่อซื้อเมล็ดผักก่อนครับ</p>
      </div>`;
    return;
  }

  box.innerHTML = available.map(([key, c]) => `
    <button class="seed-choice" data-choice-seed="${key}">
      <span class="seed-choice-icon">${c.icon}</span>
      <span class="seed-choice-info">
        <b>เมล็ด${c.name}</b>
        <small>โตประมาณ ${Math.round(c.growMs / 1000)} วินาที</small>
      </span>
      <span class="seed-choice-count">มี ${state.seeds[key]} เมล็ด</span>
    </button>
  `).join("");

  box.querySelectorAll("[data-choice-seed]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (activePlantPlot === null) return;
      plant(activePlantPlot, btn.dataset.choiceSeed);
      closeSeedPicker();
    });
  });
}

function render() {
  syncCurrencyDisplays();
  document.getElementById("coins").textContent = state.coins;
  document.getElementById("diamonds").textContent = state.diamonds ?? 0;
  document.getElementById("diamondBalance").textContent = state.diamonds ?? 0;
  document.getElementById("fertilizer").textContent = state.fertilizer;
  document.getElementById("specialFertilizer").textContent = state.specialFertilizer ?? 0;
  document.getElementById("water").textContent = state.water ?? 0;
  document.getElementById("specialWater").textContent = state.specialWater ?? 0;

  document.getElementById("invWater").textContent = state.water ?? 0;
  document.getElementById("invSpecialWater").textContent = state.specialWater ?? 0;
  document.getElementById("invFertilizer").textContent = state.fertilizer;
  document.getElementById("invSpecialFertilizer").textContent = state.specialFertilizer ?? 0;

  const inventoryTotal = document.getElementById("inventoryTotal");
  if (inventoryTotal) inventoryTotal.textContent = Object.values(state.seeds).reduce((a,b)=>a+Number(b||0),0) + (state.water??0)+(state.specialWater??0)+state.fertilizer+(state.specialFertilizer??0);


  renderSeedShop();
  renderSeedInventory();
  const grid = document.getElementById("farmGrid");
  grid.innerHTML = "";

  state.plots.forEach((plot, index) => {
    const el = document.createElement("div");
    el.className = "plot";

    if (!plot) {
      el.classList.add("empty");
      el.innerHTML = `
        <div class="crop">🟫</div>
        <strong>แปลงว่าง</strong>
        <p>เลือกผักจากกระเป๋าของคุณ</p>
        <button class="choose-seed-button" data-choose-plot="${index}">🌱 เลือกเมล็ด</button>
      `;
    } else {
      const crop = crops[plot.type];
      const elapsed = Date.now() - plot.plantedAt;
      const progress = Math.min(100, Math.floor((elapsed / plot.growMs) * 100));
      const ready = progress >= 100;
      const stage = getGrowthStage(plot);
      const stageNames = ["เมล็ด", "ต้นอ่อน", "กำลังโต", "โตเต็มที่"];

      el.innerHTML = `
        <div class="crop growth-stage-${stage}" title="${stageNames[stage]}">${crop.stages[stage]}</div>
        <strong>${crop.name}</strong>
        <div class="progress"><div style="width:${progress}%"></div></div>
        <small>${ready ? "🌾 พร้อมเก็บเกี่ยว!" : `${stageNames[stage]} · โตแล้ว ${progress}%`}</small>
        ${
          ready
            ? `<button data-harvest="${index}" style="margin-top:8px">เก็บเกี่ยว +${crop.sell} 🪙</button>`
            : `<button data-water="${index}" style="margin-top:8px">💧 รดน้ำ</button>
            <button data-special-water="${index}" style="margin-top:6px">💦 น้ำพิเศษ</button>
            <button data-fertilize="${index}" style="margin-top:6px">🧪 ใส่ปุ๋ย (${state.fertilizer})</button>
            <button data-special-fertilize="${index}" style="margin-top:6px">✨ ปุ๋ยพิเศษ</button>`
        }
      `;
    }

    grid.appendChild(el);
  });

  grid.querySelectorAll("[data-choose-plot]").forEach(btn => {
    btn.addEventListener("click", () => openSeedPicker(Number(btn.dataset.choosePlot)));
  });

  grid.querySelectorAll("[data-harvest]").forEach(btn => {
    btn.addEventListener("click", () => harvest(Number(btn.dataset.harvest)));
  });

  grid.querySelectorAll("[data-fertilize]").forEach(btn => {
    btn.addEventListener("click", () => fertilize(Number(btn.dataset.fertilize)));
  });

  grid.querySelectorAll("[data-water]").forEach(btn => {
    btn.addEventListener("click", () => water(Number(btn.dataset.water)));
  });

  grid.querySelectorAll("[data-special-water]").forEach(btn => {
    btn.addEventListener("click", () => specialWater(Number(btn.dataset.specialWater)));
  });

  grid.querySelectorAll("[data-special-fertilize]").forEach(btn => {
    btn.addEventListener("click", () => specialFertilize(Number(btn.dataset.specialFertilize)));
  });
}

function renderSeedShop() {
  const box = document.getElementById("seedShopGrid");
  if (!box) return;
  box.innerHTML = Object.entries(crops).map(([key,c]) => `
    <div class="shop-item seed-shop-item">
      <div class="item-icon">${c.icon}</div><span class="item-tag">เมล็ดผัก</span>
      <h3>เมล็ด${c.name}</h3><p>โตประมาณ ${Math.round(c.growMs/1000)} วินาที · ขาย ${c.sell} 🪙</p>
      <button class="buy-seed" data-seed="${key}">ซื้อ ${c.cost} 🪙</button>
    </div>`).join("");
  box.querySelectorAll(".buy-seed").forEach(btn => btn.addEventListener("click",()=>buySeed(btn.dataset.seed)));
}
function buySeed(type) {
  const crop = crops[type];
  if (state.coins < crop.cost) { alert("เหรียญไม่พอ"); return; }
  state.coins -= crop.cost;
  state.seeds[type] = Number(state.seeds[type]||0)+1;
  saveState();
  render();
  showActionMessage(`✅ ซื้อสำเร็จ: เมล็ด${crop.name} 1 เมล็ด · ใช้ไป ${Number(crop.cost).toLocaleString()} 🪙`);
}
function renderSeedInventory() {
  const box=document.getElementById("seedInventoryGrid"); if(!box) return;
  box.innerHTML=Object.entries(crops).map(([k,c])=>`
    <div class="inventory-slot seed-inventory-slot ${Number(state.seeds[k]||0)>0 ? "has-seed" : "no-seed"}">
      <div class="inventory-icon">${c.icon}</div>
      <strong>เมล็ด${c.name}</strong>
      <span>จำนวน <b>${Number(state.seeds[k]||0)}</b></span>
    </div>`).join("");
}

function plant(index, seedType) {
  if (state.seeds[seedType] <= 0) {
    alert("เมล็ดไม่พอ ไปซื้อเพิ่มในร้านค้า");
    return;
  }

  state.seeds[seedType]--;
  state.plots[index] = {
    type: seedType,
    plantedAt: Date.now(),
    growMs: crops[seedType].growMs
  };

  saveState();
  render();
}

// ฟาร์ม: อัปเดตเวลาและหน้าจอแบบทันทีเมื่อกดใช้งานไอเท็ม
// ใช้ plantedAt เลื่อนย้อนกลับแทนการรอรอบ render เพื่อให้ progress/stage เปลี่ยนทันที
function applyFarmTimeReduction(index, amountMs, inventoryKey, successMessage) {
  const plot = state.plots[index];
  if (!plot) return false;

  const now = Date.now();
  const elapsed = Math.max(0, now - Number(plot.plantedAt || now));
  const remaining = Math.max(0, Number(plot.growMs || 0) - elapsed);

  if (remaining <= 0) {
    alert("ผักโตเต็มที่แล้ว รอเก็บเกี่ยวได้เลย!");
    return false;
  }

  if (Number(state[inventoryKey] ?? 0) <= 0) {
    const names = {
      water: "น้ำ",
      fertilizer: "ปุ๋ย",
      specialWater: "น้ำพิเศษ",
      specialFertilizer: "ปุ๋ยพิเศษ"
    };
    alert(`${names[inventoryKey] || "ไอเท็ม"}หมดแล้ว ไปซื้อเพิ่มที่ร้านค้า`);
    return false;
  }

  // หักของและคำนวณผลทันทีใน click เดียวกัน
  state[inventoryKey] = Number(state[inventoryKey] || 0) - 1;
  const reduction = Math.min(amountMs, remaining);
  plot.plantedAt = Number(plot.plantedAt || now) - reduction;
  plot.lastFarmActionAt = now;

  // บันทึก + วาดใหม่ทันที ไม่รอ setInterval 1 วินาที
  saveState();
  render();

  if (successMessage) showActionMessage(successMessage);
  return true;
}

function fertilize(index) {
  applyFarmTimeReduction(index, 10_000, "fertilizer", "🧪 ใส่ปุ๋ยสำเร็จ! สถานะอัปเดตทันที · เร่ง 10 วินาที");
}

function specialWater(index) {
  applyFarmTimeReduction(index, 12_000, "specialWater", "💦 ใช้น้ำพิเศษแล้ว! สถานะอัปเดตทันที · เร่ง 12 วินาที");
}

function specialFertilize(index) {
  applyFarmTimeReduction(index, 25_000, "specialFertilizer", "✨ ใช้ปุ๋ยพิเศษแล้ว! สถานะอัปเดตทันที · เร่ง 25 วินาที");
}

function water(index) {
  applyFarmTimeReduction(index, 5_000, "water", "💧 รดน้ำแล้ว! สถานะอัปเดตทันที · เร่ง 5 วินาที");
}

function showCoinGain(message) {
  let box = document.getElementById("coinGain");
  if (!box) {
    box = document.createElement("div");
    box.id = "coinGain";
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add("show");
  clearTimeout(window.coinGainTimer);
  window.coinGainTimer = setTimeout(() => box.classList.remove("show"), 1600);
}

function showActionMessage(message) {
  let box = document.getElementById("actionMessage");
  if (!box) {
    box = document.createElement("div");
    box.id = "actionMessage";
    document.body.appendChild(box);
  }

  box.textContent = message;
  box.classList.add("show");

  clearTimeout(window.actionMessageTimer);
  window.actionMessageTimer = setTimeout(() => {
    box.classList.remove("show");
  }, 1800);
}

function harvest(index) {
  const plot = state.plots[index];
  if (!plot) return;

  const crop = crops[plot.type];
  const elapsed = Date.now() - plot.plantedAt;

  if (elapsed < plot.growMs) {
    alert("ผักยังโตไม่เต็มที่");
    return;
  }

  // ผลผลิตฟาร์มเป็นระบบของฟาร์ม แยกจากคลัง RPG
  // เมื่อเก็บเกี่ยวให้รับเหรียญเข้ากระเป๋ากลางทันที
  state.coins = Number(state.coins || 0) + Number(crop.sell || 0);
  state.plots[index] = null;
  saveState();
  render();
  syncCurrencyDisplays();
  showCoinGain(`🌾 เก็บ ${crop.name} สำเร็จ · 🪙 +${Number(crop.sell || 0).toLocaleString()} เหรียญ`);
}

document.getElementById("buySpecialWater").addEventListener("click", () => {
  const price = 3; // 💎 ต่อ 1 น้ำพิเศษ
  if ((state.diamonds ?? 0) < price) {
    alert("เพชรไม่พอ 💎 ต้องใช้ 3 เพชรต่อน้ำพิเศษ 1 ขวด");
    return;
  }
  state.diamonds -= price;
  state.specialWater = (state.specialWater ?? 0) + 1;
  saveState();
  render();
  showActionMessage("✅ ซื้อสำเร็จ: น้ำพิเศษ 1 ขวด · ใช้ไป 3 💎");
});

document.getElementById("buySpecialFertilizer").addEventListener("click", () => {
  const price = 5; // 💎 ต่อ 1 ปุ๋ยพิเศษ
  if ((state.diamonds ?? 0) < price) {
    alert("เพชรไม่พอ 💎 ต้องใช้ 5 เพชรต่อปุ๋ยพิเศษ 1 หน่วย");
    return;
  }
  state.diamonds -= price;
  state.specialFertilizer = (state.specialFertilizer ?? 0) + 1;
  saveState();
  render();
  showActionMessage("✅ ซื้อสำเร็จ: ปุ๋ยพิเศษ 1 หน่วย · ใช้ไป 5 💎");
});

document.getElementById("buyWater").addEventListener("click", () => {
  if (state.coins < 10) {
    alert("เหรียญไม่พอ");
    return;
  }

  state.coins -= 10;
  state.water = (state.water ?? 0) + 5;
  saveState();
  render();
  showActionMessage("✅ ซื้อสำเร็จ: น้ำ 5 หน่วย · ใช้ไป 10 🪙");
});

document.getElementById("buyFertilizer").addEventListener("click", () => {
  if (state.coins < 20) {
    alert("เหรียญไม่พอ");
    return;
  }

  state.coins -= 20;
  state.fertilizer++;
  saveState();
  render();
  showActionMessage("✅ ซื้อสำเร็จ: ปุ๋ยเร่งโต 1 หน่วย · ใช้ไป 20 🪙");
});


document.getElementById("closeSeedPicker")?.addEventListener("click", closeSeedPicker);
document.getElementById("seedPickerModal")?.addEventListener("click", (event) => {
  if (event.target.id === "seedPickerModal") closeSeedPicker();
});

const diamondPackages = [
  {baht:10, diamonds:50}, {baht:20, diamonds:100}, {baht:50, diamonds:275},
  {baht:100, diamonds:575}, {baht:300, diamonds:1800}, {baht:500, diamonds:3250}, {baht:1000, diamonds:7000}
];
function renderDiamondPackages(){
  const boxes=[document.getElementById("diamondPackages"),document.getElementById("characterDiamondPackages")].filter(Boolean);
  boxes.forEach(box=>{
    box.innerHTML=diamondPackages.map((p,i)=>`<button class="diamond-package ${i===3?'popular':''}" data-baht="${p.baht}" data-diamonds="${p.diamonds}"><b>฿${p.baht}</b><span>💎 ${p.diamonds.toLocaleString()}</span>${i===3?'<em>แนะนำ</em>':''}</button>`).join("");
    box.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>submitTopup(Number(b.dataset.baht),Number(b.dataset.diamonds))));
  });
}
function submitTopup(baht, diamonds){
  const req={id:Date.now(), username:state.username||"ผู้เล่น", baht, diamonds, status:"pending", createdAt:new Date().toISOString()};
  state.topupRequests.push(req); saveState();
  alert(`สร้างคำขอเติมเงิน ฿${baht} → 💎${diamonds.toLocaleString()} แล้ว\n\nตอนนี้เป็นโหมดทดลอง: คำขอยังไม่ส่งถึงแอดมินจริง\nขั้นถัดไปเราจะเชื่อม Supabase เพื่อให้แอดมินอนุมัติจากอีกเครื่องได้`);
}
document.getElementById("diamondWallet")?.addEventListener("click",()=>document.getElementById("topupCard")?.scrollIntoView({behavior:"smooth"}));
renderDiamondPackages();

/* =========================
   V24 AUDIO / MUSIC SYSTEM
   ========================= */
const audioState = {
  enabled:true,
  ctx:null,
  master:null,
  musicTimer:null,
  mode:"farm",
  footstep:0,
  volume:Number(localStorage.getItem("farm_audio_volume") ?? 0.75)
};
function ensureAudio(){
  if(!audioState.enabled) return null;
  if(!audioState.ctx){
    const C=window.AudioContext||window.webkitAudioContext;
    if(!C) return null;
    audioState.ctx=new C();
    audioState.master=audioState.ctx.createGain();
    audioState.master.gain.value=audioState.volume;
    audioState.master.connect(audioState.ctx.destination);
  }
  if(audioState.ctx.state==='suspended') audioState.ctx.resume();
  return audioState.ctx;
}
function tone(freq=440,dur=.08,type='sine',gain=.05,delay=0,slideTo=null){
  const c=ensureAudio(); if(!c) return;
  const o=c.createOscillator(), g=c.createGain();
  o.type=type;
  const t=c.currentTime+delay;
  o.frequency.setValueAtTime(Math.max(20,freq),t);
  if(slideTo!==null) o.frequency.exponentialRampToValueAtTime(Math.max(20,slideTo),t+dur);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(Math.max(.0002,gain),t+.012);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(audioState.master); o.start(t); o.stop(t+dur+.03);
}
function noise(dur=.08,gain=.035,filterType=null,freq=1200,delay=0){
  const c=ensureAudio(); if(!c) return;
  const b=c.createBuffer(1,Math.floor(c.sampleRate*dur),c.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/d.length*5);
  const src=c.createBufferSource(), g=c.createGain(); src.buffer=b;
  // IMPORTANT: route the generated noise into its gain node.
  src.connect(g);
  g.gain.setValueAtTime(gain,c.currentTime+delay);
  g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+delay+dur);
  let out=g;
  if(filterType){ const f=c.createBiquadFilter(); f.type=filterType; f.frequency.value=freq; f.Q.value=1.2; g.connect(f); out=f; }
  out.connect(audioState.master); src.start(c.currentTime+delay);
}
function whoosh(gain=.045,dur=.28,start=180,end=1100){
  noise(dur,gain,'bandpass',900);
  tone(start,dur,'sawtooth',gain*.45,0,end);
}
function fireRoar(){
  noise(.42,.075,'lowpass',1500);
  tone(95,.34,'sawtooth',.035,0,210);
  tone(170,.22,'triangle',.028,.05,420);
  tone(620,.12,'sine',.018,.16,280);
}
function iceSpell(){
  noise(.55,.045,'highpass',2200);
  tone(920,.22,'sine',.035,0,1450);
  tone(1450,.3,'triangle',.028,.08,2050);
  tone(2100,.18,'sine',.018,.18,2800);
  [0,.08,.16,.24].forEach((d,i)=>tone(1500+i*260,.11,'triangle',.018,d,2100+i*200));
}
function shadowSpell(){
  noise(.32,.055,'bandpass',520);
  tone(120,.3,'sawtooth',.03,0,55);
  tone(760,.22,'triangle',.02,.04,180);
}
function meteorSpell(){
  tone(780,.55,'sawtooth',.025,0,90);
  noise(.18,.05,'lowpass',900,.28);
  tone(65,.48,'sine',.08,.38,32);
  noise(.5,.1,'lowpass',700,.42);
  tone(180,.35,'square',.035,.43,55);
}

function spaceLaserSfx(){
  tone(140,.12,'sawtooth',.045,0,1100);tone(1650,.10,'square',.018,.04,700);noise(.12,.025,'highpass',2800);
}
function spacePlasmaSfx(){
  tone(260,.18,'triangle',.04,0,980);tone(1180,.28,'sine',.03,.06,2200);noise(.22,.035,'bandpass',1700,.08);
}
function spaceRiftSfx(){
  tone(90,.65,'sawtooth',.04,0,34);tone(440,.55,'sine',.025,.05,70);noise(.5,.04,'bandpass',420);
}
function spaceSupernovaSfx(){
  tone(72,.75,'sawtooth',.065,0,34);tone(320,.55,'triangle',.045,.10,1200);tone(1500,.42,'sine',.035,.22,2600);
  noise(.7,.09,'lowpass',800,.18);noise(.35,.05,'highpass',2500,.48);
}

// V199 WORLD BOSS — distinct, heavier synthesized skill sounds.
function wbFireCastSfx(){
  // ignition + rushing flame: low roar, noisy flame, fast upward sweep
  noise(.18,.055,'lowpass',900,0);
  noise(.34,.070,'bandpass',1350,.06);
  tone(58,.32,'sawtooth',.075,0,180);
  tone(120,.28,'triangle',.050,.04,680);
  tone(720,.16,'sawtooth',.032,.12,1700);
}
function wbFireImpactSfx(){
  // unmistakable explosion: sub boom + broad fire burst + crack
  tone(48,.42,'sine',.115,0,28);
  noise(.32,.120,'lowpass',1100,0);
  noise(.16,.065,'highpass',2400,.015);
  tone(210,.20,'square',.040,.02,75);
}
function wbLightningChargeSfx(){
  // rising electrical charge and repeated arcs before strikes land
  tone(180,.50,'sawtooth',.045,0,2400);
  [0,.10,.20,.30,.40].forEach((d,i)=>tone(900+i*180,.055,'square',.030,d,1400+i*210));
  noise(.50,.035,'highpass',3600,.04);
}
function wbLightningStrikeSfx(){
  // sharp crack followed by a deep thunder tail
  noise(.055,.145,'highpass',3000,0);
  tone(95,.12,'square',.070,0,48);
  noise(.42,.105,'lowpass',700,.06);
  tone(52,.46,'sine',.085,.08,30);
}
function wbVoidChargeSfx(){
  // dark low-dimensional charge: descending sub bass + widening noisy swirl
  tone(92,.72,'sine',.095,0,30);
  tone(310,.62,'triangle',.052,.05,58);
  noise(.62,.050,'bandpass',380,.08);
  tone(680,.45,'sine',.028,.18,150);
}
function wbVoidBlastSfx(){
  // delayed heavy implosion/explosion, clearly different from fire and lightning
  tone(36,.68,'sine',.135,0,24);
  noise(.50,.125,'lowpass',520,0);
  noise(.18,.070,'highpass',2600,.05);
  tone(140,.34,'sawtooth',.050,.04,44);
}
function sfx(name){
  if(!audioState.enabled) return;
  const map={
    click:()=>{tone(560,.06,'triangle',.075);tone(820,.035,'sine',.028,.018)},
    plant:()=>{tone(220,.09,'triangle',.075);tone(340,.12,'triangle',.055,.06);noise(.07,.025,'lowpass',900,.03)},
    water:()=>{noise(.22,.055,'bandpass',1500);tone(620,.16,'sine',.055);tone(880,.18,'sine',.035,.07);tone(1320,.12,'sine',.025,.15)},
    harvest:()=>{tone(660,.09,'triangle',.085);tone(880,.16,'triangle',.065,.08);tone(1320,.14,'sine',.045,.14);noise(.08,.02,'highpass',2600,.1)},
    coin:()=>{tone(880,.07,'square',.075);tone(1175,.12,'square',.065,.07);tone(1568,.15,'triangle',.05,.14);tone(2093,.11,'sine',.03,.24)},
    buy:()=>{tone(440,.08,'triangle',.07);tone(660,.12,'triangle',.055,.07);tone(990,.1,'sine',.03,.15)},
    foot:()=>noise(.045,.022,'lowpass',760),
    sword:()=>{whoosh(.10,.20,170,1350);tone(980,.10,'sawtooth',.055,.04,620);noise(.11,.035,'highpass',3200,.05)},
    hit:()=>{noise(.09,.05,'bandpass',700);tone(120,.1,'square',.02,.01,70)},
    skill:()=>{whoosh(.04,.22,240,1500);tone(440,.2,'sine',.025,.03,880)},
    fire:()=>{fireRoar();noise(.35,.12,'lowpass',1700,.03);tone(120,.28,'sawtooth',.055,.02,260);tone(360,.18,'triangle',.035,.11,720)},
    ice:()=>{iceSpell();noise(.65,.09,'highpass',2800,.02);[0,.10,.20,.30].forEach((d,i)=>tone(1500+i*320,.14,'triangle',.045,d,2400+i*260))},
    shadow:()=>{shadowSpell();noise(.28,.10,'bandpass',420);tone(85,.34,'sawtooth',.05,.02,42)},
    meteor:()=>{meteorSpell();noise(.55,.16,'lowpass',620,.36);tone(55,.45,'sine',.09,.40,28)},
    magic:()=>{tone(430,.12,'sine',.03);tone(860,.18,'sine',.025,.08);noise(.2,.018,'highpass',2400,.04)},
    hurt:()=>{tone(95,.16,'sawtooth',.05,0,65);noise(.08,.025,'lowpass',500)},
    death:()=>{tone(220,.16,'sawtooth',.04,0,120);tone(110,.35,'sawtooth',.035,.13,45);noise(.18,.025,'lowpass',600,.12)},
    level:()=>{tone(523,.1,'triangle',.04);tone(659,.1,'triangle',.035,.08);tone(784,.18,'triangle',.03,.16);tone(1046,.22,'sine',.02,.25)},
    respawn:()=>{tone(330,.25,'sine',.03,0,660);tone(660,.28,'triangle',.02,.15,990)},
    enhance:()=>{tone(300,.12,'triangle',.03,0,620);noise(.12,.018,'highpass',2200,.04)},
    gachaCommon:()=>{tone(440,.08,'triangle',.045);tone(660,.12,'triangle',.04,.08);tone(880,.16,'sine',.03,.16)},
    gachaRare:()=>{tone(440,.07,'triangle',.04);tone(660,.09,'triangle',.04,.07);tone(880,.12,'triangle',.04,.14);tone(1320,.25,'sine',.045,.23)},
    gachaLegendary:()=>{tone(330,.10,'triangle',.045);tone(523,.12,'triangle',.05,.09);tone(784,.15,'triangle',.055,.19);tone(1046,.18,'sine',.05,.31);tone(1568,.30,'sine',.045,.44);noise(.25,.035,'highpass',3000,.38)},
    success:()=>{tone(523,.08,'triangle',.04);tone(784,.16,'triangle',.04,.08);tone(1046,.2,'sine',.025,.16)},
    worldBossFire:()=>wbFireCastSfx(),
    worldBossFireImpact:()=>wbFireImpactSfx(),
    worldBossLightning:()=>wbLightningChargeSfx(),
    worldBossLightningStrike:()=>wbLightningStrikeSfx(),
    worldBossVoid:()=>wbVoidChargeSfx(),
    worldBossVoidBlast:()=>wbVoidBlastSfx()
  };
  if(map[name]) map[name]();
}
function stopMusic(){ if(audioState.musicTimer){clearInterval(audioState.musicTimer);audioState.musicTimer=null;} }
function startMusic(mode='farm'){
  ensureAudio(); stopMusic(); audioState.mode=mode;
  const farm=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];
  const rpgm=[146.83,174.61,220,196,164.81,246.94,196,146.83];
  const notes=mode==='rpg'?rpgm:farm; let i=0;
  const tick=()=>{ if(!audioState.enabled) return; const n=notes[i++%notes.length]; tone(n,.42,mode==='rpg'?'triangle':'sine',mode==='rpg'?.018:.012); if(i%4===0) tone(n*2,.16,'sine',.008,.03); };
  tick(); audioState.musicTimer=setInterval(tick,620);
}
function toggleAudio(){
  audioState.enabled=!audioState.enabled;
  if(audioState.enabled){ensureAudio();startMusic(audioState.mode);} else {stopMusic(); if(audioState.master) audioState.master.gain.value=0;}
  const b=document.getElementById('audioToggle'); if(b) b.textContent=audioState.enabled?'🔊 เสียงเปิด':'🔇 เสียงปิด';
  if(audioState.enabled && audioState.master) audioState.master.gain.value=audioState.volume;
}

document.getElementById('audioToggle')?.addEventListener('click',toggleAudio);
document.getElementById('audioCollapseToggle')?.addEventListener('click',(e)=>{
  e.stopPropagation();
  const badge=document.getElementById('audioBadge');
  if(!badge) return;
  const collapsed=badge.classList.toggle('collapsed');
  const btn=document.getElementById('audioCollapseToggle');
  if(btn){ btn.textContent=collapsed?'🔊':'⌄'; btn.setAttribute('aria-label',collapsed?'เปิดแผงเสียง':'พับแผงเสียง'); }
});

function setGameVolume(value){
  audioState.volume=Math.max(0,Math.min(1,Number(value)/100));
  localStorage.setItem("farm_audio_volume", String(audioState.volume));
  if(audioState.master) audioState.master.gain.value=audioState.enabled ? audioState.volume : 0;
  const valueEl=document.getElementById("volumeValue");
  if(valueEl) valueEl.textContent=Math.round(audioState.volume*100)+"%";
  const slider=document.getElementById("volumeSlider");
  if(slider && Number(slider.value)!==Math.round(audioState.volume*100)) slider.value=Math.round(audioState.volume*100);
}
document.getElementById("volumeSlider")?.addEventListener("input",(e)=>setGameVolume(e.target.value));
setGameVolume(audioState.volume*100);

document.getElementById('loginButton')?.addEventListener('click',()=>{ensureAudio();startMusic('farm');});
document.addEventListener('click',(e)=>{
  if(e.target.closest("#rpgDeathModal") && !e.target.closest("button")) return;
  const t=e.target.closest('button, [role="button"], .menu-item, .nav-item, .tab-button');
  if(!t) return;
  if(t.id==='audioToggle' || t.id==='volumeSlider') return;
  if(t.matches('[data-harvest]')) sfx('harvest');
  else if(t.matches('[data-water]')) sfx('water');
  else if(t.matches('[data-special-water]')) sfx('magic');
  else if(t.matches('[data-fertilize]')) sfx('plant');
  else if(t.matches('[data-special-fertilize]')) sfx('magic');
  else if(t.matches('[data-choose-plot], [data-choice-seed]')) sfx('plant');
  else if(t.matches('.buy-seed, #buyFertilizer, #buyWater, #buySpecialWater, #buySpecialFertilizer')) sfx('buy');
  else if(t.id==='diamondWallet' || t.id==='openRpgButton' || t.id==='backToFarmButton') sfx('click');
  else if(!t.closest('.rpg-world')) sfx('click');
});

document.getElementById("resetButton").addEventListener("click", () => {
  if (!confirm("ต้องการลบข้อมูลเกมทั้งหมดใช่หรือไม่?")) return;

  localStorage.removeItem(SAVE_KEY);
  state = defaultState();
  loginScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  usernameInput.value = "";
});


/* =========================
   V20 RPG WORLD PROTOTYPE
   ========================= */
const rpgWorld = document.getElementById("rpgWorld");
const farmMain = document.querySelector("#gameScreen > main");
const openRpgButton = document.getElementById("openRpgButton");
const backToFarmButton = document.getElementById("backToFarmButton");
const rpgCanvas = document.getElementById("rpgCanvas");
const rpgCtx = rpgCanvas?.getContext("2d");

const rpgJunkTypes = [
  { id:"slime", name:"เมือกสัตว์ประหลาด", icon:"🟢", price:4 },
  { id:"fang", name:"เขี้ยวเก่า", icon:"🦷", price:7 },
  { id:"bone", name:"กระดูกผุ", icon:"🦴", price:9 },
  { id:"hide", name:"หนังหยาบ", icon:"🟫", price:12 },
  { id:"herb", name:"สมุนไพรป่า", icon:"🌿", price:15 }
];

state.rpgWeapon = state.rpgWeapon || {
  level: Math.max(1, Number(state.rpgEquipment?.weapon?.level ?? 1)),
  durability: Number(state.rpgEquipment?.weapon?.durability ?? 100),
  broken: Number(state.rpgEquipment?.weapon?.durability ?? 100) <= 0
};

const rpg = {
  running: false,
  lastTime: 0,
  keys: {},
  player: {
    x: 480, y: 300, speed: 185,
    hp: 160, maxHp: 160,
    mana: 100, maxMana: 100,
    level: Math.max(1, Math.min(200, Number(state.rpgCharacter?.level || 1))),
    xp: Math.max(0, Number(state.rpgCharacter?.xp || 0)),
    nextXp: Math.max(100, Number(state.rpgCharacter?.nextXp || 100)),
    attackCd: 0, skillCd: 0, hitCd: 0, footstepCd: 0,
    skillCds: [0,0,0,0,0], selectedSkill:0,
    facing: "down", facingAngle:Math.PI, moving:false, walkTime:0,
    attackAnim:0, skillAnim:0, hurtAnim:0
  },
  packs: [],
  kills: 0,
  particles: [],
  hitEffects: [],
  damageFloats: [],
  junk: {},
  itemInventory: {},
  rareCoins: 0,
  enhanceSlot: "weapon",
  weapon: {
    level: Math.max(1, Number(state.rpgWeapon?.level ?? 1)),
    durability: Number(state.rpgWeapon?.durability ?? 100),
    broken: Boolean(state.rpgWeapon?.broken ?? false),
    regenRank: Math.max(0, Number(state.rpgWeapon?.regenRank ?? 0)),
    rarity: state.rpgEquipment?.weapon?.rarity || "NORMAL",
    baseDamage: 24
  },
  deathPending: false,
  deathCause: "",
  inDungeon: false,
  portalCooldown: 0,
  platform: localStorage.getItem("farmGamePlatform") || "",
  dungeonBag: { coins: 0, junk: {}, items: {} },
  dungeonQuickSlots: ["hpPotion","manaPotion","revivalPotion","",""],
  dragDungeonItem: "",
  combatLog: "เข้าใกล้กองมอนเพื่อเริ่มการต่อสู้"
};

function resetRpgCombatTransientState(){
  // V138 IT RESET: combat-only runtime state must never survive leaving a dungeon/PVP
  // or starting another zone. This clears skill cooldowns, DoT/debuffs, summons and visuals.
  const p=rpg.player;
  if(p){
    p.attackCd=0;
    p.skillCd=0;
    p.hitCd=0;
    p.footstepCd=0;
    p.attackAnim=0;
    p.skillAnim=0;
    p.hurtAnim=0;
    p.skillCds=Array.isArray(p.skillCds)?p.skillCds.map(()=>0):[0,0,0,0,0];
    // Clear all known player status effects/debuff timers.
    delete p.bossPoison;
    delete p.poison;
    delete p.burn;
    delete p.bleed;
    delete p.dot;
    delete p.slow;
    delete p.stun;
    delete p.freeze;
    delete p.statusEffects;
  }

  // Clear runtime skill entities/effects so they cannot follow the player into another map.
  rpg.particles=[];
  rpg.hitEffects=[];
  rpg.damageFloats=[];
  rpg.poisonZones=[];
  rpg.poisonSummons=[];
  rpg.projectiles=[];
  rpg.skillEffects=[];
  rpg.worldBossEffects=[];
  rpg.portalCooldown=0;

  // Clear temporary combat status from all existing enemies too.
  for(const pack of (rpg.packs||[])){
    for(const mob of (pack.mobs||[])){
      delete mob.v88Poison;
      delete mob.poison;
      delete mob.burn;
      delete mob.bleed;
      delete mob.dot;
      delete mob.slow;
      delete mob.statusEffects;
      mob.attackCd=0;
      mob.attackAnim=0;
      mob.hitFlash=0;
      if(Array.isArray(mob.skillCds)) mob.skillCds=mob.skillCds.map(()=>0);
    }
  }
}

function makeRpgPack(x, y, index) {
  const mobs = [];
  const count = 6;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i;
    const radius = 42 + (i % 3) * 18;
    const elite = i === 0;
    mobs.push({
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius,
      homeX: x + Math.cos(angle) * radius,
      homeY: y + Math.sin(angle) * radius,
      hp: elite ? 280 : 105,
      maxHp: elite ? 280 : 105,
      alive: true,
      elite,
      hitFlash: 0,
      attackCd: 0,
      aggro: false,
      attackAnim: 0, slow:0,
    });
  }
  return { x, y, index, mobs, respawnAt: 0 };
}

function resetRpgPacks() {
  rpg.damageFloats = [];
  // WORLD BOSS: this is the authoritative spawn point. Never build normal dungeon packs here.
  if(rpg.currentZone==='worldboss'){
    const boss={
      isWorldBoss:true, elite:true, alive:true, aggro:false,
      x:480,y:205,homeX:480,homeY:205,
      hp:18000,maxHp:18000,attack:18,attackCd:1.2,attackAnim:0,
      hitFlash:0,slow:0,name:'ราชันอสูรโลก',monsterName:'ราชันอสูรโลก',
      attackType:'worldboss',range:0,skillCooldown:4.5,
      bossBasicTimer:1.2,bossSkillTimer:3.5,bossSkillIndex:0,bossCasting:0
    };
    rpg.packs=[{x:480,y:205,index:-999,mobs:[boss],respawnAt:0,isWorldBoss:true}];
    return;
  }
  if (!rpg.junk || typeof rpg.junk !== "object") rpg.junk = {};
  for (const item of rpgJunkTypes) if (typeof rpg.junk[item.id] !== "number") rpg.junk[item.id] = 0;
  const positions = [
    [155,145],[390,125],[690,150],
    [205,380],[500,400],[790,370]
  ];
  rpg.packs = positions.map((p,i)=>makeRpgPack(p[0],p[1],i));
}

function renderCharacterEquipment(){ try{ updateCharacterLobby(); }catch(_){} }
function updateCharacterLobby(){const ws=document.getElementById("characterWeaponStars");if(ws){const w=state.rpgEquipment.weapon||{};ws.innerHTML=weaponStarHtml(getWeaponStars(w),getWeaponTier(w));}
  const p=rpg.player;
  const name=state.username||"ผู้เล่น";
  const eq=state.rpgEquipment?.weapon||{};
  const defense=getEffectiveDefense();
  document.getElementById("characterLobbyName")?.replaceChildren(document.createTextNode(name));
  document.getElementById("characterProfileName")?.replaceChildren(document.createTextNode(name));
  document.getElementById("characterLobbyLevel")?.replaceChildren(document.createTextNode(getRegenRank()>0?`REGEN ${getRegenRank()}`:p.level));
  document.getElementById("lobbyHp")?.replaceChildren(document.createTextNode(p.maxHp));
  document.getElementById("lobbyMp")?.replaceChildren(document.createTextNode(p.maxMana));
  document.getElementById("lobbyDamage")?.replaceChildren(document.createTextNode(getEffectiveWeaponDamage()));
  document.getElementById("lobbyDefense")?.replaceChildren(document.createTextNode(defense));
  document.getElementById("characterPowerName")?.replaceChildren(document.createTextNode(state.rpgCharacter?.powerName||getActivePowerDef().name));
  document.getElementById("characterPowerNamePanel")?.replaceChildren(document.createTextNode(state.rpgCharacter?.powerName||getActivePowerDef().name));
  document.getElementById("characterPowerRank")?.replaceChildren(document.createTextNode(getPowerMeta().label));
  document.getElementById("characterPowerSkillSummary")?.replaceChildren(document.createTextNode(`${getActivePowerDef().skills.slice(0,4).map(s=>s.name).join(" · ")} · Ultimate: ${getActivePowerDef().skills[4]?.name||"Ultimate"}`));
  drawCharacterPreview();
}

function drawCharacterPreview(){
  const c=document.getElementById("characterPreviewCanvas"); if(!c)return;
  const ctx=c.getContext("2d"),w=c.width,h=c.height;
  ctx.clearRect(0,0,w,h);
  const gender=state.gender==="female"?"female":"male";
  const power=getActivePowerDef(), pm=POWER_TIER_META[power.rarity]||POWER_TIER_META.C;
  const cx=w/2, t=performance.now()/1000, bob=Math.sin(t*1.5)*1.2;
  const bg=ctx.createLinearGradient(0,0,0,h); bg.addColorStop(0,"#162b27");bg.addColorStop(.55,"#0e1b18");bg.addColorStop(1,"#060d0b");
  ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  const aura=ctx.createRadialGradient(cx,250,20,cx,290,220);aura.addColorStop(0,pm.color+"44");aura.addColorStop(1,"transparent");
  ctx.fillStyle=aura;ctx.fillRect(0,0,w,h);
  ctx.save();ctx.translate(cx,505+bob);ctx.scale(2.6,2.6);
  ctx.fillStyle="rgba(0,0,0,.52)";ctx.beginPath();ctx.ellipse(0,6,31,9,0,0,Math.PI*2);ctx.fill();
  // tall, clean silhouette — no held weapon
  const skin="#e9b796", hair=gender==="female"?"#281a2c":"#1b1c25";
  const coat=gender==="female"?"#6d3d72":"#315d67", coat2=gender==="female"?"#b889c7":"#70c6c6";
  const leg=gender==="female"?"#252735":"#202a38";
  ctx.fillStyle=leg;ctx.beginPath();ctx.roundRect(-12,4,10,34,4);ctx.roundRect(2,4,10,34,4);ctx.fill();
  ctx.fillStyle="#151a22";ctx.beginPath();ctx.roundRect(-14,35,14,7,3);ctx.roundRect(0,35,14,7,3);ctx.fill();
  const torsoW=gender==="female"?15:18;
  ctx.fillStyle=coat;ctx.beginPath();ctx.roundRect(-torsoW,-18,torsoW*2,29,8);ctx.fill();
  ctx.fillStyle=coat2;ctx.globalAlpha=.35;ctx.beginPath();ctx.roundRect(-torsoW+2,-16,torsoW*2-4,7,5);ctx.fill();ctx.globalAlpha=1;
  ctx.fillStyle=skin;ctx.beginPath();ctx.arc(-19,7,4,0,Math.PI*2);ctx.arc(19,7,4,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=coat2;ctx.lineWidth=7;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(-14,-8);ctx.lineTo(-19,7);ctx.moveTo(14,-8);ctx.lineTo(19,7);ctx.stroke();
  // head / hair
  ctx.fillStyle=skin;ctx.beginPath();ctx.arc(0,-31,13,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=hair;
  if(gender==="male"){
    ctx.beginPath();ctx.arc(0,-35,14,Math.PI,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-13,-34);ctx.lineTo(-9,-44);ctx.lineTo(-3,-35);ctx.lineTo(3,-45);ctx.lineTo(10,-35);ctx.lineTo(14,-28);ctx.lineTo(-14,-28);ctx.closePath();ctx.fill();
    ctx.fillStyle="#1a1a1a";ctx.beginPath();ctx.arc(-4,-31,1.5,0,Math.PI*2);ctx.arc(4,-31,1.5,0,Math.PI*2);ctx.fill();
  }else{
    ctx.beginPath();ctx.arc(0,-34,15,Math.PI,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-14,-34);ctx.quadraticCurveTo(-18,-18,-11,-13);ctx.lineTo(-6,-25);ctx.moveTo(14,-34);ctx.quadraticCurveTo(18,-18,11,-13);ctx.lineTo(6,-25);ctx.stroke();ctx.lineWidth=7;ctx.stroke();
    ctx.fillStyle="#1a1a1a";ctx.beginPath();ctx.arc(-4,-31,1.5,0,Math.PI*2);ctx.arc(4,-31,1.5,0,Math.PI*2);ctx.fill();
  }
  // power core
  ctx.fillStyle=pm.color;ctx.shadowColor=pm.color;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(0,-2,5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.restore();
  ctx.fillStyle="rgba(0,0,0,.7)";ctx.roundRect(cx-135,36,270,34,12);ctx.fill();
  ctx.fillStyle="#fff";ctx.font="bold 14px sans-serif";ctx.textAlign="center";
  ctx.fillText(`${gender==="female"?"หญิง":"ชาย"} · ${state.username||"ผู้เล่น"} · Lv.${state.rpgCharacter?.level||1}`,cx,58);
  ctx.fillStyle=pm.color;ctx.font="bold 12px sans-serif";ctx.fillText(`${power.icon} ${power.name} · ${pm.label}`,cx,78);
}
function requestRpgPlatform(){
  const saved=localStorage.getItem("farmGamePlatform");
  if(saved==="pc" || saved==="mobile"){
    rpg.platform=saved;
    enterRpgJungle();
    return;
  }
  document.getElementById("rpgPlatformModal")?.classList.remove("hidden");
}
function setRpgPlatform(platform){
  if(platform!=="pc" && platform!=="mobile") return;
  rpg.platform=platform;
  localStorage.setItem("farmGamePlatform",platform);
  document.getElementById("rpgPlatformModal")?.classList.add("hidden");
  enterRpgJungle();
  updateDungeonPlatformUI();
}
function updateDungeonPlatformUI(){
  const isMobile=rpg.platform==="mobile";
  const world=document.getElementById("rpgWorld");
  document.getElementById("dungeonJoystick")?.classList.toggle("hidden",!isMobile);
  document.getElementById("pcMovePad")?.classList.toggle("hidden",isMobile);
  document.querySelector(".legacy-rpg-controls")?.classList.toggle("platform-mobile",isMobile);
  document.querySelector(".legacy-rpg-controls")?.classList.toggle("platform-pc",!isMobile);
  world?.classList.toggle("platform-mobile-mode",isMobile);
  world?.classList.toggle("platform-pc-mode",!isMobile);
  // The same combat wheel is used on both platforms; only movement input changes.
  document.getElementById("rpgAttackButton")?.setAttribute("title",isMobile ? "แตะเพื่อโจมตี" : "คลิกเพื่อโจมตี");
}
function initDungeonPlatformUI(){
  document.querySelectorAll("[data-platform]").forEach(btn=>btn.addEventListener("click",()=>setRpgPlatform(btn.dataset.platform)));
  document.getElementById("platformCancelButton")?.addEventListener("click",()=>{
    document.getElementById("rpgPlatformModal")?.classList.add("hidden");
    if(rpg.currentZone==='tower' && rpg._towerEntryPending){
      rpg._towerEntryPending=false;
      document.getElementById("rpgTowerSelectScreen")?.classList.remove("hidden");
      updateTowerEntryStatus?.();
    }
  });
  updateDungeonPlatformUI();
}
function setupDungeonJoystick(){
  const joy=document.getElementById("dungeonJoystick"), stick=document.getElementById("dungeonJoystickStick");
  if(!joy || !stick || joy.dataset.bound==="1") return;
  joy.dataset.bound="1";
  let active=false;
  const move=e=>{
    if(!active) return;
    const r=joy.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
    let dx=e.clientX-cx, dy=e.clientY-cy, max=r.width*.32;
    const len=Math.hypot(dx,dy);
    if(len>max){dx=dx/len*max;dy=dy/len*max;}
    stick.style.transform=`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    const nx=dx/max, ny=dy/max, dead=.18;
    rpg.keys.w=ny<-dead; rpg.keys.s=ny>dead; rpg.keys.a=nx<-dead; rpg.keys.d=nx>dead;
  };
  const end=()=>{
    active=false;
    stick.style.transform="translate(-50%,-50%)";
    rpg.keys.w=rpg.keys.a=rpg.keys.s=rpg.keys.d=false;
  };
  joy.addEventListener("pointerdown",e=>{active=true;joy.setPointerCapture?.(e.pointerId);move(e);});
  joy.addEventListener("pointermove",move);
  joy.addEventListener("pointerup",end);
  joy.addEventListener("pointercancel",end);
  joy.addEventListener("lostpointercapture",end);
}
function openCharacterLobby(){
  farmMain?.classList.add("hidden");
  rpgWorld?.classList.add("hidden");
  document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
  document.getElementById("rpgTowerSelectScreen")?.classList.add("hidden");
  document.getElementById("rpgCharacterScreen")?.classList.remove("hidden");
  openRpgButton?.classList.add("hidden");
  rpg.running=false;
  rpg.inDungeon=false;
  stopMusic(); ensureAudio(); startMusic("rpg");
  updateCharacterLobby();
}

function updateZonePlatformSelector(){
  const current = (rpg.platform==="pc" || rpg.platform==="mobile")
    ? rpg.platform
    : (localStorage.getItem("farmGamePlatform") || "pc");

  // Default to PC only when no choice has ever been made.
  if(rpg.platform!=="pc" && rpg.platform!=="mobile"){
    rpg.platform = current;
    localStorage.setItem("farmGamePlatform", current);
  }

  document.querySelectorAll("[data-zone-platform]").forEach(btn=>{
    const active = btn.dataset.zonePlatform === rpg.platform;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  const selector = document.getElementById("zonePlatformSelector");
  selector?.setAttribute("data-platform", rpg.platform);
}

function setZonePlatform(platform){
  if(platform!=="pc" && platform!=="mobile") return;
  rpg.platform = platform;
  localStorage.setItem("farmGamePlatform", platform);
  updateZonePlatformSelector();

  // Keep the same platform state that the dungeon UI already uses.
  updateDungeonPlatformUI();
}

function openRpgZoneSelect(){
  document.getElementById("rpgCharacterScreen")?.classList.add("hidden");
  document.getElementById("rpgZoneSelectScreen")?.classList.remove("hidden");
  updateZonePlatformSelector();
}

function backToCharacterLobby(){
  document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
  document.getElementById("rpgCharacterScreen")?.classList.remove("hidden");
  updateCharacterLobby();
}

// V177 — Tower monthly reward cycle: starts when this version is first opened, lasts one calendar month.
const TOWER_MONTHLY_CYCLE_MS=0; // calendar-month logic is used instead of a fixed 30-day approximation.
// V192 — Tower reward configuration is shared globally, not stored per player account.
// Only the Tower reward config uses this key; all other systems remain unchanged.
const TOWER_REWARD_DEFAULTS={1:[{id:'magicPowder',amount:3}]};
const TOWER_GLOBAL_REWARD_CONFIG_KEY='farm_game_global_tower_reward_config_v1';
function normalizeTowerRewardRows(rows){return (Array.isArray(rows)?rows:[]).map(row=>({id:String(row?.id||''),amount:Math.max(1,Math.floor(Number(row?.amount)||0))})).filter(row=>row.id&&row.amount>0&&ITEM_DATABASE?.[row.id]);}
function loadGlobalTowerRewardConfig(){
  try{const saved=JSON.parse(localStorage.getItem(TOWER_GLOBAL_REWARD_CONFIG_KEY)||'{}');return saved&&typeof saved==='object'&&!Array.isArray(saved)?saved:{};}catch(_){return {};}
}
function getTowerRewards(floor){
  const key=String(floor),config=loadGlobalTowerRewardConfig(),rows=normalizeTowerRewardRows(config[key]);
  if(rows.length)return rows;
  return (TOWER_REWARD_DEFAULTS[floor]||[]).map(x=>({...x}));
}
function saveTowerRewardsFromSecondaryAdmin(floor,rows){
  const config=loadGlobalTowerRewardConfig();
  config[String(floor)]=normalizeTowerRewardRows(rows);
  localStorage.setItem(TOWER_GLOBAL_REWARD_CONFIG_KEY,JSON.stringify(config));
}
// Keep the Tower screen synchronized when another game tab changes the shared Tower rewards.
window.addEventListener('storage',e=>{if(e.key===TOWER_GLOBAL_REWARD_CONFIG_KEY){try{renderTowerFloorSelect(true);}catch(_){}}});

// V178 — Global Tower Season: one shared calendar for every account.
// The season anchor is fixed for the whole game, not created per player/account.
// Start: 13 Aug 2026, 00:00 Thailand time. Every following season changes on the 13th at 00:00.
const TOWER_GLOBAL_SEASON_ANCHOR=Date.parse('2026-08-13T00:00:00+07:00');
function getGlobalTowerCycle(now=Date.now()){
  let start=TOWER_GLOBAL_SEASON_ANCHOR;
  while(true){
    const d=new Date(start); d.setMonth(d.getMonth()+1);
    const end=d.getTime();
    if(now<end) return {start,end};
    start=end;
  }
}
function syncTowerMonthlyCycle(){
  state.towerMonthly=state.towerMonthly||{};
  const cycle=getGlobalTowerCycle();
  state.towerMonthly.cleared=state.towerMonthly.cleared||{};
  state.towerMonthly.claimed=state.towerMonthly.claimed||{};
  // Migrate old per-account timer saves into the shared global season.
  if(Number(state.towerMonthly.seasonStart)!==cycle.start){
    state.towerMonthly.seasonStart=cycle.start;
    state.towerMonthly.startAt=cycle.start;
    state.towerMonthly.cleared={};
    state.towerMonthly.claimed={};
    saveState();
  }
  return cycle;
}
function formatTowerRemaining(ms){ ms=Math.max(0,ms); const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000),sec=Math.floor(ms%60000/1000); return `${d}วัน ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; }
function updateTowerMonthlyStatus(){ const el=document.getElementById('towerMonthlyResetStatus'); if(!el)return; const c=syncTowerMonthlyCycle(); el.textContent=`🌐 รีเซ็ตหอคอยพร้อมกันทั้งเซิร์ฟเวอร์ใน: ${formatTowerRemaining(c.end-Date.now())}`; }
function markTowerFloorCleared(floor){ syncTowerMonthlyCycle(); state.towerMonthly.cleared[String(floor)]=true; saveState(); renderTowerFloorSelect(true); }
function claimTowerReward(floor){syncTowerMonthlyCycle();const key=String(floor),rewards=getTowerRewards(floor);if(!rewards.length){alert('ชั้นนี้ยังไม่มีรางวัลกำหนดไว้');return;}if(!state.towerMonthly.cleared[key]){alert('ต้องเคลียร์ชั้นนี้ก่อนจึงจะรับรางวัลได้');return;}if(state.towerMonthly.claimed[key]){alert('คุณรับรางวัลของชั้นนี้ในรอบนี้ไปแล้ว');return;}state.rpgInventory=state.rpgInventory||{};rewards.forEach(r=>state.rpgInventory[r.id]=(Number(state.rpgInventory[r.id])||0)+r.amount);state.towerMonthly.claimed[key]=true;saveState();if(typeof renderRpgBag==='function')renderRpgBag();renderTowerFloorSelect(true);alert('ได้รับรางวัล: '+rewards.map(r=>`${ITEM_DATABASE?.[r.id]?.icon||'🎁'} ${ITEM_DATABASE?.[r.id]?.name||r.id} x${r.amount}`).join(' · '));}
function openTowerRewardSecret(floor){syncTowerMonthlyCycle();const rewards=getTowerRewards(floor);if(!rewards.length)return;const key=String(floor),status=state.towerMonthly.claimed[key]?'รับแล้วในรอบนี้':(state.towerMonthly.cleared[key]?'กดรับรางวัลได้':'ยังไม่ปลดล็อก — เคลียร์ชั้นนี้ก่อน');let modal=document.getElementById('towerRewardModal');if(!modal){modal=document.createElement('div');modal.id='towerRewardModal';modal.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.72);padding:20px';document.body.appendChild(modal);}const list=rewards.map(r=>{const d=ITEM_DATABASE?.[r.id]||{icon:'🎁',name:r.id};return `<div style="display:flex;justify-content:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.08)"><span>${d.icon}</span><b>${d.name}</b><span>x${r.amount}</span></div>`}).join('');modal.innerHTML=`<div style="max-width:420px;width:100%;text-align:center;padding:28px 22px;border-radius:20px;border:2px solid #8f67d7;background:linear-gradient(180deg,#211934,#100d18);color:#fff"><h2 style="margin:8px 0">รางวัลชั้น ${floor}</h2><div style="margin:14px 0;text-align:left">${list}</div><small style="display:block;margin:0 0 18px;color:#b7aec8">${status}</small><button id="towerRewardClaimBtn" style="border:0;border-radius:12px;padding:12px 24px;font-weight:900;cursor:pointer;margin-right:8px">รับรางวัล</button><button id="towerRewardCloseBtn" style="border:0;border-radius:12px;padding:12px 18px;cursor:pointer">ปิด</button></div>`;modal.querySelector('#towerRewardCloseBtn').onclick=()=>modal.remove();modal.querySelector('#towerRewardClaimBtn').onclick=()=>{claimTowerReward(floor);modal.remove();};}
setInterval(()=>{ updateTowerMonthlyStatus(); },1000);

// V176 — Tower only: 3 entries per account per local calendar day, automatically reset at 00:00.
const TOWER_DAILY_MAX_ENTRIES=3;
function getTowerLocalDateKey(now=new Date()){
  const y=now.getFullYear(), m=String(now.getMonth()+1).padStart(2,'0'), d=String(now.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function syncTowerDailyEntries(){
  state.towerDaily=state.towerDaily||{};
  const today=getTowerLocalDateKey();
  if(state.towerDaily.date!==today){
    state.towerDaily.date=today;
    state.towerDaily.used=0;
    saveState();
  }
  state.towerDaily.used=Math.max(0,Math.min(TOWER_DAILY_MAX_ENTRIES,Number(state.towerDaily.used)||0));
  return TOWER_DAILY_MAX_ENTRIES-state.towerDaily.used;
}
function updateTowerEntryStatus(){
  const el=document.getElementById('towerDailyEntryStatus');
  if(!el) return;
  const remaining=syncTowerDailyEntries();
  el.textContent=`🎟️ จำนวนครั้งที่เหลือวันนี้: ${remaining}/${TOWER_DAILY_MAX_ENTRIES}`;
  el.classList.toggle('tower-entry-empty',remaining<=0);
}
function consumeTowerEntry(){
  const remaining=syncTowerDailyEntries();
  if(remaining<=0) return false;
  state.towerDaily.used=(Number(state.towerDaily.used)||0)+1;
  saveState();
  updateTowerEntryStatus();
  return true;
}
function renderTowerFloorSelect(force=false){
  const grid=document.getElementById("towerFloorGrid");
  updateTowerEntryStatus(); updateTowerMonthlyStatus(); syncTowerMonthlyCycle();
  if(!grid) return;
  if(force){ grid.dataset.ready=''; grid.replaceChildren(); }
  if(grid.dataset.ready==="1") return;
  grid.dataset.ready="1";
  const frag=document.createDocumentFragment();
  for(let floor=1; floor<=200; floor++){
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="tower-floor-card"+(floor===1?" tower-floor-open":"");
    if(floor===1){
      const rewards=getTowerRewards(floor), first=rewards[0], def=first?ITEM_DATABASE?.[first.id]:null;
      btn.innerHTML=`<button type="button" class="tower-reward-secret" title="ดูรางวัล">${def?.icon||'🎁'}<em>${rewards.length>1?'+'+rewards.length:'x'+(first?.amount||0)}</em></button><span>🗼</span><b>ชั้น 1</b><small>${state.towerMonthly.claimed['1']?'รับรางวัลแล้ว':state.towerMonthly.cleared['1']?'เคลียร์แล้ว · มีรางวัล':'เข้าสู่การต่อสู้'}</small>`;
      btn.addEventListener("click",()=>enterTowerFloor(1));
      btn.querySelector('.tower-reward-secret').addEventListener('click',(e)=>{e.stopPropagation();openTowerRewardSecret(1);});
    }else{
      btn.disabled=true;
      btn.innerHTML=`<span>🔒</span><b>ชั้น ${floor}</b><small>ล็อกไว้ก่อน</small>`;
    }
    frag.appendChild(btn);
  }
  grid.appendChild(frag);
}
function enterTowerFloor(floor){
  if(floor!==1) return;
  const remaining=syncTowerDailyEntries();
  updateTowerEntryStatus();
  if(remaining<=0){
    alert('วันนี้คุณใช้จำนวนครั้งเล่นหอคอยครบ 3/3 ครั้งแล้ว กรุณารอรีเซ็ตเวลา 00:00 น.');
    return;
  }
  rpg.towerFloor=1;
  rpg._towerVictoryShown=false;
  rpg._towerEntryPending=true;
  rpg.currentZone='tower';
  document.getElementById("rpgTowerSelectScreen")?.classList.add("hidden");
  requestRpgPlatform();
}
function openTowerSelect(){
  document.getElementById("rpgCharacterScreen")?.classList.add("hidden");
  document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
  document.getElementById("rpgTowerSelectScreen")?.classList.remove("hidden");
  renderTowerFloorSelect();
  updateTowerEntryStatus(); updateTowerMonthlyStatus();
}
function backFromTowerSelect(){
  document.getElementById("rpgTowerSelectScreen")?.classList.add("hidden");
  document.getElementById("rpgCharacterScreen")?.classList.remove("hidden");
  updateCharacterLobby();
}

// World Boss only — 90-second countdown. Kept separate from normal dungeon/PvP/Tower combat.
// World Boss only — 90-second countdown. It continues through death/revive and ends the encounter at 00:00.
let worldBossTimerInterval=null;
let worldBossTimerEndAt=0;
let worldBossTimerExpired=false;
function stopWorldBossTimer(){
  if(worldBossTimerInterval!==null){clearInterval(worldBossTimerInterval);worldBossTimerInterval=null;}
  worldBossTimerEndAt=0;
  worldBossTimerExpired=false;
  const hud=document.getElementById('worldBossTimerHud');
  if(hud)hud.classList.add('hidden');
}
function finishWorldBossByTime(){
  // Guard against duplicate expiry calls. This affects World Boss only.
  if(worldBossTimerExpired || rpg.currentZone!=='worldboss') return;
  worldBossTimerExpired=true;
  if(worldBossTimerInterval!==null){clearInterval(worldBossTimerInterval);worldBossTimerInterval=null;}
  const text=document.getElementById('worldBossTimerText');
  if(text) text.textContent='00:00';
  // Freeze the active encounter before showing the confirmation.
  rpg.keys={w:false,a:false,s:false,d:false,q:false};
  rpg.player.moving=false;
  rpg.combatLog='⏰ หมดเวลาแล้ว';
  syncRpgHud?.();
  // The player must acknowledge the message, then is forcibly returned out of the battle.
  alert('⏰ หมดเวลาแล้ว');
  if(rpg.currentZone==='worldboss') closeRpg();
}
function startWorldBossTimer(){
  stopWorldBossTimer();
  const hud=document.getElementById('worldBossTimerHud');
  const text=document.getElementById('worldBossTimerText');
  if(!hud||!text)return;
  worldBossTimerExpired=false;
  worldBossTimerEndAt=Date.now()+90000;
  const render=()=>{
    const remaining=Math.max(0,worldBossTimerEndAt-Date.now());
    const totalSeconds=Math.ceil(remaining/1000);
    const minutes=Math.floor(totalSeconds/60);
    const seconds=totalSeconds%60;
    text.textContent=`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    if(remaining<=0) finishWorldBossByTime();
  };
  hud.classList.remove('hidden');
  render();
  if(!worldBossTimerExpired) worldBossTimerInterval=setInterval(render,250);
}

function enterRpgJungle(){
  // Consume exactly one daily Tower entry only when the player actually enters the Tower battle.
  if(rpg.currentZone==='tower' && rpg._towerEntryPending){
    rpg._towerEntryPending=false;
    if(!consumeTowerEntry()){
      document.getElementById("rpgTowerSelectScreen")?.classList.remove("hidden");
      updateTowerEntryStatus();
      return;
    }
  }
  document.getElementById("rpgCharacterScreen")?.classList.add("hidden");
  document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
  rpgWorld?.classList.remove("hidden");
  rpgWorld?.classList.add("dungeon-clean-mode");
  rpg.running=true;
  rpg.inDungeon=true;
  rpg.player.x=480; rpg.player.y=300;
  rpg.keys={w:false,a:false,s:false,d:false,q:false};
  rpg.player.moving=false;
  resetRpgCombatTransientState();
  rpg.portalCooldown=0;
  prepareDungeonBag();
  rpg.packs=[];
  rpg.hitEffects=[]; rpg.particles=[];
  ensureAudio(); startMusic("rpg");
  rpg.lastTime=performance.now();
  resetRpgPacks();
  // WORLD BOSS spawn is asserted immediately after shared combat initialization.
  // No normal dungeon pack can survive this point.
  if(rpg.currentZone==='worldboss'){
    resetRpgPacks();
    startWorldBossTimer();
  }else{
    stopWorldBossTimer();
  }
  updateDungeonPlatformUI();
  syncRpgHud(); renderRpgInventory(); renderDungeonBag(); renderDungeonQuickbar();
  // Put focus on the game surface so PC users immediately understand that the dungeon is active,
  // while the actual keyboard listener remains window-level and therefore does not depend on focus.
  rpgCanvas?.setAttribute("tabindex","0");
  rpgCanvas?.focus?.({preventScroll:true});
  requestAnimationFrame(rpgLoop);
}

function closeRpg(){
  stopWorldBossTimer();
  if(isPvpBattleActive()){ finishRpgPvp('lose'); return; }
  const leavingDungeon=!!rpg.inDungeon;
  // If the player leaves while dead without using a revival potion, apply exactly the
  // same random durability loss as free respawn, but DO NOT respawn the player.
  if(leavingDungeon && rpg.deathPending){
    const losses=damageEquipmentOnDeath();
    rpg.combatLog=losses.length?`☠️ ออกจากดันเจี้ยนโดยไม่ชุบ — ${losses.join(" · ")}`:"☠️ ออกจากดันเจี้ยนโดยไม่ชุบ";
    rpg.deathPending=false;
    document.getElementById("rpgDeathModal")?.classList.add("hidden");
    document.getElementById("rpgShopModal")?.classList.add("hidden");
    saveState(); renderRpgInventory(); syncRpgHud();
  }
  if(leavingDungeon) flushDungeonBag();
  // Leaving a dungeon is a hard combat reset: no cooldown, poison, summon or skill effect may carry over.
  resetRpgCombatTransientState();
  rpg.running=false; rpg.inDungeon=false; rpg.packs=[]; rpg.hitEffects=[]; rpg.particles=[];
  rpg.keys={w:false,a:false,s:false,d:false,q:false}; rpg.player.moving=false;
  rpgWorld?.classList.add("hidden");
  rpgWorld?.classList.remove("dungeon-clean-mode");
  if(leavingDungeon){
    // Returning from a dungeon must go back to the dungeon entrance/zone selection, not the farm.
    farmMain?.classList.add("hidden");
    document.getElementById("rpgCharacterScreen")?.classList.add("hidden");
    if(rpg.currentZone==='tower'){
      document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
      document.getElementById("rpgTowerSelectScreen")?.classList.remove("hidden");
    }else if(rpg.currentZone==='worldboss'){
      document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
      document.getElementById("rpgTowerSelectScreen")?.classList.add("hidden");
      document.getElementById("worldBossScreen")?.classList.remove("hidden");
      renderWorldBossRank();
    }else{
      document.getElementById("rpgTowerSelectScreen")?.classList.add("hidden");
      document.getElementById("worldBossScreen")?.classList.add("hidden");
      document.getElementById("rpgZoneSelectScreen")?.classList.remove("hidden");
    }
    openRpgButton?.classList.add("hidden");
    updateZonePlatformSelector();
    ensureAudio(); startMusic("rpg");
  }else{
    stopMusic(); startMusic("farm");
    document.getElementById("rpgCharacterScreen")?.classList.add("hidden");
    document.getElementById("rpgZoneSelectScreen")?.classList.add("hidden");
    document.getElementById("rpgTowerSelectScreen")?.classList.add("hidden");
    farmMain?.classList.remove("hidden");
    openRpgButton?.classList.remove("hidden");
    render();
  }
}


openRpgButton?.addEventListener("click",openCharacterLobby);
document.getElementById("characterWorldButton")?.addEventListener("click",openRpgZoneSelect);
document.getElementById("characterTowerButton")?.addEventListener("click",openTowerSelect);
document.getElementById("towerBackCharacterButton")?.addEventListener("click",backFromTowerSelect);
document.getElementById("zoneBackCharacterButton")?.addEventListener("click",backToCharacterLobby);
document.getElementById("enterJungleZoneButton")?.addEventListener("click",()=>window.tryEnterDungeonZone?.("jungle"));
document.querySelectorAll("[data-zone-platform]").forEach(btn=>{
  btn.addEventListener("click",()=>setZonePlatform(btn.dataset.zonePlatform));
});
document.getElementById("characterBackFarmButton")?.addEventListener("click",closeRpg);
document.getElementById("characterEquipmentButton")?.addEventListener("click",()=>openRpgModal("rpgInventoryModal"));
document.getElementById("characterEquipmentBagButton")?.addEventListener("click",()=>openRpgModal("characterEquipmentBagModal"));
document.getElementById("openEquipmentBagFromInventory")?.addEventListener("click",()=>openRpgModal("characterEquipmentBagModal"));
document.getElementById("equipmentBagEquipButton")?.addEventListener("click",equipSelectedEquipment);
document.getElementById("unequipAllEquipmentButton")?.addEventListener("click",unequipAllEquipment);
document.getElementById("characterBagButton")?.addEventListener("click",()=>openRpgModal("rpgBagModal"));
// V150: Rank-only point ladder. All non-rank systems remain untouched.
const RANK_ORDER = [
  {rank:"ทองแดง", icon:"🥉", divisions:["I","II","III","IV"]},
  {rank:"เงิน", icon:"🥈", divisions:["I","II","III","IV"]},
  {rank:"ทอง", icon:"🥇", divisions:["I","II","III","IV"]},
  {rank:"เพชร", icon:"💎", divisions:["I","II","III","IV"]},
  {rank:"มาสเตอร์", icon:"👑", divisions:["I","II","III","IV"]},
  {rank:"ตำนาน", icon:"🌟", divisions:[]}
];
const RANK_PROMOTION_REWARDS = [
  {key:"bronze_2",rank:"ทองแดง",division:"II",icon:"🥉",diamonds:10},{key:"bronze_3",rank:"ทองแดง",division:"III",icon:"🥉",diamonds:20},{key:"bronze_4",rank:"ทองแดง",division:"IV",icon:"🥉",diamonds:30},
  {key:"silver_1",rank:"เงิน",division:"I",icon:"🥈",diamonds:40},{key:"silver_2",rank:"เงิน",division:"II",icon:"🥈",diamonds:50},{key:"silver_3",rank:"เงิน",division:"III",icon:"🥈",diamonds:60},{key:"silver_4",rank:"เงิน",division:"IV",icon:"🥈",diamonds:75},
  {key:"gold_1",rank:"ทอง",division:"I",icon:"🥇",diamonds:100},{key:"gold_2",rank:"ทอง",division:"II",icon:"🥇",diamonds:125},{key:"gold_3",rank:"ทอง",division:"III",icon:"🥇",diamonds:150},{key:"gold_4",rank:"ทอง",division:"IV",icon:"🥇",diamonds:200},
  {key:"diamond_1",rank:"เพชร",division:"I",icon:"💎",diamonds:250},{key:"diamond_2",rank:"เพชร",division:"II",icon:"💎",diamonds:300},{key:"diamond_3",rank:"เพชร",division:"III",icon:"💎",diamonds:350},{key:"diamond_4",rank:"เพชร",division:"IV",icon:"💎",diamonds:450},
  {key:"master_1",rank:"มาสเตอร์",division:"I",icon:"👑",diamonds:550},{key:"master_2",rank:"มาสเตอร์",division:"II",icon:"👑",diamonds:650},{key:"master_3",rank:"มาสเตอร์",division:"III",icon:"👑",diamonds:800},{key:"master_4",rank:"มาสเตอร์",division:"IV",icon:"👑",diamonds:1000},{key:"legend",rank:"ตำนาน",division:"",icon:"🌟",diamonds:2000}
];
// V156: Ranked population simulator. Each visible division has 100 AI players.
// The leaderboard always shows only the player's current division/rank.
const RANK_SIMULATED_NAMES=["Astra","Nova","Raven","Luna","Orion","Blaze","Mika","Kai","Iris","Atlas","Nami","Zen","Frost","Ruby","Echo","Moss","Pixel","Bolt","Cloud","Pico","Shadow","Viper","Storm","Flare","Onyx","Sora","Kira","Talon","Nyx","Aria","Dante","Rin","Kane","Milo","Zara","Axel","Jade","Rogue","Aero","Skye"];
function rankFromPoints(points){
  const p=Math.max(0,Math.floor(Number(points)||0));
  const idx=Math.max(0,Math.min(19,Math.floor(Math.max(0,p-500)/500)));
  const ri=Math.floor(idx/4),di=idx%4,m=RANK_ORDER[ri];
  return {rank:m.rank,division:m.divisions[di]};
}
function simulatedDivisionBase(rank,division){
  const ri=RANK_ORDER.findIndex(x=>x.rank===rank),di=ri>=0?RANK_ORDER[ri].divisions.indexOf(division):-1;
  return ri>=0&&di>=0?500+(ri*4+di)*500:0;
}
function buildSimulatedRankPlayers(){
  const out=[];
  RANK_ORDER.forEach((meta,ri)=>{
    if(meta.rank==="ตำนาน"){
      for(let n=1;n<=100;n++){
        out.push({id:`ai-rank-legend-${n}`,name:`${RANK_SIMULATED_NAMES[(n+19)%RANK_SIMULATED_NAMES.length]} ${n}`,points:20000+(100-n)*35,avatar:"🌟",rank:"ตำนาน",division:"",isSimulatedAI:true});
      }
      return;
    }
    meta.divisions.forEach((division,di)=>{
      const base=500+(ri*4+di)*500;
      for(let n=1;n<=100;n++){
        // #1 is always just below the next division's score gate.
        const points=base+495-Math.floor((n-1)*4.9);
        out.push({id:`ai-rank-${ri}-${di}-${n}`,name:`${RANK_SIMULATED_NAMES[(ri*400+di*100+n-1)%RANK_SIMULATED_NAMES.length]} ${n}`,points,avatar:["🤖","⚔️","🛡️","🐺","🦊","🧙","🐉","🌙"][(n-1)%8],rank:meta.rank,division,isSimulatedAI:true});
      }
    });
  });
  return out;
}
const RANK_SIMULATED_PLAYERS=buildSimulatedRankPlayers();
function ensureSimulatedRankPlayers(r){
  // Always repair old saves that only had the previous small AI sample.
  if(!Array.isArray(r.simulatedPlayers)||r.simulatedPlayers.length!==RANK_SIMULATED_PLAYERS.length){
    r.simulatedPlayers=RANK_SIMULATED_PLAYERS.map(x=>({...x}));
  }
  return r.simulatedPlayers;
}
function ensureRankState(){
  state.rank=state.rank||{}; const r=state.rank;
  r.currentRank=r.currentRank||r.tier||"ทองแดง";r.currentDivision=r.currentDivision||r.division||"I";
  let ri=RANK_ORDER.findIndex(x=>x.rank===r.currentRank);if(ri<0){r.currentRank="ทองแดง";r.currentDivision="I";ri=0;}
  const meta=RANK_ORDER[ri];if(meta.rank==="ตำนาน")r.currentDivision="";else if(!meta.divisions.includes(r.currentDivision))r.currentDivision="I";
  r.points=Math.max(0,Math.floor(Number(r.points??500)||500));
  r.wins=Math.max(0,Math.floor(Number(r.wins)||0));r.losses=Math.max(0,Math.floor(Number(r.losses)||0));
  r.seasonMatches=Math.max(0,Math.floor(Number(r.seasonMatches)||0));
  r.rankPromotionRewardState=(r.rankPromotionRewardState&&typeof r.rankPromotionRewardState==="object")?r.rankPromotionRewardState:{};
  r.rankPromotionRewardsClaimed=(r.rankPromotionRewardsClaimed&&typeof r.rankPromotionRewardsClaimed==="object")?r.rankPromotionRewardsClaimed:{};
  RANK_PROMOTION_REWARDS.forEach(x=>{if(r.rankPromotionRewardsClaimed[x.key])r.rankPromotionRewardState[x.key]="claimed";else if(!["locked","pending","claimed"].includes(r.rankPromotionRewardState[x.key]))r.rankPromotionRewardState[x.key]="locked";});
  r.tier=r.currentRank;r.division=r.currentDivision;return r;
}
function rankMeta(r=ensureRankState()){return RANK_ORDER.find(x=>x.rank===r.currentRank)||RANK_ORDER[0];}
function rankFlatIndex(r=ensureRankState()){if(r.currentRank==="ตำนาน")return 20;const ri=RANK_ORDER.findIndex(x=>x.rank===r.currentRank),di=rankMeta(r).divisions.indexOf(r.currentDivision);return Math.max(0,ri*4+di);}
function setRankFlatIndex(i,r=ensureRankState()){i=Math.max(0,Math.min(19,Math.floor(Number(i)||0)));const ri=Math.floor(i/4),di=i%4,m=RANK_ORDER[ri];r.currentRank=m.rank;r.currentDivision=m.divisions[di];r.tier=r.currentRank;r.division=r.currentDivision;}
function isMaxRank(r=ensureRankState()){return r.currentRank==="ตำนาน";}
function saveRankState(){ensureRankState();saveState();}
function showRankNotice(type,from,to){const box=document.getElementById('rankResultNotice');if(!box)return;box.textContent=`${type}\n${from} → ${to}`;box.hidden=false;clearTimeout(showRankNotice.t);showRankNotice.t=setTimeout(()=>box.hidden=true,2600);}
function rankLabel(r=ensureRankState()){const m=rankMeta(r);return isMaxRank(r)?`${m.icon} ตำนาน`:`${m.icon} ${r.currentRank} ${r.currentDivision}`;}
function getRankRewardForState(r=ensureRankState()){return RANK_PROMOTION_REWARDS.find(x=>x.rank===r.currentRank&&x.division===r.currentDivision)||null;}
function rankPromotionThreshold(r=ensureRankState()){
  // Every division has a fixed score gate. A large score increase can therefore
  // pass multiple gates in one update; MASTER IV remains capped until seasonal reset.
  return 1000+(rankFlatIndex(r)+1)*500;
}
function rankCompetitorTopScore(r=ensureRankState()){return rankPromotionThreshold(r);}
function canPromoteByPoints(r=ensureRankState()){return !isMaxRank(r)&&rankFlatIndex(r)<19&&r.points>rankCompetitorTopScore(r);}
function promoteRank(r=ensureRankState()){
  if(rankFlatIndex(r)>=19)return false;const from=rankLabel(r),oldRank=r.currentRank;setRankFlatIndex(rankFlatIndex(r)+1,r);showRankNotice(oldRank!==r.currentRank?'🎉 PROMOTION!':'🎉 RANK UP!',from,rankLabel(r));checkRankPromotionReward(r,true);return true;
}
function demoteRank(r=ensureRankState()){if(isMaxRank(r)||rankFlatIndex(r)<=0)return false;const from=rankLabel(r);setRankFlatIndex(rankFlatIndex(r)-1,r);showRankNotice('⚠️ RANK DOWN',from,rankLabel(r));return true;}
function tryPromoteByPoints(r=ensureRankState()){let moved=false;while(canPromoteByPoints(r)){promoteRank(r);moved=true;}return moved;}
function addRankStar(amount=1){const r=ensureRankState();r.points+=Math.max(0,Math.floor(Number(amount)||0))*40;tryPromoteByPoints(r);refreshRankLeaderboard(r);saveRankState();updateRankScreen();return true;}
function removeRankStar(amount=1){const r=ensureRankState();r.points=Math.max(0,r.points-Math.max(0,Math.floor(Number(amount)||0))*20);refreshRankLeaderboard(r);saveRankState();updateRankScreen();return true;}
let rankRewardClaimInProgress=false;let rankRewardModalTimer=null;
function checkRankPromotionReward(r=ensureRankState(),showModal=true){const reward=getRankRewardForState(r);if(!reward)return null;const status=r.rankPromotionRewardState[reward.key];if(status==="claimed"||r.rankPromotionRewardsClaimed[reward.key])return null;if(status!=="pending"){r.rankPromotionRewardState[reward.key]="pending";saveRankState();}renderRankRewards();if(showModal)queueRankRewardModal(reward.key);return reward;}
function queueRankRewardModal(key){clearTimeout(rankRewardModalTimer);rankRewardModalTimer=setTimeout(()=>openRankRewardModal(key),350);}
function openRankRewardModal(key){const r=ensureRankState(),reward=RANK_PROMOTION_REWARDS.find(x=>x.key===key);if(!reward||r.rankPromotionRewardState[key]!=="pending")return;const modal=document.getElementById("rankRewardModal"),name=document.getElementById("rankRewardModalName"),amount=document.getElementById("rankRewardModalAmount");if(!modal||!name||!amount)return;name.textContent=`${reward.icon} ${reward.rank}${reward.division?" "+reward.division:""}`;amount.textContent=`💎 +${Number(reward.diamonds).toLocaleString()} เพชร`;modal.dataset.rewardKey=key;modal.classList.remove("hidden");}
function closeRankRewardModal(){const m=document.getElementById("rankRewardModal");if(m)m.classList.add("hidden");}
function claimRankPromotionReward(key){if(rankRewardClaimInProgress)return false;const r=ensureRankState(),reward=RANK_PROMOTION_REWARDS.find(x=>x.key===key);if(!reward||r.rankPromotionRewardState[key]!=="pending"||r.rankPromotionRewardsClaimed[key])return false;rankRewardClaimInProgress=true;const btn=document.getElementById("rankRewardClaimButton");if(btn)btn.disabled=true;try{const before=Number(state.diamonds);if(!Number.isFinite(before))throw new Error("Invalid diamond balance");state.diamonds=before+Number(reward.diamonds);syncCurrencyDisplays();r.rankPromotionRewardsClaimed[key]=true;r.rankPromotionRewardState[key]="claimed";saveRankState();renderRankRewards();closeRankRewardModal();return true;}catch(err){console.error("Rank reward claim failed",err);return false;}finally{rankRewardClaimInProgress=false;if(btn)btn.disabled=false;}}
function normalizeRankName(value){const v=String(value??"").trim();const map={"BRONZE":"ทองแดง","SILVER":"เงิน","GOLD":"ทอง","DIAMOND":"เพชร","MASTER":"มาสเตอร์","LEGEND":"ตำนาน","ทองแดง":"ทองแดง","เงิน":"เงิน","ทอง":"ทอง","เพชร":"เพชร","มาสเตอร์":"มาสเตอร์","ตำนาน":"ตำนาน"};return map[v.toUpperCase()]||v;}
function isMasterIV(rank,division){return normalizeRankName(rank)==="มาสเตอร์"&&String(division??"").trim().toUpperCase()==="IV";}
function expectedRankScore(playerScore,opponentScore){return 1/(1+Math.pow(10,(Number(opponentScore)-Number(playerScore))/400));}
function rankRatingK(rank){return normalizeRankName(rank)==="ตำนาน"?20:40;}
function resolveOpponentRankScore(opponentScore){const r=ensureRankState(),n=Number(opponentScore);return Number.isFinite(n)&&n>=0?Math.floor(n):Math.floor(Number(r.points)||0);}
function refreshRankLeaderboard(r=ensureRankState()){
  const bots=ensureSimulatedRankPlayers(r).map(x=>({...x}));
  const external=Array.isArray(r.leaderboard)?r.leaderboard.filter(x=>x&&typeof x==="object"&&!x.isSelf&&!x.isSimulatedAI):[];
  const board=[...bots,...external];
  board.push({id:"self",isSelf:true,name:String(state.rpgCharacter?.name||state.playerName||state.username||"ผู้เล่น"),rank:r.currentRank,division:r.currentDivision,points:Math.floor(r.points||0)});
  board.sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.id||a.name||"").localeCompare(String(b.id||b.name||"")));
  board.forEach((x,i)=>x.position=i+1);
  r.leaderboard=board;
  return board;
}
function renderRankLeaderboard(){
  const r=ensureRankState();
  const list=document.getElementById("rankLeaderboardList");
  const caption=document.getElementById("rankLeaderboardCaption");
  if(!list||!caption)return;
  const currentRank=normalizeRankName(r.currentRank),currentDivision=isMaxRank(r)?"":String(r.currentDivision||"");
  const all=refreshRankLeaderboard(r);
  const rows=all.filter(x=>normalizeRankName(x.rank)===currentRank && (isMaxRank(r)?true:String(x.division||"")===currentDivision))
    .sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.id||a.name||"").localeCompare(String(b.id||b.name||"")));
  rows.forEach((x,i)=>x.divisionPosition=i+1);
  caption.textContent=isMaxRank(r)
    ?`ตำนาน • แสดงเฉพาะอันดับตำนาน (${rows.length} คน)`
    :`${currentRank} ${currentDivision} • แสดงเฉพาะผู้เล่นในแรงก์เดียวกัน (${rows.length} คน)`;
  list.innerHTML=rows.map((x,i)=>`<div class="rank-leaderboard-row${x.isSelf?" self":""}">
    <b class="rank-leader-pos">#${i+1}</b><span class="rank-leader-avatar">${x.isSelf?"🧑":(x.avatar||"🤖")}</span>
    <span class="rank-leader-name">${String(x.name||"ผู้เล่น").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}${x.isSelf?" <small>คุณ</small>":" <small>AI</small>"}</span>
    <b class="rank-leader-points">${Number(x.points||0).toLocaleString()} คะแนน</b>
  </div>`).join("");
}
function processRankResult(result,opponentScore){
  const r=ensureRankState(),v=String(result||'').toUpperCase();
  if(v!=='WIN'&&v!=='LOSE')return false;
  // Snapshot both scores before either result is written.
  const playerBefore=Math.floor(Number(r.points)||0),opponentBefore=resolveOpponentRankScore(opponentScore);
  const expected=expectedRankScore(playerBefore,opponentBefore),k=rankRatingK(r.currentRank);
  const delta=v==='WIN'?Math.round(k*(1-expected)):Math.round(k*expected);
  if(v==='WIN'){r.wins++;r.points=playerBefore+delta;}else{r.losses++;r.points=Math.max(0,playerBefore-delta);}
  r.seasonMatches++;
  // MASTER IV must never enter LEGEND through score/promotion during an active season.
  if(!isMaxRank(r)&&!isMasterIV(r.currentRank,r.currentDivision))tryPromoteByPoints(r);
  refreshRankLeaderboard(r);
  saveRankState();updateRankScreen();return true;
}
function recordRankWin(opponentScore){return processRankResult('WIN',opponentScore);}function recordRankLoss(opponentScore){return processRankResult('LOSE',opponentScore);}
// V128: Weekly rank seasons (Asia/Bangkok), separate from one-time promotion rewards.
const WEEKLY_SEASON_REWARDS={"ทองแดง":20,"เงิน":50,"ทอง":100,"เพชร":200,"มาสเตอร์":350,"ตำนาน":600};
let rankSeasonCountdownTimer=null,weeklySeasonClaimInProgress=false;
function bangkokParts(date=new Date()){const f=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',weekday:'short',hour12:false});const o={};for(const x of f.formatToParts(date))if(x.type!=='literal')o[x.type]=x.value;return o;}
function nextSeasonEndMs(now=Date.now()){
  // Bangkok is UTC+7 year-round. Build the next Sunday 00:00:00 in Bangkok,
  // then convert it back to a real UTC timestamp. This prevents the season ID
  // from drifting or repeating because of mixing local calendar parts with UTC.
  const p=bangkokParts(new Date(now));
  const localNow=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);
  const day=new Date(localNow).getUTCDay();
  const msToday=((+p.hour)*3600+(+p.minute)*60+(+p.second))*1000;
  let days=(7-day)%7;
  if(days===0&&msToday>0)days=7;
  const bangkokEnd=Date.UTC(+p.year,+p.month-1,+p.day+days,0,0,0,0);
  return bangkokEnd-(7*60*60*1000);
}
function seasonIdForEnd(end){const d=new Date(Number(end));const p=bangkokParts(d);const date=new Date(Date.UTC(+p.year,+p.month-1,+p.day));const jan1=new Date(Date.UTC(+p.year,0,1));const week=Math.ceil((((date-jan1)/86400000)+jan1.getUTCDay()+1)/7);return `rankSeason_${p.year}_week_${week}_${p.month}${p.day}`;}
function ensureRankSeasonState(){const r=ensureRankState(),now=Date.now();if(!r.seasonId||!Number.isFinite(+r.seasonEndTime)){r.seasonEndTime=nextSeasonEndMs(now);r.seasonId=seasonIdForEnd(r.seasonEndTime);r.lastProcessedSeasonId='';r.lastProcessedSeasonEnd=0;r.weeklyRewards=[];}if(!Array.isArray(r.weeklyRewards))r.weeklyRewards=[];r.weeklyRewards=r.weeklyRewards.filter(x=>x&&x.seasonId);return r;}
function softResetTarget(rank){const map={"ทองแดง":["ทองแดง","I"],"เงิน":["ทองแดง","IV"],"ทอง":["เงิน","IV"],"เพชร":["ทอง","IV"],"มาสเตอร์":["เพชร","IV"],"ตำนาน":["มาสเตอร์","I"]};return map[rank]||["ทองแดง","I"];}
// LEGEND resets into MASTER I, but the ending LEGEND order is preserved as much
// as possible. Rank #1 receives the strongest MASTER I seed; lower LEGEND ranks
// receive progressively lower seeds, so they re-enter the MASTER leaderboard in
// roughly the same order instead of every LEGEND being reset to one fixed score.
const MASTER_I_RESET_MIN=9001;
const MASTER_I_RESET_MAX=9500;
function masterIResetPointsFromLegendPosition(position,total){
  const pos=Math.max(1,Math.floor(Number(position)||1));
  const count=Math.max(1,Math.floor(Number(total)||1));
  if(count===1)return MASTER_I_RESET_MAX;
  const ratio=(count-pos)/(count-1);
  return Math.round(MASTER_I_RESET_MIN+(MASTER_I_RESET_MAX-MASTER_I_RESET_MIN)*Math.max(0,Math.min(1,ratio)));
}
function buildLegendSeasonResetSeeds(board){
  const legends=(Array.isArray(board)?board:[]).filter(x=>x&&normalizeRankName(x.rank)==="ตำนาน")
    .sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.id||a.name||"").localeCompare(String(b.id||b.name||"")));
  const seeds=new Map();
  legends.forEach((x,i)=>seeds.set(String(x.id||x.name||i),{position:i+1,total:legends.length,points:masterIResetPointsFromLegendPosition(i+1,legends.length)}));
  return seeds;
}
function applyLegendResetSeed(entry,seeds){
  const key=String(entry?.id||entry?.name||"");
  const seed=seeds.get(key);
  if(!seed)return null;
  return {rank:"มาสเตอร์",division:"I",points:seed.points,legendPosition:seed.position,legendPopulation:seed.total};
}
function processRankSeasonEnd(force=false){
  const r=ensureRankSeasonState(),now=Date.now();
  if(!force&&now<Number(r.seasonEndTime))return false;
  let endingId=r.seasonId;
  if(r.lastProcessedSeasonId===endingId){
    if(!force)return false;
    r.rankSeasonTestCounter=Number(r.rankSeasonTestCounter||0)+1;
    endingId=`${r.seasonId}_test_${r.rankSeasonTestCounter}`;
  }

  const endRank=r.currentRank,endDivision=r.currentDivision,endStars=0,endPoints=r.points;
  const amount=WEEKLY_SEASON_REWARDS[endRank]||20;
  const existing=r.weeklyRewards.find(x=>x.seasonId===endingId);
  if(!existing)r.weeklyRewards.push({seasonId:endingId,rank:endRank,division:endDivision,stars:endStars,points:endPoints,amount,status:'pending'});

  // Freeze the ending MASTER IV board before changing any rank.
  refreshRankLeaderboard(r);
  const endingBoard=(r.leaderboard||[]).map(x=>({...x}));
  const masterIVRows=endingBoard
    .filter(x=>x&&isMasterIV(x.rank,x.division))
    .sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.id||a.name||"").localeCompare(String(b.id||b.name||"")));
  masterIVRows.forEach((x,i)=>x.divisionPosition=i+1);
  const selfMasterIVPosition=isMasterIV(endRank,endDivision)
    ?masterIVRows.findIndex(x=>x&&x.isSelf)+1
    :0;
  // Only positions 1..100 of the ending MASTER IV leaderboard advance to LEGEND.
  const promotedToLegend=selfMasterIVPosition>=1&&selfMasterIVPosition<=100;

  r.seasonEndRank=endRank;
  r.seasonEndDivision=endDivision;
  r.seasonEndStars=endStars;
  r.seasonEndPoints=endPoints;
  r.seasonEndMasterIVPosition=selfMasterIVPosition||null;
  r.lastProcessedSeasonId=endingId;
  r.lastProcessedSeasonEnd=now;

  if(promotedToLegend){
    // The new LEGEND promotion must persist after reset. Do not run the LEGEND
    // soft-reset in the same transaction, otherwise the player would instantly
    // fall back to MASTER I and appear not to have been promoted.
    r.currentRank="ตำนาน";r.currentDivision="";
    r.tier=r.currentRank;r.division=r.currentDivision;
    r.points=Math.max(20000,Math.floor(Number(endPoints)||0));
    r.lastLegendPromotionSeasonId=endingId;
    r.lastLegendPromotionMasterIVPosition=selfMasterIVPosition;
  }else{
    // Everyone else resets normally. In particular, MASTER IV positions 101+
    // reset to MASTER I instead of being promoted to LEGEND.
    const target=softResetTarget(endRank);
    r.currentRank=target[0];r.currentDivision=target[1];
    r.tier=target[0];r.division=target[1];
    r.points=500;
  }

  r.seasonMatches=0;r.wins=0;r.losses=0;
  refreshRankLeaderboard(r);
  r.seasonEndTime=nextSeasonEndMs(now+1000);
  r.seasonId=seasonIdForEnd(r.seasonEndTime);
  saveRankState();
  updateRankScreen();

  openWeeklySeasonRewardModal(endingId);
  return true;
}
function checkRankSeason(){ensureRankSeasonState();return processRankSeasonEnd(false);}
function formatSeasonCountdown(){const r=ensureRankSeasonState(),ms=Math.max(0,Number(r.seasonEndTime)-Date.now()),m=Math.floor(ms/60000),d=Math.floor(m/1440),h=Math.floor((m%1440)/60),min=m%60;return `${d} วัน ${h} ชั่วโมง ${min} นาที`;}
function updateRankSeasonUI(){const r=ensureRankSeasonState();document.getElementById('rankSeasonName')?.replaceChildren(`ฤดูกาลปัจจุบัน: ${r.seasonId}`);document.getElementById('rankSeasonCountdown')?.replaceChildren(`⏳ รีเซ็ตแรงก์ใน: ${formatSeasonCountdown()}`);}
function startRankSeasonCountdown(){clearInterval(rankSeasonCountdownTimer);updateRankSeasonUI();rankSeasonCountdownTimer=setInterval(()=>{checkRankSeason();updateRankSeasonUI();},60000);}
function stopRankSeasonCountdown(){clearInterval(rankSeasonCountdownTimer);rankSeasonCountdownTimer=null;}
function openWeeklySeasonRewardModal(seasonId){
  const r=ensureRankSeasonState();
  const reward=r.weeklyRewards.find(x=>x.seasonId===seasonId);
  if(!reward||reward.status!=='pending')return false;
  const modal=document.getElementById('weeklySeasonRewardModal');
  if(!modal)return false;
  const label=`${reward.rank}${reward.division?' '+reward.division:''}`;
  document.getElementById('weeklySeasonRewardModalSeason')?.replaceChildren(`Season ${reward.seasonId}`);
  document.getElementById('weeklySeasonRewardModalRank')?.replaceChildren(`แรงก์เมื่อจบฤดูกาล: ${label}`);
  document.getElementById('weeklySeasonRewardModalAmount')?.replaceChildren(`💎 ${Number(reward.amount).toLocaleString()}`);
  modal.dataset.seasonId=reward.seasonId;
  modal.classList.remove('hidden');
  return true;
}
function closeWeeklySeasonRewardModal(){
  const modal=document.getElementById('weeklySeasonRewardModal');
  if(modal)modal.classList.add('hidden');
}
function claimWeeklySeasonReward(seasonId){if(weeklySeasonClaimInProgress)return false;const r=ensureRankSeasonState(),reward=r.weeklyRewards.find(x=>x.seasonId===seasonId);if(!reward||reward.status!=='pending')return false;weeklySeasonClaimInProgress=true;try{const before=Number(state.diamonds);if(!Number.isFinite(before))throw new Error('Invalid diamond balance');state.diamonds=before+Number(reward.amount);syncCurrencyDisplays();reward.status='claimed';saveRankState();renderRankRewards();updateRankScreen();return true;}catch(e){console.error('Weekly season reward claim failed',e);return false;}finally{weeklySeasonClaimInProgress=false;}}
function renderWeeklySeasonRewards(){const c=document.getElementById('weeklySeasonRewardsList');if(!c)return;const r=ensureRankSeasonState(),preview=WEEKLY_SEASON_REWARDS[r.currentRank]||20;const items=r.weeklyRewards.map(x=>{const label=`${x.rank}${x.division?' '+x.division:''}`;return `<article class="rank-reward-item ${x.status}"><b>${x.status==='claimed'?'✓':'🎊'} Season ${x.seasonId}</b><span>แรงก์ที่จบ: ${label}</span><span>💎 ${Number(x.amount).toLocaleString()}</span>${x.status==='pending'?`<button type="button" data-weekly-season-reward="${x.seasonId}">รับรางวัล</button><small>รอรับรางวัล</small>`:'<small>รับแล้ว</small>'}</article>`;}).join('');c.innerHTML=`<article class="rank-season-preview"><b>📅 รางวัลประจำสัปดาห์</b><span>แรงก์ปัจจุบัน: ${rankLabel(r)}</span><span>หากฤดูกาลจบตอนนี้: 💎 ${preview.toLocaleString()}</span></article>${items||'<p>ยังไม่มีรางวัลฤดูกาลรอรับ</p>'}`;}
function renderRankRewards(){
  const container=document.getElementById("rankRewardsList");
  if(!container) return;
  const r=ensureRankState();
  container.innerHTML=RANK_PROMOTION_REWARDS.map(reward=>{
    const status=r.rankPromotionRewardState[reward.key]||"locked";
    const label=`${reward.icon} ${reward.rank}${reward.division?" "+reward.division:""}`;
    if(status==="claimed") return `<article class="rank-reward-item claimed"><b>✓ ${label}</b><span>💎 ${Number(reward.diamonds).toLocaleString()}</span><small>รับแล้ว</small></article>`;
    if(status==="pending") return `<article class="rank-reward-item pending"><b>🎁 ${label}</b><span>💎 ${Number(reward.diamonds).toLocaleString()}</span><button type="button" class="rank-reward-claim" data-rank-reward="${reward.key}">รับรางวัล</button><small>รอรับรางวัล</small></article>`;
    return `<article class="rank-reward-item locked"><b>🔒 ${label}</b><span>💎 ${Number(reward.diamonds).toLocaleString()}</span><small>ยังไม่ปลดล็อก</small></article>`;
  }).join("");
}
function updateRankScreen(){
  checkRankSeason();
  const r=ensureRankState(),name=rankLabel(r),stars=`คะแนน: ${Number(r.points||0).toLocaleString()}${isMaxRank(r)?' (ตำนาน +10 ต่อชัยชนะ)':''}`;
  document.getElementById('rankCurrentName')?.replaceChildren(name);
  document.getElementById('rankCurrentStars')?.replaceChildren(stars);
  const w=document.getElementById('rankWins'),l=document.getElementById('rankLosses'),p=document.getElementById('rankProtection');
  if(w)w.textContent=r.wins;if(l)l.textContent=r.losses;
  if(p)p.textContent=isMaxRank(r)?'👑 ตำนานจำกัด 100 คน':'📈 ชนะ +40 / แพ้ -20';
  renderRankRewards();
  renderWeeklySeasonRewards();
  updateRankSeasonUI();
  renderRankLeaderboard();
}
function openRankScreen(){
  document.getElementById('rpgCharacterScreen')?.classList.add('hidden');
  document.getElementById('rpgZoneSelectScreen')?.classList.add('hidden');
  rpgWorld?.classList.add('hidden');
  document.getElementById('rpgRankScreen')?.classList.remove('hidden');
  rpg.running=false;rpg.inDungeon=false;checkRankSeason();updateRankScreen();startRankSeasonCountdown();
}
function closeRankScreen(){stopRankSeasonCountdown();clearRankMatchTimers();if(rankMatchInProgress)cancelRankMatch();closeRankRewardModal();document.getElementById('rpgRankScreen')?.classList.add('hidden');document.getElementById('rpgCharacterScreen')?.classList.remove('hidden');updateCharacterLobby();}
document.getElementById("characterRankButton")?.addEventListener("click",openRankScreen);
document.getElementById("rankBackButton")?.addEventListener("click",closeRankScreen);
document.querySelectorAll(".rank-tab").forEach(btn=>btn.addEventListener("click",()=>{
  const tab=btn.dataset.rankTab;
  document.querySelectorAll(".rank-tab").forEach(x=>x.classList.toggle("active",x===btn));
  document.querySelectorAll(".rank-tab-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.rankPanel===tab));
  if(tab==="rewards"){renderRankRewards();renderWeeklySeasonRewards();}
  if(tab==="leaderboard"){renderRankLeaderboard();}
}));
document.getElementById("rankTestAddStar")?.addEventListener("click",()=>addRankStar(1));
document.getElementById("rankTestRemoveStar")?.addEventListener("click",()=>removeRankStar(1));
document.getElementById("rankTestWin")?.addEventListener("click",()=>processRankResult("WIN"));
document.getElementById("rankTestLoss")?.addEventListener("click",()=>processRankResult("LOSE"));
document.getElementById("rankTestSeasonEnd")?.addEventListener("click",()=>processRankSeasonEnd(true));
document.getElementById("rankRewardsList")?.addEventListener("click",(e)=>{
  const btn=e.target.closest("[data-rank-reward]"); if(btn) claimRankPromotionReward(btn.dataset.rankReward);
});
document.getElementById("weeklySeasonRewardsList")?.addEventListener("click",e=>{const b=e.target.closest("[data-weekly-season-reward]");if(b){b.disabled=true;claimWeeklySeasonReward(b.dataset.weeklySeasonReward);}});
document.getElementById("weeklySeasonRewardModalClaim")?.addEventListener("click",()=>{
  const modal=document.getElementById('weeklySeasonRewardModal');
  const seasonId=modal?.dataset.seasonId;
  if(!seasonId)return;
  const ok=claimWeeklySeasonReward(seasonId);
  if(ok)closeWeeklySeasonRewardModal();
});
document.getElementById("weeklySeasonRewardModalClose")?.addEventListener("click",closeWeeklySeasonRewardModal);
document.getElementById("rankRewardClaimButton")?.addEventListener("click",()=>{
  const m=document.getElementById("rankRewardModal"); if(m) claimRankPromotionReward(m.dataset.rewardKey);
});
document.getElementById("rankRewardModalClose")?.addEventListener("click",closeRankRewardModal);

// V129: Central rank matchmaking + AI fallback + VS + real lightweight battle arena.
let rankMatchElapsedTimer=null,rankMatchFlowTimer=null,rankMatchStartedAt=0,rankMatchInProgress=false;
const RANK_AI_NAMES=["ShadowHunter","DarkNova","AquaBlade","VoidKing","IronWolf","SkyBreaker","PhantomX","StarFang","BlazeLord","FrostKnight","NightRaven","DragonSoul","SilverShade","StormRider","CrimsonFox","MoonBlade"];
function clearRankMatchTimers(){clearInterval(rankMatchElapsedTimer);clearTimeout(rankMatchFlowTimer);rankMatchElapsedTimer=rankMatchFlowTimer=null;}
function getRankPlayerPower(){const c=state.rpgCharacter||{};let n=Number(c.power??c.combatPower??c.attack??c.damage??c.baseDamage??0);if(!Number.isFinite(n)||n<=0){const eq=state.rpgEquipment||{};n=Object.values(eq).reduce((a,x)=>a+Number(x?.baseDamage||0)+Number(x?.bonusDamage||0)+Number(x?.bonusHp||0),0);}return Math.max(1,Math.floor(n||1000));}
function getRankPlayerData(){const r=ensureRankState(),c=state.rpgCharacter||{};return{id:'player',name:String(c.name||state.playerName||'ผู้เล่น'),avatar:c.avatar||c.icon||'🧑‍🚀',rank:r.currentRank,division:r.currentDivision,stars:r.stars,power:getRankPlayerPower(),wins:r.wins,losses:r.losses,weapon:state.rpgEquipment?.weapon?.name||state.rpgWeapon?.name||'อาวุธนักรบ',points:Math.floor(Number(r.points)||0)};}
function randInt(a,b){return Math.floor(a+Math.random()*(b-a+1));}
function createRankAiOpponent(player=getRankPlayerData()){
  const r=ensureRankState(),bots=ensureSimulatedRankPlayers(r);
  // Prefer an existing persistent leaderboard AI near the player's current score.
  const sorted=[...bots].sort((a,b)=>Math.abs(a.points-player.points)-Math.abs(b.points-player.points));
  const pick=sorted[randInt(0,Math.min(4,sorted.length-1))]||bots[0];
  return {...pick,id:pick.id,name:pick.name,avatar:pick.avatar,stars:pick.rank==='ตำนาน'?0:randInt(0,2),
    power:Math.max(1,Math.round(player.power*(.85+Math.random()*.30))),wins:randInt(5,80),losses:randInt(3,60),
    weapon:state.rpgEquipment?.weapon?.name||'อาวุธนักรบ'};
}
function saveRankMatchSession(session){const r=ensureRankState();r.currentRankMatch=session;saveRankState();}
function safeLoadRankMatchSession(){const r=ensureRankState(),s=r.currentRankMatch;if(s&&(s.status==='active'||s.status==='starting'||!['searching','found','ready','finished','cancelled'].includes(s.status))){r.currentRankMatch=null;saveRankState();}return r.currentRankMatch||null;}
function rankMatchFmtStars(x){return x.rank==='ตำนาน'?'MAX RANK':`${'★'.repeat(x.stars||0)}${'☆'.repeat(3-(x.stars||0))}`;}
function rankMatchLabel(x){const m=RANK_ORDER.find(v=>v.rank===x.rank)||RANK_ORDER[0];return x.rank==='ตำนาน'?`${m.icon} LEGEND`:`${m.icon} ${x.rank} ${x.division}`;}
function renderRankMatchSearching(){const p=getRankPlayerData(),b=document.getElementById('rankMatchBody');if(b)b.innerHTML=`<p>${rankMatchLabel(p)}<br>ผู้เล่น: ${p.name}<br>พลัง: ${p.power.toLocaleString()}</p><b>กำลังค้นหาผู้เล่นแรงก์เดียวกัน...</b><h3 id="rankMatchElapsed">00:00</h3>`;}
function setRankBattleButton(x){const b=document.getElementById('rankBattleButton');if(b)b.disabled=!!x;}
function startRankMatchmaking(){
  if(rankMatchInProgress)return false;
  syncChallengeCoinTimer();
  state.rpgInventory=state.rpgInventory||{};
  const have=Math.max(0,Math.min(CHALLENGE_COIN_MAX,Number(state.rpgInventory.challengeCoin||0)));
  if(have<PVP_CHALLENGE_COIN_COST){ alert(`🪙 เหรียญท้าประลองไม่พอ\nต้องใช้ ${PVP_CHALLENGE_COIN_COST} เหรียญต่อการค้นหาคู่ต่อสู้\nคุณมี ${have} เหรียญ`); return false; }
  state.rpgInventory.challengeCoin=have-PVP_CHALLENGE_COIN_COST;
  saveState(); syncChallengeCoinTimer();
  checkRankSeason();rankMatchInProgress=true;clearRankMatchTimers();setRankBattleButton(true);document.getElementById('rankMatchModal')?.classList.remove('hidden');document.getElementById('rankMatchTitle').textContent='⚔️ กำลังค้นหาคู่ต่อสู้...';renderRankMatchSearching();const p=getRankPlayerData();saveRankMatchSession({matchId:`rank-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,createdAt:Date.now(),playerData:p,opponentData:null,opponentType:'AI',status:'searching'});rankMatchStartedAt=Date.now();rankMatchElapsedTimer=setInterval(()=>{const e=Math.floor((Date.now()-rankMatchStartedAt)/1000),el=document.getElementById('rankMatchElapsed');if(el)el.textContent=`00:${String(e).padStart(2,'0')}`;},250);rankMatchFlowTimer=setTimeout(()=>{const t=document.getElementById('rankMatchTitle');if(t)t.textContent='ไม่พบผู้เล่นที่เหมาะสม';rankMatchFlowTimer=setTimeout(()=>{if(!rankMatchInProgress)return;const s=ensureRankState().currentRankMatch,o=createRankAiOpponent(p);if(!s)return;Object.assign(s,{opponentData:o,status:'found'});saveRankMatchSession(s);if(t)t.textContent='⚔️ พบคู่ต่อสู้!';const b=document.getElementById('rankMatchBody');if(b)b.innerHTML=`<p>${rankMatchLabel(p)} ${p.name}</p><b>VS</b><p>${o.avatar} ${o.name}<br>${rankMatchLabel(o)}<br>${rankMatchFmtStars(o)}<br>พลัง ${o.power.toLocaleString()}</p>`;rankMatchFlowTimer=setTimeout(openRankVsSession,1200);},700);},3000+Math.floor(Math.random()*2001));return true;}
function openRankVsSession(){clearRankMatchTimers();const s=ensureRankState().currentRankMatch;if(!s||!s.opponentData)return cancelRankMatch();rankMatchInProgress=false;setRankBattleButton(false);s.status='ready';saveRankMatchSession(s);document.getElementById('rankMatchModal')?.classList.add('hidden');document.getElementById('rankVsModal')?.classList.remove('hidden');const p=s.playerData,o=s.opponentData,b=document.getElementById('rankVsBody');if(b)b.innerHTML=`<div><b>${p.avatar} ${p.name}</b><br>${rankMatchLabel(p)}<br>${rankMatchFmtStars(p)}<br>พลัง ${p.power.toLocaleString()}</div><h2>VS</h2><div><b>${o.avatar} ${o.name}</b><br>${rankMatchLabel(o)}<br>${rankMatchFmtStars(o)}<br>พลัง ${o.power.toLocaleString()}</div>`;}
function cancelRankMatch(){clearRankMatchTimers();rankMatchInProgress=false;setRankBattleButton(false);const r=ensureRankState();if(r.currentRankMatch)r.currentRankMatch.status='cancelled';r.currentRankMatch=null;saveRankState();document.getElementById('rankMatchModal')?.classList.add('hidden');document.getElementById('rankVsModal')?.classList.add('hidden');cleanupRankBattle();}
const BATTLE_SKILLS={attack:{m:1,cd:0,e:'✦'},skill1:{m:1.55,cd:5000,e:'⚔️'},skill2:{m:2.05,cd:8000,e:'💫'},skill3:{m:2.8,cd:12000,e:'💥'}};let rankBattle=null,battleLoop=null;
function calculateBattleDamage(a,d,k='attack'){const mult=BATTLE_SKILLS[k]?.m||1,atk=Math.max(1,Number(a.power)||1),def=Math.max(0,Number(d.defense)||0);return Math.max(1,Math.round(atk*.012*mult/(1+def/10000))*(randInt(90,110)/100));}
function battleHpMax(x){return Math.max(100,Math.round(Math.max(1,Number(x.power)||1)*.10+100));}
function updateBattleUi(){if(!rankBattle)return;const b=rankBattle;[['Player',b.player],['Ai',b.ai]].forEach(([k,x])=>{const pct=Math.max(0,Math.min(100,x.currentHp/x.maxHp*100));document.getElementById(`battle${k}HpFill`).style.width=`${pct}%`;document.getElementById(`battle${k}HpText`).textContent=`HP ${Math.ceil(pct)}%`;});Object.entries({attack:'battleAttack',skill1:'battleSkill1',skill2:'battleSkill2',skill3:'battleSkill3'}).forEach(([k,id])=>{const el=document.getElementById(id),until=b.player.cooldowns[k]||0,left=Math.max(0,until-Date.now());if(el){el.disabled=b.finished||left>0;el.textContent=left>0?`${k==='attack'?'โจมตี':k.replace('skill','สกิล ')} ${Math.ceil(left/1000)}`:(k==='attack'?'โจมตี':k.replace('skill','สกิล '));}});}
function battleFx(kind,damage,target){const layer=document.getElementById('battleDamageLayer'),fx=document.getElementById('battleEffects');if(!layer||!fx)return;const d=document.createElement('span');d.className='battle-damage';d.textContent=`-${damage}`;d.style.left=target==='ai'?'68%':'28%';d.style.top='52%';layer.appendChild(d);const e=document.createElement('span');e.className='battle-effect';e.textContent=BATTLE_SKILLS[kind].e;fx.appendChild(e);setTimeout(()=>d.remove(),750);setTimeout(()=>e.remove(),500);}
function performBattleAction(side,kind){const b=rankBattle;if(!b||b.finished||b.status!=='active')return false;const atk=side==='player'?b.player:b.ai,def=side==='player'?b.ai:b.player,now=Date.now(),cd=atk.cooldowns[kind]||0;if(now<cd)return false;if(BATTLE_SKILLS[kind].cd)atk.cooldowns[kind]=now+BATTLE_SKILLS[kind].cd;const actor=document.getElementById(side==='player'?'battlePlayerActor':'battleAiActor');actor?.classList.remove('attack');void actor?.offsetWidth;actor?.classList.add('attack');setTimeout(()=>actor?.classList.remove('attack'),380);const dmg=calculateBattleDamage(atk.data,def.data,kind);def.currentHp=Math.max(0,def.currentHp-dmg);battleFx(kind,dmg,side==='player'?'ai':'player');updateBattleUi();checkBattleFinish();return true;}
function checkBattleFinish(){const b=rankBattle;if(!b||b.finished)return;if(b.player.currentHp<=0&&b.ai.currentHp<=0)finishRankBattle('draw');else if(b.ai.currentHp<=0)finishRankBattle('win');else if(b.player.currentHp<=0)finishRankBattle('lose');}
function finishRankBattle(result){const b=rankBattle;if(!b||b.finished)return false;b.finished=true;b.status='finished';clearInterval(battleLoop);battleLoop=null;const s=ensureRankState().currentRankMatch;if(s){s.status='finished';saveRankMatchSession(s);}const opponentScore=Number(b.ai?.data?.points??s?.opponentData?.points);if(result==='win')processRankResult('WIN',opponentScore);else if(result==='lose')processRankResult('LOSE',opponentScore);const box=document.getElementById('battleResult');if(box){box.classList.remove('hidden');box.innerHTML=`<h2>${result==='win'?'🏆 ชนะ!':result==='lose'?'💀 แพ้':'⚖️ เสมอ'}</h2><p>${b.player.data.name} VS ${b.ai.data.name}</p><button type="button" id="battleReturnRank">กลับหน้าแรงก์</button>`;document.getElementById('battleReturnRank').onclick=returnFromRankBattle;}updateBattleUi();return true;}
function cleanupRankBattle(){clearInterval(battleLoop);battleLoop=null;rankBattle=null;document.getElementById('battleEffects')?.replaceChildren();document.getElementById('battleDamageLayer')?.replaceChildren();document.getElementById('rankBattleArena')?.classList.add('hidden');}
function returnFromRankBattle(){const r=ensureRankState();if(r.currentRankMatch){r.currentRankMatch.status='finished';r.currentRankMatch=null;saveRankState();}cleanupRankBattle();updateRankScreen();}
function battleTick(){const b=rankBattle;if(!b||b.finished)return;const now=Date.now();if(now>=b.ai.nextAttackAt){const ready=['skill3','skill2','skill1'].filter(k=>(b.ai.cooldowns[k]||0)<=now);const kind=ready.length&&Math.random()<.45?ready[randInt(0,ready.length-1)]:'attack';performBattleAction('ai',kind);b.ai.nextAttackAt=now+randInt(1500,3000);}updateBattleUi();}
// Registered rank-battle scene. This uses the same existing screen/modal based DOM system as the project;
// it is deliberately not a second router or a separate Match system.
const RANK_BATTLE_SCENE={id:'rank_battle',playerSpawn:{side:'left'},opponentSpawn:{side:'right'}};
function setRankBattleLoading(show){document.getElementById('rankBattleLoading')?.classList.toggle('hidden',!show);}
function openRankBattleArena(session){
  const arena=document.getElementById('rankBattleArena');
  if(!arena)throw new Error('rankBattleArena not found in DOM');
  const p=session.playerData||{},o=session.opponentData||{};
  console.log('[RANK BATTLE] Scene registered:',RANK_BATTLE_SCENE.id);
  console.log('[RANK BATTLE] Scene loading');
  // Scene must become visible before any battle-only initialization can fail.
  document.getElementById('rankVsModal')?.classList.add('hidden');
  arena.classList.remove('hidden');
  arena.style.display='flex'; arena.style.opacity='1'; arena.style.pointerEvents='auto';
  [['battlePlayerName',p.name||'ผู้เล่น'],['battlePlayerRank',rankMatchLabel(p)],['battleAiName',o.name||'AI'],['battleAiRank',rankMatchLabel(o)],['battlePlayerActor',p.avatar||'🧑‍🚀'],['battleAiActor',o.avatar||'🤖']].forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=String(v);});
  document.getElementById('battleResult')?.classList.add('hidden'); document.getElementById('battleExitConfirm')?.classList.add('hidden');
  console.log('[RANK BATTLE] Scene loaded');
  console.log('[RANK BATTLE] Arena map created');
  console.log('[RANK BATTLE] Player spawned');
  console.log('[RANK BATTLE] AI spawned');
  return arena;
}
function startRankBattleSession(){
  console.log('[PVP] Enter main RPG battle scene');
  const r=ensureRankState(),s=r.currentRankMatch;
  if(!s||!s.playerData||!s.opponentData||s.status==='cancelled'||s.status==='finished'){
    cancelRankMatch(); alert('ไม่พบข้อมูลการแข่งขัน กรุณาค้นหาคู่ต่อสู้อีกครั้ง'); return false;
  }
  if(s.status==='starting'||s.status==='active')return false;
  s.status='starting';saveRankMatchSession(s);
  // Close every PvP window first, then transfer directly into the same world used by Jungle/Desert.
  cleanupRankBattle();
  document.getElementById('rankVsModal')?.classList.add('hidden');
  document.getElementById('rankMatchModal')?.classList.add('hidden');
  document.getElementById('rpgRankScreen')?.classList.add('hidden');
  s.status='active';saveRankMatchSession(s);
  enterRankPvpBattle(s);
  return true;
}
document.getElementById('rankBattleButton')?.addEventListener('click',startRankMatchmaking);document.getElementById('rankMatchCancel')?.addEventListener('click',cancelRankMatch);document.getElementById('rankVsCancel')?.addEventListener('click',cancelRankMatch);document.getElementById('rankVsStart')?.addEventListener('click',startRankBattleSession);
document.getElementById('battleAttack')?.addEventListener('click',()=>performBattleAction('player','attack'));document.getElementById('battleSkill1')?.addEventListener('click',()=>performBattleAction('player','skill1'));document.getElementById('battleSkill2')?.addEventListener('click',()=>performBattleAction('player','skill2'));document.getElementById('battleSkill3')?.addEventListener('click',()=>performBattleAction('player','skill3'));document.getElementById('battleExit')?.addEventListener('click',()=>{if(rankBattle?.status==='active'&&!rankBattle.finished)document.getElementById('battleExitConfirm')?.classList.remove('hidden');else returnFromRankBattle();});document.getElementById('battleExitConfirmYes')?.addEventListener('click',()=>finishRankBattle('lose'));document.getElementById('battleExitConfirmNo')?.addEventListener('click',()=>document.getElementById('battleExitConfirm')?.classList.add('hidden'));

ensureRankState();
ensureRankSeasonState();
checkRankSeason();
safeLoadRankMatchSession();
saveRankState();
["characterGuildRaidButton","characterArenaButton"].forEach(id=>{
  document.getElementById(id)?.addEventListener("click",()=>alert("โหมดนี้กำลังเตรียมระบบ รายละเอียดจะเพิ่มในขั้นตอนถัดไป"));
});

// V190 — World Boss lobby only. No combat/control system is replaced or modified here.
const WORLD_BOSS_RANK_KEY='farmWorldBossRank';
// V203 WORLD BOSS ONLY — one entry per account per local calendar day.
const WORLD_BOSS_DAILY_ENTRY_KEY='farmWorldBossDailyEntry';
function worldBossTodayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
// V204 FIX — Daily World Boss entry is stored per account, not globally for every account.
function getWorldBossAccountKey(){
  const name=String((typeof state!=='undefined'&&state?.username)||'').trim().toLowerCase();
  return name||'guest';
}
function getWorldBossEntryState(){
  try{
    const raw=JSON.parse(localStorage.getItem(WORLD_BOSS_DAILY_ENTRY_KEY)||'{}');
    const today=worldBossTodayKey(), account=getWorldBossAccountKey();
    const accounts=(raw&&raw.accounts&&typeof raw.accounts==='object')?raw.accounts:{};
    const saved=accounts[account];
    if(!saved||saved.date!==today){
      accounts[account]={date:today,used:false};
      localStorage.setItem(WORLD_BOSS_DAILY_ENTRY_KEY,JSON.stringify({accounts}));
      return {date:today,used:false};
    }
    return {date:today,used:saved.used===true};
  }catch(e){
    const today=worldBossTodayKey(), account=getWorldBossAccountKey();
    localStorage.setItem(WORLD_BOSS_DAILY_ENTRY_KEY,JSON.stringify({accounts:{[account]:{date:today,used:false}}}));
    return {date:today,used:false};
  }
}
function updateWorldBossEntryStatus(){const el=document.getElementById('worldBossEntryStatus');const btn=document.getElementById('worldBossFightButton');const remaining=getWorldBossEntryState().used?0:1;if(el)el.textContent=`🎟️ สิทธิ์เข้าบอสโลก: ${remaining}/1`+(remaining?'':' — หมดสิทธิ์เล่นในวันนี้แล้ว');if(btn){btn.disabled=remaining<=0;btn.classList.toggle('world-boss-entry-empty',remaining<=0);}}
function consumeWorldBossEntry(){
  const state=getWorldBossEntryState(); if(state.used)return false;
  try{
    const raw=JSON.parse(localStorage.getItem(WORLD_BOSS_DAILY_ENTRY_KEY)||'{}');
    const accounts=(raw&&raw.accounts&&typeof raw.accounts==='object')?raw.accounts:{};
    accounts[getWorldBossAccountKey()]={date:worldBossTodayKey(),used:true};
    localStorage.setItem(WORLD_BOSS_DAILY_ENTRY_KEY,JSON.stringify({accounts}));
  }catch(e){
    localStorage.setItem(WORLD_BOSS_DAILY_ENTRY_KEY,JSON.stringify({accounts:{[getWorldBossAccountKey()]:{date:worldBossTodayKey(),used:true}}}));
  }
  updateWorldBossEntryStatus();return true;
}
function getWorldBossRank(){try{const rows=JSON.parse(localStorage.getItem(WORLD_BOSS_RANK_KEY)||'[]');return Array.isArray(rows)?rows:[];}catch(e){return [];}}
function renderWorldBossRank(){const list=document.getElementById('worldBossPlayerList');if(!list)return;const rows=getWorldBossRank().sort((a,b)=>Number(b.score||0)-Number(a.score||0));if(!rows.length){list.innerHTML='<div class="world-boss-empty">ยังไม่มีผู้เล่นเข้าร่วม<br><small>เมื่อผู้เล่นเข้าร่วม คะแนนจะแสดงที่นี่</small></div>';return;}list.innerHTML=rows.slice(0,50).map((r,i)=>`<div class="world-boss-player"><span class="place">#${i+1}</span><span class="name">${escapeHtml(String(r.name||'ผู้เล่น'))}</span><span class="score">${Number(r.score||0).toLocaleString()} คะแนน</span></div>`).join('');}
function openWorldBoss(){document.getElementById('rpgCharacterScreen')?.classList.add('hidden');document.getElementById('rpgZoneSelectScreen')?.classList.add('hidden');document.getElementById('rpgTowerSelectScreen')?.classList.add('hidden');document.getElementById('worldBossScreen')?.classList.remove('hidden');renderWorldBossRank();updateWorldBossEntryStatus();}
function closeWorldBoss(){document.getElementById('worldBossScreen')?.classList.add('hidden');document.getElementById('rpgCharacterScreen')?.classList.remove('hidden');updateCharacterLobby?.();}
document.getElementById('characterWorldBossButton')?.addEventListener('click',openWorldBoss);
document.getElementById('worldBossBackButton')?.addEventListener('click',closeWorldBoss);
document.getElementById('worldBossFightButton')?.addEventListener('click',()=>{
  // Consume immediately before entering World Boss, so repeated clicks cannot bypass the daily limit.
  if(!consumeWorldBossEntry()){
    alert('หมดสิทธิ์เล่นบอสโลกในวันนี้แล้ว');
    updateWorldBossEntryStatus();
    return;
  }
  rpg.currentZone='worldboss';
  document.getElementById('worldBossScreen')?.classList.add('hidden');
  enterRpgJungle();
});
document.getElementById("characterTopupButton")?.addEventListener("click",openCharacterTopup);
document.getElementById("characterMarketButton")?.addEventListener("click",openCharacterMarket);
document.getElementById("marketCreateListing")?.addEventListener("click",createPlayerListing);
document.getElementById("marketPriceSave")?.addEventListener("click",saveMarketPriceEditor);
document.getElementById("marketPriceCancel")?.addEventListener("click",closeMarketPriceEditor);
document.getElementById("marketPriceClose")?.addEventListener("click",closeMarketPriceEditor);
document.getElementById("marketPriceEditor")?.addEventListener("click",(e)=>{
  if(e.target.id==="marketPriceEditor")closeMarketPriceEditor();
});
document.getElementById("marketPriceInput")?.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){e.preventDefault();saveMarketPriceEditor();}
  if(e.key==="Escape"){e.preventDefault();closeMarketPriceEditor();}
});
document.getElementById("characterJunkButton")?.addEventListener("click",openCharacterJunk);
document.querySelectorAll("[data-enhance-mode]").forEach(btn=>{
  btn.addEventListener("click",()=>setEnhanceMode(btn.dataset.enhanceMode));
});
document.getElementById("characterEnhanceWeaponButton")?.addEventListener("click",()=>{
  const main=document.getElementById("enhanceMessage");
  if(main)main.textContent="";
  enhanceWeapon();
  const msg=document.getElementById("characterEnhanceMessage");
  if(msg)msg.textContent=main?.textContent||"";
  syncCharacterEnhance();
  syncCharacterServices();
});
document.getElementById("characterRepairWeaponButton")?.addEventListener("click",()=>{
  document.getElementById("characterEnhanceModal")?.classList.add("hidden");
  openRpgModal("rpgBlacksmithModal");
});
document.getElementById("characterSellJunkButton")?.addEventListener("click",()=>{const main=document.getElementById("junkSellMessage");if(main)main.textContent="";sellAllRpgJunk();const msg=document.getElementById("characterJunkMessage");if(msg)msg.textContent=main?.textContent||"";renderCharacterJunk();});
backToFarmButton?.addEventListener("click", closeRpg);


function updateDungeonPortal() { return; }


const DUNGEON_CONSUMABLES = [
  {id:"hpPotion", name:"ยาฟื้นพลัง", iconKey:"hpPotion", note:"เติม HP เต็ม"},
  {id:"manaPotion", name:"ยาฟื้นมานา", iconKey:"manaPotion", note:"เติม MP เต็ม"},
  {id:"revivalPotion", name:"น้ำทิพย์คืนชีพ", iconKey:"revivalPotion", note:"ใช้คืนชีพโดยไม่เสียอุปกรณ์"}
];

function ensureDungeonBag(){
  rpg.dungeonBag = rpg.dungeonBag || {coins:0,junk:{},items:{}};
  rpg.dungeonBag.junk = rpg.dungeonBag.junk || {};
  rpg.dungeonBag.items = rpg.dungeonBag.items || {};
  return rpg.dungeonBag;
}
function prepareDungeonBag(){
  const bag=ensureDungeonBag();
  // Dungeon entry may carry ONLY usable consumables from the main inventory.
  // Coins and junk are never imported; they can only be created by loot inside this run.
  bag.coins=0; bag.junk={}; bag.items={};
  for(const def of DUNGEON_CONSUMABLES){
    const qty=Number(state.rpgInventory?.[def.id]||0);
    if(qty>0){
      bag.items[def.id]=qty;
      state.rpgInventory[def.id]=0;
    }
  }
  rpg.dungeonQuickSlots = ["hpPotion","manaPotion","revivalPotion","",""];
  renderDungeonBag();
  renderDungeonQuickbar();
  saveState();
}
function flushDungeonBag(){
  const bag=ensureDungeonBag();
  if(bag.coins>0) state.coins += Number(bag.coins||0);
  for(const def of DUNGEON_CONSUMABLES){
    const qty=Number(bag.items?.[def.id]||0);
    if(qty>0) state.rpgInventory[def.id]=(Number(state.rpgInventory[def.id])||0)+qty;
  }
  for(const [id,qty] of Object.entries(bag.junk||{})){
    rpg.junk[id]=(Number(rpg.junk[id])||0)+Number(qty||0);
  }
  bag.coins=0; bag.items={}; bag.junk={};
  renderDungeonBag(); renderDungeonQuickbar();
  saveState(); syncCurrencyDisplays(); syncRpgHud();
}
function addDungeonLoot(junk, amount, coins=0){
  const bag=ensureDungeonBag();
  bag.junk[junk.id]=(Number(bag.junk[junk.id])||0)+amount;
  if(coins>0) bag.coins=(Number(bag.coins)||0)+coins;
  renderDungeonBag(); renderDungeonQuickbar();
}
function getDungeonItemQty(id){
  return Number(ensureDungeonBag().items?.[id]||0);
}
function showDungeonResourceFloat(text,type="hp"){
  const stage=document.querySelector(".rpg-stage-card");
  if(!stage) return;
  const el=document.createElement("div");
  el.className=`dungeon-resource-float ${type}`;
  el.textContent=text;
  stage.appendChild(el);
  requestAnimationFrame(()=>el.classList.add("show"));
  setTimeout(()=>el.remove(),850);
}

function useDungeonConsumable(id){
  if(rpg.deathPending) return;
  const bag=ensureDungeonBag();
  if(!DUNGEON_CONSUMABLES.some(x=>x.id===id) || getDungeonItemQty(id)<=0) return;
  if(id==="hpPotion"){
    if(rpg.player.hp>=rpg.player.maxHp){rpg.combatLog="❤️ HP เต็มอยู่แล้ว";return;}
    bag.items[id]--; rpg.player.hp=rpg.player.maxHp;
  }else if(id==="manaPotion"){
    if(rpg.player.mana>=rpg.player.maxMana){
      rpg.combatLog="💧 MP เต็มอยู่แล้ว — ยาฟื้นมานายังไม่ถูกใช้";
      syncRpgHud();
      return;
    }
    bag.items[id]--;
    const before=rpg.player.mana;
    rpg.player.mana=rpg.player.maxMana;
    showDungeonResourceFloat(`+${Math.max(0,Math.round(rpg.player.mana-before))} MP`,"mana");
  }else if(id==="revivalPotion"){
    // Revival potion is normally consumed from the death screen.
    return;
  }
  rpg.combatLog=`${DUNGEON_CONSUMABLES.find(x=>x.id===id)?.name||id} ใช้งานแล้ว`;
  renderDungeonBag(); renderDungeonQuickbar(); saveState(); syncRpgHud(); sfx("buy");
}
function renderDungeonBag(){
  const panel=document.getElementById("dungeonBagPanel");
  const list=document.getElementById("dungeonBagList");
  if(!list) return;
  const bag=ensureDungeonBag();
  const items=[];
  for(const def of DUNGEON_CONSUMABLES){
    const qty=Number(bag.items?.[def.id]||0);
    if(qty>0) items.push({id:def.id,name:def.name,qty,icon:itemVisual(def.iconKey),note:def.note});
  }
  for(const def of rpgJunkTypes){
    const qty=Number(bag.junk?.[def.id]||0);
    if(qty>0) items.push({id:`junk:${def.id}`,name:def.name,qty,icon:def.icon,note:`ขาย ${def.price} 🪙 / ชิ้น`});
  }
  if((bag.coins||0)>0) items.unshift({id:"dungeonCoins",name:"เหรียญ",qty:bag.coins,icon:"🪙",note:"จะเข้ากระเป๋าหลักเมื่อออกจากดันเจี้ยน"});
  if(!items.length){
    list.innerHTML='<div class="dungeon-bag-empty">🎒 ยังไม่มีของในกระเป๋าดันเจี้ยน</div>';
  }else{
    list.innerHTML=items.map(x=>`<div class="dungeon-bag-item ${x.id.startsWith("junk:")?"non-use-item":""}" data-dungeon-item="${x.id}" draggable="${!x.id.startsWith("junk:") && x.id!=="dungeonCoins"}">
      <span class="dungeon-bag-item-icon">${x.icon}</span>
      <span><b>${x.name}</b><small>x${Number(x.qty).toLocaleString()} · ${x.note}</small></span>
    </div>`).join("");
  }
  if(panel && !panel.classList.contains("hidden")) bindDungeonBagDrag();
}
function renderDungeonQuickbar(){
  const bar=document.getElementById("dungeonQuickbar");
  if(!bar) return;
  const bag=ensureDungeonBag();
  bar.querySelectorAll(".quickbar-slot").forEach((slot,i)=>{
    const id=rpg.dungeonQuickSlots?.[i]||"";
    const def=DUNGEON_CONSUMABLES.find(x=>x.id===id);
    const qty=id?Number(bag.items?.[id]||0):0;
    slot.dataset.quickItem=id;
    slot.innerHTML=def ? `${itemVisual(def.iconKey)}<span class="quickbar-key">${i+1}</span><b>${qty.toLocaleString()}</b>` : `<span class="quickbar-empty">+</span>`;
    slot.classList.toggle("empty",!def);
    slot.classList.toggle("disabled-item",!!def && qty<=0);
    slot.title=def?`${def.name} x${qty}`:"ลากไอเท็มมาใส่ช่องนี้";
  });
  bindDungeonQuickbar();
}
function assignDungeonQuickSlot(itemId, slotIndex){
  if(!DUNGEON_CONSUMABLES.some(x=>x.id===itemId)) return;
  rpg.dungeonQuickSlots[slotIndex]=itemId;
  renderDungeonQuickbar();
}
function bindDungeonBagDrag(){
  document.querySelectorAll("[data-dungeon-item]").forEach(el=>{
    if(el.dataset.bound==="1") return;
    el.dataset.bound="1";
    el.addEventListener("dragstart",()=>{rpg.dragDungeonItem=el.dataset.dungeonItem;});
    el.addEventListener("pointerdown",()=>{rpg.dragDungeonItem=el.dataset.dungeonItem;});
    el.addEventListener("click",()=>{
      const id=el.dataset.dungeonItem;
      if(id && !id.startsWith("junk:") && id!=="dungeonCoins"){
        const idx=rpg.dungeonQuickSlots.findIndex(x=>!x);
        assignDungeonQuickSlot(id,idx<0?0:idx);
      }
    });
  });
}
function bindDungeonQuickbar(){
  document.querySelectorAll(".quickbar-slot").forEach(slot=>{
    if(slot.dataset.bound==="1") return;
    slot.dataset.bound="1";
    slot.addEventListener("dragover",e=>e.preventDefault());
    slot.addEventListener("drop",e=>{
      e.preventDefault();
      const id=rpg.dragDungeonItem;
      if(id && !id.startsWith("junk:")) assignDungeonQuickSlot(id,Number(slot.dataset.quickSlot));
      rpg.dragDungeonItem="";
    });
    slot.addEventListener("pointerup",()=>{
      const id=rpg.dragDungeonItem;
      if(id && !id.startsWith("junk:")) assignDungeonQuickSlot(id,Number(slot.dataset.quickSlot));
      rpg.dragDungeonItem="";
    });
    slot.addEventListener("click",(e)=>{
      e.preventDefault();
      e.stopPropagation();
      const id=slot.dataset.quickItem;
      if(id) useDungeonConsumable(id);
    });
  });
}
function toggleDungeonBag(force){
  const panel=document.getElementById("dungeonBagPanel");
  if(!panel) return;
  panel.classList.toggle("hidden",force===undefined?!panel.classList.contains("hidden"):!force);
  if(!panel.classList.contains("hidden")){renderDungeonBag();bindDungeonBagDrag();}
}

function rpgMove(dt) {
  if (rpg.deathPending) return;
  let dx = 0, dy = 0;
  if (rpg.keys.w) dy -= 1;
  if (rpg.keys.s) dy += 1;
  if (rpg.keys.a) dx -= 1;
  if (rpg.keys.d) dx += 1;
  rpg.player.moving = !!(dx || dy);

  if (rpg.player.moving) {
    const len = Math.hypot(dx, dy);
    dx /= len; dy /= len;
    // Exact 8-direction facing follows the actual movement vector.
    // The character model's natural forward direction is up (negative Y).
    const moveAngle=Math.atan2(dy,dx);
    rpg.player.facingAngle=moveAngle+Math.PI/2;
    if (Math.abs(dx) > Math.abs(dy)) rpg.player.facing = dx > 0 ? "right" : "left";
    else rpg.player.facing = dy > 0 ? "down" : "up";

    rpg.player.walkTime += dt * 12;
    rpg.player.footstepCd = Math.max(0, rpg.player.footstepCd-dt);
    if(rpg.player.footstepCd<=0){ sfx("foot"); rpg.player.footstepCd=.34; }
    rpg.player.x = Math.max(55, Math.min(rpgCanvas.width - 55, rpg.player.x + dx * rpg.player.speed * dt));
    rpg.player.y = Math.max(70, Math.min(rpgCanvas.height - 80, rpg.player.y + dy * rpg.player.speed * dt));
  } else {
    rpg.player.walkTime += dt * 2;
  }
}

function nearestAliveMob() {
  let best=null, dist=Infinity;
  for (const pack of rpg.packs) {
    for (const mob of pack.mobs) {
      if (!mob.alive) continue;
      const d=Math.hypot(mob.x-rpg.player.x,mob.y-rpg.player.y);
      if (d<dist) { dist=d; best=mob; }
    }
  }
  return {mob:best, dist};
}


// Combat death performance: batch expensive UI/storage work when several monsters die at once.
let rpgDeathUiQueued=false, rpgDeathSaveQueued=false;
function queueRpgDeathUi(){
  if(rpgDeathUiQueued) return;
  rpgDeathUiQueued=true;
  requestAnimationFrame(()=>{
    rpgDeathUiQueued=false;
    const el=document.getElementById("junkSellMessage");
    if(el && rpg._lastDeathLootMessage) el.textContent=rpg._lastDeathLootMessage;
    renderDungeonBag(); renderDungeonQuickbar();
  });
}
function queueRpgDeathSave(){
  if(rpgDeathSaveQueued) return;
  rpgDeathSaveQueued=true;
  setTimeout(()=>{ rpgDeathSaveQueued=false; saveState(); },0);
}
function addRpgDeathLoot(junk,amount,coins=0){
  const bag=ensureDungeonBag();
  bag.junk[junk.id]=(Number(bag.junk[junk.id])||0)+amount;
  if(coins>0) bag.coins=(Number(bag.coins)||0)+coins;
}
function showTowerVictory(){
  if(rpg.currentZone!=='tower' || rpg._towerVictoryShown) return;
  rpg._towerVictoryShown=true;
  markTowerFloorCleared(Number(rpg.towerFloor||1));
  rpg.running=false;
  rpg.keys={w:false,a:false,s:false,d:false,q:false};
  rpg.player.moving=false;
  let modal=document.getElementById('towerVictoryModal');
  if(!modal){
    modal=document.createElement('div'); modal.id='towerVictoryModal';
    modal.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.72);padding:20px';
    modal.innerHTML='<div style="max-width:420px;width:100%;text-align:center;padding:32px 24px;border-radius:22px;border:2px solid #e7b64b;background:linear-gradient(180deg,#2a2116,#100d0a);box-shadow:0 0 40px rgba(255,181,52,.35);color:#fff;font-family:inherit"><div style="font-size:64px;line-height:1">🏆</div><h2 style="margin:10px 0 8px;font-size:32px;color:#ffd66b">ชนะ!</h2><p style="margin:0 0 24px;color:#eadfc7">กำจัดมอนสเตอร์ในหอคอยหมดแล้ว</p><button id="towerVictoryConfirm" style="border:0;border-radius:12px;padding:13px 34px;font-size:18px;font-weight:900;cursor:pointer;background:#e7a936;color:#211508">ยืนยัน</button></div>';
    document.body.appendChild(modal);
    modal.querySelector('#towerVictoryConfirm').addEventListener('click',()=>{
      modal.remove();
      rpg._towerVictoryShown=false;
      rpg.running=true;
      closeRpg();
    });
  }
  modal.style.display='flex';
  rpg.combatLog='🏆 ชนะ! กำจัดมอนสเตอร์ทั้งหมดแล้ว';
}
function checkTowerClear(){
  if(rpg.currentZone!=='tower' || rpg._towerVictoryShown) return;
  const mobs=(rpg.packs||[]).flatMap(pack=>pack.mobs||[]);
  if(mobs.length>0 && mobs.every(m=>!m.alive)) showTowerVictory();
}

function handleRpgMobDeath(mob,{sound=true}={}){
  if(!mob || mob._deathHandled) return null;
  mob._deathHandled=true; mob.alive=false; rpg.kills++;
  // Same rewards as before; only defer rendering/storage so the kill frame stays smooth.
  const junk=rpgJunkTypes[Math.floor(Math.random()*rpgJunkTypes.length)];
  const amount=mob.elite?2+Math.floor(Math.random()*2):1+Math.floor(Math.random()*2);
  let coins=0; const coinChance=mob.elite?.16:.045;
  if(Math.random()<coinChance){ coins=mob.elite?8+Math.floor(Math.random()*18):2+Math.floor(Math.random()*6); rpg.rareCoins+=coins; }
  addRpgDeathLoot(junk,amount,coins);
  const msg=coins>0?`🗑️ ${junk.name} x${amount} · 🪙 +${coins}`:`🗑️ ${junk.name} x${amount}`;
  rpg._lastDeathLootMessage=msg;
  rpgGainXp(mob.elite?55:20);
  if(sound) sfx("death");
  queueRpgDeathUi(); queueRpgDeathSave();
  // Tower clear is checked immediately on every death so the last monster can never leave the floor stuck.
  checkTowerClear();
  return msg;
}

function dropRpgLoot(mob) {
  // Monster loot is primarily junk. Direct coins are deliberately rare.
  const junk = rpgJunkTypes[Math.floor(Math.random() * rpgJunkTypes.length)];
  const amount = mob.elite ? 2 + Math.floor(Math.random()*2) : 1 + Math.floor(Math.random()*2);
  // Loot stays inside the dungeon bag until the player leaves the dungeon.
  let coins=0;
  const coinChance = mob.elite ? 0.16 : 0.045;
  if (Math.random() < coinChance) {
    coins = mob.elite ? 8 + Math.floor(Math.random()*18) : 2 + Math.floor(Math.random()*6);
    rpg.rareCoins += coins;
  }
  addDungeonLoot(junk, amount, coins);
  return coins>0 ? `🗑️ ${junk.name} x${amount} · 🪙 +${coins}` : `🗑️ ${junk.name} x${amount}`;
}

function sellAllRpgJunk() {
  let total = 0, count = 0;
  for (const item of rpgJunkTypes) {
    const amount = rpg.junk[item.id] || 0;
    total += amount * item.price;
    count += amount;
    rpg.junk[item.id] = 0;
  }
  if (count === 0) {
    document.getElementById("junkSellMessage").textContent = "ยังไม่มีขยะให้ขาย";
    return;
  }
  state.coins += total;
  saveState();
  document.getElementById("junkSellMessage").textContent = `ขายขยะ ${count} ชิ้น ได้ 🪙 ${total} เหรียญ`;
  syncRpgHud();
}

function renderRpgJunk() {
  const count = rpgJunkTypes.reduce((sum,item)=>sum+(rpg.junk[item.id]||0),0);
  const value = rpgJunkTypes.reduce((sum,item)=>sum+(rpg.junk[item.id]||0)*item.price,0);
  const countEl=document.getElementById("rpgJunkCount");
  const valueEl=document.getElementById("rpgJunkValue");
  const list=document.getElementById("rpgJunkList");
  const btn=document.getElementById("sellRpgJunkButton");
  if(countEl) countEl.textContent=count;
  if(valueEl) valueEl.textContent=value;
  if(list) {
    list.innerHTML=rpgJunkTypes.map(item=>{
      const amount=rpg.junk[item.id]||0;
      return `<div class="junk-row"><span>${item.icon} ${item.name} <small>x${amount}</small></span><b>${amount*item.price} 🪙</b></div>`;
    }).join("");
  }
  if(btn) btn.disabled=count===0;
}

function showRpgDamageNumber(x, y, damage, kind="normal") {
  if (!Array.isArray(rpg.damageFloats)) rpg.damageFloats = [];
  rpg.damageFloats.push({x,y,damage:Math.max(0,Math.round(Number(damage)||0)),kind,life:0,maxLife:.78,drift:-18-Math.random()*10});
}


// V131: PvP uses the exact same RPG dungeon scene, camera, movement, HUD, attack and skill systems.
rpg.pvpBattle=null;
function isPvpBattleActive(){return !!(rpg.pvpBattle&&rpg.pvpBattle.active);}
function createPvpOpponentMob(opponent){
  const power=Math.max(1,Number(opponent?.power)||1000);
  const hp=Math.max(220,Math.round(battleHpMax(opponent)*1.35));
  return {
    x:720,y:300,homeX:720,homeY:300,hp,maxHp:hp,alive:true,elite:true,
    hitFlash:0,attackCd:0,aggro:true,attackAnim:0,slow:0,
    isPvpOpponent:true,pvpData:opponent,pvpPower:power,pvpName:opponent?.name||'คู่ต่อสู้'
  };
}
function enterRankPvpBattle(session){
  const p=session.playerData||getRankPlayerData(),o=session.opponentData||createRankAiOpponent(p);
  document.getElementById('rankVsModal')?.classList.add('hidden');
  document.getElementById('rankMatchModal')?.classList.add('hidden');
  document.getElementById('rpgRankScreen')?.classList.add('hidden');
  document.getElementById('rpgCharacterScreen')?.classList.add('hidden');
  document.getElementById('rpgZoneSelectScreen')?.classList.add('hidden');
  rpgWorld?.classList.remove('hidden'); rpgWorld?.classList.add('dungeon-clean-mode','pvp-rpg-mode');
  // PvP is the same playable RPG scene. Force the same PC input path used by the main game.
  rpg.running=true; rpg.inDungeon=true; rpg.deathPending=false; rpg.platform='pc';
  rpg.player.x=260; rpg.player.y=300; rpg.player.hp=rpg.player.maxHp; rpg.player.mana=rpg.player.maxMana;
  rpg.keys={w:false,a:false,s:false,d:false,q:false}; rpg.player.moving=false; rpg.portalCooldown=999999;
  rpg.player.attackCd=0; rpg.player.skillCd=0; rpg.player.hitCd=0; rpg.player.hurtAnim=0; rpg.player.attackAnim=0; rpg.player.skillAnim=0;
  rpg.hitEffects=[]; rpg.particles=[]; rpg.damageFloats=[];
  const mob=createPvpOpponentMob(o);
  rpg.packs=[{x:mob.x,y:mob.y,index:-99,mobs:[mob],respawnAt:0,isPvp:true}];
  rpg.pvpBattle={active:true,session,player:p,opponent:o,mob,startedAt:Date.now(),finished:false};
  rpg.combatLog=`⚔️ PVP เริ่มแล้ว! ต่อสู้กับ ${o.name}`;
  ensureAudio(); startMusic('rpg'); rpg.lastTime=performance.now();
  updateDungeonPlatformUI(); syncRpgHud(); renderRpgInventory(); renderDungeonBag(); renderDungeonQuickbar();
  rpgCanvas?.setAttribute('tabindex','0'); rpgCanvas?.focus?.({preventScroll:true});
  requestAnimationFrame(rpgLoop);
}
function finishRpgPvp(result){
  const pb=rpg.pvpBattle;if(!pb||pb.finished)return;
  pb.finished=true;pb.active=false;
  const r=ensureRankState(),s=pb.session||r.currentRankMatch;
  const opponentScore=Number(s?.opponentData?.points);if(result==='win')processRankResult('WIN',opponentScore); else processRankResult('LOSE',opponentScore);
  if(s){s.status='finished';saveRankMatchSession(s);}
  // PVP also ends with a full transient combat reset before the next match/map.
  resetRpgCombatTransientState();
  rpg.running=false;rpg.inDungeon=false;rpg.packs=[];rpg.hitEffects=[];rpg.particles=[];
  rpgWorld?.classList.add('hidden');rpgWorld?.classList.remove('dungeon-clean-mode','pvp-rpg-mode');
  rpg.pvpBattle=null;
  document.getElementById('rpgCharacterScreen')?.classList.add('hidden');
  document.getElementById('rpgZoneSelectScreen')?.classList.add('hidden');

  // PVP result screen: player sees WIN/LOSE first, then leaves the match only after confirming.
  const resultModal=document.getElementById('pvpResultModal');
  const resultCard=document.getElementById('pvpResultCard');
  const resultBadge=document.getElementById('pvpResultBadge');
  const resultTitle=document.getElementById('pvpResultTitle');
  const resultThai=document.getElementById('pvpResultThai');
  const resultMessage=document.getElementById('pvpResultMessage');
  const confirmBtn=document.getElementById('pvpResultConfirm');
  const won=result==='win';
  if(resultModal&&resultCard&&resultBadge&&resultTitle&&resultThai&&resultMessage&&confirmBtn){
    resultCard.classList.toggle('win',won);resultCard.classList.toggle('lose',!won);
    resultBadge.textContent=won?'🏆':'💀';
    resultTitle.textContent=won?'VICTORY!':'DEFEAT';
    resultThai.textContent=won?'ชนะแล้ว!':'แพ้แล้ว';
    resultMessage.textContent=won?'คุณเอาชนะคู่ต่อสู้ได้! กดยืนยันเพื่อจบแมตช์':'คุณพ่ายแพ้ในการต่อสู้ กดยืนยันเพื่อจบแมตช์';
    confirmBtn.onclick=()=>{
      resultModal.classList.add('hidden');
      document.getElementById('rpgRankScreen')?.classList.remove('hidden');
      updateRankScreen();startRankSeasonCountdown();
    };
    resultModal.classList.remove('hidden');
  }else{
    document.getElementById('rpgRankScreen')?.classList.remove('hidden');
    updateRankScreen();startRankSeasonCountdown();
  }
}

function rpgAttack() {
  if (!rpg.running || !rpg.inDungeon || rpg.player.attackCd > 0 || rpg.deathPending) return;
  const target = nearestAliveMob();
  if (!target.mob || target.dist > 100) {
    rpg.combatLog = "⚔️ เข้าใกล้มอนสเตอร์อีกนิด";
    return;
  }

  rpg.player.attackCd = .34;
  sfx(rpg.weapon.broken ? "hit" : "sword");
  rpg.player.attackAnim = .30;
  rpg.player.facing =
    Math.abs(target.mob.x-rpg.player.x) > Math.abs(target.mob.y-rpg.player.y)
      ? (target.mob.x > rpg.player.x ? "right" : "left")
      : (target.mob.y > rpg.player.y ? "down" : "up");

  const angle = Math.atan2(target.mob.y-rpg.player.y, target.mob.x-rpg.player.x);
  // One short-lived sword trail per swing — never accumulate old trails.
  rpg.hitEffects=[];
  addSlash(rpg.player.x, rpg.player.y, angle);
  burst(target.mob.x, target.mob.y, "#f8e7a1", 12, 110);

  const rawDamage = rpg.weapon.broken ? 1 : getEffectiveWeaponDamage();
  const damage = Math.max(1, Math.round(rawDamage * 100 / (100 + Math.max(0, Number(target.mob.defense || 0)))));
  target.mob.hp = Math.max(0, target.mob.hp - damage);
  showRpgDamageNumber(target.mob.x, target.mob.y - 30, damage, "normal");
  target.mob.hitFlash = .16;
  target.mob.aggro = true;
  rpg.combatLog = `⚔️ ฟัน ${damage} ดาเมจ`;

  if (target.mob.hp <= 0) {
    target.mob.alive = false;
    if(target.mob.isPvpOpponent){ rpg.combatLog=`🏆 เอาชนะ ${target.mob.pvpName}!`; finishRpgPvp('win'); return; }
    const lootMessage = handleRpgMobDeath(target.mob,{sound:false}) || "";
    rpg.combatLog = `☠️ กำจัด ${target.mob.elite ? "ELITE" : "มอนสเตอร์"} · ${lootMessage}`;
  }
}

// V75: Five skills belong to the CHARACTER, not the weapon.
// The character reaches the full five-skill kit at Lv.50.
const SKILL_UNLOCK_LEVELS=[1,40,80,120,200];
function getCharacterSkillLevel(){ return Math.max(1, Math.min(200, Number(rpg.player.level||1))); }
function isSkillUnlocked(i){ return getCharacterSkillLevel() >= (SKILL_UNLOCK_LEVELS[i] ?? 999); }
ensureGachaCollection();
function getCharacterRarity(){ return state.rpgCharacter?.rarity || "NORMAL"; }
function getCharacterRegenRank(){ return Math.max(0, Number(state.rpgCharacter?.regenRank || 0)); }
function getCharacterRegenMultiplier(){ return Math.pow(6, getCharacterRegenRank()); }
function skillDamageMultiplier(){ return POWER_TIER_META[getActivePowerDef().rarity]?.multiplier || 1; }
let skillDefs = getActiveHeroDef().skills;
function selectSkill(i){
  if(!skillDefs[i]) return;
  if(!isSkillUnlocked(i)){rpg.combatLog=`🔒 ${skillDefs[i].name} ปลดล็อกเมื่อ Lv.${SKILL_UNLOCK_LEVELS[i]}`;sfx("hurt");syncRpgHud();return;}
  rpg.player.selectedSkill=i;sfx("click");syncRpgHud();
}
function getSkillTargets(skill){
  const out=[];
  for(const pack of rpg.packs) for(const mob of pack.mobs){
    if(mob.alive && Math.hypot(mob.x-rpg.player.x,mob.y-rpg.player.y)<=skill.range) out.push(mob);
  }
  return out;
}
function rpgSkill(){
  if(!rpg.running || rpg.deathPending || !rpg.inDungeon) return;
  const i=rpg.player.selectedSkill, skill=skillDefs[i];
  if(!skill) return;
  if(!isSkillUnlocked(i)){rpg.combatLog=`🔒 ${skill.name} ปลดล็อกเมื่อ Lv.${SKILL_UNLOCK_LEVELS[i]}`;return;}
  if(rpg.player.skillCds[i]>0){ rpg.combatLog=`⏳ ${skill.name} คูลดาวน์ ${rpg.player.skillCds[i].toFixed(1)}s`; return; }
  if(rpg.player.mana<skill.mana){ rpg.combatLog='💧 มานาไม่พอ'; sfx('hurt'); return; }
  rpg.player.mana-=skill.mana;
  showDungeonResourceFloat(`-${skill.mana} MP`,"mana-cost");
  rpg.player.skillCds[i]=skill.cd; rpg.player.skillCd=skill.cd; rpg.player.skillAnim=.8; sfx(['skill','fire','ice','shadow','meteor'][i] || 'skill');
  const targets=getSkillTargets(skill);
  if(i===0){ burst(rpg.player.x,rpg.player.y,'#6bd7ff',45,200); burst(rpg.player.x,rpg.player.y,'#c78cff',24,160); }
  if(i===1){ for(let k=0;k<8;k++){ const a=k*Math.PI/4; burst(rpg.player.x+Math.cos(a)*38,rpg.player.y+Math.sin(a)*38,k%2?'#ffb13b':'#ff4d24',16,190); } for(let k=0;k<18;k++) spawnParticle(rpg.player.x,rpg.player.y,{color:k%3?'#ff7a24':'#ffe08a',angle:-Math.PI/2+(Math.random()-.5)*1.7,speed:70+Math.random()*170,life:.45+Math.random()*.35,size:3+Math.random()*5,gravity:-20}); }
  if(i===2){ burst(rpg.player.x,rpg.player.y,'#b9f4ff',38,125); burst(rpg.player.x,rpg.player.y,'#6ecfff',24,170); for(let k=0;k<24;k++) spawnParticle(rpg.player.x,rpg.player.y,{color:k%2?'#ffffff':'#8fe8ff',angle:Math.random()*Math.PI*2,speed:40+Math.random()*130,life:.7+Math.random()*.5,size:2+Math.random()*4,gravity:8}); }
  if(i===3){ burst(rpg.player.x,rpg.player.y,'#b88cff',28,150); for(let k=0;k<14;k++) spawnParticle(rpg.player.x,rpg.player.y,{color:k%2?'#c8a2ff':'#6c42a8',speed:90+Math.random()*170,life:.35+Math.random()*.3,size:2+Math.random()*4}); const t=nearestAliveMob(); if(t.mob && t.dist<skill.range){ rpg.player.x=t.mob.x+(rpg.player.x<t.mob.x?-28:28); rpg.player.y=t.mob.y+(rpg.player.y<t.mob.y?-18:18); burst(rpg.player.x,rpg.player.y,'#b88cff',40,170); addSlash(t.mob.x,t.mob.y,Math.atan2(t.mob.y-rpg.player.y,t.mob.x-rpg.player.x)); } }
  if(i===4){ burst(rpg.player.x,rpg.player.y,'#ffd36a',20,80); const t=nearestAliveMob(); const tx=t.mob?t.mob.x:rpg.player.x, ty=t.mob?t.mob.y:rpg.player.y; for(let k=0;k<55;k++) spawnParticle(tx,ty,{color:k%2?'#ffd36a':'#ff7a42',speed:30+Math.random()*170,life:.45+Math.random()*.5,size:3+Math.random()*5}); }
  let hitCount=0;
  for(const mob of targets){
    const rawDamage = getEffectiveSkillDamage(skill);
    const damage = Math.max(1, Math.round(rawDamage * 100 / (100 + Math.max(0, Number(mob.defense || 0)))));
    mob.hp = Math.max(0, mob.hp - damage);
    showRpgDamageNumber(mob.x, mob.y - 32, damage, "skill");
    mob.hitFlash=.18; mob.aggro=true; hitCount++;
    if(i===2) mob.slow=.8;
    if(mob.hp<=0){ if(mob.isPvpOpponent){mob.alive=false;rpg.combatLog=`🏆 เอาชนะ ${mob.pvpName}!`; finishRpgPvp('win'); return;} handleRpgMobDeath(mob); }
  }
  rpg.combatLog=`${skill.icon} ${skill.name} โดน ${hitCount} ตัว · MP -${skill.mana}`;
  if(!rpgDeathSaveQueued) saveState();
}

function rpgGainXp(amount) {
  if(rpg.player.level>=200){
    rpg.player.level=200;
    rpg.player.xp=0;
    rpg.player.nextXp=999999;
    state.rpgCharacter.level=200;
    state.rpgCharacter.xp=0;
    state.rpgCharacter.nextXp=999999;
    return;
  }
  rpg.player.xp += amount;
  while(rpg.player.xp >= rpg.player.nextXp && rpg.player.level < 200) {
    rpg.player.xp -= rpg.player.nextXp;
    rpg.player.level++;
    rpg.player.maxHp += 18 * getCharacterRegenMultiplier();
    rpg.player.hp = rpg.player.maxHp;
    rpg.player.maxMana += 6 * getCharacterRegenMultiplier();
    rpg.player.mana = rpg.player.maxMana;
    rpg.player.nextXp = Math.round(rpg.player.nextXp*1.25);
    sfx("level");
  }
  if(rpg.player.level>=200){
    rpg.player.level=200;
    rpg.player.xp=0;
    rpg.player.nextXp=999999;
  }
  state.rpgCharacter.level=rpg.player.level;
  state.rpgCharacter.xp=rpg.player.xp;
  state.rpgCharacter.nextXp=rpg.player.nextXp;
  const activeHero=state.rpgCharacters?.find(h=>h.id===state.rpgCharacter.id);
  if(activeHero){activeHero.level=state.rpgCharacter.level;activeHero.xp=state.rpgCharacter.xp;activeHero.nextXp=state.rpgCharacter.nextXp;}
  saveState();
}

function allDead(pack) {
  return pack.mobs.every(m=>!m.alive);
}


function spawnParticle(x,y,opts={}) {
  const a=opts.angle ?? Math.random()*Math.PI*2;
  const speed=opts.speed ?? (40+Math.random()*100);
  rpg.particles.push({
    x,y, vx:Math.cos(a)*speed, vy:Math.sin(a)*speed,
    life:opts.life ?? .55, maxLife:opts.life ?? .55,
    size:opts.size ?? (2+Math.random()*4),
    color:opts.color ?? "#f4d76b", gravity:opts.gravity ?? 0
  });
}
function burst(x,y,color,count=12,spread=110) {
  for(let i=0;i<count;i++) spawnParticle(x,y,{color,speed:20+Math.random()*spread,life:.35+Math.random()*.35,size:2+Math.random()*4});
}
function addSlash(x,y,angle) {
  rpg.hitEffects.push({x,y,angle,life:.12,maxLife:.12});
}
function updateParticles(dt) {
  for(const p of rpg.particles){ p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=p.gravity*dt; p.life-=dt; }
  rpg.particles=rpg.particles.filter(p=>p.life>0);
  for(const e of rpg.hitEffects) e.life-=dt;
  rpg.hitEffects=rpg.hitEffects.filter(e=>e.life>0);
}


function getEquipmentDefense() {
  return Object.entries(state.rpgEquipment).reduce((sum,[key,item]) => {
    if (item.durability <= 0) return sum;
    const values={head:3,body:8,arms:3,legs:4,feet:2,weapon:0};
    return sum + (values[key]||0) * (0.35 + item.durability/100*0.65);
  },0);
}

function syncWeaponState() {
  if(!state.rpgEquipment?.weapon){
    state.rpgWeapon={level:0,durability:0,broken:true,regenRank:0,rarity:"NORMAL"};
    return;
  }
  state.rpgWeapon = {
    level: Math.max(1, Number(rpg.weapon.level || 1)),
    durability: Math.max(0, Number(rpg.weapon.durability ?? 100)),
    broken: !!rpg.weapon.broken,
    regenRank: Math.max(0, Number(rpg.weapon.regenRank ?? 0)),
    rarity: rpg.weapon.rarity || state.rpgEquipment?.weapon?.rarity || "NORMAL"
  };
}

function getRegenRank(){
  return Math.max(0, Number(state.rpgCharacter?.regenRank || 0));
}
function getRegenMultiplier(){ return Math.pow(6, getRegenRank()); }
function getCharacterLevelMultiplier(){ return 1 + Math.max(0,getCharacterSkillLevel()-1)*0.035; }
function getWeaponConditionMultiplier(){
  const d=Math.max(0,Math.min(100,Number(rpg.weapon?.durability ?? 100)));
  return d<=0 ? 0.2 : (0.35 + d/100*0.65);
}
function getEffectiveWeaponDamage(){
  const eq=state.rpgEquipment||{};
  const w=eq.weapon;
  // No equipped weapon means no equipment weapon bonus at all.
  if(!w) return 0;
  const stars=getWeaponStars(w);
  const accessoryBase = 24 + stars*4 + Number(w.baseDamage||0)*0.35;
  const equipmentDamageBonus=Object.entries(eq).reduce((sum,[slot,item])=>{
    if(!item) return sum;
    const bonus=Number(item.bonusDamage||0);
    // weapon.baseDamage is already included above; bonusDamage is the extra stat on any slot.
    return sum + (slot==="weapon" ? bonus : bonus);
  },0);
  return Math.max(0,Math.round((accessoryBase*getWeaponConditionMultiplier()+equipmentDamageBonus)*getRegenMultiplier()));
}
function getEffectiveSkillDamage(skill){
  const characterBase = (skill.damage + getCharacterSkillLevel()*8) * getCharacterLevelMultiplier();
  const weaponAccessory = 1 + getEffectiveWeaponDamage()/120;
  return Math.max(1,Math.round(characterBase * weaponAccessory * skillDamageMultiplier()));
}
function getEffectiveMaxHp(){ return Math.round(rpg.player.maxHp); }
function getEquipmentDefense(){
  return Object.entries(state.rpgEquipment||{}).reduce((sum,[key,item])=>{
    if(!item) return sum;
    const base={head:3,body:8,arms:3,legs:4,feet:2,weapon:4}[key]||0;
    const stars=getWeaponStars(item),tier=getWeaponTier(item);
    const d=Math.max(0,Math.min(100,Number(item.durability??100)));
    const condition=d<=0?0.2:(0.35+d/100*0.65);
    const bonus=(Number(item.bonusDef||0));
    return sum + (base + stars*0.65 + bonus)*condition;
  },0);
}
function getEffectiveDefense(){
  return Math.max(1,Math.round((20 + getCharacterSkillLevel()*2 + getEquipmentDefense()) * getRegenMultiplier()));
}
function getWeaponConditionMultiplierForItem(item){const d=Math.max(0,Math.min(100,Number(item?.durability??100)));return d<=0?0.2:(0.35+d/100*0.65)}
function getEffectiveCharacterMaxHp(){
  const base=160 + Math.max(0,getCharacterSkillLevel()-1)*18;
  const w=state.rpgEquipment?.weapon;
  const stars=w?getWeaponStars(w):0;
  const weaponHpBonus=w?(stars*5 + Number(w.bonusHp||0))*getWeaponConditionMultiplierForItem(w):0;
  const armorHpBonus=Object.entries(state.rpgEquipment||{}).filter(([k])=>k!=="weapon").reduce((s,[,it])=>{
    const t=getWeaponTier(it);
    return s+(Number(it.bonusHp||0))*getWeaponConditionMultiplierForItem(it);
  },0);
  return Math.round((base+weaponHpBonus+armorHpBonus)*getRegenMultiplier());
}
function getEffectiveCharacterMaxMana(){
  const base=100 + Math.max(0,getCharacterSkillLevel()-1)*6;
  return Math.round(base*getRegenMultiplier());
}
function syncEquipmentFromWeapon() {
  // V95: no phantom/default equipment. If nothing is equipped, keep the slots empty.
  const eq=state.rpgEquipment?.weapon;
  if(!eq) return;
  eq.level=Math.max(1,Number(rpg.weapon?.level||eq.level||1));
  eq.durability=Math.max(0,Number(rpg.weapon?.durability??eq.durability??100));
  eq.name=eq.name || "ดาบฝึกหัด";
  eq.icon=eq.icon||"⚔️";
  eq.rarity="NORMAL";eq.regenRank=0;eq.weaponTier=getWeaponTier(eq);eq.stars=getWeaponStars(eq);eq.level=eq.stars;eq.broken=!!eq.broken;
}

function renderRpgInventory() {
  syncEquipmentFromWeapon();
  const eq=state.rpgEquipment;
  const slotMap={head:"equipHead",body:"equipBody",arms:"equipArms",legs:"equipLegs",feet:"equipFeet",weapon:"equipWeapon"};
  for(const [key,id] of Object.entries(slotMap)){
    const el=document.getElementById(id);
    if(!el) continue;
    const item=eq[key];
    if(!item){ el.textContent="—"; el.title="ยังไม่ได้สวมอุปกรณ์"; continue; }
    el.textContent=item.durability<=0 ? "💥" : item.icon;
    el.title=`${item.name} · ความทนทาน ${item.durability}%`;
  }

  const attack=Math.max(1,(rpg.weapon.broken?1:rpg.weapon.baseDamage+rpg.weapon.level*4));
  const defense=getEffectiveDefense();
  const stats=[["statHp",rpg.player.maxHp],["statMana",rpg.player.maxMana],["statAttack",attack],["statDefense",defense],["statSpeed",Math.round(rpg.player.speed)],["statLevel",rpg.player.level]];
  for(const [id,val] of stats){const el=document.getElementById(id);if(el)el.textContent=val;}

  const list=document.getElementById("equipmentList");
  if(list){
    const slotNames={head:"หมวก",body:"เกราะ",arms:"ปลอกแขน",legs:"กางเกง",feet:"รองเท้า",weapon:"ดาบ"};
    list.innerHTML=Object.entries(eq).map(([key,item])=>{
      const broken=item.durability<=0;
      const tier=getWeaponTier(item),tm=weaponTierMeta(tier);
      return `<div class="equipment-row weapon-tier-${tier} ${broken?'is-broken':''}" style="--rarity-color:${tm.color}">
        <div class="equip-row-icon">${broken?"💥":item.icon}</div>
        <div class="equip-row-main"><b>${slotNames[key]}</b><strong>${item.name}</strong><small style="color:${tm.color};font-weight:900">${tm.label} · ${weaponStarHtml(getWeaponStars(item),tier)} · ความทนทาน ${item.durability}%</small></div>
        <div class="equip-row-status">${broken?"แตก / ใช้งานไม่ได้":"พร้อมใช้งาน"}</div>
      </div>`;
    }).join("");
  }
  renderRpgBag();
  renderBlacksmith();
  updateCharacterLobby();
}

function renderRpgBag(){
  const list=document.getElementById("rpgBagList");
  document.getElementById("bagCoins")?.replaceChildren(document.createTextNode((state.coins||0).toLocaleString()));
  document.getElementById("bagDiamonds")?.replaceChildren(document.createTextNode((state.diamonds||0).toLocaleString()));
  if(!list) return;

  const items=[];
  const add=(icon,name,count,note="")=>{
    count=Number(count||0);
    if(count>0) items.push({icon,name,count,note});
  };

  // RPG inventory เท่านั้น:
  // เงินและเพชรเป็นสกุลกลางที่แชร์กับฟาร์ม แต่ไอเท็มของฟาร์มไม่ปะปนกับ RPG
  add(itemVisual("revivalPotion"),"น้ำทิพย์คืนชีพ",state.rpgInventory.revivalPotion,"ใช้คืนชีพ");
  add(itemVisual("moonScroll"),"สเก็ตแห่งดวงจันทร์",state.rpgInventory.moonScroll,"ใช้ซ่อมอุปกรณ์");
  add(itemVisual("soulHammer"),"ค้อนคืนวิญญาณ",state.rpgInventory.soulHammer,"ใช้คืนสภาพอุปกรณ์");
  add(itemVisual("hpPotion"),"ยาฟื้นพลัง",state.rpgInventory.hpPotion,"เติม HP");
  add(itemVisual("manaPotion"),"ยาฟื้นมานา",state.rpgInventory.manaPotion,"เติม MP");
  add(itemVisual("enhancementScroll"),"ใบบวก",state.rpgInventory.enhancementScroll,"ใช้สำหรับตีบวกอาวุธ");
  add(itemVisual("magicOrb"),"ลูกแก้วเวทมนตร์",state.rpgInventory.magicOrb,"ใช้แล้วตีบวกล้มเหลวไม่ลดความทนทาน");
  add(itemVisual("regenScroll"),"ใบบวกรีเจน",state.rpgInventory.regenScroll,"ก่อน +10: รับประกันตีบวกสำเร็จ 1 ระดับ");
  add("🌌","ผงแห่งจักรวาล",state.rpgInventory.universePowder,"ใช้ข้าม +10 → REGEN เท่านั้น · 10 ชิ้น · โอกาสสำเร็จ 20%");

  // ขยะ/วัสดุที่ดรอปจากมอนสเตอร์ใน RPG
  Object.entries(rpg.junk||{}).forEach(([id,count])=>{
    const def=rpgJunkTypes.find(x=>x.id===id);
    if(def) add(def.icon,def.name,count,`ขาย ${def.price ?? def.value ?? 0} 🪙 / ชิ้น`);
  });

  // ช่องสำหรับไอเท็ม RPG ประเภทอื่นในอนาคต
  Object.entries(rpg.itemInventory||{}).forEach(([id,count])=>{
    const def=Array.isArray(window.rpgItemTypes) ? window.rpgItemTypes.find(x=>x.id===id) : null;
    if(def) add(def.icon,def.name,count,def.note||"ไอเท็ม RPG");
  });

  if(items.length===0){
    list.innerHTML=`<div class="bag-empty"><div>🎒</div><b>กระเป๋ายังว่าง</b><small>ไอเท็มที่ได้รับจะมาแสดงที่นี่อัตโนมัติ</small></div>`;
    return;
  }
  list.innerHTML=items.map(i=>`<div class="inventory-item">
    <div class="item-icon">${i.icon}</div>
    <div class="item-name">${i.name}</div>
    <div class="item-count">x${i.count}</div>
    <div class="item-note">${i.note}</div>
  </div>`).join("");
}

function getRepairCost(level, regenRank=0, rarity="NORMAL", tier="NORMAL"){
  const lv=Math.max(1,Math.min(8,Number(level||1)));
  const mult=weaponTierMeta(tier).multiplier;
  if(lv<=6){
    return {fee:Math.round(10000*Math.pow(3,lv-1)*mult),moon:Math.max(1,Math.round(({1:3,2:4,3:6,4:9,5:13,6:18}[lv])*mult)),hammer:0,tier:`${lv} ดาว`};
  }
  const moon=Math.round(18*Math.pow(3,lv-6)*mult);
  const fee=Math.round(10000*Math.pow(3,lv-1)*mult);
  return {fee,moon,hammer:0,tier:`${lv} ดาว`};
}

function getRestoreCost(level){
  const lv=Math.max(1,Number(level||1));
  // คืนสภาพอาวุธที่แตกเป็นศูนย์: Lv.1-6 ใช้ค้อน 1,
  // Lv.7+ ใช้ค้อน 5 เพื่อให้สเกลสอดคล้องกับช่วงซ่อมระดับสูง
  return {hammer:lv<=6?1:5};
}

function renderBlacksmith(){
  const list=document.getElementById("blacksmithList");
  if(!list) return;
  const slotNames=Object.fromEntries(Object.entries(EQUIPMENT_META).map(([k,v])=>[k,v.label]));

  list.innerHTML=Object.entries(state.rpgEquipment).map(([key,item])=>{
    const level=getWeaponStars(item);
    const tier=getWeaponTier(item);
    const tmeta=weaponTierMeta(tier);
    const broken=Number(item.durability||0)<=0 || item.broken;
    const cost=getRepairCost(level,0,"NORMAL",tier);
    const restore=getRestoreCost(level);

    if(broken){
      const ok=Number(state.rpgInventory.soulHammer||0)>=restore.hammer;
      return `<div class="equipment-row weapon-tier-${tier} is-broken" style="--rarity-color:${tmeta.color}">
        <div class="equip-row-icon">${item.icon}</div>
        <div class="equip-row-main">
          <b>${slotNames[key]}</b><strong>${item.name}</strong>
          <small style="color:${tmeta.color}">${tmeta.label} · ${weaponStarHtml(level,tier)} · ความทนทาน 0% · เสียหายใช้งานไม่ได้</small>
          <small>ต้องคืนสภาพก่อน: ${inlineItemVisual("soulHammer")} ค้อนคืนวิญญาณ ${restore.hammer.toLocaleString()} อัน</small>
        </div>
        <button class="repair-item-btn restore-item-btn" data-restore-equipment="${key}" ${ok?"":"disabled"}>🔨 คืนสภาพ${key==="weapon"?"อาวุธ":"ไอเท็ม"}</button>
      </div>`;
    }

    if(Number(item.durability)>=100){
      return `<div class="equipment-row weapon-tier-${tier}" style="--rarity-color:${tmeta.color}">
        <div class="equip-row-icon">${item.icon}</div>
        <div class="equip-row-main">
          <b>${slotNames[key]}</b><strong>${item.name}</strong>
          <small style="color:${tmeta.color}">${tmeta.label} · ${weaponStarHtml(level,tier)} · ความทนทาน 100% · พร้อมใช้งาน</small>
        </div>
        <button class="repair-item-btn" disabled>✓ สภาพสมบูรณ์</button>
      </div>`;
    }

    const ok=Number(state.rpgInventory.moonScroll||0)>=cost.moon && Number(state.coins||0)>=cost.fee;
    return `<div class="equipment-row weapon-tier-${tier}" style="--rarity-color:${tmeta.color}">
      <div class="equip-row-icon">${item.icon}</div>
      <div class="equip-row-main">
        <b>${slotNames[key]}</b><strong>${item.name}</strong>
        <small style="color:${tmeta.color}">${tmeta.label} · ${weaponStarHtml(level,tier)} · ความทนทาน ${item.durability}%</small>
        <small>ซ่อม: ${inlineItemVisual("moonScroll")} สเก็ต ×${cost.moon.toLocaleString()} + 🪙 ${cost.fee.toLocaleString()} · ระดับ ${tmeta.label} ใช้วัสดุ ×${tmeta.multiplier.toLocaleString()}</small>
      </div>
      <button class="repair-item-btn" data-repair-equipment="${key}" ${ok?"":"disabled"}>🔧 ซ่อม</button>
    </div>`;
  }).join("");

  list.querySelectorAll("[data-restore-equipment]").forEach(btn=>btn.addEventListener("click",()=>{
    const key=btn.dataset.restoreEquipment, item=state.rpgEquipment[key];
    if(!item || (!item.broken && Number(item.durability||0)>0)) return;
    const cost=getRestoreCost(Math.max(1,item.level||1));
    const have=Number(state.rpgInventory.soulHammer||0), msg=document.getElementById("blacksmithMessage");
    if(have<cost.hammer){
      if(msg)msg.textContent=`❌ คืนสภาพไม่ได้: ค้อนคืนวิญญาณขาด ${cost.hammer-have} อัน`;
      sfx("error"); return;
    }
    state.rpgInventory.soulHammer-=cost.hammer;
    item.durability=1; item.broken=false;
    if(key==="weapon"){ rpg.weapon.broken=false; rpg.weapon.durability=1; syncWeaponState(); }
    saveState(); renderRpgInventory(); renderBlacksmith(); syncRpgHud();
    if(msg)msg.textContent=`✅ คืนสภาพ ${item.name} สำเร็จ — ตอนนี้ซ่อมได้แล้ว`;
    rpg.combatLog=`🔨 คืนสภาพ ${item.name} สำเร็จ ใช้ค้อนคืนวิญญาณ ${cost.hammer.toLocaleString()} อัน`;
    sfx("success");
  }));

  list.querySelectorAll("[data-repair-equipment]").forEach(btn=>btn.addEventListener("click",()=>{
    const key=btn.dataset.repairEquipment, item=state.rpgEquipment[key];
    if(!item || Number(item.durability||0)<=0 || Number(item.durability||0)>=100) return;
    const level=getWeaponStars(item);
    const cost=getRepairCost(level,0,"NORMAL",getWeaponTier(item));
    const missing=[];
    if(Number(state.rpgInventory.moonScroll||0)<cost.moon) missing.push(`สเก็ตขาด ${cost.moon-Number(state.rpgInventory.moonScroll||0)} ชิ้น`);
    if(Number(state.coins||0)<cost.fee) missing.push(`เงินขาด ${(cost.fee-Number(state.coins||0)).toLocaleString()} เหรียญ`);
    const msg=document.getElementById("blacksmithMessage");
    if(missing.length){ if(msg)msg.textContent="❌ ซ่อมไม่ได้: "+missing.join(" · "); sfx("error"); return; }
    state.rpgInventory.moonScroll-=cost.moon; state.coins-=cost.fee;
    item.durability=100; item.broken=false;
    if(key==="weapon"){ rpg.weapon.broken=false; rpg.weapon.durability=100; syncWeaponState(); }
    saveState(); renderRpgInventory(); renderBlacksmith(); syncRpgHud();
    if(msg)msg.textContent=`✅ ซ่อม ${item.name} สำเร็จ`;
    rpg.combatLog=`🔧 ซ่อม ${item.name} สำเร็จ ใช้ สเก็ตแห่งดวงจันทร์ ${cost.moon.toLocaleString()} + ${cost.fee.toLocaleString()} 🪙`;
    sfx("success");
  }));
}


let gachaAnimationTimer=null;
let gachaAnimationQueue=[];
let gachaAnimationResults=[];
let gachaAnimationIndex=0;
let gachaRevealBusy=false;
let gachaRevealOpened=false;
let equipmentBagSelectedIndex=-1;
let equipmentBagSortMode="power_desc";

function equipmentBagSortValue(item,mode){
  const tierRank={NORMAL:1,ORANGE:2,RED:3}[getWeaponTier(item)]||1;
  const stars=getWeaponStars(item);
  const scaleDamage=Math.max(0,Number(item.baseDamage||0)+Number(item.bonusDamage||0));
  switch(mode){
    case "power_asc": return equipmentPowerScore(item);
    case "stars_asc": return stars;
    case "stars_desc": return -stars;
    case "scale_asc": return scaleDamage;
    case "scale_desc": return -scaleDamage;
    case "power_desc":
    default: return -equipmentPowerScore(item);
  }
}
function getSortedEquipmentBag(){
  const a=ensureGachaCollection();
  return a.map((item,index)=>({item,index}))
    .sort((x,y)=>{
      const vx=equipmentBagSortValue(x.item,equipmentBagSortMode);
      const vy=equipmentBagSortValue(y.item,equipmentBagSortMode);
      if(vx!==vy)return vx-vy;
      const tx=({NORMAL:1,ORANGE:2,RED:3}[getWeaponTier(x.item)]||1);
      const ty=({NORMAL:1,ORANGE:2,RED:3}[getWeaponTier(y.item)]||1);
      if(tx!==ty)return ty-tx;
      return x.index-y.index;
    });
}
function syncEquipmentSlot(slot,item){
  if(!slot||!item)return;
  state.rpgEquipment=state.rpgEquipment||{};
  state.rpgEquipment[slot]={...item,slot};
  syncWeaponStarData(state.rpgEquipment[slot]);
  if(slot==="weapon"){
    const w=state.rpgEquipment.weapon;
    rpg.weapon.stars=w.stars;
    rpg.weapon.level=w.stars;
    rpg.weapon.durability=Number(w.durability??100);
    rpg.weapon.broken=!!w.broken;
    rpg.weapon.weaponTier=w.weaponTier;
    rpg.weapon.baseDamage=Number(w.baseDamage||18);
    syncWeaponState();
  }
}
// Unified wallet mapping: UI/admin config uses "coin" / "diamond", while the single
// central player state stores them as state.coins / state.diamonds.
function getUnifiedWalletKey(currency){
  return String(currency||"diamond").toLowerCase()==="coin" ? "coins" : "diamonds";
}
function getUnifiedBalance(currency){
  normalizeGachaCurrency();
  return Number(state[getUnifiedWalletKey(currency)]||0);
}
function spendUnifiedCurrency(currency, amount){
  normalizeGachaCurrency();
  const key=getUnifiedWalletKey(currency);
  const cost=Math.max(0,Number(amount)||0);
  const balance=Math.max(0,Number(state[key])||0);
  if(balance<cost)return false;
  state[key]=balance-cost;
  return true;
}

// Gacha must always use the same central wallet as the top HUD.
// This also repairs old saves where currency may have been stored as a formatted string.
function normalizeGachaCurrency(){
  const toSafeNumber=(value)=>{
    if(typeof value==="number") return Number.isFinite(value)?value:0;
    const n=Number(String(value??0).replace(/,/g,"").replace(/[^0-9.-]/g,""));
    return Number.isFinite(n)?n:0;
  };
  state.coins=Math.max(0,toSafeNumber(state.coins));
  state.diamonds=Math.max(0,toSafeNumber(state.diamonds));
}
function syncGachaWallet(){
  normalizeGachaCurrency();
  // No separate wallet in the gacha UI. The top HUD is the single source of display.
  syncCurrencyDisplays?.();
}
function renderGachaResults(items=[]){
  const el=document.getElementById("gachaResults");if(!el)return;
  if(!items.length){el.innerHTML=`<div class="gacha-empty">ยังไม่มีผลสุ่มรอบนี้</div>`;return}
  el.innerHTML=items.map(i=>{const t=getWeaponTier(i),m=weaponTierMeta(t);return `<div class="gacha-result-card weapon-tier-${t}" style="--rarity-color:${m.color}"><div class="gacha-result-icon">${i.icon}</div><div class="gacha-result-name">${i.name}</div><div class="gacha-result-tier">${m.label}</div><div class="gacha-result-stars">${weaponStarHtml(i.stars,t)}</div><small>${i.slot==="weapon"?"อาวุธ":"ชุดเกราะ"}</small>${gachaItemStatsHtml(i)}</div>`}).join("")
}
function gachaItemStatsHtml(item){const dm=Math.max(0,Math.round(Number(item.baseDamage||0))),hp=Math.max(0,Math.round(Number(item.bonusHp||0))),def=Math.max(0,Math.round(Number(item.bonusDef||0)));return `<div class="gacha-result-stats"><span>⚔️ +${dm}</span><span>🛡️ +${def}</span><span>❤️ +${hp}</span></div>`}
function renderEquipmentBag(){
  const el=document.getElementById("equipmentBagList"),count=document.getElementById("equipmentBagCount"),selected=document.getElementById("equipmentBagSelected"),btn=document.getElementById("equipmentBagEquipButton");
  if(!el)return;
  const a=ensureGachaCollection();
  if(count)count.textContent=a.length;
  if(equipmentBagSelectedIndex>=a.length)equipmentBagSelectedIndex=-1;
  if(!a.length){
    el.innerHTML=`<div class="gacha-empty equipment-bag-empty">🧰<br><b>กระเป๋าอุปกรณ์ว่าง</b><small>อุปกรณ์ที่สุ่มได้จากกาชาจะมาอยู่ที่นี่</small></div>`;
    if(selected)selected.textContent="ยังไม่มีอุปกรณ์ให้เลือก";
    if(btn){btn.disabled=true;btn.textContent="🛡️ สวมใส่อุปกรณ์ที่เลือก"}
    return;
  }
  el.innerHTML=getSortedEquipmentBag().map(({item,index})=>{
    const idx=index;
    const t=getWeaponTier(item),m=weaponTierMeta(t),is=idx===equipmentBagSelectedIndex;
    return `<button type="button" class="equipment-bag-item weapon-tier-${t} ${is?"selected":""}" data-equipment-index="${idx}" style="--rarity-color:${m.color}"><span class="equipment-check">${is?"✓":""}</span><span class="equipment-bag-icon">${item.icon}</span><span class="equipment-bag-main"><b>${item.name}</b><small>${m.label} · ${weaponStarHtml(item.stars,t)}</small><em>${item.slot==="weapon"?"อาวุธ":"ชุดเกราะ"}</em>${gachaItemStatsHtml(item)}</span></button>`;
  }).join("");
  el.querySelectorAll("[data-equipment-index]").forEach(card=>card.addEventListener("click",()=>{equipmentBagSelectedIndex=Number(card.dataset.equipmentIndex);renderEquipmentBag()}));
  const chosen=a[equipmentBagSelectedIndex];
  if(selected)selected.innerHTML=chosen?`เลือกแล้ว: <b>${chosen.icon} ${chosen.name}</b> · ${weaponStarHtml(chosen.stars,getWeaponTier(chosen))}`:"เลือกอุปกรณ์ 1 ชิ้น";
  if(btn){btn.disabled=!chosen;btn.textContent=chosen?`🛡️ สวมใส่ ${chosen.name}`:"🛡️ สวมใส่อุปกรณ์ที่เลือก"}
}
function equipSelectedEquipment(){
  const a=ensureGachaCollection(),item=a[equipmentBagSelectedIndex];if(!item)return;
  const slot=item.slot;if(!EQUIPMENT_META[slot])return;
  const chosen={...item};
  const current=state.rpgEquipment?.[slot] ? {...state.rpgEquipment[slot]} : null;

  // Swap, never consume equipment: remove only the selected copy and return the old equipped item to the bag.
  a.splice(equipmentBagSelectedIndex,1);
  if(current){
    current.slot=slot;
    if(!current.id)current.id=`equipment-${slot}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    syncWeaponStarData(current);
    a.push(current);
  }
  syncEquipmentSlot(slot,chosen);

  equipmentBagSelectedIndex=-1;
  syncCharacterStatsFromProgress();
  saveState();
  renderRpgInventory();syncCharacterEnhance();syncRpgHud();updateCharacterLobby();renderEquipmentBag();
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`✅ สวมใส่ ${chosen.name} สำเร็จ · ถอด ${current?.name||"อุปกรณ์เดิม"} กลับเข้ากระเป๋าแล้ว`));
}
function unequipAllEquipment(){
  const eq=state.rpgEquipment||{};
  const bag=ensureGachaCollection();
  const removed=[];
  for(const slot of Object.keys(EQUIPMENT_META)){
    const item=eq[slot];
    if(!item) continue;
    const returned={...item,slot};
    if(!returned.id) returned.id=`equipment-${slot}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    syncWeaponStarData(returned);
    bag.push(returned);
    removed.push(returned.name);
    delete eq[slot];
  }
  state.rpgEquipment=eq;
  state.v101EquipmentSlotsCanBeEmpty=true;
  rpg.weapon={level:0,baseDamage:0,durability:0,broken:true,regenRank:0,rarity:"NORMAL",stars:0,weaponTier:"NORMAL"};
  syncWeaponState();
  syncCharacterStatsFromProgress();
  equipmentBagSelectedIndex=-1;
  saveState(); renderRpgInventory(); renderEquipmentBag(); updateCharacterLobby(); syncRpgHud();
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(removed.length?`🧰 ถอดอุปกรณ์ทั้งหมด ${removed.length} ชิ้นกลับเข้ากระเป๋าแล้ว`:"🧰 ตอนนี้ไม่ได้สวมอุปกรณ์อยู่"));
}

function renderGachaCollection(){renderEquipmentBag()}

function gachaVisualMeta(item){
  if(item?.type==="hero" || item?.type==="power"){
    const m=POWER_TIER_META[item.rarity]||POWER_TIER_META.C;
    return {label:m.label,color:m.color,tier:item.rarity==="REGEN"?"RED":(["SSPLUS","SSR"].includes(item.rarity)?"ORANGE":"NORMAL")};
  }
  if(item?.type==="gacha-item") return {label:"ไอเท็ม",color:"#b9d9c8",tier:"NORMAL"};
  const t=getWeaponTier(item),m=weaponTierMeta(t);
  return {label:m.label,color:m.color,tier:t};
}
function raritySfx(tier){if(tier==="RED")return "gachaLegendary";if(tier==="ORANGE")return "gachaRare";return "gachaCommon"}
function showGachaAnimationOverlay(show){const o=document.getElementById("gachaAnimationOverlay");if(!o)return;o.classList.toggle("hidden",!show)}
function playGachaRevealSound(item){try{sfx(raritySfx(gachaVisualMeta(item).tier))}catch(_){}}
function prepareGachaBox(item){
  const vm=gachaVisualMeta(item),box=document.getElementById("gachaRevealBox");
  if(!box)return;
  box.className=`gacha-reveal-box ${vm.tier.toLowerCase()}`;
  box.innerHTML=`<div class="reveal-box-lid"></div><div class="reveal-box-body"></div><div class="reveal-box-ribbon"></div><div class="reveal-light"></div><div class="reveal-particles"></div>`;
  const status=document.getElementById("gachaRevealStatus"),out=document.getElementById("gachaRevealItem");
  if(status)status.textContent=`แตะกล่องเพื่อเปิด · ${gachaAnimationIndex+1} / ${gachaAnimationQueue.length}`;
  if(out){out.className="gacha-reveal-item hidden";out.innerHTML="";out.style.removeProperty("--rarity-color")}
}
function revealGachaOne(){
  if(gachaRevealBusy||gachaAnimationIndex>=gachaAnimationQueue.length)return;
  const item=gachaAnimationQueue[gachaAnimationIndex],vm=gachaVisualMeta(item);
  const box=document.getElementById("gachaRevealBox"),status=document.getElementById("gachaRevealStatus"),out=document.getElementById("gachaRevealItem");
  gachaRevealBusy=true;gachaRevealOpened=false;
  if(box)box.className=`gacha-reveal-box ${vm.tier.toLowerCase()} opening`;
  if(status)status.textContent="✨ กำลังเปิดกล่อง...";
  stopGachaAnimation();
  gachaAnimationTimer=setTimeout(()=>{
    if(box)box.classList.add("opened");playGachaRevealSound(item);
    if(status)status.innerHTML=`<span style="color:${vm.color}">${vm.label}</span> · แตะกล่องเพื่อเปิดชิ้นถัดไป`;
    if(out){
      out.className=`gacha-reveal-item ${item.type==="hero"?"hero-reveal-card":""}`;
      out.style.setProperty("--rarity-color",vm.color);
      if(item.type==="hero" || item.type==="power"){
        out.innerHTML=`<div class="reveal-item-icon power-reveal-icon">${item.icon}</div><b>${item.name}</b><small>พลัง · ${vm.label} · Lv.1</small><div>⚡ ×${(POWER_TIER_META[item.rarity]?.multiplier||1).toLocaleString()} · 5 สกิล</div>`;
      }else if(item.type==="gacha-item"){
        out.innerHTML=`<div class="reveal-item-icon">${item.icon}</div><b>${item.name}</b><small>ไอเท็ม · ${item.note||""}</small>`;
      }else{
        out.innerHTML=`<div class="reveal-item-icon">${item.icon}</div><b>${item.name}</b><small>${item.slot==="weapon"?"อาวุธ":"ชุดเกราะ"} · ${vm.label}</small><div>${weaponStarHtml(item.stars,getWeaponTier(item))}</div>${gachaItemStatsHtml(item)}`;
      }
    }
    gachaAnimationIndex++;gachaRevealBusy=false;gachaRevealOpened=true;
    if(gachaAnimationIndex>=gachaAnimationQueue.length){
      if(status)status.innerHTML=`<span style="color:${vm.color}">${vm.label}</span> · เปิดครบ ${gachaAnimationQueue.length} ชิ้นแล้ว`;
      syncGachaResultsPanel(gachaAnimationResults);
    }
  },700)
}
function advanceGachaByTap(){
  if(!gachaAnimationQueue.length||gachaRevealBusy)return;
  if(gachaAnimationIndex>=gachaAnimationQueue.length)return;
  if(gachaRevealOpened||gachaAnimationIndex===0){prepareGachaBox(gachaAnimationQueue[gachaAnimationIndex]);revealGachaOne()}
}
function finishGachaAnimation(skipped=false){
  stopGachaAnimation();gachaRevealBusy=false;
  if(skipped){
    gachaAnimationQueue.forEach(item=>playGachaRevealSound(item));
    syncGachaResultsPanel(gachaAnimationResults);
    showGachaAnimationOverlay(false);
    renderEquipmentBag();renderHeroRoster();renderRpgInventory();renderRpgBag();
  }else{
    syncGachaResultsPanel(gachaAnimationResults);
    showGachaAnimationOverlay(false);
    renderEquipmentBag();renderHeroRoster();renderRpgInventory();renderRpgBag();
  }
  gachaAnimationQueue=[];gachaAnimationResults=[];gachaAnimationIndex=0;gachaRevealOpened=false;
}
function skipGachaAnimation(){if(!gachaAnimationQueue.length)return;finishGachaAnimation(true)}
function startGachaAnimation(items){
  stopGachaAnimation();gachaAnimationResults=items.slice();gachaAnimationQueue=items.slice();
  gachaAnimationIndex=0;gachaRevealBusy=false;gachaRevealOpened=false;
  showGachaAnimationOverlay(true);prepareGachaBox(gachaAnimationQueue[0]);
}
function clearGachaRound(){stopGachaAnimation();gachaAnimationQueue=[];gachaAnimationResults=[];gachaAnimationIndex=0;gachaRevealBusy=false;gachaRevealOpened=false;syncGachaResultsPanel([]);showGachaAnimationOverlay(false)}


// V84 HOTFIX — restore all V83 button handlers and gacha helpers.
const HERO_GACHA_CONFIG={single:300,multi:600,multiCount:8};
const ITEM_GACHA_CONFIG={single:200,multi:200,multiCount:5};
const EQUIPMENT_GACHA_CONFIG={single:200,multi:500,multiCount:10};

function heroGachaRarityRoll(){
  const r=Math.random();
  if(r<.50)return "C";
  if(r<.72)return "B";
  if(r<.86)return "A";
  if(r<.94)return "S";
  if(r<.975)return "SS";
  if(r<.992)return "SSPLUS";
  if(r<.998)return "SSR";
  return "REGEN";
}
function heroAttackPreview(h){
  const def=POWER_DEFS[h?.powerId||h?.sourceId]||getActivePowerDef();
  const mult=POWER_TIER_META[def.rarity]?.multiplier||1;
  return Math.round(150*mult*Math.max(1,Number(h?.level||1)));
}
function createGachaHero(){
  const rarity=heroGachaRarityRoll();
  const ids=Object.values(POWER_DEFS).filter(p=>p.rarity===rarity);
  const def=ids[Math.floor(Math.random()*ids.length)]||POWER_DEFS.power_lightning;
  return {
    id:`power-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,
    powerId:def.id, sourceId:def.id, name:def.name, icon:def.icon, rarity:def.rarity,
    type:"power", level:1, xp:0, nextXp:100,
    skills:def.skills.map(s=>({...s}))
  };
}
function addHeroToRoster(hero){
  ensureHeroRoster();
  state.rpgPowers.push({...hero});
  state.rpgCharacters=state.rpgPowers;
  saveState();
}
function renderHeroRoster(){
  const el=document.getElementById("heroRosterList"); if(!el)return; ensureHeroRoster();
  el.innerHTML=state.rpgPowers.map(p=>{
    const def=POWER_DEFS[p.powerId||p.id]||POWER_DEFS.power_lightning;
    const m=POWER_TIER_META[def.rarity]||POWER_TIER_META.C,active=p.id===state.rpgCharacter.id;
    return `<div class="hero-roster-card power-roster-card ${active?"active":""}" style="--rarity-color:${m.color}">
      <div class="hero-roster-avatar">${p.icon||def.icon}</div>
      <div class="hero-roster-main"><b>${p.name||def.name}</b><span>${m.label} · Lv.${Number(p.level||1)}</span><small>⚡ พลัง ×${m.multiplier.toLocaleString()} · 5 สกิล</small></div>
      <button type="button" class="hero-switch-btn" data-hero-switch="${p.id}" ${active?"disabled":""}>${active?"กำลังใช้":"ติดตั้งพลัง"}</button>
    </div>`;
  }).join("");
  el.querySelectorAll("[data-hero-switch]").forEach(b=>b.addEventListener("click",()=>switchHero(b.dataset.heroSwitch)));
}
function switchHero(heroId){
  ensureHeroRoster();
  const power=state.rpgPowers.find(p=>p.id===heroId); if(!power)return;
  const def=POWER_DEFS[power.powerId||power.id]||POWER_DEFS.power_lightning;
  state.rpgCharacter=power;
  state.rpgCharacter.powerId=def.id;
  state.rpgCharacter.powerName=def.name;
  state.rpgCharacter.skills=def.skills.map(s=>({...s}));
  rpg.player.level=Math.max(1,Math.min(200,Number(power.level||1)));
  rpg.player.xp=Math.max(0,Number(power.xp||0)); rpg.player.nextXp=Math.max(100,Number(power.nextXp||100));
  rpg.player.maxHp=getEffectiveCharacterMaxHp(); rpg.player.maxMana=getEffectiveCharacterMaxMana();
  rpg.player.hp=rpg.player.maxHp; rpg.player.mana=rpg.player.maxMana; rpg.player.skillCds=[0,0,0,0,0];
  skillDefs=def.skills;
  saveState(); renderHeroRoster(); updateCharacterLobby(); syncRpgHud(); renderRpgInventory();
  document.getElementById("characterRosterModal")?.classList.add("hidden");
}

function itemGachaPool(){
  // ตู้ไอเท็มทั่วไป: ไม่มีอาวุธ/ชุดเกราะปะปน
  return [
    ["revivalPotion","น้ำทิพย์คืนชีพ","🧪","ชุบชีวิต"],
    ["moonScroll","สเก็ตแห่งดวงจันทร์","🌙","วัสดุซ่อมอุปกรณ์"],
    ["soulHammer","ค้อนคืนวิญญาณ","🔨","วัสดุคืนสภาพอุปกรณ์"],
    ["hpPotion","ยาฟื้นพลัง","❤️","เติม HP"],
    ["manaPotion","ยาฟื้นมานา","💧","เติม MP"],
    ["enhancementScroll","ใบบวก","📜","วัสดุตีบวก"],
    ["magicOrb","ลูกแก้วเวทมนตร์","🔮","วัสดุตีบวก"],
    ["regenScroll","ใบบวก REGEN","📜","วัสดุระดับสูง"],
    ["universePowder","ผงแห่งจักรวาล","🌌","วัสดุระดับสูง"]
  ].map(([id,name,icon,note])=>({kind:"item",id,name,icon,note}));
}
function createItemGachaReward(){
  const pool=itemGachaPool(),p=pool[Math.floor(Math.random()*pool.length)];
  return {type:"gacha-item",itemType:"item",itemId:p.id,name:p.name,icon:p.icon,note:p.note,qty:1};
}
function grantItemGachaReward(item){
  if(item.type==="gacha-item"){state.rpgInventory=state.rpgInventory||{};state.rpgInventory[item.itemId]=Number(state.rpgInventory[item.itemId]||0)+1}
  else ensureGachaCollection().push(item);
}
function performItemGacha(count){
  normalizeGachaCurrency();
  const cost=count===ITEM_GACHA_CONFIG.multiCount?ITEM_GACHA_CONFIG.multi:ITEM_GACHA_CONFIG.single;
  if(Number(state.diamonds||0)<cost){document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode("❌ เพชรไม่พอ"));return}
  clearGachaRound();state.diamonds-=cost;const out=[];
  for(let i=0;i<count;i++){const item=createItemGachaReward();grantItemGachaReward(item);out.push(item)}
  saveState();syncGachaWallet();syncCurrencyDisplays();renderEquipmentBag();renderRpgInventory();renderRpgBag();
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`🎁 สุ่มตู้ไอเท็ม ${count} ครั้ง · ใช้ ${cost.toLocaleString()} 💎`));
  startGachaAnimation(out);
}
function performHeroGacha(count){
  normalizeGachaCurrency();
  const cost=count===HERO_GACHA_CONFIG.multiCount?HERO_GACHA_CONFIG.multi:HERO_GACHA_CONFIG.single;
  if(Number(state.diamonds||0)<cost){document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode("❌ เพชรไม่พอ"));return}
  clearGachaRound();state.diamonds-=cost;const out=[];
  for(let i=0;i<count;i++){const hero=createGachaHero();addHeroToRoster(hero);out.push(hero)}
  saveState();syncGachaWallet();syncCurrencyDisplays();renderHeroRoster();
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`🧑‍🚀 สุ่มตัวละคร ${count} ครั้ง · ตัวละครใหม่เริ่ม Lv.1`));
  startGachaAnimation(out);
}
function performEquipmentGacha(count){
  normalizeGachaCurrency();
  const cost=count===EQUIPMENT_GACHA_CONFIG.multiCount?EQUIPMENT_GACHA_CONFIG.multi:EQUIPMENT_GACHA_CONFIG.single*count;
  if(Number(state.diamonds||0)<cost){document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode("❌ เพชรไม่พอ"));return}
  clearGachaRound(); state.diamonds-=cost; const out=[];
  for(let i=0;i<count;i++){out.push(createGachaItem(["NORMAL","ORANGE","RED"][Math.floor(Math.random()*3)]));}
  ensureGachaCollection().push(...out);
  saveState();syncGachaWallet();syncCurrencyDisplays();renderEquipmentBag();renderRpgInventory();
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`🛡️ สุ่มอุปกรณ์ ${count} ครั้ง · ใช้ ${cost.toLocaleString()} 💎`));
  startGachaAnimation(out);
}
function equipmentPowerScore(item){
  const rank={NORMAL:1,ORANGE:2,RED:3};
  return (rank[getWeaponTier(item)]||1)*1e12+getWeaponStars(item)*1e9+Number(item.baseDamage||0)*1e4+Number(item.bonusDamage||0)*1e3+Number(item.bonusDef||0)*10+Number(item.bonusHp||0);
}
function sortEquipmentBagByPower(){
  const mode=document.getElementById("equipmentSortMode")?.value||equipmentBagSortMode;
  equipmentBagSortMode=mode;
  equipmentBagSelectedIndex=-1;
  renderEquipmentBag();
  const labels={power_desc:"ระดับพลัง สูง → ต่ำ",power_asc:"ระดับพลัง ต่ำ → สูง",stars_asc:"ดาว น้อย → มาก",stars_desc:"ดาว มาก → น้อย",scale_asc:"สเกลดาเมจ น้อย → มาก",scale_desc:"สเกลดาเมจ มาก → น้อย"};
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`↕️ เรียงอุปกรณ์ตาม ${labels[mode]||labels.power_desc} แล้ว`));
}
function equipBestEquipmentSet(){
  const bag=ensureGachaCollection(); state.rpgEquipment=state.rpgEquipment||{};
  for(const slot of Object.keys(EQUIPMENT_META)){
    const list=bag.filter(i=>i.slot===slot).sort((a,b)=>equipmentPowerScore(b)-equipmentPowerScore(a));
    if(!list.length)continue;
    const best=list[0],current=state.rpgEquipment[slot];
    if(current&&equipmentPowerScore(best)<=equipmentPowerScore(current))continue;

    // Exactly one item per slot. Swap the chosen best item with the old equipped item.
    const idx=bag.findIndex(i=>i.id===best.id);
    if(idx>=0)bag.splice(idx,1);
    if(current){
      const returned={...current,slot};
      if(!returned.id)returned.id=`equipment-${slot}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      syncWeaponStarData(returned);
      bag.push(returned);
    }
    syncEquipmentSlot(slot,best);
  }
  equipmentBagSelectedIndex=-1;
  syncWeaponState();syncCharacterStatsFromProgress();saveState();
  renderEquipmentBag();renderRpgInventory();updateCharacterLobby();syncRpgHud();
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode("✨ สวมเซตอุปกรณ์ที่ดีที่สุดให้แล้ว · ของเดิมทุกชิ้นถูกเก็บกลับกระเป๋า"));
}
function syncGachaResultsPanel(items=[]){
  const el=document.getElementById("gachaResults");if(!el)return;
  if(!items.length){el.innerHTML='<div class="gacha-empty">ยังไม่มีผลสุ่ม</div>';return}
  el.innerHTML=items.map(item=>{
    if(item.type==="hero"){const m=HERO_RARITY_META[item.rarity]||HERO_RARITY_META.C;return `<div class="gacha-result-card hero-result-card" style="--rarity-color:${m.color}"><div class="gacha-result-icon">${item.icon}</div><div class="gacha-result-name">${item.name}</div><div class="gacha-result-tier">${m.label}</div><small>ฮีโร่ · Lv.1</small><div>⚔️ ${heroAttackPreview(item).toLocaleString()}</div></div>`}
    if(item.type==="gacha-item")return `<div class="gacha-result-card item-result-card"><div class="gacha-result-icon">${item.icon}</div><div class="gacha-result-name">${item.name}</div><div class="gacha-result-tier">ไอเท็ม</div><small>${item.note||""}</small></div>`;
    const t=getWeaponTier(item),m=weaponTierMeta(t);return `<div class="gacha-result-card weapon-tier-${t}" style="--rarity-color:${m.color}"><div class="gacha-result-icon">${item.icon}</div><div class="gacha-result-name">${item.name}</div><div class="gacha-result-tier">${m.label}</div><div>${weaponStarHtml(item.stars,t)}</div>${gachaItemStatsHtml(item)}</div>`;
  }).join("");
}
function stopGachaAnimation(){if(gachaAnimationTimer){clearTimeout(gachaAnimationTimer);gachaAnimationTimer=null}}
function revealGachaOne(){
  if(gachaRevealBusy||gachaAnimationIndex>=gachaAnimationQueue.length)return;
  const item=gachaAnimationQueue[gachaAnimationIndex],vm=gachaVisualMeta(item);
  const box=document.getElementById("gachaRevealBox"),status=document.getElementById("gachaRevealStatus"),out=document.getElementById("gachaRevealItem");
  gachaRevealBusy=true;if(box)box.className=`gacha-reveal-box ${vm.tier.toLowerCase()} opening`;if(status)status.textContent="✨ กำลังเปิดกล่อง...";stopGachaAnimation();
  gachaAnimationTimer=setTimeout(()=>{
    if(box)box.classList.add("opened");playGachaRevealSound(item);
    if(out){out.className=`gacha-reveal-item ${item.type==="hero"?"hero-reveal-card":""}`;out.style.setProperty("--rarity-color",vm.color);
      if(item.type==="hero")out.innerHTML=`<div class="reveal-item-icon">${item.icon}</div><b>${item.name}</b><small>ฮีโร่ · ${vm.label} · Lv.1</small>`;
      else if(item.type==="gacha-item")out.innerHTML=`<div class="reveal-item-icon">${item.icon}</div><b>${item.name}</b><small>ไอเท็ม · ${item.note||""}</small>`;
      else out.innerHTML=`<div class="reveal-item-icon">${item.icon}</div><b>${item.name}</b><small>${item.slot==="weapon"?"อาวุธ":"ชุดเกราะ"} · ${vm.label}</small><div>${weaponStarHtml(item.stars,getWeaponTier(item))}</div>`}
    gachaAnimationIndex++;gachaRevealBusy=false;gachaRevealOpened=true;
    const c=document.getElementById("gachaAnimationCounter");if(c)c.textContent=`${Math.min(gachaAnimationIndex+1,gachaAnimationQueue.length)} / ${gachaAnimationQueue.length}`;
    if(gachaAnimationIndex>=gachaAnimationQueue.length){syncGachaResultsPanel(gachaAnimationResults);if(status)status.textContent=`เปิดครบ ${gachaAnimationQueue.length} ชิ้นแล้ว`}
    else if(status)status.textContent="แตะกล่องเพื่อเปิดชิ้นถัดไป";
  },650);
}
function advanceGachaByTap(){if(gachaRevealBusy||gachaAnimationIndex>=gachaAnimationQueue.length)return;prepareGachaBox(gachaAnimationQueue[gachaAnimationIndex]);revealGachaOne()}
function startGachaAnimation(items){
  stopGachaAnimation();gachaAnimationQueue=items.slice();gachaAnimationResults=items.slice();gachaAnimationIndex=0;gachaRevealBusy=false;gachaRevealOpened=false;
  showGachaAnimationOverlay(true);const c=document.getElementById("gachaAnimationCounter");if(c)c.textContent=`1 / ${gachaAnimationQueue.length}`;prepareGachaBox(gachaAnimationQueue[0]);
}
function finishGachaAnimation(){stopGachaAnimation();gachaRevealBusy=false;syncGachaResultsPanel(gachaAnimationResults);showGachaAnimationOverlay(false);renderEquipmentBag();renderHeroRoster();renderRpgInventory();renderRpgBag();gachaAnimationQueue=[];gachaAnimationResults=[];gachaAnimationIndex=0;gachaRevealOpened=false}
function skipGachaAnimation(){if(gachaAnimationQueue.length)finishGachaAnimation()}
function clearGachaRound(){stopGachaAnimation();gachaAnimationQueue=[];gachaAnimationResults=[];gachaAnimationIndex=0;gachaRevealBusy=false;gachaRevealOpened=false;syncGachaResultsPanel([]);showGachaAnimationOverlay(false)}
function performGacha(tier,count){
  normalizeGachaCurrency();
  const c=GACHA_CONFIG[tier],coins=c.coinCost*count,diamonds=c.diamondCost*count;
  if(Number(state.coins||0)<coins||Number(state.diamonds||0)<diamonds){
    document.getElementById("gachaMessage").textContent="❌ เงินหรือเพชรไม่พอสำหรับการสุ่ม";return
  }
  clearGachaRound();
  state.coins-=coins;state.diamonds-=diamonds;
  const out=[],a=ensureGachaCollection();
  for(let n=0;n<count;n++){const item=createGachaItem(tier);out.push(item);a.push(item)}
  saveState();syncGachaWallet();syncCurrencyDisplays();updateCharacterLobby();syncRpgHud();renderEquipmentBag();
  document.getElementById("gachaMessage").textContent=`🎁 เปิดกล่อง ${count} ใบ · ของรางวัลถูกเก็บไว้ในกระเป๋าอุปกรณ์`;
  startGachaAnimation(out);
}
function openCharacterGacha(){clearGachaRound();syncGachaWallet();renderEquipmentBag();renderHeroRoster();openRpgModal("characterGachaModal")}
function openRpgModal(id){
  const modal=document.getElementById(id);
  if(!modal) return;
  // ทุกครั้งที่เปิดหน้าต่าง ให้ดึงยอดปัจจุบันจาก state มาแสดงก่อน
  if(id==="rpgInventoryModal") renderRpgInventory();
  if(id==="rpgBagModal") renderRpgBag();
  if(id==="rpgBlacksmithModal") { renderRpgInventory(); renderBlacksmith(); }
  if(id==="rpgShopModal") { renderRpgInventory(); syncCurrencyDisplays(); }
  if(id==="rpgDeathModal") renderRpgInventory();
  if(id==="characterTopupModal") { syncCharacterServices(); renderDiamondPackages(); }
  if(id==="characterMarketModal") { syncCharacterServices(); renderPlayerMarket(); }
  if(id==="characterEnhanceModal") syncCharacterEnhance();
  if(id==="characterGachaModal") { syncGachaWallet(); renderEquipmentBag(); }
  if(id==="characterEquipmentBagModal") { equipmentBagSelectedIndex=-1; renderEquipmentBag(); }
  if(id==="characterJunkModal") renderCharacterJunk();
  modal.classList.remove("hidden");
}
function closeRpgModal(id){
  if(id==="characterGachaModal") clearGachaRound();
  document.getElementById(id)?.classList.add("hidden");
}


const defaultPlayerMarketListings = [
  {id:"market-fang", icon:"🦷", name:"เขี้ยวเก่า", qty:10, price:100, note:"ผู้เล่น: นักล่าป่าดงดิบ", seller:"นักล่าป่าดงดิบ", isPlayerListing:true, type:"junk", itemId:"fang"},
  {id:"market-hide", icon:"🟫", name:"หนังหยาบ", qty:5, price:300, note:"ผู้เล่น: DarkHunter", seller:"DarkHunter", isPlayerListing:true, type:"junk", itemId:"hide"},
  {id:"market-herb", icon:"🌿", name:"สมุนไพรป่า", qty:10, price:250, note:"ผู้เล่น: ForestMage", seller:"ForestMage", isPlayerListing:true, type:"junk", itemId:"herb"},
  {id:"market-bone", icon:"🦴", name:"กระดูกผุ", qty:20, price:180, note:"ผู้เล่น: NightWalker", seller:"NightWalker", isPlayerListing:true, type:"junk", itemId:"bone"}
];
let playerMarketListings = [...defaultPlayerMarketListings, ...state.marketListings];
function syncCharacterServices(){
  // ใช้ยอดกลางจาก state.coins / state.diamonds เท่านั้น ห้ามสร้างกระเป๋าเงินแยก
  syncCurrencyDisplays();
}

function openCharacterTopup(){syncCharacterServices();renderDiamondPackages();openRpgModal("characterTopupModal");}

function getEquipmentMarketKey(item){
  return [
    item?.slot||"", item?.name||"", item?.icon||"",
    getWeaponTier(item), getWeaponStars(item),
    Number(item?.baseDamage||0), Number(item?.bonusDamage||0),
    Number(item?.bonusHp||0), Number(item?.bonusDef||0)
  ].join("|");
}
function getMarketItemInventory(){
  const result=[];
  rpg.itemInventory=rpg.itemInventory||{};
  const itemDefs = Array.isArray(window.rpgItemTypes) ? window.rpgItemTypes : [];
  for(const item of itemDefs){
    const qty=Number(rpg.itemInventory[item.id]||0);
    if(qty>0) result.push({id:item.id,name:item.name,icon:item.icon||"📦",qty,type:"item"});
  }
  for(const item of rpgJunkTypes||[]){
    const qty=Number(rpg.junk[item.id]||0);
    if(qty>0) result.push({id:item.id,name:item.name,icon:item.icon||"🗑️",qty,type:"junk"});
  }

  // อุปกรณ์ที่สุ่มได้ทุกชิ้นสามารถนำมาวางขายได้
  const groups=new Map();
  for(const item of ensureGachaCollection()){
    const key=getEquipmentMarketKey(item);
    const g=groups.get(key);
    if(g) g.qty++;
    else groups.set(key,{id:key,name:item.name,icon:item.icon||"🛡️",qty:1,type:"equipment",itemKey:key,item:item});
  }
  for(const g of groups.values()) result.push(g);
  return result;
}

function renderMarketSellOptions(){
  const select=document.getElementById("marketSellItem");
  if(!select)return;
  const items=getMarketItemInventory();
  if(!items.length){
    select.innerHTML='<option value="">ไม่มีไอเท็ม RPG สำหรับวางขาย</option>';
    return;
  }
  select.innerHTML=items.map(x=>{
    const extra=x.type==="equipment"
      ? ` · ${weaponStarHtml(x.item.stars,getWeaponTier(x.item))} · ⚔️${Number(x.item.baseDamage||0).toLocaleString()} 🛡️${Number(x.item.bonusDef||0).toLocaleString()} ❤️${Number(x.item.bonusHp||0).toLocaleString()}`
      : "";
    return `<option value="${x.type}:${x.id}">${x.icon} ${x.name} (มี ${x.qty})${extra}</option>`;
  }).join("");
}

function renderPlayerMarket(){
  const list=document.getElementById("playerMarketList");
  const marketCoins=document.getElementById("marketCoins");
  if(marketCoins) marketCoins.textContent=Number(state.coins||0).toLocaleString();
  if(!list)return;

  if(!playerMarketListings.length){
    list.innerHTML=`<div class="bag-empty market-empty">
      <div>🏪</div><b>ยังไม่มีรายการขาย</b>
      <small>นำไอเท็มจากกระเป๋ามาวางขายได้ด้านล่าง</small>
    </div>`;
    renderMarketSellOptions();
    return;
  }

  list.innerHTML=playerMarketListings.map(item=>{
    const own=String(item.seller||"").trim()===String(state.username||"").trim() && !!item.isPlayerListing;
    const price=Number(item.price||0);
    return `<article class="market-item ${own?"market-item-own":""}">
      <div class="market-item-icon">${item.icon||"📦"}</div>
      <div class="market-item-main">
        <b>${item.name} ×${item.qty}</b>
        <small>${item.note||`ผู้เล่น: ${item.seller||"ผู้เล่น"}`} · ${price.toLocaleString()} 🪙${item.type==="equipment" && item.equipmentSnapshot ? ` · ⚔️${Number(item.equipmentSnapshot.baseDamage||0).toLocaleString()} 🛡️${Number(item.equipmentSnapshot.bonusDef||0).toLocaleString()} ❤️${Number(item.equipmentSnapshot.bonusHp||0).toLocaleString()}` : ""}</small>
      </div>
      <div class="market-item-actions">
        ${own
          ? `<span class="market-own-badge">ของฉัน</span>
             <button type="button" class="market-edit" data-market-edit="${item.id}">✏️ เปลี่ยนราคา</button>
             <button type="button" class="market-cancel" data-market-cancel="${item.id}">❌ ยกเลิก</button>`
          : `<button type="button" class="market-buy" data-market-id="${item.id}">ซื้อ</button>`}
      </div>
    </article>`;
  }).join("");

  list.querySelectorAll("[data-market-id]").forEach(btn=>{
    btn.addEventListener("click",()=>buyPlayerListing(btn.dataset.marketId));
  });
  list.querySelectorAll("[data-market-edit]").forEach(btn=>{
    btn.addEventListener("click",()=>changePlayerListingPrice(btn.dataset.marketEdit));
  });
  list.querySelectorAll("[data-market-cancel]").forEach(btn=>{
    btn.addEventListener("click",()=>cancelPlayerListing(btn.dataset.marketCancel));
  });

  renderMarketSellOptions();
}

function findPlayerListing(id){
  return playerMarketListings.find(x=>String(x.id)===String(id));
}

function persistMarketListings(){
  state.marketListings=playerMarketListings.filter(x=>
    !defaultPlayerMarketListings.some(d=>d.id===x.id)
  );
  saveState();
}

function changePlayerListingPrice(id){
  const item=findPlayerListing(id);
  const msg=document.getElementById("marketMessage");
  if(!item || !item.isPlayerListing || String(item.seller||"").trim()!==String(state.username||"").trim()){
    if(msg) msg.textContent="❌ คุณไม่มีสิทธิ์แก้ไขรายการนี้";
    sfx("error");
    return;
  }

  // ไม่ใช้ window.prompt เพราะบาง WebView/Preview ของ VS Code บล็อก native prompt
  // ใช้หน้าต่างแก้ราคาในเกมแทน เพื่อให้ปุ่มทำงานได้แน่นอน
  openMarketPriceEditor(item);
}

function openMarketPriceEditor(item){
  const overlay=document.getElementById("marketPriceEditor");
  const name=document.getElementById("marketPriceItemName");
  const qty=document.getElementById("marketPriceItemQty");
  const input=document.getElementById("marketPriceInput");
  if(!overlay || !input)return;

  name.textContent=item.name||"ไอเท็ม";
  qty.textContent=`×${Number(item.qty||0).toLocaleString()}`;
  input.value=String(Math.max(1,Number(item.price||1)));
  input.dataset.marketId=String(item.id);
  overlay.classList.remove("hidden");
  requestAnimationFrame(()=>{
    input.focus();
    input.select();
  });
}

function closeMarketPriceEditor(){
  const overlay=document.getElementById("marketPriceEditor");
  if(overlay)overlay.classList.add("hidden");
}

function saveMarketPriceEditor(){
  const input=document.getElementById("marketPriceInput");
  const msg=document.getElementById("marketMessage");
  if(!input)return;

  const id=input.dataset.marketId;
  const item=findPlayerListing(id);
  if(!item || !item.isPlayerListing || String(item.seller||"").trim()!==String(state.username||"").trim()){
    closeMarketPriceEditor();
    if(msg)msg.textContent="❌ คุณไม่มีสิทธิ์แก้ไขรายการนี้";
    sfx("error");
    return;
  }

  const price=Math.floor(Number(input.value));
  if(!Number.isFinite(price) || price<1){
    if(msg)msg.textContent="❌ ราคาต้องเป็นจำนวนเต็มอย่างน้อย 1 เหรียญ";
    input.focus();
    input.select();
    sfx("error");
    return;
  }

  item.price=price;
  persistMarketListings();
  closeMarketPriceEditor();
  renderPlayerMarket();
  syncCurrencyDisplays();
  if(msg)msg.textContent=`✏️ เปลี่ยนราคา ${item.name} เป็น ${price.toLocaleString()} เหรียญแล้ว`;
  sfx("success");
}

function cancelPlayerListing(id){
  const item=findPlayerListing(id);
  const msg=document.getElementById("marketMessage");
  if(!item || !item.isPlayerListing || String(item.seller||"")!==String(state.username||"")){
    if(msg) msg.textContent="❌ คุณไม่มีสิทธิ์ยกเลิกรายการนี้";
    sfx("error");
    return;
  }

  const ok=true; // confirmation handled by styled confirmation modal
  if(!ok)return;

  rpg.itemInventory=rpg.itemInventory||{};
  rpg.junk=rpg.junk||{};
  const key=item.itemId||item.id;
  if(item.type==="junk"){
    rpg.junk[key]=(Number(rpg.junk[key])||0)+Number(item.qty||0);
  }else{
    rpg.itemInventory[key]=(Number(rpg.itemInventory[key])||0)+Number(item.qty||0);
  }

  const index=playerMarketListings.findIndex(x=>String(x.id)===String(id));
  if(index>=0) playerMarketListings.splice(index,1);
  persistMarketListings();

  renderPlayerMarket();
  renderRpgBag();
  syncCurrencyDisplays();
  syncRpgHud();
  if(msg) msg.textContent=`↩️ ยกเลิกการขาย ${item.name} ×${item.qty} และคืนของเข้ากระเป๋าแล้ว`;
  sfx("success");
}

function buyPlayerListing(id){
  const item=playerMarketListings.find(x=>x.id===id);
  if(!item)return;
  const msg=document.getElementById("marketMessage");
  const price=Number(item.price)||0;
  const qty=Number(item.qty)||0;
  if(price<=0 || qty<=0){ if(msg)msg.textContent="❌ รายการนี้ไม่ถูกต้อง"; return; }
  if(Number(state.coins||0)<price){
    if(msg)msg.textContent=`❌ เหรียญไม่พอ ต้องใช้ ${price.toLocaleString()} เหรียญ`;
    sfx("error"); return;
  }

  // ตัดเหรียญจากยอดกลาง และเพิ่มไอเท็มเข้าคลัง RPG ทันที
  state.coins-=price;
  rpg.itemInventory=rpg.itemInventory||{};
  rpg.junk=rpg.junk||{};
  const type=item.type || "junk";
  const key=item.itemId || item.id;
  if(type==="equipment"){
    const collection=ensureGachaCollection();
    const template=item.equipmentSnapshot||{};
    for(let n=0;n<qty;n++){
      const copy={...template,id:`market-${Date.now()}-${Math.random().toString(36).slice(2,8)}-${n}`,durability:100,broken:false};
      collection.push(copy);
    }
  }else if(type==="junk") rpg.junk[key]=(Number(rpg.junk[key])||0)+qty;
  else rpg.itemInventory[key]=(Number(rpg.itemInventory[key])||0)+qty;

  // ลบรายการที่ซื้อออกจากตลาด และเก็บรายการผู้เล่นไว้ใน state สำหรับการเปิดตลาดซ้ำ
  const index=playerMarketListings.findIndex(x=>x.id===id);
  if(index>=0) playerMarketListings.splice(index,1);
  persistMarketListings();
  if(msg)msg.textContent=`✅ ซื้อ ${item.name} ×${qty} สำเร็จ ใช้ ${price.toLocaleString()} เหรียญ`;

  // รีเฟรชทุกจุดทันที โดยไม่ต้องกลับฟาร์มแล้วเข้าใหม่
  syncCurrencyDisplays();
  render();
  renderRpgBag();
  renderPlayerMarket();
  syncRpgHud();
  syncCharacterServices();
  sfx("buy");
}

function createPlayerListing(){
  const select=document.getElementById("marketSellItem");
  const qtyEl=document.getElementById("marketSellQty");
  const priceEl=document.getElementById("marketSellPrice");
  const msg=document.getElementById("marketMessage");
  if(!select||!qtyEl||!priceEl)return;
  const raw=select.value;
  if(!raw){if(msg)msg.textContent="❌ ไม่มีไอเท็มสำหรับวางขาย";return;}
  const [type,...rest]=raw.split(":");
  const id=rest.join(":");
  const qty=Math.max(1,Math.floor(Number(qtyEl.value)||0));
  const price=Math.max(1,Math.floor(Number(priceEl.value)||0));

  if(type==="equipment"){
    const collection=ensureGachaCollection();
    const matches=collection.filter(item=>getEquipmentMarketKey(item)===id);
    if(matches.length<qty){
      if(msg)msg.textContent=`❌ อุปกรณ์ซ้ำกันไม่พอ ต้องการ ${qty} แต่มี ${matches.length}`;
      sfx("error"); return;
    }
    const template={...matches[0]};
    const ids=new Set(matches.slice(0,qty).map(x=>x.id));
    state.rpgEquipmentCollection=collection.filter(x=>!ids.has(x.id));
    playerMarketListings.unshift({
      id:`player-equip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      icon:template.icon||"🛡️", name:template.name, qty, price,
      note:`ผู้เล่น: ${state.username||"ผู้เล่น"} · ${weaponTierMeta(getWeaponTier(template)).label} · ${weaponStarHtml(getWeaponStars(template),getWeaponTier(template))}`,
      seller:state.username||"ผู้เล่น", isPlayerListing:true, type:"equipment",
      itemId:id, equipmentSnapshot:template
    });
    persistMarketListings();
    saveState();
    if(msg)msg.innerHTML=`📤 วางขาย ${template.name} ×${qty} สำเร็จ · ${weaponStarHtml(getWeaponStars(template),getWeaponTier(template))} · ⚔️ ${Number(template.baseDamage||0).toLocaleString()} · 🛡️ ${Number(template.bonusDef||0).toLocaleString()} · ❤️ ${Number(template.bonusHp||0).toLocaleString()}`;
    renderEquipmentBag();
    renderPlayerMarket();
    syncRpgHud();
    updateCharacterLobby();
    syncCharacterServices();
    sfx("success");
    return;
  }

  const source=type==="junk"?(rpg.junk[id]||0):(rpg.itemInventory?.[id]||0);
  if(source<qty){if(msg)msg.textContent=`❌ มีไอเท็มไม่พอ ต้องการ ${qty} แต่มี ${source}`;sfx("error");return;}
  const defs=type==="junk"?rpgJunkTypes:(Array.isArray(window.rpgItemTypes)?window.rpgItemTypes:[]);
  const item=defs.find(x=>x.id===id);
  if(!item)return;
  if(type==="junk") rpg.junk[id]-=qty;
  else rpg.itemInventory[id]-=qty;
  playerMarketListings.unshift({
    id:`player-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    icon:item.icon||"📦", name:item.name, qty, price,
    note:`ผู้เล่น: ${state.username||"ผู้เล่น"}`,
    seller:state.username||"ผู้เล่น", isPlayerListing:true, type, itemId:id
  });
  persistMarketListings();
  syncCurrencyDisplays();
  if(msg)msg.textContent=`📤 วาง ${item.name} ×${qty} ในตลาด ราคา ${price.toLocaleString()} 🪙`;
  renderRpgBag();
  renderPlayerMarket();
  syncCharacterServices();
  sfx("success");
}
function openCharacterMarket(){
  // ดึงยอดและคลังล่าสุดทุกครั้งที่เปิดตลาด
  syncCurrencyDisplays();
  renderRpgBag();
  // เปิดตลาดแบบ defensive: ต่อให้รายการไอเท็ม RPG ยังไม่มี definition ก็ต้องเปิดหน้าตลาดได้
  try {
    rpg.itemInventory = rpg.itemInventory || {};
    syncCharacterServices();
    renderPlayerMarket();
  } catch (err) {
    console.warn("Market render fallback:", err);
    const list=document.getElementById("playerMarketList");
    if(list && !list.innerHTML.trim()) list.innerHTML='<div class="bag-empty"><div>🏪</div><b>ตลาดพร้อมใช้งาน</b><small>ยังไม่มีไอเท็ม RPG สำหรับวางขายในกระเป๋า</small></div>';
  }
  const modal=document.getElementById("characterMarketModal");
  if(modal) modal.classList.remove("hidden");
}
function getEnhanceItem(){
  const slot=EQUIPMENT_META[rpg.enhanceSlot] ? rpg.enhanceSlot : "weapon";
  return state.rpgEquipment[slot];
}
function getEnhanceRarity(){
  const item=getEnhanceItem();
  return RARITY_META[item?.rarity] ? item.rarity : "NORMAL";
}
function getRarityMultiplier(rarity){
  return RARITY_META[rarity]?.multiplier || 1;
}
function rarityEnhanceNeed(stars,tier="NORMAL"){const s=Math.max(1,Math.min(8,Number(stars||1)));return Math.max(1,Math.ceil((Math.pow(3,s-1)*5*weaponTierMeta(tier).multiplier)/3));}
function enhancementScrollNeed(level,tier=getEnhanceTier()){return rarityEnhanceNeed(level,tier)}
function enhancementChance(level){return ({1:.70,2:.55,3:.45,4:.35,5:.25,6:.16,7:.08,8:0})[Math.max(1,Math.min(8,Number(level||1)))]??0}
function getEnhanceItemDisplay(){
  const item=getEnhanceItem() || {};
  const meta=EQUIPMENT_META[rpg.enhanceSlot] || EQUIPMENT_META.weapon;
  return {
    slot:rpg.enhanceSlot,
    item,
    label:meta.label,
    level:getWeaponStars(item),stars:getWeaponStars(item),tier:getWeaponTier(item),tierMeta:weaponTierMeta(getWeaponTier(item)),
    rarity:"NORMAL",rarityMeta:RARITY_META.NORMAL,icon:item.icon||meta.icon,name:item.name||meta.name,durability:Math.max(0,Number(item.durability??100)),regenRank:0
  };
}
function selectEnhanceItem(slot){
  if(!EQUIPMENT_META[slot]) return;
  rpg.enhanceSlot=slot;
  rpg.enhanceMode="normal";
  if(slot==="weapon"){
    const w=state.rpgEquipment.weapon;
    rpg.weapon.level=Math.max(1,Number(w.level||1));
    rpg.weapon.durability=Math.max(0,Number(w.durability??100));
    rpg.weapon.broken=!!w.broken;
    rpg.weapon.regenRank=0;
    rpg.weapon.rarity="NORMAL";
    rpg.weapon.stars=getWeaponStars(w);
    rpg.weapon.weaponTier=getWeaponTier(w);
  }
  syncCharacterEnhance();
}
function getEnhanceMode(){
  return rpg.enhanceMode==="orb" ? "orb" : "normal";
}
function setEnhanceMode(mode){
  if(!["normal","orb"].includes(mode)) mode="normal";
  rpg.enhanceMode=mode;
  document.querySelectorAll("[data-enhance-mode]").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.enhanceMode===mode);
  });
  syncCharacterEnhance();
}
function getEnhanceTier(){return getWeaponTier(getEnhanceItem())}
function syncCharacterEnhance(){
 const d=getEnhanceItemDisplay(),cur=d.stars,need=enhancementScrollNeed(cur,d.tier),chance=Math.round(enhancementChance(cur)*100);
 document.getElementById("characterEnhanceWeaponName")&&(document.getElementById("characterEnhanceWeaponName").textContent=d.name);
 const rank=document.getElementById("characterEnhanceWeaponRank");if(rank)rank.innerHTML=weaponStarHtml(cur,d.tier);
 const icon=document.querySelector("#characterEnhanceModal .enhance-weapon-icon");if(icon)icon.textContent=d.icon;
 const dur=document.getElementById("characterEnhanceWeaponDurability");if(dur)dur.textContent=`ความทนทาน ${d.durability}%`;
 const rar=document.getElementById("characterEnhanceRarity");if(rar){rar.textContent=d.tierMeta.label;rar.style.color=d.tierMeta.color}
 document.getElementById("characterEnhanceScrollCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.enhancementScroll||0)));
 document.getElementById("characterMagicOrbCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.magicOrb||0)));
 const req=document.getElementById("characterEnhanceRequirement");if(req)req.innerHTML=cur>=8?`⭐ ${weaponStarHtml(8,d.tier)} อาวุธถึง 8 ดาวสูงสุดแล้ว`:`ต้องใช้ ${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ · โอกาสสำเร็จ ${chance}% · ${d.tierMeta.label} · เป้าหมาย ${weaponStarHtml(cur+1,d.tier)}`;
 const btn=document.getElementById("characterEnhanceWeaponButton"),has=Number(state.rpgInventory.enhancementScroll||0)>=need,orb=getEnhanceMode()==="orb"?Number(state.rpgInventory.magicOrb||0)>0:true;
 if(btn){btn.disabled=!!d.item?.broken||cur>=8||!has||!orb;btn.textContent=cur>=8?"⭐ ครบ 8 ดาว":getEnhanceMode()==="orb"?"🔮 ตีบวกด้วยลูกแก้ว":"⚒️ ตีบวกดาว"}
 document.querySelectorAll("[data-enhance-mode]").forEach(el=>el.classList.toggle("active",el.dataset.enhanceMode===getEnhanceMode()));
 const picker=document.getElementById("enhanceEquipmentPicker");
 if(picker)picker.querySelectorAll("[data-enhance-slot]").forEach(el=>{const slot=el.dataset.enhanceSlot,item=state.rpgEquipment[slot],t=getWeaponTier(item),tm=weaponTierMeta(t);el.classList.toggle("selected",slot===rpg.enhanceSlot);el.classList.toggle("is-broken",Number(item?.durability||0)<=0);const lv=el.querySelector(".picker-level");if(lv)lv.innerHTML=weaponStarHtml(getWeaponStars(item),t);const rr=el.querySelector(".picker-rarity");if(rr){rr.textContent=tm.label;rr.style.color=tm.color}});
 const card=document.querySelector("#characterEnhanceModal .enhance-preview");if(card){card.dataset.rarity=d.tier;card.style.setProperty("--rarity-color",d.tierMeta.color)}
}
function openCharacterEnhance(){
  renderEnhanceEquipmentPicker();
  syncCharacterEnhance();
  openRpgModal("characterEnhanceModal");
}
function renderEnhanceEquipmentPicker(){
  const picker=document.getElementById("enhanceEquipmentPicker");
  if(!picker) return;
  picker.innerHTML=Object.entries(EQUIPMENT_META).map(([slot,meta])=>{
    const item=state.rpgEquipment[slot];
    const tier=getWeaponTier(item),tm=weaponTierMeta(tier);
    return `<button type="button" class="enhance-picker-item ${slot===rpg.enhanceSlot?'selected':''}" data-enhance-slot="${slot}" style="--rarity-color:${tm.color}">
      <span class="picker-icon">${item.durability<=0?"💥":item.icon}</span>
      <span class="picker-name">${meta.label}<small>${item.name}</small></span>
      <span class="picker-rarity" style="color:${tm.color}">${tm.label}</span>
      <span class="picker-level">${weaponStarHtml(getWeaponStars(item),tier)}</span>
    </button>`;
  }).join("");
  picker.querySelectorAll("[data-enhance-slot]").forEach(btn=>{
    btn.addEventListener("click",()=>selectEnhanceItem(btn.dataset.enhanceSlot));
  });
}

function renderCharacterJunk(){const count=rpgJunkTypes.reduce((sum,item)=>sum+(rpg.junk[item.id]||0),0),value=rpgJunkTypes.reduce((sum,item)=>sum+(rpg.junk[item.id]||0)*item.price,0);const c=document.getElementById("characterJunkCount"),v=document.getElementById("characterJunkValue"),list=document.getElementById("characterJunkList"),btn=document.getElementById("characterSellJunkButton");if(c)c.textContent=count;if(v)v.textContent=value.toLocaleString();if(list)list.innerHTML=rpgJunkTypes.map(item=>{const n=rpg.junk[item.id]||0;return `<div class="junk-row"><span>${item.icon} ${item.name} <small>x${n}</small></span><b>${(n*item.price).toLocaleString()} 🪙</b></div>`}).join("");if(btn)btn.disabled=count===0;}
function openCharacterJunk(){renderCharacterJunk();openRpgModal("characterJunkModal");}

function ensureRpgInventory(){
  state.rpgInventory = state.rpgInventory || {};
  const defaults={
    revivalPotion:0, moonScroll:0, soulHammer:0, hpPotion:0, manaPotion:0,
    enhancementScroll:0, magicOrb:0, regenScroll:0, universePowder:0
  };
  for(const [key,val] of Object.entries(defaults)){
    state.rpgInventory[key]=Number(state.rpgInventory[key] ?? val);
  }
  return state.rpgInventory;
}
function buyQuantityInput(id){
  const raw=Number(document.getElementById(id)?.value||1);
  if(!Number.isFinite(raw) || raw<1) return 1;
  return Math.floor(raw);
}
function shopMsg(msg){const e=document.getElementById("rpgShopMessage");if(e)e.innerHTML=msg;}
function afterBuy(msg){
  ensureRpgInventory();
  saveState();
  // Refresh the actual inventory immediately — no closing/reopening required.
  renderRpgBag();
  renderRpgInventory();
  updateCharacterLobby();
  syncRpgHud();
  syncCurrencyDisplays();
  shopMsg(msg);
  sfx("buy");
}
function buyHpPotion(){
  ensureRpgInventory();const q=buyQuantityInput("qtyHpPotion"),c=1000*q;if(state.coins<c)return shopMsg("🪙 เหรียญไม่พอ");state.coins-=c;state.rpgInventory.hpPotion+=q;afterBuy(purchaseNotice("hpPotion","ยาฟื้นพลัง",q));}
function buyManaPotion(){
  ensureRpgInventory();const q=buyQuantityInput("qtyManaPotion"),c=1000*q;if(state.coins<c)return shopMsg("🪙 เหรียญไม่พอ");state.coins-=c;state.rpgInventory.manaPotion+=q;afterBuy(purchaseNotice("manaPotion","ยาฟื้นมานา",q));}
function useHpPotion(){if(rpg.deathPending||state.rpgInventory.hpPotion<=0||rpg.player.hp>=rpg.player.maxHp)return;state.rpgInventory.hpPotion--;rpg.player.hp=rpg.player.maxHp;afterBuy("❤️ HP เต็มแล้ว");}
function useManaPotion(){if(rpg.deathPending||state.rpgInventory.manaPotion<=0||rpg.player.mana>=rpg.player.maxMana)return;state.rpgInventory.manaPotion--;rpg.player.mana=rpg.player.maxMana;afterBuy("💙 MP เต็มแล้ว");}

function buyRevivalPotion(){
  ensureRpgInventory();
  const q=buyQuantityInput("qtyRevivalPotion"),c=25*q;
  if(state.diamonds<c)return shopMsg("💎 เพชรไม่พอ");
  state.diamonds-=c;
  if(rpg.inDungeon){
    const bag=ensureDungeonBag();
    bag.items.revivalPotion=(Number(bag.items.revivalPotion)||0)+q;
  }else{
    state.rpgInventory.revivalPotion+=q;
  }
  afterBuy(purchaseNotice("revivalPotion","น้ำทิพย์คืนชีพ",q));
  if(rpg.deathPending)setTimeout(()=>respawnWithPotion(),120);
}

function buyMoonScroll(){
  ensureRpgInventory();
  const q=buyQuantityInput("qtyMoonScroll"),c=300000*q;
  if(state.coins<c)return shopMsg("🪙 เหรียญไม่พอ");
  state.coins-=c;state.rpgInventory.moonScroll+=q;afterBuy(purchaseNotice("moonScroll","สเก็ตแห่งดวงจันทร์",q));
}

function buySoulHammer(){
  ensureRpgInventory();
  const q=buyQuantityInput("qtySoulHammer"),c=35*q;
  if(state.diamonds<c)return shopMsg("💎 เพชรไม่พอ");
  state.diamonds-=c;state.rpgInventory.soulHammer+=q;afterBuy(purchaseNotice("soulHammer","ค้อนคืนวิญญาณ",q));
}
function buyEnhancementScroll(){
  ensureRpgInventory();
  const q=buyQuantityInput("qtyEnhancementScroll"),c=10000*q;
  if(state.coins<c)return shopMsg("🪙 เหรียญไม่พอ");
  state.coins-=c;state.rpgInventory.enhancementScroll+=q;afterBuy(purchaseNotice("enhancementScroll","ใบบวก",q));
}
function buyMagicOrb(){
  ensureRpgInventory();
  const q=buyQuantityInput("qtyMagicOrb"),c=150*q;
  if(state.diamonds<c)return shopMsg("💎 เพชรไม่พอ");
  state.diamonds-=c;state.rpgInventory.magicOrb+=q;afterBuy(purchaseNotice("magicOrb","ลูกแก้วเวทมนตร์",q));
}
function buyRegenScroll(){
  ensureRpgInventory();
  const q=buyQuantityInput("qtyRegenScroll"),c=3000*q;
  if(state.diamonds<c)return shopMsg("💎 เพชรไม่พอ");
  state.diamonds-=c;state.rpgInventory.regenScroll+=q;afterBuy(purchaseNotice("regenScroll","ใบบวกรีเจน",q));
}
function repairEquipment(key){
  if(rpg.inDungeon){
    rpg.combatLog="🔨 ต้องออกจากดันเจี้ยนก่อน จึงจะซ่อมอุปกรณ์กับ NPC ได้";
    return;
  }
  const item=state.rpgEquipment[key];
  if(!item || Number(item.durability||0)<=0 || Number(item.durability||0)>=100) return;

  const level=Math.max(1,item.level||1);
  const cost=getRepairCost(level, key==="weapon" ? getRegenRank() : (item.regenRank||0), item.rarity||"NORMAL");
  if(Number(state.rpgInventory.moonScroll||0)<cost.moon){
    rpg.combatLog=`❌ สเก็ตแห่งดวงจันทร์ไม่พอ ต้องใช้ ${cost.moon} ชิ้น`;
    return;
  }
  if(Number(state.coins||0)<cost.fee){
    rpg.combatLog=`❌ เงินไม่พอ ต้องใช้ ${cost.fee.toLocaleString()} เหรียญ`;
    return;
  }
  state.rpgInventory.moonScroll-=cost.moon;
  state.coins-=cost.fee;
  item.durability=100;

  if(key==="weapon"){
    rpg.weapon.broken=false;
    rpg.weapon.durability=100;
    syncWeaponState();
  }

  saveState();
  renderRpgInventory();
  syncRpgHud();
  rpg.combatLog=`🔧 ซ่อม ${item.name} สำเร็จ ใช้ 🌙 ${cost.moon} + ${cost.fee.toLocaleString()} 🪙`;
  sfx("success");
}

function damageEquipmentOnDeath(){
  const results=[];
  for(const [key,item] of Object.entries(state.rpgEquipment)){
    if(item.durability<=0) continue;
    const damage=10 + Math.floor(Math.random()*91);
    item.durability=Math.max(0,item.durability-damage);
    if(item.durability===0) results.push(`${item.icon} ${item.name} แตก`);
    else results.push(`${item.icon} ${item.name} -${damage}%`);
  }
  // Keep the runtime weapon in sync.
  rpg.weapon.durability=state.rpgEquipment.weapon.durability;
  if(rpg.weapon.durability<=0) rpg.weapon.broken=true;
  syncWeaponState();
  return results;
}

function handleRpgDeath(){
  rpg.deathPending=true;
  rpg.player.hp=0;
  rpg.player.mana=0;
  rpg.keys={w:false,a:false,s:false,d:false,q:false};
  rpg.player.moving=false;
  rpg.player.attackCd=0;
  sfx("death");
  const modal=document.getElementById("rpgDeathModal");
  const summary=document.getElementById("deathSummary");
  const potionQty=getDungeonItemQty("revivalPotion");
  if(potionQty>0){
    summary.innerHTML=`คุณมี <b>${inlineItemVisual("revivalPotion")} น้ำทิพย์คืนชีพ x${potionQty}</b><br>ใช้ 1 ขวดเพื่อชุบชีวิตโดยไม่เสียความเสียหายของอุปกรณ์`;
    document.getElementById("deathRespawnButton").classList.remove("hidden");
  }else{
    summary.textContent="ไม่มีน้ำทิพย์คืนชีพในกระเป๋าดันเจี้ยน คุณยังเลือกคืนชีพฟรีได้ แต่อุปกรณ์ทุกชิ้นจะเสียหายแบบสุ่ม 10–100%";
    document.getElementById("deathRespawnButton").classList.add("hidden");
  }
  document.getElementById("deathFreeRespawnButton")?.classList.remove("hidden");
  document.getElementById("deathOpenShopButton")?.classList.remove("hidden");
  modal?.classList.remove("hidden");
}

function respawnWithPotion(){
  if(!rpg.deathPending) return;
  const bag=ensureDungeonBag();
  if(Number(bag.items.revivalPotion||0)<=0){
    // Allow a potion bought while the death shop was open.
    if(Number(state.rpgInventory.revivalPotion||0)>0){
      state.rpgInventory.revivalPotion--;
    }else{
      respawnWithoutPotion();
      return;
    }
  }else{
    bag.items.revivalPotion--;
  }
  rpg.deathPending=false;
  rpg.keys={w:false,a:false,s:false,d:false,q:false};
  rpg.player.moving=false;
  rpg.player.hp=rpg.player.maxHp;
  rpg.player.mana=rpg.player.maxMana;
  rpg.player.x=480; rpg.player.y=300;
  rpg.player.hitCd=2;
  document.getElementById("rpgDeathModal")?.classList.add("hidden");
  rpg.combatLog="✨ น้ำทิพย์คืนชีพช่วยคุณกลับมาแล้ว — ไอเทมไม่สูญเสีย";
  saveState(); renderRpgInventory(); renderDungeonBag(); renderDungeonQuickbar(); syncRpgHud(); sfx("respawn");
}

function respawnWithoutPotion(){
  if(!rpg.deathPending) return;
  const losses=damageEquipmentOnDeath();
  rpg.deathPending=false;
  rpg.keys={w:false,a:false,s:false,d:false,q:false};
  rpg.player.moving=false;
  rpg.player.hp=rpg.player.maxHp;
  rpg.player.mana=rpg.player.maxMana;
  rpg.player.x=480; rpg.player.y=300;
  rpg.player.hitCd=2;
  document.getElementById("rpgDeathModal")?.classList.add("hidden");
  rpg.combatLog=losses.length?`☠️ เกิดใหม่ — ${losses.join(" · ")}`:"☠️ เกิดใหม่";
  saveState(); renderRpgInventory(); renderDungeonBag(); renderDungeonQuickbar(); syncRpgHud(); sfx("respawn");
}

function exitDungeonWhileDead(){
  if(!rpg.deathPending) return;
  // closeRpg() handles the same free-respawn durability penalty without reviving the player.
  closeRpg();
}


// V197 WORLD BOSS ONLY — authoritative combat controller.
// This runs only for rpg.currentZone==='worldboss' and the spawned isWorldBoss mob.
function worldBossDamagePlayer(amount, x, y, label, color){
  const p=rpg.player;
  if(!p || p.hp<=0 || rpg.deathPending) return false;
  const playerDef=Math.max(0,Number(getEffectiveDefense?.()||0));
  const dmg=Math.max(1,Math.round(Number(amount||1)*100/(100+playerDef)));
  p.hp=Math.max(0,p.hp-dmg);
  p.hitCd=.16; p.hurtAnim=.28;
  showRpgDamageNumber(x??p.x,y??p.y,dmg,'boss');
  burst(p.x,p.y,color||'#ff7043',12,115);
  try{sfx('hurt');}catch(_){}
  rpg.combatLog=`${label||'💥 โดนบอสโจมตี'} -${dmg} HP`;
  document.querySelector(".rpg-stage-card")?.classList.add("rpg-hit");
  setTimeout(()=>document.querySelector(".rpg-stage-card")?.classList.remove("rpg-hit"),180);
  if(p.hp<=0 && !rpg.deathPending) handleRpgDeath();
  return true;
}
function updateWorldBossEffects(dt){
  if(!Array.isArray(rpg.worldBossEffects)) rpg.worldBossEffects=[];
  const p=rpg.player;
  for(const e of rpg.worldBossEffects){
    e.age=(e.age||0)+dt;
    if(e.type==='fireball'){
      const dx=e.tx-e.x,dy=e.ty-e.y,dist=Math.hypot(dx,dy)||1;
      const step=Math.min(dist,e.speed*dt);
      e.x+=dx/dist*step;e.y+=dy/dist*step;
      if(Math.hypot(p.x-e.x,p.y-e.y)<30 || dist<5){
        if(!e.hit){e.hit=true;sfx('worldBossFireImpact');worldBossDamagePlayer(e.damage,e.x,e.y,'🔥 เปลวเพลิงพิฆาต','#ff7a18');burst(e.x,e.y,'#ffb11a',26,170);}
        e.life=0;
      }
    }else if(e.type==='lightning' && !e.hit && e.age>=e.delay){
      e.hit=true;
      const d=Math.hypot(p.x-e.x,p.y-e.y);
      if(d<=e.radius) worldBossDamagePlayer(e.damage,e.x,e.y,'⚡ มหาพายุสายฟ้า','#b58cff');
      sfx('worldBossLightningStrike');burst(e.x,e.y,'#fff2a8',22,160);
    }else if(e.type==='void' && !e.hit && e.age>=e.delay){
      e.hit=true;
      const d=Math.hypot(p.x-e.x,p.y-e.y);
      if(d<=e.radius) worldBossDamagePlayer(e.damage,e.x,e.y,'🌌 ระเบิดสุญญากาศ','#a46bff');
      sfx('worldBossVoidBlast');burst(e.x,e.y,'#d38cff',34,190);
    }
    e.life=(e.life??2)-dt;
  }
  rpg.worldBossEffects=rpg.worldBossEffects.filter(e=>e.life>0);
}
function castWorldBossSkill(boss){
  if(!Array.isArray(rpg.worldBossEffects)) rpg.worldBossEffects=[];
  const p=rpg.player;
  const skill=boss.bossSkillIndex%3;
  boss.bossSkillIndex=(boss.bossSkillIndex+1)%3;
  boss.attackAnim=.65;
  if(skill===0){
    // 1) Homing fire orb: visible projectile with orange light.
    sfx('worldBossFire');
    rpg.worldBossEffects.push({type:'fireball',x:boss.x,y:boss.y-8,tx:p.x,ty:p.y,speed:260,damage:30,life:3,age:0});
    burst(boss.x,boss.y,'#ff7a18',18,145);
    rpg.combatLog='🔥 ราชันอสูรโลกใช้ เปลวเพลิงพิฆาต!';
  }else if(skill===1){
    // 2) Three delayed lightning strikes around the player's current position.
    sfx('worldBossLightning');
    const targets=[[p.x,p.y],[p.x+70,p.y-35],[p.x-65,p.y+45]];
    for(const [x,y] of targets) rpg.worldBossEffects.push({type:'lightning',x,y,radius:58,damage:24,delay:.62,life:1.25,age:0,hit:false});
    burst(boss.x,boss.y,'#7d5cff',16,130);
    rpg.combatLog='⚡ ราชันอสูรโลกเรียก มหาพายุสายฟ้า!';
  }else{
    // 3) Charged expanding void blast centered on the boss.
    sfx('worldBossVoid');
    rpg.worldBossEffects.push({type:'void',x:boss.x,y:boss.y,radius:185,damage:38,delay:.78,life:1.45,age:0,hit:false});
    burst(boss.x,boss.y,'#b36bff',24,160);
    rpg.combatLog='🌌 ราชันอสูรโลกชาร์จ ระเบิดสุญญากาศ!';
  }
}
function updateWorldBossCombat(dt){
  if(rpg.currentZone!=='worldboss') return;
  const boss=rpg.packs?.flatMap(pack=>pack.mobs||[]).find(m=>m?.isWorldBoss&&m.alive);
  if(!boss) return;
  const p=rpg.player;
  boss.aggro=true;
  boss.hitFlash=Math.max(0,(boss.hitFlash||0)-dt);
  boss.attackAnim=Math.max(0,(boss.attackAnim||0)-dt);
  boss.bossBasicTimer=Math.max(0,(boss.bossBasicTimer??1.2)-dt);
  boss.bossSkillTimer=Math.max(0,(boss.bossSkillTimer??3.5)-dt);
  const dx=p.x-boss.x,dy=p.y-boss.y,dist=Math.hypot(dx,dy)||1;
  // Chase, but stop at casting/melee distance so attacks visibly happen.
  if(dist>115){
    const speed=52*(((boss.slow||0)>0) ? .35 : 1);
    boss.x+=dx/dist*speed*dt;boss.y+=dy/dist*speed*dt;
  }
  if(boss.bossBasicTimer<=0 && dist<=145){
    boss.bossBasicTimer=1.05;
    boss.attackAnim=.28;
    rpg.worldBossEffects.push({type:'basic',x:boss.x,y:boss.y,tx:p.x,ty:p.y,life:.35,age:0});
    worldBossDamagePlayer(16,p.x,p.y,'💥 ราชันอสูรโลกโจมตี','#ff5b5b');
  }
  if(boss.bossSkillTimer<=0){
    boss.bossSkillTimer=4.6;
    castWorldBossSkill(boss);
  }
  updateWorldBossEffects(dt);
}
function drawWorldBossEffects(ctx){
  if(!Array.isArray(rpg.worldBossEffects)) return;
  for(const e of rpg.worldBossEffects){
    ctx.save();
    if(e.type==='fireball'){
      ctx.shadowColor='#ff6a16';ctx.shadowBlur=24;ctx.fillStyle='#ff8a18';
      ctx.beginPath();ctx.arc(e.x,e.y,15,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff3a0';ctx.beginPath();ctx.arc(e.x-4,e.y-4,6,0,Math.PI*2);ctx.fill();
    }else if(e.type==='lightning'){
      const pulse=e.age<e.delay ? .35+.65*Math.abs(Math.sin(e.age*18)) : 1;
      ctx.strokeStyle=e.hit?'rgba(255,255,220,.25)':'#d8c4ff';ctx.lineWidth=3;ctx.shadowColor='#8c5cff';ctx.shadowBlur=22;
      ctx.beginPath();ctx.arc(e.x,e.y,e.radius*pulse,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(150,95,255,.14)';ctx.beginPath();ctx.arc(e.x,e.y,e.radius*pulse,0,Math.PI*2);ctx.fill();
      if(e.age>=e.delay){ctx.strokeStyle='#fff7bf';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(e.x,e.y-210);ctx.lineTo(e.x-10,e.y-120);ctx.lineTo(e.x+9,e.y-70);ctx.lineTo(e.x,e.y);ctx.stroke();}
    }else if(e.type==='void'){
      const q=Math.min(1,e.age/Math.max(.01,e.delay));
      const r=e.radius*(e.hit?1:q);
      ctx.strokeStyle=e.hit?'rgba(225,160,255,.45)':'#b46cff';ctx.lineWidth=5;ctx.shadowColor='#a46bff';ctx.shadowBlur=28;
      ctx.beginPath();ctx.arc(e.x,e.y,r,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle=e.hit?'rgba(164,80,255,.08)':'rgba(164,80,255,.18)';ctx.beginPath();ctx.arc(e.x,e.y,r,0,Math.PI*2);ctx.fill();
    }else if(e.type==='basic'){
      const a=Math.atan2(e.ty-e.y,e.tx-e.x),len=95;
      ctx.strokeStyle='rgba(255,90,65,.85)';ctx.lineWidth=9;ctx.shadowColor='#ff4b36';ctx.shadowBlur=18;
      ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+Math.cos(a)*len,e.y+Math.sin(a)*len);ctx.stroke();
    }
    ctx.restore();
  }
}

function updateRpg(dt) {
  rpgMove(dt);
  rpg.portalCooldown=Math.max(0,(rpg.portalCooldown||0)-dt);
  // Effects must always expire, even when changing scenes.
  updateParticles(dt);

  const p = rpg.player;
  if(rpg.deathPending){
    p.hp=0;
    p.mana=0;
    p.moving=false;
    return;
  }
  // The outdoor entrance is a safe hub: no monster combat here.
  if(!rpg.inDungeon){
    rpg.packs=[];
    p.attackCd=Math.max(0,p.attackCd-dt);
    p.skillCds=p.skillCds.map(v=>Math.max(0,v-dt));
    p.skillCd=Math.max(0,p.skillCd-dt);
    p.attackAnim=Math.max(0,p.attackAnim-dt);
    p.skillAnim=Math.max(0,p.skillAnim-dt);
    p.hurtAnim=Math.max(0,p.hurtAnim-dt);
    return;
  }
  p.attackCd = Math.max(0, p.attackCd-dt);
  p.attackAnim = Math.max(0, p.attackAnim-dt);
  p.skillAnim = Math.max(0, p.skillAnim-dt);
  p.skillCd = Math.max(0, p.skillCd-dt);
  p.skillCds = p.skillCds.map(v=>Math.max(0,v-dt));
  p.hitCd = Math.max(0, p.hitCd-dt);
  p.hurtAnim = Math.max(0, p.hurtAnim-dt);
  p.mana = Math.min(p.maxMana, p.mana + 7*dt);

  updateWorldBossCombat(dt);

  for (const pack of rpg.packs) {
    // PvP rule: either side dying ends the match immediately, regardless of the damage source.
    if(pack.isPvp && rpg.pvpBattle?.active && allDead(pack)){
      finishRpgPvp('win');
      return;
    }
    if (allDead(pack)) {
      if(pack.isPvp) continue;
      // Tower monsters never respawn. When every monster is dead, finish the floor immediately.
      if(rpg.currentZone==='tower'){
        pack.respawnAt=0;
        checkTowerClear();
        continue;
      }
      if (!pack.respawnAt) pack.respawnAt = performance.now()+10000;
      if (performance.now() >= pack.respawnAt) {
        rpg.packs[rpg.packs.indexOf(pack)] = makeRpgPack(pack.x, pack.y, pack.index);
        rpg.combatLog = "🌲 กองมอนสเตอร์เกิดใหม่แล้ว";
      }
      continue;
    } else {
      pack.respawnAt = 0;
    }

    for (const mob of pack.mobs) {
      if (!mob.alive) continue;
      // World Boss has its own controller above: do not overwrite its movement/attack timers here.
      if(mob.isWorldBoss) continue;

      mob.hitFlash = Math.max(0, mob.hitFlash-dt);
      mob.attackCd = Math.max(0, mob.attackCd-dt);
      mob.attackAnim = Math.max(0, mob.attackAnim-dt);
      mob.slow = Math.max(0, mob.slow-dt);

      const dx = p.x-mob.x, dy = p.y-mob.y;
      const dist = Math.hypot(dx,dy);

      // ARPG-style aggro: getting close makes the pack notice the player.
      if (dist < 170) mob.aggro = true;
      if (dist > 230) mob.aggro = false;

      if (mob.aggro && dist > 32) {
        const len = Math.max(1,dist);
        const speed = (mob.elite ? 58 : 70) * (mob.slow>0 ? .35 : 1);
        mob.x += dx/len*speed*dt;
        mob.y += dy/len*speed*dt;
      }

      // Monster attacks the player when it reaches melee range.
      if (!mob.isPvpOpponent && mob.aggro && dist <= 36 && mob.attackCd <= 0 && p.hitCd <= 0) {
        mob.attackCd = mob.elite ? 1.15 : 1.35;
        mob.attackAnim = .25;
        const rawDmg = mob.isPvpOpponent ? Math.max(6,Math.round((mob.pvpPower||1000)*.006)) : Math.max(1, Number(mob.attack || (mob.elite ? 12 : 6)));
        const playerDef = mob.isPvpOpponent ? 0 : Math.max(0, Number(getEffectiveDefense?.() || 0));
        const dmg = Math.max(1, Math.round(rawDmg * 100 / (100 + playerDef)));
        p.hp = Math.max(0,p.hp-dmg);
        p.hitCd = .22;
        p.hurtAnim = .28;
        sfx("hurt");
        document.querySelector(".rpg-stage-card")?.classList.add("rpg-hit");
        setTimeout(()=>document.querySelector(".rpg-stage-card")?.classList.remove("rpg-hit"),180);
        burst(p.x,p.y,"#ff6f6f",8,75);
        rpg.combatLog = `💥 โดนมอนสเตอร์โจมตี -${dmg} HP`;

        if (p.hp <= 0 && !rpg.deathPending) {
          if(mob.isPvpOpponent){ finishRpgPvp('lose'); } else handleRpgDeath();
        }
      }
    }
  }
}

function drawRpg() {
  const ctx=rpgCtx, w=rpgCanvas.width, h=rpgCanvas.height, t=performance.now()/1000;
  // V77 fix: drawRpg owns its own frame delta.
  const nowMs = performance.now();
  const dt = Math.min(0.05, Math.max(0, (nowMs - (rpg._drawLastTime || nowMs)) / 1000));
  rpg._drawLastTime = nowMs;
  // Keep the player reference in function scope so the dungeon renderer can draw the player.
  const p=rpg.player;
  ctx.clearRect(0,0,w,h);

  // ARPG-inspired 3/4 wilderness: darker, cinematic, layered depth.
  const bg=ctx.createLinearGradient(0,0,0,h);
  bg.addColorStop(0,"#211b1b");
  bg.addColorStop(.45,"#3b2a27");
  bg.addColorStop(1,"#151716");
  ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);

  if(!rpg.inDungeon){
    // SAFE HUB — separate scene: no mobs, no combat, only portal + service NPCs.
    const floor=ctx.createLinearGradient(0,0,0,h);
    floor.addColorStop(0,"#18261f"); floor.addColorStop(.5,"#31463a"); floor.addColorStop(1,"#111916");
    ctx.fillStyle=floor; ctx.fillRect(0,0,w,h);
    for(let y=0;y<h;y+=58) for(let x=0;x<w;x+=72){
      ctx.strokeStyle="rgba(220,205,160,.09)";ctx.lineWidth=1;ctx.strokeRect(x,y,72,58);
    }

    // Dimensional portal.
    ctx.fillStyle="rgba(0,0,0,.45)";ctx.beginPath();ctx.ellipse(480,154,108,27,0,0,Math.PI*2);ctx.fill();
    const pg=ctx.createRadialGradient(480,150,8,480,150,100);
    pg.addColorStop(0,"#fff9d0");pg.addColorStop(.22,"#9ff1ff");pg.addColorStop(.58,"#7065f2");pg.addColorStop(1,"rgba(47,30,120,0)");
    ctx.fillStyle=pg;ctx.beginPath();ctx.ellipse(480,150,70,98,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="#e5d7ff";ctx.lineWidth=6;ctx.shadowColor="#7d6cff";ctx.shadowBlur=24;
    ctx.beginPath();ctx.ellipse(480,150,58,88,0,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;
    for(let i=0;i<22;i++){
      const a=i*Math.PI*2/22+performance.now()/1400,r=48+Math.sin(i*2.4)*9;
      ctx.fillStyle=i%2?"#8ee8ff":"#e7ccff";ctx.beginPath();ctx.arc(480+Math.cos(a)*r,150+Math.sin(a)*r*1.45,2.5,0,Math.PI*2);ctx.fill();
    }
    ctx.fillStyle="#fff3c4";ctx.font="bold 18px sans-serif";ctx.textAlign="center";
    ctx.fillText("ประตูมิติ • ดันเจี้ยน",480,55);
    ctx.font="12px sans-serif";ctx.fillStyle="#d8eadc";
    ctx.fillText("เดินเข้าไปในประตูเพื่อเข้าสู่ฉากดันเจี้ยน",480,78);

    // Service NPCs.
    const npcs=[
      {x:175,icon:"🧹",name:"NPC รับซื้อของ",sub:"ขายขยะ / วัตถุดิบ"},
      {x:785,icon:"🔨",name:"ช่างตีบวก",sub:"อัปเกรด / ซ่อมอุปกรณ์"}
    ];
    for(const n of npcs){
      ctx.fillStyle="rgba(0,0,0,.4)";ctx.beginPath();ctx.ellipse(n.x,335,50,13,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#6b4730";ctx.fillRect(n.x-22,270,44,60);
      ctx.fillStyle="#e7b68d";ctx.beginPath();ctx.arc(n.x,250,24,0,Math.PI*2);ctx.fill();
      ctx.font="28px sans-serif";ctx.textAlign="center";ctx.fillText(n.icon,n.x,257);
      ctx.fillStyle="#f2dfad";ctx.font="bold 13px sans-serif";ctx.fillText(n.name,n.x,360);
      ctx.fillStyle="#b9cdbd";ctx.font="10px sans-serif";ctx.fillText(n.sub,n.x,377);
    }
    ctx.fillStyle="rgba(15,20,17,.78)";ctx.roundRect(355,515,250,30,9);ctx.fill();
    ctx.fillStyle="#c9dfc9";ctx.font="bold 11px sans-serif";ctx.fillText("🏛️ เขตปลอดภัย • ไม่มีการต่อสู้",480,535);
  } else {
  // Ground plane: jungle keeps the old terrain; Volcano gets molten rock and lava glow.
  const isWorldBoss=rpg.currentZone==='worldboss'; const isTower=rpg.currentZone==='tower'; const isVolcano=rpg.currentZone==='volcano'; const isDesert=rpg.currentZone==='desert'; const isSea=rpg.currentZone==='sea'; const isSpace=rpg.currentZone==='space';
  if(isWorldBoss){
    // WORLD BOSS ONLY: dedicated arena, not the jungle/dungeon terrain.
    const wg=ctx.createLinearGradient(0,0,0,h);wg.addColorStop(0,'#120b1d');wg.addColorStop(.48,'#321229');wg.addColorStop(1,'#080912');ctx.fillStyle=wg;ctx.fillRect(0,0,w,h);
    const glow=ctx.createRadialGradient(w*.5,h*.42,10,w*.5,h*.42,390);glow.addColorStop(0,'rgba(255,92,35,.22)');glow.addColorStop(.48,'rgba(132,47,181,.12)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(255,150,70,.13)';ctx.lineWidth=2;for(let r=90;r<520;r+=72){ctx.beginPath();ctx.arc(w*.5,h*.47,r,0,Math.PI*2);ctx.stroke();}
    ctx.fillStyle='#17121e';ctx.beginPath();ctx.ellipse(w*.5,h*.68,w*.72,h*.24,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(255,205,110,.20)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(w*.5,h*.68,w*.66,h*.20,0,0,Math.PI*2);ctx.stroke();
    for(let i=0;i<18;i++){const a=i*Math.PI*2/18+t*.12,rr=260+(i%3)*38;const x=w*.5+Math.cos(a)*rr,y=h*.46+Math.sin(a)*rr*.42;ctx.fillStyle=i%2?'rgba(255,125,45,.32)':'rgba(185,80,255,.28)';ctx.beginPath();ctx.arc(x,y,2+(i%3),0,Math.PI*2);ctx.fill();}
  } else if(isTower){
    const tg=ctx.createLinearGradient(0,0,0,h);tg.addColorStop(0,'#090812');tg.addColorStop(.5,'#191225');tg.addColorStop(1,'#08070c');ctx.fillStyle=tg;ctx.fillRect(0,0,w,h);
    const moon=ctx.createRadialGradient(w*.78,95,5,w*.78,95,58);moon.addColorStop(0,'#fff4c7');moon.addColorStop(.55,'#d9c58a');moon.addColorStop(1,'rgba(217,197,138,0)');ctx.fillStyle=moon;ctx.beginPath();ctx.arc(w*.78,95,58,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#100d18'; for(let i=0;i<9;i++){const x=i*w/8-35,bh=95+(i%4)*48;ctx.fillRect(x,h*.38-bh,74,bh+170);ctx.beginPath();ctx.moveTo(x-12,h*.38-bh);ctx.lineTo(x+37,h*.38-bh-45-(i%3)*18);ctx.lineTo(x+86,h*.38-bh);ctx.fill();}
    for(let i=0;i<34;i++){const x=(i*137+41)%w,y=55+(i*79)%Math.max(1,h-130);ctx.fillStyle=i%3?'rgba(255,167,63,.12)':'rgba(170,90,255,.11)';ctx.beginPath();ctx.arc(x,y,1+(i%2),0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#17131c';ctx.fillRect(0,h*.67,w,h*.33);
    for(let i=0;i<13;i++){const x=(i*97+20)%w;ctx.fillStyle='rgba(255,137,45,.18)';ctx.fillRect(x,h*.70,12,5);ctx.fillRect(x+4,h*.78,5,4);}
  } else if(isSpace){
    const sg=ctx.createLinearGradient(0,0,w,h);
    sg.addColorStop(0,'#020313');sg.addColorStop(.42,'#080b2a');sg.addColorStop(1,'#010108');
    ctx.fillStyle=sg;ctx.fillRect(0,0,w,h);
    // Animated starfield with multiple parallax layers.
    for(let i=0;i<120;i++){
      const speed=0.12+(i%5)*0.035, drift=t*speed;
      const x=((i*137.31+drift*70)%(w+80))-40;
      const y=((i*73.77+Math.sin(t*.7+i)*9)%(h+70))-35;
      const r=.45+(i%4)*.42, a=.25+.55*(.5+.5*Math.sin(t*(1.2+(i%3)*.35)+i));
      ctx.fillStyle=`rgba(${150+(i%3)*35},${180+(i%2)*45},255,${a})`;
      ctx.shadowColor=i%7===0?'#b56cff':'#67dfff';ctx.shadowBlur=i%7===0?10:5;
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
    }
    ctx.shadowBlur=0;
    // Moving planets / moons: actual canvas models, not static emoji.
    const planets=[
      {x:w*.14,y:h*.16,r:46,c1:'#7a4bff',c2:'#17144a',ring:true,spd:.12},
      {x:w*.83,y:h*.22,r:70,c1:'#38b8ff',c2:'#0b1640',ring:false,spd:.08},
      {x:w*.68,y:h*.80,r:32,c1:'#ff7a55',c2:'#40111f',ring:true,spd:.17}
    ];
    for(const pl of planets){
      const px=pl.x+Math.sin(t*pl.spd)*26, py=pl.y+Math.cos(t*pl.spd*.8)*14;
      if(pl.ring){ctx.save();ctx.translate(px,py);ctx.rotate(.22+Math.sin(t*.2)*.06);ctx.strokeStyle='rgba(180,220,255,.45)';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,0,pl.r*1.65,pl.r*.42,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
      const g=ctx.createRadialGradient(px-pl.r*.28,py-pl.r*.32,3,px,py,pl.r);
      g.addColorStop(0,pl.c1);g.addColorStop(.48,pl.c2);g.addColorStop(1,'#02030c');
      ctx.fillStyle=g;ctx.shadowColor=pl.c1;ctx.shadowBlur=24;ctx.beginPath();ctx.arc(px,py,pl.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    }
    // Slow asteroid field.
    for(let i=0;i<18;i++){
      const x=((i*223+t*(7+i%4)*9)%(w+120))-60,y=70+(i*97)%(h-130),s=5+(i%5)*3;
      ctx.save();ctx.translate(x,y);ctx.rotate(t*.2+i);ctx.fillStyle=i%2?'#47516c':'#2d3348';
      ctx.beginPath();ctx.moveTo(-s,0);ctx.lineTo(-s*.3,-s);ctx.lineTo(s*.9,-s*.45);ctx.lineTo(s,s*.55);ctx.lineTo(-s*.4,s);ctx.closePath();ctx.fill();ctx.restore();
    }
  } else if(isVolcano){
    const vg=ctx.createLinearGradient(0,0,0,h);vg.addColorStop(0,'#170a0a');vg.addColorStop(.42,'#3b1711');vg.addColorStop(1,'#09090b');ctx.fillStyle=vg;ctx.fillRect(0,0,w,h);
    for(let i=0;i<10;i++){const lx=(i*173+67)%w,ly=90+(i*97)%(h-130);const lg=ctx.createRadialGradient(lx,ly,2,lx,ly,95);lg.addColorStop(0,'rgba(255,118,20,.38)');lg.addColorStop(.35,'rgba(224,49,15,.16)');lg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lx,ly,95,0,Math.PI*2);ctx.fill();}
    // distant volcano silhouettes
    ctx.fillStyle='#16090a';ctx.beginPath();ctx.moveTo(-40,175);ctx.lineTo(130,42);ctx.lineTo(250,178);ctx.lineTo(420,62);ctx.lineTo(575,180);ctx.lineTo(770,25);ctx.lineTo(980,190);ctx.lineTo(w+40,190);ctx.lineTo(w+40,0);ctx.lineTo(-40,0);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(255,82,15,.18)';ctx.beginPath();ctx.moveTo(770,25);ctx.lineTo(730,118);ctx.lineTo(810,118);ctx.closePath();ctx.fill();
    for(let i=0;i<55;i++){const x=(i*89+17)%w,y=(i*53+31)%h;ctx.fillStyle=i%3?'rgba(255,106,20,.14)':'rgba(255,205,90,.18)';ctx.beginPath();ctx.arc(x,y,1+(i%3),0,Math.PI*2);ctx.fill();}
  } else if(isSea){
    const sg=ctx.createLinearGradient(0,0,0,h);sg.addColorStop(0,'#0a4f78');sg.addColorStop(.42,'#06365f');sg.addColorStop(1,'#02172f');ctx.fillStyle=sg;ctx.fillRect(0,0,w,h);
    // underwater light shafts, bubbles and distant reef silhouettes
    for(let i=0;i<7;i++){const x=(i*173+80)%w;ctx.fillStyle='rgba(120,220,255,.045)';ctx.beginPath();ctx.moveTo(x-55,0);ctx.lineTo(x+55,0);ctx.lineTo(x+140,h);ctx.lineTo(x-140,h);ctx.closePath();ctx.fill();}
    for(let i=0;i<30;i++){const x=(i*131+37)%w,y=(i*71+29)%h;ctx.fillStyle='rgba(120,230,255,.12)';ctx.beginPath();ctx.arc(x,y,1+(i%3),0,Math.PI*2);ctx.fill();}
  } else if(isDesert){
    const dg=ctx.createLinearGradient(0,0,0,h);dg.addColorStop(0,'#5b431c');dg.addColorStop(.48,'#a76e2d');dg.addColorStop(1,'#3a2614');ctx.fillStyle=dg;ctx.fillRect(0,0,w,h);
    // dunes and blazing desert sky
    ctx.fillStyle='rgba(255,220,128,.18)';ctx.beginPath();ctx.arc(w*.72,85,58,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#6b4721';ctx.beginPath();ctx.moveTo(-40,220);ctx.quadraticCurveTo(130,110,310,220);ctx.quadraticCurveTo(500,105,690,215);ctx.quadraticCurveTo(820,120,w+50,215);ctx.lineTo(w+50,330);ctx.lineTo(-40,330);ctx.closePath();ctx.fill();
    ctx.fillStyle='#b77a31';ctx.beginPath();ctx.moveTo(-40,290);ctx.quadraticCurveTo(160,180,360,305);ctx.quadraticCurveTo(570,185,780,300);ctx.quadraticCurveTo(900,220,w+40,285);ctx.lineTo(w+40,430);ctx.lineTo(-40,430);ctx.closePath();ctx.fill();
    for(let i=0;i<34;i++){const x=(i*137+23)%w,y=55+(i*71)%(h-100);ctx.fillStyle=i%3?'rgba(255,235,170,.12)':'rgba(110,72,25,.16)';ctx.beginPath();ctx.arc(x,y,1+(i%3),0,Math.PI*2);ctx.fill();}
  }
  ctx.save();
  ctx.globalAlpha=isSpace?.08:isSea?.12:isVolcano?.24:isDesert?.22:.32;
  const tile=64;
  for(let y=-80;y<h+80;y+=tile){
    for(let x=-80;x<w+80;x+=tile){
      const xx=x + ((Math.floor(y/tile)%2)*tile/2);
      ctx.fillStyle=isSpace?(((Math.floor(xx/tile)+Math.floor(y/tile))%2)?'#0a1030':'#070b20'):isSea?(((Math.floor(xx/tile)+Math.floor(y/tile))%2)?'#0a5270':'#073f5c'):isVolcano?(((Math.floor(xx/tile)+Math.floor(y/tile))%2)?'#4b2019':'#2b1717'):isDesert?(((Math.floor(xx/tile)+Math.floor(y/tile))%2)?'#8f5d28':'#b67a36'):(((Math.floor(xx/tile)+Math.floor(y/tile))%2)?"#4a3a31":"#40332d");
      ctx.beginPath();
      ctx.moveTo(xx,y+tile/2); ctx.lineTo(xx+tile/2,y);
      ctx.lineTo(xx+tile,y+tile/2); ctx.lineTo(xx+tile/2,y+tile);
      ctx.closePath(); ctx.fill();
    }
  }
  ctx.restore();

  // Zone decoration: underwater gets only rocks, coral, seaweed and shells — no roads or trees.
  if(isSpace){
    // Floating crystal satellites and nebula debris.
    for(let i=0;i<26;i++){
      const x=(i*173+51)%w,y=70+(i*91)%(h-120),s=7+(i%4)*4,a=t*.45+i;
      ctx.save();ctx.translate(x+Math.sin(a)*8,y+Math.cos(a*.7)*5);ctx.rotate(a*.35);
      ctx.fillStyle=i%3===0?'#8d62ff':i%3===1?'#39cfff':'#a8b3d6';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=12;
      ctx.beginPath();ctx.moveTo(0,-s);ctx.lineTo(s*.7,0);ctx.lineTo(0,s);ctx.lineTo(-s*.7,0);ctx.closePath();ctx.fill();ctx.restore();
    }
  } else if(isSea){
    for(let i=0;i<38;i++){const x=(i*137+31)%w,y=80+(i*83)%(h-115),sz=8+(i%5)*5;
      ctx.fillStyle=i%2?'#1d5260':'#245f69';ctx.beginPath();ctx.moveTo(x-sz,y+sz*.4);ctx.lineTo(x-sz*.45,y-sz);ctx.lineTo(x+sz*.65,y-sz*.65);ctx.lineTo(x+sz,y+sz*.45);ctx.lineTo(x+sz*.2,y+sz);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(x,y+sz,sz*1.15,sz*.32,0,0,Math.PI*2);ctx.fill();
      if(i%3===0){ctx.strokeStyle=i%2?'#2ca8a2':'#e27691';ctx.lineWidth=3+(i%3);ctx.beginPath();ctx.moveTo(x+sz,y+sz*.4);ctx.bezierCurveTo(x+sz*1.8,y-sz*.3,x+sz*1.1,y-sz*1.6,x+sz*2,y-sz*2);ctx.stroke();}
      if(i%4===0){ctx.strokeStyle='#4eae72';ctx.lineWidth=3;for(let k=0;k<3;k++){ctx.beginPath();ctx.moveTo(x-sz,y+sz);ctx.quadraticCurveTo(x-sz*1.2+k*5,y-sz*1.4,x-sz*.3+k*7,y-sz*2.2);ctx.stroke();}}
      if(i%5===0){ctx.fillStyle='#d9c7a4';ctx.beginPath();ctx.arc(x-sz*.8,y+sz*.9,sz*.32,0,Math.PI*2);ctx.fill();}
    }
  } else {
    // Rocky/muddy edges.
    for(let i=0;i<16;i++){const x=(i*149+41)%w, y=(i*83+30)%h;ctx.fillStyle=i%2?"#5c5148":"#706052";ctx.beginPath(); ctx.moveTo(x,y+12); ctx.lineTo(x+13,y-3); ctx.lineTo(x+28,y+10); ctx.lineTo(x+17,y+19); ctx.closePath(); ctx.fill();ctx.fillStyle="rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(x+14,y+18,18,5,0,0,Math.PI*2); ctx.fill();}
    // Path / shallow stream crossing the zone.
    ctx.save();ctx.strokeStyle="#4b3d35"; ctx.lineWidth=60; ctx.lineCap="round";ctx.beginPath(); ctx.moveTo(-40,450); ctx.bezierCurveTo(170,380,300,500,480,430); ctx.bezierCurveTo(660,360,810,470,1000,390); ctx.stroke();ctx.strokeStyle="#675043"; ctx.lineWidth=44;ctx.beginPath(); ctx.moveTo(-40,450); ctx.bezierCurveTo(170,380,300,500,480,430); ctx.bezierCurveTo(660,360,810,470,1000,390); ctx.stroke();ctx.restore();
    if(isVolcano){ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor='#ff4b12';ctx.shadowBlur=14;for(let i=0;i<9;i++){const x=(i*137+25)%w,y=220+(i*71)%(h-190);ctx.strokeStyle='rgba(255,73,14,.75)';ctx.lineWidth=2+(i%2);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+18,y+9);ctx.lineTo(x+32,y+2);ctx.lineTo(x+50,y+15);ctx.stroke();}ctx.restore();}
    // Trees only outside underwater zone.
    for(let i=0;i<24;i++){const x=(i*241+100)%w, y=(i*97+55)%h;ctx.fillStyle=isVolcano?'rgba(18,9,10,.9)':"rgba(16,19,17,.8)";ctx.fillRect(x-4,y+15,8,25);ctx.fillStyle=isVolcano?'rgba(58,25,20,.9)':"rgba(32,48,36,.85)";ctx.beginPath(); ctx.arc(x,y,22,0,Math.PI*2); ctx.arc(x-14,y+12,17,0,Math.PI*2); ctx.arc(x+14,y+12,17,0,Math.PI*2); ctx.fill();}
  }

  // Soft spotlight around player.
  const light=ctx.createRadialGradient(p.x,p.y,15,p.x,p.y,250);
  light.addColorStop(0,"rgba(255,228,161,.12)");
  light.addColorStop(1,"rgba(255,228,161,0)");
  ctx.fillStyle=light; ctx.fillRect(p.x-260,p.y-260,520,520);

  // Update floating damage numbers.
  if(Array.isArray(rpg.damageFloats)){
    for(const f of rpg.damageFloats){ f.life += dt; f.y += f.drift * dt; }
    rpg.damageFloats = rpg.damageFloats.filter(f=>f.life < f.maxLife);
  }

  // World Boss combat effects are drawn before actors so projectiles and ground telegraphs remain visible.
  if(rpg.currentZone==='worldboss') drawWorldBossEffects(ctx);

  // Monster packs.
  for(const pack of rpg.packs){
    const alive=pack.mobs.filter(m=>m.alive).length;
    ctx.save();
    if(!pack.isWorldBoss){
      ctx.globalAlpha=.5;
      ctx.strokeStyle=alive?"#9b6a4b":"#7d725f";
      ctx.lineWidth=2; ctx.setLineDash([6,9]);
      ctx.beginPath(); ctx.ellipse(pack.x,pack.y,92,48,0,0,Math.PI*2); ctx.stroke();
      ctx.setLineDash([]);
    }
    if(allDead(pack)){
      const sec=Math.max(0,Math.ceil((pack.respawnAt-performance.now())/1000));
      ctx.fillStyle="rgba(8,8,8,.78)"; ctx.roundRect(pack.x-55,pack.y-72,110,24,8); ctx.fill();
      ctx.fillStyle="#e9d5aa"; ctx.font="bold 12px sans-serif"; ctx.textAlign="center";
      ctx.fillText(sec>0?`เกิดใหม่ ${sec}s`:"เกิดใหม่...",pack.x,pack.y-55);
    }
    ctx.restore();

    for(const mob of pack.mobs){
      if(!mob.alive) continue;
      if(mob.isWorldBoss){
        // WORLD BOSS: render the actual spawned boss here, in the shared combat renderer.
        // This bypasses the normal monster model entirely.
        const bob=Math.sin(t*2.1)*3;
        ctx.save();ctx.translate(mob.x,mob.y+bob);
        const aura=ctx.createRadialGradient(0,0,10,0,0,118);
        aura.addColorStop(0,'rgba(255,85,35,.34)');aura.addColorStop(.48,'rgba(150,40,185,.22)');aura.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=aura;ctx.beginPath();ctx.arc(0,0,118,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(0,0,0,.58)';ctx.beginPath();ctx.ellipse(0,55,64,17,0,0,Math.PI*2);ctx.fill();
        // wings
        ctx.fillStyle='#351449';ctx.strokeStyle='#9a4cff';ctx.lineWidth=3;
        ctx.beginPath();ctx.moveTo(-32,-10);ctx.lineTo(-108,-58);ctx.lineTo(-84,-8);ctx.lineTo(-128,42);ctx.lineTo(-36,34);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.beginPath();ctx.moveTo(32,-10);ctx.lineTo(108,-58);ctx.lineTo(84,-8);ctx.lineTo(128,42);ctx.lineTo(36,34);ctx.closePath();ctx.fill();ctx.stroke();
        // armored demon body
        ctx.fillStyle='#25152f';ctx.strokeStyle='#ff7045';ctx.lineWidth=4;
        ctx.beginPath();ctx.moveTo(-40,48);ctx.lineTo(-50,-8);ctx.lineTo(-28,-58);ctx.lineTo(0,-82);ctx.lineTo(28,-58);ctx.lineTo(50,-8);ctx.lineTo(40,48);ctx.closePath();ctx.fill();ctx.stroke();
        // horns
        ctx.fillStyle='#f0d18d';ctx.beginPath();ctx.moveTo(-22,-58);ctx.lineTo(-64,-94);ctx.lineTo(-48,-38);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.moveTo(22,-58);ctx.lineTo(64,-94);ctx.lineTo(48,-38);ctx.closePath();ctx.fill();
        // face + glowing eyes
        ctx.fillStyle='#120d19';ctx.beginPath();ctx.arc(0,-42,29,0,Math.PI*2);ctx.fill();
        ctx.shadowColor='#ff2020';ctx.shadowBlur=20;ctx.fillStyle='#ff3a30';ctx.fillRect(-17,-46,11,6);ctx.fillRect(6,-46,11,6);ctx.shadowBlur=0;
        // crown crystal
        ctx.shadowColor='#ffd65f';ctx.shadowBlur=16;ctx.fillStyle='#ffd65f';ctx.beginPath();ctx.moveTo(0,-112);ctx.lineTo(11,-92);ctx.lineTo(0,-72);ctx.lineTo(-11,-92);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
        // chest core
        ctx.shadowColor='#ff4d55';ctx.shadowBlur=22;ctx.fillStyle='#ff4d55';ctx.beginPath();ctx.arc(0,8,10+Math.sin(t*5)*2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
        // boss name + HP
        ctx.textAlign='center';ctx.font='bold 16px sans-serif';ctx.fillStyle='#ffe6bd';ctx.fillText('👑 ราชันอสูรโลก',0,-132);
        const barW=210,ratio=Math.max(0,Math.min(1,mob.hp/mob.maxHp));
        ctx.fillStyle='rgba(0,0,0,.78)';ctx.fillRect(-barW/2,-122,barW,14);
        const hg=ctx.createLinearGradient(-barW/2,0,barW/2,0);hg.addColorStop(0,'#a61228');hg.addColorStop(.5,'#ff5a35');hg.addColorStop(1,'#ffb34d');ctx.fillStyle=hg;ctx.fillRect(-barW/2,-122,barW*ratio,14);ctx.strokeStyle='#ffe1a0';ctx.lineWidth=2;ctx.strokeRect(-barW/2,-122,barW,14);
        ctx.restore();
        continue;
      }
      const bob=Math.sin(t*5+mob.x*.01)*1.4;
      ctx.save(); ctx.translate(mob.x,mob.y+bob);

      // aggro ring
      if(mob.aggro){
        ctx.strokeStyle="rgba(210,85,65,.35)"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(0,0,mob.elite?32:25,0,Math.PI*2); ctx.stroke();
      }

      ctx.fillStyle="rgba(0,0,0,.45)";
      ctx.beginPath(); ctx.ellipse(0,19,mob.elite?25:19,7,0,0,Math.PI*2); ctx.fill();

      if(mob.isPvpOpponent){
        // V132 PvP opponent: render the same humanoid model family as the player.
        const od=mob.pvpData||{};
        const power=mob.pvpPowerDef||getActivePowerDef();
        const pm=POWER_TIER_META[power.rarity]||POWER_TIER_META.C;
        const gender=od.gender==='female'?"female":"male";
        const walk=mob.moving?Math.sin(mob.walkTime||0):0;
        const walk2=mob.moving?Math.sin((mob.walkTime||0)+Math.PI):0;
        const front=Math.cos(mob.facingAngle||0)>-0.08;
        // shadow + legs
        ctx.fillStyle='rgba(0,0,0,.52)';ctx.beginPath();ctx.ellipse(0,24,25,9,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='#222b38';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-7,6);ctx.lineTo(-8+walk*5,22);ctx.moveTo(7,6);ctx.lineTo(8+walk2*5,22);ctx.stroke();
        ctx.strokeStyle='#7c5536';ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(-8+walk*5,22);ctx.lineTo(-14+walk*5,22);ctx.moveTo(8+walk2*5,22);ctx.lineTo(14+walk2*5,22);ctx.stroke();
        const cloak=ctx.createLinearGradient(0,-12,0,18);cloak.addColorStop(0,gender==='female'?'#6d3d72':pm.color);cloak.addColorStop(.55,gender==='female'?'#38233d':'#183b35');cloak.addColorStop(1,'#101a18');ctx.fillStyle=cloak;
        ctx.beginPath();ctx.moveTo(-17,-9);ctx.quadraticCurveTo(-23,5,-17,18);ctx.lineTo(0,24);ctx.lineTo(17,18);ctx.quadraticCurveTo(23,5,17,-9);ctx.closePath();ctx.fill();ctx.strokeStyle=pm.color;ctx.lineWidth=2;ctx.stroke();
        ctx.fillStyle='#d9f7e6';ctx.beginPath();ctx.arc(0,0,7,0,Math.PI*2);ctx.fill();ctx.fillStyle=pm.color;ctx.beginPath();ctx.arc(0,0,4,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=pm.color;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-14,-4);ctx.lineTo(-18,8+walk*.8);ctx.moveTo(14,-4);ctx.lineTo(18,8+walk2*.8);ctx.stroke();
        ctx.fillStyle='#e8b992';ctx.beginPath();ctx.arc(-18,9+walk*.8,4,0,Math.PI*2);ctx.arc(18,9+walk2*.8,4,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#e9b796';ctx.beginPath();ctx.arc(0,-22,12,0,Math.PI*2);ctx.fill();
        ctx.fillStyle=gender==='female'?'#281a2c':'#1b1c25';ctx.beginPath();ctx.arc(0,-27,14,Math.PI,Math.PI*2);ctx.fill();
        if(gender==='male'){ctx.beginPath();ctx.moveTo(-13,-27);ctx.lineTo(-8,-38);ctx.lineTo(-2,-29);ctx.lineTo(4,-39);ctx.lineTo(10,-28);ctx.lineTo(14,-18);ctx.lineTo(-14,-18);ctx.closePath();ctx.fill();}
        if(front){ctx.fillStyle='#202020';ctx.beginPath();ctx.arc(-4,-22,1.4,0,Math.PI*2);ctx.arc(4,-22,1.4,0,Math.PI*2);ctx.fill();ctx.fillStyle=pm.color;ctx.beginPath();ctx.arc(0,-18,2,0,Math.PI*2);ctx.fill();}
        // weapon / power core distinguishes the opponent's build.
        ctx.save();ctx.rotate((mob.attackAnim||0)>0?-.45:0);ctx.strokeStyle=pm.color;ctx.shadowColor=pm.color;ctx.shadowBlur=16;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(14,5);ctx.lineTo(31,-12);ctx.stroke();ctx.fillStyle='#fff2b8';ctx.beginPath();ctx.arc(31,-12,5,0,Math.PI*2);ctx.fill();ctx.restore();ctx.shadowBlur=0;
      } else if(isTower){
        // Tower floor 1: five unique Halloween melee monster models with independent animation/effects.
        const type=mob.monsterType||'normal'; const bob=Math.sin(t*4+mob.x*.03)*2; const swing=(mob.attackAnim||0)>0?Math.sin((1-mob.attackAnim/.35)*Math.PI)*1:0;
        ctx.translate(0,bob); ctx.shadowBlur=18;
        if(type==='normal'){ // cursed pumpkin brute
          const pulse=1+Math.sin(t*5+mob.x)*.06;ctx.scale(pulse,pulse);ctx.shadowColor='#ff7a1a';
          ctx.fillStyle='#2b160f';ctx.beginPath();ctx.ellipse(0,17,23,9,0,0,Math.PI*2);ctx.fill();
          const g=ctx.createRadialGradient(-8,-12,2,0,-5,30);g.addColorStop(0,'#ffcf55');g.addColorStop(.5,'#f06a18');g.addColorStop(1,'#6d1d14');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-4,27,0,Math.PI*2);ctx.fill();
          ctx.strokeStyle='#4b160f';ctx.lineWidth=3;for(let k=-1;k<=1;k++){ctx.beginPath();ctx.arc(k*9,-4,18,-1.4,1.4);ctx.stroke();}
          ctx.fillStyle='#fff1a6';ctx.beginPath();ctx.moveTo(-14,-9);ctx.lineTo(-5,-12);ctx.lineTo(-10,-3);ctx.fill();ctx.beginPath();ctx.moveTo(14,-9);ctx.lineTo(5,-12);ctx.lineTo(10,-3);ctx.fill();ctx.fillStyle='#28110d';ctx.beginPath();ctx.moveTo(-9,7);ctx.lineTo(0,13);ctx.lineTo(10,7);ctx.lineTo(0,18);ctx.closePath();ctx.fill();
          ctx.strokeStyle='#7fbd45';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(4,-42);ctx.lineTo(11,-45);ctx.stroke();
        } else if(type==='ranged'){ // skeleton gladiator, now melee
          ctx.shadowColor='#5ed7ff';ctx.strokeStyle='#d7eaff';ctx.lineWidth=6;ctx.lineCap='round';
          ctx.beginPath();ctx.moveTo(-10,20);ctx.lineTo(-8,2);ctx.moveTo(10,20);ctx.lineTo(8,2);ctx.moveTo(-14,-3);ctx.lineTo(0,5);ctx.lineTo(14,-3);ctx.stroke();
          ctx.fillStyle='#e8f2ea';ctx.beginPath();ctx.arc(0,-15,17,0,Math.PI*2);ctx.fill();ctx.fillStyle='#111827';ctx.beginPath();ctx.arc(-6,-16,4,0,Math.PI*2);ctx.arc(6,-16,4,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#48dfff';ctx.beginPath();ctx.arc(-6,-16,2,0,Math.PI*2);ctx.arc(6,-16,2,0,Math.PI*2);ctx.fill();
          ctx.save();ctx.rotate(-.8+swing*1.7);ctx.strokeStyle='#8996a8';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(12,0);ctx.lineTo(33,-17);ctx.stroke();ctx.fillStyle='#65e8ff';ctx.beginPath();ctx.arc(35,-19,5,0,Math.PI*2);ctx.fill();ctx.restore();
        } else if(type==='caster'){ // shadow witch with floating runes, melee claws
          ctx.shadowColor='#a05cff';ctx.fillStyle='#21102f';ctx.beginPath();ctx.moveTo(-22,22);ctx.quadraticCurveTo(-28,0,-13,-18);ctx.lineTo(0,-38);ctx.lineTo(14,-18);ctx.quadraticCurveTo(28,0,22,22);ctx.closePath();ctx.fill();
          ctx.fillStyle='#6b2f8d';ctx.beginPath();ctx.arc(0,-17,13,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ff9ee8';ctx.beginPath();ctx.arc(-5,-17,2.5,0,Math.PI*2);ctx.arc(5,-17,2.5,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#341244';ctx.beginPath();ctx.moveTo(-17,-27);ctx.lineTo(0,-52);ctx.lineTo(17,-27);ctx.closePath();ctx.fill();
          for(let k=0;k<3;k++){const a=t*2+k*2.094;ctx.strokeStyle='#b975ff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(Math.cos(a)*25,Math.sin(a)*16-5,5,0,Math.PI*2);ctx.stroke();}
          ctx.strokeStyle='#d39cff';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-14,-2);ctx.lineTo(-30,10+swing*8);ctx.moveTo(14,-2);ctx.lineTo(30,10+swing*8);ctx.stroke();
        } else if(type==='elite'){ // black pumpkin knight, dramatic armor + aura
          const pulse=1+Math.sin(t*3)*.05;ctx.scale(pulse,pulse);ctx.shadowColor='#ff3b2f';ctx.shadowBlur=30;
          ctx.fillStyle='#15131d';ctx.beginPath();ctx.moveTo(-28,24);ctx.lineTo(-22,-12);ctx.lineTo(0,-31);ctx.lineTo(22,-12);ctx.lineTo(28,24);ctx.closePath();ctx.fill();ctx.strokeStyle='#ff8a2a';ctx.lineWidth=3;ctx.stroke();
          ctx.fillStyle='#3a2220';ctx.beginPath();ctx.arc(0,-28,19,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ff8f25';ctx.beginPath();ctx.arc(0,-28,12,0,Math.PI*2);ctx.fill();ctx.fillStyle='#160b0b';ctx.fillRect(-10,-32,20,8);
          ctx.save();ctx.rotate(.4+swing*1.3);ctx.strokeStyle='#d4d9e8';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(18,0);ctx.lineTo(43,-28);ctx.stroke();ctx.fillStyle='#ffba48';ctx.beginPath();ctx.arc(45,-30,5,0,Math.PI*2);ctx.fill();ctx.restore();
          ctx.strokeStyle='rgba(255,80,40,.75)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,40,t*2,t*2+4.7);ctx.stroke();
        } else { // wandering ghost: translucent spectral beast, melee rush
          ctx.shadowColor='#7eeaff';ctx.fillStyle='rgba(121,220,255,.72)';ctx.beginPath();ctx.arc(0,-10,22,Math.PI,0);ctx.lineTo(22,22);ctx.quadraticCurveTo(11,14,4,25);ctx.quadraticCurveTo(-6,14,-16,25);ctx.lineTo(-22,22);ctx.closePath();ctx.fill();
          ctx.fillStyle='#06283b';ctx.beginPath();ctx.ellipse(-8,-9,5,7,0,0,Math.PI*2);ctx.ellipse(8,-9,5,7,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#cfffff';ctx.beginPath();ctx.arc(-8,-10,2,0,Math.PI*2);ctx.arc(8,-10,2,0,Math.PI*2);ctx.fill();
          for(let k=0;k<4;k++){const a=t*1.8+k*1.57;ctx.fillStyle='rgba(140,245,255,.55)';ctx.beginPath();ctx.arc(Math.cos(a)*30,Math.sin(a)*18,3,0,Math.PI*2);ctx.fill();}
          if(swing>0){ctx.strokeStyle='#c9ffff';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-18,3);ctx.lineTo(-36,12);ctx.moveTo(18,3);ctx.lineTo(36,12);ctx.stroke();}
        }
        ctx.shadowBlur=0;
      } else if(isSpace){
        const type=mob.monsterType||'normal';
        const scale=mob.elite?1.48:1.08;
        ctx.scale(scale,scale);
        ctx.shadowBlur=18;
        if(type==='normal'){ // armored hunter drone
          ctx.shadowColor='#45dfff';
          ctx.fillStyle='#263650';ctx.beginPath();ctx.roundRect(-25,-16,50,34,10);ctx.fill();
          ctx.fillStyle='#61e8ff';ctx.beginPath();ctx.moveTo(-8,-22);ctx.lineTo(9,-31);ctx.lineTo(18,-18);ctx.closePath();ctx.fill();
          ctx.fillStyle='#101827';ctx.fillRect(-31,-8,62,12);
          ctx.fillStyle='#8fffff';for(let k=-1;k<=1;k++){ctx.beginPath();ctx.arc(k*9,-2,3.2,0,Math.PI*2);ctx.fill();}
          ctx.strokeStyle='#6befff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-30,3);ctx.lineTo(-45,15);ctx.moveTo(30,3);ctx.lineTo(45,15);ctx.stroke();
          ctx.fillStyle='#ff9c54';ctx.beginPath();ctx.arc(0,8,4,0,Math.PI*2);ctx.fill();
        } else if(type==='ranged'){ // alien plasma ranger
          ctx.shadowColor='#ff57cf';
          ctx.fillStyle='#4a215d';ctx.beginPath();ctx.ellipse(0,-8,18,22,0,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#a64dff';ctx.beginPath();ctx.ellipse(0,-16,15,11,0,0,Math.PI*2);ctx.fill();
          ctx.fillStyle='#8affff';ctx.beginPath();ctx.ellipse(-6,-17,3,5,0,0,Math.PI*2);ctx.ellipse(6,-17,3,5,0,0,Math.PI*2);ctx.fill();
          ctx.strokeStyle='#ff73da';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-15,2);ctx.lineTo(-30,13);ctx.moveTo(15,2);ctx.lineTo(31,13);ctx.stroke();
          ctx.fillStyle='#ff68df';ctx.beginPath();ctx.arc(0,5,7+Math.sin(t*8+mob.x)*1.5,0,Math.PI*2);ctx.fill();
        } else if(type==='caster'){ // nebula mage with orbiting cores
          ctx.shadowColor='#9d6cff';ctx.fillStyle='#24194e';ctx.beginPath();ctx.moveTo(0,-32);ctx.lineTo(20,-5);ctx.lineTo(13,25);ctx.lineTo(-13,25);ctx.lineTo(-20,-5);ctx.closePath();ctx.fill();
          ctx.fillStyle='#b789ff';ctx.beginPath();ctx.arc(0,-8,11,0,Math.PI*2);ctx.fill();
          for(let k=0;k<3;k++){const a=t*2+k*Math.PI*2/3;const ox=Math.cos(a)*24,oy=Math.sin(a)*12;ctx.fillStyle='#6fffff';ctx.beginPath();ctx.arc(ox,oy,4,0,Math.PI*2);ctx.fill();}
          ctx.strokeStyle='#c6a4ff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,27,t*.8,t*.8+Math.PI*1.5);ctx.stroke();
        } else { // VOID EMPEROR BOSS
          const pulse=1+Math.sin(t*4)*.06;ctx.scale(pulse,pulse);ctx.shadowColor='#ffd15f';ctx.shadowBlur=34;
          // outer rotating halo
          ctx.save();ctx.rotate(t*.55);ctx.strokeStyle='#8b65ff';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,-7,44,20,0,0,Math.PI*2);ctx.stroke();ctx.restore();
          // armored body + wings
          ctx.fillStyle='#201b42';ctx.beginPath();ctx.moveTo(0,-42);ctx.lineTo(23,-18);ctx.lineTo(30,22);ctx.lineTo(0,35);ctx.lineTo(-30,22);ctx.lineTo(-23,-18);ctx.closePath();ctx.fill();
          ctx.fillStyle='#6847c7';ctx.beginPath();ctx.moveTo(-24,-16);ctx.lineTo(-55,4);ctx.lineTo(-33,18);ctx.lineTo(-15,4);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(24,-16);ctx.lineTo(55,4);ctx.lineTo(33,18);ctx.lineTo(15,4);ctx.closePath();ctx.fill();
          ctx.fillStyle='#ffd15f';ctx.beginPath();ctx.moveTo(0,-35);ctx.lineTo(11,-16);ctx.lineTo(0,-5);ctx.lineTo(-11,-16);ctx.closePath();ctx.fill();
          ctx.fillStyle='#ff7bff';ctx.beginPath();ctx.arc(0,2,8,0,Math.PI*2);ctx.fill();
          for(let k=0;k<4;k++){const a=t*1.7+k*Math.PI/2;ctx.fillStyle='#78e7ff';ctx.beginPath();ctx.arc(Math.cos(a)*38,Math.sin(a)*24,3.5,0,Math.PI*2);ctx.fill();}
        }
      } else if(isSea){
        const type=mob.monsterType||'normal', scale=mob.elite?1.32:1;ctx.scale(scale,scale);ctx.shadowColor=mob.elite?'#58ecff':'#159fc7';ctx.shadowBlur=mob.elite?22:10;
        if(type==='normal'){ // armored reef predator
          ctx.fillStyle='#173d56';ctx.beginPath();ctx.ellipse(-2,1,28,15,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2f88a3';ctx.beginPath();ctx.moveTo(-24,0);ctx.lineTo(-43,-16);ctx.lineTo(-39,14);ctx.closePath();ctx.fill();ctx.fillStyle='#77eaff';ctx.beginPath();ctx.moveTo(6,-9);ctx.lineTo(22,-24);ctx.lineTo(18,-5);ctx.closePath();ctx.fill();ctx.fillStyle='#d9ffff';ctx.beginPath();ctx.arc(13,-4,3,0,Math.PI*2);ctx.fill();
        } else if(type==='ranged'){ // manta with electric fins
          ctx.fillStyle='#352b70';ctx.beginPath();ctx.moveTo(-34,2);ctx.quadraticCurveTo(-15,-26,0,-6);ctx.quadraticCurveTo(17,-28,38,1);ctx.quadraticCurveTo(16,20,0,11);ctx.quadraticCurveTo(-18,20,-34,2);ctx.fill();ctx.strokeStyle='#78f4ff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-20,2);ctx.lineTo(0,-7);ctx.lineTo(25,1);ctx.stroke();ctx.fillStyle='#bdfcff';ctx.beginPath();ctx.arc(5,-2,3,0,Math.PI*2);ctx.fill();
        } else if(type==='caster'){ // abyss octopus with tentacles
          ctx.fillStyle='#401b68';for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.strokeStyle=i%2?'#7d55d9':'#5b32a6';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(0,5);ctx.quadraticCurveTo(Math.cos(a)*18,Math.sin(a)*18,Math.cos(a)*31,Math.sin(a)*26);ctx.stroke();}ctx.fillStyle='#6d35b8';ctx.beginPath();ctx.arc(0,-8,18,0,Math.PI*2);ctx.fill();ctx.fillStyle='#9cf7ff';ctx.beginPath();ctx.arc(-6,-10,3,0,Math.PI*2);ctx.arc(6,-10,3,0,Math.PI*2);ctx.fill();
        } else { // boss: deep sea shark king, fins, jaw and crown crest
          ctx.fillStyle='#183c66';ctx.beginPath();ctx.ellipse(-4,0,38,19,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2d78a4';ctx.beginPath();ctx.moveTo(-30,1);ctx.lineTo(-56,-18);ctx.lineTo(-49,19);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(-4,-12);ctx.lineTo(10,-40);ctx.lineTo(22,-10);ctx.closePath();ctx.fill();ctx.fillStyle='#e8f8ff';ctx.beginPath();ctx.moveTo(18,8);ctx.lineTo(39,5);ctx.lineTo(24,18);ctx.closePath();ctx.fill();ctx.fillStyle='#ff4f62';ctx.beginPath();ctx.arc(19,-5,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd65a';for(let k=0;k<3;k++){ctx.beginPath();ctx.moveTo(-2+k*8,-25);ctx.lineTo(2+k*8,-39);ctx.lineTo(6+k*8,-25);ctx.fill();}
        }
      } else if(isDesert){
        const type=mob.monsterType||'normal', scale=mob.elite?1.22:1;ctx.scale(scale,scale);ctx.shadowColor='#f0ba55';ctx.shadowBlur=mob.elite?16:6;
        if(type==='normal'){ // desert hyena beast
          ctx.fillStyle='#6b4224';ctx.beginPath();ctx.ellipse(-2,2,22,14,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#b77932';ctx.beginPath();ctx.arc(10,-10,13,0,Math.PI*2);ctx.fill();ctx.fillStyle='#e7bd69';ctx.beginPath();ctx.moveTo(3,-19);ctx.lineTo(0,-35);ctx.lineTo(12,-22);ctx.fill();ctx.beginPath();ctx.moveTo(15,-19);ctx.lineTo(24,-34);ctx.lineTo(25,-17);ctx.fill();ctx.fillStyle='#ffe37c';ctx.beginPath();ctx.arc(8,-10,2.7,0,Math.PI*2);ctx.arc(15,-10,2.7,0,Math.PI*2);ctx.fill();
        } else if(type==='ranged'){ // hooded sand hunter
          ctx.fillStyle='#8d6230';ctx.beginPath();ctx.moveTo(-18,18);ctx.lineTo(-12,-10);ctx.lineTo(0,-28);ctx.lineTo(14,-10);ctx.lineTo(20,18);ctx.closePath();ctx.fill();ctx.fillStyle='#2d2118';ctx.fillRect(-12,-20,24,16);ctx.fillStyle='#ffe57b';ctx.beginPath();ctx.arc(-5,-12,2.5,0,Math.PI*2);ctx.arc(5,-12,2.5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#d5a145';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(20,-4);ctx.lineTo(34,-22);ctx.stroke();
        } else if(type==='caster'){ // serpent priest with floating venom orb
          ctx.fillStyle='#4b6a37';ctx.beginPath();ctx.moveTo(-18,18);ctx.quadraticCurveTo(-28,2,-10,-8);ctx.quadraticCurveTo(-2,-24,8,-9);ctx.quadraticCurveTo(25,5,16,20);ctx.closePath();ctx.fill();ctx.fillStyle='#c4a64b';ctx.beginPath();ctx.arc(0,-18,10,0,Math.PI*2);ctx.fill();ctx.fillStyle='#7dff84';ctx.beginPath();ctx.arc(-4,-18,2,0,Math.PI*2);ctx.arc(4,-18,2,0,Math.PI*2);ctx.fill();ctx.shadowColor='#7dff84';ctx.shadowBlur=18;ctx.fillStyle='#7dff84';ctx.beginPath();ctx.arc(27,-4,7,0,Math.PI*2);ctx.fill();
        } else { // scorpion king
          ctx.fillStyle='#4c2b17';ctx.beginPath();ctx.ellipse(0,2,30,19,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#c99338';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-24,4);ctx.lineTo(-43,-8);ctx.moveTo(-22,12);ctx.lineTo(-42,20);ctx.moveTo(24,4);ctx.lineTo(43,-8);ctx.moveTo(22,12);ctx.lineTo(42,20);ctx.stroke();ctx.strokeStyle='#e7bd55';ctx.lineWidth=5;ctx.beginPath();ctx.arc(20,-15,28,.2,1.7);ctx.stroke();ctx.fillStyle='#ffdc62';ctx.beginPath();ctx.arc(27,-38,7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f6c24e';ctx.beginPath();ctx.arc(-9,-2,4,0,Math.PI*2);ctx.arc(9,-2,4,0,Math.PI*2);ctx.fill();
        } ctx.shadowBlur=0;
      } else if(isVolcano){
        const type=mob.monsterType||'normal', scale=mob.elite?1.2:1;ctx.scale(scale,scale);
        ctx.shadowColor='#ff4a12';ctx.shadowBlur=mob.elite?22:10;
        if(type==='normal'){ // armored fire brute
          ctx.fillStyle='#281417';ctx.fillRect(-17,-5,34,25);ctx.fillStyle='#5a2420';ctx.beginPath();ctx.arc(0,-14,17,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ff8b2a';ctx.lineWidth=2;ctx.stroke();
          ctx.fillStyle='#ffcf5b';ctx.beginPath();ctx.moveTo(-11,-23);ctx.lineTo(-20,-37);ctx.lineTo(-3,-27);ctx.fill();ctx.beginPath();ctx.moveTo(11,-23);ctx.lineTo(20,-37);ctx.lineTo(3,-27);ctx.fill();
          ctx.fillStyle='#fff09b';ctx.beginPath();ctx.arc(-6,-14,3,0,Math.PI*2);ctx.arc(6,-14,3,0,Math.PI*2);ctx.fill();
        } else if(type==='ranged'){ // salamander with tail + flame mouth
          ctx.fillStyle='#6d201b';ctx.beginPath();ctx.ellipse(-3,2,21,15,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#9b3520';ctx.beginPath();ctx.arc(9,-12,12,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ff9d30';ctx.lineWidth=2;ctx.stroke();
          ctx.fillStyle='#ffdb63';ctx.beginPath();ctx.arc(13,-13,2.5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f05a18';ctx.beginPath();ctx.moveTo(-20,6);ctx.lineTo(-40,18);ctx.lineTo(-26,15);ctx.fill();
          ctx.fillStyle='#ffcf5b';ctx.beginPath();ctx.moveTo(21,-12);ctx.lineTo(34,-16);ctx.lineTo(23,-4);ctx.fill();
        } else if(type==='caster'){ // magma sorcerer floating cloak + crystal
          ctx.fillStyle='#28152f';ctx.beginPath();ctx.moveTo(-20,17);ctx.lineTo(-12,-12);ctx.lineTo(0,-29);ctx.lineTo(12,-12);ctx.lineTo(20,17);ctx.closePath();ctx.fill();ctx.strokeStyle='#ff7a20';ctx.lineWidth=2;ctx.stroke();
          ctx.fillStyle='#e04b22';ctx.beginPath();ctx.arc(0,-17,11,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffd15d';ctx.beginPath();ctx.arc(-4,-17,2.5,0,Math.PI*2);ctx.arc(4,-17,2.5,0,Math.PI*2);ctx.fill();
          ctx.shadowColor='#ffb11f';ctx.shadowBlur=18;ctx.fillStyle='#ff9b22';ctx.beginPath();ctx.moveTo(24,-2);ctx.lineTo(32,-16);ctx.lineTo(40,-2);ctx.lineTo(32,13);ctx.closePath();ctx.fill();
        } else { // magma king: giant lava core + crown/horns
          const core=ctx.createRadialGradient(0,-2,3,0,-2,30);core.addColorStop(0,'#fff28a');core.addColorStop(.25,'#ff9a1f');core.addColorStop(.62,'#d83b18');core.addColorStop(1,'#4a1716');ctx.fillStyle=core;ctx.beginPath();ctx.arc(0,-2,28,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ffb34a';ctx.lineWidth=3;ctx.stroke();
          ctx.fillStyle='#e7b23e';ctx.beginPath();ctx.moveTo(-22,-25);ctx.lineTo(-16,-47);ctx.lineTo(-5,-31);ctx.lineTo(0,-53);ctx.lineTo(7,-31);ctx.lineTo(18,-47);ctx.lineTo(22,-25);ctx.closePath();ctx.fill();
          ctx.fillStyle='#260b0b';ctx.fillRect(-22,17,44,15);ctx.fillStyle='#fff18a';ctx.beginPath();ctx.arc(-9,-4,4,0,Math.PI*2);ctx.arc(9,-4,4,0,Math.PI*2);ctx.fill();
        }
        ctx.shadowBlur=0;
      } else {
      // legs
      ctx.strokeStyle="#211d20"; ctx.lineWidth=5; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(-7,10); ctx.lineTo(-10,20); ctx.moveTo(7,10); ctx.lineTo(10,20); ctx.stroke();

      // body
      const mg=ctx.createLinearGradient(0,-20,0,18);
      mg.addColorStop(0,mob.elite?"#a64f35":"#6f4d45");
      mg.addColorStop(1,mob.elite?"#4b2625":"#322426");
      ctx.fillStyle=mg;
      ctx.beginPath(); ctx.ellipse(0,0,mob.elite?21:16,mob.elite?23:18,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle=mob.elite?"#e4ad58":"#98705d"; ctx.lineWidth=2; ctx.stroke();

      // horns
      ctx.fillStyle=mob.elite?"#e0bd78":"#766354";
      ctx.beginPath(); ctx.moveTo(-10,-14); ctx.lineTo(-20,-30); ctx.lineTo(-5,-20); ctx.fill();
      ctx.beginPath(); ctx.moveTo(10,-14); ctx.lineTo(20,-30); ctx.lineTo(5,-20); ctx.fill();

      // eyes
      ctx.fillStyle="#ffd76d";
      ctx.beginPath(); ctx.arc(-6,-3,3,0,Math.PI*2); ctx.arc(6,-3,3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#251a18";
      ctx.beginPath(); ctx.arc(-6,-3,1.3,0,Math.PI*2); ctx.arc(6,-3,1.3,0,Math.PI*2); ctx.fill();

      // elite crest
      if(mob.elite){
        ctx.fillStyle="#e8b75b"; ctx.beginPath(); ctx.moveTo(0,-36); ctx.lineTo(8,-27); ctx.lineTo(0,-20); ctx.lineTo(-8,-27); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#fff0b0"; ctx.font="bold 10px sans-serif"; ctx.textAlign="center"; ctx.fillText("ELITE",0,-42);
      }

      }

      // Normal monsters keep their small overhead HP bar. PvP uses a full opponent status panel instead.
      if(!mob.isPvpOpponent){
        const hpRatio = Math.max(0, Math.min(1, mob.hp / mob.maxHp));
        const barW = 58, barH = 8;
        const hpColor = hpRatio > .60 ? (mob.elite ? "#e6a74f" : "#75d85a")
          : hpRatio > .30 ? "#f0c64a" : "#ef5350";
        ctx.fillStyle="rgba(0,0,0,.82)"; ctx.roundRect(-barW/2-2,-52,barW+4,barH+4,4); ctx.fill();
        ctx.fillStyle="rgba(50,30,28,.92)"; ctx.roundRect(-barW/2,-50,barW,barH,3); ctx.fill();
        if(hpRatio>0){
          ctx.fillStyle=hpColor; ctx.roundRect(-barW/2,-50,barW*hpRatio,barH,3); ctx.fill();
          ctx.fillStyle="rgba(255,255,255,.28)"; ctx.roundRect(-barW/2,-50,barW*hpRatio,2,2); ctx.fill();
        }
      }

      // Desert special-cast animation: energy gathers on the monster before the effect appears.
      if(isDesert && mob.skillAnim && mob.skillAnim.life>0){
        mob.skillAnim.life-=dt;
        const sq=1-Math.max(0,mob.skillAnim.life)/mob.skillAnim.max;
        ctx.save();ctx.globalAlpha=Math.max(0,1-sq);
        if(mob.skillAnim.name==='sandstorm'){
          ctx.strokeStyle='#f2ca67';ctx.shadowColor='#e4a43d';ctx.shadowBlur=18;ctx.lineWidth=3;
          for(let ring=0;ring<3;ring++){ctx.beginPath();ctx.ellipse(0,-4-ring*6,18+ring*6,5+ring*2,sq*Math.PI*4+ring,0,Math.PI*2);ctx.stroke();}
        } else if(mob.skillAnim.name==='sandquake'){
          ctx.strokeStyle='#ffcf67';ctx.shadowColor='#d17b20';ctx.shadowBlur=20;ctx.lineWidth=5;
          ctx.beginPath();ctx.moveTo(-18,18);ctx.lineTo(-6,4);ctx.lineTo(3,18);ctx.lineTo(14,-1);ctx.stroke();
          ctx.beginPath();ctx.arc(0,16,12+sq*24,0,Math.PI*2);ctx.stroke();
        } else {
          ctx.fillStyle='#ffe48a';ctx.shadowColor='#d69b35';ctx.shadowBlur=20;ctx.beginPath();ctx.arc(18,-8,8+sq*8,0,Math.PI*2);ctx.fill();
        }
        ctx.restore();
      }
      // Space casting animation: charge-up is drawn ON the monster, so the player can clearly see it casting.
      if(isSpace && mob.skillAnim && mob.skillAnim.life>0){
        mob.skillAnim.life-=dt;
        const q=1-Math.max(0,mob.skillAnim.life)/Math.max(.01,mob.skillAnim.max);
        const name=mob.skillAnim.name;
        ctx.save();ctx.globalCompositeOperation='lighter';
        if(name==='laserBarrage'){
          const charge=8+q*22;
          ctx.strokeStyle=`rgba(90,230,255,${.45+.55*q})`;ctx.shadowColor='#55dfff';ctx.shadowBlur=25;ctx.lineWidth=3+q*3;
          for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(0,-5,charge+k*6,t*8+k*2,t*8+k*2+2.4);ctx.stroke();}
          ctx.fillStyle='#d8ffff';ctx.beginPath();ctx.arc(18,-7,5+q*7,0,Math.PI*2);ctx.fill();
        }else if(name==='plasmaNova'){
          ctx.shadowColor='#ff5cdb';ctx.shadowBlur=34;
          const rr=10+q*26;
          const g=ctx.createRadialGradient(0,-3,1,0,-3,rr);
          g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.35,'rgba(255,70,215,.85)');g.addColorStop(1,'rgba(120,50,255,0)');
          ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-3,rr,0,Math.PI*2);ctx.fill();
          for(let k=0;k<6;k++){const a=t*7+k*Math.PI/3;ctx.strokeStyle='rgba(255,110,240,.75)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-3);ctx.lineTo(Math.cos(a)*rr*1.6,-3+Math.sin(a)*rr*1.6);ctx.stroke();}
        }else if(name==='gravityRift'){
          ctx.shadowColor='#9d6cff';ctx.shadowBlur=30;
          for(let k=0;k<5;k++){const rr=12+k*8+q*14;ctx.strokeStyle=`rgba(150,95,255,${.8-k*.09})`;ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(0,-5,rr,rr*.42,t*4+k*.8,0,Math.PI*2);ctx.stroke();}
          ctx.fillStyle='rgba(20,0,55,.8)';ctx.beginPath();ctx.arc(0,-5,8+q*13,0,Math.PI*2);ctx.fill();
        }else if(name==='supernova'){
          // Boss: big charge animation, orbiting energy cores and a pulsing warning halo.
          const rr=24+q*48;
          ctx.shadowColor='#ffd15f';ctx.shadowBlur=42;
          const g=ctx.createRadialGradient(0,-5,2,0,-5,rr);
          g.addColorStop(0,'rgba(255,255,245,1)');g.addColorStop(.22,'rgba(255,220,95,.95)');g.addColorStop(.58,'rgba(255,90,45,.45)');g.addColorStop(1,'rgba(160,70,255,0)');
          ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-5,rr,0,Math.PI*2);ctx.fill();
          ctx.strokeStyle='rgba(255,230,150,.9)';ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,-5,rr*.72,t*5,t*5+Math.PI*1.8);ctx.stroke();
          for(let k=0;k<6;k++){const a=t*4+k*Math.PI/3;ctx.fillStyle='#fff1a0';ctx.beginPath();ctx.arc(Math.cos(a)*rr, -5+Math.sin(a)*rr,4+q*3,0,Math.PI*2);ctx.fill();}
        }
        ctx.restore();
      }

      // attack animation
      if(mob.attackAnim>0){
        ctx.strokeStyle=isVolcano?'#ff5a1f':isDesert?'#f1c35b':"#ff9e6b"; ctx.shadowColor=isVolcano?'#ff4b12':isDesert?'#d9a441':'transparent';ctx.shadowBlur=(isVolcano||isDesert)?18:0;ctx.lineWidth=4; ctx.globalAlpha=mob.attackAnim/.25;
        ctx.beginPath(); ctx.arc(0,0,30,-.8,.8); ctx.stroke();
      }
      if(mob.hitFlash>0){
        ctx.fillStyle="rgba(255,245,210,.75)"; ctx.beginPath(); ctx.arc(0,0,mob.elite?28:22,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
    }
  }

  // Space projectiles and boss telegraphs: visible, long-range and animated.
  if(isSpace && Array.isArray(rpg.spaceEffects)){
    for(const e of rpg.spaceEffects){
      e.life-=dt;
      const q=1-Math.max(0,e.life)/Math.max(.01,e.max||1);
      const fade=Math.max(0,1-q);
      ctx.save();ctx.globalCompositeOperation='lighter';
      if(e.kind==='laserBarrage'){
        const x=e.x+(e.tx-e.x)*q,y=e.y+(e.ty-e.y)*q;
        ctx.shadowColor='#53e5ff';ctx.shadowBlur=24;
        for(let k=-1;k<=1;k++){ctx.strokeStyle=`rgba(${k===0?100:200},${k===0?235:170},255,${.45+.5*fade})`;ctx.lineWidth=k===0?5:2;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(x+k*7,y-k*4);ctx.stroke();}
        ctx.fillStyle='#ecffff';ctx.beginPath();ctx.arc(x,y,7+Math.sin(t*25)*2,0,Math.PI*2);ctx.fill();
      }else if(e.kind==='plasmaNova'){
        const r=18+q*155;ctx.shadowColor='#ff57d5';ctx.shadowBlur=34;
        ctx.strokeStyle=`rgba(255,80,220,${fade})`;ctx.lineWidth=12*(1-q)+3;ctx.beginPath();ctx.arc(e.tx,e.ty,r,0,Math.PI*2);ctx.stroke();
        for(let k=0;k<10;k++){const a=k*Math.PI/5+t*3;ctx.strokeStyle=`rgba(125,100,255,${fade*.75})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(e.tx,e.ty);ctx.lineTo(e.tx+Math.cos(a)*r,e.ty+Math.sin(a)*r);ctx.stroke();}
      }else if(e.kind==='gravityRift'){
        ctx.shadowColor='#895cff';ctx.shadowBlur=25;
        for(let k=0;k<9;k++){const r=18+k*11+q*42;ctx.strokeStyle=`rgba(${120+k*8},85,255,${fade*(.85-k*.05)})`;ctx.lineWidth=2.6;ctx.beginPath();ctx.arc(e.tx,e.ty,r,t*4+k*.55,t*4+k*.55+4.8);ctx.stroke();}
        ctx.fillStyle=`rgba(8,0,30,${fade*.7})`;ctx.beginPath();ctx.arc(e.tx,e.ty,18+q*24,0,Math.PI*2);ctx.fill();
      }else if(e.kind==='supernova'){
        const r=30+q*310;ctx.shadowColor='#ffb84d';ctx.shadowBlur=55;
        const g=ctx.createRadialGradient(e.tx,e.ty,5,e.tx,e.ty,r);
        g.addColorStop(0,`rgba(255,255,245,${fade})`);g.addColorStop(.16,`rgba(255,225,100,${fade*.98})`);g.addColorStop(.48,`rgba(255,85,40,${fade*.55})`);g.addColorStop(1,'rgba(150,55,255,0)');
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(e.tx,e.ty,r,0,Math.PI*2);ctx.fill();
        for(let k=0;k<3;k++){ctx.strokeStyle=`rgba(255,230,160,${fade*(1-k*.22)})`;ctx.lineWidth=7-k*2;ctx.beginPath();ctx.arc(e.tx,e.ty,r*(.45+k*.2),0,Math.PI*2);ctx.stroke();}
      }
      ctx.restore();
    }
    rpg.spaceEffects=rpg.spaceEffects.filter(e=>e.life>0);
  }

  // Volcano fire projectiles and skill telegraphs.
  if(isVolcano && Array.isArray(rpg.volcanoEffects)){
    for(const e of rpg.volcanoEffects){e.life-=dt;const q=1-Math.max(0,e.life)/e.max;ctx.save();ctx.globalCompositeOperation='lighter';
      if(e.kind==='bolt'){const x=e.x+(e.tx-e.x)*q,y=e.y+(e.ty-e.y)*q;const g=ctx.createRadialGradient(x,y,2,x,y,22);g.addColorStop(0,'#fff6a5');g.addColorStop(.3,'#ff9a20');g.addColorStop(1,'rgba(255,55,10,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.fill();}
      else if(e.kind==='meteor'){const x=e.tx,y=e.ty-90*(1-q);ctx.fillStyle='#ff6a1b';ctx.shadowColor='#ff3d10';ctx.shadowBlur=28;ctx.beginPath();ctx.arc(x,y,12+q*8,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,208,90,.55)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(x,y);ctx.stroke();}
      else {const r=20+q*135;ctx.strokeStyle='rgba(255,75,15,'+(1-q)+')';ctx.shadowColor='#ff4010';ctx.shadowBlur=24;ctx.lineWidth=8*(1-q)+2;ctx.beginPath();ctx.arc(e.tx,e.ty,r,0,Math.PI*2);ctx.stroke();}
      ctx.restore();
    } rpg.volcanoEffects=rpg.volcanoEffects.filter(e=>e.life>0);
  }
  if(isDesert && Array.isArray(rpg.desertEffects)){
    for(const e of rpg.desertEffects){
      e.life-=dt;
      const q=1-Math.max(0,e.life)/e.max;
      const fade=Math.max(0,1-q);
      ctx.save();
      if(e.kind==='sandbolt'){
        const x=e.x+(e.tx-e.x)*q,y=e.y+(e.ty-e.y)*q;
        ctx.globalCompositeOperation='lighter';
        ctx.strokeStyle='rgba(255,226,120,'+fade+')';ctx.lineWidth=5;ctx.shadowColor='#e0a43d';ctx.shadowBlur=18;
        ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(x,y);ctx.stroke();
        const g=ctx.createRadialGradient(x,y,2,x,y,25);g.addColorStop(0,'rgba(255,250,190,'+fade+')');g.addColorStop(.35,'rgba(239,186,70,'+fade+')');g.addColorStop(1,'rgba(205,132,35,0)');
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,25,0,Math.PI*2);ctx.fill();
      } else if(e.kind==='sandstorm'){
        // A real spinning sand tornado: rotating bands widen upward from the monster's cast point.
        const cx=e.tx, cy=e.ty, rot=q*Math.PI*10;
        ctx.globalCompositeOperation='lighter';
        for(let i=0;i<7;i++){
          const yy=cy+34-i*12;
          const r=10+i*4+Math.sin(rot+i*1.7)*4;
          ctx.globalAlpha=fade*(.75-i*.06);
          ctx.strokeStyle=i%2?'#d99a3b':'#f5d67c';ctx.lineWidth=3+i*.55;ctx.shadowColor='#e5b34f';ctx.shadowBlur=12;
          ctx.beginPath();ctx.ellipse(cx+Math.sin(rot+i)*5,yy,r,3.5+i*.8,rot*.28+i*.3,0,Math.PI*2);ctx.stroke();
        }
        for(let i=0;i<10;i++){const a=rot+i*2.4,rr=12+(i%4)*9+q*25;ctx.fillStyle='rgba(255,220,125,'+(fade*.75)+')';ctx.beginPath();ctx.arc(cx+Math.cos(a)*rr,cy-12+Math.sin(a)*rr*.35,1.5+(i%3),0,Math.PI*2);ctx.fill();}
      } else if(e.kind==='sandquake'){
        // Earthquake: expanding shockwave plus visible branching cracks in the ground.
        ctx.globalCompositeOperation='source-over';
        const r=18+q*150;
        ctx.globalAlpha=fade;
        ctx.strokeStyle='#4b2b16';ctx.lineWidth=3+fade*3;ctx.shadowColor='#e4a43c';ctx.shadowBlur=10;
        for(let arm=0;arm<10;arm++){
          const a=arm*Math.PI*2/10+Math.sin(q*7+arm)*.18;
          const len=r*(.45+(arm%3)*.16), sx=e.tx+Math.cos(a)*8, sy=e.ty+Math.sin(a)*8;
          ctx.beginPath();ctx.moveTo(sx,sy);
          for(let k=1;k<=4;k++){const d=len*k/4,wiggle=Math.sin(k*2.7+arm)*7*(1-q);ctx.lineTo(e.tx+Math.cos(a)*d+Math.cos(a+Math.PI/2)*wiggle,e.ty+Math.sin(a)*d+Math.sin(a+Math.PI/2)*wiggle);}
          ctx.stroke();
        }
        ctx.strokeStyle='rgba(255,210,95,'+fade*.75+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.tx,e.ty,r,0,Math.PI*2);ctx.stroke();
      }
      ctx.restore();
    }
    rpg.desertEffects=rpg.desertEffects.filter(e=>e.life>0);
  }

  }

  // Floating damage numbers: normal attacks are white, character skills are gold.
  if(Array.isArray(rpg.damageFloats)){
    for(const f of rpg.damageFloats){
      const alpha=Math.max(0,1-f.life/f.maxLife);
      ctx.save();
      ctx.globalAlpha=alpha;
      ctx.translate(f.x,f.y);
      const pop=1+Math.sin(Math.min(1,f.life/.12)*Math.PI)*.10;
      ctx.scale(pop,pop);
      ctx.textAlign="center";
      ctx.font=`900 ${f.kind==="skill"?18:16}px sans-serif`;
      ctx.lineWidth=5;
      ctx.strokeStyle="rgba(8,7,7,.9)";
      ctx.strokeText(`-${f.damage}`,0,0);
      ctx.fillStyle=f.kind==="skill"?"#ffe082":"#ffffff";
      ctx.fillText(`-${f.damage}`,0,0);
      ctx.restore();
    }
  }

  // V75 — Character model. The weapon is no longer rendered/held.
  // Weapons remain equipment accessories that add stats and can break, but the character owns the skills.
  const depthScale = 0.92 + Math.max(0, Math.min(1, p.y / h)) * 0.12;
  const walk = p.moving ? Math.sin(p.walkTime) : 0;
  const walk2 = p.moving ? Math.sin(p.walkTime + Math.PI) : 0;
  const bodyBob = p.moving ? Math.abs(Math.sin(p.walkTime)) * 1.2 : 0;
  const facingAngle=Number.isFinite(p.facingAngle)?p.facingAngle:Math.PI;
  const frontVisible=Math.cos(facingAngle)<-0.08;

  ctx.save();
  ctx.translate(p.x, p.y + bodyBob);
  ctx.scale(depthScale, depthScale);

  ctx.fillStyle='rgba(0,0,0,.52)';
  ctx.beginPath(); ctx.ellipse(0,24,25,9,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(0,0,0,.25)';
  ctx.beginPath(); ctx.ellipse(0,19,16,4,0,0,Math.PI*2); ctx.fill();

  // Cloak and legs — a clean character silhouette with no held weapon.
  const legA=walk*5, legB=walk2*5;
  ctx.lineCap='round';
  ctx.strokeStyle='#222b38'; ctx.lineWidth=8;
  ctx.beginPath(); ctx.moveTo(-7,6); ctx.lineTo(-8+legA,22); ctx.moveTo(7,6); ctx.lineTo(8+legB,22); ctx.stroke();
  ctx.strokeStyle='#7c5536'; ctx.lineWidth=9;
  ctx.beginPath(); ctx.moveTo(-8+legA,22); ctx.lineTo(-14+legA,22); ctx.moveTo(8+legB,22); ctx.lineTo(14+legB,22); ctx.stroke();

  const gender=state.gender==="female"?"female":"male";
  const power=getActivePowerDef(), pm=POWER_TIER_META[power.rarity]||POWER_TIER_META.C;
  const cloak=ctx.createLinearGradient(0,-12,0,18);
  cloak.addColorStop(0,gender==="female"?"#6d3d72":pm.color); cloak.addColorStop(.55,gender==="female"?"#38233d":"#183b35"); cloak.addColorStop(1,"#101a18");
  ctx.fillStyle=cloak;
  ctx.beginPath(); ctx.moveTo(-17,-9); ctx.quadraticCurveTo(-23,5,-17,18); ctx.lineTo(0,24); ctx.lineTo(17,18); ctx.quadraticCurveTo(23,5,17,-9); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=pm.color; ctx.lineWidth=2; ctx.stroke();

  // Chest emblem: the character's identity replaces the weapon silhouette.
  ctx.fillStyle='#d9f7e6'; ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#6ee8ae'; ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.22)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(0,-8); ctx.lineTo(0,8); ctx.stroke();

  ctx.strokeStyle=gender==='female'?'#8f5c98':pm.color; ctx.lineWidth=7;
  ctx.beginPath(); ctx.moveTo(-14,-4); ctx.lineTo(-18,8+walk*.8); ctx.moveTo(14,-4); ctx.lineTo(18,8+walk2*.8); ctx.stroke();
  ctx.fillStyle='#e8b992';
  ctx.beginPath(); ctx.arc(-18,9+walk*.8,4,0,Math.PI*2); ctx.arc(18,9+walk2*.8,4,0,Math.PI*2); ctx.fill();

  // V86 avatar model: tall male/female silhouette, no held weapon.
  ctx.fillStyle='#e9b796'; ctx.beginPath(); ctx.arc(0,-22,12,0,Math.PI*2); ctx.fill();
  const hairColor=gender==='female'?'#281a2c':'#1b1c25';
  ctx.fillStyle=hairColor;
  if(gender==='male'){
    ctx.beginPath();ctx.arc(0,-27,14,Math.PI,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.moveTo(-13,-27);ctx.lineTo(-8,-38);ctx.lineTo(-2,-29);ctx.lineTo(4,-39);ctx.lineTo(10,-28);ctx.lineTo(14,-18);ctx.lineTo(-14,-18);ctx.closePath();ctx.fill();
  }else{
    ctx.beginPath();ctx.arc(0,-27,15,Math.PI,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.moveTo(-14,-27);ctx.quadraticCurveTo(-18,-12,-10,-9);ctx.moveTo(14,-27);ctx.quadraticCurveTo(18,-12,10,-9);ctx.stroke();
    ctx.lineWidth=7;ctx.stroke();
  }
  if(frontVisible){
    ctx.fillStyle='#202020';ctx.beginPath();ctx.arc(-4,-22,1.4,0,Math.PI*2);ctx.arc(4,-22,1.4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=pm.color;ctx.beginPath();ctx.arc(0,-18,2,0,Math.PI*2);ctx.fill();
  }else{
    ctx.fillStyle='#10131a';ctx.beginPath();ctx.ellipse(0,-25,10,9,0,0,Math.PI*2);ctx.fill();
  }

  if(p.hurtAnim>0){
    ctx.globalAlpha=p.hurtAnim/.28*.45; ctx.fillStyle='#ff5d5d';
    ctx.beginPath(); ctx.arc(0,-5,39,0,Math.PI*2); ctx.fill();
  }

  ctx.fillStyle='rgba(0,0,0,.72)'; ctx.roundRect(-62,-63,124,20,8); ctx.fill();
  ctx.fillStyle='#fff'; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
  const powerLabel=getPowerMeta().label;
  ctx.fillText(`${state.username||'ผู้เล่น'} · ${powerLabel} · Lv.${p.level}`,0,-49);
  ctx.restore();

  // Slash effects.
  for(const e of rpg.hitEffects){
    const a=e.angle, alpha=e.life/e.maxLife;
    ctx.save(); ctx.translate(e.x,e.y); ctx.rotate(a);
    ctx.globalAlpha=alpha;
    ctx.strokeStyle="#fff3bb"; ctx.lineWidth=11; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(0,0,57,-1.05,.62); ctx.stroke();
    ctx.strokeStyle="#8fe2ff"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(0,0,57,-1.05,.62); ctx.stroke();
    ctx.restore();
  }

  // Skill ring / aura — each skill has its own visual language.
  if(p.skillAnim>0){
    const q=p.skillAnim/.8, si=p.selectedSkill;
    const powerPalettes={lightning:['#8ff3ff','#5b8cff'],fire:['#ff5a24','#ffd36a'],storm:['#d8f7ff','#75dfff'],ice:['#bff8ff','#ffffff'],poison:['#8cff72','#d6ff6b'],nature:['#6cff8e','#d7ffd2'],void:['#9b6cff','#e8d9ff'],celestial:['#fff0a8','#c9d9ff']}; const palettes=[powerPalettes[power.type]||['#8ff3ff','#b88cff'],['#ff5a24','#ffd36a'],['#8fe8ff','#ffffff'],['#9b6cff','#3b1d62'],['#ffd36a','#ff6a2a']];
    const pal=palettes[si]||palettes[0];
    ctx.save(); ctx.globalAlpha=q*.95; ctx.globalCompositeOperation='lighter';
    // expanding aura
    const grad=ctx.createRadialGradient(p.x,p.y,8,p.x,p.y,145+(1-q)*90);
    grad.addColorStop(0,pal[0]+'55'); grad.addColorStop(.45,pal[1]+'22'); grad.addColorStop(1,'transparent');
    ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(p.x,p.y,145+(1-q)*90,0,Math.PI*2); ctx.fill();
    for(let i=0;i<10;i++){
      const a=t*(2.2+(si*.25))+i*Math.PI/5;
      const r=58+(1-q)*105;
      ctx.strokeStyle=i%2?pal[0]:pal[1]; ctx.lineWidth=si===1?7:4;
      ctx.beginPath(); ctx.arc(p.x,p.y,r,a,a+.25+(si===2?.18:0)); ctx.stroke();
    }
    if(si===2){ // ice crystals / snow halo
      for(let i=0;i<10;i++){ const a=i*Math.PI/5+t; const r=48+(1-q)*80; const x=p.x+Math.cos(a)*r, y=p.y+Math.sin(a)*r; ctx.strokeStyle=i%2?'#fff':'#7ddfff'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-6,y); ctx.lineTo(x+6,y); ctx.moveTo(x,y-6); ctx.lineTo(x,y+6); ctx.stroke(); }
    }
    if(si===1){ // fire tongues
      for(let i=0;i<7;i++){ const a=-Math.PI/2+(i-3)*.24; const x=p.x+Math.cos(a)*35, y=p.y+Math.sin(a)*35; ctx.strokeStyle=i%2?'#ff6b21':'#ffd36a'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x,y+10); ctx.quadraticCurveTo(x+Math.sin(t*8+i)*8,y-10,x+Math.cos(a)*18,y-25); ctx.stroke(); }
    }
    if(si===4){ // meteor targeting ring
      ctx.strokeStyle='#ffd36a'; ctx.lineWidth=3; ctx.setLineDash([8,8]); ctx.beginPath(); ctx.arc(p.x,p.y,80+(1-q)*50,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
  }

  // Particles.
  for(const pt of rpg.particles){
    ctx.save(); ctx.globalAlpha=Math.max(0,pt.life/pt.maxLife);
    ctx.fillStyle=pt.color; ctx.shadowColor=pt.color; ctx.shadowBlur=10;
    ctx.beginPath(); ctx.arc(pt.x,pt.y,pt.size,0,Math.PI*2); ctx.fill(); ctx.restore();
  }

  // Dungeon UI is intentionally minimal: HP/MP/level are shown by the DOM HUD above,
  // and skills are shown as the circular skill wheel below. Do not draw currency, kills,
  // monster-pack counters, combat log, or item hotbars over the playfield.
}

function syncCharacterStatsFromProgress(){
  const oldMaxHp=Math.max(1,Number(rpg.player.maxHp||160));
  const oldMaxMana=Math.max(1,Number(rpg.player.maxMana||100));
  const newMaxHp=getEffectiveCharacterMaxHp();
  const newMaxMana=getEffectiveCharacterMaxMana();
  const wasHpFull=Number(rpg.player.hp||0)>=oldMaxHp;
  const wasManaFull=Number(rpg.player.mana||0)>=oldMaxMana;
  rpg.player.maxHp=newMaxHp;
  rpg.player.maxMana=newMaxMana;
  rpg.player.hp=wasHpFull ? newMaxHp : Math.min(newMaxHp, Math.max(0, Number(rpg.player.hp||0)));
  rpg.player.mana=wasManaFull ? newMaxMana : Math.min(newMaxMana, Math.max(0, Number(rpg.player.mana||0)));
  if(oldMaxHp!==newMaxHp && rpg.player.hp<=0) rpg.player.hp=newMaxHp;
  if(oldMaxMana!==newMaxMana && rpg.player.mana<=0) rpg.player.mana=newMaxMana;
}

function syncRpgHud() {
  syncCharacterStatsFromProgress();
  const p=rpg.player;
  document.getElementById("rpgPlayerName").textContent=state.username||"ผู้เล่น";
  document.getElementById("rpgLevel").textContent=getRegenRank()>0?`REGEN ${getRegenRank()}`:p.level;
  document.getElementById("rpgHpBar").style.width=(p.hp/p.maxHp*100)+"%";
  document.getElementById("rpgHpText").textContent=`${Math.ceil(p.hp)} / ${getEffectiveMaxHp()} HP`;
  const manaBar=document.getElementById("rpgManaBar");
  const manaText=document.getElementById("rpgManaText");
  if(manaBar) manaBar.style.width=(p.mana/p.maxMana*100)+"%";
  if(manaText) manaText.textContent=`${Math.floor(p.mana)} / ${p.maxMana} MP`;
  const defText=document.getElementById("rpgDefenseText");
  if(defText) defText.textContent=getEffectiveDefense().toLocaleString();
  const combatLog=document.getElementById("rpgCombatLog");
  if(combatLog) combatLog.textContent=rpg.combatLog;
  document.getElementById("rpgXpBar").style.width=(p.xp/p.nextXp*100)+"%";
  document.getElementById("rpgXpText").textContent=`${p.xp} / ${p.nextXp} XP`;
  document.getElementById("rpgPackCount").textContent=rpg.packs.filter(p=>p.mobs.some(m=>m.alive)).length;
  document.getElementById("rpgKills").textContent=rpg.kills;
  document.getElementById("rpgCoins").textContent=state.coins;
  document.getElementById("rpgDiamonds").textContent=state.diamonds;
  const zoneLabel=document.getElementById("rpgZoneLabel");
  if(zoneLabel) zoneLabel.textContent=rpg.inDungeon?"🌲 ป่าดงดิบ — เขตต่อสู้":"🌱 ฟาร์ม";
  const wt=getWeaponTier(state.rpgEquipment.weapon);
  document.getElementById("weaponRank").innerHTML=rpg.weapon.broken?"💥 แตก":weaponStarHtml(getWeaponStars(rpg.weapon),wt);
  document.getElementById("weaponTier").textContent=`อุปกรณ์เสริม · ${weaponTierMeta(wt).label}`;
  document.getElementById("weaponDamage").textContent=getEffectiveWeaponDamage();
  document.getElementById("weaponDurability").textContent=rpg.weapon.durability+"%";
  renderRpgJunk();
  const enhance=document.getElementById("enhanceWeaponButton");
  if(enhance){
    enhance.disabled=rpg.weapon.broken || rpg.inDungeon || Number(state.rpgInventory.enhancementScroll||0)<enhancementScrollNeed(getWeaponStars(rpg.weapon),getWeaponTier(state.rpgEquipment.weapon));
    enhance.textContent=rpg.inDungeon?"🔒 กลับหน้าดันเจี้ยนเพื่อใช้ช่างตีบวก":(rpg.weapon.broken?"🛠️ อาวุธแตก — รอระบบซ่อม":"⚒️ ตีบวก");
  }
  const needEl=document.getElementById("rpgEnhanceScrollNeed");
  const countEl=document.getElementById("rpgEnhanceScrollCount");
  if(needEl) needEl.textContent=enhancementScrollNeed(getWeaponStars(rpg.weapon),getWeaponTier(state.rpgEquipment.weapon)).toLocaleString();
  if(countEl) countEl.textContent=Number(state.rpgInventory.enhancementScroll||0).toLocaleString();
  const sell=document.getElementById("sellRpgJunkButton");
  if(sell){sell.disabled=rpg.inDungeon;sell.textContent=rpg.inDungeon?"🔒 กลับหน้าดันเจี้ยนเพื่อขาย":"💰 ขายขยะทั้งหมด";}
  const selected=skillDefs[p.selectedSkill]||skillDefs[0];
  const mainBtn=document.getElementById("rpgSkillButton");
  if(mainBtn){ const cd=p.skillCds[p.selectedSkill]||0; mainBtn.textContent=`${selected.key} ${selected.name}${cd>0?` ${cd.toFixed(1)}s`:""}`; }
  if(!isSkillUnlocked(p.selectedSkill)) p.selectedSkill=skillDefs.findIndex((_,i)=>isSkillUnlocked(i));
  document.querySelectorAll(".skill-wheel-btn").forEach((btn,i)=>{
    btn.classList.toggle("selected",i===p.selectedSkill);
    const unlocked=isSkillUnlocked(i);
    btn.classList.toggle("locked",!unlocked);
    btn.dataset.lockText=unlocked?"":`Lv.${SKILL_UNLOCK_LEVELS[i]}`;
    const skill=skillDefs[i];
    const cd=p.skillCds[i]||0;
    let ov=btn.querySelector('.cooldown');
    if(cd>0){ if(!ov){ov=document.createElement('span');ov.className='cooldown';btn.appendChild(ov);} ov.textContent=cd.toFixed(1)+'s'; }
    else if(ov) ov.remove();
  });
  const badge=document.getElementById("skillCooldownBadge");
  if(badge){ const cd=p.skillCds[p.selectedSkill]||0; badge.textContent=cd>0?`${cd.toFixed(1)}s`:`พร้อม · ${selected.name}`; }
}

function enhanceWeapon(){
 if(rpg.inDungeon){rpg.combatLog="🔨 ต้องกลับไปหาช่างตีบวกหน้าดันเจี้ยน";const m=document.getElementById("enhanceMessage");if(m)m.textContent=rpg.combatLog;return}
 const d=getEnhanceItemDisplay(),item=d.item;if(!item||item.broken||d.stars>=8)return;
 const cur=d.stars,tier=d.tier,need=enhancementScrollNeed(cur,tier),mode=getEnhanceMode();
 if(Number(state.rpgInventory.enhancementScroll||0)<need){document.getElementById("enhanceMessage").textContent=`❌ ใบบวกไม่พอ ต้องใช้ ${need.toLocaleString()} ใบ`;syncCharacterEnhance();return}
 if(mode==="orb"&&Number(state.rpgInventory.magicOrb||0)<1){document.getElementById("enhanceMessage").textContent="❌ ลูกแก้วเวทมนตร์ไม่พอ";syncCharacterEnhance();return}
 state.rpgInventory.enhancementScroll-=need;if(mode==="orb")state.rpgInventory.magicOrb--;
 if(Math.random()<enhancementChance(cur)){
   item.stars=cur+1;item.level=item.stars;item.durability=100;item.broken=false;
   if(rpg.enhanceSlot==="weapon"){rpg.weapon.stars=item.stars;rpg.weapon.level=item.stars;rpg.weapon.durability=100;rpg.weapon.broken=false}
   document.getElementById("enhanceMessage").innerHTML=`⭐ สำเร็จ! ${item.name} → ${weaponStarHtml(item.stars,tier)}`;sfx("success");
 }else{
   const loss=Math.min(100,10+cur*7);
   if(mode!=="orb"){item.durability=Math.max(0,item.durability-loss);item.broken=item.durability<=0;if(rpg.enhanceSlot==="weapon"){rpg.weapon.durability=item.durability;rpg.weapon.broken=item.broken}}
   document.getElementById("enhanceMessage").innerHTML=`❌ ล้มเหลว! ยังอยู่ที่ ${weaponStarHtml(cur,tier)} · ความทนทาน -${mode==="orb"?0:loss}%`;sfx("error");
 }
 syncWeaponState();syncEquipmentFromWeapon();saveState();syncRpgHud();renderRpgInventory();renderEnhanceEquipmentPicker();syncCharacterEnhance();
}
document.getElementById("enhanceWeaponButton")?.addEventListener("click",enhanceWeapon);
document.getElementById("rpgRepairWeaponButton")?.addEventListener("click",()=>openRpgModal("rpgBlacksmithModal"));
document.getElementById("rpgAttackButton")?.addEventListener("click",rpgAttack);
document.getElementById("rpgSkillButton")?.addEventListener("click",rpgSkill);

function handleDungeonKeyboardDown(e){
  if(!rpg.running || rpg.platform!=="pc" || rpg.deathPending) return;
  if(e.target?.closest?.("input,textarea,select")) return;
  const key=(e.key||"").toLowerCase();
  const code=(e.code||"").toLowerCase();
  const k = ["keyw","keya","keys","keyd"].includes(code) ? code.slice(3) : key;
  if(["w","a","s","d"].includes(k)){
    e.preventDefault();
    e.stopPropagation();
    rpg.keys[k]=true;
    rpg.player.moving=true;
    return;
  }
  if(["q"," ","1","2","3","4","5"].includes(k)) e.preventDefault();
  if(k===" "){ rpgAttack(); return; }
  if(k==="q"){ rpg.player.selectedSkill=0; rpgSkill(); return; }
  if(["1","2","3","4","5"].includes(k)){ rpg.player.selectedSkill=Number(k)-1; rpgSkill(); }
}
function handleDungeonKeyboardUp(e){
  const key=(e.key||"").toLowerCase();
  const code=(e.code||"").toLowerCase();
  const k=["keyw","keya","keys","keyd"].includes(code) ? code.slice(3) : key;
  if(["w","a","s","d"].includes(k)) rpg.keys[k]=false;
  if(!Object.values(rpg.keys).some(Boolean)) rpg.player.moving=false;
}
window.addEventListener("keydown",handleDungeonKeyboardDown,{capture:true,passive:false});
window.addEventListener("keyup",handleDungeonKeyboardUp,{capture:true,passive:false});
// Redundant document-level fallback for local-file/browser focus quirks.
document.addEventListener("keydown",handleDungeonKeyboardDown,{capture:false,passive:false});
document.addEventListener("keyup",handleDungeonKeyboardUp,{capture:false,passive:false});
window.addEventListener("blur",()=>{rpg.keys.w=rpg.keys.a=rpg.keys.s=rpg.keys.d=false;rpg.player.moving=false;});
document.addEventListener("visibilitychange",()=>{if(document.hidden){rpg.keys.w=rpg.keys.a=rpg.keys.s=rpg.keys.d=false;rpg.player.moving=false;}});

document.querySelectorAll("[data-rpg-key]").forEach(btn=>{
  const k=btn.dataset.rpgKey;
  const down=()=>{rpg.keys[k]=true};
  const up=()=>{rpg.keys[k]=false};
  btn.addEventListener("pointerdown",down);
  btn.addEventListener("pointerup",up);
  btn.addEventListener("pointerleave",up);
  btn.addEventListener("pointercancel",up);
});

document.querySelectorAll("[data-pc-key]").forEach(btn=>{
  const k=btn.dataset.pcKey;
  const down=e=>{e.preventDefault();if(rpg.platform!=="pc"||rpg.deathPending)return;rpg.keys[k]=true;rpg.player.moving=true;btn.classList.add("pressed")};
  const up=e=>{e.preventDefault();rpg.keys[k]=false;if(!Object.values(rpg.keys).some(Boolean))rpg.player.moving=false;btn.classList.remove("pressed")};
  btn.addEventListener("pointerdown",down,{passive:false});btn.addEventListener("pointerup",up,{passive:false});btn.addEventListener("pointercancel",up,{passive:false});btn.addEventListener("pointerleave",up,{passive:false});
});
initDungeonPlatformUI();
setupDungeonJoystick();
bindDungeonQuickbar();
document.getElementById("dungeonBagToggle")?.addEventListener("click",()=>toggleDungeonBag());
document.getElementById("dungeonBagClose")?.addEventListener("click",()=>toggleDungeonBag(false));
let dungeonExitConfirmAction=null;

function openDungeonExitConfirmation(action){
  dungeonExitConfirmAction=typeof action==="function" ? action : closeRpg;
  document.getElementById("dungeonExitConfirmModal")?.classList.remove("hidden");
}

function closeDungeonExitConfirmation(){
  document.getElementById("dungeonExitConfirmModal")?.classList.add("hidden");
  dungeonExitConfirmAction=null;
}

function confirmDungeonExit(){
  const action=dungeonExitConfirmAction;
  closeDungeonExitConfirmation();
  (action||closeRpg)();
}

document.getElementById("dungeonExitButton")?.addEventListener("click",()=>openDungeonExitConfirmation(closeRpg));
document.getElementById("dungeonExitCancelButton")?.addEventListener("click",closeDungeonExitConfirmation);
document.getElementById("dungeonExitConfirmButton")?.addEventListener("click",confirmDungeonExit);
document.querySelectorAll("[data-skill-slot]").forEach(btn=>btn.addEventListener("click",()=>{const i=Number(btn.dataset.skillSlot); if(isSkillUnlocked(i)){rpg.player.selectedSkill=i; rpgSkill();} else selectSkill(i);}));
document.querySelectorAll(".skill-card").forEach((el,i)=>{ if(i<skillDefs.length) el.addEventListener("click",()=>selectSkill(i)); });

function handleRpgCanvasHotbarClick(e){
  if(rpg.deathPending)return false;
  const rect=rpgCanvas.getBoundingClientRect(),x=(e.clientX-rect.left)*(rpgCanvas.width/rect.width),y=(e.clientY-rect.top)*(rpgCanvas.height/rect.height);
  const h=rpgCanvas.height,w=rpgCanvas.width,sw=54,gap=8,total=6*sw+5*gap,start=(w-total)/2;
  if(y<h-70||y>h-2)return false;
  const idx=Math.floor((x-start)/(sw+gap));
  if(idx<0||idx>5)return false;
  const inside=x-(start+idx*(sw+gap));if(inside<0||inside>sw)return false;
  if(idx===0)useHpPotion();else if(idx===1)useManaPotion();else return true;
  return true;
}

rpgCanvas?.addEventListener("pointerdown",(e)=>{
  if(rpg.deathPending) return;
  // Canvas click remains a convenient PC fallback, but never fires when the player is using a UI overlay.
  if(handleRpgCanvasHotbarClick(e)) return;
  if(e.button!==undefined && e.button!==0) return;
  rpgAttack();
});



function deathInputGuard(e){
  if(!rpg.deathPending) return;
  const allowed = e.target.closest?.(
    "#deathRespawnButton, #deathFreeRespawnButton, #deathOpenShopButton, #buyRevivalPotion, #backToDeathButton, #buyMoonScroll, #buySoulHammer"
  );
  const inShop = !!e.target.closest?.("#rpgShopModal");
  // Allow the death-screen action buttons and the shop UI.
  // Everything else is blocked so the dead player can never move, attack or cast.
  if(!allowed && !inShop){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}
document.addEventListener("pointerdown",deathInputGuard,true);
document.addEventListener("pointerup",deathInputGuard,true);
document.addEventListener("touchstart",deathInputGuard,{capture:true,passive:false});
document.addEventListener("click",deathInputGuard,true);
document.addEventListener("keydown",(e)=>{
  if(rpg.deathPending){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
},{capture:true});

document.getElementById("openInventoryButton")?.addEventListener("click",()=>openRpgModal("rpgInventoryModal"));
document.getElementById("openBagButton")?.addEventListener("click",()=>openRpgModal("rpgBagModal"));
document.getElementById("openBlacksmithButton")?.addEventListener("click",()=>openRpgModal("rpgBlacksmithModal"));
  document.getElementById("openBagButton")?.addEventListener("click",()=>openRpgModal("rpgBagModal"));
  document.getElementById("openBlacksmithButton")?.addEventListener("click",()=>openRpgModal("rpgBlacksmithModal"));
document.getElementById("openShopButton")?.addEventListener("click",()=>{
  if(rpg.inDungeon){rpg.combatLog="🛒 ร้านค้าอยู่หน้าดันเจี้ยน — เดินออกทางประตูก่อน";return;}
  openRpgModal("rpgShopModal");
});
document.getElementById("characterShopButton")?.addEventListener("click",()=>{
  // ร้านค้าจากหน้าตัวละครใช้ร้านเดียวกับหน้า RPG เพื่อให้ราคา/คลัง/สกุลเงินไม่แยกกัน
  syncCurrencyDisplays();
  openRpgModal("rpgShopModal");
});
document.getElementById("characterGachaButton")?.addEventListener("click",openCharacterGacha);
document.getElementById("itemGacha5")?.addEventListener("click",()=>performItemGacha(5));
document.getElementById("heroGacha1")?.addEventListener("click",()=>performHeroGacha(1));
document.getElementById("heroGacha8")?.addEventListener("click",()=>performHeroGacha(8));
document.getElementById("equipmentGacha1")?.addEventListener("click",()=>performEquipmentGacha(1));
document.getElementById("equipmentGacha10")?.addEventListener("click",()=>performEquipmentGacha(10));
document.getElementById("equipmentBestSetButton")?.addEventListener("click",equipBestEquipmentSet);
document.getElementById("openHeroRosterButton")?.addEventListener("click",()=>{renderHeroRoster();openRpgModal("characterRosterModal")});
document.getElementById("openPowerRosterButton")?.addEventListener("click",()=>{renderHeroRoster();openRpgModal("characterRosterModal")});
document.getElementById("gachaNormal1")?.addEventListener("click",()=>performGacha("NORMAL",1));
document.getElementById("gachaNormal10")?.addEventListener("click",()=>performGacha("NORMAL",10));
document.getElementById("gachaOrange1")?.addEventListener("click",()=>performGacha("ORANGE",1));
document.getElementById("gachaOrange10")?.addEventListener("click",()=>performGacha("ORANGE",10));
document.getElementById("gachaRed1")?.addEventListener("click",()=>performGacha("RED",1));
document.getElementById("gachaRed10")?.addEventListener("click",()=>performGacha("RED",10));
document.getElementById("gachaSkipButton")?.addEventListener("click",(e)=>{e.stopPropagation();skipGachaAnimation()});
document.getElementById("gachaRevealBox")?.addEventListener("click",(e)=>{e.stopPropagation();advanceGachaByTap()});
document.getElementById("buyRevivalPotion")?.addEventListener("click",buyRevivalPotion);
document.getElementById("buyMoonScroll")?.addEventListener("click",buyMoonScroll);
document.getElementById("buySoulHammer")?.addEventListener("click",buySoulHammer);
document.getElementById("buyHpPotion")?.addEventListener("click",buyHpPotion);
document.getElementById("buyManaPotion")?.addEventListener("click",buyManaPotion);
document.getElementById("buyEnhancementScroll")?.addEventListener("click",buyEnhancementScroll);
document.getElementById("buyMagicOrb")?.addEventListener("click",buyMagicOrb);
document.getElementById("buyRegenScroll")?.addEventListener("click",buyRegenScroll);
syncUnifiedShopIcons();
document.getElementById("deathRespawnButton")?.addEventListener("click",()=>respawnWithPotion());
document.getElementById("deathFreeRespawnButton")?.addEventListener("click",()=>respawnWithoutPotion());
document.getElementById("deathExitDungeonButton")?.addEventListener("click",()=>openDungeonExitConfirmation(exitDungeonWhileDead));
document.getElementById("deathOpenShopButton")?.addEventListener("click",()=>{
  // Death state remains active underneath the shop. Closing/back only reveals YOU DIED.
  openRpgModal("rpgShopModal");
});
document.getElementById("backToDeathButton")?.addEventListener("click",()=>{
  // ปุ่มกลับใช้ได้ทั้งตอนเปิดร้านจากหน้าตัวละครและตอนเปิดร้านจากหน้าตาย
  document.getElementById("rpgShopModal")?.classList.add("hidden");
  if(rpg.deathPending){
    document.getElementById("rpgDeathModal")?.classList.remove("hidden");
  }
});
document.querySelectorAll("[data-close-rpg-modal]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const id=btn.dataset.closeRpgModal;
    if(rpg.deathPending && id==="rpgShopModal"){
      document.getElementById("rpgShopModal")?.classList.add("hidden");
      document.getElementById("rpgDeathModal")?.classList.remove("hidden");
      return;
    }
    closeRpgModal(id);
  });
});
const v84CloseButton=(e)=>{const btn=e.target?.closest?.("[data-close-rpg-modal]");if(!btn)return;const id=btn.dataset.closeRpgModal;if(rpg.deathPending&&id==="rpgShopModal")return;closeRpgModal(id);};
document.addEventListener("click",v84CloseButton,false);

document.querySelectorAll(".rpg-modal").forEach(modal=>{
  modal.addEventListener("click",(e)=>{
    // Inventory/shop can close by touching outside.
    // Death screen must stay locked until the player explicitly chooses respawn/shop.
    if(e.target===modal && modal.id!=="rpgDeathModal") modal.classList.add("hidden");
  });
  modal.addEventListener("pointerdown",(e)=>{
    if(modal.id==="rpgDeathModal" && e.target===modal) e.preventDefault();
  },{passive:false});
});

function rpgLoop(now) {
  if(!rpg.running) return;
  const dt=Math.min(.05,(now-rpg.lastTime)/1000);
  rpg.lastTime=now;
  updateRpg(dt);
  drawRpg();
  syncRpgHud();
  requestAnimationFrame(rpgLoop);
}

setInterval(() => {
  if (!gameScreen.classList.contains("hidden")) render();
}, 1000);

if (state.username) {
  showGame();
}



document.getElementById("sellRpgJunkButton")?.addEventListener("click", sellAllRpgJunk);

/* Start ambient music after the first real interaction when returning to the farm. */
document.addEventListener('pointerdown',()=>{
  if(audioState.enabled && !audioState.musicTimer){ startMusic(rpg.running?'rpg':'farm'); }
},{once:false});


/* =========================
   V88 SAFE PATCH — requested changes only
   - keep existing working systems untouched
   - central item registry for shop/gacha/inventory
   - Magic Powder: gacha-only
   - Abyss Poison fully designed
   - power level 1..10 controls skill unlocks
   - dungeon skill icons/text follow equipped power
   ========================= */

const ITEM_DATABASE = Object.freeze({
  revivalPotion:{id:"revivalPotion",name:"น้ำทิพย์คืนชีพ",icon:"🧪",description:"ใช้ตอนตายเพื่อคืนชีพโดยไม่เสียความทนทาน",currency:"diamond",price:25,shop:true,gacha:true},
  moonScroll:{id:"moonScroll",name:"สเก็ตแห่งดวงจันทร์",icon:"🌙",description:"วัตถุดิบซ่อมอุปกรณ์",currency:"coin",price:300000,shop:true,gacha:true},
  soulHammer:{id:"soulHammer",name:"ค้อนคืนวิญญาณ",icon:"🔨",description:"ใช้คู่กับสเก็ตเมื่ออุปกรณ์ Lv.7+",currency:"diamond",price:35,shop:true,gacha:true},
  hpPotion:{id:"hpPotion",name:"ยาฟื้นพลัง",icon:"❤️",description:"เติม HP เต็ม",currency:"coin",price:1000,shop:true,gacha:true},
  manaPotion:{id:"manaPotion",name:"ยาฟื้นมานา",icon:"💧",description:"เติม MP เต็ม",currency:"coin",price:1000,shop:true,gacha:true},
  enhancementScroll:{id:"enhancementScroll",name:"ใบบวก",icon:"📜",description:"วัสดุหลักสำหรับตีบวกอุปกรณ์",currency:"coin",price:10000,shop:true,gacha:true},
  magicOrb:{id:"magicOrb",name:"ลูกแก้วเวทมนตร์",icon:"🔮",description:"ช่วยป้องกันความทนทานลดเมื่อตีบวกล้มเหลว",currency:"diamond",price:150,shop:true,gacha:true},
  regenScroll:{id:"regenScroll",name:"ใบบวก REGEN",icon:"📜",description:"ใช้ร่วมกับใบบวกในการตีบวกอุปกรณ์ และรับประกันความสำเร็จ 1 ระดับ",currency:null,price:0,shop:false,gacha:true,gachaWeight:0.5},
  universePowder:{id:"universePowder",name:"ผงเฮงจักรวาล",icon:"🌌",description:"วัสดุหายากจากกล่องไอเท็ม",currency:null,price:0,shop:false,gacha:true,gachaWeight:0.5},
  magicPowder:{id:"magicPowder",name:"ผงวิเศษ",icon:"✨",description:"ใช้ตีบวกพลังเพื่อเพิ่ม Power Lv. และปลดล็อกสกิล",currency:null,price:0,shop:false,gacha:true},
  powerBreakthrough:{id:"powerBreakthrough",name:"ตราทะลวงระดับ",icon:"△",description:"ใช้คู่กับผงวิเศษในการเพิ่มระดับพลัง และรับประกันสำเร็จ 1 ระดับ",currency:null,price:0,shop:false,gacha:true,gachaWeight:0.5},
  passTicket:{id:"passTicket",name:"ใบผ่านทาง",icon:"🎫",description:"ใช้เข้าสู่โหมดดันเจี้ยน · ได้รับอัตโนมัติทุก 30 นาที สูงสุดเก็บได้ 120 ใบ",currency:"diamond",price:10,shop:true,gacha:false},
  challengeCoin:{id:"challengeCoin",name:"เหรียญท้าประลอง",icon:"🪙",description:"ใช้ค้นหาคู่ต่อสู้ PvP · ได้รับอัตโนมัติทุก 60 นาที สูงสุดเก็บได้ 100 เหรียญ · ใช้ 2 เหรียญต่อการค้นหา",currency:"diamond",price:5,shop:true,gacha:false}
});
ITEM_VISUALS.magicPowder = `<span class="unified-item-icon emoji-item">✨</span>`;
state.rpgInventory = state.rpgInventory || {};
Object.keys(ITEM_DATABASE).forEach(id=>state.rpgInventory[id]=Number(state.rpgInventory[id]||0));
state.rpgInventory.passTicket = Math.max(0, Math.min(PASS_TICKET_MAX, Number(state.rpgInventory.passTicket||0)));
state.passTicketLastTick = Number(state.passTicketLastTick || Date.now());

function getItemDef(id){ return ITEM_DATABASE[id] || null; }
function itemGachaPool(){
  return Object.values(ITEM_DATABASE)
    .filter(item=>item.gacha)
    .map(item=>({kind:"item",id:item.id,name:item.name,icon:item.icon,note:item.description}));
}
function createItemGachaReward(){
  const pool=itemGachaPool(),p=pool[Math.floor(Math.random()*pool.length)];
  return {type:"gacha-item",itemType:"item",itemId:p.id,name:p.name,icon:p.icon,note:p.note,qty:1};
}
function grantItemGachaReward(item){
  if(item.type==="gacha-item"){
    const def=getItemDef(item.itemId);
    if(!def) return;
    state.rpgInventory[item.itemId]=Number(state.rpgInventory[item.itemId]||0)+Number(item.qty||1);
  } else ensureGachaCollection().push(item);
}

/* Character progression is kept separate from power enhancement.
   Existing character level remains the character's level; powerLevel is 1..10. */
state.characterProgress = state.characterProgress || {
  level:Math.max(1,Math.min(200,Number(state.rpgCharacter?.level||1))),
  xp:Math.max(0,Number(state.rpgCharacter?.xp||0)),
  nextXp:Math.max(100,Number(state.rpgCharacter?.nextXp||100))
};
if(!Array.isArray(state.rpgPowers)) state.rpgPowers=[];
state.rpgPowers.forEach(p=>p.powerLevel=Math.max(1,Math.min(10,Number(p.powerLevel||1))));

/* Exact Abyss Poison kit requested by the user. */
POWER_DEFS.power_poison = {
  id:"power_poison",name:"พิษอเวจี",rarity:"SS",type:"poison",icon:"☠️",
  skills:[
    {name:"หมอกพิษอเวจี",icon:"☣️",key:"Q",mana:25,cd:5,color:"#76ff5a",range:155,damage:280,duration:5,desc:"ปล่อยหมอกพิษรอบตัว สร้างความเสียหายต่อเนื่อง"},
    {name:"คลื่นหมอกพิษ",icon:"🟢",key:"1",mana:38,cd:8,color:"#54ef62",range:260,damage:410,duration:3.5,desc:"ปล่อยคลื่นหมอกพิษขนาดใหญ่และรวดเร็วไปด้านหน้า"},
    {name:"ฝนพิษอเวจี",icon:"🌧️",key:"2",mana:52,cd:15,color:"#a4ff55",range:300,damage:520,duration:5,desc:"เรียกเมฆดำและฝนพิษสีเขียวถล่มพื้นที่"},
    {name:"บึงพิษอเวจี",icon:"🫧",key:"3",mana:62,cd:20,color:"#8dff49",range:260,damage:610,duration:6,desc:"สร้างบึงพิษควบคุมพื้นที่ ลดความเร็วและทำดาเมจต่อเนื่อง"},
    {name:"จ้าวแห่งพิษอเวจี",icon:"💀",key:"4",mana:90,cd:45,color:"#d9ff72",range:340,damage:900,duration:10,desc:"Ultimate — ซัมมอนโครงกระโหลกพิษล่าเป้าหมายอัตโนมัติ 10 วินาที"}
  ]
};

/* GM/test account gets Abyss Poison already unlocked at Power Lv.10, without changing other powers. */
const __gmPoisonId="gm-poison-abyss";
if(!state.rpgPowers.some(p=>p.id===__gmPoisonId)){
  state.rpgPowers.push({
    id:__gmPoisonId,powerId:"power_poison",sourceId:"power_poison",
    name:"พิษอเวจี",icon:"☠️",rarity:"SS",type:"power",
    powerLevel:10,level:state.characterProgress.level,xp:0,nextXp:100,
    skills:POWER_DEFS.power_poison.skills.map(s=>({...s})),
    gmUnlocked:true
  });
}
function getActivePowerLevel(){
  return Math.max(1,Math.min(10,Number(state.rpgCharacter?.powerLevel||1)));
}
const POWER_SKILL_UNLOCK_LEVELS=[1,3,5,7,10];
isSkillUnlocked = function(i){ return getActivePowerLevel() >= (POWER_SKILL_UNLOCK_LEVELS[i] ?? 999); };

/* Power enhancement: failure only drops one power level, never destroys the power. */
function getPowerEnhanceNeed(level){ return Math.max(1,Math.pow(2,Math.max(0,level-1))); }
function getPowerEnhanceChance(level){ return Math.max(.30,.90-(level-1)*.06); }
function upgradeActivePower(){
  const power=state.rpgCharacter;if(!power)return;
  const level=getActivePowerLevel();
  if(level>=10){ alert("พลังนี้อยู่ Power Lv.10 สูงสุดแล้ว");return; }
  const need=getPowerEnhanceNeed(level);
  if(Number(state.rpgInventory.magicPowder||0)<need){ alert(`ผงวิเศษไม่พอ ต้องใช้ ${need} ผง`);return; }
  state.rpgInventory.magicPowder-=need;
  if(Math.random()<getPowerEnhanceChance(level)){
    power.powerLevel=level+1;
    const row=state.rpgPowers.find(p=>p.id===power.id); if(row) row.powerLevel=power.powerLevel;
    alert(`✨ ตีบวกพลังสำเร็จ! Power Lv.${power.powerLevel}`);
  }else{
    power.powerLevel=Math.max(1,level-1);
    const row=state.rpgPowers.find(p=>p.id===power.id); if(row) row.powerLevel=power.powerLevel;
    alert(`⚠️ ตีบวกล้มเหลว ลดเหลือ Power Lv.${power.powerLevel}`);
  }
  saveState(); renderHeroRoster(); renderRpgInventory(); syncRpgHud();
}

/* Replace only the power roster presentation so it shows power level and enhancement material. */
renderHeroRoster = function(){
  const el=document.getElementById("heroRosterList"); if(!el)return;
  state.rpgPowers.forEach(p=>p.powerLevel=Math.max(1,Math.min(10,Number(p.powerLevel||1))));
  el.innerHTML=state.rpgPowers.map(p=>{
    const def=POWER_DEFS[p.powerId||p.id]||POWER_DEFS.power_lightning;
    const m=POWER_TIER_META[def.rarity]||POWER_TIER_META.C,active=p.id===state.rpgCharacter?.id;
    const lv=p.powerLevel||1, need=lv<10?getPowerEnhanceNeed(lv):0;
    return `<div class="hero-roster-card power-roster-card ${active?"active":""}" style="--rarity-color:${m.color}">
      <div class="hero-roster-avatar">${p.icon||def.icon}</div>
      <div class="hero-roster-main"><b>${p.name||def.name}</b><span>${m.label} · Power Lv.${lv}/10</span><small>${def.skills.map((s,i)=>`${isPowerEntrySkillUnlocked(p,i)?"🔓":"🔒"} ${s.name}`).join(" · ")}</small></div>
      <div class="power-roster-actions">
        <button type="button" class="hero-switch-btn" data-hero-switch="${p.id}" ${active?"disabled":""}>${active?"กำลังใช้":"ติดตั้งพลัง"}</button>
        ${active&&lv<10?`<button type="button" class="hero-switch-btn power-up-btn" data-power-up="${p.id}">✨ ตีบวก (${need} ผง)</button>`:""}
      </div>
    </div>`;
  }).join("");
  el.querySelectorAll("[data-hero-switch]").forEach(b=>b.addEventListener("click",()=>switchHero(b.dataset.heroSwitch)));
  el.querySelectorAll("[data-power-up]").forEach(b=>b.addEventListener("click",()=>upgradeActivePower()));
};
function isPowerEntrySkillUnlocked(power,i){
  return Math.max(1,Number(power?.powerLevel||1)) >= (POWER_SKILL_UNLOCK_LEVELS[i]??999);
}

/* Preserve character level when changing power; only the equipped power changes. */
switchHero = function(powerId){
  const power=state.rpgPowers.find(p=>p.id===powerId); if(!power)return;
  const def=POWER_DEFS[power.powerId||power.id]||POWER_DEFS.power_lightning;
  const progress=state.characterProgress || {level:rpg.player.level,xp:rpg.player.xp,nextXp:rpg.player.nextXp};
  power.level=Math.max(1,Math.min(200,Number(progress.level||1)));
  power.xp=Math.max(0,Number(progress.xp||0));
  power.nextXp=Math.max(100,Number(progress.nextXp||100));
  power.powerLevel=Math.max(1,Math.min(10,Number(power.powerLevel||1)));
  power.powerId=def.id;power.powerName=def.name;power.name=def.name;power.icon=def.icon;power.rarity=def.rarity;
  power.skills=def.skills.map(s=>({...s}));
  state.rpgCharacter=power;
  rpg.player.level=power.level;rpg.player.xp=power.xp;rpg.player.nextXp=power.nextXp;
  rpg.player.maxHp=getEffectiveCharacterMaxHp();rpg.player.maxMana=getEffectiveCharacterMaxMana();
  rpg.player.hp=Math.min(rpg.player.hp||rpg.player.maxHp,rpg.player.maxHp);rpg.player.mana=Math.min(rpg.player.mana||rpg.player.maxMana,rpg.player.maxMana);
  rpg.player.skillCds=[0,0,0,0,0];rpg.player.selectedSkill=0;
  skillDefs=def.skills;
  saveState();renderHeroRoster();updateCharacterLobby();syncRpgHud();renderRpgInventory();
  document.getElementById("characterRosterModal")?.classList.add("hidden");
};

/* Dungeon HUD always follows the equipped power — icon, name, key, lock and tooltip. */
function updateDungeonSkillPresentation(){
  const power=getActivePowerDef();
  skillDefs=power.skills;
  const buttons=[...document.querySelectorAll(".skill-wheel-btn")];
  buttons.forEach((btn,i)=>{
    const skill=power.skills[i];if(!skill)return;
    const small=btn.querySelector("small");
    btn.childNodes.forEach(n=>{if(n.nodeType===3)n.remove();});
    if(!btn.querySelector(".skill-power-icon")){
      const icon=document.createElement("span");icon.className="skill-power-icon";btn.prepend(icon);
    }
    btn.querySelector(".skill-power-icon").textContent=skill.icon;
    if(small) small.textContent=skill.key;
    btn.title=`${skill.name} — ${skill.desc}${isSkillUnlocked(i)?"":" · 🔒 ต้อง Power Lv."+POWER_SKILL_UNLOCK_LEVELS[i]}`;
    btn.style.setProperty("--power-skill-color",skill.color||"#8ff");
  });
  const panel=document.querySelector(".skills-panel");
  if(panel){
    let cards=[...panel.querySelectorAll(".skill-card")];
    if(cards.length<5){
      for(let i=cards.length;i<5;i++){const d=document.createElement("div");d.className="skill-card";panel.appendChild(d);}
      cards=[...panel.querySelectorAll(".skill-card")];
    }
    cards.slice(0,5).forEach((card,i)=>{
      const skill=power.skills[i],unlocked=isSkillUnlocked(i);
      card.classList.toggle("locked",!unlocked);card.classList.toggle("active",i===rpg.player.selectedSkill);
      card.innerHTML=`<div class="skill-icon">${unlocked?skill.icon:"🔒"}</div><div><b>${skill.name}</b><small>${unlocked?`${skill.key} · ${skill.desc}`:`ปลดล็อกที่ Power Lv.${POWER_SKILL_UNLOCK_LEVELS[i]}`}</small></div><span>${i===4?"ULT":skill.cd+"s"}</span>`;
    });
  }
  const label=document.getElementById("rpgCharacterCombatName");if(label)label.textContent=`${state.username||"ผู้เล่น"} · ${power.name}`;
  const rarity=document.getElementById("rpgCharacterCombatRarity");if(rarity)rarity.textContent=`${getPowerMeta().label} · Power Lv.${getActivePowerLevel()}`;
}
const __v88BaseSyncRpgHud=syncRpgHud;
syncRpgHud=function(){__v88BaseSyncRpgHud();updateDungeonSkillPresentation();};

/* Poison runtime state */
rpg.poisonZones=rpg.poisonZones||[];
rpg.poisonSummons=rpg.poisonSummons||[];
function v88DamageMob(mob,damage,kind="skill"){
  if(!mob?.alive)return false;
  damage=Math.max(1,Math.round(damage));
  mob.hp=Math.max(0,mob.hp-damage);mob.hitFlash=.18;mob.aggro=true;
  showRpgDamageNumber(mob.x,mob.y-32,damage,kind);
  if(mob.hp<=0){
    handleRpgMobDeath(mob);
    return true;
  }
  return false;
}
function applyPoison(mob,damage,duration=4){
  if(!mob?.alive)return;
  const tickDamage=Math.max(1,Math.round(damage*.22));
  mob.v88Poison={remaining:Math.max(mob.v88Poison?.remaining||0,duration),tick:.5,timer:.08,damage:Math.max(mob.v88Poison?.damage||0,tickDamage)};
  mob.slow=Math.max(mob.slow||0,.25);
}
function addPoisonZone(zone){rpg.poisonZones.push(zone);}
function poisonTargetsAt(x,y,r){
  const out=[];for(const pack of rpg.packs)for(const mob of pack.mobs)if(mob.alive&&Math.hypot(mob.x-x,mob.y-y)<=r)out.push(mob);return out;
}
function spawnPoisonBurst(x,y,r,count=24){
  for(let i=0;i<count;i++)spawnParticle(x,y,{color:i%3?"#52d95d":"#b7ff63",angle:Math.random()*Math.PI*2,speed:25+Math.random()*95,life:.45+Math.random()*.5,size:2+Math.random()*5,gravity:-8});
}
function nearestMobTo(x,y,range=9999){
  let best=null,dist=range;
  for(const pack of rpg.packs)for(const mob of pack.mobs)if(mob.alive){const d=Math.hypot(mob.x-x,mob.y-y);if(d<dist){best={mob,dist:d};dist=d;}}
  return best;
}
function castAbyssPoison(i,skill){
  const p=rpg.player,base=getEffectiveSkillDamage(skill);
  if(i===0){
    addPoisonZone({kind:"mist",follow:true,x:p.x,y:p.y,radius:145,remaining:5,tick:.5,timer:0,damage:base});
    spawnPoisonBurst(p.x,p.y,145,42);
  }else if(i===1){
    const a=p.facingAngle??0;
    addPoisonZone({kind:"wave",x:p.x,y:p.y,vx:Math.cos(a)*190,vy:Math.sin(a)*190,radius:48,maxRadius:120,remaining:2.4,tick:.35,timer:0,damage:base});
    for(let k=0;k<28;k++)spawnParticle(p.x,p.y,{color:k%2?"#62f05d":"#c1ff72",angle:a+(Math.random()-.5)*.65,speed:110+Math.random()*150,life:.5+Math.random()*.35,size:3+Math.random()*5,gravity:-12});
  }else if(i===2){
    const t=nearestMobTo(p.x,p.y,skill.range);const x=t?.mob?.x??(p.x+Math.cos(p.facingAngle||0)*170),y=t?.mob?.y??(p.y+Math.sin(p.facingAngle||0)*120);
    addPoisonZone({kind:"rain",x,y,radius:145,remaining:5,tick:.45,timer:0,damage:base});
    spawnPoisonBurst(x,y,145,55);
  }else if(i===3){
    const t=nearestMobTo(p.x,p.y,skill.range);const x=t?.mob?.x??(p.x+Math.cos(p.facingAngle||0)*150),y=t?.mob?.y??(p.y+Math.sin(p.facingAngle||0)*100);
    addPoisonZone({kind:"pool",x,y,radius:125,remaining:6,tick:.5,timer:0,damage:base,slow:1.1});
    spawnPoisonBurst(x,y,125,48);
  }else{
    rpg.poisonSummons.push({x:p.x,y:p.y,remaining:10,attackCd:.35,target:null,damage:base*.65});
    for(let k=0;k<80;k++)spawnParticle(p.x,p.y,{color:k%3===0?"#d8ff72":k%2?"#65f06a":"#18321d",angle:Math.random()*Math.PI*2,speed:35+Math.random()*160,life:.6+Math.random()*.7,size:3+Math.random()*6,gravity:-10});
  }
}

/* Keep every existing non-poison power exactly as before; only Abyss Poison gets custom behavior. */
const __v88BaseRpgSkill=rpgSkill;
rpgSkill=function(){
  const power=getActivePowerDef();
  if(power.type!=="poison") return __v88BaseRpgSkill();
  if(!rpg.running||rpg.deathPending||!rpg.inDungeon)return;
  skillDefs=power.skills;
  const i=rpg.player.selectedSkill,skill=skillDefs[i];if(!skill)return;
  if(!isSkillUnlocked(i)){rpg.combatLog=`🔒 ${skill.name} ปลดล็อกเมื่อ Power Lv.${POWER_SKILL_UNLOCK_LEVELS[i]}`;return;}
  if(rpg.player.skillCds[i]>0){rpg.combatLog=`⏳ ${skill.name} คูลดาวน์ ${rpg.player.skillCds[i].toFixed(1)}s`;return;}
  if(rpg.player.mana<skill.mana){rpg.combatLog="💧 มานาไม่พอ";sfx("hurt");return;}
  rpg.player.mana-=skill.mana;showDungeonResourceFloat(`-${skill.mana} MP`,"mana-cost");
  rpg.player.skillCds[i]=skill.cd;rpg.player.skillCd=skill.cd;rpg.player.skillAnim=.9;
  castAbyssPoison(i,skill);
  rpg.combatLog=`${skill.icon} ${skill.name} · พลังพิษทำงาน`;
  saveState();
};

/* Add poison DoT, zones and summon AI after the existing stable update loop. */
const __v88BaseUpdateRpg=updateRpg;
updateRpg=function(dt){
  __v88BaseUpdateRpg(dt);
  if(!rpg.inDungeon||rpg.deathPending)return;
  for(const pack of rpg.packs)for(const mob of pack.mobs){
    if(!mob.alive||!mob.v88Poison)continue;
    const ps=mob.v88Poison;ps.remaining-=dt;ps.timer-=dt;
    if(ps.timer<=0&&ps.remaining>0){ps.timer+=ps.tick;v88DamageMob(mob,ps.damage,"poison");spawnParticle(mob.x,mob.y-8,{color:"#69f05c",speed:18+Math.random()*42,life:.35,size:3+Math.random()*3,gravity:-18});}
    if(ps.remaining<=0)delete mob.v88Poison;
  }
  for(let z=rpg.poisonZones.length-1;z>=0;z--){
    const zone=rpg.poisonZones[z];zone.remaining-=dt;zone.timer-=dt;
    if(zone.follow){zone.x=rpg.player.x;zone.y=rpg.player.y;}
    if(zone.kind==="wave"){zone.x+=zone.vx*dt;zone.y+=zone.vy*dt;zone.radius=Math.min(zone.maxRadius,zone.radius+32*dt);}
    if(zone.timer<=0){
      zone.timer+=zone.tick;
      const targets=poisonTargetsAt(zone.x,zone.y,zone.radius);
      targets.forEach(m=>{
        if(zone.slow) m.slow=Math.max(m.slow||0,zone.slow);
        applyPoison(m,zone.damage,zone.kind==="rain"?4:3);
        v88DamageMob(m,Math.max(1,Math.round(zone.damage*.16)),"poison");
      });
    }
    if(Math.random()<dt*16)spawnParticle(zone.x+(Math.random()-.5)*zone.radius*1.5,zone.y+(Math.random()-.5)*zone.radius*.8,{color:zone.kind==="rain"?"#a8ff64":"#4fd35e",speed:10+Math.random()*30,life:.35+Math.random()*.4,size:2+Math.random()*4,gravity:-25});
    if(zone.remaining<=0)rpg.poisonZones.splice(z,1);
  }
  for(let s=rpg.poisonSummons.length-1;s>=0;s--){
    const sum=rpg.poisonSummons[s];sum.remaining-=dt;sum.attackCd-=dt;
    if(!sum.target||!sum.target.alive||Math.hypot(sum.target.x-sum.x,sum.target.y-sum.y)>360)sum.target=nearestMobTo(sum.x,sum.y,520)?.mob||null;
    if(sum.target){
      const dx=sum.target.x-sum.x,dy=sum.target.y-sum.y,d=Math.max(1,Math.hypot(dx,dy));
      if(d>42){sum.x+=dx/d*145*dt;sum.y+=dy/d*145*dt;}
      if(d<78&&sum.attackCd<=0){sum.attackCd=1;applyPoison(sum.target,sum.damage,4);v88DamageMob(sum.target,Math.round(sum.damage*.32),"poison");
        for(let k=0;k<18;k++)spawnParticle(sum.x,sum.y,{color:k%2?"#79f25d":"#bfff6e",angle:Math.atan2(dy,dx)+(Math.random()-.5)*.3,speed:80+Math.random()*130,life:.3+Math.random()*.25,size:2+Math.random()*4,gravity:-10});
      }
    }
    if(sum.remaining<=0)rpg.poisonSummons.splice(s,1);
  }
};

/* Draw poison visuals over the existing dungeon without replacing the old renderer. */
const __v88BaseDrawRpg=drawRpg;
drawRpg=function(){
  __v88BaseDrawRpg();
  if(!rpgCtx||!rpg.inDungeon)return;
  const ctx=rpgCtx,t=performance.now()/1000;
  for(const z of rpg.poisonZones){
    ctx.save();
    if(z.kind==="rain"){
      ctx.fillStyle="rgba(18,28,22,.58)";ctx.beginPath();ctx.ellipse(z.x,z.y-118,z.radius*.82,26,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="rgba(83,255,92,.13)";ctx.beginPath();ctx.arc(z.x,z.y,z.radius,0,Math.PI*2);ctx.fill();
      for(let k=0;k<18;k++){const rx=(k*47%100)/100-.5,ry=(k*31%100)/100-.5;ctx.strokeStyle="rgba(126,255,87,.65)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(z.x+rx*z.radius*1.7,z.y-95+ry*15);ctx.lineTo(z.x+rx*z.radius*1.7-8,z.y+ry*z.radius*.7);ctx.stroke();}
    }else if(z.kind==="pool"){
      const g=ctx.createRadialGradient(z.x,z.y,8,z.x,z.y,z.radius);g.addColorStop(0,"rgba(117,255,71,.42)");g.addColorStop(.65,"rgba(43,138,55,.30)");g.addColorStop(1,"rgba(20,80,28,0)");
      ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(z.x,z.y,z.radius,z.radius*.55,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="rgba(154,255,88,.55)";ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(z.x,z.y,z.radius*.9,z.radius*.48,0,0,Math.PI*2);ctx.stroke();
    }else{
      const g=ctx.createRadialGradient(z.x,z.y,6,z.x,z.y,z.radius);g.addColorStop(0,"rgba(138,255,85,.28)");g.addColorStop(1,"rgba(38,105,43,0)");
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(z.x,z.y,z.radius,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }
  for(const sum of rpg.poisonSummons){
    ctx.save();ctx.translate(sum.x,sum.y-34);ctx.shadowColor="#7cff62";ctx.shadowBlur=18;
    ctx.fillStyle="rgba(117,255,94,.25)";ctx.beginPath();ctx.arc(0,0,28+Math.sin(t*5)*3,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;ctx.fillStyle="#d9ead6";ctx.beginPath();ctx.arc(0,-2,16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#223322";ctx.beginPath();ctx.arc(-6,-4,3,0,Math.PI*2);ctx.arc(6,-4,3,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="#6cff62";ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,3,7,0,Math.PI);ctx.stroke();
    ctx.restore();
  }
};

/* Character XP remains shared and never changes when changing powers. */
const __v88BaseGainXp=rpgGainXp;
rpgGainXp=function(amount){
  __v88BaseGainXp(amount);
  state.characterProgress={level:rpg.player.level,xp:rpg.player.xp,nextXp:rpg.player.nextXp};
  if(state.rpgCharacter){state.rpgCharacter.level=rpg.player.level;state.rpgCharacter.xp=rpg.player.xp;state.rpgCharacter.nextXp=rpg.player.nextXp;}
  saveState();
};

saveState();
syncUnifiedShopIcons();
updateDungeonSkillPresentation();


/* =========================
   V89 POWER + GACHA CONSISTENCY PATCH
   Requested changes only:
   - gacha item visuals use the exact same visual registry as the shop
   - no "common/rare/often" rate text on any of the 3 gacha boxes
   - power enhancement is a separate screen from equipment enhancement
   - Magic Powder is exclusive to power enhancement and costs x3 each level
   - Breakthrough Seal is shop-only and guarantees +1 power level
   ========================= */

ITEM_VISUALS.powerBreakthrough = `<span class="unified-item-icon emoji-item power-breakthrough-visual">△</span>`;
state.rpgInventory = state.rpgInventory || {};
state.rpgInventory.magicPowder = Number(state.rpgInventory.magicPowder || 0);
state.rpgInventory.powerBreakthrough = Number(state.rpgInventory.powerBreakthrough || 0);

function getPowerEnhanceNeed(level){
  // Lv.1→2 = 10, then x3 every next level: 30, 90, 270...
  return Math.round(10 * Math.pow(3, Math.max(0, Number(level || 1) - 1)));
}
function getPowerEnhanceChance(level){
  // Lv.5 onward becomes intentionally very difficult; Lv.9→10 is extremely rare.
  const chances=[90,82,74,65,45,30,18,10,3];
  return chances[Math.max(0, Math.min(chances.length-1, Number(level||1)-1))];
}
function getActivePowerEntry(){
  const id=state.rpgCharacter?.id;
  return state.rpgPowers?.find(p=>p.id===id) || state.rpgCharacter || null;
}
function powerEnhanceAttempt(useBreakthrough=false){
  const power=getActivePowerEntry();
  if(!power){ alert("ยังไม่ได้ติดตั้งพลัง"); return; }
  const level=Math.max(1,Math.min(10,Number(power.powerLevel||1)));
  if(level>=10){ alert("⚡ พลังนี้อยู่ Power Lv.10 สูงสุดแล้ว"); return; }

  const need=getPowerEnhanceNeed(level);
  const powder=Number(state.rpgInventory.magicPowder||0);
  if(powder<need){ alert(`✨ ผงวิเศษไม่พอ ต้องใช้ ${need.toLocaleString()} ผง`); return; }
  if(useBreakthrough && Number(state.rpgInventory.powerBreakthrough||0)<1){
    alert("△ ไม่มีตราทะลวงระดับ"); return;
  }

  state.rpgInventory.magicPowder-=need;
  if(useBreakthrough) state.rpgInventory.powerBreakthrough--;

  const success=useBreakthrough || Math.random()*100 < getPowerEnhanceChance(level);
  if(success){
    power.powerLevel=level+1;
    state.rpgCharacter.powerLevel=power.powerLevel;
    alert(`⚡ เพิ่มระดับพลังสำเร็จ! Power Lv.${power.powerLevel}`);
  }else{
    power.powerLevel=Math.max(1,level-1);
    state.rpgCharacter.powerLevel=power.powerLevel;
    alert(`⚠️ เพิ่มระดับพลังล้มเหลว ลดเหลือ Power Lv.${power.powerLevel}`);
  }
  saveState();
  renderPowerUpgradePanel();
  renderHeroRoster();
  renderRpgInventory();
  syncRpgHud();
  updateCharacterLobby();
}
upgradeActivePower=function(){ powerEnhanceAttempt(false); };

function powerSkillUnlockText(def){
  return (def?.skills||[]).map((s,i)=>{
    const lv=POWER_SKILL_UNLOCK_LEVELS[i];
    const on=isSkillUnlocked(i);
    return `<div class="power-upgrade-skill ${on?'unlocked':'locked'}"><span>${on?s.icon:'🔒'}</span><div><b>${s.name}</b><small>${i===4?'ULTIMATE · ':''}${on?'ปลดล็อกแล้ว':`ปลดล็อกที่ Power Lv.${lv}`}</small></div></div>`;
  }).join("");
}
function renderPowerUpgradePanel(){
  const el=document.getElementById("powerUpgradeContent"); if(!el)return;
  const power=getActivePowerEntry();
  if(!power){ el.innerHTML='<div class="gacha-empty">ยังไม่ได้ติดตั้งพลัง</div>'; return; }
  const def=POWER_DEFS[power.powerId||power.id] || POWER_DEFS.power_poison;
  const level=Math.max(1,Math.min(10,Number(power.powerLevel||1)));
  const need=level<10?getPowerEnhanceNeed(level):0;
  const chance=level<10?getPowerEnhanceChance(level):100;
  el.innerHTML=`
    <div class="power-upgrade-preview">
      <div class="power-upgrade-icon">${def.icon||power.icon||'⚡'}</div>
      <div><small>POWER ที่กำลังติดตั้ง</small><h3>${def.name}</h3><b>Power Lv.${level}/10</b><span>${(POWER_TIER_META[def.rarity]||{}).label||def.rarity||'C'}</span></div>
    </div>
    <div class="power-upgrade-materials">
      <div>${itemVisual('magicPowder')}<span>ผงวิเศษ</span><b>${Number(state.rpgInventory.magicPowder||0).toLocaleString()}</b></div>
      <div>${itemVisual('powerBreakthrough')}<span>ตราทะลวงระดับ</span><b>${Number(state.rpgInventory.powerBreakthrough||0).toLocaleString()}</b></div>
    </div>
    ${level>=10?`<div class="enhance-requirement">⚡ Power Lv.10 คือระดับสูงสุดของพลังนี้</div>`:
    `<div class="enhance-requirement">Power Lv.${level} → Lv.${level+1} · ใช้ ✨ ${need.toLocaleString()} ผงวิเศษ · โอกาสสำเร็จ ${chance}%</div>
     <div class="power-upgrade-actions">
       <button id="powerUpgradeNormalButton" class="enhance-btn">✨ เพิ่มระดับพลัง</button>
       <button id="powerUpgradeGuaranteedButton" class="repair-weapon-btn">△ ทะลวงระดับ (สำเร็จ 100%)</button>
     </div>
     <small class="power-upgrade-note">หากล้มเหลว พลังจะลด 1 ระดับ แต่พลังจะไม่หายและไม่แตก · ทะลวงระดับยังใช้ผงวิเศษตามระดับปกติ + ตราทะลวงระดับ 1 ชิ้น</small>`}
    <div class="power-upgrade-skill-list">${powerSkillUnlockText(def)}</div>`;
  el.querySelector("#powerUpgradeNormalButton")?.addEventListener("click",()=>powerEnhanceAttempt(false));
  el.querySelector("#powerUpgradeGuaranteedButton")?.addEventListener("click",()=>powerEnhanceAttempt(true));
}

function buyPowerBreakthrough(){
  const q=buyQuantityInput("qtyPowerBreakthrough");
  const cost=1500*q;
  if(Number(state.diamonds||0)<cost){ return shopMsg("💎 เพชรไม่พอ"); }
  state.diamonds-=cost;
  state.rpgInventory.powerBreakthrough=Number(state.rpgInventory.powerBreakthrough||0)+q;
  afterBuy(`${itemVisual("powerBreakthrough")}<span>ได้รับตราทะลวงระดับ x${q}</span>`);
  renderPowerUpgradePanel();
}
document.getElementById("buyPowerBreakthrough")?.addEventListener("click",buyPowerBreakthrough);
document.getElementById("characterPowerUpgradeButton")?.addEventListener("click",()=>{
  renderPowerUpgradePanel();
  openRpgModal("characterPowerUpgradeModal");
});

const __v89OpenRpgModal=openRpgModal;
openRpgModal=function(id){
  if(id==="characterPowerUpgradeModal") renderPowerUpgradePanel();
  return __v89OpenRpgModal(id);
};

/* The item gacha pool remains generated from the same item registry as the shop.
   The UI now uses itemVisual(), so result/reveal images cannot drift from shop images. */
itemGachaPool=function(){
  return Object.values(ITEM_DATABASE)
    .filter(item=>item.gacha)
    .map(item=>({kind:"item",id:item.id,name:item.name,icon:item.icon,note:item.description}));
};
createItemGachaReward=function(){
  const pool=itemGachaPool(),p=pool[Math.floor(Math.random()*pool.length)];
  return {type:"gacha-item",itemType:"item",itemId:p.id,name:p.name,icon:p.icon,note:p.note,qty:1};
};
grantItemGachaReward=function(item){
  if(item.type==="gacha-item"){
    const def=getItemDef(item.itemId); if(!def)return;
    state.rpgInventory[item.itemId]=Number(state.rpgInventory[item.itemId]||0)+Number(item.qty||1);
  }else ensureGachaCollection().push(item);
};

syncGachaResultsPanel=function(items=[]){
  const el=document.getElementById("gachaResults"); if(!el)return;
  if(!items.length){ el.innerHTML='<div class="gacha-empty">ยังไม่มีผลสุ่ม</div>'; return; }
  el.innerHTML=items.map(item=>{
    if(item.type==="hero"||item.type==="power"){
      const def=POWER_DEFS[item.powerId||item.sourceId||item.id]||POWER_DEFS.power_poison;
      const m=POWER_TIER_META[item.rarity||def.rarity]||POWER_TIER_META.C;
      return `<div class="gacha-result-card hero-result-card" style="--rarity-color:${m.color}"><div class="gacha-result-icon">${item.icon||def.icon}</div><div class="gacha-result-name">${item.name||def.name}</div><div class="gacha-result-tier">${m.label}</div><small>พลัง · Power Lv.${Number(item.powerLevel||1)}</small></div>`;
    }
    if(item.type==="gacha-item"){
      return `<div class="gacha-result-card item-result-card"><div class="gacha-result-icon unified-gacha-item">${itemVisual(item.itemId)}</div><div class="gacha-result-name">${item.name}</div><div class="gacha-result-tier">ไอเท็ม</div></div>`;
    }
    const t=getWeaponTier(item),m=weaponTierMeta(t);
    return `<div class="gacha-result-card weapon-tier-${t}" style="--rarity-color:${m.color}"><div class="gacha-result-icon">${item.icon}</div><div class="gacha-result-name">${item.name}</div><div class="gacha-result-tier">${m.label}</div><div class="gacha-result-stars">${weaponStarHtml(item.stars,t)}</div><small>${item.slot==="weapon"?"อาวุธ":"ชุดเกราะ"}</small>${gachaItemStatsHtml(item)}</div>`;
  }).join("");
};

revealGachaOne=function(){
  if(gachaRevealBusy||gachaAnimationIndex>=gachaAnimationQueue.length)return;
  const item=gachaAnimationQueue[gachaAnimationIndex],vm=gachaVisualMeta(item);
  const box=document.getElementById("gachaRevealBox"),status=document.getElementById("gachaRevealStatus"),out=document.getElementById("gachaRevealItem");
  gachaRevealBusy=true;
  if(box)box.className=`gacha-reveal-box ${vm.tier.toLowerCase()} opening`;
  if(status)status.textContent="✨ กำลังเปิดกล่อง...";
  stopGachaAnimation();
  gachaAnimationTimer=setTimeout(()=>{
    if(box)box.classList.add("opened");
    playGachaRevealSound(item);
    if(out){
      out.className=`gacha-reveal-item ${(item.type==="hero"||item.type==="power")?"hero-reveal-card":""}`;
      out.style.setProperty("--rarity-color",vm.color);
      if(item.type==="hero"||item.type==="power"){
        const def=POWER_DEFS[item.powerId||item.sourceId||item.id]||POWER_DEFS.power_poison;
        out.innerHTML=`<div class="reveal-item-icon power-reveal-icon">${item.icon||def.icon}</div><b>${item.name||def.name}</b><small>พลัง · ${vm.label} · Power Lv.${Number(item.powerLevel||1)}</small>`;
      }else if(item.type==="gacha-item"){
        out.innerHTML=`<div class="reveal-item-icon unified-gacha-item">${itemVisual(item.itemId)}</div><b>${item.name}</b><small>ไอเท็ม</small>`;
      }else{
        out.innerHTML=`<div class="reveal-item-icon">${item.icon}</div><b>${item.name}</b><small>${item.slot==="weapon"?"อาวุธ":"ชุดเกราะ"} · ${vm.label}</small><div>${weaponStarHtml(item.stars,getWeaponTier(item))}</div>`;
      }
    }
    gachaAnimationIndex++;gachaRevealBusy=false;gachaRevealOpened=true;
    const c=document.getElementById("gachaAnimationCounter");if(c)c.textContent=`${Math.min(gachaAnimationIndex+1,gachaAnimationQueue.length)} / ${gachaAnimationQueue.length}`;
    if(gachaAnimationIndex>=gachaAnimationQueue.length){syncGachaResultsPanel(gachaAnimationResults);if(status)status.textContent=`เปิดครบ ${gachaAnimationQueue.length} ชิ้นแล้ว`;}
    else if(status)status.textContent="แตะกล่องเพื่อเปิดชิ้นถัดไป";
  },650);
};

renderPowerUpgradePanel();
syncUnifiedShopIcons();
saveState();


/* =========================
   V90 ITEM SYNC + REGEN ENHANCEMENT RESTORE
   Keep all existing systems; restore REGEN enhancement mode and make every
   non-equipment/non-power item use the central shop item registry everywhere.
   ========================= */

// One registry = one visual everywhere (shop, bag, gacha, enhancement).
ITEM_VISUALS.magicPowder = ITEM_VISUALS.magicPowder || `<span class="unified-item-icon emoji-item">✨</span>`;
ITEM_VISUALS.powerBreakthrough = ITEM_VISUALS.powerBreakthrough || `<span class="unified-item-icon emoji-item power-breakthrough-visual">🜂</span>`;
state.rpgInventory = state.rpgInventory || {};
Object.keys(ITEM_DATABASE).forEach(id=>{
  state.rpgInventory[id]=Number(state.rpgInventory[id]||0);
});

// The bag is generated directly from ITEM_DATABASE so new registered items
// automatically appear. Equipment and powers are intentionally excluded.
renderRpgBag = function(){
  const list=document.getElementById("rpgBagList");
  document.getElementById("bagCoins")?.replaceChildren(document.createTextNode((state.coins||0).toLocaleString()));
  document.getElementById("bagDiamonds")?.replaceChildren(document.createTextNode((state.diamonds||0).toLocaleString()));
  if(!list)return;
  const items=[];
  Object.values(ITEM_DATABASE).forEach(def=>{
    const count=Number(state.rpgInventory?.[def.id]||0);
    if(count>0) items.push({icon:itemVisual(def.id),name:def.name,count,note:def.description||"ไอเท็ม RPG"});
  });
  Object.entries(rpg.junk||{}).forEach(([id,count])=>{
    const def=rpgJunkTypes.find(x=>x.id===id);
    if(def&&Number(count)>0)items.push({icon:def.icon,name:def.name,count:Number(count),note:`ขาย ${def.price ?? def.value ?? 0} 🪙 / ชิ้น`});
  });
  Object.entries(rpg.itemInventory||{}).forEach(([id,count])=>{
    if(Number(count)<=0||ITEM_DATABASE[id])return;
    const def=Array.isArray(window.rpgItemTypes)?window.rpgItemTypes.find(x=>x.id===id):null;
    if(def)items.push({icon:def.icon,name:def.name,count:Number(count),note:def.note||"ไอเท็ม RPG"});
  });
  if(!items.length){list.innerHTML=`<div class="bag-empty"><div>🎒</div><b>กระเป๋ายังว่าง</b><small>ไอเท็มที่ได้รับจะมาแสดงที่นี่อัตโนมัติ</small></div>`;return;}
  list.innerHTML=items.map(i=>`<div class="inventory-item"><div class="item-icon">${i.icon}</div><div class="item-name">${i.name}</div><div class="item-count">x${i.count.toLocaleString()}</div><div class="item-note">${i.note}</div></div>`).join("");
};

// Restore the third enhancement material/mode: REGEN scroll.
getEnhanceMode=function(){
  return ["normal","orb","regen"].includes(rpg.enhanceMode)?rpg.enhanceMode:"normal";
};
setEnhanceMode=function(mode){
  if(!["normal","orb","regen"].includes(mode))mode="normal";
  rpg.enhanceMode=mode;
  document.querySelectorAll("[data-enhance-mode]").forEach(btn=>btn.classList.toggle("active",btn.dataset.enhanceMode===mode));
  syncCharacterEnhance();
};

// Rebuild the enhancement screen status using the exact same registry visuals.
syncCharacterEnhance=function(){
 const d=getEnhanceItemDisplay(),cur=d.stars,need=enhancementScrollNeed(cur,d.tier),chance=Math.round(enhancementChance(cur)*100),mode=getEnhanceMode();
 document.getElementById("characterEnhanceWeaponName")&&(document.getElementById("characterEnhanceWeaponName").textContent=d.name);
 const rank=document.getElementById("characterEnhanceWeaponRank");if(rank)rank.innerHTML=weaponStarHtml(cur,d.tier);
 const icon=document.querySelector("#characterEnhanceModal .enhance-weapon-icon");if(icon)icon.textContent=d.icon;
 const dur=document.getElementById("characterEnhanceWeaponDurability");if(dur)dur.textContent=`ความทนทาน ${d.durability}%`;
 const rar=document.getElementById("characterEnhanceRarity");if(rar){rar.textContent=d.tierMeta.label;rar.style.color=d.tierMeta.color}
 document.getElementById("characterEnhanceScrollCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.enhancementScroll||0).toLocaleString()));
 document.getElementById("characterMagicOrbCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.magicOrb||0).toLocaleString()));
 const regenCountEl=document.getElementById("characterRegenScrollCount");if(regenCountEl)regenCountEl.replaceChildren(document.createTextNode(Number(state.rpgInventory.regenScroll||0).toLocaleString()));
 const req=document.getElementById("characterEnhanceRequirement");
 if(req){
   const material=mode==="regen"?`${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ + ${inlineItemVisual("regenScroll")} 1 ใบ · สำเร็จ 100%`:
     mode==="orb"?`${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ + ${inlineItemVisual("magicOrb")} 1 ลูก · โอกาสสำเร็จ ${chance}%`:
     `${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ · โอกาสสำเร็จ ${chance}%`;
   req.innerHTML=cur>=8?`⭐ ${weaponStarHtml(8,d.tier)} อุปกรณ์ถึง 8 ดาวสูงสุดแล้ว`:`ต้องใช้ ${material} · ${d.tierMeta.label} · เป้าหมาย ${weaponStarHtml(cur+1,d.tier)}`;
 }
 const btn=document.getElementById("characterEnhanceWeaponButton");
 const hasScroll=Number(state.rpgInventory.enhancementScroll||0)>=need;
 const hasExtra=mode==="orb"?Number(state.rpgInventory.magicOrb||0)>=1:mode==="regen"?Number(state.rpgInventory.regenScroll||0)>=1:true;
 if(btn){btn.disabled=!!d.item?.broken||cur>=8||!hasScroll||!hasExtra;btn.textContent=cur>=8?"⭐ ครบ 8 ดาว":mode==="regen"?"✨ ตีบวกด้วยใบบวก REGEN (100%)":mode==="orb"?"🔮 ตีบวกด้วยลูกแก้ว":"⚒️ ตีบวกดาว";}
 document.querySelectorAll("[data-enhance-mode]").forEach(el=>el.classList.toggle("active",el.dataset.enhanceMode===mode));
};

enhanceWeapon=function(){
 if(rpg.inDungeon){rpg.combatLog="🔨 ต้องกลับไปหาช่างตีบวกหน้าดันเจี้ยน";const m=document.getElementById("enhanceMessage");if(m)m.textContent=rpg.combatLog;return}
 const d=getEnhanceItemDisplay(),item=d.item;if(!item||item.broken||d.stars>=8)return;
 const cur=d.stars,tier=d.tier,need=enhancementScrollNeed(cur,tier),mode=getEnhanceMode();
 const msg=document.getElementById("enhanceMessage");
 if(Number(state.rpgInventory.enhancementScroll||0)<need){if(msg)msg.textContent=`❌ ใบบวกไม่พอ ต้องใช้ ${need.toLocaleString()} ใบ`;syncCharacterEnhance();return}
 if(mode==="orb"&&Number(state.rpgInventory.magicOrb||0)<1){if(msg)msg.textContent="❌ ลูกแก้วเวทมนตร์ไม่พอ";syncCharacterEnhance();return}
 if(mode==="regen"&&Number(state.rpgInventory.regenScroll||0)<1){if(msg)msg.textContent="❌ ใบบวก REGEN ไม่พอ";syncCharacterEnhance();return}
 state.rpgInventory.enhancementScroll-=need;
 if(mode==="orb")state.rpgInventory.magicOrb--;
 if(mode==="regen")state.rpgInventory.regenScroll--;
 const success=mode==="regen"||Math.random()<enhancementChance(cur);
 if(success){
   item.stars=cur+1;item.level=item.stars;item.durability=100;item.broken=false;
   if(rpg.enhanceSlot==="weapon"){rpg.weapon.stars=item.stars;rpg.weapon.level=item.stars;rpg.weapon.durability=100;rpg.weapon.broken=false}
   if(msg)msg.innerHTML=`⭐ สำเร็จ! ${item.name} → ${weaponStarHtml(item.stars,tier)}${mode==="regen"?" · REGEN รับประกันสำเร็จ":""}`;sfx("success");
 }else{
   const loss=Math.min(100,10+cur*7);
   if(mode!=="orb"){item.durability=Math.max(0,item.durability-loss);item.broken=item.durability<=0;if(rpg.enhanceSlot==="weapon"){rpg.weapon.durability=item.durability;rpg.weapon.broken=item.broken}}
   if(msg)msg.innerHTML=`❌ ล้มเหลว! ยังอยู่ที่ ${weaponStarHtml(cur,tier)} · ความทนทาน -${mode==="orb"?0:loss}%`;sfx("error");
 }
 syncWeaponState();syncEquipmentFromWeapon();saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();
};

// Add REGEN mode button only once; preserve the existing normal/orb UI.
(function ensureRegenEnhanceButton(){
 const buttons=document.querySelectorAll("[data-enhance-mode]");
 if(!buttons.length||document.querySelector('[data-enhance-mode="regen"]'))return;
 const btn=document.createElement("button");btn.type="button";btn.className="enhance-mode-btn";btn.dataset.enhanceMode="regen";
 btn.innerHTML=`${itemVisual("regenScroll")} ใช้ใบบวก REGEN`;
 buttons[buttons.length-1].parentElement?.appendChild(btn);
 btn.addEventListener("click",()=>setEnhanceMode("regen"));
})();
// Existing buttons may have been bound by an earlier build; explicitly bind all three safely.
document.querySelectorAll("[data-enhance-mode]").forEach(btn=>{btn.onclick=()=>setEnhanceMode(btn.dataset.enhanceMode);});

// All item-gacha rewards are registry items and always enter the bag inventory.
grantItemGachaReward=function(item){
 if(item.type==="gacha-item"){
   const def=getItemDef(item.itemId);if(!def)return;
   state.rpgInventory=state.rpgInventory||{};
   state.rpgInventory[item.itemId]=Number(state.rpgInventory[item.itemId]||0)+Number(item.qty||1);
 }else ensureGachaCollection().push(item);
 renderRpgBag();
};

syncUnifiedShopIcons();
renderRpgBag();
saveState();


/* =========================
   V91 MARKET + ULTRA RARE GACHA FIX
   Targeted patch only: keep existing systems, sync the three special items,
   remove them from the shop, make them gacha-only, and let every bag item
   be listed in the player market.
   ========================= */

// One item definition and one visual are used everywhere.
ITEM_DATABASE.regenScroll = {
  ...ITEM_DATABASE.regenScroll,
  id:"regenScroll",
  name:"ใบบวก REGEN",
  icon:"📜",
  description:"ใช้ร่วมกับใบบวกในการตีบวกอุปกรณ์ และรับประกันความสำเร็จ 1 ระดับ",
  currency:null,
  price:0,
  shop:false,
  gacha:true,
  gachaWeight:0.5
};
ITEM_DATABASE.powerBreakthrough = {
  ...ITEM_DATABASE.powerBreakthrough,
  id:"powerBreakthrough",
  name:"ตราทะลวงระดับ",
  icon:"△",
  description:"ใช้คู่กับผงวิเศษในการเพิ่มระดับพลัง และรับประกันสำเร็จ 1 ระดับ",
  currency:null,
  price:0,
  shop:false,
  gacha:true,
  gachaWeight:0.5
};
ITEM_DATABASE.universePowder = {
  ...ITEM_DATABASE.universePowder,
  id:"universePowder",
  name:"ผงเฮงจักรวาล",
  icon:"🌌",
  description:"วัสดุหายากจากกล่องไอเท็ม",
  currency:null,
  price:0,
  shop:false,
  gacha:true,
  gachaWeight:0.5
};

// Force all REGEN references to the same central visual used by the actual item.
ITEM_VISUALS.regenScroll = `<span class="unified-item-icon regen-scroll-visual"><span class="regen-scroll-paper"><i></i><b></b></span></span>`;
ITEM_VISUALS.powerBreakthrough = `<span class="unified-item-icon emoji-item power-breakthrough-visual">△</span>`;
ITEM_VISUALS.universePowder = `<span class="unified-item-icon emoji-item">🌌</span>`;

state.rpgInventory = state.rpgInventory || {};
["regenScroll","powerBreakthrough","universePowder"].forEach(id=>{
  state.rpgInventory[id]=Number(state.rpgInventory[id]||0);
});

// Remove the two forbidden shop cards even if an old cached DOM is still present.
function removeV91ForbiddenShopCards(){
  ["regenScroll","powerBreakthrough"].forEach(id=>{
    document.querySelectorAll(`[data-item-visual="${id}"]`).forEach(el=>{
      const card=el.closest(".rpg-shop-item");
      if(card) card.remove();
    });
  });
}
removeV91ForbiddenShopCards();

// Weighted item chest: the three requested items are truly in the pool,
// but their weight is deliberately extremely low. No rate text is shown in UI.
itemGachaPool=function(){
  // ตู้สุ่มไอเท็มจริง: ทั้ง 3 ไอเท็มพิเศษอยู่ใน pool นี้เสมอ
  // ไม่มีการแสดงอัตราหรือความหายากบน UI
  const entries=[
    ["revivalPotion",100],["moonScroll",100],["soulHammer",100],["hpPotion",100],["manaPotion",100],
    ["enhancementScroll",100],["magicOrb",100],["magicPowder",100],
    ["regenScroll",0.5],["powerBreakthrough",0.5],["universePowder",0.5]
  ];
  return entries.map(([id,weight])=>{
    const item=getItemDef(id);
    return item?{kind:"item",id:item.id,name:item.name,icon:item.icon,note:item.description,weight}:null;
  }).filter(Boolean);
};
createItemGachaReward=function(){
  const pool=itemGachaPool();
  const total=pool.reduce((sum,p)=>sum+Math.max(0,Number(p.weight)||0),0);
  let roll=Math.random()*total;
  let p=pool[pool.length-1];
  for(const entry of pool){
    roll-=Math.max(0,Number(entry.weight)||0);
    if(roll<=0){ p=entry; break; }
  }
  return {
    type:"gacha-item",
    itemType:"item",
    itemId:p.id,
    name:p.name,
    icon:p.icon,
    note:p.note,
    qty:1
  };
};
grantItemGachaReward=function(item){
  if(item?.type==="gacha-item"){
    const def=getItemDef(item.itemId);
    if(!def)return;
    state.rpgInventory=state.rpgInventory||{};
    state.rpgInventory[def.id]=Number(state.rpgInventory[def.id]||0)+Number(item.qty||1);
    renderRpgBag();
    saveState();
    return;
  }
  ensureGachaCollection().push(item);
};

// Market source = everything that is actually in the bag, plus existing
// junk/equipment support. Registry items are no longer omitted.
getMarketItemInventory=function(){
  const result=[];
  state.rpgInventory=state.rpgInventory||{};
  Object.values(ITEM_DATABASE).forEach(def=>{
    const qty=Number(state.rpgInventory[def.id]||0);
    if(qty>0) result.push({
      id:def.id,
      name:def.name,
      icon:def.icon||"📦",
      qty,
      type:"registry",
      note:def.description||"ไอเท็ม RPG"
    });
  });

  rpg.itemInventory=rpg.itemInventory||{};
  const itemDefs=Array.isArray(window.rpgItemTypes)?window.rpgItemTypes:[];
  itemDefs.forEach(def=>{
    const qty=Number(rpg.itemInventory[def.id]||0);
    if(qty>0) result.push({id:def.id,name:def.name,icon:def.icon||"📦",qty,type:"item",note:def.note||"ไอเท็ม RPG"});
  });

  rpg.junk=rpg.junk||{};
  (rpgJunkTypes||[]).forEach(def=>{
    const qty=Number(rpg.junk[def.id]||0);
    if(qty>0) result.push({id:def.id,name:def.name,icon:def.icon||"🗑️",qty,type:"junk",note:`ขาย ${def.price ?? def.value ?? 0} 🪙 / ชิ้น`});
  });

  const groups=new Map();
  for(const item of ensureGachaCollection()){
    const key=getEquipmentMarketKey(item);
    const g=groups.get(key);
    if(g)g.qty++;
    else groups.set(key,{id:key,name:item.name,icon:item.icon||"🛡️",qty:1,type:"equipment",itemKey:key,item});
  }
  groups.forEach(g=>result.push(g));
  return result;
};

renderMarketSellOptions=function(){
  const select=document.getElementById("marketSellItem");
  if(!select)return;
  const items=getMarketItemInventory();
  if(!items.length){
    select.innerHTML='<option value="">ไม่มีไอเท็มในกระเป๋าสำหรับวางขาย</option>';
    return;
  }
  select.innerHTML=items.map(x=>{
    const extra=x.type==="equipment"
      ? ` · ${weaponStarHtml(x.item.stars,getWeaponTier(x.item))} · ⚔️${Number(x.item.baseDamage||0).toLocaleString()} 🛡️${Number(x.item.bonusDef||0).toLocaleString()} ❤️${Number(x.item.bonusHp||0).toLocaleString()}`
      : "";
    return `<option value="${x.type}:${x.id}">${x.icon} ${x.name} (มี ${x.qty})${extra}</option>`;
  }).join("");
};

// Return listed items to the exact inventory they came from.
cancelPlayerListing=function(id){
  const item=findPlayerListing(id),msg=document.getElementById("marketMessage");
  if(!item||!item.isPlayerListing||String(item.seller||"")!==String(state.username||"")){
    if(msg)msg.textContent="❌ คุณไม่มีสิทธิ์ยกเลิกรายการนี้";
    sfx("error");return;
  }
  /* confirmation handled by styled confirmation modal */

  const key=item.itemId||item.id,qty=Number(item.qty||0);
  state.rpgInventory=state.rpgInventory||{};
  rpg.itemInventory=rpg.itemInventory||{};
  rpg.junk=rpg.junk||{};
  if(item.type==="registry")state.rpgInventory[key]=Number(state.rpgInventory[key]||0)+qty;
  else if(item.type==="junk")rpg.junk[key]=Number(rpg.junk[key]||0)+qty;
  else if(item.type==="equipment"){
    const collection=ensureGachaCollection(),template=item.equipmentSnapshot||{};
    for(let n=0;n<qty;n++)collection.push({...template,id:`market-return-${Date.now()}-${Math.random().toString(36).slice(2,8)}-${n}`});
  }else rpg.itemInventory[key]=Number(rpg.itemInventory[key]||0)+qty;

  const index=playerMarketListings.findIndex(x=>String(x.id)===String(id));
  if(index>=0)playerMarketListings.splice(index,1);
  persistMarketListings();
  renderRpgBag();renderPlayerMarket();renderEquipmentBag();syncCurrencyDisplays();syncRpgHud();
  if(msg)msg.textContent=`↩️ ยกเลิกการขาย ${item.name} ×${qty} และคืนของเข้ากระเป๋าแล้ว`;
  sfx("success");
};

// Buying a registry item puts it straight into the central bag inventory.
buyPlayerListing=function(id){
  const item=playerMarketListings.find(x=>String(x.id)===String(id));
  if(!item)return;
  const msg=document.getElementById("marketMessage");
  const price=Number(item.price)||0,qty=Number(item.qty)||0;
  if(price<=0||qty<=0){if(msg)msg.textContent="❌ รายการนี้ไม่ถูกต้อง";return;}
  if(Number(state.coins||0)<price){if(msg)msg.textContent=`❌ เหรียญไม่พอ ต้องใช้ ${price.toLocaleString()} เหรียญ`;sfx("error");return;}

  state.coins-=price;
  const type=item.type||"junk",key=item.itemId||item.id;
  state.rpgInventory=state.rpgInventory||{};rpg.itemInventory=rpg.itemInventory||{};rpg.junk=rpg.junk||{};
  if(type==="registry")state.rpgInventory[key]=Number(state.rpgInventory[key]||0)+qty;
  else if(type==="equipment"){
    const collection=ensureGachaCollection(),template=item.equipmentSnapshot||{};
    for(let n=0;n<qty;n++)collection.push({...template,id:`market-${Date.now()}-${Math.random().toString(36).slice(2,8)}-${n}`,durability:100,broken:false});
  }else if(type==="junk")rpg.junk[key]=Number(rpg.junk[key]||0)+qty;
  else rpg.itemInventory[key]=Number(rpg.itemInventory[key]||0)+qty;

  const index=playerMarketListings.findIndex(x=>String(x.id)===String(id));
  if(index>=0)playerMarketListings.splice(index,1);
  persistMarketListings();
  if(msg)msg.textContent=`✅ ซื้อ ${item.name} ×${qty} สำเร็จ ใช้ ${price.toLocaleString()} เหรียญ`;
  syncCurrencyDisplays();render();renderRpgBag();renderEquipmentBag();renderPlayerMarket();syncRpgHud();syncCharacterServices();sfx("buy");
};

createPlayerListing=function(){
  const select=document.getElementById("marketSellItem"),qtyEl=document.getElementById("marketSellQty"),
        priceEl=document.getElementById("marketSellPrice"),msg=document.getElementById("marketMessage");
  if(!select||!qtyEl||!priceEl)return;
  const raw=select.value;
  if(!raw){if(msg)msg.textContent="❌ ไม่มีไอเท็มสำหรับวางขาย";return;}
  const [type,...rest]=raw.split(":"),id=rest.join(":");
  const qty=Math.max(1,Math.floor(Number(qtyEl.value)||0)),price=Math.max(1,Math.floor(Number(priceEl.value)||0));

  if(type==="equipment"){
    const collection=ensureGachaCollection(),matches=collection.filter(item=>getEquipmentMarketKey(item)===id);
    if(matches.length<qty){if(msg)msg.textContent=`❌ อุปกรณ์ซ้ำกันไม่พอ ต้องการ ${qty} แต่มี ${matches.length}`;sfx("error");return;}
    const template={...matches[0]},ids=new Set(matches.slice(0,qty).map(x=>x.id));
    state.rpgEquipmentCollection=collection.filter(x=>!ids.has(x.id));
    playerMarketListings.unshift({
      id:`player-equip-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      icon:template.icon||"🛡️",name:template.name,qty,price,
      note:`ผู้เล่น: ${state.username||"ผู้เล่น"} · ${weaponTierMeta(getWeaponTier(template)).label} · ${weaponStarHtml(getWeaponStars(template),getWeaponTier(template))}`,
      seller:state.username||"ผู้เล่น",isPlayerListing:true,type:"equipment",itemId:id,equipmentSnapshot:template
    });
  }else{
    let source=0,item=null;
    state.rpgInventory=state.rpgInventory||{};rpg.itemInventory=rpg.itemInventory||{};rpg.junk=rpg.junk||{};
    if(type==="registry"){
      source=Number(state.rpgInventory[id]||0);item=getItemDef(id);
    }else if(type==="junk"){
      source=Number(rpg.junk[id]||0);item=(rpgJunkTypes||[]).find(x=>x.id===id);
    }else{
      source=Number(rpg.itemInventory[id]||0);item=(Array.isArray(window.rpgItemTypes)?window.rpgItemTypes:[]).find(x=>x.id===id);
    }
    if(source<qty){if(msg)msg.textContent=`❌ มีไอเท็มไม่พอ ต้องการ ${qty} แต่มี ${source}`;sfx("error");return;}
    if(!item){if(msg)msg.textContent="❌ ไม่พบข้อมูลไอเท็ม";return;}
    if(type==="registry")state.rpgInventory[id]-=qty;
    else if(type==="junk")rpg.junk[id]-=qty;
    else rpg.itemInventory[id]-=qty;
    playerMarketListings.unshift({
      id:`player-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      icon:item.icon||"📦",name:item.name,qty,price,note:`ผู้เล่น: ${state.username||"ผู้เล่น"}`,
      seller:state.username||"ผู้เล่น",isPlayerListing:true,type,itemId:id
    });
  }
  persistMarketListings();saveState();renderRpgBag();renderEquipmentBag();renderPlayerMarket();syncCurrencyDisplays();syncRpgHud();syncCharacterServices();
  if(msg)msg.textContent=`📤 วางขายสำเร็จ ×${qty} ราคา ${price.toLocaleString()} 🪙`;
  sfx("success");
};

// Exact wording for the power screen.
powerEnhanceAttempt=function(useBreakthrough=false){
  const power=getActivePowerEntry();
  if(!power){alert("ยังไม่ได้ติดตั้งพลัง");return;}
  const level=Math.max(1,Math.min(10,Number(power.powerLevel||1)));
  if(level>=10){alert("⚡ พลังนี้อยู่ Power Lv.10 สูงสุดแล้ว");return;}
  const need=getPowerEnhanceNeed(level);
  if(Number(state.rpgInventory.magicPowder||0)<need){alert(`✨ ผงวิเศษไม่พอ ต้องใช้ ${need.toLocaleString()} ผง`);return;}
  if(useBreakthrough&&Number(state.rpgInventory.powerBreakthrough||0)<1){alert("△ ไม่มีตราทะลวงระดับ");return;}
  state.rpgInventory.magicPowder-=need;
  if(useBreakthrough)state.rpgInventory.powerBreakthrough--;
  const success=useBreakthrough||Math.random()*100<getPowerEnhanceChance(level);
  if(success){
    power.powerLevel=level+1;state.rpgCharacter.powerLevel=power.powerLevel;
    alert(`⚡ เพิ่มระดับพลังสำเร็จ! Power Lv.${power.powerLevel}`);
  }else{
    power.powerLevel=Math.max(1,level-1);state.rpgCharacter.powerLevel=power.powerLevel;
    alert(`⚠️ เพิ่มระดับพลังล้มเหลว ลดเหลือ Power Lv.${power.powerLevel}`);
  }
  saveState();renderPowerUpgradePanel();renderHeroRoster();renderRpgInventory();renderRpgBag();syncRpgHud();updateCharacterLobby();
};
renderPowerUpgradePanel=function(){
  const el=document.getElementById("powerUpgradeContent");if(!el)return;
  const power=getActivePowerEntry();
  if(!power){el.innerHTML='<div class="gacha-empty">ยังไม่ได้ติดตั้งพลัง</div>';return;}
  const def=POWER_DEFS[power.powerId||power.id]||POWER_DEFS.power_poison;
  const level=Math.max(1,Math.min(10,Number(power.powerLevel||1))),need=level<10?getPowerEnhanceNeed(level):0,chance=level<10?getPowerEnhanceChance(level):100;
  el.innerHTML=`
    <div class="power-upgrade-preview"><div class="power-upgrade-icon">${def.icon||power.icon||"⚡"}</div><div><small>POWER ที่กำลังติดตั้ง</small><h3>${def.name}</h3><b>Power Lv.${level}/10</b><span>${(POWER_TIER_META[def.rarity]||{}).label||def.rarity||"C"}</span></div></div>
    <div class="power-upgrade-materials">
      <div>${itemVisual("magicPowder")}<span>ผงวิเศษ</span><b>${Number(state.rpgInventory.magicPowder||0).toLocaleString()}</b></div>
      <div>${itemVisual("powerBreakthrough")}<span>ตราทะลวงระดับ</span><b>${Number(state.rpgInventory.powerBreakthrough||0).toLocaleString()}</b></div>
    </div>
    ${level>=10?`<div class="enhance-requirement">⚡ Power Lv.10 คือระดับสูงสุดของพลังนี้</div>`:
      `<div class="enhance-requirement">Power Lv.${level} → Lv.${level+1} · ใช้ ✨ ${need.toLocaleString()} ผงวิเศษ · โอกาสสำเร็จ ${chance}%</div>
       <div class="power-upgrade-actions"><button id="powerUpgradeNormalButton" class="enhance-btn">✨ เพิ่มระดับพลัง</button><button id="powerUpgradeGuaranteedButton" class="repair-weapon-btn">△ ทะลวงระดับ (สำเร็จ 100%)</button></div>
       <small class="power-upgrade-note">หากล้มเหลว พลังจะลด 1 ระดับ แต่พลังจะไม่หายและไม่แตก · ทะลวงระดับยังใช้ผงวิเศษตามระดับปกติ + ตราทะลวงระดับ 1 ชิ้น</small>`}
    <div class="power-upgrade-skill-list">${powerSkillUnlockText(def)}</div>`;
  el.querySelector("#powerUpgradeNormalButton")?.addEventListener("click",()=>powerEnhanceAttempt(false));
  el.querySelector("#powerUpgradeGuaranteedButton")?.addEventListener("click",()=>powerEnhanceAttempt(true));
};

// Existing modal opener may still hold an earlier renderer; refresh with the V91 version.
document.getElementById("characterPowerUpgradeButton")?.addEventListener("click",()=>{
  renderPowerUpgradePanel();
});

// Final sync: one visual and one inventory source everywhere.
// V95: one-time reset of currently equipped gear so the user can test equipping again.
(function resetEquippedGearForV95(){
  if(state.v95EquipmentResetDone) return;
  const bag=ensureGachaCollection();
  const equipped=state.rpgEquipment||{};
  Object.entries(equipped).forEach(([slot,item])=>{
    if(!item) return;
    const copy={...item,slot};
    if(!copy.id) copy.id=`v95-return-${slot}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    syncWeaponStarData(copy);
    if(!bag.some(x=>x.id===copy.id)) bag.push(copy);
  });
  state.rpgEquipment={};
  rpg.weapon={name:"ไม่มีอาวุธ",icon:"⚔️",level:1,stars:1,durability:100,broken:false,rarity:"NORMAL",weaponTier:"NORMAL",baseDamage:0,bonusDamage:0,bonusHp:0,bonusDef:0};
  state.v95EquipmentResetDone=true;
  equipmentBagSelectedIndex=-1;
  syncCharacterStatsFromProgress();
})();
removeV91ForbiddenShopCards();
syncUnifiedShopIcons();
renderRpgBag();
saveState();


/* V93 — Styled transaction confirmations: no important action executes immediately. */
(function installStyledConfirmations(){
  if(document.getElementById('gameConfirmModal')) return;
  const modal=document.createElement('div');
  modal.id='gameConfirmModal'; modal.className='game-confirm-modal hidden';
  modal.innerHTML=`<div class="game-confirm-backdrop"></div><div class="game-confirm-card" role="dialog" aria-modal="true"><div class="game-confirm-icon">✦</div><h3 id="gameConfirmTitle">ยืนยันการทำรายการ</h3><p id="gameConfirmMessage"></p><div class="game-confirm-actions"><button type="button" id="gameConfirmCancel" class="game-confirm-cancel">ยกเลิก</button><button type="button" id="gameConfirmOk" class="game-confirm-ok">ยืนยัน</button></div></div>`;
  document.body.appendChild(modal);
  let pending=null;
  window.confirmGameAction=function(title,message,onConfirm,okText='ยืนยัน'){
    if(typeof onConfirm!=='function')return;
    pending=onConfirm;
    modal.querySelector('#gameConfirmTitle').textContent=title||'ยืนยันการทำรายการ';
    modal.querySelector('#gameConfirmMessage').textContent=message||'คุณแน่ใจหรือไม่ว่าต้องการทำรายการนี้?';
    modal.querySelector('#gameConfirmOk').textContent=okText;
    modal.classList.remove('hidden');
    requestAnimationFrame(()=>modal.classList.add('show'));
  };
  function close(){modal.classList.remove('show');setTimeout(()=>modal.classList.add('hidden'),160);pending=null;}
  modal.querySelector('#gameConfirmCancel').onclick=close;
  modal.querySelector('.game-confirm-backdrop').onclick=close;
  modal.querySelector('#gameConfirmOk').onclick=()=>{const fn=pending;close();if(fn)fn();};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden'))close();});

  const guarded={
    itemGacha5:()=>confirmGameAction('ยืนยันการสุ่มกล่องไอเท็ม','ต้องการสุ่มกล่องไอเท็ม 5 ครั้ง ใช้ 200 💎 ใช่หรือไม่?',()=>performItemGacha(5),'ยืนยันการสุ่ม'),
    heroGacha1:()=>confirmGameAction('ยืนยันการสุ่มตัวละคร','ต้องการสุ่มตัวละคร 1 ครั้งใช่หรือไม่?',()=>performHeroGacha(1),'ยืนยันการสุ่ม'),
    heroGacha8:()=>confirmGameAction('ยืนยันการสุ่มตัวละคร','ต้องการสุ่มตัวละคร 8 ครั้งใช่หรือไม่?',()=>performHeroGacha(8),'ยืนยันการสุ่ม'),
    equipmentGacha1:()=>confirmGameAction('ยืนยันการสุ่มอุปกรณ์','ต้องการสุ่มอุปกรณ์ 1 ครั้งใช่หรือไม่?',()=>performEquipmentGacha(1),'ยืนยันการสุ่ม'),
    equipmentGacha10:()=>confirmGameAction('ยืนยันการสุ่มอุปกรณ์','ต้องการสุ่มอุปกรณ์ 10 ครั้งใช่หรือไม่?',()=>performEquipmentGacha(10),'ยืนยันการสุ่ม'),
    equipmentBagEquipButton:()=>{const item=ensureGachaCollection()[equipmentBagSelectedIndex];if(item)confirmGameAction('ยืนยันการสวมใส่อุปกรณ์',`ต้องการสวมใส่ ${item.name} ใช่หรือไม่? อุปกรณ์เดิมในช่องเดียวกันจะถูกถอดกลับเข้ากระเป๋า`,()=>equipSelectedEquipment(),'ยืนยันการสวมใส่');},
    equipmentBestSetButton:()=>confirmGameAction('ยืนยันการสวมเซตที่ดีที่สุด','ต้องการให้ระบบเลือกและสวมอุปกรณ์ที่ดีที่สุดในแต่ละช่องใช่หรือไม่? ของเดิมจะถูกเก็บกลับกระเป๋า',()=>equipBestEquipmentSet(),'ยืนยันการสวม'),
    gachaNormal1:()=>confirmGameAction('ยืนยันการสุ่ม','ต้องการเปิดกล่อง 1 ใบใช่หรือไม่?',()=>performGacha('NORMAL',1),'ยืนยันการสุ่ม'),
    gachaNormal10:()=>confirmGameAction('ยืนยันการสุ่ม','ต้องการเปิดกล่อง 10 ใบใช่หรือไม่?',()=>performGacha('NORMAL',10),'ยืนยันการสุ่ม'),
    gachaOrange1:()=>confirmGameAction('ยืนยันการสุ่ม','ต้องการเปิดกล่อง 1 ใบใช่หรือไม่?',()=>performGacha('ORANGE',1),'ยืนยันการสุ่ม'),
    gachaOrange10:()=>confirmGameAction('ยืนยันการสุ่ม','ต้องการเปิดกล่อง 10 ใบใช่หรือไม่?',()=>performGacha('ORANGE',10),'ยืนยันการสุ่ม'),
    gachaRed1:()=>confirmGameAction('ยืนยันการสุ่ม','ต้องการเปิดกล่อง 1 ใบใช่หรือไม่?',()=>performGacha('RED',1),'ยืนยันการสุ่ม'),
    gachaRed10:()=>confirmGameAction('ยืนยันการสุ่ม','ต้องการเปิดกล่อง 10 ใบใช่หรือไม่?',()=>performGacha('RED',10),'ยืนยันการสุ่ม'),
    enhanceWeaponButton:()=>confirmGameAction('ยืนยันการตีบวก','ต้องการใช้วัสดุที่เลือกเพื่อทำการตีบวกอุปกรณ์ใช่หรือไม่?',()=>enhanceWeapon(),'ยืนยันการตีบวก'),
    powerUpgradeNormalButton:()=>confirmGameAction('ยืนยันการเพิ่มระดับพลัง','ต้องการใช้ผงวิเศษเพื่อเพิ่มระดับพลังใช่หรือไม่? หากล้มเหลวระดับพลังจะลดลง 1 ระดับ',()=>powerEnhanceAttempt(false),'ยืนยันการอัพเกรด'),
    powerUpgradeGuaranteedButton:()=>confirmGameAction('ยืนยันการทะลวงระดับ','ต้องการใช้ผงวิเศษและตราทะลวงระดับ 1 ชิ้น เพื่อเพิ่มระดับพลังแบบสำเร็จ 100% ใช่หรือไม่?',()=>powerEnhanceAttempt(true),'ยืนยันการทะลวง'),
    sellRpgJunkButton:()=>confirmGameAction('ยืนยันการขายไอเท็ม','ต้องการขายไอเท็มขยะและของที่ฟาร์มได้ทั้งหมดตามรายการที่ระบบรับซื้อใช่หรือไม่?',()=>sellAllRpgJunk(),'ยืนยันการขาย'),
    characterSellJunkButton:()=>confirmGameAction('ยืนยันการขายไอเท็ม','ต้องการขายไอเท็มขยะและของที่ฟาร์มได้ทั้งหมดตามรายการที่ระบบรับซื้อใช่หรือไม่?',()=>{const main=document.getElementById('junkSellMessage');if(main)main.textContent='';sellAllRpgJunk();const msg=document.getElementById('characterJunkMessage');if(msg)msg.textContent=main?.textContent||'';renderCharacterJunk();},'ยืนยันการขาย'),
    marketCreateListing:()=>confirmGameAction('ยืนยันการวางขาย','ต้องการวางไอเท็มที่เลือกลงตลาดผู้เล่นใช่หรือไม่? ไอเท็มจะถูกหักออกจากกระเป๋าทันทีหลังยืนยัน',()=>createPlayerListing(),'ยืนยันการวางขาย')
  };
  const shopFns={buyRevivalPotion,buyMoonScroll,buySoulHammer,buyHpPotion,buyManaPotion,buyEnhancementScroll,buyMagicOrb,buyRegenScroll};
  document.addEventListener('click',function(e){
    const btn=e.target.closest('button'); if(!btn||modal.contains(btn))return;
    const id=btn.id;
    if(guarded[id]){e.preventDefault();e.stopImmediatePropagation();guarded[id]();return;}
    if(id&&shopFns[id]){e.preventDefault();e.stopImmediatePropagation();confirmGameAction('ยืนยันการซื้อ',`ต้องการซื้อ ${btn.closest('.shop-card,.shop-item,.item-card')?.querySelector('h3,b')?.textContent?.trim()||'ไอเท็มนี้'} ใช่หรือไม่?`,()=>shopFns[id](),'ยืนยันการซื้อ');return;}
    if(btn.dataset.marketId){const mid=btn.dataset.marketId;e.preventDefault();e.stopImmediatePropagation();const item=findPlayerListing(mid);confirmGameAction('ยืนยันการซื้อจากตลาด',`ต้องการซื้อ ${item?.name||'ไอเท็ม'} ×${item?.qty||1} ในราคา ${Number(item?.price||0).toLocaleString()} 🪙 ใช่หรือไม่?`,()=>buyPlayerListing(mid),'ยืนยันการซื้อ');return;}
    if(btn.dataset.marketCancel){const mid=btn.dataset.marketCancel;e.preventDefault();e.stopImmediatePropagation();const item=findPlayerListing(mid);confirmGameAction('ยืนยันการยกเลิกการขาย',`ต้องการยกเลิกการขาย ${item?.name||'รายการนี้'} ใช่หรือไม่? ไอเท็มจะถูกคืนเข้ากระเป๋า`,()=>cancelPlayerListing(mid),'ยืนยันการยกเลิก');return;}
  },true);
})();


/* V96 HOTFIX — restore all UI button clicks.
   The old death-input capture guard was attached to the whole document and could
   swallow pointer/click events for every modal when a stale deathPending state was saved.
   Remove those global pointer/click guards; death state is still handled by the death modal
   and RPG controls themselves, without blocking menus such as Equipment and Shop. */
document.removeEventListener("pointerdown", deathInputGuard, true);
document.removeEventListener("pointerup", deathInputGuard, true);
document.removeEventListener("touchstart", deathInputGuard, true);
document.removeEventListener("click", deathInputGuard, true);

(function v96RestoreUiAndClearStaleDeathLock(){
  if(!state.v96UiHotfixDone){
    // This fixes saves that were left with an old death lock even after returning to menus.
    rpg.deathPending=false;
    rpg.keys={w:false,a:false,s:false,d:false,q:false};
    state.v96UiHotfixDone=true;
    saveState();
  }
})();

/* Rebind the main menu buttons explicitly after the hotfix so their actions are guaranteed. */
document.getElementById("openInventoryButton")?.addEventListener("click",()=>openRpgModal("rpgInventoryModal"));
document.getElementById("openBagButton")?.addEventListener("click",()=>openRpgModal("rpgBagModal"));
document.getElementById("openBlacksmithButton")?.addEventListener("click",()=>openRpgModal("rpgBlacksmithModal"));
document.getElementById("openShopButton")?.addEventListener("click",()=>{
  if(rpg.inDungeon){rpg.combatLog="🛒 ร้านค้าอยู่หน้าดันเจี้ยน — เดินออกทางประตูก่อน";return;}
  openRpgModal("rpgShopModal");
});
document.getElementById("characterEquipmentButton")?.addEventListener("click",()=>openRpgModal("rpgInventoryModal"));
document.getElementById("characterEquipmentBagButton")?.addEventListener("click",()=>openRpgModal("characterEquipmentBagModal"));
document.getElementById("openEquipmentBagFromInventory")?.addEventListener("click",()=>openRpgModal("characterEquipmentBagModal"));
document.getElementById("characterBagButton")?.addEventListener("click",()=>openRpgModal("rpgBagModal"));
document.getElementById("characterShopButton")?.addEventListener("click",()=>{
  syncCurrencyDisplays();
  openRpgModal("rpgShopModal");
});


/* =========================
   V97 TOPUP + EQUIPMENT DETAIL PATCH
   ========================= */
let characterTopupPending = null;
let characterTopupMethod = "";

function openCharacterTopupMethodPicker(baht, diamonds){
  characterTopupPending={baht:Number(baht),diamonds:Number(diamonds)};
  characterTopupMethod="";
  const picker=document.getElementById("characterTopupMethodPicker");
  const selected=document.getElementById("characterTopupSelectedPackage");
  const detail=document.getElementById("characterTopupMethodDetail");
  const confirm=document.getElementById("characterTopupMethodConfirm");
  if(selected)selected.textContent=`แพ็กเกจ ฿${Number(baht).toLocaleString()} → 💎 ${Number(diamonds).toLocaleString()}`;
  if(detail)detail.textContent="เลือกช่องทางเพื่อดูข้อมูลสำหรับการชำระเงิน";
  if(confirm)confirm.disabled=true;
  document.querySelectorAll("[data-topup-method]").forEach(b=>b.classList.remove("active"));
  picker?.classList.remove("hidden");
}

function closeCharacterTopupMethodPicker(){
  characterTopupPending=null;
  characterTopupMethod="";
  document.getElementById("characterTopupMethodPicker")?.classList.add("hidden");
}

function selectCharacterTopupMethod(method){
  if(!characterTopupPending)return;
  characterTopupMethod=method;
  document.querySelectorAll("[data-topup-method]").forEach(b=>b.classList.toggle("active",b.dataset.topupMethod===method));
  const detail=document.getElementById("characterTopupMethodDetail");
  const confirm=document.getElementById("characterTopupMethodConfirm");
  if(method==="promptpay"){
    if(detail)detail.innerHTML=`<div class="topup-placeholder-qr"><div class="fake-qr">QR</div><div><b>พร้อมเพย์ / QR Code ธนาคาร</b><small>ยังไม่ใส่ QR จริงในเวอร์ชันนี้ — จะใส่ข้อมูลจริงก่อนเปิดออนไลน์</small></div></div>`;
  }else{
    if(detail)detail.innerHTML=`<div class="topup-wallet-placeholder"><div class="wallet-placeholder-icon">🧡</div><div><b>TrueMoney Wallet</b><small>ช่องข้อมูลบัญชี TrueMoney Wallet ของผู้ดูแลเกม — ยังเป็น Placeholder และยังไม่ใส่ข้อมูลจริง</small></div></div>`;
  }
  if(confirm)confirm.disabled=false;
}

function submitTopup(baht, diamonds, method=""){
  const req={
    id:Date.now(), username:state.username||"ผู้เล่น",
    baht:Number(baht), diamonds:Number(diamonds),
    method:method||"prototype", status:"pending",
    createdAt:new Date().toISOString()
  };
  state.topupRequests=Array.isArray(state.topupRequests)?state.topupRequests:[];
  state.topupRequests.push(req);
  saveState();
  closeCharacterTopupMethodPicker();
  const note=method==="promptpay"?"พร้อมเพย์ (QR Placeholder)":method==="truewallet"?"TrueMoney Wallet (Placeholder)":"โหมดต้นแบบ";
  const detail=document.getElementById("characterTopupMethodDetail");
  if(detail)detail.textContent=`สร้างคำขอเติมเงิน ฿${req.baht.toLocaleString()} → 💎 ${req.diamonds.toLocaleString()} · ${note}`;
  alert(`บันทึกคำขอเติมเงิน ฿${req.baht.toLocaleString()} → 💎 ${req.diamonds.toLocaleString()} แล้ว\nช่องทาง: ${note}\n\nเวอร์ชันนี้ยังไม่ตัดเงินจริงและยังไม่เพิ่มเพชรอัตโนมัติ`);
}

function renderDiamondPackages(){
  const boxes=[document.getElementById("diamondPackages"),document.getElementById("characterDiamondPackages")].filter(Boolean);
  boxes.forEach(box=>{
    box.innerHTML=diamondPackages.map((p,i)=>`<button type="button" class="diamond-package ${i===3?'popular':''}" data-baht="${p.baht}" data-diamonds="${p.diamonds}"><b>฿${p.baht}</b><span>💎 ${p.diamonds.toLocaleString()}</span>${i===3?'<em>แนะนำ</em>':''}</button>`).join("");
    box.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>openCharacterTopupMethodPicker(Number(b.dataset.baht),Number(b.dataset.diamonds))));
  });
}

function bindV97CharacterTopup(){
  document.querySelectorAll("[data-topup-method]").forEach(b=>{
    if(b.dataset.v97Bound)return;
    b.dataset.v97Bound="1";
    b.addEventListener("click",()=>selectCharacterTopupMethod(b.dataset.topupMethod));
  });
  const cancel=document.getElementById("characterTopupMethodCancel");
  if(cancel&&!cancel.dataset.v97Bound){cancel.dataset.v97Bound="1";cancel.addEventListener("click",closeCharacterTopupMethodPicker);}
  const confirm=document.getElementById("characterTopupMethodConfirm");
  if(confirm&&!confirm.dataset.v97Bound){confirm.dataset.v97Bound="1";confirm.addEventListener("click",()=>{
    if(!characterTopupPending||!characterTopupMethod)return;
    submitTopup(characterTopupPending.baht,characterTopupPending.diamonds,characterTopupMethod);
  });}
}
bindV97CharacterTopup();

function equipmentDetailStatsHtml(item){
  const dmg=Math.max(0,Math.round(Number(item?.baseDamage||0)+Number(item?.bonusDamage||0)));
  const def=Math.max(0,Math.round(Number(item?.bonusDef||0)));
  const hp=Math.max(0,Math.round(Number(item?.bonusHp||0)));
  const parts=[];
  if(dmg)parts.push(`⚔️ ดาเมจ +${dmg.toLocaleString()}`);
  if(def)parts.push(`🛡️ DEF +${def.toLocaleString()}`);
  if(hp)parts.push(`❤️ HP +${hp.toLocaleString()}`);
  if(!parts.length)parts.push("ไม่มีโบนัสสถานะเพิ่มเติม");
  return parts.join(" · ");
}

function renderRpgInventory(){
  syncEquipmentFromWeapon();
  const eq=state.rpgEquipment||{};
  const slotMap={head:"equipHead",body:"equipBody",arms:"equipArms",legs:"equipLegs",feet:"equipFeet",weapon:"equipWeapon"};
  for(const [key,id] of Object.entries(slotMap)){
    const el=document.getElementById(id);
    if(!el)continue;
    const item=eq[key];
    if(!item){el.textContent="—";el.title="ยังไม่ได้สวมใส่";continue;}
    el.textContent=Number(item.durability||0)<=0?"💥":item.icon;
    el.title=`${item.name} · ${equipmentDetailStatsHtml(item)} · ความทนทาน ${Number(item.durability??100)}%`;
  }

  const attack=Math.max(1,getEffectiveWeaponDamage());
  const defense=getEffectiveDefense();
  const stats=[["statHp",rpg.player.maxHp],["statMana",rpg.player.maxMana],["statAttack",attack],["statDefense",defense],["statSpeed",Math.round(rpg.player.speed)],["statLevel",rpg.player.level]];
  for(const [id,val] of stats){const el=document.getElementById(id);if(el)el.textContent=val;}

  const list=document.getElementById("equipmentList");
  if(list){
    const slotNames={head:"หมวก",body:"เกราะ",arms:"ปลอกแขน",legs:"กางเกง",feet:"รองเท้า",weapon:"อาวุธ"};
    const entries=Object.entries(eq).filter(([,item])=>item);
    list.innerHTML=entries.map(([key,item])=>{
      const broken=Number(item.durability||0)<=0;
      const tier=getWeaponTier(item),tm=weaponTierMeta(tier);
      return `<div class="equipment-row weapon-tier-${tier} ${broken?'is-broken':''}" style="--rarity-color:${tm.color}">
        <div class="equip-row-icon">${broken?"💥":item.icon}</div>
        <div class="equip-row-main"><b>${slotNames[key]||key}</b><strong>${item.name}</strong>
          <small style="color:${tm.color};font-weight:900">${tm.label} · ${weaponStarHtml(getWeaponStars(item),tier)} · ความทนทาน ${Number(item.durability??100)}%</small>
          <small class="equip-detail-stats">${equipmentDetailStatsHtml(item)}</small>
        </div>
        <div class="equip-row-status">${broken?"แตก / ใช้งานไม่ได้":"พร้อมใช้งาน"}</div>
      </div>`;
    }).join("")||`<div class="bag-empty">ยังไม่ได้สวมอุปกรณ์</div>`;
  }
  renderCharacterPowerDetailsV97();
  renderRpgBag();
  renderBlacksmith();
  updateCharacterLobby();
}

function renderCharacterPowerDetailsV97(){
  const el=document.getElementById("characterPowerDetails");
  if(!el)return;
  const power=getActivePowerDef();
  const meta=POWER_TIER_META[power.rarity]||POWER_TIER_META.C;
  const skills=Array.isArray(power.skills)?power.skills:[];
  el.innerHTML=`<div class="power-detail-head"><b>${power.icon||"⚡"} สถานะพลัง: ${power.name}</b><span>${meta.label} · ตัวคูณพลัง ×${Number(meta.multiplier||1).toLocaleString()}</span></div>
    <div class="power-skill-detail-list">${skills.map((s,i)=>`<div class="power-skill-detail"><b>${i===4?"ULT":"S"+(i+1)} · ${s.icon||"⚡"} ${s.name}</b><span>ดาเมจ ${Number(s.damage||0).toLocaleString()} · MP ${Number(s.mana||0)} · CD ${Number(s.cd||0)}วิ</span><small>${s.desc||"สกิลของพลังนี้"}</small></div>`).join("")}</div>`;
}

function cycleEquipmentSortV97(kind){
  const modes=kind==="stars"?["stars_desc","stars_asc"]:["scale_desc","scale_asc"];
  const current=equipmentBagSortMode;
  equipmentBagSortMode=modes.includes(current)?modes[(modes.indexOf(current)+1)%modes.length]:modes[0];
  equipmentBagSelectedIndex=-1;
  renderEquipmentBag();
  const label={
    stars_desc:"⭐ ดาวมาก → น้อย",stars_asc:"⭐ ดาวน้อย → มาก",
    scale_desc:"⚔️ ดาเมจมาก → น้อย",scale_asc:"⚔️ ดาเมจน้อย → มาก"
  }[equipmentBagSortMode];
  document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`↕️ ${label}`));
}
function bindV97EquipmentSort(){
  const star=document.getElementById("equipmentSortStarsButton");
  if(star&&!star.dataset.v97Bound){star.dataset.v97Bound="1";star.addEventListener("click",()=>cycleEquipmentSortV97("stars"));}
  const dmg=document.getElementById("equipmentSortDamageButton");
  if(dmg&&!dmg.dataset.v97Bound){dmg.dataset.v97Bound="1";dmg.addEventListener("click",()=>cycleEquipmentSortV97("damage"));}
}
bindV97EquipmentSort();



/* V98 — Immediate equipment stat sync.
   Equipment bonuses are the single source of truth in BOTH lobby and dungeon.
   Changing/switching gear must update HP/MP/DMG/DEF immediately; no dungeon entry is required. */
(function installV98ImmediateEquipmentStatSync(){
  const refreshAllCharacterStats=()=>{
    try{ syncCharacterStatsFromProgress(); }catch(_){}
    try{ renderRpgInventory(); }catch(_){}
    try{ updateCharacterLobby(); }catch(_){}
    try{ syncRpgHud(); }catch(_){}
  };

  // The lobby must never display the old runtime max HP/MP. Calculate from the
  // currently equipped gear every time the lobby is rendered.
  const previousUpdateCharacterLobby=updateCharacterLobby;
  updateCharacterLobby=function(){
    try{ syncCharacterStatsFromProgress(); }catch(_){}
    const result=previousUpdateCharacterLobby.apply(this,arguments);
    const hp=getEffectiveCharacterMaxHp();
    const mp=getEffectiveCharacterMaxMana();
    const dmg=getEffectiveWeaponDamage();
    const def=getEffectiveDefense();
    document.getElementById("lobbyHp")?.replaceChildren(document.createTextNode(hp.toLocaleString()));
    document.getElementById("lobbyMp")?.replaceChildren(document.createTextNode(mp.toLocaleString()));
    document.getElementById("lobbyDamage")?.replaceChildren(document.createTextNode(dmg.toLocaleString()));
    document.getElementById("lobbyDefense")?.replaceChildren(document.createTextNode(def.toLocaleString()));
    return result;
  };

  // Any direct equipment-slot update also refreshes all character stat views.
  const previousSyncEquipmentSlot=syncEquipmentSlot;
  syncEquipmentSlot=function(slot,item){
    const result=previousSyncEquipmentSlot.apply(this,arguments);
    refreshAllCharacterStats();
    return result;
  };

  // Opening equipment bag, worn-equipment, or power-change/roster pages first
  // synchronizes the same effective stats used by the dungeon.
  const previousOpenRpgModal=openRpgModal;
  openRpgModal=function(id){
    if(id==="characterEquipmentBagModal" || id==="rpgInventoryModal" ||
       id==="characterRosterModal" || id==="characterPowerUpgradeModal"){
      try{ syncCharacterStatsFromProgress(); }catch(_){}
      try{ updateCharacterLobby(); }catch(_){}
    }
    return previousOpenRpgModal.apply(this,arguments);
  };

  // Keep the power enhancement system in its own lobby service only.
  // The "เปลี่ยนพลัง" buttons continue to open the power roster and do not
  // render enhancement controls there.
  document.querySelectorAll("#openHeroRosterButton,#openPowerRosterButton").forEach(btn=>{
    btn.onclick=()=>{ try{ syncCharacterStatsFromProgress();updateCharacterLobby();renderHeroRoster(); }catch(_){} openRpgModal("characterRosterModal"); };
  });

  // If old runtime state was saved before V98, repair the displayed values now.
  try{ refreshAllCharacterStats(); saveState(); }catch(_){}
})();



/* =========================
   V99 ADMIN CONTROL CENTER — unified live config
   Local-first. Save = apply to the running game immediately.
   ========================= */
const ADMIN_KEY="farm_game_admin_config_v99";
const ADMIN_DEFAULT={
  farm:{crops:{},items:{water:{name:"น้ำ",icon:"💧",price:2,currency:"coin",enabled:true},fertilizer:{name:"ปุ๋ย",icon:"🧪",price:15,currency:"coin",enabled:true},specialWater:{name:"น้ำพิเศษ",icon:"💦",price:30,currency:"coin",enabled:true},specialFertilizer:{name:"ปุ๋ยพิเศษ",icon:"✨",price:60,currency:"coin",enabled:true}}},
  gacha:{config:JSON.parse(JSON.stringify(GACHA_CONFIG)),pools:{}},
  monsters:{modes:{forest:{name:"ป่าดงดิบ",icon:"🌲",count:6,monsters:{normal:{name:"หมาป่าดง",icon:"🐺",hp:105,attack:14,defense:3,drops:[{id:"fang",qty:1,chance:65},{id:"hide",qty:1,chance:35}]},elite:{name:"หมาป่าหัวหน้า",icon:"🐺",hp:280,attack:28,defense:8,drops:[{id:"fang",qty:2,chance:70},{id:"bone",qty:1,chance:30}]}}}}},
  items:{},
  icons:{},
  loginRewards:{}
};
function adminClone(x){return JSON.parse(JSON.stringify(x))}
function adminMergeDefaults(target,defaults){for(const k of Object.keys(defaults)){if(target[k]===undefined)target[k]=adminClone(defaults[k]);else if(target[k]&&typeof target[k]==='object'&&!Array.isArray(target[k]))adminMergeDefaults(target[k],defaults[k]);}return target}
let adminConfig=adminMergeDefaults(JSON.parse(localStorage.getItem(ADMIN_KEY)||"null")||{},adminClone(ADMIN_DEFAULT));
Object.entries(crops).forEach(([id,c])=>{adminConfig.farm.crops[id]=adminConfig.farm.crops[id]||{name:c.name,icon:c.icon,cost:c.cost,sell:c.sell,growMs:c.growMs,enabled:true,currency:"coin"}});
function loginRewardDefaults(kind){
  return adminClone(Number(kind)===7?LOGIN_REWARD_7:LOGIN_REWARD_30);
}
function ensureAdminLoginRewards(){
  adminConfig.loginRewards=adminConfig.loginRewards||{};
  [7,30].forEach(kind=>{
    const k=String(kind), activeKey=`active${k}`, pendingKey=`pending${k}`;
    if(!Array.isArray(adminConfig.loginRewards[activeKey])||adminConfig.loginRewards[activeKey].length!==kind) adminConfig.loginRewards[activeKey]=loginRewardDefaults(kind);
    if(!Array.isArray(adminConfig.loginRewards[pendingKey])||adminConfig.loginRewards[pendingKey].length!==kind) adminConfig.loginRewards[pendingKey]=adminClone(adminConfig.loginRewards[activeKey]);
  });
}
ensureAdminLoginRewards();
function loginRewardNormalizeRow(row){
  const r=row||{}; const amount=Math.max(1,Math.floor(adminNum(r.amount,1)));
  return {id:String(r.id||r.type||"coins"),type:String(r.type||"catalog"),amount,icon:String(r.icon||"🎁"),name:String(r.name||"รางวัล"),seed:r.seed||""};
}
function syncLoginRewardConfigToGame(){
  ensureAdminLoginRewards();
  LOGIN_REWARD_7=adminConfig.loginRewards.active7.map(loginRewardNormalizeRow);
  LOGIN_REWARD_30=adminConfig.loginRewards.active30.map(loginRewardNormalizeRow);
}
syncLoginRewardConfigToGame();
function buildDefaultGachaPools(){
  const out={};
  Object.keys(GACHA_POOLS).forEach(t=>out[t]=(GACHA_POOLS[t]||[]).map((x,i)=>({id:`equip:${t}:${i}:${x.name}`,source:"equipment",name:x.name,icon:x.icon,slot:x.slot,baseDamage:x.baseDamage||0,chance:Number(x.chance||Math.max(1,Math.round(100/Math.max(1,GACHA_POOLS[t].length))))})));
  return out;
}
if(!adminConfig.gacha.pools || !Object.keys(adminConfig.gacha.pools).length)adminConfig.gacha.pools=buildDefaultGachaPools();
Object.keys(GACHA_POOLS).forEach(t=>{if(!Array.isArray(adminConfig.gacha.pools[t])||!adminConfig.gacha.pools[t].length)adminConfig.gacha.pools[t]=buildDefaultGachaPools()[t]});
function adminNum(v,d=0){v=Number(v);return Number.isFinite(v)?v:d}
function adminEsc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function adminCurrency(v){return v==="diamond"?"💎":"🪙"}
function adminGet(path){return path.split('.').reduce((o,k)=>o?.[k],adminConfig)}
function adminSet(path,value){const p=path.split('.');let o=adminConfig;for(let i=0;i<p.length-1;i++){o[p[i]]=o[p[i]]??{};o=o[p[i]]}o[p.at(-1)]=value}
function adminInputType(el){if(el.type==='number')return adminNum(el.value);if(el.type==='checkbox')return el.checked;return el.value}
function adminField(label,key,value,type='text',extra=''){return `<label class="admin-field">${label}<input ${extra} data-admin-key="${key}" type="${type}" ${type==='checkbox'?(value?'checked':''): `value="${adminEsc(value)}"`}></label>`}
function adminBindInputs(root=document){root.querySelectorAll('[data-admin-key]').forEach(el=>{const f=()=>adminSet(el.dataset.adminKey,adminInputType(el));el.oninput=f;el.onchange=f})}

function adminItemCatalog(){
  const seen=new Map();
  const add=(x)=>{if(x&&!seen.has(x.id))seen.set(x.id,x)};
  Object.entries(crops).forEach(([id,x])=>add({id:`crop:${id}`,kind:"crop",sourceId:id,name:x.name,icon:x.icon,description:"ของฟาร์ม"}));
  Object.values(ITEM_DATABASE).forEach(x=>add({id:`item:${x.id}`,kind:"item",sourceId:x.id,name:x.name,icon:x.icon,description:x.description||"ไอเท็ม RPG"}));
  rpgJunkTypes.forEach(x=>add({id:`junk:${x.id}`,kind:"junk",sourceId:x.id,name:x.name,icon:x.icon,description:"วัสดุดรอป"}));
  // แอดมินต้องเห็นอุปกรณ์ทุกชิ้นครบทุกระดับ 1★-8★ เพื่อเลือกเป็นรางวัลล็อกอินได้
  // สร้างรายการจากฐานอุปกรณ์จริงแบบอัตโนมัติ ดังนั้นหากเพิ่มอุปกรณ์ใหม่ใน GACHA_POOLS
  // เมนูนี้จะดึงเข้ามาพร้อมครบทุกดาวโดยไม่ต้องแก้เมนูแอดมินอีก
  Object.entries(GACHA_POOLS).forEach(([tier,pool])=>pool.forEach((x,i)=>{
    for(let stars=1;stars<=8;stars++){
      add({
        id:`equip:${tier}:${i}:${stars}:${x.name}`,
        kind:"equipment",tier,stars,sourceId:x.name,name:`${x.name} ${"★".repeat(stars)}`,
        baseName:x.name,icon:x.icon,slot:x.slot,baseDamage:x.baseDamage||0,
        description:`อุปกรณ์ ${tier} ระดับ ${stars} ดาว`
      });
    }
  }));
  return [...seen.values()];
}
function adminFindCatalog(id){return adminItemCatalog().find(x=>x.id===id)||null}
function adminLiveItem(id){
  const base=ITEM_DATABASE[id]||{};
  return {...base,...(adminConfig.items[id]||{})};
}
function applyAdminConfig(){
  Object.entries(adminConfig.farm.crops||{}).forEach(([id,c])=>{if(crops[id])Object.assign(crops[id],c)});
  Object.assign(GACHA_CONFIG,adminConfig.gacha.config||{});
  Object.keys(GACHA_POOLS).forEach(t=>{
    const pool=(adminConfig.gacha.pools?.[t]||[]).map(x=>({...x}));
    if(pool.length)GACHA_POOLS[t]=pool.filter(x=>x.kind==="equipment"||x.source==="equipment"||x.slot).map(x=>({slot:x.slot||"weapon",name:x.name,icon:x.icon,baseDamage:adminNum(x.baseDamage),chance:adminNum(x.chance,1),adminCatalogId:x.id}));
  });
  Object.entries(adminConfig.icons||{}).forEach(([id,icon])=>{
    const cat=adminFindCatalog(id);if(cat)cat.icon=icon;
    if(id.startsWith("crop:")&&crops[id.slice(5)])crops[id.slice(5)].icon=icon;
    if(id.startsWith("junk:")){const j=rpgJunkTypes.find(x=>x.id===id.slice(5));if(j)j.icon=icon}
  });
  try{renderSeedShop();renderFarm();renderAdminDrivenRpgShop();renderRpgBag();renderRpgInventory();renderEquipmentBag();syncCurrencyDisplays();}catch(_){}
}
function weightedPick(pool){
  const total=pool.reduce((s,x)=>s+Math.max(0,adminNum(x.chance,0)),0);
  if(total<=0)return pool[Math.floor(Math.random()*pool.length)];
  let r=Math.random()*total;
  for(const x of pool){r-=Math.max(0,adminNum(x.chance,0));if(r<=0)return x}
  return pool.at(-1);
}
createGachaItem=function(tier){
  const pool=adminConfig.gacha.pools?.[tier]||[];
  const chosen=weightedPick(pool.filter(x=>x.kind==="equipment"||x.source==="equipment"||x.slot));
  if(!chosen)return {id:`gacha-${Date.now()}`,slot:"weapon",name:"ของรางวัล",icon:"🎁",weaponTier:tier,stars:1,level:1,durability:100,broken:false,rarity:"NORMAL",regenRank:0,baseDamage:0,bonusDamage:0,bonusHp:0,bonusDef:0,gachaStatModel:4};
  const stars=gachaStarRoll(),scale=stars,m=weaponTierMeta(tier).multiplier,slot=chosen.slot||"weapon";
  const baseHp=slot==="body"?18:slot==="head"?8:slot==="arms"?7:slot==="feet"?5:0;
  const baseDef=slot==="body"?12:slot==="head"?6:slot==="arms"?7:slot==="feet"?5:0;
  return {id:`gacha-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,slot,name:chosen.name,icon:chosen.icon,weaponTier:tier,stars,level:stars,durability:100,broken:false,rarity:"NORMAL",regenRank:0,baseDamage:Math.round(adminNum(chosen.baseDamage)*scale*m),bonusDamage:0,bonusHp:Math.round(baseHp*scale*m),bonusDef:Math.round(baseDef*scale*m),gachaStatModel:4};
};
/* Item-gacha is also weighted from the same central registry/config. */
itemGachaPool=function(){
  return Object.values(ITEM_DATABASE).filter(x=>x.gacha).map(x=>{const live=adminLiveItem(x.id);return {kind:"item",id:x.id,name:live.name||x.name,icon:live.icon||x.icon,note:live.description||x.description,chance:adminNum(live.gachaChance,x.gachaWeight??1)}})
};
createItemGachaReward=function(){const p=weightedPick(itemGachaPool())||itemGachaPool()[0];return {type:"gacha-item",itemType:"item",itemId:p.id,name:p.name,icon:p.icon,note:p.note,qty:1}};

function renderAdminDrivenRpgShop(){
  const grid=document.querySelector('#rpgShopModal .rpg-shop-grid');if(!grid)return;
  // V141.1: ร้านค้าต้องยึดรายการหลักเป็นหลัก เพื่อไม่ให้ค่าแอดมิน/แคชเก่าซ่อนไอเท็มใบผ่านทาง
  const items=Object.values(ITEM_DATABASE).map(base=>{
    const live=adminLiveItem(base.id)||{};
    const merged={...base,...live};
    // ใช้ค่าที่แอดมินบันทึกจริงทั้งหมด รวมถึงใบผ่านทาง: ราคา/สกุลเงิน/สถานะขาย
    return merged;
  }).filter(x=>x.shop);
  grid.innerHTML=items.map(x=>`<article class="rpg-shop-item ${x.currency==='diamond'?'shop-diamond-item':''}"><div class="shop-item-icon">${itemVisual(x.id)}</div><h3>${adminEsc(x.name)}</h3><p>${adminEsc(x.description||'')}</p><strong>${Number(x.price||0).toLocaleString()} ${adminCurrency(x.currency)} / ชิ้น</strong><div class="buy-row"><input type="number" min="1" value="1" data-admin-shop-qty="${x.id}"><button class="shop-buy-btn" data-admin-shop-buy="${x.id}" data-v141-skip-confirm="1">ซื้อ</button></div></article>`).join('');
  grid.querySelectorAll('[data-admin-shop-buy]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.adminShopBuy;
    const base=getItemDef(id)||{};
    let def={...base,...(adminLiveItem(id)||{})};
    // ใช้ค่าปัจจุบันจาก registry ที่แอดมินแก้ไว้จริง ห้ามล็อกราคาใบผ่านทาง
    let qty=Math.max(1,Math.floor(adminNum(grid.querySelector(`[data-admin-shop-qty="${id}"]`)?.value,1)));
    let cost=adminNum(def.price)*qty;
    const completePurchase=()=>{
      if(def.currency==="diamond"){if(adminNum(state.diamonds)<cost)return alert("เพชรไม่พอ");state.diamonds-=cost}else{if(adminNum(state.coins)<cost)return alert("เหรียญไม่พอ");state.coins-=cost}
      state.rpgInventory=state.rpgInventory||{};
      if(id==="challengeCoin"){
        const before=Math.max(0,Math.min(CHALLENGE_COIN_MAX,adminNum(state.rpgInventory[id])));
        const room=Math.max(0,CHALLENGE_COIN_MAX-before); const grant=Math.min(room,qty);
        if(grant<=0) return alert(`เหรียญท้าประลองเต็มแล้ว (${CHALLENGE_COIN_MAX}/${CHALLENGE_COIN_MAX})`);
        const actualCost=adminNum(def.price)*grant;
        if(def.currency==="diamond") state.diamonds+=cost-actualCost; else state.coins+=cost-actualCost;
        state.rpgInventory[id]=before+grant; state.challengeCoinLastTick=Date.now(); qty=grant; cost=actualCost;
      }else if(id==="passTicket"){
        const before=Math.max(0,Math.min(PASS_TICKET_MAX,adminNum(state.rpgInventory[id])));
        const room=Math.max(0,PASS_TICKET_MAX-before);
        const grant=Math.min(room,qty);
        if(grant<=0){ return alert(`ใบผ่านทางเต็มแล้ว (${PASS_TICKET_MAX}/${PASS_TICKET_MAX})`); }
        const actualCost=adminNum(def.price)*grant;
        if(def.currency==="diamond"){
          // Refund the excess already deducted above when the requested quantity exceeds capacity.
          state.diamonds+=cost-actualCost;
        }else{
          state.coins+=cost-actualCost;
        }
        state.rpgInventory[id]=before+grant;
        state.passTicketLastTick=Date.now();
        qty=grant; cost=actualCost;
      }else{
        state.rpgInventory[id]=adminNum(state.rpgInventory[id])+qty;
      }
      saveState();syncCurrencyDisplays();renderRpgInventory();renderRpgBag();syncPassTicketTimer();syncChallengeCoinTimer();
      const purchaseText=`✅ ซื้อสำเร็จ: ${def.name} x${qty} · ใช้ ${cost.toLocaleString()} ${adminCurrency(def.currency)}`;
      // แสดงผลสำเร็จในร้านค้าโดยตรงด้วย เพื่อให้ไอเท็มที่แอดมินเพิ่มขึ้นโชว์ข้อความเหมือนไอเท็มปกติ
      shopMsg(purchaseText);
      showActionMessage(purchaseText);
    };
    // ใช้ Modal ยืนยันของเกมเสมอ เพื่อไม่ให้ร้านค้าหลังแอดมินแก้ข้อมูลเด้งไปใช้ confirm() สีขาวของเบราว์เซอร์
    const confirmText=`ต้องการซื้อ ${def.name} x${qty} ใช่หรือไม่?\n\nราคา ${cost.toLocaleString()} ${adminCurrency(def.currency)}`;
    if(typeof window.confirmGameAction==='function'){
      window.confirmGameAction('ยืนยันการซื้อ',confirmText,completePurchase,'ยืนยัน');
    }else{
      // Fallback สำหรับกรณี UI ยืนยันยังไม่ถูกโหลด
      if(confirm(confirmText)) completePurchase();
    }
  });
}

let adminTab='overview',adminMonsterMode='forest';
function renderAdmin(){
  const box=document.getElementById('adminContent');if(!box)return;
  document.querySelectorAll('[data-admin-tab]').forEach(b=>b.classList.toggle('active',b.dataset.adminTab===adminTab));
  if(adminTab==='overview')box.innerHTML=`<div class="admin-grid"><div class="admin-card"><h3>🎰 กาชา 3 กล่อง</h3><p>ตรงกับกล่อง NORMAL / ORANGE / RED ในเกมจริง · เพิ่มไอเท็มจากคลังกลางและกำหนดอัตราออกแต่ละชิ้น</p></div><div class="admin-card"><h3>🛒 ร้านค้าแยกระบบ</h3><p>ฟาร์มและ RPG แยกกัน · แสดงไอคอนจริงและแก้ราคา/สกุลเงิน/วางขายได้</p></div><div class="admin-card"><h3>🐺 มอนสเตอร์ตามโหมด</h3><p>เลือกโหมดก่อน แล้วเลือกมอนสเตอร์ที่ต้องการแก้ HP/ATK/DEF/ดรอป/จำนวน/โอกาส</p></div></div><div class="admin-note">ทุกหน้าที่แก้จะเป็นค่า Pending จนกด “บันทึกและใช้ทันที” ด้านล่าง จากนั้นเกมที่กำลังเปิดอยู่จะเปลี่ยนตามทันที</div>`;
  else if(adminTab==='farm')renderAdminFarm(box);
  else if(adminTab==='gacha')renderAdminGacha(box);
  else if(adminTab==='monsters')renderAdminMonsters(box);
  else if(adminTab==='items')renderAdminItems(box);
  else if(adminTab==='shops')renderAdminShops(box);
  else if(adminTab==='loginRewards')renderAdminLoginRewards(box);
  adminBindInputs(box);
}
function renderAdminFarm(box){
  box.innerHTML=`<div class="admin-grid">${Object.entries(crops).map(([id,c])=>{const x=adminConfig.farm.crops[id];return `<div class="admin-card"><div class="admin-list-head"><span class="admin-icon-preview">${x.icon||c.icon}</span><b>${adminEsc(x.name||c.name)}</b></div><div class="admin-row">${adminField('ชื่อ',`farm.crops.${id}.name`,x.name)}${adminField('ราคาเมล็ด',`farm.crops.${id}.cost`,x.cost,'number','min="0"')}</div><div class="admin-row">${adminField('ราคาขาย',`farm.crops.${id}.sell`,x.sell,'number','min="0"')}${adminField('เวลาโต (ms)',`farm.crops.${id}.growMs`,x.growMs,'number','min="0"')}</div><div class="admin-row">${adminField('วางขาย',`farm.crops.${id}.enabled`,x.enabled,'checkbox')}<label class="admin-field">สกุลเงิน<select data-admin-key="farm.crops.${id}.currency"><option value="coin" ${x.currency==="coin"?"selected":""}>เหรียญ</option><option value="diamond" ${x.currency==="diamond"?"selected":""}>เพชร</option></select></label></div></div>`}).join('')}</div>`;
}
function renderAdminGacha(box){
  const catalog=adminItemCatalog();
  box.innerHTML=`<div class="admin-note">เลือกกล่องที่ต้องการแก้ → รายการด้านล่างคือไอเท็มที่อยู่ในกล่องจริงตอนนี้ กด “เพิ่มไอเท็ม” เพื่อเลือกจากคลังไอเท็มทั้งหมด แล้วกำหนดอัตราการออกของแต่ละชิ้น</div><div class="admin-grid">${Object.keys(GACHA_CONFIG).map(t=>{const cfg=adminConfig.gacha.config[t],pool=adminConfig.gacha.pools[t]||[];return `<div class="admin-card admin-gacha-card"><h3>📦 กล่อง ${t}</h3><div class="admin-row">${adminField('ราคาเหรียญ',`gacha.config.${t}.coinCost`,cfg.coinCost,'number','min="0"')}${adminField('ราคาเพชร',`gacha.config.${t}.diamondCost`,cfg.diamondCost,'number','min="0"')}</div><div class="admin-subtitle">ไอเท็มในกล่อง (${pool.length})</div><div class="admin-thumb-list">${pool.map((x,i)=>`<div class="admin-thumb-row"><span class="admin-thumb">${x.icon}</span><b>${adminEsc(x.name)}</b>${adminField('อัตราออก %',`gacha.pools.${t}.${i}.chance`,x.chance,'number','min="0" step="0.01"')}<button class="admin-mini-btn admin-danger" data-gacha-remove="${t}:${i}">ลบ</button></div>`).join('')||'<div class="admin-note">ยังไม่มีไอเท็ม</div>'}</div><button class="admin-mini-btn" data-gacha-add="${t}">＋ เพิ่มไอเท็มจากคลังทั้งหมด</button><div class="admin-picker hidden" id="gachaPicker${t}">${catalog.filter(x=>x.kind==="equipment").map(x=>`<button type="button" data-gacha-pick="${t}|${adminEsc(x.id)}"><span>${x.icon}</span>${adminEsc(x.name)}</button>`).join('')}</div></div>`}).join('')}</div>`;
  box.querySelectorAll('[data-gacha-add]').forEach(b=>b.onclick=()=>document.getElementById('gachaPicker'+b.dataset.gachaAdd).classList.toggle('hidden'));
  box.querySelectorAll('[data-gacha-pick]').forEach(b=>b.onclick=()=>{const[t,id]=b.dataset.gachaPick.split('|'),x=adminFindCatalog(id);if(!x)return;if((adminConfig.gacha.pools[t]||[]).some(z=>z.id===id))return;adminConfig.gacha.pools[t].push({id,source:"equipment",kind:"equipment",name:x.name,icon:x.icon,slot:x.slot,baseDamage:x.baseDamage||0,chance:1});renderAdmin()});
  box.querySelectorAll('[data-gacha-remove]').forEach(b=>b.onclick=()=>{const[t,i]=b.dataset.gachaRemove.split(':');adminConfig.gacha.pools[t].splice(Number(i),1);renderAdmin()});
}
function renderAdminMonsters(box){
  const modes=adminConfig.monsters.modes||{};if(!modes[adminMonsterMode])adminMonsterMode=Object.keys(modes)[0];
  const mode=modes[adminMonsterMode];
  box.innerHTML=`<div class="admin-mode-tabs">${Object.entries(modes).map(([id,x])=>`<button class="${id===adminMonsterMode?'active':''}" data-admin-mode="${id}">${x.icon||'🎮'} ${adminEsc(x.name)}</button>`).join('')}</div><div class="admin-card"><h3>${mode.icon||'🎮'} ${adminEsc(mode.name)}</h3><div class="admin-row">${adminField('ชื่อโหมด',`monsters.modes.${adminMonsterMode}.name`,mode.name)}${adminField('จำนวนมอนสเตอร์ต่อกอง',`monsters.modes.${adminMonsterMode}.count`,mode.count,'number','min="1"')}</div></div><div class="admin-grid">${Object.entries(mode.monsters||{}).map(([id,m])=>`<div class="admin-card"><h3><span class="admin-thumb">${m.icon}</span> ${adminEsc(m.name)}</h3><div class="admin-row">${adminField('ชื่อ',`monsters.modes.${adminMonsterMode}.monsters.${id}.name`,m.name)}${adminField('HP',`monsters.modes.${adminMonsterMode}.monsters.${id}.hp`,m.hp,'number','min="1"')}</div><div class="admin-row">${adminField('ATK',`monsters.modes.${adminMonsterMode}.monsters.${id}.attack`,m.attack,'number','min="0"')}${adminField('DEF',`monsters.modes.${adminMonsterMode}.monsters.${id}.defense`,m.defense,'number','min="0"')}</div><div class="admin-subtitle">ของดรอป</div>${(m.drops||[]).map((d,i)=>{const cat=adminFindCatalog(`junk:${d.id}`)||adminFindCatalog(`item:${d.id}`)||adminFindCatalog(`crop:${d.id}`);return `<div class="admin-drop-simple"><span class="admin-thumb">${cat?.icon||'🎁'}</span><b>${adminEsc(cat?.name||d.id)}</b>${adminField('จำนวน',`monsters.modes.${adminMonsterMode}.monsters.${id}.drops.${i}.qty`,d.qty,'number','min="1"')}${adminField('อัตราดรอป %',`monsters.modes.${adminMonsterMode}.monsters.${id}.drops.${i}.chance`,d.chance,'number','min="0" max="100"')}<button class="admin-mini-btn admin-danger" data-drop-remove="${id}:${i}">ลบ</button></div>`}).join('')}<button class="admin-mini-btn" data-drop-add="${id}">＋ เพิ่มของดรอป</button><div class="admin-picker hidden" id="dropPicker${id}">${adminItemCatalog().filter(x=>x.kind!=="equipment").map(x=>`<button type="button" data-drop-pick="${id}|${x.kind}:${x.sourceId}"><span>${x.icon}</span>${adminEsc(x.name)}</button>`).join('')}</div></div>`).join('')}</div>`;
  box.querySelectorAll('[data-admin-mode]').forEach(b=>b.onclick=()=>{adminMonsterMode=b.dataset.adminMode;renderAdmin()});
  box.querySelectorAll('[data-drop-add]').forEach(b=>b.onclick=()=>document.getElementById('dropPicker'+b.dataset.dropAdd).classList.toggle('hidden'));
  box.querySelectorAll('[data-drop-pick]').forEach(b=>b.onclick=()=>{const[mid,raw]=b.dataset.dropPick.split('|'),[kind,id]=raw.split(':');const key=`${kind}:${id}`,cat=adminFindCatalog(key),m=mode.monsters[mid];if(!cat)return;m.drops.push({id,qty:1,chance:10,kind});renderAdmin()});
  box.querySelectorAll('[data-drop-remove]').forEach(b=>b.onclick=()=>{const[mid,i]=b.dataset.dropRemove.split(':');mode.monsters[mid].drops.splice(Number(i),1);renderAdmin()});
}
function renderAdminItems(box){
  const all=adminItemCatalog();
  box.innerHTML=`<div class="admin-note">คลังไอเท็มกลางใช้เป็นแหล่งข้อมูลสำหรับกาชาและของดรอป เลือกรูปใหม่ได้ที่นี่ (รูปภาพ 2D ใช้ได้ทันทีในเวอร์ชันทดสอบ)</div><div class="admin-grid">${all.map((x,i)=>`<div class="admin-card"><div class="admin-list-head"><span class="admin-icon-preview" id="adminPrev${i}">${x.icon}</span><b>${adminEsc(x.name)}</b><small>${x.kind}</small></div><input type="file" accept="image/*" data-admin-upload="${x.id}" data-admin-preview="adminPrev${i}"><button class="admin-mini-btn" data-admin-reset-icon="${x.id}">คืนค่าไอคอน</button></div>`).join('')}</div>`;
  box.querySelectorAll('[data-admin-upload]').forEach(inp=>inp.onchange=()=>{const f=inp.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{adminConfig.icons[inp.dataset.adminUpload]=r.result;const el=document.getElementById(inp.dataset.adminPreview);if(el)el.innerHTML=`<img src="${r.result}" style="width:42px;height:42px;object-fit:contain">`;};r.readAsDataURL(f)});
  box.querySelectorAll('[data-admin-reset-icon]').forEach(b=>b.onclick=()=>{delete adminConfig.icons[b.dataset.adminResetIcon];renderAdmin()});
}
function renderAdminShops(box){
  const farm=adminConfig.farm.items||{},rpgItems=Object.values(ITEM_DATABASE).map(x=>adminLiveItem(x.id));
  box.innerHTML=`<div class="admin-section-title">🌱 ร้านค้าฟาร์ม</div><div class="admin-grid">${Object.entries(adminConfig.farm.crops).map(([id,x])=>`<div class="admin-card"><div class="admin-list-head"><span class="admin-thumb">${x.icon}</span><b>${adminEsc(x.name)}</b></div><div class="admin-row">${adminField('ราคา',`farm.crops.${id}.cost`,x.cost,'number','min="0"')}${adminField('วางขาย',`farm.crops.${id}.enabled`,x.enabled,'checkbox')}</div></div>`).join('')}</div><div class="admin-section-title">⚔️ ร้านค้านักผจญภัย (RPG)</div><div class="admin-grid">${rpgItems.map(x=>{const c=adminConfig.items[x.id]||{};return `<div class="admin-card"><div class="admin-list-head"><span class="admin-thumb">${itemVisual(x.id)}</span><b>${adminEsc(c.name||x.name)}</b></div><div class="admin-row">${adminField('ราคา',`items.${x.id}.price`,c.price??x.price,'number','min="0"')}${adminField('วางขาย',`items.${x.id}.shop`,c.shop??x.shop,'checkbox')}</div><label class="admin-field">สกุลเงิน<select data-admin-key="items.${x.id}.currency"><option value="coin" ${(c.currency??x.currency)==="coin"?"selected":""}>🪙 เหรียญ</option><option value="diamond" ${(c.currency??x.currency)==="diamond"?"selected":""}>💎 เพชร</option></select></label></div>`}).join('')}</div>`;
}
function renderAdminLoginRewards(box){
  ensureAdminLoginRewards();
  const catalog=[
    {id:"coins",type:"coins",name:"เหรียญ",icon:"🪙"},{id:"diamonds",type:"diamonds",name:"เพชร",icon:"💎"},
    {id:"water",type:"water",name:"น้ำ",icon:"💧"},{id:"specialWater",type:"specialWater",name:"น้ำพิเศษ",icon:"💦"},
    {id:"fertilizer",type:"fertilizer",name:"ปุ๋ย",icon:"🧪"},{id:"specialFertilizer",type:"specialFertilizer",name:"ปุ๋ยพิเศษ",icon:"✨"},
    ...adminItemCatalog().map(x=>({id:x.id,type:"catalog",name:x.name,icon:x.icon,seed:x.kind==="crop"?x.sourceId:""}))
  ];
  const option=(r)=>catalog.map(x=>`<option value="${adminEsc(x.id)}" ${x.id===r.id?'selected':''}>${x.icon} ${adminEsc(x.name)}</option>`).join('');
  const section=(kind)=>{
    const key=`pending${kind}`, rows=adminConfig.loginRewards[key];
    return `<div class="admin-card"><h3>🎁 ล็อกอิน ${kind} วัน · ชุดถัดไปหลังรีเซ็ต</h3><p>แก้ชุดนี้ล่วงหน้าได้ เมื่อครบรอบ ${kind} วัน ระบบจะสลับมาใช้ชุดนี้อัตโนมัติ</p><div class="admin-login-reward-list">${rows.map((r,i)=>`<div class="admin-login-row"><b>วันที่ ${i+1}</b><select data-login-reward-id="${kind}:${i}">${option(r)}</select><input type="number" min="1" value="${Math.max(1,Number(r.amount)||1)}" data-login-reward-amount="${kind}:${i}"><span>${r.icon} ${adminEsc(r.name)}</span></div>`).join('')}</div></div>`;
  };
  box.innerHTML=`<div class="admin-note">ควบคุมเฉพาะรางวัลล็อกอิน 7 วันและ 30 วัน · เลือกได้ทั้งเหรียญ เพชร ของฟาร์ม และไอเท็มทั้งหมดจากคลังเกม แล้วกดบันทึกเพื่อเตรียมใช้ในรอบถัดไป</div>${section(7)}${section(30)}`;
  const refreshRow=(kind,i,id,amount)=>{
    const x=catalog.find(v=>v.id===id)||catalog[0]; if(!x)return;
    adminConfig.loginRewards[`pending${kind}`][i]={id:x.id,type:x.type,seed:x.seed||"",name:x.name,icon:x.icon,amount:Math.max(1,Math.floor(Number(amount)||1))};
  };
  box.querySelectorAll('[data-login-reward-id]').forEach(el=>el.onchange=()=>{const[k,i]=el.dataset.loginRewardId.split(':');const amount=box.querySelector(`[data-login-reward-amount="${k}:${i}"]`).value;refreshRow(k,Number(i),el.value,amount);renderAdminLoginRewards(box);});
  box.querySelectorAll('[data-login-reward-amount]').forEach(el=>el.oninput=()=>{const[k,i]=el.dataset.loginRewardAmount.split(':');const id=box.querySelector(`[data-login-reward-id="${k}:${i}"]`).value;refreshRow(k,Number(i),id,el.value);});
}
function saveAdminConfig(){
  // Shop values are authoritative from adminConfig, including passTicket. Preserve every edited price/currency/shop flag exactly as entered.
  Object.values(ITEM_DATABASE).forEach(base=>{
    const c=adminConfig.items?.[base.id];
    if(!c)return;
    c.price=Math.max(0,adminNum(c.price,adminNum(base.price,0)));
    c.currency=c.currency==="diamond"?"diamond":"coin";
    c.shop=!!c.shop;
  });
  // FIX: โหมดร้านค้าแอดมินต้องส่งสถานะ "วางขาย/ราคา/สกุลเงิน" เข้า registry ของร้านค้าจริงทันที
  // เพื่อให้ติ๊กสินค้าแล้วกดบันทึก สินค้าปรากฏในหน้าร้านค้าแน่นอน
  Object.entries(adminConfig.items||{}).forEach(([id,c])=>{
    if(!ITEM_DATABASE[id])return;
    if(Object.prototype.hasOwnProperty.call(c,'shop'))ITEM_DATABASE[id].shop=!!c.shop;
    if(Object.prototype.hasOwnProperty.call(c,'price'))ITEM_DATABASE[id].price=c.price;
    if(Object.prototype.hasOwnProperty.call(c,'currency'))ITEM_DATABASE[id].currency=c.currency;
  });
  ensureAdminLoginRewards();
  localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));
  syncLoginRewardConfigToGame();
  applyAdminConfig();
  // บังคับรีเฟรชหน้าร้านทันทีหลังบันทึก แม้หน้าร้านจะเปิดค้างอยู่
  try{renderAdminDrivenRpgShop();}catch(_){}
  resetRpgPacks();
  try{saveState();syncCurrencyDisplays();}catch(_){}
  const s=document.getElementById('adminStatus');if(s){s.textContent='✅ บันทึกแล้ว · ส่งค่าเข้าเกมและใช้งานทันที';setTimeout(()=>s.textContent='พร้อมแก้ไข',2500)}
}
function adminMonsterDef(elite){const mode=adminConfig.monsters.modes?.forest||Object.values(adminConfig.monsters.modes||{})[0];return mode?.monsters?.[elite?'elite':'normal']||{hp:100,attack:10,defense:0,name:"มอนสเตอร์",icon:"🐺",drops:[]}}
makeRpgPack=function(x,y,index){const mode=adminConfig.monsters.modes?.forest||Object.values(adminConfig.monsters.modes||{})[0],count=Math.max(1,Math.round(adminNum(mode?.count,6))),mobs=[];for(let i=0;i<count;i++){const angle=(Math.PI*2/count)*i,radius=42+(i%3)*18,elite=i===0,d=adminMonsterDef(elite);mobs.push({x:x+Math.cos(angle)*radius,y:y+Math.sin(angle)*radius,homeX:x+Math.cos(angle)*radius,homeY:y+Math.sin(angle)*radius,hp:adminNum(d.hp,105),maxHp:adminNum(d.hp,105),alive:true,elite,monsterName:d.name,monsterIcon:d.icon,attack:adminNum(d.attack,0),defense:adminNum(d.defense,0),hitFlash:0,attackCd:0,aggro:false,attackAnim:0,slow:0})}return{x,y,index,mobs,respawnAt:0}}
dropRpgLoot=function(mob){
  const d=adminMonsterDef(!!mob.elite),rows=d.drops||[],row=weightedPick(rows.filter(x=>adminNum(x.chance)>0));if(!row)return `${d.icon} ${d.name} ไม่ดรอปไอเทม`;
  const qty=Math.max(1,Math.floor(adminNum(row.qty,1)));
  if(row.kind==="item"||ITEM_DATABASE[row.id]){state.rpgInventory=state.rpgInventory||{};state.rpgInventory[row.id]=adminNum(state.rpgInventory[row.id])+qty;const def=adminLiveItem(row.id);return `${d.icon} ${d.name} · ${def.icon||'🎁'} ${def.name||row.id} x${qty}`}
  if(row.kind==="crop"){state.seeds[row.id]=adminNum(state.seeds[row.id])+qty;const c=crops[row.id];return `${d.icon} ${d.name} · ${c?.icon||'🌱'} เมล็ด${c?.name||row.id} x${qty}`}
  const junk=rpgJunkTypes.find(x=>x.id===row.id)||rpgJunkTypes[0];addDungeonLoot(junk,qty,0);return `${d.icon} ${d.name} · ${junk.icon} ${junk.name} x${qty}`;
}
const __adminRenderSeedShop=renderSeedShop;
renderSeedShop=function(){const box=document.getElementById("seedShopGrid");if(!box)return;const entries=Object.entries(crops).filter(([id])=>adminConfig.farm.crops?.[id]?.enabled!==false);box.innerHTML=entries.map(([key,c])=>{const cfg=adminConfig.farm.crops?.[key]||{},price=adminNum(cfg.cost,c.cost),cur=cfg.currency||"coin";return `<div class="shop-item seed-shop-item"><div class="item-icon">${c.icon}</div><span class="item-tag">เมล็ดผัก</span><h3>เมล็ด${c.name}</h3><p>โตประมาณ ${Math.round(c.growMs/1000)} วินาที · ขาย ${c.sell} 🪙</p><button class="buy-seed" data-seed="${key}">ซื้อ ${price.toLocaleString()} ${adminCurrency(cur)}</button></div>`}).join("");box.querySelectorAll(".buy-seed").forEach(btn=>btn.onclick=()=>buySeed(btn.dataset.seed))};
document.getElementById('openAdminPanel')?.addEventListener('click',()=>{document.getElementById('adminPanel').classList.remove('hidden');renderAdmin()});
document.getElementById('adminClose')?.addEventListener('click',()=>document.getElementById('adminPanel').classList.add('hidden'));
function renderSecondaryAdmin(){const box=document.getElementById('secondaryAdminContent');if(!box)return;const floors=[1],floor=Number(document.getElementById('secondaryTowerFloor')?.value||1),rows=getTowerRewards(floor).map(x=>({...x}));box.innerHTML=`<div class="secondary-admin-tabs"><button class="active">🗼 ควบคุมหอคอย</button></div><div class="admin-note">กำหนดรางวัลของแต่ละชั้นได้หลายรายการ เพิ่มได้ไม่จำกัด ลบและเปลี่ยนได้ตลอดเวลา การกดบันทึกจะใช้กับระบบรับรางวัลของหอคอยจริงทันที</div><div class="admin-card tower-admin-card"><div class="admin-row"><label class="admin-field">เลือกหอคอย/ชั้น<select id="secondaryTowerFloor">${floors.map(f=>`<option value="${f}">🗼 หอคอย ชั้น ${f}</option>`).join('')}</select></label><button type="button" class="admin-mini-btn" id="secondaryTowerAdd">＋ เพิ่มไอเท็ม</button></div><div id="secondaryTowerRows" class="secondary-tower-rows">${rows.length?rows.map(secondaryTowerRewardRow).join(''):'<p class="secondary-empty">ยังไม่มีไอเท็ม · กด “เพิ่มไอเท็ม” เพื่อใส่รางวัล</p>'}</div><div class="secondary-admin-save"><small id="secondaryTowerStatus">แก้ไขรายการแล้วกดบันทึกเพื่อใช้กับหอคอยจริง</small><button type="button" id="secondaryTowerSave">💾 บันทึกและใช้ทันที</button></div></div>`;box.querySelector('#secondaryTowerFloor').onchange=renderSecondaryAdmin;box.querySelector('#secondaryTowerAdd').onclick=()=>{const host=box.querySelector('#secondaryTowerRows');host.querySelector('.secondary-empty')?.remove();host.insertAdjacentHTML('beforeend',secondaryTowerRewardRow({id:Object.keys(ITEM_DATABASE)[0],amount:1}));};box.querySelector('#secondaryTowerRows').addEventListener('click',e=>{const b=e.target.closest('[data-secondary-tower-remove]');if(!b)return;b.closest('[data-secondary-tower-row]').remove();if(!box.querySelector('[data-secondary-tower-row]'))box.querySelector('#secondaryTowerRows').innerHTML='<p class="secondary-empty">ยังไม่มีไอเท็ม · กด “เพิ่มไอเท็ม” เพื่อใส่รางวัล</p>';});box.querySelector('#secondaryTowerSave').onclick=()=>{const out=[...box.querySelectorAll('[data-secondary-tower-row]')].map(row=>({id:row.querySelector('[data-tower-item]').value,amount:Math.max(1,Math.floor(Number(row.querySelector('[data-tower-amount]').value)||1))}));saveTowerRewardsFromSecondaryAdmin(floor,out);try{renderTowerFloorSelect(true)}catch(_){}const st=box.querySelector('#secondaryTowerStatus');st.textContent='✅ บันทึกแล้ว · หอคอยอัปเดตและใช้รางวัลใหม่นี้ทันที';setTimeout(()=>st.textContent='แก้ไขรายการแล้วกดบันทึกเพื่อใช้กับหอคอยจริง',2500);};}
function secondaryTowerRewardRow(r){const opts=Object.values(ITEM_DATABASE).map(x=>`<option value="${x.id}" ${x.id===r.id?'selected':''}>${x.icon} ${adminEsc(x.name)}</option>`).join('');return `<div class="secondary-tower-row" data-secondary-tower-row><label>ไอเท็ม<select data-tower-item>${opts}</select></label><label>จำนวน<input data-tower-amount type="number" min="1" step="1" value="${Math.max(1,Number(r.amount)||1)}"></label><button type="button" class="admin-mini-btn admin-danger" data-secondary-tower-remove>ลบ</button></div>`;}
document.getElementById('openSecondaryAdmin')?.addEventListener('click',()=>{document.getElementById('secondaryAdminPanel').classList.remove('hidden');renderSecondaryAdmin();});
document.getElementById('secondaryAdminClose')?.addEventListener('click',()=>document.getElementById('secondaryAdminPanel').classList.add('hidden'));
document.querySelectorAll('[data-admin-tab]').forEach(b=>b.addEventListener('click',()=>{adminTab=b.dataset.adminTab;renderAdmin()}));
document.getElementById('adminSave')?.addEventListener('click',saveAdminConfig);
applyAdminConfig();

/* Farm seed shop also reads the saved admin currency/price/visibility immediately. */
buySeed=function(type){
  const crop=crops[type],cfg=adminConfig.farm.crops?.[type]||{},price=adminNum(cfg.cost,crop.cost),currency=cfg.currency||"coin";
  if(cfg.enabled===false)return;
  if(currency==="diamond"){
    if(adminNum(state.diamonds)<price){alert("เพชรไม่พอ");return}
    state.diamonds-=price;
  }else{
    if(adminNum(state.coins)<price){alert("เหรียญไม่พอ");return}
    state.coins-=price;
  }
  state.seeds[type]=adminNum(state.seeds[type])+1;saveState();render();showActionMessage(`✅ ซื้อสำเร็จ: เมล็ด${crop.name} 1 เมล็ด · ใช้ไป ${price.toLocaleString()} ${adminCurrency(currency)}`);
};


/* =========================
   V100 — GACHA ADMIN 1:1 LIVE SYNC
   Admin gacha now mirrors the three REAL gacha cabinets:
   ITEM (200💎/5), POWER (300💎/1, 600💎/8), EQUIPMENT (200💎/1, 500💎/10).
   No coin gacha. Admin and gameplay use the same box registry.
   ========================= */
(function installV100GachaAdminSync(){
  const V100_GACHA_TYPES=["item","power","equipment"];

  function v100Clone(x){return JSON.parse(JSON.stringify(x))}
  function v100NormalizeChances(list){
    const total=list.reduce((s,x)=>s+Math.max(0,Number(x.chance)||0),0);
    if(total<=0){
      const n=Math.max(1,list.length);
      list.forEach(x=>x.chance=100/n);
    }else list.forEach(x=>x.chance=(Math.max(0,Number(x.chance)||0)/total)*100);
    return list;
  }
  function v100ItemEntries(){
    return Object.values(ITEM_DATABASE).filter(x=>x.gacha).map(x=>({
      id:x.id,kind:"item",name:x.name,icon:x.icon,note:x.description||"",
      chance:Number(x.gachaWeight||1)
    }));
  }
  function v100PowerEntries(){
    const rarityChance={C:50,B:22,A:14,S:8,SS:3.5,SSPLUS:1.7,SSR:.6,REGEN:.2};
    const all=Object.values(POWER_DEFS);
    return all.map(x=>{
      const same=all.filter(y=>y.rarity===x.rarity).length||1;
      return {id:x.id,kind:"power",name:x.name,icon:x.icon,rarity:x.rarity,
        chance:(rarityChance[x.rarity]||1)/same};
    });
  }
  function v100EquipmentEntries(){
    const tiers=Object.keys(GACHA_POOLS);
    const all=[];
    tiers.forEach(t=>{
      const pool=GACHA_POOLS[t]||[], each=100/Math.max(1,tiers.length)/Math.max(1,pool.length);
      pool.forEach((x,i)=>all.push({
        id:`${t}:${i}:${x.name}`,kind:"equipment",tier:t,slot:x.slot||"weapon",
        name:x.name,icon:x.icon,baseDamage:Number(x.baseDamage||0),chance:each
      }));
    });
    return all;
  }
  function v100Defaults(){
    return {
      item:{
        id:"item",title:"🎁 ตู้สุ่มไอเท็ม",icon:"📦",
        description:"รวมไอเท็มที่ใช้ในระบบ วัสดุอัปเกรด และผงวิเศษ",
        draws:[{count:5,price:200,currency:"diamond"}],
        pool:v100NormalizeChances(v100ItemEntries())
      },
      power:{
        id:"power",title:"⚡ ตู้สุ่มพลัง",icon:"⚡",
        description:"สุ่มพลังหลัก 8 ระดับ · พลังใหม่เริ่ม Lv.1",
        draws:[{count:1,price:300,currency:"diamond"},{count:8,price:600,currency:"diamond"}],
        pool:v100NormalizeChances(v100PowerEntries())
      },
      equipment:{
        id:"equipment",title:"🔴 ตู้สุ่มอุปกรณ์",icon:"🛡️",
        description:"รวมอาวุธและชุดเกราะทุกระดับ · ดาวขาว → ดาวส้ม → ดาวแดง",
        draws:[{count:1,price:200,currency:"diamond"},{count:10,price:500,currency:"diamond"}],
        pool:v100NormalizeChances(v100EquipmentEntries())
      }
    };
  }

  // Migrate away from the incorrect V99 NORMAL/ORANGE/RED admin data.
  const defaults=v100Defaults();
  const oldBoxes=adminConfig.gacha?.boxes;
  if(!oldBoxes || !V100_GACHA_TYPES.every(k=>oldBoxes[k])){
    adminConfig.gacha={boxes:v100Clone(defaults)};
  }else{
    V100_GACHA_TYPES.forEach(k=>{
      const d=defaults[k],b=oldBoxes[k];
      b.id=k;b.title=b.title||d.title;b.icon=b.icon||d.icon;b.description=b.description||d.description;
      if(!Array.isArray(b.draws)||!b.draws.length)b.draws=v100Clone(d.draws);
      if(!Array.isArray(b.pool))b.pool=v100Clone(d.pool);
    });
    adminConfig.gacha.boxes=oldBoxes;
  }

  function v100Box(type){return adminConfig.gacha?.boxes?.[type]||defaults[type]}
  function v100Weighted(list){
    const a=(list||[]).filter(x=>(Number(x.chance)||0)>0);
    const pool=a.length?a:(list||[]);
    if(!pool.length)return null;
    const total=pool.reduce((s,x)=>s+Math.max(0,Number(x.chance)||0),0);
    if(total<=0)return pool[Math.floor(Math.random()*pool.length)];
    let r=Math.random()*total;
    for(const x of pool){r-=Math.max(0,Number(x.chance)||0);if(r<=0)return x}
    return pool[pool.length-1];
  }
  function v100Draw(type,count){
    const row=(v100Box(type).draws||[]).find(x=>Number(x.count)===Number(count));
    return row||null;
  }
  function v100Spend(draw){
    normalizeGachaCurrency();
    if(!draw)return false;
    const toMoney=v=>{const n=Number(String(v??0).replace(/,/g,"").replace(/[^0-9.-]/g,""));return Number.isFinite(n)?n:0};
    const price=Math.max(0,toMoney(draw.price));
    const currency=String(draw.currency||"diamond").toLowerCase()==="coin"?"coin":"diamond";
    const walletKey=getUnifiedWalletKey(currency);
    const balance=Math.max(0,toMoney(state[walletKey]));
    if(balance<price){
      document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`❌ ${currency==="coin"?"เหรียญ":"เพชร"}ไม่พอ (มี ${balance.toLocaleString()} / ต้องใช้ ${price.toLocaleString()})`));
      return false;
    }
    state[walletKey]=balance-price;
    return true;
  }
  function v100Money(draw){return `${Number(draw.price||0).toLocaleString()} ${draw.currency==="coin"?"🪙":"💎"}`}

  // Exact live gameplay pools, selected from the same registry edited in admin.
  itemGachaPool=function(){
    return (v100Box("item").pool||[]).map(x=>({...x,note:x.note||x.description||""}));
  };
  createItemGachaReward=function(){
    const p=v100Weighted(itemGachaPool());
    if(!p)return null;
    return {type:"gacha-item",itemType:"item",itemId:p.id,name:p.name,icon:p.icon,note:p.note||"",qty:1};
  };
  createGachaHero=function(){
    const p=v100Weighted(v100Box("power").pool||[]);
    const def=POWER_DEFS[p?.id]||POWER_DEFS.power_lightning||Object.values(POWER_DEFS)[0];
    return {
      id:`power-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,
      powerId:def.id,sourceId:def.id,name:def.name,icon:def.icon,rarity:def.rarity,
      type:"power",level:1,xp:0,nextXp:100,skills:(def.skills||[]).map(s=>({...s}))
    };
  };
  createGachaItem=function(){
    const p=v100Weighted(v100Box("equipment").pool||[]);
    if(!p)return null;
    const tier=p.tier||"NORMAL",stars=gachaStarRoll(),scale=stars,m=weaponTierMeta(tier).multiplier,slot=p.slot||"weapon";
    const baseHp=slot==="body"?18:slot==="head"?8:slot==="arms"?7:slot==="feet"?5:0;
    const baseDef=slot==="body"?12:slot==="head"?6:slot==="arms"?7:slot==="feet"?5:0;
    return {
      id:`gacha-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      slot,name:p.name,icon:p.icon,weaponTier:tier,stars,level:stars,durability:100,broken:false,
      rarity:"NORMAL",regenRank:0,
      baseDamage:Math.round(Number(p.baseDamage||0)*scale*m),bonusDamage:0,
      bonusHp:Math.round(baseHp*scale*m),bonusDef:Math.round(baseDef*scale*m),gachaStatModel:4
    };
  };

  performItemGacha=function(count){
    const draw=v100Draw("item",count);if(!v100Spend(draw))return;
    clearGachaRound();const out=[];
    for(let i=0;i<count;i++){const item=createItemGachaReward();if(item){grantItemGachaReward(item);out.push(item)}}
    saveState();syncGachaWallet();syncCurrencyDisplays();renderEquipmentBag();renderRpgInventory();renderRpgBag();
    document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`🎁 สุ่มตู้ไอเท็ม ${count} ครั้ง · ใช้ ${v100Money(draw)}`));
    if(out.length)startGachaAnimation(out);
  };
  performHeroGacha=function(count){
    const draw=v100Draw("power",count);if(!v100Spend(draw))return;
    clearGachaRound();const out=[];
    for(let i=0;i<count;i++){const hero=createGachaHero();addHeroToRoster(hero);out.push(hero)}
    saveState();syncGachaWallet();syncCurrencyDisplays();renderHeroRoster();
    document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`⚡ สุ่มพลัง ${count} ครั้ง · ใช้ ${v100Money(draw)}`));
    if(out.length)startGachaAnimation(out);
  };
  performEquipmentGacha=function(count){
    const draw=v100Draw("equipment",count);if(!v100Spend(draw))return;
    clearGachaRound();const out=[];
    for(let i=0;i<count;i++){const item=createGachaItem();if(item)out.push(item)}
    ensureGachaCollection().push(...out);
    saveState();syncGachaWallet();syncCurrencyDisplays();renderEquipmentBag();renderRpgInventory();
    document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`🛡️ สุ่มอุปกรณ์ ${count} ครั้ง · ใช้ ${v100Money(draw)}`));
    if(out.length)startGachaAnimation(out);
  };

  function v100RefreshGachaScreen(){
    const setText=(sel,text)=>{const el=document.querySelector(sel);if(el)el.textContent=text};
    const item=v100Box("item"),power=v100Box("power"),equip=v100Box("equipment");
    const i=item.draws[0],p1=power.draws[0],p8=power.draws[1],e1=equip.draws[0],e10=equip.draws[1];
    const modal=document.getElementById("characterGachaModal");if(!modal)return;
    const cards=modal.querySelectorAll(".gacha-new-card");
    if(cards[0]&&i){setText(".item-gacha-card .gacha-price-row strong",`${v100Money(i)} / ${i.count} ครั้ง`);setText("#itemGacha5",`สุ่ม ${i.count} ครั้ง · ${v100Money(i)}`)}
    if(cards[1]&&p1&&p8){
      const s=cards[1].querySelectorAll(".gacha-price-row strong");if(s[0])s[0].textContent=`${v100Money(p1)} / ${p1.count} ครั้ง`;if(s[1])s[1].textContent=`${v100Money(p8)} / ${p8.count} ครั้ง`;
      setText("#heroGacha1",`สุ่ม ${p1.count} ครั้ง · ${v100Money(p1)}`);setText("#heroGacha8",`สุ่ม ${p8.count} ครั้ง · ${v100Money(p8)}`);
    }
    if(cards[2]&&e1&&e10){
      const s=cards[2].querySelectorAll(".gacha-price-row strong");if(s[0])s[0].textContent=`${v100Money(e1)} / ${e1.count} ครั้ง`;if(s[1])s[1].textContent=`${v100Money(e10)} / ${e10.count} ครั้ง`;
      setText("#equipmentGacha1",`สุ่ม ${e1.count} ครั้ง · ${v100Money(e1)}`);setText("#equipmentGacha10",`สุ่ม ${e10.count} ครั้ง · ${v100Money(e10)}`);
    }
  }

  // Replace the old incorrect NORMAL/ORANGE/RED admin view with the real three cabinets.
  renderAdminGacha=function(box){
    const allCatalog={
      item:()=>Object.values(ITEM_DATABASE).filter(x=>x.gacha).map(x=>({id:x.id,name:x.name,icon:x.icon,note:x.description||"",kind:"item",chance:Number(x.gachaWeight||1)})),
      power:()=>Object.values(POWER_DEFS).map(x=>({id:x.id,name:x.name,icon:x.icon,kind:"power",rarity:x.rarity,chance:1})),
      equipment:()=>v100EquipmentEntries()
    };
    const card=(type)=>{
      const b=v100Box(type),pool=b.pool||[],draws=b.draws||[];
      return `<section class="admin-card admin-gacha-card v100-gacha-card">
        <h3>${adminEsc(b.title)}</h3>
        <p class="admin-gacha-live-note">ข้อมูลชุดเดียวกับหน้ากาชาเกมจริง · ใช้ ${draws.every(x=>x.currency==="diamond")?"💎 เพชร":"ราคาตามที่กำหนด"} เท่านั้นตามระบบจริง</p>
        <div class="admin-gacha-draws">${draws.map((d,i)=>`<div class="admin-row">
          ${adminField('จำนวนครั้ง',`gacha.boxes.${type}.draws.${i}.count`,d.count,'number','min="1"')}
          ${adminField('ราคา',`gacha.boxes.${type}.draws.${i}.price`,d.price,'number','min="0"')}
          <label class="admin-field">สกุลเงิน<select data-admin-key="gacha.boxes.${type}.draws.${i}.currency"><option value="diamond" ${d.currency==="diamond"?"selected":""}>💎 เพชร</option><option value="coin" ${d.currency==="coin"?"selected":""}>🪙 เหรียญ</option></select></label>
        </div>`).join("")}</div>
        <div class="admin-subtitle">ไอเท็ม/รางวัลในตู้ (${pool.length})</div>
        <div class="admin-thumb-list">${pool.map((x,i)=>`<div class="admin-thumb-row v100-pool-row">
          <span class="admin-thumb">${x.icon||"🎁"}</span><b>${adminEsc(x.name)}</b>
          ${adminField('อัตราออก %',`gacha.boxes.${type}.pool.${i}.chance`,Number(x.chance||0).toFixed(2),'number','min="0" step="0.01"')}
          <button class="admin-mini-btn admin-danger" type="button" data-v100-gacha-remove="${type}:${i}">ลบ</button>
        </div>`).join("")||'<div class="admin-note">ยังไม่มีรางวัลในตู้</div>'}</div>
        <button class="admin-mini-btn" type="button" data-v100-gacha-add="${type}">＋ เพิ่มไอเท็ม</button>
        <div class="admin-picker hidden" id="v100GachaPicker${type}">${allCatalog[type]().map(x=>`<button type="button" data-v100-gacha-pick="${type}|${adminEsc(x.id)}"><span>${x.icon||"🎁"}</span>${adminEsc(x.name)}</button>`).join("")}</div>
      </section>`;
    };
    box.innerHTML=`<div class="admin-note"><b>กาชา 3 ตู้จริงในเกม:</b> 🎁 ตู้สุ่มไอเท็ม · ⚡ ตู้สุ่มพลัง · 🛡️ ตู้สุ่มอุปกรณ์<br>ราคา จำนวนครั้ง และรางวัลด้านล่างคือข้อมูลเดียวกับที่ระบบกาชาใช้งานจริง กดบันทึกแล้วมีผลทันที</div><div class="admin-grid">${V100_GACHA_TYPES.map(card).join("")}</div>`;
    box.querySelectorAll("[data-v100-gacha-add]").forEach(btn=>btn.onclick=()=>{
      document.getElementById(`v100GachaPicker${btn.dataset.v100GachaAdd}`)?.classList.toggle("hidden");
    });
    box.querySelectorAll("[data-v100-gacha-remove]").forEach(btn=>btn.onclick=()=>{
      const [type,i]=btn.dataset.v100GachaRemove.split(":");v100Box(type).pool.splice(Number(i),1);renderAdmin();
    });
    box.querySelectorAll("[data-v100-gacha-pick]").forEach(btn=>btn.onclick=()=>{
      const [type,id]=btn.dataset.v100GachaPick.split("|");
      const x=allCatalog[type]().find(a=>a.id===id);if(!x)return;
      const b=v100Box(type);
      if(b.pool.some(a=>a.id===id)){alert("ไอเท็มนี้อยู่ในตู้นี้แล้ว");return}
      b.pool.push({...v100Clone(x),chance:1});renderAdmin();
    });
  };

  // Extend admin application: do not touch the obsolete coin-based GACHA_CONFIG.
  const previousApplyAdminConfig=applyAdminConfig;
  applyAdminConfig=function(){
    // Keep all non-gacha V99 live config behavior.
    try{previousApplyAdminConfig();}catch(_){}
    // Reassert V100 source-of-truth after old apply function runs.
    adminConfig.gacha=adminConfig.gacha||{};
    adminConfig.gacha.boxes=adminConfig.gacha.boxes||v100Clone(defaults);
    V100_GACHA_TYPES.forEach(k=>{
      const b=v100Box(k);
      if(!Array.isArray(b.pool))b.pool=[];
      b.pool.forEach(x=>x.chance=Math.max(0,Number(x.chance)||0));
      if(!Array.isArray(b.draws)||!b.draws.length)b.draws=v100Clone(defaults[k].draws);
    });
    v100RefreshGachaScreen();
  };

  // Save the new V100 data and immediately refresh the actual game.
  saveAdminConfig=function(){
    applyAdminConfig();
    localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));
    try{saveState();syncCurrencyDisplays();syncGachaWallet();}catch(_){}
    const s=document.getElementById("adminStatus");
    if(s){s.textContent="✅ บันทึกแล้ว · หน้ากาชาและระบบสุ่มใช้ข้อมูลใหม่ทันที";setTimeout(()=>s.textContent="พร้อมแก้ไข",2500)}
  };
  // Existing V99 listener captured the old function, so add the V100 handler too.
  document.getElementById("adminSave")?.addEventListener("click",()=>{saveAdminConfig();});

  applyAdminConfig();
})();

/* =========================
   V102 FIX — KEEP ALL 3 REAL GACHA BOXES + EQUIPMENT 1–8★ + UNLIMITED DUPLICATES
   ========================= */
(function installV102ThreeBoxGachaAdmin(){
  const V102_TYPES=["item","power","equipment"];
  const clone=x=>JSON.parse(JSON.stringify(x));

  function equipmentBaseCatalog(){
    const out=[];
    Object.entries(GACHA_POOLS||{}).forEach(([tier,pool])=>{
      (pool||[]).forEach((x,i)=>out.push({
        id:`${tier}:${i}:${x.name}`,kind:"equipment",tier,slot:x.slot||"weapon",
        name:x.name,icon:x.icon,baseDamage:Number(x.baseDamage||0)
      }));
    });
    return out;
  }
  function equipmentCatalog(){
    const out=[];
    equipmentBaseCatalog().forEach(x=>{
      for(let stars=1;stars<=8;stars++){
        out.push({...x,id:`${x.id}:star:${stars}`,fixedStars:stars});
      }
    });
    return out;
  }
  function catalogFor(type){
    if(type==="item")return Object.values(ITEM_DATABASE).filter(x=>x.gacha).map(x=>({
      id:x.id,kind:"item",name:x.name,icon:x.icon,note:x.description||"",chance:Number(x.gachaWeight||1)
    }));
    if(type==="power")return Object.values(POWER_DEFS).map(x=>({
      id:x.id,kind:"power",name:x.name,icon:x.icon,rarity:x.rarity,chance:1
    }));
    return equipmentCatalog();
  }
  function boxFor(type){return adminConfig?.gacha?.boxes?.[type];}
  function weighted(list){
    const all=(list||[]).filter(x=>Number(x.chance||0)>0);
    const pool=all.length?all:(list||[]); if(!pool.length)return null;
    const total=pool.reduce((s,x)=>s+Math.max(0,Number(x.chance)||0),0);
    if(total<=0)return pool[Math.floor(Math.random()*pool.length)];
    let r=Math.random()*total;
    for(const x of pool){r-=Math.max(0,Number(x.chance)||0);if(r<=0)return x;}
    return pool[pool.length-1];
  }

  // Equipment gameplay uses the exact star selected by Admin.
  createGachaItem=function(){
    const p=weighted(boxFor("equipment")?.pool||[]); if(!p)return null;
    const tier=WEAPON_TIER_META[p.tier]?p.tier:"NORMAL";
    const stars=Math.max(1,Math.min(8,Number(p.fixedStars??p.stars??gachaStarRoll())));
    const scale=stars,m=weaponTierMeta(tier).multiplier,slot=p.slot||"weapon";
    const baseHp=slot==="body"?18:slot==="head"?8:slot==="arms"?7:slot==="feet"?5:0;
    const baseDef=slot==="body"?12:slot==="head"?6:slot==="arms"?7:slot==="feet"?5:0;
    return {id:`gacha-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      slot,name:p.name,icon:p.icon,weaponTier:tier,stars,level:stars,durability:100,broken:false,
      rarity:"NORMAL",regenRank:0,baseDamage:Math.round(Number(p.baseDamage||0)*scale*m),bonusDamage:0,
      bonusHp:Math.round(baseHp*scale*m),bonusDef:Math.round(baseDef*scale*m),gachaStatModel:4};
  };

  function pickerLabel(x,type){
    if(type==="equipment")return `${adminEsc(x.name)} <b>${"★".repeat(x.fixedStars)}</b>`;
    return adminEsc(x.name);
  }
  function poolLabel(x,type){
    if(type==="equipment"){
      const stars=Math.max(1,Math.min(8,Number(x.fixedStars||x.stars||1)));
      return `${adminEsc(x.name)} · ${"★".repeat(stars)}`;
    }
    return adminEsc(x.name);
  }

  // IMPORTANT: render all three real cabinets. Only the equipment cabinet gets 1–8★ variants.
  renderAdminGacha=function(box){
    // Recover all three boxes if an old/broken admin save is loaded.
    if(!adminConfig.gacha)adminConfig.gacha={};
    if(!adminConfig.gacha.boxes)adminConfig.gacha.boxes={};
    V102_TYPES.forEach(type=>{
      if(!adminConfig.gacha.boxes[type]){
        const fallback={
          item:{id:"item",title:"🎁 ตู้สุ่มไอเท็ม",icon:"📦",description:"",draws:[{count:5,price:200,currency:"diamond"}],pool:catalogFor("item")},
          power:{id:"power",title:"⚡ ตู้สุ่มพลัง",icon:"⚡",description:"",draws:[{count:1,price:300,currency:"diamond"},{count:8,price:600,currency:"diamond"}],pool:catalogFor("power")},
          equipment:{id:"equipment",title:"🔴 ตู้สุ่มอุปกรณ์",icon:"🛡️",description:"",draws:[{count:1,price:200,currency:"diamond"},{count:10,price:500,currency:"diamond"}],pool:equipmentCatalog()}
        };
        adminConfig.gacha.boxes[type]=clone(fallback[type]);
      }
      const b=boxFor(type); if(!Array.isArray(b.pool))b.pool=[]; if(!Array.isArray(b.draws))b.draws=[];
    });

    const card=type=>{
      const b=boxFor(type),pool=b.pool||[],draws=b.draws||[],catalog=catalogFor(type);
      const addText=type==="equipment"?"＋ เพิ่มอุปกรณ์ (1★–8★)":"＋ เพิ่มรางวัล";
      return `<section class="admin-card admin-gacha-card v100-gacha-card">
        <h3>${adminEsc(b.title)}</h3>
        <p class="admin-gacha-live-note">${type==="equipment"?"เลือกอุปกรณ์ทุกชิ้นได้ตั้งแต่ 1★ ถึง 8★ และเพิ่มชิ้นเดิม/ดาวเดิมซ้ำได้ไม่จำกัด":type==="item"?"ไอเท็มทั้งหมดในระบบกาชาเกมจริง":"พลังทั้งหมดในระบบเกมจริง"}</p>
        <div class="admin-gacha-draws">${draws.map((d,i)=>`<div class="admin-row">
          ${adminField('จำนวนครั้ง',`gacha.boxes.${type}.draws.${i}.count`,d.count,'number','min="1"')}
          ${adminField('ราคา',`gacha.boxes.${type}.draws.${i}.price`,d.price,'number','min="0"')}
          <label class="admin-field">สกุลเงิน<select data-admin-key="gacha.boxes.${type}.draws.${i}.currency"><option value="diamond" ${d.currency==="diamond"?"selected":""}>💎 เพชร</option><option value="coin" ${d.currency==="coin"?"selected":""}>🪙 เหรียญ</option></select></label>
        </div>`).join("")}</div>
        <div class="admin-subtitle">รางวัลที่อยู่ในกล่องตอนนี้ (${pool.length})</div>
        <div class="admin-thumb-list">${pool.map((x,i)=>`<div class="admin-thumb-row v100-pool-row">
          <span class="admin-thumb">${x.icon||"🎁"}</span><b>${poolLabel(x,type)}</b>
          ${adminField('อัตราออก %',`gacha.boxes.${type}.pool.${i}.chance`,Number(x.chance||0).toFixed(2),'number','min="0" step="0.01"')}
          <button class="admin-mini-btn admin-danger" type="button" data-v102-remove="${type}:${i}">ลบ</button>
        </div>`).join("")||'<div class="admin-note">ยังไม่มีรางวัลในกล่อง</div>'}</div>
        <button class="admin-mini-btn" type="button" data-v102-add="${type}">${addText}</button>
        <div class="admin-picker hidden" id="v102Picker${type}">${catalog.map(x=>`<button type="button" data-v102-pick="${type}|${adminEsc(x.id)}"><span>${x.icon||"🎁"}</span>${pickerLabel(x,type)}</button>`).join("")}</div>
      </section>`;
    };
    box.innerHTML=`<div class="admin-note"><b>กาชา 3 กล่องจริงของเกม:</b> 🎁 ตู้สุ่มไอเท็ม · ⚡ ตู้สุ่มพลัง · 🛡️ ตู้สุ่มอุปกรณ์<br><b>ทั้ง 3 กล่องยังอยู่ครบ</b> และตู้สุ่มอุปกรณ์สามารถเพิ่มทุกอุปกรณ์แบบ 1★–8★ ซ้ำได้ไม่จำกัด</div><div class="admin-grid">${V102_TYPES.map(card).join("")}</div>`;
    adminBindInputs(box);
    box.querySelectorAll('[data-v102-add]').forEach(btn=>btn.onclick=()=>{
      document.getElementById(`v102Picker${btn.dataset.v102Add}`)?.classList.toggle('hidden');
    });
    box.querySelectorAll('[data-v102-remove]').forEach(btn=>btn.onclick=()=>{
      const [type,i]=btn.dataset.v102Remove.split(':');boxFor(type).pool.splice(Number(i),1);renderAdmin();
    });
    box.querySelectorAll('[data-v102-pick]').forEach(btn=>btn.onclick=()=>{
      const [type,id]=btn.dataset.v102Pick.split('|');
      const x=catalogFor(type).find(a=>a.id===id);if(!x)return;
      // No duplicate check: Admin can add the same reward repeatedly to any box.
      boxFor(type).pool.push({...clone(x),chance:1,instanceId:`admin-${Date.now()}-${Math.random().toString(36).slice(2,9)}`});
      renderAdmin();
    });
  };
})();

/* =========================
   V103 FIX — UNIVERSAL GACHA CATALOG FOR ALL 3 BOXES
   Every cabinet can independently contain any reward registered in the game:
   normal items, powers, and equipment 1★–8★. Duplicates are unlimited.
   ========================= */
(function installV103UniversalThreeBoxGacha(){
  const TYPES=["item","power","equipment"];
  const clone=x=>JSON.parse(JSON.stringify(x));
  const esc=s=>adminEsc(String(s??""));

  function allEquipment(){
    const out=[];
    Object.entries(GACHA_POOLS||{}).forEach(([tier,pool])=>{
      (pool||[]).forEach((x,i)=>{
        for(let stars=1;stars<=8;stars++){
          out.push({
            id:`equipment:${tier}:${i}:${x.name}:star:${stars}`,
            rewardType:"equipment",kind:"equipment",tier,slot:x.slot||"weapon",
            name:x.name,icon:x.icon||"🛡️",baseDamage:Number(x.baseDamage||0),
            fixedStars:stars,chance:1
          });
        }
      });
    });
    return out;
  }
  function allRegistryItems(){
    return Object.values(ITEM_DATABASE||{}).map(x=>({
      id:`item:${x.id}`,rewardType:"item",kind:"item",itemId:x.id,
      name:x.name||x.id,icon:x.icon||"🎁",note:x.description||"",chance:1
    }));
  }
  function allPowers(){
    return Object.values(POWER_DEFS||{}).map(x=>({
      id:`power:${x.id}`,rewardType:"power",kind:"power",powerId:x.id,
      name:x.name||x.id,icon:x.icon||"⚡",rarity:x.rarity||"C",chance:1
    }));
  }
  function universalCatalog(){return [...allRegistryItems(),...allPowers(),...allEquipment()];}
  function boxFor(type){return adminConfig?.gacha?.boxes?.[type];}
  function weighted(list){
    const src=(list||[]).filter(x=>Number(x.chance||0)>0);
    const pool=src.length?src:(list||[]); if(!pool.length)return null;
    const total=pool.reduce((s,x)=>s+Math.max(0,Number(x.chance)||0),0);
    if(total<=0)return pool[Math.floor(Math.random()*pool.length)];
    let r=Math.random()*total;
    for(const x of pool){r-=Math.max(0,Number(x.chance)||0);if(r<=0)return x;}
    return pool[pool.length-1];
  }
  function entryLabel(x){
    const tag=x.rewardType==="item"?"🎁 ไอเท็ม":x.rewardType==="power"?"⚡ พลัง":`🛡️ อุปกรณ์ ${"★".repeat(Math.max(1,Math.min(8,Number(x.fixedStars||1))))}`;
    return `${esc(x.name)} <small class="v103-reward-type">${tag}</small>`;
  }
  function pickerLabel(x){
    const tag=x.rewardType==="item"?"🎁":x.rewardType==="power"?"⚡":"🛡️";
    const stars=x.rewardType==="equipment"?` ${"★".repeat(x.fixedStars)}`:"";
    return `${tag} ${esc(x.name)}${stars}`;
  }

  function normalizeEntry(x){
    // Convert older V100/V102 entries when they are already in a box, without deleting them.
    if(x.rewardType)return x;
    if(x.kind==="power"||x.powerId)return {...x,rewardType:"power",powerId:x.powerId||x.id?.replace(/^power:/,"")};
    if(x.kind==="equipment"||x.slot||x.fixedStars!=null||x.tier)return {...x,rewardType:"equipment",fixedStars:Math.max(1,Math.min(8,Number(x.fixedStars||x.stars||1)))};
    return {...x,rewardType:"item",itemId:x.itemId||x.id?.replace(/^item:/,"")||x.id};
  }

  // ADMIN: the exact same universal picker is available in ALL THREE cabinets.
  renderAdminGacha=function(box){
    adminConfig.gacha=adminConfig.gacha||{};
    adminConfig.gacha.boxes=adminConfig.gacha.boxes||{};
    const defaults={
      item:{id:"item",title:"🎁 ตู้สุ่มไอเท็ม",draws:[{count:5,price:200,currency:"diamond"}],pool:[]},
      power:{id:"power",title:"⚡ ตู้สุ่มพลัง",draws:[{count:1,price:300,currency:"diamond"},{count:8,price:600,currency:"diamond"}],pool:[]},
      equipment:{id:"equipment",title:"🔴 ตู้สุ่มอุปกรณ์",draws:[{count:1,price:200,currency:"diamond"},{count:10,price:500,currency:"diamond"}],pool:[]}
    };
    TYPES.forEach(type=>{
      if(!adminConfig.gacha.boxes[type])adminConfig.gacha.boxes[type]=clone(defaults[type]);
      const b=boxFor(type);
      if(!Array.isArray(b.pool))b.pool=[];
      b.pool=b.pool.map(normalizeEntry);
      if(!Array.isArray(b.draws)||!b.draws.length)b.draws=clone(defaults[type].draws);
    });
    const catalog=universalCatalog();
    const card=type=>{
      const b=boxFor(type),pool=b.pool||[];
      return `<section class="admin-card admin-gacha-card v100-gacha-card v103-gacha-card">
        <h3>${esc(b.title)}</h3>
        <p class="admin-gacha-live-note"><b>เลือกได้ทุกอย่างเหมือนกันทั้ง 3 ตู้</b> — ไอเท็มทุกชิ้นในเกม · พลังทุกชนิด · อุปกรณ์ทุกชิ้น 1★–8★ และเพิ่มซ้ำได้ไม่จำกัด</p>
        <div class="admin-gacha-draws">${(b.draws||[]).map((d,i)=>`<div class="admin-row">
          ${adminField('จำนวนครั้ง',`gacha.boxes.${type}.draws.${i}.count`,d.count,'number','min="1"')}
          ${adminField('ราคา',`gacha.boxes.${type}.draws.${i}.price`,d.price,'number','min="0"')}
          <label class="admin-field">สกุลเงิน<select data-admin-key="gacha.boxes.${type}.draws.${i}.currency"><option value="diamond" ${d.currency==="diamond"?"selected":""}>💎 เพชร</option><option value="coin" ${d.currency==="coin"?"selected":""}>🪙 เหรียญ</option></select></label>
        </div>`).join("")}</div>
        <div class="admin-subtitle">รางวัลในกล่องนี้ (${pool.length})</div>
        <div class="admin-thumb-list">${pool.map((x,i)=>`<div class="admin-thumb-row v100-pool-row"><span class="admin-thumb">${x.icon||"🎁"}</span><b>${entryLabel(x)}</b>${adminField('อัตราออก %',`gacha.boxes.${type}.pool.${i}.chance`,Number(x.chance||0).toFixed(2),'number','min="0" step="0.01"')}<button class="admin-mini-btn admin-danger" type="button" data-v103-remove="${type}:${i}">ลบ</button></div>`).join("")||'<div class="admin-note">ยังไม่มีรางวัลในกล่อง</div>'}</div>
        <button class="admin-mini-btn" type="button" data-v103-add="${type}">＋ เพิ่มรางวัลจากไอเท็มทั้งหมดในเกม</button>
        <div class="admin-picker hidden" id="v103Picker${type}">${catalog.map(x=>`<button type="button" data-v103-pick="${type}|${esc(x.id)}"><span>${x.icon||"🎁"}</span>${pickerLabel(x)}</button>`).join("")}</div>
      </section>`;
    };
    box.innerHTML=`<div class="admin-note"><b>กาชา 3 กล่อง:</b> 🎁 ตู้สุ่มไอเท็ม · ⚡ ตู้สุ่มพลัง · 🛡️ ตู้สุ่มอุปกรณ์<br><b>ทั้งสามกล่องใช้คลังรางวัลเดียวกันทั้งหมด</b> คุณเลือกของชิ้นใดก็ได้ในเกมใส่กล่องใดก็ได้ และเพิ่มชิ้นเดิมซ้ำได้ไม่จำกัด</div><div class="admin-grid">${TYPES.map(card).join("")}</div>`;
    adminBindInputs(box);
    box.querySelectorAll('[data-v103-add]').forEach(btn=>btn.onclick=()=>document.getElementById(`v103Picker${btn.dataset.v103Add}`)?.classList.toggle('hidden'));
    box.querySelectorAll('[data-v103-remove]').forEach(btn=>btn.onclick=()=>{const [type,i]=btn.dataset.v103Remove.split(':');boxFor(type).pool.splice(Number(i),1);renderAdmin();});
    box.querySelectorAll('[data-v103-pick]').forEach(btn=>btn.onclick=()=>{
      const [type,id]=btn.dataset.v103Pick.split('|');
      const x=catalog.find(a=>a.id===id);if(!x)return;
      // Deliberately NO duplicate restriction.
      boxFor(type).pool.push({...clone(x),chance:1,instanceId:`admin-${Date.now()}-${Math.random().toString(36).slice(2,9)}`});
      renderAdmin();
    });
  };

  function rewardFromEntry(entry){
    const p=normalizeEntry(entry);
    if(p.rewardType==="power"){
      const def=POWER_DEFS[p.powerId];if(!def)return null;
      return {id:`power-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,powerId:def.id,sourceId:def.id,name:def.name,icon:def.icon,rarity:def.rarity,type:"power",level:1,xp:0,nextXp:100,skills:(def.skills||[]).map(s=>({...s}))};
    }
    if(p.rewardType==="equipment"){
      const stars=Math.max(1,Math.min(8,Number(p.fixedStars||p.stars||1))),tier=WEAPON_TIER_META[p.tier]?p.tier:"NORMAL",scale=stars,m=weaponTierMeta(tier).multiplier,slot=p.slot||"weapon";
      const baseHp=slot==="body"?18:slot==="head"?8:slot==="arms"?7:slot==="feet"?5:0;
      const baseDef=slot==="body"?12:slot==="head"?6:slot==="arms"?7:slot==="feet"?5:0;
      return {id:`gacha-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,slot,name:p.name,icon:p.icon,weaponTier:tier,stars,level:stars,durability:100,broken:false,rarity:"NORMAL",regenRank:0,baseDamage:Math.round(Number(p.baseDamage||0)*scale*m),bonusDamage:0,bonusHp:Math.round(baseHp*scale*m),bonusDef:Math.round(baseDef*scale*m),gachaStatModel:4};
    }
    const def=getItemDef(p.itemId);if(!def)return null;
    return {type:"gacha-item",itemType:"item",itemId:def.id,name:def.name,icon:def.icon,note:def.description||"",qty:1};
  }
  function drawUniversal(type){return rewardFromEntry(weighted(boxFor(type)?.pool||[]));}
  function grantUniversal(reward){
    if(!reward)return;
    if(reward.type==="power"){addHeroToRoster(reward);return;}
    if(reward.type==="gacha-item"){grantItemGachaReward(reward);return;}
    ensureGachaCollection().push(reward);
  }
  // V107.1 — กาชาใช้กระเป๋าเงินกลาง state เดียวกับแถบด้านบนเสมอ
  // รองรับค่าที่ถูกเก็บเป็นข้อความ เช่น "500,000,000" เพื่อไม่ให้เกิดการเทียบค่าเพี้ยน
  function spendDraw(type,count){
    normalizeGachaCurrency();
    const b=boxFor(type);
    const d=(b?.draws||[]).find(x=>Number(x.count)===Number(count));
    if(!d){
      document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode("❌ ไม่พบราคาสำหรับจำนวนครั้งที่เลือก"));
      return null;
    }
    const toMoney=(v)=>{
      if(typeof v==="number") return Number.isFinite(v)?v:0;
      const n=Number(String(v??0).replace(/,/g,"").replace(/[^0-9.-]/g,""));
      return Number.isFinite(n)?n:0;
    };
    const price=Math.max(0,toMoney(d.price));
    const currency=String(d.currency||"diamond").toLowerCase()==="coin"?"coin":"diamond";
    const walletKey=getUnifiedWalletKey(currency);
    const balance=Math.max(0,toMoney(state[walletKey]));
    if(balance<price){
      document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`❌ ${currency==="coin"?"เหรียญ":"เพชร"}ไม่พอ (มี ${balance.toLocaleString()} / ต้องใช้ ${price.toLocaleString()})`));
      return null;
    }
    state[walletKey]=balance-price;
    return {...d,price,currency};
  }
  function runUniversal(type,count,label){
    const draw=spendDraw(type,count);if(!draw)return;
    clearGachaRound();const out=[];
    for(let i=0;i<count;i++){const reward=drawUniversal(type);if(reward){grantUniversal(reward);out.push(reward);}}
    saveState();syncGachaWallet();syncCurrencyDisplays();renderEquipmentBag();renderRpgInventory();renderRpgBag();renderHeroRoster();
    document.getElementById("gachaMessage")?.replaceChildren(document.createTextNode(`${label} สุ่ม ${count} ครั้ง · ใช้ ${draw.currency==="coin"?"🪙":"💎"} ${draw.price.toLocaleString()}`));
    if(out.length)startGachaAnimation(out);
  }
  performItemGacha=function(count){runUniversal("item",count,"🎁 ตู้สุ่มไอเท็ม")};
  performHeroGacha=function(count){runUniversal("power",count,"⚡ ตู้สุ่มพลัง")};
  performEquipmentGacha=function(count){runUniversal("equipment",count,"🛡️ ตู้สุ่มอุปกรณ์")};
})();


/* V102 — VOLCANO DUNGEON: first advanced world, ranged/skill monsters and sellable junk */
(function(){
  const ZONES={
    jungle:{id:'jungle',name:'ป่าดงดิบ',icon:'🌲',kicker:'ACTION RPG — JUNGLE',subtitle:'มอนสเตอร์ระดับเริ่มต้น · พื้นที่ฝึกต่อสู้'},
    volcano:{id:'volcano',name:'ภูเขาไฟ',icon:'🌋',kicker:'ACTION RPG — VOLCANO',subtitle:'ศัตรูแข็งแกร่ง · มีโจมตีระยะไกล · สกิลธาตุไฟ · บอส'},
    desert:{id:'desert',name:'ทะเลทราย',icon:'🏜️',kicker:'ACTION RPG — DESERT',subtitle:'สัตว์อสูรทะเลทราย · พิษ · พายุทราย · บอสแมงป่อง'},
    sea:{id:'sea',name:'ใต้ท้องทะเล',icon:'🌊',kicker:'ACTION RPG — DEEP SEA',subtitle:'อสูรทะเลลึก · สกิลคลื่นน้ำ · คูลดาวน์สกิล · บอสแห่งร่องลึก'},
    space:{id:'space',name:'อวกาศ',icon:'🪐',kicker:'ACTION RPG — DEEP SPACE',subtitle:'อสูรจักรวาล · เลเซอร์ · แรงโน้มถ่วง · ซูเปอร์โนวา · บอสแห่งห้วงอวกาศ'},
    tower:{id:'tower',name:'หอคอยชั้น 1',icon:'🗼',kicker:'TOWER — FLOOR 1',subtitle:'เมืองรัตติกาล · ธีมฮาโลวีน · มอนสเตอร์ 5 ชนิด'}
  };
  rpg.currentZone=rpg.currentZone||'jungle';
  const newJunk=[
    {id:'charredBone',name:'กระดูกไหม้',icon:'🦴',price:24},
    {id:'lavaShard',name:'เศษลาวา',icon:'🟥',price:32},
    {id:'burntHide',name:'หนังเกรียม',icon:'🟤',price:38},
    {id:'emberCore',name:'แก่นเพลิงแตก',icon:'🔶',price:55},
    {id:'obsidianScrap',name:'เศษออบซิเดียน',icon:'⬛',price:72},
    {id:'flameCrystal',name:'ผลึกเพลิงร้าว',icon:'🔸',price:110},
    {id:'scorpionShell',name:'เปลือกแมงป่องแตก',icon:'🦂',price:34},
    {id:'sandFang',name:'เขี้ยวทราย',icon:'🦷',price:42},
    {id:'desertHide',name:'หนังอสูรทะเลทราย',icon:'🟫',price:55},
    {id:'cactusFiber',name:'เส้นใยกระบองเพชร',icon:'🌵',price:68},
    {id:'ancientRelic',name:'เศษวัตถุโบราณ',icon:'🏺',price:95},
    {id:'sunCrystal',name:'ผลึกสุริยันแตกร้าว',icon:'🔆',price:135},
    {id:'wetScale',name:'เกล็ดเปียกชื้น',icon:'🐟',price:145},
    {id:'coralScrap',name:'เศษปะการังแตก',icon:'🪸',price:165},
    {id:'barnacleShell',name:'เปลือกเพรียงเก่า',icon:'🐚',price:185},
    {id:'deepSeaInk',name:'หมึกทะเลลึก',icon:'🖤',price:220},
    {id:'sharkTooth',name:'ฟันฉลามบิ่น',icon:'🦈',price:260},
    {id:'abyssPearl',name:'ไข่มุกแห่งร่องลึก',icon:'🔵',price:340}
  ];
  for(const j of newJunk) if(!rpgJunkTypes.some(x=>x.id===j.id)) rpgJunkTypes.push(j);
  rpg.junk=rpg.junk||{}; for(const j of rpgJunkTypes) rpg.junk[j.id]=Number(rpg.junk[j.id]||0);

  // Add volcano data to Admin monster configuration without removing the original jungle.
  adminConfig.monsters=adminConfig.monsters||{modes:{}};
  adminConfig.monsters.modes=adminConfig.monsters.modes||{};
  if(!adminConfig.monsters.modes.volcano){
    adminConfig.monsters.modes.volcano={name:'ภูเขาไฟ',icon:'🌋',count:6,monsters:{
      normal:{name:'นักรบอสูรเพลิง',icon:'🔥',hp:250,attack:26,defense:11,attackType:'melee',skill:'none',drops:[{id:'charredBone',qty:1,chance:42,kind:'junk'},{id:'burntHide',qty:1,chance:28,kind:'junk'}]},
      ranged:{name:'ซาลาแมนเดอร์เพลิง',icon:'🦎',hp:215,attack:31,defense:9,attackType:'ranged',range:190,skill:'firebolt',drops:[{id:'lavaShard',qty:1,chance:48,kind:'junk'},{id:'emberCore',qty:1,chance:20,kind:'junk'}]},
      caster:{name:'จอมเวทแมกมา',icon:'🔮',hp:275,attack:37,defense:12,attackType:'ranged',range:230,skill:'meteor',drops:[{id:'emberCore',qty:1,chance:42,kind:'junk'},{id:'flameCrystal',qty:1,chance:14,kind:'junk'}]},
      elite:{name:'ราชันแมกมา',icon:'👑',hp:820,attack:58,defense:21,attackType:'boss',range:250,skill:'eruption',drops:[{id:'obsidianScrap',qty:2,chance:62,kind:'junk'},{id:'flameCrystal',qty:1,chance:30,kind:'junk'}]}
    }};
  }

  if(!adminConfig.monsters.modes.desert){
    adminConfig.monsters.modes.desert={name:'ทะเลทราย',icon:'🏜️',count:6,monsters:{
      normal:{name:'หมาไนทะเลทราย',icon:'🐕',hp:390,attack:42,defense:16,attackType:'melee',skill:'none',drops:[{id:'sandFang',qty:1,chance:48,kind:'junk'},{id:'desertHide',qty:1,chance:30,kind:'junk'}]},
      ranged:{name:'นักล่าพายุทราย',icon:'🏹',hp:350,attack:48,defense:14,attackType:'ranged',range:205,skill:'sandshot',drops:[{id:'cactusFiber',qty:1,chance:44,kind:'junk'},{id:'ancientRelic',qty:1,chance:16,kind:'junk'}]},
      caster:{name:'นักบวชอสรพิษ',icon:'🐍',hp:430,attack:54,defense:18,attackType:'ranged',range:235,skill:'sandstorm',drops:[{id:'desertHide',qty:1,chance:38,kind:'junk'},{id:'sunCrystal',qty:1,chance:14,kind:'junk'}]},
      elite:{name:'ราชันแมงป่องทะเลทราย',icon:'🦂',hp:1250,attack:78,defense:30,attackType:'boss',range:260,skill:'sandquake',drops:[{id:'scorpionShell',qty:2,chance:64,kind:'junk'},{id:'ancientRelic',qty:1,chance:35,kind:'junk'},{id:'sunCrystal',qty:1,chance:18,kind:'junk'}]}
    }};
  }
  if(!adminConfig.monsters.modes.sea){
    adminConfig.monsters.modes.sea={name:'ใต้ท้องทะเล',icon:'🌊',count:6,monsters:{
      normal:{name:'นักล่าปลากระดูก',icon:'🐟',hp:1170,attack:126,defense:48,attackType:'melee',skill:'tidalBite',drops:[{id:'wetScale',qty:1,chance:52,kind:'junk'},{id:'barnacleShell',qty:1,chance:28,kind:'junk'}]},
      ranged:{name:'กระเบนสายฟ้าทะเลลึก',icon:'🐠',hp:1050,attack:144,defense:42,attackType:'ranged',range:220,skill:'waterBolt',drops:[{id:'coralScrap',qty:1,chance:46,kind:'junk'},{id:'deepSeaInk',qty:1,chance:24,kind:'junk'}]},
      caster:{name:'หมึกจอมเวทแห่งร่องลึก',icon:'🐙',hp:1290,attack:162,defense:54,attackType:'ranged',range:255,skill:'whirlpool',drops:[{id:'deepSeaInk',qty:1,chance:48,kind:'junk'},{id:'abyssPearl',qty:1,chance:15,kind:'junk'}]},
      elite:{name:'ราชาฉลามแห่งร่องลึก',icon:'🦈',hp:3750,attack:234,defense:90,attackType:'boss',range:285,skill:'abyssTsunami',skillCooldown:7,drops:[{id:'sharkTooth',qty:2,chance:68,kind:'junk'},{id:'abyssPearl',qty:1,chance:28,kind:'junk'},{id:'barnacleShell',qty:2,chance:40,kind:'junk'}]}
    }};
  }

  const spaceJunk=[
    {id:'meteorDust',name:'ฝุ่นอุกกาบาต',icon:'✨',price:430},
    {id:'alienAlloy',name:'เศษโลหะต่างดาว',icon:'🔩',price:520},
    {id:'plasmaCell',name:'เซลล์พลาสมาเสีย',icon:'🔋',price:610},
    {id:'satelliteScrap',name:'เศษซากดาวเทียม',icon:'🛰️',price:720},
    {id:'voidCrystal',name:'ผลึกสุญญากาศแตกร้าว',icon:'💠',price:860},
    {id:'nebulaCore',name:'แก่นเนบิวลาร้าว',icon:'🌌',price:1100},
    {id:'quantumChip',name:'ชิปควอนตัมเสีย',icon:'💾',price:1450}
  ];
  for(const j of spaceJunk) if(!rpgJunkTypes.some(x=>x.id===j.id)) rpgJunkTypes.push(j);
  rpg.junk=rpg.junk||{}; for(const j of spaceJunk) rpg.junk[j.id]=Number(rpg.junk[j.id]||0);

  if(!adminConfig.monsters.modes.space) adminConfig.monsters.modes.space={name:'อวกาศ',icon:'🪐',count:6,monsters:{
    normal:{name:'โดรนจักรวาลพิฆาต',icon:'🤖',hp:8200,attack:510,defense:210,attackType:'ranged',range:230,skill:'laserBarrage',skillCooldown:5.5,drops:[{id:'alienAlloy',qty:1,chance:50,kind:'junk'},{id:'satelliteScrap',qty:1,chance:22,kind:'junk'}]},
    ranged:{name:'นักล่าต่างดาวพลาสมา',icon:'👽',hp:7600,attack:570,defense:190,attackType:'ranged',range:270,skill:'plasmaNova',skillCooldown:6,drops:[{id:'plasmaCell',qty:1,chance:54,kind:'junk'},{id:'meteorDust',qty:1,chance:42,kind:'junk'}]},
    caster:{name:'จอมเวทเนบิวลา',icon:'🌌',hp:9000,attack:650,defense:235,attackType:'ranged',range:300,skill:'gravityRift',skillCooldown:7,drops:[{id:'voidCrystal',qty:1,chance:45,kind:'junk'},{id:'nebulaCore',qty:1,chance:18,kind:'junk'}]},
    elite:{name:'จักรพรรดิสุญญากาศ',icon:'🪐',hp:26000,attack:980,defense:420,attackType:'boss',range:330,skill:'supernova',skillCooldown:9,drops:[{id:'quantumChip',qty:1,chance:42,kind:'junk'},{id:'nebulaCore',qty:2,chance:55,kind:'junk'},{id:'voidCrystal',qty:2,chance:70,kind:'junk'}]}
  }};

  if(!adminConfig.monsters.modes.tower) adminConfig.monsters.modes.tower={name:'หอคอยชั้น 1',icon:'🎃',count:5,monsters:{
    normal:{name:'ฟักทองต้องสาป',icon:'🎃',hp:180,attack:22,defense:6,attackType:'melee',range:42,skill:'none',drops:[]},
    ranged:{name:'นักรบโครงกระดูกคลั่ง',icon:'💀',hp:230,attack:29,defense:8,attackType:'melee',range:44,skill:'none',drops:[]},
    caster:{name:'แม่มดเงามืด',icon:'🧙‍♀️',hp:320,attack:38,defense:10,attackType:'melee',range:46,skill:'none',drops:[]},
    elite:{name:'อัศวินหัวฟักทองอัศวินดำ',icon:'🛡️',hp:520,attack:52,defense:16,attackType:'melee',range:50,skill:'none',drops:[]},
    ghost:{name:'วิญญาณเร่ร่อน',icon:'👻',hp:260,attack:33,defense:4,attackType:'melee',range:44,skill:'none',drops:[]}
  }};

    function modeForZone(){ const z=rpg.currentZone==='tower'?'tower':rpg.currentZone==='volcano'?'volcano':rpg.currentZone==='desert'?'desert':rpg.currentZone==='sea'?'sea':rpg.currentZone==='space'?'space':'forest'; return adminConfig.monsters.modes?.[z] || adminConfig.monsters.modes?.forest || Object.values(adminConfig.monsters.modes||{})[0]; }
  function monsterDefById(id){ const m=modeForZone()?.monsters||{}; return m[id]||m.normal||Object.values(m)[0]||{name:'มอนสเตอร์',icon:'👹',hp:100,attack:10,defense:0,drops:[]}; }
  function makeZonePack(x,y,index){
    const mode=modeForZone(), count=Math.max(1,Math.round(adminNum(mode?.count,6))), mobs=[];
    const tower=rpg.currentZone==='tower'; const volcano=rpg.currentZone==='volcano'; const desert=rpg.currentZone==='desert'; const sea=rpg.currentZone==='sea'; const space=rpg.currentZone==='space';
    const pattern=tower?['elite','ranged','caster','ghost','normal']:volcano?['elite','ranged','caster','normal','ranged','normal']:desert?['elite','ranged','caster','normal','normal','ranged']:sea?['elite','ranged','caster','normal','ranged','normal']:['elite','normal','normal','normal','normal','normal'];
    for(let i=0;i<count;i++){
      const angle=(Math.PI*2/count)*i, radius=42+(i%3)*18, type=pattern[i%pattern.length], d=monsterDefById(type);
      mobs.push({x:x+Math.cos(angle)*radius,y:y+Math.sin(angle)*radius,homeX:x+Math.cos(angle)*radius,homeY:y+Math.sin(angle)*radius,
        hp:adminNum(d.hp,105),maxHp:adminNum(d.hp,105),alive:true,elite:type==='elite',monsterType:type,monsterName:d.name,monsterIcon:d.icon,
        attack:adminNum(d.attack,0),defense:adminNum(d.defense,0),attackType:d.attackType||'melee',attackRange:adminNum(d.range,type==='elite'?36:36),skill:d.skill||'none',
        hitFlash:0,attackCd:0,aggro:false,attackAnim:0,slow:0,skillCd:Math.random()*1.5,skillCooldown:adminNum(d.skillCooldown,type==='elite'?7:5.2)});
    }
    return{x,y,index,mobs,respawnAt:0};
  }
  makeRpgPack=makeZonePack;

  // Use the selected world for entry while preserving the original platform flow.
  const oldEnter=enterRpgJungle;
  enterRpgJungle=function(){
    oldEnter();
    const z=ZONES[rpg.currentZone]||ZONES.jungle;
    const h=document.querySelector('#rpgWorld .rpg-topbar h1'); if(h)h.textContent=`${z.icon} ${z.name}`;
    const k=document.querySelector('#rpgWorld .rpg-kicker'); if(k)k.textContent=z.kicker;
    const p=document.querySelector('#rpgWorld .rpg-topbar p'); if(p)p.textContent=z.subtitle;
    rpg.combatLog=`${z.icon} เข้าสู่${z.name}`;
    document.getElementById('rpgWorld')?.classList.toggle('tower-dungeon',rpg.currentZone==='tower');
    document.getElementById('rpgWorld')?.classList.toggle('volcano-dungeon',rpg.currentZone==='volcano');
    document.getElementById('rpgWorld')?.classList.toggle('desert-dungeon',rpg.currentZone==='desert');
    document.getElementById('rpgWorld')?.classList.toggle('sea-dungeon',rpg.currentZone==='sea');
    document.getElementById('rpgWorld')?.classList.toggle('space-dungeon',rpg.currentZone==='space');
    resetRpgPacks();
  };
  // V140: Dungeon pass ticket gate. Only dungeon entry is affected.
  const DUNGEON_PASS_COST={jungle:1,volcano:2,desert:3,sea:4,space:5};
  window.tryEnterDungeonZone=function(zone){
    syncPassTicketTimer();
    const cost=Number(DUNGEON_PASS_COST[zone]||1);
    state.rpgInventory=state.rpgInventory||{};
    const have=Math.max(0,Math.min(PASS_TICKET_MAX,Number(state.rpgInventory.passTicket||0)));
    if(have<cost){
      const goShop=confirm(`🎫 ใบผ่านทางไม่พอ\n\nดันเจี้ยนนี้ต้องใช้ ${cost} ใบ\nคุณมี ${have} ใบ\n\nกด “ตกลง” เพื่อไปที่ร้านค้าและซื้อใบผ่านทาง\nกด “ยกเลิก” เพื่อกลับ`);
      if(goShop){
        document.getElementById("rpgShopModal")?.classList.remove("hidden");
        renderAdminDrivenRpgShop?.();
      }
      return false;
    }
    // Deduct immediately only after the player has enough tickets.
    state.rpgInventory.passTicket=have-cost;
    saveState();
    syncPassTicketTimer();
    renderRpgInventory?.();
    renderRpgBag?.();
    rpg.currentZone=zone;
    requestRpgPlatform();
    return true;
  };

  // Capture handlers replace the old direct-entry flow so every dungeon pays exactly once.
  document.getElementById('enterJungleZoneButton')?.addEventListener('click',(e)=>{e.preventDefault();e.stopImmediatePropagation();window.tryEnterDungeonZone('jungle');},true);
  document.getElementById('enterVolcanoZoneButton')?.addEventListener('click',(e)=>{e.preventDefault();e.stopImmediatePropagation();window.tryEnterDungeonZone('volcano');},true);
  document.getElementById('enterDesertZoneButton')?.addEventListener('click',(e)=>{e.preventDefault();e.stopImmediatePropagation();window.tryEnterDungeonZone('desert');},true);
  document.getElementById('enterSeaZoneButton')?.addEventListener('click',(e)=>{e.preventDefault();e.stopImmediatePropagation();window.tryEnterDungeonZone('sea');},true);
  document.getElementById('enterSpaceZoneButton')?.addEventListener('click',(e)=>{e.preventDefault();e.stopImmediatePropagation();window.tryEnterDungeonZone('space');},true);
  ;['Jungle','Volcano','Desert','Sea','Space'].forEach(name=>{
    const zone=name.toLowerCase(); const btn=document.getElementById(`enter${name}ZoneButton`);
    if(btn) btn.onclick=(e)=>{e?.preventDefault?.();return window.tryEnterDungeonZone(zone);};
  });

  // Extra combat layer: ranged enemies and skill users attack from distance in Volcano.
  const baseUpdateRpg=updateRpg;
  updateRpg=function(dt){
    baseUpdateRpg(dt);
    if(!rpg.running||!rpg.inDungeon||rpg.deathPending||!['volcano','desert','sea','space'].includes(rpg.currentZone)) return;
    const desert=rpg.currentZone==='desert'; const sea=rpg.currentZone==='sea'; const space=rpg.currentZone==='space';
    const p=rpg.player;

    // Desert boss poison: every boss skill hit adds a stack, lasts 5 seconds,
    // and deals cumulative damage once per second. Reapplying refreshes the 5s timer.
    if(desert && p.bossPoison){
      const poison=p.bossPoison;
      poison.remaining-=dt; poison.timer-=dt;
      if(poison.timer<=0 && poison.remaining>0){
        poison.timer+=1;
        const dot=Math.max(1,Math.round(poison.damagePerStack*poison.stacks));
        p.hp=Math.max(0,p.hp-dot); p.hurtAnim=Math.max(p.hurtAnim||0,.2);
        burst(p.x,p.y,'#73d85b',8,58);
        rpg.combatLog=`☠️ พิษสะสม x${poison.stacks} -${dot} HP · เหลือ ${Math.ceil(poison.remaining)}วิ`;
      }
      if(poison.remaining<=0){ delete p.bossPoison; rpg.combatLog='☠️ พิษหมดฤทธิ์'; }
      if(p.hp<=0&&!rpg.deathPending){ handleRpgDeath(); return; }
    }
    for(const pack of rpg.packs){ for(const mob of pack.mobs){
      if(!mob.alive) continue;
      const dist=Math.hypot(p.x-mob.x,p.y-mob.y);
      mob.skillCd=Math.max(0,Number(mob.skillCd||0)-dt);
      if(dist<Math.max(190,mob.attackRange||0)) mob.aggro=true;
      // Ranged groups fire before reaching melee range.
      if(mob.aggro && (mob.attackType==='ranged'||mob.attackType==='boss') && dist<=mob.attackRange && dist>38 && mob.attackCd<=0 && p.hitCd<=0){
        mob.attackCd=mob.attackType==='boss'?1.35:1.55;
        const raw=Math.max(1,Number(mob.attack||20)*(mob.attackType==='boss'?.72:.52));
        const dmg=Math.max(1,Math.round(raw*100/(100+Math.max(0,Number(getEffectiveDefense?.()||0)))));
        p.hp=Math.max(0,p.hp-dmg); p.hitCd=.22; p.hurtAnim=.28; mob.attackAnim=.35;
        burst(p.x,p.y,space?'#a56cff':sea?'#54d9ff':desert?'#d9a441':'#ff7b39',10,95); ((space?(rpg.spaceEffects||(rpg.spaceEffects=[])):sea?(rpg.seaEffects||(rpg.seaEffects=[])):desert?(rpg.desertEffects||(rpg.desertEffects=[])):(rpg.volcanoEffects||(rpg.volcanoEffects=[])))).push({x:mob.x,y:mob.y,tx:p.x,ty:p.y,kind:space?'laserBolt':sea?'waterBolt':desert?'sandbolt':'bolt',life:.45,max:.45}); sfx('hurt');
        rpg.combatLog=`${sea?'🌊':desert?'🏜️':'🔥'} ${mob.monsterName||'ศัตรู'} ยิงโจมตีระยะไกล -${dmg} HP`;
      }
      // Skill groups cast heavier attacks with visible burst and a longer cooldown.
      if(mob.aggro && mob.skill!=='none' && mob.skillCd<=0 && dist<=Math.max(175,mob.attackRange||0) && p.hitCd<=0){
        mob.skillCd=Number(mob.skillCooldown|| (mob.attackType==='boss'?7:5.2));
        const mult=mob.skill==='supernova'?1.85:mob.skill==='gravityRift'?1.55:mob.skill==='plasmaNova'?1.35:mob.skill==='laserBarrage'?1.15:mob.skill==='meteor'?1.15:mob.skill==='eruption'?1.55:mob.skill==='sandquake'?1.48:mob.skill==='sandstorm'?1.2:mob.skill==='whirlpool'?1.35:mob.skill==='abyssTsunami'?1.7:mob.skill==='waterBolt'?1.1:1.0;
        const raw=Math.max(1,Number(mob.attack||25)*mult);
        const dmg=Math.max(1,Math.round(raw*100/(100+Math.max(0,Number(getEffectiveDefense?.()||0)))));
        // Mark the caster so the monster itself visibly performs the special move.
        mob.attackAnim=Math.max(mob.attackAnim||0, (mob.skill==='sandquake'||mob.skill==='abyssTsunami')?.55:.38);
        mob.skillAnim={name:mob.skill,
          life:space?(mob.skill==='supernova'?1.45:mob.skill==='gravityRift'?1.15:mob.skill==='plasmaNova'?.95:.82):(mob.skill==='sandquake'||mob.skill==='abyssTsunami')?.65:.52,
          max:space?(mob.skill==='supernova'?1.45:mob.skill==='gravityRift'?1.15:mob.skill==='plasmaNova'?.95:.82):(mob.skill==='sandquake'||mob.skill==='abyssTsunami')?.65:.52};
        p.hp=Math.max(0,p.hp-dmg); p.hitCd=.34; p.hurtAnim=.45;
        // Only the Desert Boss applies stacking poison with each successful skill hit.
        if(desert && mob.attackType==='boss' && mob.skill==='sandquake'){
          const oldPoison=p.bossPoison;
          const stacks=Math.min(20,(oldPoison?.stacks||0)+1);
          p.bossPoison={remaining:5,timer:1,stacks,damagePerStack:Math.max(1,Math.round((mob.attack||78)*.10))};
          burst(p.x,p.y,'#75d85a',14,82);
        }
        burst(p.x,p.y,space?(mob.skill==='supernova'?'#ffd15f':mob.skill==='gravityRift'?'#9d6cff':mob.skill==='plasmaNova'?'#ff5cdb':'#65e7ff'):sea?'#53dfff':desert?'#d8a341':(mob.skill==='eruption'?'#ff3b1f':'#ff9a36'),space&&mob.skill==='supernova'?42:18,space&&mob.skill==='supernova'?250:(mob.skill==='eruption'||mob.skill==='sandquake'||mob.skill==='abyssTsunami'?150:105));
        const desertKind=mob.skill==='sandquake'?'sandquake':mob.skill==='sandshot'?'sandbolt':'sandstorm'; const seaKind=mob.skill==='abyssTsunami'?'abyssTsunami':mob.skill==='whirlpool'?'whirlpool':mob.skill==='tidalBite'?'tidalBite':'waterBolt'; const spaceKind=mob.skill==='supernova'?'supernova':mob.skill==='gravityRift'?'gravityRift':mob.skill==='plasmaNova'?'plasmaNova':'laserBarrage';
        (space?(rpg.spaceEffects||(rpg.spaceEffects=[])):sea?(rpg.seaEffects||(rpg.seaEffects=[])):desert?(rpg.desertEffects||(rpg.desertEffects=[])):(rpg.volcanoEffects||(rpg.volcanoEffects=[]))).push({x:mob.x,y:mob.y,tx:p.x,ty:p.y,kind:space?spaceKind:sea?seaKind:desert?desertKind:(mob.skill==='eruption'?'eruption':'meteor'),life:space?(mob.skill==='supernova'?1.65:mob.skill==='gravityRift'?1.35:mob.skill==='plasmaNova'?1.1:.9):sea?(mob.skill==='abyssTsunami'?1.2:mob.skill==='whirlpool'?1.1:.75):desert?(mob.skill==='sandquake'?1.05:mob.skill==='sandstorm'?1.15:.72):.7,max:space?(mob.skill==='supernova'?1.65:mob.skill==='gravityRift'?1.35:mob.skill==='plasmaNova'?1.1:.9):sea?(mob.skill==='abyssTsunami'?1.2:mob.skill==='whirlpool'?1.1:.75):desert?(mob.skill==='sandquake'?1.05:mob.skill==='sandstorm'?1.15:.72):.7});
        if(space){
          if(mob.skill==='supernova') spaceSupernovaSfx();
          else if(mob.skill==='gravityRift') spaceRiftSfx();
          else if(mob.skill==='plasmaNova') spacePlasmaSfx();
          else spaceLaserSfx();
        }
        rpg.combatLog=`✨ ${mob.monsterName||'ศัตรู'} ใช้สกิล ${mob.skill} -${dmg} HP${desert&&mob.attackType==='boss'&&mob.skill==='sandquake'?` · ☠️ ติดพิษสะสม x${p.bossPoison?.stacks||1} (5วิ)`:''}${sea&&mob.attackType==='boss'?` · 🌊 คูลดาวน์บอส ${Math.ceil(mob.skillCd)}วิ`:''}`;
      }
      if(p.hp<=0&&!rpg.deathPending) handleRpgDeath();
    }}
  };

  // Loot follows the monster definition from the current zone and goes through the existing dungeon bag + junk shop.
  dropRpgLoot=function(mob){
    const d=monsterDefById(mob.monsterType||(mob.elite?'elite':'normal'));
    const rows=(d.drops||[]).filter(x=>adminNum(x.chance)>0);
    const row=weightedPick(rows); if(!row)return `${d.icon||'🗑️'} ${d.name||'มอนสเตอร์'} ไม่ดรอปไอเทม`;
    const qty=Math.max(1,Math.floor(adminNum(row.qty,1)));
    const junk=rpgJunkTypes.find(x=>x.id===row.id)||rpgJunkTypes[0];
    addDungeonLoot(junk,qty,0);
    return `${d.icon||'👹'} ${d.name||'มอนสเตอร์'} · ${junk.icon} ${junk.name} x${qty}`;
  };

  // Keep Admin's monster page aware of both worlds; save the new world configuration.
  try{localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));}catch(_){}
})();


/* V124 — BALANCED DEEP SEA SKILLS
   Reworks only the sea dungeon skill visuals. Effects are intentionally moderate:
   visible and animated, but capped to avoid excessive glow or frame drops. */
(function(){
  const baseDraw=drawRpg;

  function seaSkillSfx(kind){
    // Short, low-gain synthesized sounds; no loops or timers.
    try{
      if(typeof tone!=='function') return;
      if(kind==='waterBolt'){
        tone(520,.05,'sine',.025,0,720);
        tone(720,.04,'sine',.018,.035,860);
      }else if(kind==='whirlpool'){
        tone(180,.12,'triangle',.035,0,95);
        tone(120,.08,'sine',.02,.07,75);
      }else if(kind==='abyssTsunami'){
        tone(90,.18,'sawtooth',.045,0,65);
        tone(220,.10,'sine',.028,.09,310);
      }else if(kind==='tidalBite'){
        tone(330,.06,'triangle',.03,0,180);
      }
    }catch(_){}
  }

  // Hook sea skill creation once. This does not alter damage/cooldown/stats.
  const oldPush = Array.prototype.push;
  let seaSoundHooked=false;
  function hookSeaEffects(){
    if(seaSoundHooked || !rpg) return;
    if(!Array.isArray(rpg.seaEffects)) rpg.seaEffects=[];
    const arr=rpg.seaEffects;
    if(arr.__balancedSeaHook) {seaSoundHooked=true;return;}
    const nativePush=arr.push;
    Object.defineProperty(arr,'__balancedSeaHook',{value:true,enumerable:false});
    arr.push=function(...items){
      for(const e of items){
        if(e && e.kind) seaSkillSfx(e.kind);
      }
      // Keep at most 8 active sea effects.
      const result=nativePush.apply(this,items);
      if(this.length>8) this.splice(0,this.length-8);
      return result;
    };
    seaSoundHooked=true;
  }

  drawRpg=function(dt){
    baseDraw(dt);
    if(!rpg.running||!rpg.inDungeon||rpg.currentZone!=='sea'||!rpgCtx) return;

    hookSeaEffects();

    const ctx=rpgCtx, w=rpgCanvas.width, h=rpgCanvas.height;
    const now=performance.now()/1000;

    // Lightweight underwater atmosphere: only a few bubbles and soft light rays.
    ctx.save();
    const haze=ctx.createLinearGradient(0,0,0,h);
    haze.addColorStop(0,'rgba(18,92,142,.08)');
    haze.addColorStop(.5,'rgba(4,40,78,.05)');
    haze.addColorStop(1,'rgba(0,12,36,.10)');
    ctx.fillStyle=haze; ctx.fillRect(0,0,w,h);

    for(let i=0;i<12;i++){
      const x=(i*151+Math.sin(now*.55+i)*14)%w;
      const y=(i*83+now*9+i*27)%h;
      ctx.fillStyle='rgba(170,235,255,.14)';
      ctx.beginPath();ctx.arc(x,y,1+(i%2),0,Math.PI*2);ctx.fill();
    }
    ctx.restore();

    // Visible but controlled skill effects.
    if(Array.isArray(rpg.seaEffects)){
      const safeDt=Math.min(Math.max(Number(dt)||0,.001),.05);
      for(let i=rpg.seaEffects.length-1;i>=0;i--){
        const e=rpg.seaEffects[i];
        if(!e || !Number.isFinite(Number(e.life)) || !Number.isFinite(Number(e.max))){
          rpg.seaEffects.splice(i,1); continue;
        }
        e.life-=safeDt;
        if(e.life<=0){rpg.seaEffects.splice(i,1);continue;}

        const q=Math.max(0,Math.min(1,1-e.life/e.max));
        const fade=Math.sin(Math.min(1,q)*Math.PI)*.85;

        ctx.save();
        ctx.globalCompositeOperation='lighter';

        if(e.kind==='waterBolt'){
          const x=e.x+(e.tx-e.x)*q, y=e.y+(e.ty-e.y)*q;
          // Compact projectile + short trail.
          ctx.globalAlpha=fade;
          ctx.strokeStyle='#67dfff';
          ctx.shadowColor='#55cfff';ctx.shadowBlur=10;
          ctx.lineWidth=4;
          ctx.beginPath();
          ctx.moveTo(x-(e.tx-e.x)*.10,y-(e.ty-e.y)*.10);
          ctx.lineTo(x,y);ctx.stroke();

          ctx.fillStyle='#b9f7ff';
          ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill();

          // Small impact ring near the target.
          if(q>.78){
            ctx.globalAlpha=(q-.78)/.22*.65;
            ctx.strokeStyle='#9fefff';ctx.shadowBlur=7;ctx.lineWidth=2;
            ctx.beginPath();ctx.arc(e.tx,e.ty,8+(q-.78)*45,0,Math.PI*2);ctx.stroke();
          }
        }else if(e.kind==='whirlpool'){
          // Three rotating rings, instead of many full-screen rings.
          ctx.globalAlpha=fade*.78;
          for(let k=0;k<3;k++){
            const r=18+k*15+q*24;
            ctx.strokeStyle=k===0?'#62d7ff':k===1?'#4eb6e8':'#9be8ff';
            ctx.lineWidth=2.2;
            ctx.shadowColor='#48bff2';ctx.shadowBlur=6;
            ctx.beginPath();
            ctx.arc(e.tx,e.ty,r,now*3+k*2.1,now*3+k*2.1+Math.PI*1.55);
            ctx.stroke();
          }
          // Central water core.
          ctx.globalAlpha=fade*.28;
          ctx.fillStyle='#66dfff';
          ctx.beginPath();ctx.arc(e.tx,e.ty,10+q*8,0,Math.PI*2);ctx.fill();
        }else if(e.kind==='abyssTsunami'){
          // Boss: a readable shockwave and a few wave arcs, not a blinding flash.
          const r=26+q*145;
          ctx.globalAlpha=fade*.75;
          ctx.strokeStyle='#79e8ff';
          ctx.shadowColor='#58d4f4';ctx.shadowBlur=12;
          ctx.lineWidth=7;
          ctx.beginPath();ctx.arc(e.tx,e.ty,r,0,Math.PI*2);ctx.stroke();

          ctx.globalAlpha=fade*.5;
          ctx.strokeStyle='#2e91d0';ctx.shadowBlur=5;ctx.lineWidth=3;
          for(let k=0;k<2;k++){
            const rr=Math.max(8,r-18-k*13);
            ctx.beginPath();ctx.arc(e.tx,e.ty,rr,now*2.5+k,now*2.5+k+Math.PI*1.4);ctx.stroke();
          }

          // A few moving foam particles only.
          ctx.globalAlpha=fade*.55;ctx.fillStyle='#d5fbff';ctx.shadowBlur=0;
          for(let k=0;k<6;k++){
            const a=k*Math.PI*2/6+now*1.8;
            ctx.beginPath();ctx.arc(e.tx+Math.cos(a)*r*.7,e.ty+Math.sin(a)*r*.45,2,0,Math.PI*2);ctx.fill();
          }
        }else if(e.kind==='tidalBite'){
          ctx.globalAlpha=fade*.8;
          ctx.strokeStyle='#8eeeff';ctx.shadowColor='#57caff';ctx.shadowBlur=8;ctx.lineWidth=4;
          ctx.beginPath();ctx.arc(e.tx,e.ty,15+q*35,-.8,2.5);ctx.stroke();
        }else{
          ctx.globalAlpha=fade*.55;
          ctx.strokeStyle='#74dfff';ctx.lineWidth=3;
          ctx.beginPath();ctx.arc(e.tx,e.ty,12+q*42,0,Math.PI*2);ctx.stroke();
        }
        ctx.restore();
      }
    }

    // Monster cast animation: subtle charging aura so players can see who is casting.
    if(Array.isArray(rpg.packs)){
      for(const pack of rpg.packs){
        if(!pack||!Array.isArray(pack.mobs)) continue;
        for(const m of pack.mobs){
          if(!m?.alive || !m.skillAnim || m.skillAnim.life<=0) continue;
          const ratio=Math.max(0,Math.min(1,m.skillAnim.life/(m.skillAnim.max||1)));
          const pulse=1-ratio;
          ctx.save();
          ctx.translate(m.x,m.y-24);
          ctx.globalCompositeOperation='lighter';
          ctx.globalAlpha=.22+.28*Math.sin(pulse*Math.PI);
          const isBoss=m.attackType==='boss';
          const color=isBoss?'#76e8ff':m.skill==='whirlpool'?'#64cfff':'#9eefff';
          ctx.strokeStyle=color;ctx.shadowColor=color;ctx.shadowBlur=isBoss?12:7;
          ctx.lineWidth=isBoss?3:2;
          ctx.beginPath();
          ctx.arc(0,0,(isBoss?22:14)+pulse*(isBoss?12:7),0,Math.PI*2);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };
})();

/* =========================
   V104 ADMIN JUNK PRICE CONTROL
   Admin can change the SELL price of every monster-drop junk item.
   ========================= */
(function(){
  adminConfig.junk=adminConfig.junk||{};
  adminConfig.junk.prices=adminConfig.junk.prices||{};

  // Make all current and future monster-drop junk obey the admin price table.
  const __v104BaseApplyAdminConfig=applyAdminConfig;
  applyAdminConfig=function(){
    __v104BaseApplyAdminConfig();
    adminConfig.junk=adminConfig.junk||{};
    adminConfig.junk.prices=adminConfig.junk.prices||{};
    (rpgJunkTypes||[]).forEach(j=>{
      const saved=adminConfig.junk.prices[j.id];
      if(saved!==undefined && Number.isFinite(Number(saved))){
        j.price=Math.max(0,Number(saved));
      }else{
        // Remember the existing game price as the initial admin value.
        adminConfig.junk.prices[j.id]=Math.max(0,Number(j.price||0));
      }
    });
    try{
      renderRpgBag();
      renderRpgInventory();
      renderCharacterJunk();
    }catch(_){}
  };

  // Add a dedicated Admin tab without changing the existing tabs or shop systems.
  const __v104BaseRenderAdmin=renderAdmin;
  renderAdmin=function(){
    if(adminTab!=='junkPrices'){
      return __v104BaseRenderAdmin();
    }
    const box=document.getElementById('adminContent');
    if(!box)return;
    document.querySelectorAll('[data-admin-tab]').forEach(b=>b.classList.toggle('active',b.dataset.adminTab===adminTab));

    adminConfig.junk=adminConfig.junk||{};
    adminConfig.junk.prices=adminConfig.junk.prices||{};

    box.innerHTML=`
      <div class="admin-note">
        🧹 <b>ปรับราคาขยะจากมอนสเตอร์</b><br>
        ราคานี้คือจำนวนเหรียญที่ผู้เล่นจะได้รับ <b>ต่อ 1 ชิ้น</b> เมื่อขายที่ร้านรับซื้อขยะของมอนสเตอร์
        · ใช้ได้กับขยะจากทุกด่าน รวมทั้งป่าดงดิบ ภูเขาไฟ และทะเลทราย
        · ใส่ราคาใหม่แล้วกด <b>“บันทึกและใช้ทันที”</b>
      </div>
      <div class="admin-grid">
        ${(rpgJunkTypes||[]).map(j=>{
          const price=adminConfig.junk.prices[j.id]!==undefined ? adminConfig.junk.prices[j.id] : j.price;
          return `<div class="admin-card">
            <div class="admin-list-head">
              <span class="admin-thumb">${j.icon||'🗑️'}</span>
              <div><b>${adminEsc(j.name)}</b><small>ID: ${adminEsc(j.id)}</small></div>
            </div>
            <div class="admin-row">
              ${adminField('ราคาขายต่อ 1 ชิ้น (🪙)',`junk.prices.${j.id}`,price,'number','min="0" step="1"')}
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
    adminBindInputs(box);
  };

  // Apply saved prices now, so previously configured prices survive reload immediately.
  applyAdminConfig();
})();


/* V108 — Restore character enhancement entry point.
   The enhancement system itself already exists; this restores the lobby button and
   opens the same modal/function used by the original system. */
document.getElementById("characterEnhanceButton")?.addEventListener("click",()=>{
  try{
    openCharacterEnhance();
  }catch(err){
    console.error("Unable to open enhancement system",err);
    renderEnhanceEquipmentPicker?.();
    syncCharacterEnhance?.();
    openRpgModal?.("characterEnhanceModal");
  }
});

/* =========================
   V109 — Enhancement stat scaling + single-item enhancement fix
   ========================= */

// Keep every equipment stat tied to its CURRENT star count.  Star 1 is the
// baseline; changing stars recalculates the displayed/combat stats instead of
// leaving the old numbers frozen.
function getEnhancementSlotBase(slot){
  return {
    head:{hp:8,def:6,damage:0},
    body:{hp:18,def:12,damage:0},
    arms:{hp:7,def:7,damage:0},
    legs:{hp:0,def:0,damage:0},
    feet:{hp:5,def:5,damage:0},
    weapon:{hp:0,def:0,damage:0}
  }[slot]||{hp:0,def:0,damage:0};
}

function captureEnhancementBaseStats(item){
  if(!item) return;
  const stars=Math.max(1,getWeaponStars(item));
  const tier=getWeaponTier(item);
  const mult=weaponTierMeta(tier).multiplier;
  const pool=(typeof GACHA_POOLS!=="undefined" && GACHA_POOLS[tier]||[]).find(x=>x.name===item.name);
  const slot=item.slot || pool?.slot || "weapon";
  const slotBase=getEnhancementSlotBase(slot);

  // Gacha equipment has canonical star-1 stats from its registry.
  if(pool){
    item.enhanceBaseDamage=Number(pool.baseDamage||0)*mult;
    item.enhanceBaseHp=Number(slotBase.hp||0)*mult;
    item.enhanceBaseDef=Number(slotBase.def||0)*mult;
  }else{
    // For legacy/custom equipment, infer a stable star-1 baseline once.
    if(!Number.isFinite(Number(item.enhanceBaseDamage))) item.enhanceBaseDamage=Number(item.baseDamage||0)/stars;
    if(!Number.isFinite(Number(item.enhanceBaseHp))) item.enhanceBaseHp=Number(item.bonusHp||0)/stars;
    if(!Number.isFinite(Number(item.enhanceBaseDef))) item.enhanceBaseDef=Number(item.bonusDef||0)/stars;
  }
  item.slot=slot;
}

function recalcEquipmentStatsByStars(item){
  if(!item) return;
  captureEnhancementBaseStats(item);
  const stars=Math.max(1,getWeaponStars(item));
  item.baseDamage=Math.max(0,Math.round(Number(item.enhanceBaseDamage||0)*stars));
  item.bonusHp=Math.max(0,Math.round(Number(item.enhanceBaseHp||0)*stars));
  item.bonusDef=Math.max(0,Math.round(Number(item.enhanceBaseDef||0)*stars));
  item.enhancementStatModel=1;
}

function recalcAllEquippedStatsByStars(){
  Object.values(state.rpgEquipment||{}).forEach(recalcEquipmentStatsByStars);
}

// Enhancement no longer requires a complete 6-piece set. Only equipment that
// actually exists is shown, and one equipped item is enough to open/use it.
getEnhanceItem=function(){
  state.rpgEquipment=state.rpgEquipment||{};
  let item=state.rpgEquipment[rpg.enhanceSlot];
  if(item) return item;
  const first=Object.keys(EQUIPMENT_META).find(slot=>state.rpgEquipment[slot]);
  if(first){rpg.enhanceSlot=first;return state.rpgEquipment[first];}
  return null;
};

renderEnhanceEquipmentPicker=function(){
  const picker=document.getElementById("enhanceEquipmentPicker");
  if(!picker)return;
  state.rpgEquipment=state.rpgEquipment||{};
  const entries=Object.entries(EQUIPMENT_META).filter(([slot])=>state.rpgEquipment[slot]);
  if(!entries.length){
    picker.innerHTML='<div class="gacha-empty equipment-bag-empty">🛡️<br><b>ยังไม่ได้ใส่อุปกรณ์</b><small>ใส่อุปกรณ์อย่างน้อย 1 ชิ้น แล้วสามารถเปิดตีบวกได้ทันที</small></div>';
    return;
  }
  if(!state.rpgEquipment[rpg.enhanceSlot]) rpg.enhanceSlot=entries[0][0];
  picker.innerHTML=entries.map(([slot,meta])=>{
    const item=state.rpgEquipment[slot];
    recalcEquipmentStatsByStars(item);
    const tier=getWeaponTier(item),tm=weaponTierMeta(tier);
    return `<button type="button" class="enhance-picker-item ${slot===rpg.enhanceSlot?'selected':''}" data-enhance-slot="${slot}" style="--rarity-color:${tm.color}">
      <span class="picker-icon">${Number(item.durability||0)<=0?"💥":item.icon}</span>
      <span class="picker-name">${meta.label}<small>${item.name}</small></span>
      <span class="picker-rarity" style="color:${tm.color}">${tm.label}</span>
      <span class="picker-level">${weaponStarHtml(getWeaponStars(item),tier)}</span>
    </button>`;
  }).join("");
  picker.querySelectorAll("[data-enhance-slot]").forEach(btn=>btn.addEventListener("click",()=>selectEnhanceItem(btn.dataset.enhanceSlot)));
};

openCharacterEnhance=function(){
  state.rpgEquipment=state.rpgEquipment||{};
  const first=Object.keys(EQUIPMENT_META).find(slot=>state.rpgEquipment[slot]);
  if(first && !state.rpgEquipment[rpg.enhanceSlot]) rpg.enhanceSlot=first;
  recalcAllEquippedStatsByStars();
  renderEnhanceEquipmentPicker();
  syncCharacterEnhance();
  openRpgModal("characterEnhanceModal");
};

// Guard the enhancement UI when there is no item, but NEVER require a full set.
syncCharacterEnhance=function(){
  const item=getEnhanceItem();
  const picker=document.getElementById("enhanceEquipmentPicker");
  if(!item){
    document.getElementById("characterEnhanceWeaponName")&&(document.getElementById("characterEnhanceWeaponName").textContent="ยังไม่ได้เลือกอุปกรณ์");
    const rank=document.getElementById("characterEnhanceWeaponRank");if(rank)rank.textContent="—";
    const req=document.getElementById("characterEnhanceRequirement");if(req)req.textContent="ใส่อุปกรณ์อย่างน้อย 1 ชิ้นก็สามารถตีบวกได้ ไม่จำเป็นต้องใส่ครบเซต";
    const btn=document.getElementById("characterEnhanceWeaponButton");if(btn){btn.disabled=true;btn.textContent="⚒️ เลือกอุปกรณ์ก่อน";}
    return;
  }
  recalcEquipmentStatsByStars(item);
  const d=getEnhanceItemDisplay(),cur=d.stars,need=enhancementScrollNeed(cur,d.tier),chance=Math.round(enhancementChance(cur)*100),mode=getEnhanceMode();
  document.getElementById("characterEnhanceWeaponName")&&(document.getElementById("characterEnhanceWeaponName").textContent=d.name);
  const rank=document.getElementById("characterEnhanceWeaponRank");if(rank)rank.innerHTML=weaponStarHtml(cur,d.tier);
  const icon=document.querySelector("#characterEnhanceModal .enhance-weapon-icon");if(icon)icon.textContent=d.icon;
  const dur=document.getElementById("characterEnhanceWeaponDurability");if(dur)dur.textContent=`ความทนทาน ${d.durability}%`;
  const rar=document.getElementById("characterEnhanceRarity");if(rar){rar.textContent=d.tierMeta.label;rar.style.color=d.tierMeta.color;}
  document.getElementById("characterEnhanceScrollCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.enhancementScroll||0).toLocaleString()));
  document.getElementById("characterMagicOrbCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.magicOrb||0).toLocaleString()));
  document.getElementById("characterRegenScrollCount")?.replaceChildren(document.createTextNode(Number(state.rpgInventory.regenScroll||0).toLocaleString()));
  const req=document.getElementById("characterEnhanceRequirement");
  if(req){
    const material=mode==="regen"?`${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ + ${inlineItemVisual("regenScroll")} 1 ใบ · สำเร็จ 100%`:mode==="orb"?`${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ + ${inlineItemVisual("magicOrb")} 1 ลูก · โอกาสสำเร็จ ${chance}%`:`${inlineItemVisual("enhancementScroll")} ${need.toLocaleString()} ใบ · โอกาสสำเร็จ ${chance}%`;
    req.innerHTML=cur>=8?`⭐ ${weaponStarHtml(8,d.tier)} อุปกรณ์ถึง 8 ดาวสูงสุดแล้ว`:`ต้องใช้ ${material} · ${d.tierMeta.label} · เป้าหมาย ${weaponStarHtml(cur+1,d.tier)}`;
  }
  const btn=document.getElementById("characterEnhanceWeaponButton");
  const hasScroll=Number(state.rpgInventory.enhancementScroll||0)>=need;
  const hasExtra=mode==="orb"?Number(state.rpgInventory.magicOrb||0)>=1:mode==="regen"?Number(state.rpgInventory.regenScroll||0)>=1:true;
  if(btn){btn.disabled=!!item.broken||cur>=8||!hasScroll||!hasExtra;btn.textContent=cur>=8?"⭐ ครบ 8 ดาว":mode==="regen"?"✨ ตีบวกด้วยใบบวก REGEN (100%)":mode==="orb"?"🔮 ตีบวกด้วยลูกแก้ว":"⚒️ ตีบวกดาว";}
  document.querySelectorAll("[data-enhance-mode]").forEach(el=>el.classList.toggle("active",el.dataset.enhanceMode===mode));
  if(picker)picker.querySelectorAll("[data-enhance-slot]").forEach(el=>el.classList.toggle("selected",el.dataset.enhanceSlot===rpg.enhanceSlot));
};

// Recalculate stats immediately after every star change. A failed enhancement
// keeps the same star count, so its equipment stats stay consistent with that star.
enhanceWeapon=function(){
  if(rpg.inDungeon){rpg.combatLog="🔨 ต้องกลับไปหาช่างตีบวกหน้าดันเจี้ยน";const m=document.getElementById("enhanceMessage");if(m)m.textContent=rpg.combatLog;return;}
  const item=getEnhanceItem();
  if(!item){const m=document.getElementById("enhanceMessage");if(m)m.textContent="❌ เลือกอุปกรณ์อย่างน้อย 1 ชิ้นก่อนตีบวก";syncCharacterEnhance();return;}
  recalcEquipmentStatsByStars(item);
  const cur=getWeaponStars(item),tier=getWeaponTier(item),need=enhancementScrollNeed(cur,tier),mode=getEnhanceMode();
  const msg=document.getElementById("enhanceMessage");
  if(item.broken||cur>=8)return;
  if(Number(state.rpgInventory.enhancementScroll||0)<need){if(msg)msg.textContent=`❌ ใบบวกไม่พอ ต้องใช้ ${need.toLocaleString()} ใบ`;syncCharacterEnhance();return;}
  if(mode==="orb"&&Number(state.rpgInventory.magicOrb||0)<1){if(msg)msg.textContent="❌ ลูกแก้วเวทมนตร์ไม่พอ";syncCharacterEnhance();return;}
  if(mode==="regen"&&Number(state.rpgInventory.regenScroll||0)<1){if(msg)msg.textContent="❌ ใบบวก REGEN ไม่พอ";syncCharacterEnhance();return;}
  state.rpgInventory.enhancementScroll-=need;
  if(mode==="orb")state.rpgInventory.magicOrb--;
  if(mode==="regen")state.rpgInventory.regenScroll--;
  const success=mode==="regen"||Math.random()<enhancementChance(cur);
  if(success){
    item.stars=cur+1;item.level=item.stars;item.durability=100;item.broken=false;
    recalcEquipmentStatsByStars(item);
    if(rpg.enhanceSlot==="weapon"){rpg.weapon.stars=item.stars;rpg.weapon.level=item.stars;rpg.weapon.durability=100;rpg.weapon.broken=false;rpg.weapon.baseDamage=item.baseDamage;}
    if(msg)msg.innerHTML=`⭐ สำเร็จ! ${item.name} → ${weaponStarHtml(item.stars,tier)} · ⚔️ ${Number(item.baseDamage||0).toLocaleString()} · 🛡️ ${Number(item.bonusDef||0).toLocaleString()} · ❤️ ${Number(item.bonusHp||0).toLocaleString()}`;
    sfx("success");
  }else{
    const loss=Math.min(100,10+cur*7);
    if(mode!=="orb"){item.durability=Math.max(0,item.durability-loss);item.broken=item.durability<=0;if(rpg.enhanceSlot==="weapon"){rpg.weapon.durability=item.durability;rpg.weapon.broken=item.broken;}}
    recalcEquipmentStatsByStars(item);
    if(msg)msg.innerHTML=`❌ ล้มเหลว! ยังอยู่ที่ ${weaponStarHtml(cur,tier)} · ค่าพลังยังอิง ${cur} ดาว · ความทนทาน -${mode==="orb"?0:loss}%`;
    sfx("error");
  }
  syncWeaponState();syncEquipmentFromWeapon();saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();
};

// Upgrade old saves immediately so equipment already enhanced before this patch
// gets the correct star-scaled values on the next load.
recalcAllEquippedStatsByStars();
saveState();

/* =========================
   V111 — Enhancement modes finalized
   Normal: failure loses 1 star + durability, can break.
   Magic Orb: failure keeps stars, but durability still drops and can break.
   REGEN Scroll: guaranteed 100% success and always adds exactly 1 star.
   ========================= */
(function applyV111EnhancementRules(){
  // Keep all three modes. REGEN is a guaranteed-success enhancement material.
  if(!["normal","orb","regen"].includes(rpg.enhanceMode)) rpg.enhanceMode="normal";

  // Restore the REGEN button if an earlier version removed it.
  function ensureRegenButton(){
    const buttons=document.querySelectorAll('[data-enhance-mode]');
    if(!buttons.length || document.querySelector('[data-enhance-mode="regen"]')) return;
    const btn=document.createElement('button');
    btn.type='button'; btn.className='enhance-mode-btn'; btn.dataset.enhanceMode='regen';
    btn.innerHTML=`${itemVisual("regenScroll")} ใช้ใบบวก REGEN (100%)`;
    buttons[buttons.length-1].parentElement?.appendChild(btn);
  }
  ensureRegenButton();

  getEnhanceMode=function(){
    return ["normal","orb","regen"].includes(rpg.enhanceMode) ? rpg.enhanceMode : "normal";
  };
  setEnhanceMode=function(mode){
    rpg.enhanceMode=["normal","orb","regen"].includes(mode) ? mode : "normal";
    ensureRegenButton();
    document.querySelectorAll('[data-enhance-mode]').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.enhanceMode===rpg.enhanceMode);
    });
    syncCharacterEnhance();
  };

  syncCharacterEnhance=function(){
    ensureRegenButton();
    const item=getEnhanceItem();
    const picker=document.getElementById('enhanceEquipmentPicker');
    if(!item){
      document.getElementById('characterEnhanceWeaponName')&&(document.getElementById('characterEnhanceWeaponName').textContent='ยังไม่ได้เลือกอุปกรณ์');
      const btn=document.getElementById('characterEnhanceWeaponButton');
      if(btn){btn.disabled=true;btn.textContent='🔒 ต้องใส่อุปกรณ์อย่างน้อย 1 ชิ้น';}
      if(picker) renderEnhanceEquipmentPicker();
      return;
    }
    recalcEquipmentStatsByStars(item);
    const d=getEnhanceItemDisplay(),cur=d.stars,need=enhancementScrollNeed(cur,d.tier),chance=Math.round(enhancementChance(cur)*100),mode=getEnhanceMode();
    const name=document.getElementById('characterEnhanceWeaponName'); if(name)name.textContent=d.name;
    const rank=document.getElementById('characterEnhanceWeaponRank'); if(rank)rank.innerHTML=weaponStarHtml(cur,d.tier);
    const icon=document.querySelector('#characterEnhanceModal .enhance-weapon-icon'); if(icon)icon.textContent=d.icon;
    const dur=document.getElementById('characterEnhanceWeaponDurability'); if(dur)dur.textContent=`ความทนทาน ${d.durability}%${d.item?.broken?' · แตก':''}`;
    const rar=document.getElementById('characterEnhanceRarity'); if(rar){rar.textContent=d.tierMeta.label;rar.style.color=d.tierMeta.color;}
    document.getElementById('characterEnhanceScrollCount')?.replaceChildren(document.createTextNode(Number(state.rpgInventory.enhancementScroll||0).toLocaleString()));
    document.getElementById('characterMagicOrbCount')?.replaceChildren(document.createTextNode(Number(state.rpgInventory.magicOrb||0).toLocaleString()));
    const regenCountEl=document.getElementById('characterRegenScrollCount'); if(regenCountEl)regenCountEl.replaceChildren(document.createTextNode(Number(state.rpgInventory.regenScroll||0).toLocaleString()));
    const req=document.getElementById('characterEnhanceRequirement');
    if(req){
      if(cur>=8) req.innerHTML=`⭐ ${weaponStarHtml(8,d.tier)} อุปกรณ์ถึง 8 ดาวสูงสุดแล้ว`;
      else if(mode==='regen') req.innerHTML=`ต้องใช้ ${inlineItemVisual('enhancementScroll')} ${need.toLocaleString()} ใบ + ${inlineItemVisual('regenScroll')} 1 ใบ · <b>สำเร็จ 100% เพิ่ม 1 ดาวแน่นอน</b> · เป้าหมาย ${weaponStarHtml(cur+1,d.tier)}`;
      else if(mode==='orb') req.innerHTML=`ต้องใช้ ${inlineItemVisual('enhancementScroll')} ${need.toLocaleString()} ใบ + ${inlineItemVisual('magicOrb')} 1 ลูก · โอกาสสำเร็จ ${chance}% · <b>ล้มเหลวดาวไม่ลด แต่ความทนทานลดและอาจแตก</b> · เป้าหมาย ${weaponStarHtml(cur+1,d.tier)}`;
      else req.innerHTML=`ต้องใช้ ${inlineItemVisual('enhancementScroll')} ${need.toLocaleString()} ใบ · โอกาสสำเร็จ ${chance}% · <b>ล้มเหลวดาว -1 และความทนทานลด อาจแตก</b> · เป้าหมาย ${weaponStarHtml(cur+1,d.tier)}`;
    }
    const btn=document.getElementById('characterEnhanceWeaponButton');
    const hasScroll=Number(state.rpgInventory.enhancementScroll||0)>=need;
    const hasExtra=mode==='orb' ? Number(state.rpgInventory.magicOrb||0)>=1 : mode==='regen' ? Number(state.rpgInventory.regenScroll||0)>=1 : true;
    if(btn){
      btn.disabled=!!d.item?.broken||cur>=8||!hasScroll||!hasExtra;
      btn.textContent=cur>=8?'⭐ ครบ 8 ดาว':mode==='regen'?'✨ ใช้ใบบวก REGEN (สำเร็จ 100%)':mode==='orb'?'🔮 ตีบวกด้วยลูกแก้ว (กันดาวลด)':'⚒️ ตีบวกดาว';
    }
    document.querySelectorAll('[data-enhance-mode]').forEach(el=>el.classList.toggle('active',el.dataset.enhanceMode===mode));
    if(picker){
      picker.querySelectorAll('[data-enhance-slot]').forEach(el=>{
        const slot=el.dataset.enhanceSlot,it=state.rpgEquipment[slot],tier=getWeaponTier(it),tm=weaponTierMeta(tier);
        el.classList.toggle('selected',slot===rpg.enhanceSlot);
        el.classList.toggle('is-broken',!!it?.broken||Number(it?.durability||0)<=0);
        const lv=el.querySelector('.picker-level'); if(lv)lv.innerHTML=weaponStarHtml(getWeaponStars(it),tier);
        const rr=el.querySelector('.picker-rarity'); if(rr){rr.textContent=tm.label;rr.style.color=tm.color;}
      });
    }
  };

  enhanceWeapon=function(){
    if(rpg.inDungeon){
      rpg.combatLog='🔨 ต้องกลับไปหาช่างตีบวกหน้าดันเจี้ยน';
      const m=document.getElementById('enhanceMessage'); if(m)m.textContent=rpg.combatLog;
      return;
    }
    const d=getEnhanceItemDisplay(),item=d.item;
    if(!item||item.broken||d.stars>=8) return;
    const cur=d.stars,tier=d.tier,need=enhancementScrollNeed(cur,tier),mode=getEnhanceMode();
    const msg=document.getElementById('enhanceMessage');
    if(Number(state.rpgInventory.enhancementScroll||0)<need){if(msg)msg.textContent=`❌ ใบบวกไม่พอ ต้องใช้ ${need.toLocaleString()} ใบ`;syncCharacterEnhance();return;}
    if(mode==='orb'&&Number(state.rpgInventory.magicOrb||0)<1){if(msg)msg.textContent='❌ ลูกแก้วเวทมนตร์ไม่พอ';syncCharacterEnhance();return;}
    if(mode==='regen'&&Number(state.rpgInventory.regenScroll||0)<1){if(msg)msg.textContent='❌ ใบบวก REGEN ไม่พอ';syncCharacterEnhance();return;}

    state.rpgInventory.enhancementScroll-=need;
    if(mode==='orb') state.rpgInventory.magicOrb--;
    if(mode==='regen') state.rpgInventory.regenScroll--;

    // REGEN is always successful. It adds exactly one star and never rolls failure.
    const success=mode==='regen' ? true : Math.random()<enhancementChance(cur);
    if(success){
      item.stars=Math.min(8,cur+1);
      item.level=item.stars;
      item.broken=false;
      recalcEquipmentStatsByStars(item);
      if(rpg.enhanceSlot==='weapon'){
        rpg.weapon.stars=item.stars;
        rpg.weapon.level=item.stars;
        rpg.weapon.durability=Math.max(0,Number(item.durability??100));
        rpg.weapon.broken=false;
      }
      if(msg)msg.innerHTML=mode==='regen'
        ? `✨ REGEN สำเร็จ 100%! ${item.name} → ${weaponStarHtml(item.stars,tier)} · เพิ่ม 1 ดาวแน่นอน · ค่าพลังเพิ่มตามดาวใหม่`
        : `⭐ สำเร็จ! ${item.name} → ${weaponStarHtml(item.stars,tier)} · ค่าพลังเพิ่มตามดาวใหม่`;
      sfx('success');
    }else{
      const loss=Math.min(100,10+cur*7);
      item.durability=Math.max(0,Number(item.durability??100)-loss);
      item.broken=item.durability<=0;
      let starText='';
      if(mode!=='orb'){
        item.stars=Math.max(1,cur-1);
        item.level=item.stars;
        starText=`ดาว ${weaponStarHtml(cur,tier)} → ${weaponStarHtml(item.stars,tier)}`;
      }else{
        item.stars=cur; item.level=cur;
        starText=`🔮 ลูกแก้วป้องกันดาวลด · คงที่ ${weaponStarHtml(cur,tier)}`;
      }
      recalcEquipmentStatsByStars(item);
      if(rpg.enhanceSlot==='weapon'){
        rpg.weapon.stars=item.stars;
        rpg.weapon.level=item.stars;
        rpg.weapon.durability=item.durability;
        rpg.weapon.broken=item.broken;
      }
      if(msg)msg.innerHTML=item.broken
        ? `💥 ตีบวกล้มเหลว! ${starText} · ความทนทาน -${loss}% → 0% · อุปกรณ์แตก ต้องซ่อมก่อนใช้งาน`
        : `❌ ตีบวกล้มเหลว! ${starText} · ความทนทาน -${loss}% → ${item.durability}%`;
      sfx('error');
    }
    syncWeaponState();
    syncEquipmentFromWeapon();
    recalcAllEquippedStatsByStars();
    saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();
  };

  document.querySelectorAll('[data-enhance-mode]').forEach(btn=>{
    btn.onclick=()=>setEnhanceMode(btn.dataset.enhanceMode);
  });
})();

/* =========================
   V112 — King Enhancement after 8★
   8★ -> King ranks use escalating Universe Powder: 10, then 20, then 40.
   Failure never reduces stars/King rank, but durability still drops and can break.
   ========================= */
(function applyV112KingEnhancement(){
  const KING_MAX=3;
  function kingRank(item){return Math.max(0,Math.min(KING_MAX,Number(item?.kingRank||0)));}
  // Cost to advance: 8★ → King 1 = 10, King 1 → King 2 = 20, King 2 → King 3 = 40.
  function kingPowderNeed(currentRank){
    const costs=[10,20,40];
    return costs[Math.max(0,Math.min(costs.length-1,Number(currentRank||0)))];
  }
  function kingHtml(rank){
    rank=Math.max(0,Math.min(KING_MAX,Number(rank||0)));
    if(rank<=0)return '';
    return `<span class="weapon-star-display king-star-display" title="ระดับราชัน ${rank}"><span style="background:linear-gradient(90deg,#ff9d3d 0 50%,#ff4b5f 50% 100%);-webkit-background-clip:text;background-clip:text;color:transparent">${'★'.repeat(rank)}</span></span>`;
  }
  function rankText(item){const r=kingRank(item);return r>0?`👑 ราชัน ${kingHtml(r)}`:'';}

  // Extend stat scaling: normal 1-8★ remains unchanged; every King rank is one step above 8★.
  recalcEquipmentStatsByStars=function(item){
    if(!item)return;
    captureEnhancementBaseStats(item);
    const stars=Math.max(1,getWeaponStars(item));
    const kr=kingRank(item);
    // Normal stars use the existing 1x..8x progression.
    // Once King rank begins, ALL stats are multiplied by 3 for every King rank:
    // King 1 = current 8★ stats ×3, King 2 = King 1 stats ×3, etc.
    const scale=stars>=8
      ? (kr>0 ? 8*Math.pow(3,kr) : 8)
      : stars;
    item.baseDamage=Math.max(0,Math.round(Number(item.enhanceBaseDamage||0)*scale));
    item.bonusHp=Math.max(0,Math.round(Number(item.enhanceBaseHp||0)*scale));
    item.bonusDef=Math.max(0,Math.round(Number(item.enhanceBaseDef||0)*scale));
    item.enhancementStatModel=2;
  };

  const oldSync=syncCharacterEnhance;
  syncCharacterEnhance=function(){
    oldSync();
    const item=getEnhanceItem(); if(!item)return;
    const cur=getWeaponStars(item),kr=kingRank(item),msg=document.getElementById('enhanceMessage');
    const req=document.getElementById('characterEnhanceRequirement');
    const btn=document.getElementById('characterEnhanceWeaponButton');
    const powder=Number(state.rpgInventory.universePowder||0);
    const powderNeed=kingPowderNeed(kr);
    if(cur<8){
      document.querySelectorAll('[data-enhance-mode="orb"],[data-enhance-mode="regen"]').forEach(b=>{b.disabled=false;b.classList.remove('king-mode-locked');});
    }
    if(cur>=8){
      const name=document.getElementById('characterEnhanceWeaponName');
      const rank=document.getElementById('characterEnhanceWeaponRank');
      if(rank)rank.innerHTML=`${weaponStarHtml(8,getWeaponTier(item))}${kr?` <span style="margin-left:6px">${rankText(item)}</span>`:''}`;
      if(req){
        req.innerHTML=kr>=KING_MAX
          ? `👑 ${weaponStarHtml(8,getWeaponTier(item))} ${kingHtml(KING_MAX)} <b>ระดับราชันสูงสุดแล้ว</b>`
          : `👑 ปลดล็อกระดับราชันแล้ว · ต้องใช้ ${inlineItemVisual('universePowder')} <b>ผงแห่งจักรวาล ${powderNeed} ผง</b> ต่อครั้ง · โอกาสสำเร็จ ${Math.round(enhancementChance(8)*100)}% · <b>ล้มเหลวดาวและระดับราชันไม่ลด แต่ความทนทานลดและอาจแตก</b> · เป้าหมาย ${kingHtml(kr+1)}`;
      }
      if(btn){btn.disabled=!!item.broken||kr>=KING_MAX||powder<powderNeed;btn.textContent=kr>=KING_MAX?'👑 ระดับราชันสูงสุด':`👑 ตีบวกระดับราชัน (ใช้ผงแห่งจักรวาล ${powderNeed})`;
        // King enhancement can only use Universe Powder. Disable helper items.
        document.querySelectorAll('[data-enhance-mode="orb"],[data-enhance-mode="regen"]').forEach(b=>{b.disabled=true;b.classList.add('king-mode-locked');});
        const normalBtn=document.querySelector('[data-enhance-mode="normal"]'); if(normalBtn) normalBtn.disabled=false;}
      // show current powder in the message area only when no action result is being displayed
      if(!msg?.textContent){}
    }
  };

  enhanceWeapon=function(){
    if(rpg.inDungeon){const m=document.getElementById('enhanceMessage');if(m)m.textContent='🔨 ต้องกลับไปหาช่างตีบวกหน้าดันเจี้ยน';return;}
    const d=getEnhanceItemDisplay(),item=d.item;
    if(!item||item.broken)return;
    const cur=getWeaponStars(item),kr=kingRank(item),tier=d.tier,msg=document.getElementById('enhanceMessage');

    // King enhancement starts only after 8 normal stars.
    if(cur>=8){
      if(kr>=KING_MAX){if(msg)msg.textContent='👑 อุปกรณ์นี้ถึงระดับราชันสูงสุดแล้ว';return;}
      const powderNeed=kingPowderNeed(kr);
      const selectedMode=getEnhanceMode();
      if(selectedMode!=='normal'){if(msg)msg.textContent='❌ ระดับราชันใช้ได้เฉพาะผงแห่งจักรวาลเท่านั้น ห้ามใช้ลูกแก้วหรือใบบวก REGEN';syncCharacterEnhance();return;}
      if(Number(state.rpgInventory.universePowder||0)<powderNeed){if(msg)msg.textContent=`❌ ผงแห่งจักรวาลไม่พอ (มี ${Number(state.rpgInventory.universePowder||0).toLocaleString()} / ต้องใช้ ${powderNeed})`;syncCharacterEnhance();return;}
      state.rpgInventory.universePowder-=powderNeed;
      const success=Math.random()<enhancementChance(8);
      const loss=Math.min(100,10+8*7);
      if(success){
        item.kingRank=kr+1;
        recalcEquipmentStatsByStars(item);
        if(msg)msg.innerHTML=`👑 ตีบวกระดับราชันสำเร็จ! ${item.name} → ${weaponStarHtml(8,tier)} ${kingHtml(item.kingRank)} · ค่าพลังทั้งหมด ×3 จากระดับก่อนหน้า`;
        sfx('success');
      }else{
        item.kingRank=kr; // explicit: never lose King rank or normal stars
        item.durability=Math.max(0,Number(item.durability??100)-loss);
        item.broken=item.durability<=0;
        recalcEquipmentStatsByStars(item);
        if(msg)msg.innerHTML=item.broken
          ? `💥 ตีบวกระดับราชันล้มเหลว! ${weaponStarHtml(8,tier)} ${rankText(item)} ไม่ลด · ความทนทาน -${loss}% → 0% · อุปกรณ์แตก ต้องซ่อมก่อนใช้งาน`
          : `❌ ตีบวกระดับราชันล้มเหลว! ${weaponStarHtml(8,tier)} ${rankText(item)} ไม่ลด · ความทนทาน -${loss}% → ${item.durability}%`;
        sfx('error');
      }
      if(rpg.enhanceSlot==='weapon'){
        rpg.weapon.stars=item.stars;rpg.weapon.level=item.level;rpg.weapon.durability=item.durability;rpg.weapon.broken=item.broken;rpg.weapon.kingRank=item.kingRank||0;
      }
      syncWeaponState();syncEquipmentFromWeapon();recalcAllEquippedStatsByStars();saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();return;
    }

    // Preserve V111 rules below 8★.
    const need=enhancementScrollNeed(cur,tier),mode=getEnhanceMode();
    if(Number(state.rpgInventory.enhancementScroll||0)<need){if(msg)msg.textContent=`❌ ใบบวกไม่พอ ต้องใช้ ${need.toLocaleString()} ใบ`;return;}
    if(mode==='orb'&&Number(state.rpgInventory.magicOrb||0)<1){if(msg)msg.textContent='❌ ลูกแก้วเวทมนตร์ไม่พอ';return;}
    if(mode==='regen'&&Number(state.rpgInventory.regenScroll||0)<1){if(msg)msg.textContent='❌ ใบบวก REGEN ไม่พอ';return;}
    state.rpgInventory.enhancementScroll-=need;if(mode==='orb')state.rpgInventory.magicOrb--;if(mode==='regen')state.rpgInventory.regenScroll--;
    const success=mode==='regen'||Math.random()<enhancementChance(cur),loss=Math.min(100,10+cur*7);
    if(success){item.stars=cur+1;item.level=item.stars;recalcEquipmentStatsByStars(item);if(msg)msg.innerHTML=`${mode==='regen'?'✨ REGEN สำเร็จ 100%!':'⭐ สำเร็จ!'} ${item.name} → ${weaponStarHtml(item.stars,tier)} · ค่าพลังเพิ่มตามดาวใหม่`;sfx('success');}
    else{item.durability=Math.max(0,Number(item.durability??100)-loss);item.broken=item.durability<=0;if(mode!=='orb'){item.stars=Math.max(1,cur-1);item.level=item.stars;}recalcEquipmentStatsByStars(item);if(msg)msg.innerHTML=`❌ ตีบวกล้มเหลว! ${mode==='orb'?'🔮 ดาวไม่ลด':`ดาว ${weaponStarHtml(cur,tier)} → ${weaponStarHtml(item.stars,tier)}`} · ความทนทาน -${loss}%${item.broken?' · 💥 อุปกรณ์แตก ต้องซ่อม':''}`;sfx('error');}
    if(rpg.enhanceSlot==='weapon'){rpg.weapon.stars=item.stars;rpg.weapon.level=item.level;rpg.weapon.durability=item.durability;rpg.weapon.broken=item.broken;}
    syncWeaponState();syncEquipmentFromWeapon();recalcAllEquippedStatsByStars();saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();
  };
  recalcAllEquippedStatsByStars();saveState();
})();


/* =========================
   V115 — ADMIN PLAYER DIRECTORY + UNIVERSAL ITEM GRANT
   Adds one new admin tab only. Existing admin systems remain untouched.
   ========================= */
(function installV115AdminPlayers(){
  const PLAYER_DIRECTORY_KEY="farm_game_player_directory_v115";

  function v115Clone(x){try{return JSON.parse(JSON.stringify(x));}catch(_){return x;}}
  function v115LoadDirectory(){
    try{const d=JSON.parse(localStorage.getItem(PLAYER_DIRECTORY_KEY)||"{}");return d&&typeof d==="object"?d:{};}catch(_){return {};}
  }
  function v115SaveDirectory(d){localStorage.setItem(PLAYER_DIRECTORY_KEY,JSON.stringify(d));}
  function v115SnapshotCurrent(){
    const name=String(state?.username||"").trim(); if(!name)return;
    const d=v115LoadDirectory(), key=name.toLowerCase();
    d[key]={username:name,updatedAt:Date.now(),state:v115Clone(state)};
    v115SaveDirectory(d);
  }

  // Keep a directory of every name that has logged in on this browser/game installation.
  const v115OriginalSaveState=saveState;
  saveState=function(){const out=v115OriginalSaveState.apply(this,arguments);try{v115SnapshotCurrent();}catch(_){}return out;};
  const v115OriginalShowGame=showGame;
  showGame=function(){const out=v115OriginalShowGame.apply(this,arguments);try{v115SnapshotCurrent();}catch(_){}return out;};

  function v115Catalog(){
    const out=[
      {id:"currency:coins",kind:"currency",key:"coins",name:"เหรียญ",icon:"🪙",description:"เงินกลางของเกม"},
      {id:"currency:diamonds",kind:"currency",key:"diamonds",name:"เพชร",icon:"💎",description:"เพชรกลางของเกม"}
    ];
    try{
      Object.values(ITEM_DATABASE||{}).forEach(x=>out.push({id:"rpg:"+x.id,kind:"rpg",key:x.id,name:x.name||x.id,icon:x.icon||"🎁",description:x.description||"ไอเท็ม RPG"}));
      Object.entries(crops||{}).forEach(([id,x])=>out.push({id:"seed:"+id,kind:"seed",key:id,name:"เมล็ด"+(x.name||id),icon:x.icon||"🌱",description:"เมล็ดปลูกผัก"}));
      (rpgJunkTypes||[]).forEach(x=>out.push({id:"junk:"+x.id,kind:"junk",key:x.id,name:x.name||x.id,icon:x.icon||"📦",description:"วัสดุ/ของดรอป"}));
      const pools=adminConfig?.gacha?.boxes?.equipment?.pool||[];
      pools.forEach((x,i)=>{
        for(let stars=1;stars<=8;stars++){
          const data=v115Clone(x); data.fixedStars=stars; data.stars=stars;
          out.push({id:"equip:"+i+":"+(x.id||x.name)+":star:"+stars,kind:"equipment",data,name:(x.name||"อุปกรณ์")+" ⭐ "+stars+" ดาว",icon:x.icon||"⚔️",description:"อุปกรณ์ระดับ "+stars+" ดาว"});
        }
      });
    }catch(_){}
    // Explicitly include enhancement items even if a future catalog hides them.
    const special=[
      ["enhancementScroll","ใบบวก","📜"],["magicOrb","ลูกแก้วเวทมนตร์","🔮"],
      ["regenScroll","ใบบวก REGEN","✨"],["universePowder","ผงแห่งจักรวาล","🌌"],
      ["moonScroll","สเก็ตแห่งดวงจันทร์","📜"],["soulHammer","ค้อนคืนวิญญาณ","🔨"]
    ];
    special.forEach(([key,name,icon])=>{if(!out.some(x=>x.kind==="rpg"&&x.key===key))out.push({id:"rpg:"+key,kind:"rpg",key,name,icon,description:"ไอเท็มระบบ"});});
    const seen=new Set();return out.filter(x=>!seen.has(x.id)&&seen.add(x.id));
  }

  function v115Grant(player,item,qty){
    qty=Math.max(1,Math.floor(Number(qty)||1)); const s=player.state||{};
    if(item.kind==="currency"){s[item.key]=Math.max(0,Number(s[item.key]||0))+qty;}
    else if(item.kind==="seed"){s.seeds=s.seeds||{};s.seeds[item.key]=Math.max(0,Number(s.seeds[item.key]||0))+qty;}
    else if(item.kind==="rpg"){s.rpgInventory=s.rpgInventory||{};s.rpgInventory[item.key]=Math.max(0,Number(s.rpgInventory[item.key]||0))+qty;}
    else if(item.kind==="junk"){s.rpg=s.rpg||{};s.rpg.junk=s.rpg.junk||{};s.rpg.junk[item.key]=Math.max(0,Number(s.rpg.junk[item.key]||0))+qty;}
    else if(item.kind==="equipment"){
      s.gachaCollection=s.gachaCollection||[];
      for(let n=0;n<qty;n++){
        const x=v115Clone(item.data||{}), stars=Math.max(1,Math.min(8,Number(x.fixedStars||x.stars||1)));
        s.gachaCollection.push({id:"admin-"+Date.now()+"-"+n+"-"+Math.random().toString(36).slice(2),slot:x.slot||"weapon",name:x.name||"อุปกรณ์",icon:x.icon||"⚔️",baseDamage:Number(x.baseDamage||0),bonusHp:Number(x.bonusHp||0),bonusDef:Number(x.bonusDef||0),stars,level:stars,durability:100,broken:false});
      }
    }
    player.updatedAt=Date.now();
  }

  let v115SelectedPlayer="", v115SelectedItem="";
  function renderAdminPlayers(box){
    const dir=v115LoadDirectory(), list=Object.values(dir).sort((a,b)=>String(a.username).localeCompare(String(b.username),"th"));
    if(!v115SelectedPlayer&&list[0])v115SelectedPlayer=list[0].username.toLowerCase();
    const selected=list.find(p=>p.username.toLowerCase()===v115SelectedPlayer)||null;
    const catalog=v115Catalog();
    if(!v115SelectedItem&&catalog[0])v115SelectedItem=catalog[0].id;
    const filter=String(window.__v115PlayerFilter||"").toLowerCase();
    const visible=list.filter(p=>p.username.toLowerCase().includes(filter));
    box.innerHTML=`<div class="admin-note"><b>ผู้เล่นทั้งหมด ${list.length} คน</b> · เลือกผู้เล่นเพื่อแจกเฉพาะคน หรือกดปุ่มแจกทั้งเซิร์ฟเวอร์ได้โดยตรง</div>
      <div class="admin-card"><label class="admin-field">🔎 ค้นหาชื่อผู้เล่น<input id="v115PlayerSearch" value="${adminEsc(window.__v115PlayerFilter||"")}" placeholder="พิมพ์ชื่อผู้เล่น"></label></div>
      <div class="admin-grid">${visible.length?visible.map(p=>`<button type="button" class="admin-card ${p.username.toLowerCase()===v115SelectedPlayer?"active":""}" data-v115-player="${adminEsc(p.username.toLowerCase())}"><h3>👤 ${adminEsc(p.username)}</h3><p>อัปเดตล่าสุด: ${new Date(p.updatedAt||0).toLocaleString()}</p></button>`).join(""):'<div class="admin-note">ไม่พบผู้เล่น — แต่ยังสามารถกดแจกของทั้งเซิร์ฟเวอร์ได้</div>'}</div>
      <div class="admin-card"><h3>🎁 แจกของ</h3><div class="admin-row"><label class="admin-field">เลือกของ<select id="v115ItemSelect">${catalog.map(x=>`<option value="${adminEsc(x.id)}" ${x.id===v115SelectedItem?"selected":""}>${x.icon} ${adminEsc(x.name)} — ${adminEsc(x.description||"")}</option>`).join("")}</select></label><label class="admin-field">จำนวน<input id="v115GrantQty" type="number" min="1" value="1"></label></div>
      <div class="admin-row"><button class="admin-mini-btn" id="v115GrantPlayerButton" type="button" ${selected?"":"disabled"}>👤 แจกให้ผู้เล่น${selected?": "+adminEsc(selected.username):" (กรุณาเลือกผู้เล่น)"}</button><button class="admin-mini-btn" id="v115GrantServerButton" type="button">🌐 แจกของให้ทั้งเซิร์ฟเวอร์</button></div><div class="admin-note">ปุ่ม 🌐 แจกของให้ทั้งเซิร์ฟเวอร์: ผู้เล่นทุก ID จะเห็นของในกล่อง 🎁 และรับของขวัญแต่ละรายการได้ ID ละ 1 ครั้ง</div><div id="v115GrantStatus" class="admin-note"></div></div>`;
    box.querySelector("#v115PlayerSearch")?.addEventListener("input",e=>{window.__v115PlayerFilter=e.target.value;renderAdminPlayers(box);});
    box.querySelectorAll("[data-v115-player]").forEach(b=>b.onclick=()=>{v115SelectedPlayer=b.dataset.v115Player;renderAdminPlayers(box);});
    box.querySelector("#v115ItemSelect")?.addEventListener("change",e=>v115SelectedItem=e.target.value);
    const getGift=()=>{const item=v115Catalog().find(x=>x.id===v115SelectedItem), qty=box.querySelector("#v115GrantQty")?.value;return {item,amount:Math.max(1,Math.floor(Number(qty)||1))};};
    box.querySelector("#v115GrantServerButton")?.addEventListener("click",()=>{
      const {item,amount}=getGift(),st=box.querySelector("#v115GrantStatus"); if(!item)return;
      v164CreateServerGift(item,amount);
      if(st)st.textContent=`📮 ส่ง ${item.name} x${amount.toLocaleString()} เข้ากล่องของขวัญทั้งเซิร์ฟเวอร์แล้ว · ผู้เล่นแต่ละ ID รับได้ 1 ครั้ง`;
      v164RefreshMailboxIndicator();
    });
    box.querySelector("#v115GrantPlayerButton")?.addEventListener("click",()=>{
      const d=v115LoadDirectory(), p=d[v115SelectedPlayer], {item,amount}=getGift(),st=box.querySelector("#v115GrantStatus");
      if(!item||!p)return; v115Grant(p,item,amount); d[v115SelectedPlayer]=p; v115SaveDirectory(d);
      if(String(state?.username||"").toLowerCase()===v115SelectedPlayer){Object.assign(state,v115Clone(p.state));try{saveState();render();syncCurrencyDisplays();renderRpgInventory();renderRpgBag();}catch(_){}}
      if(st)st.textContent=`✅ ให้ ${item.name} x${amount.toLocaleString()} แก่ ${p.username} แล้ว`;
    });
  }

  // Final lightweight override: all existing admin tabs keep their original render path.
  const v115OriginalRenderAdmin=renderAdmin;
  renderAdmin=function(){
    if(adminTab!=="players")return v115OriginalRenderAdmin.apply(this,arguments);
    const box=document.getElementById("adminContent");if(!box)return;
    document.querySelectorAll("[data-admin-tab]").forEach(b=>b.classList.toggle("active",b.dataset.adminTab===adminTab));
    renderAdminPlayers(box);
  };

  // Existing tab listeners may have been installed earlier; install a direct listener for the new tab.
  document.querySelector('[data-admin-tab="players"]')?.addEventListener("click",()=>{adminTab="players";renderAdmin();});
  /* =========================
     V164 — SERVER MAILBOX / GLOBAL ADMIN GIFTS
     Only extends the existing player/gift admin tab and top bar.
     Other game systems are left untouched.
     ========================= */
  const V164_MAIL_KEY="farm_game_server_mail_v164";
  function v164LoadMail(){
    try{const x=JSON.parse(localStorage.getItem(V164_MAIL_KEY)||"[]");return Array.isArray(x)?x:[];}catch(_){return [];}
  }
  function v164SaveMail(list){localStorage.setItem(V164_MAIL_KEY,JSON.stringify(list));}
  function v164CreateServerGift(item,qty){
    const list=v164LoadMail();
    list.unshift({
      id:"server-gift-"+Date.now()+"-"+Math.random().toString(36).slice(2),
      createdAt:Date.now(),
      item:v115Clone(item),
      qty:Math.max(1,Math.floor(Number(qty)||1)),
      claims:{}
    });
    v164SaveMail(list);
  }
  function v164CurrentUserKey(){return String(state?.username||"").trim().toLowerCase();}
  function v164UnclaimedGifts(){
    const key=v164CurrentUserKey(); if(!key)return [];
    return v164LoadMail().filter(g=>g&&g.id&&!g.claims?.[key]);
  }
  function v164RefreshMailboxIndicator(){
    const badge=document.getElementById("mailboxBadge");
    const btn=document.getElementById("openMailboxButton");
    const has=v164UnclaimedGifts().length>0;
    if(badge)badge.classList.toggle("hidden",!has);
    if(btn)btn.classList.toggle("has-mail",has);
  }
  function v164RenderMailbox(){
    const listBox=document.getElementById("mailboxList"); if(!listBox)return;
    const gifts=v164UnclaimedGifts();
    if(!gifts.length){
      listBox.innerHTML='<div class="mailbox-empty">📭 <b>ยังไม่มีของขวัญใหม่</b><small>เมื่อแอดมินส่งของให้ทั้งเซิร์ฟเวอร์ ของจะปรากฏที่นี่</small></div>';
      v164RefreshMailboxIndicator(); return;
    }
    listBox.innerHTML=gifts.map(g=>{
      const item=g.item||{}, when=new Date(g.createdAt||Date.now()).toLocaleString();
      return `<div class="mailbox-gift"><div class="mailbox-gift-icon">${adminEsc(item.icon||"🎁")}</div><div class="mailbox-gift-info"><h3>${adminEsc(item.name||"ของขวัญ")}</h3><p>${adminEsc(item.description||"ของขวัญจากแอดมิน")}</p><small>จำนวน ${Math.max(1,Number(g.qty)||1).toLocaleString()} · ส่งเมื่อ ${adminEsc(when)}</small></div><button type="button" class="mailbox-claim" data-v164-claim="${adminEsc(g.id)}">รับของ</button></div>`;
    }).join("");
    listBox.querySelectorAll("[data-v164-claim]").forEach(btn=>btn.addEventListener("click",()=>{
      const id=btn.dataset.v164Claim, key=v164CurrentUserKey(); if(!id||!key)return;
      const list=v164LoadMail(), gift=list.find(x=>x.id===id);
      if(!gift || gift.claims?.[key]){v164RenderMailbox();return;}
      const live={username:state?.username||"",state};
      v115Grant(live,gift.item||{},gift.qty);
      gift.claims=gift.claims||{}; gift.claims[key]=Date.now();
      v164SaveMail(list);
      try{saveState();render();syncCurrencyDisplays();renderRpgInventory();renderRpgBag();}catch(_){}
      v164RenderMailbox();
    }));
    v164RefreshMailboxIndicator();
  }
  function v164OpenMailbox(){document.getElementById("mailboxPanel")?.classList.remove("hidden");v164RenderMailbox();}
  function v164CloseMailbox(){document.getElementById("mailboxPanel")?.classList.add("hidden");}
  document.getElementById("openMailboxButton")?.addEventListener("click",v164OpenMailbox);
  document.getElementById("mailboxClose")?.addEventListener("click",v164CloseMailbox);
  document.getElementById("mailboxPanel")?.addEventListener("click",e=>{if(e.target.id==="mailboxPanel")v164CloseMailbox();});
  const v164OriginalRender=render;
  render=function(){const out=v164OriginalRender.apply(this,arguments);try{v164RefreshMailboxIndicator();}catch(_){}return out;};
  window.addEventListener("storage",e=>{if(e.key===V164_MAIL_KEY){v164RefreshMailboxIndicator();if(!document.getElementById("mailboxPanel")?.classList.contains("hidden"))v164RenderMailbox();}});
  setInterval(v164RefreshMailboxIndicator,3000);
  try{v164RefreshMailboxIndicator();}catch(_){}

  /* =========================
     V181 — SECONDARY ADMIN SERVER GIFT CONTROL
     Adds only a new Secondary Admin menu. Main Admin and other systems untouched.
     ========================= */
  const v181SecondaryOriginalRender=renderSecondaryAdmin;
  function v181DurationMs(d,h,m){return Math.max(0,Math.floor((Number(d)||0)*86400000+(Number(h)||0)*3600000+(Number(m)||0)*60000));}
  function v181DurationText(ms){ms=Math.max(0,Number(ms)||0);const d=Math.floor(ms/86400000);ms%=86400000;const h=Math.floor(ms/3600000);ms%=3600000;const m=Math.floor(ms/60000);const a=[];if(d)a.push(d+' วัน');if(h)a.push(h+' ชั่วโมง');if(m||!a.length)a.push(m+' นาที');return a.join(' ');}
  // Extend the existing mailbox with expiry without changing its claim-per-player rule.
  const v181OldCreateServerGift=v164CreateServerGift;
  v164CreateServerGift=function(item,qty,durationMs){
    const list=v164LoadMail();
    list.unshift({id:'server-gift-'+Date.now()+'-'+Math.random().toString(36).slice(2),createdAt:Date.now(),expiresAt:Date.now()+Math.max(0,Number(durationMs)||0),item:v115Clone(item),qty:Math.max(1,Math.floor(Number(qty)||1)),claims:{}});
    v164SaveMail(list);return list[0];
  };
  v164UnclaimedGifts=function(){const key=v164CurrentUserKey(),now=Date.now();if(!key)return [];return v164LoadMail().filter(g=>g&&g.id&&(!g.expiresAt||Number(g.expiresAt)>now)&&!g.claims?.[key]);};
  v164RenderMailbox=function(){
    const listBox=document.getElementById('mailboxList');if(!listBox)return;const gifts=v164UnclaimedGifts();
    if(!gifts.length){listBox.innerHTML='<div class="mailbox-empty">📭 <b>ยังไม่มีของขวัญใหม่</b><small>เมื่อแอดมินส่งของให้ทั้งเซิร์ฟเวอร์ ของจะปรากฏที่นี่</small></div>';v164RefreshMailboxIndicator();return;}
    listBox.innerHTML=gifts.map(g=>{const item=g.item||{},when=new Date(g.createdAt||Date.now()).toLocaleString(),left=Math.max(0,Number(g.expiresAt||0)-Date.now());return `<div class="mailbox-gift"><div class="mailbox-gift-icon">${adminEsc(item.icon||'🎁')}</div><div class="mailbox-gift-info"><h3>${adminEsc(item.name||'ของขวัญ')}</h3><p>${adminEsc(item.description||'ของขวัญจากแอดมิน')}</p><small>จำนวน ${Math.max(1,Number(g.qty)||1).toLocaleString()} · ส่งเมื่อ ${adminEsc(when)} · เหลือ ${adminEsc(v181DurationText(left))}</small></div><button type="button" class="mailbox-claim" data-v164-claim="${adminEsc(g.id)}">รับของ</button></div>`;}).join('');
    listBox.querySelectorAll('[data-v164-claim]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.v164Claim,key=v164CurrentUserKey();if(!id||!key)return;const list=v164LoadMail(),gift=list.find(x=>x.id===id);if(!gift||gift.claims?.[key]||(gift.expiresAt&&Number(gift.expiresAt)<=Date.now())){v164RenderMailbox();return;}const live={username:state?.username||'',state};v115Grant(live,gift.item||{},gift.qty);gift.claims=gift.claims||{};gift.claims[key]=Date.now();v164SaveMail(list);try{saveState();render();syncCurrencyDisplays();renderRpgInventory();renderRpgBag();}catch(_){}v164RenderMailbox();}));v164RefreshMailboxIndicator();
  };
  let v181SecondaryTab='tower';
  renderSecondaryAdmin=function(){
    if(v181SecondaryTab==='tower')return v181SecondaryOriginalRender.apply(this,arguments);
    const box=document.getElementById('secondaryAdminContent');if(!box)return;const catalog=v115Catalog();
    box.innerHTML=`<div class="secondary-admin-tabs"><button data-v181-secondary-tab="tower">🗼 ควบคุมหอคอย</button><button class="active" data-v181-secondary-tab="gifts">🎁 แจกของผู้เล่น</button></div><div class="admin-note">แจกของให้ทั้งเซิร์ฟเวอร์เท่านั้น ผู้เล่นทุกคนจะเห็นในกล่องของขวัญและรับได้คนละ 1 ครั้ง กำหนดวัน ชั่วโมง และนาทีได้</div><div class="admin-card"><h3>🎁 แจกของเซิร์ฟเวอร์</h3><div class="admin-row"><label class="admin-field">เลือกของ<select id="v181GiftItem">${catalog.map(x=>`<option value="${adminEsc(x.id)}">${x.icon} ${adminEsc(x.name)} — ${adminEsc(x.description||'')}</option>`).join('')}</select></label><label class="admin-field">จำนวน<input id="v181GiftQty" type="number" min="1" value="1"></label></div><div class="admin-row"><label class="admin-field">วัน<input id="v181GiftDays" type="number" min="0" value="0"></label><label class="admin-field">ชั่วโมง<input id="v181GiftHours" type="number" min="0" value="0"></label><label class="admin-field">นาที<input id="v181GiftMinutes" type="number" min="0" value="10"></label></div><button type="button" class="admin-mini-btn" id="v181GiftSend">🌐 ส่งเข้ากล่องของขวัญเซิร์ฟเวอร์</button><div id="v181GiftStatus" class="admin-note"></div></div>`;
    box.querySelectorAll('[data-v181-secondary-tab]').forEach(b=>b.onclick=()=>{v181SecondaryTab=b.dataset.v181SecondaryTab;renderSecondaryAdmin();});
    box.querySelector('#v181GiftSend').onclick=()=>{const item=catalog.find(x=>x.id===box.querySelector('#v181GiftItem').value),qty=Math.max(1,Math.floor(Number(box.querySelector('#v181GiftQty').value)||1)),ms=v181DurationMs(box.querySelector('#v181GiftDays').value,box.querySelector('#v181GiftHours').value,box.querySelector('#v181GiftMinutes').value),st=box.querySelector('#v181GiftStatus');if(!item)return;if(ms<=0){if(st)st.textContent='⚠️ กรุณากำหนดเวลาอย่างน้อย 1 นาที';return;}v164CreateServerGift(item,qty,ms);v164RefreshMailboxIndicator();if(st)st.textContent=`✅ ส่ง ${item.name} x${qty.toLocaleString()} เข้ากล่องของขวัญเซิร์ฟเวอร์แล้ว · รับได้คนละ 1 ครั้ง · หมดอายุใน ${v181DurationText(ms)}`;};
  };
  document.getElementById('openSecondaryAdmin')?.addEventListener('click',()=>{v181SecondaryTab='tower';});
  // Make the tower tab also able to switch to the new menu.
  const v181OldTowerRender=renderSecondaryAdmin;
  // Header injection is handled after original tower render.
  const v181RenderDispatch=renderSecondaryAdmin;
  renderSecondaryAdmin=function(){
    if(v181SecondaryTab==='gifts')return v181RenderDispatch.apply(this,arguments);
    v181SecondaryOriginalRender.apply(this,arguments);
    const box=document.getElementById('secondaryAdminContent');const tabs=box?.querySelector('.secondary-admin-tabs');if(!tabs)return;
    tabs.innerHTML='<button class="active" data-v181-secondary-tab="tower">🗼 ควบคุมหอคอย</button><button data-v181-secondary-tab="gifts">🎁 แจกของผู้เล่น</button>';
    tabs.querySelectorAll('[data-v181-secondary-tab]').forEach(b=>b.onclick=()=>{v181SecondaryTab=b.dataset.v181SecondaryTab;renderSecondaryAdmin();});
  };
  try{v115SnapshotCurrent();}catch(_){}
})();


/* =========================
   V116 — Blood King-only Ascension Flow
   RED 8★ must arm with Universe Powder first.
   First King attempt failure: stars drop normally.
   King 1+ failure: rank/stars never drop, durability only.
   ========================= */
(function(){
  const kingNeed = r => [10,20,40][Math.max(0,Math.min(2,Number(r||0)))];
  const isBloodKing = item => getWeaponTier(item)==='RED';
  const oldSync = syncCharacterEnhance;
  syncCharacterEnhance=function(){
    oldSync();
    const item=getEnhanceItem(); if(!item)return;
    if(!state.rpgInventory) state.rpgInventory={};
    // unify legacy/other wallet field into the real RPG inventory field
    if((state.rpgInventory.universePowder==null || Number(state.rpgInventory.universePowder)===0) && Number(state.universePowder||0)>0)
      state.rpgInventory.universePowder=Number(state.universePowder||0);
    const stars=getWeaponStars(item), rank=Math.max(0,Number(item.kingRank||0)), powder=Number(state.rpgInventory.universePowder||0);
    const req=document.getElementById('characterEnhanceRequirement'), btn=document.getElementById('characterEnhanceWeaponButton');
    let arm=document.getElementById('kingPowderArmButton');
    if(!arm && btn){
      arm=document.createElement('button'); arm.id='kingPowderArmButton'; arm.type='button';
      arm.style.cssText='margin-top:8px;width:100%;padding:10px;border-radius:10px;font-weight:800;cursor:pointer;';
      btn.parentNode.insertBefore(arm,btn.nextSibling);
    }
    if(!isBloodKing(item) || stars<8 || rank>=3){
      if(arm) arm.style.display='none';
      return;
    }
    const need=kingNeed(rank), armed=!!item.kingPowderArmed;
    if(req) req.innerHTML=`🔴 <b>อุปกรณ์โลหิตราชัน 8 ดาว</b> เท่านั้นที่ขึ้นระดับราชันได้ · 🌌 ผงแห่งจักรวาลในกระเป๋า <b>${powder.toLocaleString()} ผง</b> · ต้องกดใช้ผงก่อน <b>${need} ผง</b> แล้วจึงตีบวก`;
    if(arm){
      arm.style.display='block';
      arm.disabled=armed || !!item.broken || powder<need;
      arm.textContent=armed?`🌌 ใช้ผงแล้ว ${need} ผง — พร้อมตีระดับราชัน`: `🌌 ใช้ผงแห่งจักรวาล ${need} ผง`;
      arm.onclick=function(){
        if(item.kingPowderArmed) return;
        const now=Number(state.rpgInventory.universePowder||0);
        if(now<need){const m=document.getElementById('enhanceMessage');if(m)m.textContent=`❌ ผงแห่งจักรวาลไม่พอ (มี ${now} / ต้องใช้ ${need})`;return;}
        state.rpgInventory.universePowder=now-need;
        item.kingPowderArmed=true;
        state.universePowder=state.rpgInventory.universePowder;
        const m=document.getElementById('enhanceMessage');if(m)m.textContent=`🌌 ใช้ผงแห่งจักรวาล ${need} ผงแล้ว พร้อมตีระดับราชัน`;
        saveState(); renderRpgBag(); syncCharacterEnhance();
      };
    }
    if(btn){
      btn.disabled=!!item.broken || !armed;
      btn.textContent=armed?`👑 ตีบวกระดับราชัน ${rank+1}`:'👑 ต้องกดใช้ผงจักรวาลก่อน';
    }
  };

  enhanceWeapon=function(){
    if(rpg.inDungeon){const m=document.getElementById('enhanceMessage');if(m)m.textContent='🔨 ต้องกลับไปหาช่างตีบวกหน้าดันเจี้ยน';return;}
    const d=getEnhanceItemDisplay(),item=d.item; if(!item||item.broken)return;
    const stars=getWeaponStars(item), rank=Math.max(0,Number(item.kingRank||0)), tier=getWeaponTier(item), msg=document.getElementById('enhanceMessage');

    // King path is strictly RED/Blood equipment at exactly 8 normal stars.
    if(tier==='RED' && stars>=8 && rank<3){
      if(!item.kingPowderArmed){if(msg)msg.textContent='❌ ต้องกด “ใช้ผงแห่งจักรวาล” ก่อน จึงจะตีระดับราชันได้';syncCharacterEnhance();return;}
      const selected=getEnhanceMode();
      if(selected!=='normal'){if(msg)msg.textContent='❌ ระดับราชันห้ามใช้ลูกแก้วและใบบวก REGEN';return;}
      item.kingPowderArmed=false; // one armed powder use = one attempt
      const success=Math.random()<enhancementChance(8), loss=Math.min(100,10+8*7);
      if(success){
        item.kingRank=rank+1; item.stars=8; item.level=8; item.broken=false;
        recalcEquipmentStatsByStars(item);
        if(msg)msg.innerHTML=`👑 สำเร็จ! ขึ้นระดับราชัน ${item.kingRank} · ค่าพลังทั้งหมด ×3 จากระดับก่อนหน้า`;
        sfx('success');
      }else{
        item.durability=Math.max(0,Number(item.durability??100)-loss);
        item.broken=item.durability<=0;
        if(rank===0){
          // First ascension attempt from RED 8★ follows normal failure: lose one star.
          item.stars=7; item.level=7; item.kingRank=0;
          if(msg)msg.innerHTML=`❌ ตีขึ้นระดับราชันล้มเหลว! 🔴 ดาว 8 → 7 · ความทนทาน -${loss}%${item.broken?' · 💥 อุปกรณ์แตก ต้องซ่อม':''}`;
        }else{
          // Once King 1 is reached, all later King failures only damage durability.
          item.stars=8; item.level=8; item.kingRank=rank;
          if(msg)msg.innerHTML=`❌ ตีระดับราชัน ${rank+1} ล้มเหลว! 👑 ราชัน ${rank} และดาว 8 ไม่ลด · ความทนทาน -${loss}%${item.broken?' · 💥 อุปกรณ์แตก ต้องซ่อม':''}`;
        }
        recalcEquipmentStatsByStars(item); sfx('error');
      }
      if(rpg.enhanceSlot==='weapon'){
        Object.assign(rpg.weapon,{stars:item.stars,level:item.level,durability:item.durability,broken:item.broken,kingRank:item.kingRank||0});
      }
      state.universePowder=Number(state.rpgInventory.universePowder||0);
      syncWeaponState();syncEquipmentFromWeapon();recalcAllEquippedStatsByStars();saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();return;
    }
    // Non-RED 8★ can never enter King mode.
    if(stars>=8){
      if(msg)msg.textContent='🔒 อุปกรณ์ 8 ดาวทั่วไปขึ้นระดับราชันไม่ได้ เฉพาะอุปกรณ์ระดับโลหิต (ดาวแดง) เท่านั้น';
      return;
    }
    // delegate normal path by temporarily using the prior V112 function is unavailable after override,
    // reproduce standard below-8 logic.
    const cur=stars, need=enhancementScrollNeed(cur,d.tier), mode=getEnhanceMode();
    if(Number(state.rpgInventory.enhancementScroll||0)<need){if(msg)msg.textContent=`❌ ใบบวกไม่พอ ต้องใช้ ${need} ใบ`;return;}
    if(mode==='orb'&&Number(state.rpgInventory.magicOrb||0)<1){if(msg)msg.textContent='❌ ลูกแก้วเวทมนตร์ไม่พอ';return;}
    if(mode==='regen'&&Number(state.rpgInventory.regenScroll||0)<1){if(msg)msg.textContent='❌ ใบบวก REGEN ไม่พอ';return;}
    state.rpgInventory.enhancementScroll-=need;if(mode==='orb')state.rpgInventory.magicOrb--;if(mode==='regen')state.rpgInventory.regenScroll--;
    const success=mode==='regen'||Math.random()<enhancementChance(cur), loss=Math.min(100,10+cur*7);
    if(success){item.stars=Math.min(8,cur+1);item.level=item.stars;recalcEquipmentStatsByStars(item);if(msg)msg.textContent='⭐ ตีบวกสำเร็จ!';sfx('success');}
    else{item.durability=Math.max(0,Number(item.durability??100)-loss);item.broken=item.durability<=0;if(mode!=='orb'){item.stars=Math.max(1,cur-1);item.level=item.stars;}recalcEquipmentStatsByStars(item);if(msg)msg.textContent='❌ ตีบวกล้มเหลว';sfx('error');}
    syncWeaponState();syncEquipmentFromWeapon();recalcAllEquippedStatsByStars();saveState();syncRpgHud();renderRpgInventory();renderRpgBag();renderEnhanceEquipmentPicker();syncCharacterEnhance();
  };
})();

/* =========================
   V117 — Final Universe Powder display + complete Admin gift catalog
   ========================= */
(function(){
  function v117PowderAmount(){
    const vals=[
      state?.rpgInventory?.universePowder,
      state?.itemInventory?.universePowder,
      state?.inventory?.universePowder,
      state?.universePowder
    ].map(v=>Math.max(0,Number(v)||0));
    const amount=Math.max.apply(Math,vals);
    if(!state.rpgInventory) state.rpgInventory={};
    state.rpgInventory.universePowder=amount;
    state.universePowder=amount;
    return amount;
  }

  const v117Sync=syncCharacterEnhance;
  syncCharacterEnhance=function(){
    v117PowderAmount();
    const out=v117Sync.apply(this,arguments);
    const count=document.getElementById('characterUniversePowderCount');
    if(count) count.textContent=v117PowderAmount().toLocaleString();
    return out;
  };

  // Keep the number visible even when the modal is opened before other UI refreshes.
  const v117Open=openCharacterEnhance;
  openCharacterEnhance=function(){
    v117PowderAmount();
    const out=v117Open.apply(this,arguments);
    const count=document.getElementById('characterUniversePowderCount');
    if(count) count.textContent=v117PowderAmount().toLocaleString();
    return out;
  };

  // Replace only the admin gift catalog: include every equipment entry and explicit 1★–8★ variants.
  const v117CatalogBase=v115Catalog;
  v115Catalog=function(){
    const out=v117CatalogBase();
    const seen=new Set(out.map(x=>x.id));

    function addEquipment(base, source, stars){
      const name=base?.name||'อุปกรณ์';
      const icon=base?.icon||'⚔️';
      const tier=base?.tier||base?.rarity||'NORMAL';
      const id='equipment:'+String(source)+':star:'+stars;
      if(seen.has(id)) return;
      seen.add(id);
      const data=v115Clone(base||{});
      data.stars=stars; data.level=stars; data.fixedStars=stars;
      data.kingRank=0; data.kingPowderArmed=false; data.durability=100; data.broken=false;
      out.push({
        id, kind:'equipment', data,
        name:`${name} ⭐${stars}`,
        icon,
        description:`${tier} · อุปกรณ์ระดับ ${stars} ดาว · แจกเข้าคลังผู้เล่นโดยตรง`
      });
    }

    const equipmentSources=[];
    try{
      const pool=adminConfig?.gacha?.boxes?.equipment?.pool||[];
      pool.forEach((x,i)=>equipmentSources.push({key:'gacha-'+i, data:x}));
    }catch(_){}
    // Include equipment from every configured gacha pool if present.
    try{
      Object.values(adminConfig?.gacha?.boxes||{}).forEach((box,bi)=>{
        (box?.pool||[]).forEach((x,xi)=>{
          if(x && (x.slot || x.baseDamage!=null || x.bonusHp!=null || x.bonusDef!=null))
            equipmentSources.push({key:`box-${bi}-${xi}`,data:x});
        });
      });
    }catch(_){}
    // Include currently known equipment templates from collections/equipment definitions.
    try{
      Object.values(state?.gachaCollection||[]).forEach((x,i)=>{
        if(x && (x.slot || x.baseDamage!=null || x.bonusHp!=null || x.bonusDef!=null))
          equipmentSources.push({key:`collection-${i}-${x.name||'item'}`,data:x});
      });
    }catch(_){}

    const unique=new Map();
    equipmentSources.forEach(({key,data})=>{
      const sig=[data?.name,data?.icon,data?.slot,data?.baseDamage,data?.bonusHp,data?.bonusDef,data?.tier||data?.rarity].join('|');
      if(!unique.has(sig)) unique.set(sig,{key,data});
    });
    unique.forEach(({key,data})=>{ for(let stars=1;stars<=8;stars++) addEquipment(data,key,stars); });

    return out;
  };

  // Preserve the star selected by admin exactly as chosen.
  const v117GrantBase=v115Grant;
  v115Grant=function(player,item,qty){
    if(item?.kind==='equipment' && item?.data){
      qty=Math.max(1,Math.floor(Number(qty)||1));
      const s=player.state||{}; s.gachaCollection=s.gachaCollection||[];
      for(let n=0;n<qty;n++){
        const x=v115Clone(item.data), stars=Math.max(1,Math.min(8,Number(x.stars||x.level||x.fixedStars||1)));
        x.id='admin-'+Date.now()+'-'+n+'-'+Math.random().toString(36).slice(2);
        x.stars=stars; x.level=stars; x.fixedStars=stars; x.kingRank=0; x.kingPowderArmed=false;
        x.durability=100; x.broken=false;
        s.gachaCollection.push(x);
      }
      player.updatedAt=Date.now(); return;
    }
    return v117GrantBase.apply(this,arguments);
  };
})();












/* V134 — PvP REAL-PLAYER PROXY AI: immediate full-map aggro, combat range, skills, heal/mana items (3 each), one-life match.
   The opponent is a real-player data proxy when data exists; AI only drives the controls. */
(function(){
  function pvpPowerDefFor(data){
    const all=[...(state.rpgPowers||[])].filter(Boolean);
    const wanted=data?.powerType||data?.powerId||data?.power;
    const found=all.find(x=>x.id===wanted||x.type===wanted||x.name===wanted);
    if(found) return found;
    if(all.length) return all[Math.floor(Math.random()*all.length)];
    return getActivePowerDef();
  }
  window.powerLabelForPvp=function(mob){
    const d=mob?.pvpPowerDef||getActivePowerDef();
    const pm=POWER_TIER_META[d.rarity]||POWER_TIER_META.C;
    return d.name||pm.label||d.type||'พลัง';
  };

  const oldCreatePvpOpponentMobV134=createPvpOpponentMob;
  createPvpOpponentMob=function(opponent){
    const mob=oldCreatePvpOpponentMobV134(opponent);
    const level=Math.max(1,Math.min(200,Number(opponent?.level||opponent?.characterLevel||200)));
    const isAi=String(opponent?.id||'').startsWith('ai-rank-')||opponent?.isAI===true||!opponent?.unlockedSkills;
    const unlocked=isAi?[0,1,2,3,4]:Array.isArray(opponent.unlockedSkills)
      ?opponent.unlockedSkills.map(Number).filter(i=>i>=0&&i<5)
      :SKILL_UNLOCK_LEVELS.map((lv,i)=>level>=lv?i:-1).filter(i=>i>=0);
    mob.pvpData=opponent||{};
    mob.pvpPowerDef=pvpPowerDefFor(opponent);
    mob.level=level;
    mob.maxMana=Math.max(80,Number(opponent?.maxMana)||180+level*3);
    mob.mana=Math.min(mob.maxMana,Math.max(0,Number(opponent?.mana??mob.maxMana)));
    mob.skillCds=[0,0,0,0,0];
    mob.skillCd=0;
    mob.unlockedSkills=unlocked.length?unlocked:[0];
    mob.isAi=isAi;
    mob.moving=true;
    mob.walkTime=0;
    mob.facingAngle=Math.PI;
    mob.aiSkillTimer=.18+Math.random()*.25;
    mob.aiThink=0;
    mob.aiAggroRange=99999; // full battlefield detection: sees player immediately on spawn
    mob.aiStopRange=92;     // stop before touching the player
    mob.aiAttackRange=118;  // normal attacks do not require face-to-face contact
    mob.attackDamage=Math.max(8,Math.round(Math.max(30,getEffectiveWeaponDamage?.()||30)
      *(Math.max(.65,Number(opponent?.power||1)/Math.max(1,getRankPlayerPower?.()||1)))*.42));
    mob.healUsesLeft=Math.max(0,Math.min(3,Number(opponent?.healUsesLeft??opponent?.hpPotionUses??3)));
    mob.manaUsesLeft=Math.max(0,Math.min(3,Number(opponent?.manaUsesLeft??opponent?.manaPotionUses??3)));
    mob.itemCd=0;
    mob.aiStartedAt=performance.now();
    return mob;
  };

  const oldUpdateRpgV134=updateRpg;
  updateRpg=function(dt){
    oldUpdateRpgV134(dt);
    const pb=rpg.pvpBattle, p=rpg.player, mob=pb?.mob;
    if(!pb?.active||!mob?.alive||!p||!rpg.running||!rpg.inDungeon||rpg.deathPending) return;

    // Full-map aggro: the opponent sees the player immediately and starts chasing from spawn.
    mob.aggro=true;
    mob.hitFlash=Math.max(0,(mob.hitFlash||0)-dt);
    mob.attackCd=Math.max(0,(mob.attackCd||0)-dt);
    mob.attackAnim=Math.max(0,(mob.attackAnim||0)-dt);
    mob.walkTime=(mob.walkTime||0)+dt*9;
    mob.mana=Math.min(mob.maxMana,mob.mana+10*dt);
    mob.skillCds=(mob.skillCds||[0,0,0,0,0]).map(v=>Math.max(0,v-dt));
    mob.itemCd=Math.max(0,(mob.itemCd||0)-dt);

    let dx=p.x-mob.x,dy=p.y-mob.y,dist=Math.hypot(dx,dy)||1;
    mob.facingAngle=Math.atan2(dy,dx);

    // Chase until combat distance, never require the models to overlap.
    if(dist>mob.aiStopRange){
      const speed=145;
      mob.x+=dx/dist*speed*dt;
      mob.y+=dy/dist*speed*dt;
      mob.moving=true;
    }else{
      mob.moving=false;
    }

    // Recalculate after movement for attacks/skills.
    dx=p.x-mob.x;dy=p.y-mob.y;dist=Math.hypot(dx,dy)||1;

    // AI consumables: each resource can be used at most three times per match.
    const hpRatio=(mob.hp||0)/Math.max(1,mob.maxHp||1);
    const mpRatio=(mob.mana||0)/Math.max(1,mob.maxMana||1);
    if(mob.itemCd<=0 && hpRatio<=.42 && mob.healUsesLeft>0){
      const heal=Math.max(1,Math.round(mob.maxHp*.36));
      mob.hp=Math.min(mob.maxHp,mob.hp+heal);
      mob.healUsesLeft--; mob.itemCd=.8;
      burst(mob.x,mob.y,'#65e889',24,150);
      showRpgDamageNumber(mob.x,mob.y-42,heal,'heal');
      rpg.combatLog=`💚 ${mob.pvpName} ใช้ฮีล (+${heal} HP) · เหลือ ${mob.healUsesLeft}/3`;
      sfx('heal');
    }else if(mob.itemCd<=0 && mpRatio<=.28 && mob.manaUsesLeft>0){
      const restore=Math.max(1,Math.round(mob.maxMana*.55));
      mob.mana=Math.min(mob.maxMana,mob.mana+restore);
      mob.manaUsesLeft--; mob.itemCd=.8;
      burst(mob.x,mob.y,'#62baff',22,145);
      rpg.combatLog=`💧 ${mob.pvpName} ใช้มานา (+${restore} MP) · เหลือ ${mob.manaUsesLeft}/3`;
      sfx('skill');
    }

    // Normal attack from a sensible combat distance.
    if(dist<=mob.aiAttackRange && mob.attackCd<=0 && p.hitCd<=0){
      const dmg=Math.max(8,Math.round(mob.attackDamage));
      mob.attackCd=.9; mob.attackAnim=.30;
      p.hp=Math.max(0,p.hp-dmg); p.hitCd=.22; p.hurtAnim=.28;
      burst(p.x,p.y,'#ff6f6f',10,88);
      showRpgDamageNumber(p.x,p.y-36,dmg,'normal');
      rpg.combatLog=`⚔️ ${mob.pvpName} โจมตี -${dmg} HP`;
      sfx('hurt');
    }

    // AI uses the opponent's unlocked skill set, mana and cooldowns.
    mob.aiSkillTimer=(mob.aiSkillTimer||0)-dt;
    const usable=mob.unlockedSkills.filter(i=>skillDefs[i]&&mob.skillCds[i]<=0&&mob.mana>=skillDefs[i].mana&&dist<=skillDefs[i].range);
    if(mob.aiSkillTimer<=0&&usable.length){
      const i=usable[Math.floor(Math.random()*usable.length)],skill=skillDefs[i];
      const ratio=Math.max(.55,Math.min(1.15,Number(mob.pvpPower||1)/Math.max(1,getRankPlayerPower?.()||1)));
      const dmg=Math.max(12,Math.round(getEffectiveSkillDamage(skill)*ratio*.55));
      mob.mana-=skill.mana;
      mob.skillCds[i]=Math.max(2.1,skill.cd);
      mob.attackAnim=.48;
      mob.aiSkillTimer=.9+Math.random()*1.15;
      p.hp=Math.max(0,p.hp-dmg);p.hitCd=.30;p.hurtAnim=.42;
      showRpgDamageNumber(p.x,p.y-42,dmg,'skill');
      const pd=mob.pvpPowerDef||getActivePowerDef();
      const pal=(POWER_TIER_META[pd.rarity]||POWER_TIER_META.C).color||skill.color||'#9b6cff';
      burst(mob.x,mob.y,pal,20+i*3,150+i*20);
      burst(p.x,p.y,pal,18+i*3,135+i*18);
      mob.skillAnim={name:`pvp-${i}`,life:.55,max:.55};
      rpg.combatLog=`✨ ${mob.pvpName} ใช้สกิล ${skill.name} -${dmg} HP`;
      sfx(['skill','fire','ice','shadow','meteor'][i]||'skill');
    }
    if(p.hp<=0&&!rpg.deathPending) finishRpgPvp('lose');
  };

  // PvP normal attack range matches the visual combat scale better.
  const oldPvpAttackV134=rpgAttack;
  rpgAttack=function(){
    if(!isPvpBattleActive()) return oldPvpAttackV134.apply(this,arguments);
    if(!rpg.running || !rpg.inDungeon || rpg.player.attackCd>0 || rpg.deathPending) return;
    const target=nearestAliveMob();
    if(!target.mob || target.dist>125){
      rpg.combatLog='⚔️ เข้าใกล้คู่ต่อสู้อีกเล็กน้อย';
      return;
    }
    rpg.player.attackCd=.34;
    sfx(rpg.weapon.broken?'hit':'sword');
    rpg.player.attackAnim=.30;
    rpg.player.facing=Math.abs(target.mob.x-rpg.player.x)>Math.abs(target.mob.y-rpg.player.y)
      ?(target.mob.x>rpg.player.x?'right':'left')
      :(target.mob.y>rpg.player.y?'down':'up');
    const angle=Math.atan2(target.mob.y-rpg.player.y,target.mob.x-rpg.player.x);
    rpg.hitEffects=[]; addSlash(rpg.player.x,rpg.player.y,angle);
    burst(target.mob.x,target.mob.y,'#f8e7a1',12,110);
    const damage=rpg.weapon.broken?1:getEffectiveWeaponDamage();
    target.mob.hp=Math.max(0,target.mob.hp-damage);
    showRpgDamageNumber(target.mob.x,target.mob.y-30,damage,'normal');
    target.mob.hitFlash=.16;target.mob.aggro=true;
    rpg.combatLog=`⚔️ ฟัน ${damage} ดาเมจ`;
    if(target.mob.hp<=0){
      target.mob.alive=false;
      rpg.combatLog=`🏆 เอาชนะ ${target.mob.pvpName}!`;
      setTimeout(()=>finishRpgPvp('win'),120);
    }
  };

  // One-life guarantee: any side reaching zero ends the match immediately; no PvP respawn path is allowed.
  const oldFinishRpgPvpV134=finishRpgPvp;
  finishRpgPvp=function(result){
    if(rpg.pvpBattle?.mob) rpg.pvpBattle.mob.alive=false;
    return oldFinishRpgPvpV134.apply(this,arguments);
  };
})();


/* V133 — PvP opponent uses a full status panel (same style as the player), not overhead bars.
   Also hardens PvP keyboard/focus so entering a match never leaves the player unable to move. */
(function(){
  function ensurePvpOpponentHud(){
    let hud=document.getElementById('pvpOpponentHud');
    if(hud) return hud;
    const host=document.querySelector('#rpgWorld .rpg-stage-card');
    if(!host) return null;
    hud=document.createElement('div');
    hud.id='pvpOpponentHud';
    hud.className='rpg-player-hud dungeon-status-hud pvp-opponent-hud hidden';
    hud.innerHTML=`
      <div class="rpg-status-head">
        <div><b id="pvpOpponentName">คู่ต่อสู้</b><span>Lv.<b id="pvpOpponentLevel">1</b></span></div>
        <span class="rpg-defense-pill">🛡️ DEF <b id="pvpOpponentDefense">0</b></span>
      </div>
      <div class="rpg-status-row"><span class="status-label hp-label">❤️ HP</span><div class="rpg-hp"><i id="pvpOpponentHpBar"></i></div><small id="pvpOpponentHpText">0 / 0 HP</small></div>
      <div class="rpg-status-row"><span class="status-label mp-label">💧 MP</span><div class="rpg-mp"><i id="pvpOpponentManaBar"></i></div><small id="pvpOpponentManaText">0 / 0 MP</small></div>
      <div class="pvp-opponent-items"><span>💚 ฮีล <b id="pvpOpponentHealUses">3</b>/3</span><span>💧 มานา <b id="pvpOpponentManaUses">3</b>/3</span></div>`;
    host.appendChild(hud);
    return hud;
  }
  function syncPvpOpponentHud(){
    const hud=ensurePvpOpponentHud();
    const pb=rpg.pvpBattle, mob=pb?.mob;
    if(!hud) return;
    const active=!!(pb?.active&&mob?.alive);
    hud.classList.toggle('hidden',!active);
    if(!active) return;
    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
    const width=(id,n,d)=>{const el=document.getElementById(id);if(el)el.style.width=(Math.max(0,Math.min(1,n/Math.max(1,d)))*100)+'%';};
    set('pvpOpponentName',mob.pvpName||pb.opponent?.name||'คู่ต่อสู้');
    set('pvpOpponentLevel',mob.level||pb.opponent?.level||1);
    set('pvpOpponentDefense',Math.max(0,Math.round((Number(mob.pvpPower||0)||0)*.018)).toLocaleString());
    set('pvpOpponentHpText',`${Math.ceil(mob.hp||0)} / ${Math.ceil(mob.maxHp||0)} HP`);
    set('pvpOpponentManaText',`${Math.floor(mob.mana||0)} / ${Math.floor(mob.maxMana||0)} MP`);
    set('pvpOpponentHealUses',Math.max(0,Number(mob.healUsesLeft??0)));
    set('pvpOpponentManaUses',Math.max(0,Number(mob.manaUsesLeft??0)));
    width('pvpOpponentHpBar',mob.hp,mob.maxHp);
    width('pvpOpponentManaBar',mob.mana,mob.maxMana);
  }
  const oldSync=syncRpgHud;
  syncRpgHud=function(){oldSync();syncPvpOpponentHud();};

  // Extra PvP-only input safety net. This does not replace main-game controls; it guarantees W/A/S/D and skills work after the VS scene closes.
  function pvpInputDown(e){
    if(!isPvpBattleActive()||!rpg.running||rpg.deathPending) return;
    if(e.target?.closest?.('input,textarea,select')) return;
    const code=(e.code||'').toLowerCase(), key=(e.key||'').toLowerCase();
    const k=['keyw','keya','keys','keyd'].includes(code)?code.slice(3):key;
    if(['w','a','s','d'].includes(k)){rpg.keys[k]=true;rpg.player.moving=true;e.preventDefault();}
    else if(k===' '){e.preventDefault();rpgAttack();}
    else if(['1','2','3','4','5'].includes(k)){e.preventDefault();rpg.player.selectedSkill=Number(k)-1;rpgSkill();}
  }
  function pvpInputUp(e){
    if(!isPvpBattleActive()) return;
    const code=(e.code||'').toLowerCase(), key=(e.key||'').toLowerCase();
    const k=['keyw','keya','keys','keyd'].includes(code)?code.slice(3):key;
    if(['w','a','s','d'].includes(k)){rpg.keys[k]=false;if(!rpg.keys.w&&!rpg.keys.a&&!rpg.keys.s&&!rpg.keys.d)rpg.player.moving=false;}
  }
  window.addEventListener('keydown',pvpInputDown,{capture:true,passive:false});
  window.addEventListener('keyup',pvpInputUp,{capture:true,passive:false});
  const oldEnter=enterRankPvpBattle;
  enterRankPvpBattle=function(session){
    oldEnter(session);
    const canvas=document.getElementById('rpgCanvas')||rpgCanvas;
    try{canvas?.focus?.({preventScroll:true});}catch(_){canvas?.focus?.();}
    syncPvpOpponentHud();
  };
})();


/* V135 — PvP ONLY FIX
   - Both sides: HP/Mana consumables are limited to 3 uses each per match.
   - Opponent HUD mirrors the player's status HUD and stays on the opposite side.
   - Opponent has instant full-map detection and chases immediately.
   - Melee closes to melee range; skills fire only when their own range is reached.
*/
(function(){
  function pvpActive(){ return !!(rpg.pvpBattle && rpg.pvpBattle.active && !rpg.pvpBattle.finished); }

  // Start every match with fresh per-match consumable counters for the LOCAL player only.
  // The opponent is a real-player data proxy controlled by AI, so its saved/matched data
  // must never be overwritten with a fresh 3/3 reset here.
  const enterV135=enterRankPvpBattle;
  enterRankPvpBattle=function(session){
    const result=enterV135.apply(this,arguments);
    if(rpg.pvpBattle){
      // Only our side gets a new per-match allowance.
      rpg.pvpBattle.playerHealUsesLeft=3;
      rpg.pvpBattle.playerManaUsesLeft=3;
      if(rpg.pvpBattle.mob){
        // Keep the matched real player's data exactly as supplied. AI controls the bot,
        // but does not turn the opponent into a newly reset character.
        rpg.pvpBattle.mob.aiAggroRange=Infinity;
        rpg.pvpBattle.mob.aggro=true;
        rpg.pvpBattle.mob.aiStopRange=90;
      }
    }
    syncRpgHud();
    return result;
  };

  // PvP player potion limit: inventory quantity is preserved, but no more than 3 HP
  // and 3 Mana potions can be consumed during the current match.
  const consumableV135=useDungeonConsumable;
  useDungeonConsumable=function(id){
    const pb=rpg.pvpBattle;
    if(pvpActive() && (id==='hpPotion'||id==='manaPotion')){
      const key=id==='hpPotion'?'playerHealUsesLeft':'playerManaUsesLeft';
      const remaining=Math.max(0,Number(pb[key]??3));
      if(remaining<=0){
        rpg.combatLog=id==='hpPotion'
          ? '💚 ใช้ไอเท็มเพิ่ม HP ครบ 3 ครั้งแล้วในแมตช์นี้'
          : '💧 ใช้ไอเท็มเพิ่ม Mana ครบ 3 ครั้งแล้วในแมตช์นี้';
        syncRpgHud();
        return;
      }
      const beforeHp=rpg.player.hp, beforeMana=rpg.player.mana;
      const beforeQty=getDungeonItemQty(id);
      const result=consumableV135.apply(this,arguments);
      const actuallyUsed=id==='hpPotion'
        ? (rpg.player.hp>beforeHp && getDungeonItemQty(id)<beforeQty)
        : (rpg.player.mana>beforeMana && getDungeonItemQty(id)<beforeQty);
      if(actuallyUsed){
        pb[key]=remaining-1;
        rpg.combatLog+=(id==='hpPotion'
          ? ` · PvP HP เหลือ ${pb[key]}/3`
          : ` · PvP Mana เหลือ ${pb[key]}/3`);
        syncRpgHud();
      }
      return result;
    }
    return consumableV135.apply(this,arguments);
  };

  // Replace only the PvP AI behavior so every opponent locks onto the player
  // immediately, then selects skill/normal attacks by actual combat range.
  const updateV135=updateRpg;
  updateRpg=function(dt){
    updateV135.apply(this,arguments);
    const pb=rpg.pvpBattle, mob=pb?.mob, p=rpg.player;
    if(!pvpActive()||!mob?.alive||!p||p.hp<=0) return;

    mob.aggro=true; // no detection distance at all
    mob.attackCd=Math.max(0,(mob.attackCd||0)-0); // keep existing V134 cooldown result

    let dx=p.x-mob.x, dy=p.y-mob.y, dist=Math.hypot(dx,dy)||1;
    mob.facingAngle=Math.atan2(dy,dx);

    // V134 already handles combat; this only guarantees chase continues if the
    // base scene moved/paused the opponent. Never overlap the two characters.
    const meleeRange=Math.max(88,Number(mob.aiStopRange||90));
    if(dist>meleeRange && !mob.moving){
      const speed=145;
      mob.x+=dx/dist*speed*Math.min(dt,.05);
      mob.y+=dy/dist*speed*Math.min(dt,.05);
      mob.moving=true;
    }
  };

  // Add PvP-only counters to the player's existing status panel, without touching
  // the normal RPG HUD outside a match.
  function ensurePlayerPvpUses(){
    let el=document.getElementById('pvpPlayerUses');
    if(el) return el;
    const hud=document.querySelector('#rpgWorld .rpg-player-hud.dungeon-status-hud');
    if(!hud) return null;
    el=document.createElement('div');
    el.id='pvpPlayerUses';
    el.className='pvp-player-items hidden';
    el.innerHTML='<span>💚 ฮีล <b id="pvpPlayerHealUses">3</b>/3</span><span>💧 มานา <b id="pvpPlayerManaUses">3</b>/3</span>';
    hud.appendChild(el);
    return el;
  }
  function syncPlayerPvpUses(){
    const el=ensurePlayerPvpUses(), pb=rpg.pvpBattle;
    if(!el) return;
    const active=pvpActive();
    el.classList.toggle('hidden',!active);
    if(!active) return;
    const h=document.getElementById('pvpPlayerHealUses');
    const m=document.getElementById('pvpPlayerManaUses');
    if(h) h.textContent=Math.max(0,Number(pb.playerHealUsesLeft??3));
    if(m) m.textContent=Math.max(0,Number(pb.playerManaUsesLeft??3));
  }
  const syncV135=syncRpgHud;
  syncRpgHud=function(){ syncV135.apply(this,arguments); syncPlayerPvpUses(); };

  // Make the opponent panel truly mirror the player's panel and sit opposite it.
  const styleId='v135PvpOnlyStyle';
  if(!document.getElementById(styleId)){
    const st=document.createElement('style');
    st.id=styleId;
    st.textContent=`
      #rpgWorld.pvp-rpg-mode .pvp-opponent-hud{left:auto!important;right:18px!important;top:18px!important}
      #rpgWorld.pvp-rpg-mode .pvp-player-items{display:flex;gap:10px;flex-wrap:wrap;margin-top:7px;font-size:12px;opacity:.95}
      #rpgWorld.pvp-rpg-mode .pvp-player-items.hidden{display:none}
      #rpgWorld.pvp-rpg-mode .pvp-opponent-items{display:flex!important}
    `;
    document.head.appendChild(st);
  }
})();

/* V137 — PVP ONLY: match loadout, full opponent status, long-range AI skill behavior, no revival. */
(function(){
  const PVP_POTION_IDS=['hpPotion','manaPotion'];
  const PVP_MAX_POTION_USES=3;

  function pvpStatNumber(v,fallback=0){ const n=Number(v); return Number.isFinite(n)?n:fallback; }
  function pvpDefenseFor(data){
    if(data?.defense!=null) return Math.max(0,Math.round(pvpStatNumber(data.defense)));
    if(data?.def!=null) return Math.max(0,Math.round(pvpStatNumber(data.def)));
    return Math.max(0,Math.round(pvpStatNumber(data?.power)*.018));
  }
  function pvpPowerForData(data){ return pvpPowerDefFor(data||{}); }
  function pvpSkillList(data){
    const pd=pvpPowerForData(data);
    return Array.isArray(pd?.skills)&&pd.skills.length?pd.skills:skillDefs;
  }
  function pvpOpponentCombatStats(data){
    const level=Math.max(1,Math.min(200,pvpStatNumber(data?.level??data?.characterLevel,200)));
    const power=Math.max(1,pvpStatNumber(data?.power,1000));
    const maxHp=Math.max(220,pvpStatNumber(data?.maxHp,battleHpMax({power})*1.35));
    const maxMana=Math.max(80,pvpStatNumber(data?.maxMana,180+level*3));
    return {level,power,maxHp,maxMana,defense:pvpDefenseFor(data),powerDef:pvpPowerForData(data)};
  }

  // Enrich only the PvP matchmaking snapshot with the loadout shown before entering battle.
  const rankPlayerDataV137=getRankPlayerData;
  getRankPlayerData=function(){
    const d=rankPlayerDataV137.apply(this,arguments);
    const power=getActivePowerDef();
    d.level=Math.max(1,Number(rpg.player?.level||state.rpgCharacter?.level||1));
    d.maxHp=Math.max(1,Number(rpg.player?.maxHp||battleHpMax(d)));
    d.maxMana=Math.max(1,Number(rpg.player?.maxMana||180+d.level*3));
    d.defense=Math.max(0,Number(rpg.player?.defense||getEffectiveDefense?.()||Math.round(d.power*.018)));
    d.powerId=power?.id||power?.type||power?.name||'';
    d.powerType=d.powerId;
    d.powerName=power?.name||'พลัง';
    d.skills=(power?.skills||skillDefs||[]).map((s,i)=>({i,name:s.name,icon:s.icon,mana:s.mana,range:s.range,cd:s.cd,damage:s.damage}));
    return d;
  };

  const createOpponentV137=createPvpOpponentMob;
  createPvpOpponentMob=function(opponent){
    const mob=createOpponentV137.apply(this,arguments), st=pvpOpponentCombatStats(opponent);
    mob.level=st.level; mob.pvpPower=st.power; mob.maxHp=st.maxHp; mob.hp=Math.min(st.maxHp,Math.max(1,pvpStatNumber(opponent?.hp,st.maxHp)));
    mob.maxMana=st.maxMana; mob.mana=Math.min(st.maxMana,Math.max(0,pvpStatNumber(opponent?.mana,st.maxMana)));
    mob.pvpDefense=st.defense; mob.pvpPowerDef=st.powerDef;
    mob.pvpSkills=pvpSkillList(opponent);
    mob.unlockedSkills=(Array.isArray(opponent?.unlockedSkills)&&opponent.unlockedSkills.length?opponent.unlockedSkills:SKILL_UNLOCK_LEVELS.map((lv,i)=>st.level>=lv?i:-1).filter(i=>i>=0&&i<mob.pvpSkills.length));
    if(!mob.unlockedSkills.length) mob.unlockedSkills=[0];
    // Always detect immediately, but keep enough space to use the longest usable skill.
    mob.aiAggroRange=Infinity;
    mob.aiStopRange=110;
    mob.aiAttackRange=145;
    return mob;
  };

  // PvP room automatically carries ONLY HP/Mana from the player's inventory. Revival is explicitly disabled.
  const enterPvpV137=enterRankPvpBattle;
  enterRankPvpBattle=function(session){
    // Never import dungeon loot/junk into PvP. Make a fresh PvP carry bag from main inventory.
    const bag=ensureDungeonBag();
    bag.coins=0; bag.junk={}; bag.items={};
    for(const id of PVP_POTION_IDS){
      const qty=Math.max(0,Number(state.rpgInventory?.[id]||0));
      if(qty>0){ bag.items[id]=qty; state.rpgInventory[id]=0; }
    }
    // Revival potion is deliberately excluded from PvP even if the player owns it.
    rpg.dungeonQuickSlots=['hpPotion','manaPotion','','',''];
    const result=enterPvpV137.apply(this,arguments);
    if(rpg.pvpBattle){
      rpg.pvpBattle.playerHealUsesLeft=PVP_MAX_POTION_USES;
      rpg.pvpBattle.playerManaUsesLeft=PVP_MAX_POTION_USES;
      rpg.pvpBattle.pvpCarry=true;
      rpg.pvpBattle.noRevive=true;
    }
    renderDungeonBag(); renderDungeonQuickbar(); syncRpgHud();
    return result;
  };

  // PvP can never consume a revival item or use any resurrection flow.
  const usePvpConsumableV137=useDungeonConsumable;
  useDungeonConsumable=function(id){
    if(isPvpBattleActive()&&id==='revivalPotion'){
      rpg.combatLog='☠️ PVP ไม่มีการชุบชีวิต — ตายแล้วแพ้ทันที'; syncRpgHud(); return;
    }
    return usePvpConsumableV137.apply(this,arguments);
  };

  // Replace the final PvP AI pass: it sees the player anywhere, stops at useful skill range,
  // and uses the matched opponent's own power skill definitions/ranges/mana/cooldowns.
  const updatePvpV137=updateRpg;
  updateRpg=function(dt){
    updatePvpV137.apply(this,arguments);
    const pb=rpg.pvpBattle,mob=pb?.mob,p=rpg.player;
    if(!pb?.active||pb.finished||!mob?.alive||!p||p.hp<=0) return;
    const skills=mob.pvpSkills||pvpSkillList(pb.opponent);
    const usableIndexes=(mob.unlockedSkills||[]).filter(i=>skills[i]);
    const readySkills=usableIndexes.filter(i=>{
      const s=skills[i]; return (mob.skillCds?.[i]||0)<=0 && mob.mana>=Number(s.mana||0);
    });
    const longestReady=readySkills.reduce((m,i)=>Math.max(m,Number(skills[i].range||0)),0);
    const desiredRange=Math.max(mob.aiAttackRange||145, Math.min(520,longestReady||0));
    let dx=p.x-mob.x,dy=p.y-mob.y,dist=Math.hypot(dx,dy)||1;
    mob.aggro=true; mob.facingAngle=Math.atan2(dy,dx);
    // Base updates may move the mob; this pass keeps the bot closing until it reaches an actual combat range.
    if(dist>desiredRange){
      const speed=175;
      mob.x+=dx/dist*speed*Math.min(dt,.05); mob.y+=dy/dist*speed*Math.min(dt,.05); mob.moving=true;
    }else mob.moving=false;
    dx=p.x-mob.x;dy=p.y-mob.y;dist=Math.hypot(dx,dy)||1;
    mob._v137SkillThink=(mob._v137SkillThink||0)-dt;
    const inRange=readySkills.filter(i=>dist<=Number(skills[i].range||0));
    if(mob._v137SkillThink<=0&&inRange.length&&p.hitCd<=0){
      // Prefer the strongest/ranged available skill instead of randomly requiring point-blank contact.
      const i=inRange.sort((a,b)=>Number(skills[b].damage||0)-Number(skills[a].damage||0)||Number(skills[b].range||0)-Number(skills[a].range||0))[0];
      const s=skills[i];
      const ratio=Math.max(.55,Math.min(1.25,Number(mob.pvpPower||1)/Math.max(1,getRankPlayerPower?.()||1)));
      const base=Math.max(12,Number(s.damage||0)||Math.round((mob.pvpPower||1)*.006));
      const dmg=Math.max(12,Math.round(base*ratio));
      mob.mana=Math.max(0,mob.mana-Number(s.mana||0));
      mob.skillCds[i]=Math.max(1.5,Number(s.cd||2.5));
      p.hp=Math.max(0,p.hp-dmg); p.hitCd=.30; p.hurtAnim=.42;
      showRpgDamageNumber(p.x,p.y-42,dmg,'skill');
      const pd=mob.pvpPowerDef||getActivePowerDef(),pal=(POWER_TIER_META[pd.rarity]||POWER_TIER_META.C).color||s.color||'#9b6cff';
      burst(mob.x,mob.y,pal,18+i*3,160); burst(p.x,p.y,pal,18+i*3,150);
      mob.skillAnim={name:`pvp-${i}`,life:.55,max:.55}; mob._v137SkillThink=.55+Math.random()*.35;
      rpg.combatLog=`✨ ${mob.pvpName} ใช้สกิล ${s.name||`สกิล ${i+1}`} -${dmg} HP`;
      sfx(['skill','fire','ice','shadow','meteor'][i]||'skill');
      if(p.hp<=0) finishRpgPvp('lose');
    }
    syncRpgHud();
  };

  // Opponent HUD: hard-pin to the right side and expose all requested stats.
  const ensureHudV137=(function(){ return null; })();
  function ensureOpponentPanelV137(){
    let hud=document.getElementById('pvpOpponentHud');
    const host=document.querySelector('#rpgWorld .rpg-stage-card')||document.getElementById('rpgWorld');
    if(!host) return null;
    if(!hud){
      hud=document.createElement('div'); hud.id='pvpOpponentHud'; host.appendChild(hud);
    }
    hud.className='rpg-player-hud dungeon-status-hud pvp-opponent-hud';
    hud.innerHTML=`<div class="rpg-status-head"><div><b id="pvpOpponentName">คู่ต่อสู้</b><span>Lv.<b id="pvpOpponentLevel">1</b></span></div><span class="rpg-defense-pill">🛡️ DEF <b id="pvpOpponentDefense">0</b></span></div><div class="rpg-status-row"><span class="status-label hp-label">❤️ HP</span><div class="rpg-hp"><i id="pvpOpponentHpBar"></i></div><small id="pvpOpponentHpText">0 / 0 HP</small></div><div class="rpg-status-row"><span class="status-label mp-label">💧 MP</span><div class="rpg-mp"><i id="pvpOpponentManaBar"></i></div><small id="pvpOpponentManaText">0 / 0 MP</small></div><div class="pvp-opponent-extra"><span>⚡ พลัง <b id="pvpOpponentPower">0</b></span><span>✨ <b id="pvpOpponentPowerName">พลัง</b></span><span>⚔️ <b id="pvpOpponentWeapon">อาวุธ</b></span></div><div class="pvp-opponent-items"><span>💚 ฮีล <b id="pvpOpponentHealUses">3</b>/3</span><span>💧 มานา <b id="pvpOpponentManaUses">3</b>/3</span></div>`;
    return hud;
  }
  function syncOpponentPanelV137(){
    const pb=rpg.pvpBattle,mob=pb?.mob,hud=ensureOpponentPanelV137(); if(!hud) return;
    const active=!!(pb?.active&&mob?.alive); hud.classList.toggle('hidden',!active); if(!active)return;
    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
    const width=(id,n,d)=>{const el=document.getElementById(id);if(el)el.style.width=(Math.max(0,Math.min(1,Number(n||0)/Math.max(1,Number(d||1))))*100)+'%';};
    const od=pb.opponent||mob.pvpData||{},pd=mob.pvpPowerDef||pvpPowerForData(od);
    set('pvpOpponentName',mob.pvpName||od.name||'คู่ต่อสู้'); set('pvpOpponentLevel',mob.level||od.level||1);
    set('pvpOpponentDefense',Number(mob.pvpDefense??pvpDefenseFor(od)).toLocaleString()); set('pvpOpponentPower',Number(mob.pvpPower||od.power||0).toLocaleString());
    set('pvpOpponentPowerName',pd?.name||od.powerName||'พลัง'); set('pvpOpponentWeapon',od.weapon||'อาวุธ');
    set('pvpOpponentHpText',`${Math.ceil(mob.hp||0)} / ${Math.ceil(mob.maxHp||0)} HP`); set('pvpOpponentManaText',`${Math.floor(mob.mana||0)} / ${Math.floor(mob.maxMana||0)} MP`);
    set('pvpOpponentHealUses',Math.max(0,Number(mob.healUsesLeft??0))); set('pvpOpponentManaUses',Math.max(0,Number(mob.manaUsesLeft??0)));
    width('pvpOpponentHpBar',mob.hp,mob.maxHp); width('pvpOpponentManaBar',mob.mana,mob.maxMana);
  }
  const syncHudV137=syncRpgHud;
  syncRpgHud=function(){ syncHudV137.apply(this,arguments); syncOpponentPanelV137(); };

  // VS screen shows the exact battle-relevant snapshot before entering.
  const openVsV137=openRankVsSession;
  openRankVsSession=function(){
    const result=openVsV137.apply(this,arguments),s=ensureRankState().currentRankMatch,b=document.getElementById('rankVsBody');
    if(s&&b){
      const card=(x)=>{const pd=pvpPowerForData(x);const st={level:x.level||1,maxHp:x.maxHp||battleHpMax(x),maxMana:x.maxMana||180+(x.level||1)*3,defense:pvpDefenseFor(x)};const skills=(x.skills||pd?.skills||[]).slice(0,5);return `<div class="pvp-vs-loadout"><b>${x.avatar||'🧑‍🚀'} ${x.name||'ผู้เล่น'}</b><br>Lv.${st.level} · 🛡️ DEF ${Number(st.defense).toLocaleString()}<br>❤️ HP ${Number(st.maxHp).toLocaleString()} · 💧 MP ${Number(st.maxMana).toLocaleString()}<br>⚡ พลัง ${Number(x.power||0).toLocaleString()} · ✨ ${x.powerName||pd?.name||'พลัง'}<br>⚔️ ${x.weapon||'อาวุธ'}<div class="pvp-vs-skills">${skills.map((k,i)=>`<span>${k.icon||'✦'} ${k.name||`สกิล ${i+1}`} · ${k.range||0} ระยะ</span>`).join('')}</div></div>`;};
      b.innerHTML=`${card(s.playerData)}<h2>VS</h2>${card(s.opponentData)}`;
    }
    return result;
  };

  // Return unused PvP HP/Mana to the main inventory; revival was never imported.
  const finishPvpV137=finishRpgPvp;
  finishRpgPvp=function(result){
    const pb=rpg.pvpBattle,carry=!!pb?.pvpCarry;
    if(carry){const bag=ensureDungeonBag();for(const id of PVP_POTION_IDS){const q=Math.max(0,Number(bag.items?.[id]||0));if(q>0)state.rpgInventory[id]=(Number(state.rpgInventory[id]||0))+q;}bag.items={};bag.coins=0;bag.junk={};saveState();}
    return finishPvpV137.apply(this,arguments);
  };

  if(!document.getElementById('v137PvpOnlyStyle')){
    const st=document.createElement('style'); st.id='v137PvpOnlyStyle'; st.textContent=`
      #rpgWorld.pvp-rpg-mode .rpg-stage-card{position:relative!important}
      #rpgWorld.pvp-rpg-mode #pvpOpponentHud{display:block!important;position:absolute!important;right:18px!important;left:auto!important;top:18px!important;z-index:80!important;min-width:280px!important;max-width:360px!important;background:rgba(8,16,23,.94)!important;border:1px solid rgba(115,220,255,.38)!important;box-shadow:0 10px 30px rgba(0,0,0,.45)!important}
      #rpgWorld.pvp-rpg-mode #pvpOpponentHud.hidden{display:none!important}
      #rpgWorld.pvp-rpg-mode .pvp-opponent-extra{display:flex!important;flex-wrap:wrap!important;gap:6px!important;margin-top:7px!important;font-size:11px!important}
      #rpgWorld.pvp-rpg-mode .pvp-opponent-extra span,#rpgWorld.pvp-rpg-mode .pvp-opponent-items span{padding:3px 6px!important;border-radius:7px!important;background:rgba(255,255,255,.06)!important}
      .pvp-vs-loadout{line-height:1.65;text-align:center;max-width:340px}.pvp-vs-skills{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin-top:8px;font-size:11px}.pvp-vs-skills span{padding:3px 6px;border-radius:6px;background:rgba(255,255,255,.08)}
    `; document.head.appendChild(st);
  }
})();

/* V138 — PVP ONLY: skill-kill must end immediately; opponent status floats above the bot. */
(function(){
  function pvpFinishIfOpponentDead(){
    const pb=rpg.pvpBattle, mob=pb?.mob;
    if(pb?.active && !pb.finished && mob && (mob.hp<=0 || mob.alive===false)){
      mob.hp=0; mob.alive=false;
      finishRpgPvp('win');
      return true;
    }
    return false;
  }

  // A PvP opponent never enters the normal monster respawn flow, regardless of whether
  // it was killed by a normal hit, an AoE skill, or any future skill implementation.
  const oldRpgSkillV138=rpgSkill;
  rpgSkill=function(){
    const result=oldRpgSkillV138.apply(this,arguments);
    pvpFinishIfOpponentDead();
    return result;
  };
  const oldRpgAttackV138=rpgAttack;
  rpgAttack=function(){
    const result=oldRpgAttackV138.apply(this,arguments);
    pvpFinishIfOpponentDead();
    return result;
  };

  // Safety net for every damage source: if the opponent reaches 0 HP, the match ends
  // in the same frame instead of showing any respawn/waiting state.
  const oldUpdateRpgV138=updateRpg;
  updateRpg=function(dt){
    oldUpdateRpgV138.apply(this,arguments);
    pvpFinishIfOpponentDead();
  };

  // In PvP, the player's normal death modal/respawn system is completely disabled.
  // Any death immediately counts as a loss.
  const oldHandleRpgDeathV138=handleRpgDeath;
  handleRpgDeath=function(){
    if(isPvpBattleActive()){
      rpg.player.hp=0; rpg.player.mana=0;
      finishRpgPvp('lose');
      return;
    }
    return oldHandleRpgDeathV138.apply(this,arguments);
  };

  function ensureOpponentHeadStatusV138(){
    let el=document.getElementById('pvpOpponentHeadStatus');
    const host=document.querySelector('#rpgWorld .rpg-stage-card')||document.getElementById('rpgWorld');
    if(!host) return null;
    if(!el){
      el=document.createElement('div');
      el.id='pvpOpponentHeadStatus';
      el.innerHTML='<div class="pvp-head-name"><b id="pvpHeadName">คู่ต่อสู้</b><span id="pvpHeadLevel">Lv.1</span></div><div class="pvp-head-stat"><span>❤️</span><i><em id="pvpHeadHpFill"></em></i><small id="pvpHeadHpText">0 / 0</small></div><div class="pvp-head-stat"><span>💧</span><i class="mp"><em id="pvpHeadManaFill"></em></i><small id="pvpHeadManaText">0 / 0</small></div><div class="pvp-head-power" id="pvpHeadPower">⚡ 0</div>';
      host.appendChild(el);
    }
    return el;
  }
  function setHeadText(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
  function setHeadBar(id,n,d){const e=document.getElementById(id);if(e)e.style.width=(Math.max(0,Math.min(1,Number(n||0)/Math.max(1,Number(d||1))))*100)+'%';}
  function syncOpponentHeadStatusV138(){
    const pb=rpg.pvpBattle,mob=pb?.mob,el=ensureOpponentHeadStatusV138();
    if(!el) return;
    const active=!!(pb?.active&&!pb.finished&&mob?.alive);
    el.classList.toggle('hidden',!active);
    if(!active) return;
    const od=pb.opponent||mob.pvpData||{};
    setHeadText('pvpHeadName',mob.pvpName||od.name||'คู่ต่อสู้');
    setHeadText('pvpHeadLevel',`Lv.${mob.level||od.level||1}`);
    setHeadText('pvpHeadHpText',`${Math.ceil(mob.hp||0)} / ${Math.ceil(mob.maxHp||0)}`);
    setHeadText('pvpHeadManaText',`${Math.floor(mob.mana||0)} / ${Math.floor(mob.maxMana||0)}`);
    setHeadText('pvpHeadPower',`⚡ ${(Number(mob.pvpPower||od.power||0)).toLocaleString()}`);
    setHeadBar('pvpHeadHpFill',mob.hp,mob.maxHp);
    setHeadBar('pvpHeadManaFill',mob.mana,mob.maxMana);
    const canvas=document.getElementById('rpgCanvas');
    const w=Number(canvas?.width)||960,h=Number(canvas?.height)||560;
    el.style.left=`${Math.max(4,Math.min(96,(Number(mob.x)||0)/w*100))}%`;
    el.style.top=`${Math.max(6,Math.min(92,(Number(mob.y)||0)/h*100))}%`;
  }
  const oldDrawRpgV138=drawRpg;
  drawRpg=function(){
    const result=oldDrawRpgV138.apply(this,arguments);
    syncOpponentHeadStatusV138();
    return result;
  };

  if(!document.getElementById('v138PvpOnlyStyle')){
    const st=document.createElement('style');
    st.id='v138PvpOnlyStyle';
    st.textContent=`
      /* PvP: hide duplicate screen panels and keep only the opponent's status above its head. */
      #rpgWorld.pvp-rpg-mode .rpg-player-hud.dungeon-status-hud:not(#pvpOpponentHud){display:none!important}
      #rpgWorld.pvp-rpg-mode #pvpOpponentHud{display:none!important}
      #rpgWorld.pvp-rpg-mode .rpg-stage-card{position:relative!important}
      #pvpOpponentHeadStatus{position:absolute;z-index:120;transform:translate(-50%,-125%);width:205px;padding:6px 8px;border:1px solid rgba(255,215,105,.72);border-radius:9px;background:rgba(6,10,20,.88);box-shadow:0 4px 16px rgba(0,0,0,.45);pointer-events:none;color:#fff;font-size:10px;line-height:1.2;transition:left .04s linear,top .04s linear}
      #pvpOpponentHeadStatus.hidden{display:none!important}
      .pvp-head-name{display:flex;justify-content:space-between;gap:8px;margin-bottom:4px;color:#fff;font-size:11px}.pvp-head-name span{color:#ffd56a}
      .pvp-head-stat{display:grid;grid-template-columns:16px 1fr 58px;align-items:center;gap:4px;margin:2px 0}.pvp-head-stat i{display:block;height:7px;background:#241e26;border-radius:8px;overflow:hidden}.pvp-head-stat i em{display:block;height:100%;width:100%;background:#ef5b63}.pvp-head-stat i.mp em{background:#52bfff}.pvp-head-stat small{text-align:right;font-size:9px;color:#d9e1ec}
      .pvp-head-power{text-align:center;margin-top:4px;color:#ffd56a;font-size:10px}
    `;
    document.head.appendChild(st);
  }
})();

/* V141 — universal confirmation + clear success feedback */
(function installV141UniversalActionConfirm(){
  if(window.__v141ConfirmInstalled)return; window.__v141ConfirmInstalled=true;
  const successToast=(msg)=>{
    let t=document.getElementById('gameSuccessToastV141');
    if(!t){t=document.createElement('div');t.id='gameSuccessToastV141';document.body.appendChild(t);}
    t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2600);
  };
  window.showPurchaseSuccessV141=successToast;
  const oldAction=window.showActionMessage;
  if(typeof oldAction==='function') window.showActionMessage=function(msg){const r=oldAction.apply(this,arguments);if(/ซื้อสำเร็จ|สำเร็จ|ได้รับ/.test(String(msg||'')))successToast(String(msg).replace(/<[^>]*>/g,''));return r;};
  const oldShopMsg=window.shopMsg;
  if(typeof oldShopMsg==='function') window.shopMsg=function(msg){const r=oldShopMsg.apply(this,arguments);if(/ได้รับ|ซื้อสำเร็จ/.test(String(msg||'')))successToast(String(msg).replace(/<[^>]*>/g,''));return r;};
  const selectors=['.buy-seed','#buySpecialWater','#buySpecialFertilizer','#buyWater','#buyFertilizer','[data-admin-shop-buy]','[data-market-id]','[data-market-cancel]','[data-sell-junk]','.shop-buy-btn'];
  const labelFor=b=>b?.closest('.shop-item,.rpg-shop-item,.shop-card,.item-card,article')?.querySelector('h3,b,.item-name')?.textContent?.trim()||b?.textContent?.trim()||'รายการนี้';
  document.addEventListener('click',function(e){
    const b=e.target.closest('button');if(!b||b.closest('#gameConfirmModal')||b.dataset.v141SkipConfirm==='1')return;
    if(!selectors.some(s=>b.matches(s)))return;
    if(b.dataset.v141Confirmed==='1'){b.dataset.v141Confirmed='';return;}
    e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();
    const name=labelFor(b);
    if(typeof window.confirmGameAction==='function'){
      window.confirmGameAction('ยืนยันการทำรายการ',`คุณแน่ใจหรือไม่ว่าต้องการทำรายการนี้?\n${name}`,()=>{b.dataset.v141Confirmed='1';b.click();},'ยืนยัน');
    }
  },true);
  const oldConfirm=window.confirmGameAction;
  if(typeof oldConfirm==='function'){
    window.confirmGameAction=function(title,msg,fn,ok){return oldConfirm.call(this,title,msg,()=>{try{fn&&fn();}finally{setTimeout(()=>{const m=String(document.getElementById('rpgShopMessage')?.textContent||'');if(/ได้รับ|ซื้อสำเร็จ/.test(m))successToast('✅ '+m);},0)}},ok);};
  }
  const st=document.createElement('style');st.textContent=`#gameSuccessToastV141{position:fixed;left:50%;top:24px;transform:translate(-50%,-18px);z-index:999999;background:rgba(18,34,27,.97);color:#fff;border:1px solid rgba(115,255,168,.65);box-shadow:0 12px 35px rgba(0,0,0,.35);padding:14px 20px;border-radius:14px;font-weight:800;max-width:min(92vw,520px);text-align:center;opacity:0;pointer-events:none;transition:.22s}#gameSuccessToastV141.show{opacity:1;transform:translate(-50%,0)}#gameConfirmModal .game-confirm-card{max-width:420px}#gameConfirmMessage{white-space:pre-line}`;document.head.appendChild(st);
})();


/* V144 — LIVE MONSTER ADMIN BRIDGE
   Monster stats and drops now have one authoritative path from Admin -> active dungeon. */
(function installV144LiveMonsterAdmin(){
  const clampNum=(v,min=0,max=Infinity,fallback=0)=>{
    v=Number(v); if(!Number.isFinite(v)) v=fallback; return Math.max(min,Math.min(max,v));
  };
  function zoneId(){return rpg.currentZone==='jungle'?'forest':(rpg.currentZone||'forest');}
  function liveMode(){return adminConfig?.monsters?.modes?.[zoneId()]||adminConfig?.monsters?.modes?.forest||Object.values(adminConfig?.monsters?.modes||{})[0];}
  function liveDef(type,elite){const m=liveMode()?.monsters||{};return m[type]||m[elite?'elite':'normal']||m.normal||Object.values(m)[0]||{hp:100,attack:10,defense:0,drops:[]};}
  function applyDefToMob(mob){
    if(!mob||mob.isPvpOpponent)return;
    const d=liveDef(mob.monsterType,!!mob.elite);
    const oldMax=Math.max(1,Number(mob.maxHp||d.hp||1));
    const ratio=Math.max(0,Math.min(1,Number(mob.hp||0)/oldMax));
    const hp=clampNum(d.hp,1,1e12,100), atk=clampNum(d.attack,0,1e12,0), def=clampNum(d.defense,0,1e12,0);
    mob.maxHp=hp; mob.hp=mob.alive===false?0:Math.max(0,Math.min(hp,Math.round(hp*ratio)));
    mob.attack=atk; mob.defense=def; mob.monsterName=d.name||mob.monsterName; mob.monsterIcon=d.icon||mob.monsterIcon;
    mob.attackType=d.attackType||mob.attackType||'melee'; mob.attackRange=clampNum(d.range,0,1e6,mob.attackRange||36);
    mob.skill=d.skill||mob.skill||'none'; mob.skillCooldown=clampNum(d.skillCooldown,.1,1e6,mob.skillCooldown||5);
  }
  window.applyLiveMonsterAdmin=function(){
    for(const pack of (rpg.packs||[])) for(const mob of (pack.mobs||[])) applyDefToMob(mob);
    try{ syncRpgHud?.(); }catch(_){}
  };
  // Independent drop-rate rolls: every configured row is checked against its own percentage.
  dropRpgLoot=function(mob){
    const d=liveDef(mob?.monsterType,!!mob?.elite);
    const rows=Array.isArray(d.drops)?d.drops:[];
    const won=[];
    for(const row of rows){
      const chance=clampNum(row?.chance,0,100,0);
      if(chance>0 && Math.random()*100<chance) won.push(row);
    }
    if(!won.length)return `${d.icon||'👹'} ${d.name||'มอนสเตอร์'} ไม่ดรอปไอเทม`;
    const out=[];
    for(const row of won){
      const qty=Math.max(1,Math.floor(clampNum(row.qty,1,1e9,1)));
      if(row.kind==='item' || ITEM_DATABASE[row.id]){
        state.rpgInventory=state.rpgInventory||{}; state.rpgInventory[row.id]=adminNum(state.rpgInventory[row.id])+qty;
        const def=adminLiveItem(row.id); out.push(`${def.icon||'🎁'} ${def.name||row.id} x${qty}`);
      }else if(row.kind==='crop'){
        state.seeds=state.seeds||{}; state.seeds[row.id]=adminNum(state.seeds[row.id])+qty;
        const c=crops[row.id]; out.push(`${c?.icon||'🌱'} ${c?.name||row.id} x${qty}`);
      }else{
        const junk=rpgJunkTypes.find(x=>x.id===row.id);
        if(junk){ addDungeonLoot(junk,qty,0); out.push(`${junk.icon||'🗑️'} ${junk.name} x${qty}`); }
      }
    }
    return `${d.icon||'👹'} ${d.name||'มอนสเตอร์'} · ${out.join(' · ')||'ไม่ดรอปไอเทม'}`;
  };
  // Save wrapper: persist, sanitize, apply to monsters already spawned, then future respawns use the same config.
  const previousSaveAdminConfig=saveAdminConfig;
  saveAdminConfig=function(){
    Object.values(adminConfig?.monsters?.modes||{}).forEach(mode=>{
      mode.count=Math.max(1,Math.floor(clampNum(mode.count,1,100,6)));
      Object.values(mode.monsters||{}).forEach(m=>{
        m.hp=clampNum(m.hp,1,1e12,100); m.attack=clampNum(m.attack,0,1e12,0); m.defense=clampNum(m.defense,0,1e12,0);
        m.drops=Array.isArray(m.drops)?m.drops:[];
        m.drops.forEach(x=>{x.qty=Math.max(1,Math.floor(clampNum(x.qty,1,1e9,1)));x.chance=clampNum(x.chance,0,100,0);});
      });
    });
    const result=previousSaveAdminConfig.apply(this,arguments);
    try{localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));}catch(_){}
    window.applyLiveMonsterAdmin();
    const s=document.getElementById('adminStatus'); if(s)s.textContent='✅ บันทึกแล้ว · HP / ATK / DEF / ดรอป / จำนวน มีผลกับมอนสเตอร์ในเกมทันที';
    return result;
  };
  // Correct typo introduced by minification/patch if needed is handled below.
})();



/* V159 PERFORMANCE HOTFIX — combat-only rendering optimization.
   Keeps gameplay/rank/economy systems unchanged. */
(()=>{
  if(window.__combatPerformanceHotfixV159) return;
  window.__combatPerformanceHotfixV159=true;

  // 1) HUD was doing expensive DOM scans/renders (including inventory junk) every animation frame.
  // Run the exact existing HUD sync at a capped rate; force-sync on meaningful combat actions remains unnecessary
  // because 12 FPS is visually smooth for bars/text while freeing the main thread for combat.
  const __syncRpgHudBase=syncRpgHud;
  let __lastHudSync=0;
  syncRpgHud=function(force=false){
    const now=performance.now();
    if(!force && now-__lastHudSync<83) return;
    __lastHudSync=now;
    return __syncRpgHudBase();
  };

  // 2) Particle cleanup previously allocated new arrays every frame.
  // Compact in place and keep a hard visual-only cap so repeated AoE casts cannot flood the renderer.
  const PARTICLE_CAP=420, HIT_EFFECT_CAP=120;
  updateParticles=function(dt){
    const ps=rpg.particles;
    let write=0;
    for(let read=0;read<ps.length;read++){
      const p=ps[read];
      p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=p.gravity*dt; p.life-=dt;
      if(p.life>0) ps[write++]=p;
    }
    ps.length=write;
    if(ps.length>PARTICLE_CAP) ps.splice(0,ps.length-PARTICLE_CAP);

    const es=rpg.hitEffects;
    write=0;
    for(let read=0;read<es.length;read++){
      const e=es[read]; e.life-=dt;
      if(e.life>0) es[write++]=e;
    }
    es.length=write;
    if(es.length>HIT_EFFECT_CAP) es.splice(0,es.length-HIT_EFFECT_CAP);
  };

  // 3) Repeated skill bursts can create hundreds of particles in one frame.
  // Keep all combat damage/effects logic intact; only discard excess visual particles.
  const __spawnParticleBase=spawnParticle;
  spawnParticle=function(...args){
    if(rpg.particles.length>=PARTICLE_CAP) return;
    return __spawnParticleBase(...args);
  };

  // 4) Keep only one animation loop alive. Prevent accidental duplicate loops after reopening/re-entering.
  const __rpgLoopBase=rpgLoop;
  let __loopActive=false;
  rpgLoop=function(now){
    if(__loopActive) return;
    __loopActive=true;
    try{
      if(!rpg.running) return;
      const dt=Math.min(.05,(now-rpg.lastTime)/1000);
      rpg.lastTime=now;
      updateRpg(dt);
      drawRpg();
      syncRpgHud();
    } finally {
      __loopActive=false;
    }
    if(rpg.running) requestAnimationFrame(rpgLoop);
  };

  // Reset HUD throttle when entering combat so the first frame is immediate.
  const __oldStartRpg=startRpg;
  if(typeof __oldStartRpg==="function"){
    startRpg=function(...args){ __lastHudSync=0; return __oldStartRpg.apply(this,args); };
  }
})();


/* =========================
   V163 — ADMIN GIFT DELIVERY FIX ONLY
   Fix: prevent login from overwriting a player's granted snapshot before it is loaded.
   No other game systems are changed.
   ========================= */
(function installV163AdminGiftDeliveryFix(){
  const DIRECTORY_KEY='farm_game_player_directory_v115';
  const login=document.getElementById('loginButton');
  const input=document.getElementById('usernameInput');
  if(!login||!input)return;
  login.addEventListener('click',function(){
    const name=String(input.value||'').trim();
    if(!name)return;
    try{
      const all=JSON.parse(localStorage.getItem(DIRECTORY_KEY)||'{}')||{};
      const rec=all[name.toLowerCase()];
      if(rec&&rec.state&&typeof rec.state==='object'){
        // Load the exact player snapshot (including admin-granted items) BEFORE
        // the existing login handler calls saveState(), so the gift is not lost.
        const restored=JSON.parse(JSON.stringify(rec.state));
        Object.assign(state,restored);
        state.username=name;
      }
    }catch(_){}
  },true);
})();


/* =========================
   V164.2 — MAIL EXPIRY / CANCEL / ADMIN MESSAGE
   Extends only the existing mailbox + Players/Gift admin tab.
   ========================= */
(function(){
  const V1642_MAIL_KEY="farm_game_server_mail_v164";
  const v1642Esc = (typeof adminEsc==="function") ? adminEsc : (x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])));
  const v1642Clone = (typeof v115Clone==="function") ? v115Clone : (x=>JSON.parse(JSON.stringify(x)));
  const v1642Now = ()=>Date.now();
  const v1642Load = ()=>{
    try{const x=JSON.parse(localStorage.getItem(V1642_MAIL_KEY)||"[]");return Array.isArray(x)?x:[];}catch(_){return [];}
  };
  const v1642Save = list=>localStorage.setItem(V1642_MAIL_KEY,JSON.stringify(list||[]));
  const v1642User = ()=>String(state?.username||"").trim().toLowerCase();
  const v1642Expired = g=>!!(g?.expiresAt && v1642Now()>=Number(g.expiresAt));
  const v1642Cancelled = g=>!!g?.cancelledAt;
  const v1642Claimed = (g,key=v1642User())=>!!g?.claims?.[key];
  const v1642VisibleForUser = (g,key=v1642User())=>{
    if(!g||!g.id||!key) return false;
    if(g.target==="player" && String(g.targetUser||"").toLowerCase()!==key) return false;
    return true;
  };
  const v1642ActiveForUser = (g,key=v1642User())=>v1642VisibleForUser(g,key) && !v1642Cancelled(g) && !v1642Expired(g) && !v1642Claimed(g,key);
  const v1642DurationText = mins=>{
    mins=Number(mins||0);
    if(!mins) return "ไม่หมดอายุ";
    if(mins<60) return `${mins} นาที`;
    if(mins%1440===0) return `${mins/1440} วัน`;
    if(mins%60===0) return `${mins/60} ชั่วโมง`;
    return `${mins} นาที`;
  };
  const v1642TimeLeft = g=>{
    if(!g?.expiresAt) return "ไม่มีวันหมดอายุ";
    const ms=Math.max(0,Number(g.expiresAt)-v1642Now());
    if(ms<=0) return "หมดอายุแล้ว";
    const m=Math.ceil(ms/60000);
    if(m>=1440) return `เหลือ ${Math.floor(m/1440)} วัน`;
    if(m>=60) return `เหลือ ${Math.floor(m/60)} ชม. ${m%60} นาที`;
    return `เหลือ ${m} นาที`;
  };
  function v1642Create({target,targetUser,item,qty,title,message,durationMinutes,type}){
    const list=v1642Load(), now=v1642Now(), mins=Math.max(0,Math.floor(Number(durationMinutes)||0));
    const mail={
      id:"mail-"+now+"-"+Math.random().toString(36).slice(2),
      createdAt:now,
      target:target==="player"?"player":"server",
      targetUser:target==="player"?String(targetUser||"").toLowerCase():"",
      type:type==="message"?"message":"gift",
      title:String(title||"").trim(),
      message:String(message||"").trim(),
      item:item?v1642Clone(item):null,
      qty:Math.max(1,Math.floor(Number(qty)||1)),
      expiresAt:mins>0?now+mins*60000:0,
      durationMinutes:mins,
      claims:{}
    };
    list.unshift(mail); v1642Save(list); return mail;
  }
  function v1642Indicator(){
    const btn=document.getElementById("openMailboxButton"), badge=document.getElementById("mailboxBadge");
    const count=v1642Load().filter(g=>v1642ActiveForUser(g)).length;
    if(badge){badge.textContent=count>9?"9+":String(count||"!");badge.classList.toggle("hidden",count===0);}
    if(btn)btn.classList.toggle("has-mail",count>0);
  }
  function v1642RenderMailbox(){
    const box=document.getElementById("mailboxList"); if(!box)return;
    const key=v1642User();
    const mails=v1642Load().filter(g=>v1642VisibleForUser(g,key));
    if(!mails.length){
      box.innerHTML='<div class="mailbox-empty">📭 <b>ยังไม่มีจดหมาย</b><small>ของขวัญ กิจกรรม และประกาศจากแอดมินจะแสดงที่นี่</small></div>';
      v1642Indicator(); return;
    }
    box.innerHTML=mails.map(g=>{
      const active=!v1642Cancelled(g)&&!v1642Expired(g)&&!v1642Claimed(g,key);
      const status=v1642Cancelled(g)?"🚫 ถูกยกเลิก":v1642Expired(g)?"⌛ หมดอายุ":v1642Claimed(g,key)?"✅ รับแล้ว":"📬 ยังไม่รับ";
      const icon=g.type==="message"?"📢":(g.item?.icon||"🎁");
      const title=g.title || (g.type==="message"?"ข้อความจากแอดมิน":(g.item?.name||"ของขวัญ"));
      const desc=g.message || g.item?.description || "ของขวัญจากแอดมิน";
      const giftLine=g.type==="gift"?`<small>🎁 ${v1642Esc(g.item?.name||"ของขวัญ")} × ${Math.max(1,Number(g.qty)||1).toLocaleString()}</small>`:"";
      const action=g.type==="gift"?`<button type="button" class="mailbox-claim" data-v1642-claim="${v1642Esc(g.id)}" ${active?"":"disabled"}>${active?"รับของ":"รับไม่ได้"}</button>`:
        `<button type="button" class="mailbox-claim" data-v1642-read="${v1642Esc(g.id)}" ${active?"":"disabled"}>${active?"อ่านแล้ว":"ปิดแล้ว"}</button>`;
      return `<div class="mailbox-gift ${active?"":"mailbox-inactive"}">
        <div class="mailbox-gift-icon">${v1642Esc(icon)}</div>
        <div class="mailbox-gift-info"><h3>${v1642Esc(title)}</h3><p>${v1642Esc(desc)}</p>${giftLine}
        <small>${status} · ${v1642Esc(v1642TimeLeft(g))} · ส่งเมื่อ ${v1642Esc(new Date(g.createdAt||v1642Now()).toLocaleString())}</small></div>${action}</div>`;
    }).join("");
    box.querySelectorAll("[data-v1642-claim]").forEach(b=>b.onclick=()=>{
      const id=b.dataset.v1642Claim,key=v1642User(),list=v1642Load(),g=list.find(x=>x.id===id);
      if(!g||!v1642ActiveForUser(g,key)||g.type!=="gift"){v1642RenderMailbox();return;}
      const live={username:state?.username||"",state};
      v115Grant(live,g.item||{},g.qty);
      g.claims=g.claims||{};g.claims[key]=v1642Now();v1642Save(list);
      try{saveState();render();syncCurrencyDisplays();renderRpgInventory();renderRpgBag();}catch(_){}
      v1642RenderMailbox();
    });
    box.querySelectorAll("[data-v1642-read]").forEach(b=>b.onclick=()=>{
      const id=b.dataset.v1642Read,key=v1642User(),list=v1642Load(),g=list.find(x=>x.id===id);
      if(!g||!v1642ActiveForUser(g,key)){v1642RenderMailbox();return;}
      g.claims=g.claims||{};g.claims[key]=v1642Now();v1642Save(list);v1642RenderMailbox();
    });
    v1642Indicator();
  }
  function v1642ClearMailbox(){
    const key=v1642User();
    const kept=v1642Load().filter(g=>{
      if(!v1642VisibleForUser(g,key))return true;
      return !(v1642Claimed(g,key)||v1642Expired(g)||v1642Cancelled(g));
    });
    v1642Save(kept);v1642RenderMailbox();
  }
  document.getElementById("mailboxClear")?.addEventListener("click",v1642ClearMailbox);

  // Override the current Players/Gift admin renderer only.
  renderAdminPlayers = function(box){
    const dir=v115LoadDirectory(), list=Object.values(dir).sort((a,b)=>String(a.username).localeCompare(String(b.username),"th"));
    if(!v115SelectedPlayer&&list[0])v115SelectedPlayer=list[0].username.toLowerCase();
    const selected=list.find(p=>p.username.toLowerCase()===v115SelectedPlayer)||null;
    const catalog=v115Catalog();
    if(!v115SelectedItem&&catalog[0])v115SelectedItem=catalog[0].id;
    const filter=String(window.__v115PlayerFilter||"").toLowerCase();
    const visible=list.filter(p=>p.username.toLowerCase().includes(filter));
    const sent=v1642Load().slice(0,20);
    box.innerHTML=`
      <div class="admin-note"><b>ผู้เล่นทั้งหมด ${list.length} คน</b> · แจกของ/ส่งข้อความผ่านกล่องจดหมาย พร้อมกำหนดวันหมดอายุและยกเลิกภายหลังได้</div>
      <div class="admin-card"><label class="admin-field">🔎 ค้นหาชื่อผู้เล่น<input id="v1642PlayerSearch" value="${v1642Esc(window.__v115PlayerFilter||"")}" placeholder="พิมพ์ชื่อผู้เล่น"></label></div>
      <div class="admin-grid">${visible.length?visible.map(p=>`<button type="button" class="admin-card ${p.username.toLowerCase()===v115SelectedPlayer?"active":""}" data-v1642-player="${v1642Esc(p.username.toLowerCase())}"><h3>👤 ${v1642Esc(p.username)}</h3><p>อัปเดตล่าสุด: ${new Date(p.updatedAt||0).toLocaleString()}</p></button>`).join(""):'<div class="admin-note">ไม่พบผู้เล่น — ยังสามารถส่งให้ทั้งเซิร์ฟเวอร์ได้</div>'}</div>

      <div class="admin-card"><h3>🎁 ส่งของเข้ากล่องจดหมาย</h3><div class="admin-note"><b>⏳ ตั้งเวลาหมดอายุได้ตรงนี้</b> — กำหนดว่าแต่ละของขวัญจะอยู่ในกล่องจดหมายนานเท่าไร</div>
        <div class="admin-row">
          <label class="admin-field">เลือกของ<select id="v1642ItemSelect">${catalog.map(x=>`<option value="${v1642Esc(x.id)}" ${x.id===v115SelectedItem?"selected":""}>${x.icon} ${v1642Esc(x.name)} — ${v1642Esc(x.description||"")}</option>`).join("")}</select></label>
          <label class="admin-field">จำนวน<input id="v1642GrantQty" type="number" min="1" value="1"></label>
          <label class="admin-field">อยู่ในจดหมาย (นาที)<input id="v1642Duration" type="number" min="0" value="1440"><small>0 = ไม่หมดอายุ · 60 = 1 ชม. · 1440 = 1 วัน</small></label>
        </div>
        <label class="admin-field">หัวข้อจดหมาย (ไม่บังคับ)<input id="v1642GiftTitle" placeholder="เช่น รางวัลกิจกรรมประจำสัปดาห์"></label>
        <label class="admin-field">ข้อความถึงผู้เล่น (ไม่บังคับ)<textarea id="v1642GiftMessage" rows="3" placeholder="เขียนข้อความประกอบของขวัญ หรือรายละเอียดกิจกรรม"></textarea></label>
        <div class="admin-row"><button class="admin-mini-btn" id="v1642GrantPlayer" type="button" ${selected?"":"disabled"}>👤 ส่งให้ผู้เล่น${selected?": "+v1642Esc(selected.username):" (เลือกผู้เล่นก่อน)"}</button><button class="admin-mini-btn" id="v1642GrantServer" type="button">🌐 ส่งให้ทั้งเซิร์ฟเวอร์</button></div>
        <div id="v1642Status" class="admin-note"></div>
      </div>

      <div class="admin-card"><h3>📢 ส่งข้อความ/ประกาศเข้ากล่องจดหมาย</h3>
        <div class="admin-row"><label class="admin-field">หัวข้อ<input id="v1642MsgTitle" placeholder="เช่น ประกาศกิจกรรมใหม่"></label><label class="admin-field">อยู่ในจดหมาย (นาที)<input id="v1642MsgDuration" type="number" min="0" value="1440"><small>0 = ไม่หมดอายุ</small></label></div>
        <label class="admin-field">ข้อความ<textarea id="v1642MsgBody" rows="4" placeholder="ข้อความแจ้งเตือน กิจกรรม หรือข่าวสารจากแอดมิน"></textarea></label>
        <div class="admin-row"><button class="admin-mini-btn" id="v1642MsgPlayer" type="button" ${selected?"":"disabled"}>👤 ส่งข้อความให้ผู้เล่น</button><button class="admin-mini-btn" id="v1642MsgServer" type="button">🌐 ส่งข้อความทั้งเซิร์ฟเวอร์</button></div>
      </div>

      <div class="admin-card"><h3>🚫 จัดการของ/ข้อความที่แจกแล้ว</h3><div class="admin-note"><b>ปุ่ม 🚫 ยกเลิก จะอยู่ในรายการด้านล่าง</b> — กดแล้วผู้เล่นที่ยังไม่ได้รับจะรับไม่ได้ทันที</div><h3>📮 รายการที่ส่งล่าสุด</h3>
        <div class="admin-note">แอดมินกดยกเลิกได้ทันที · ผู้เล่นที่ยังไม่รับจะรับไม่ได้หลังยกเลิก · หมดเวลาแล้วจะรับไม่ได้และขึ้นว่า “หมดอายุ”</div>
        <div class="admin-list">${sent.length?sent.map(g=>`<div class="admin-note" style="display:flex;gap:8px;align-items:center;justify-content:space-between"><span>${v1642Esc(g.type==="message"?"📢 ":"🎁 ")}<b>${v1642Esc(g.title||(g.type==="message"?"ข้อความจากแอดมิน":g.item?.name||"ของขวัญ"))}</b> · ${v1642Esc(g.target==="player"?"ผู้เล่น: "+(g.targetUser||""):"ทั้งเซิร์ฟเวอร์")} · ${v1642Esc(v1642TimeLeft(g))} ${v1642Cancelled(g)?"· 🚫 ยกเลิกแล้ว":""}</span>${!v1642Cancelled(g)&&!v1642Expired(g)?`<button type="button" class="admin-mini-btn" data-v1642-cancel="${v1642Esc(g.id)}">🚫 ยกเลิก</button>`:""}</div>`).join(""):'<div class="admin-note">ยังไม่มีรายการที่ส่ง</div>'}</div>
      </div>`;

    box.querySelector("#v1642PlayerSearch")?.addEventListener("input",e=>{window.__v115PlayerFilter=e.target.value;renderAdminPlayers(box);});
    box.querySelectorAll("[data-v1642-player]").forEach(b=>b.onclick=()=>{v115SelectedPlayer=b.dataset.v1642Player;renderAdminPlayers(box);});
    box.querySelector("#v1642ItemSelect")?.addEventListener("change",e=>v115SelectedItem=e.target.value);
    const giftData=()=>{
      const item=v115Catalog().find(x=>x.id===v115SelectedItem);
      return {item,qty:Math.max(1,Math.floor(Number(box.querySelector("#v1642GrantQty")?.value)||1)),duration:Math.max(0,Math.floor(Number(box.querySelector("#v1642Duration")?.value)||0)),title:box.querySelector("#v1642GiftTitle")?.value||"",message:box.querySelector("#v1642GiftMessage")?.value||""};
    };
    const sendGift=(target)=>{
      const d=giftData(),st=box.querySelector("#v1642Status"); if(!d.item)return;
      if(target==="player"&&!selected)return;
      v1642Create({target,targetUser:selected?.username,item:d.item,qty:d.qty,title:d.title,message:d.message,durationMinutes:d.duration,type:"gift"});
      if(st)st.textContent=`📮 ส่ง ${d.item.name} × ${d.qty} ไปยัง${target==="player"?selected.username:"ทั้งเซิร์ฟเวอร์"}แล้ว · อยู่ได้ ${v1642DurationText(d.duration)}`;
      v1642Indicator();renderAdminPlayers(box);
    };
    box.querySelector("#v1642GrantPlayer")?.addEventListener("click",()=>sendGift("player"));
    box.querySelector("#v1642GrantServer")?.addEventListener("click",()=>sendGift("server"));
    const sendMessage=(target)=>{
      const title=(box.querySelector("#v1642MsgTitle")?.value||"ข้อความจากแอดมิน").trim();
      const message=(box.querySelector("#v1642MsgBody")?.value||"").trim();
      const duration=Math.max(0,Math.floor(Number(box.querySelector("#v1642MsgDuration")?.value)||0));
      if(!message){alert("กรุณาใส่ข้อความก่อนส่ง");return;}
      if(target==="player"&&!selected)return;
      v1642Create({target,targetUser:selected?.username,title,message,durationMinutes:duration,type:"message"});
      v1642Indicator();renderAdminPlayers(box);
    };
    box.querySelector("#v1642MsgPlayer")?.addEventListener("click",()=>sendMessage("player"));
    box.querySelector("#v1642MsgServer")?.addEventListener("click",()=>sendMessage("server"));
    box.querySelectorAll("[data-v1642-cancel]").forEach(b=>b.onclick=()=>{
      const list=v1642Load(),g=list.find(x=>x.id===b.dataset.v1642Cancel);if(!g)return;
      g.cancelledAt=v1642Now();v1642Save(list);v1642Indicator();renderAdminPlayers(box);
    });
  };
  // Make the existing admin dispatcher call the new renderer.
  const v1642AdminRender = renderAdmin;
  renderAdmin=function(){
    if(adminTab==="players"){
      const box=document.getElementById("adminContent");if(!box)return;
      document.querySelectorAll("[data-admin-tab]").forEach(b=>b.classList.toggle("active",b.dataset.adminTab===adminTab));
      renderAdminPlayers(box);return;
    }
    return v1642AdminRender.apply(this,arguments);
  };

  // Replace mailbox opener/renderer behavior with the extended version.
  document.getElementById("openMailboxButton")?.addEventListener("click",()=>{document.getElementById("mailboxPanel")?.classList.remove("hidden");v1642RenderMailbox();});
  setInterval(()=>{v1642Indicator();if(!document.getElementById("mailboxPanel")?.classList.contains("hidden"))v1642RenderMailbox();},5000);
  window.addEventListener("storage",e=>{if(e.key===V1642_MAIL_KEY){v1642Indicator();}});
  try{v1642Indicator();}catch(_){}
})();



/* =========================
   V164.4 — hard fallback fixes for visible admin controls + working clear button
   ========================= */
(function(){
  // A global, direct fallback so the 🗑️ button works even if another mailbox listener stops propagation.
  window.forceMailboxClear=function(){
    try{
      const KEY="farm_game_server_mail_v164";
      const user=String((window.state&&window.state.username)||"").trim().toLowerCase();
      let list=[];
      try{list=JSON.parse(localStorage.getItem(KEY)||"[]");}catch(_){list=[];}
      if(!Array.isArray(list))list=[];
      const now=Date.now();
      // Keep only mail for other users, or mail for this user that is still active/unclaimed.
      list=list.filter(g=>{
        const mine=(g.target!=="player" || String(g.targetUser||"").toLowerCase()===user);
        if(!mine)return true;
        const claimed=!!(g.claims&&g.claims[user]);
        const expired=!!(g.expiresAt&&now>=Number(g.expiresAt));
        const cancelled=!!g.cancelledAt;
        return !(claimed||expired||cancelled);
      });
      localStorage.setItem(KEY,JSON.stringify(list));
      const panel=document.getElementById("mailboxPanel");
      // Force-refresh by reopening the existing mailbox click path.
      if(panel&&!panel.classList.contains("hidden")){
        const box=document.getElementById("mailboxList");
        if(box){
          // Trigger the existing renderer through the mailbox button listener.
          document.getElementById("openMailboxButton")?.click();
        }
      }
    }catch(err){console.error("Mailbox clear failed",err);}
  };

  // Capture-phase click fallback: the button remains clickable even if layout/other handlers interfere.
  document.addEventListener("click",function(e){
    const clear=e.target.closest&&e.target.closest("#mailboxClear");
    if(clear){
      e.preventDefault();
      window.forceMailboxClear();
      return;
    }
  },true);

  // Expose a dedicated admin refresh and call the corrected Players/Gift renderer directly.
  window.refreshAdminMailControls=function(){
    try{
      const box=document.getElementById("adminContent");
      if(box && typeof renderAdminPlayers==="function") renderAdminPlayers(box);
    }catch(err){console.error("Admin mail controls refresh failed",err);}
  };

  // When the existing Players/Gift tab is clicked, render the corrected controls immediately.
  document.querySelectorAll('[data-admin-tab="players"]').forEach(btn=>{
    btn.addEventListener("click",function(){
      setTimeout(()=>window.refreshAdminMailControls(),0);
    },true);
  });
})();


/* =========================
   V170 — ADMIN ANNOUNCEMENT BUTTON
   Separate admin-only announcement tab.
   Announcements are delivered into the existing player gift/mailbox.
   ========================= */
(function installV170AdminAnnouncement(){
  const V170_MAIL_KEY = "farm_game_server_mail_v164";

  const v170Esc = x => String(x ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));

  const v170LoadMail = () => {
    try {
      const data = JSON.parse(localStorage.getItem(V170_MAIL_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch (_) {
      return [];
    }
  };

  const v170SaveMail = list => {
    localStorage.setItem(V170_MAIL_KEY, JSON.stringify(Array.isArray(list) ? list : []));
  };

  const v170DurationText = mins => {
    mins = Math.max(0, Math.floor(Number(mins) || 0));
    if (!mins) return "ไม่หมดอายุ";
    if (mins < 60) return `${mins} นาที`;
    if (mins % 1440 === 0) return `${mins / 1440} วัน`;
    if (mins % 60 === 0) return `${mins / 60} ชั่วโมง`;
    return `${mins} นาที`;
  };

  function renderAdminAnnouncement(box){
    if (!box) return;

    box.innerHTML = `
      <div class="admin-note">
        <b>📢 ระบบประกาศสำหรับแอดมิน</b><br>
        พิมพ์ข้อความแล้วกด <b>ประกาศให้ผู้เล่นทั้งหมด</b> ข้อความจะไปปรากฏในกล่อง 🎁 ของขวัญ/จดหมายของผู้เล่นทุกคน
      </div>

      <div class="admin-card">
        <h3>📢 สร้างประกาศ</h3>

        <label class="admin-field">
          หัวข้อประกาศ
          <input id="v170AnnouncementTitle" maxlength="100" placeholder="เช่น 📢 ประกาศจากทีมงาน">
        </label>

        <label class="admin-field">
          ข้อความประกาศ
          <textarea id="v170AnnouncementBody" rows="7" maxlength="3000"
            placeholder="พิมพ์ข้อความประกาศที่ต้องการให้ผู้เล่นเห็น..."></textarea>
        </label>

        <label class="admin-field">
          ระยะเวลาที่แสดงในกล่องของขวัญ (นาที)
          <input id="v170AnnouncementDuration" type="number" min="0" value="1440">
          <small>0 = ไม่หมดอายุ · 60 = 1 ชั่วโมง · 1440 = 1 วัน</small>
        </label>

        <div class="admin-row">
          <button class="admin-mini-btn" id="v170SendAnnouncement" type="button">📢 ประกาศให้ผู้เล่นทั้งหมด</button>
        </div>

        <div id="v170AnnouncementStatus" class="admin-note"></div>
      </div>

      <div class="admin-card">
        <h3>ℹ️ วิธีทำงาน</h3>
        <div class="admin-note">
          เมื่อกดประกาศ ระบบจะส่งข้อความเข้ากล่อง 🎁 ของผู้เล่นทั้งหมดทันทีในฐานะ “ข้อความจากแอดมิน”
          ผู้เล่นจะเห็นสัญลักษณ์แจ้งเตือนที่ปุ่มกล่องของขวัญ และกดเข้าไปอ่านประกาศได้
        </div>
      </div>
    `;

    const sendButton = box.querySelector("#v170SendAnnouncement");
    sendButton?.addEventListener("click", () => {
      const title = (box.querySelector("#v170AnnouncementTitle")?.value || "").trim() || "📢 ประกาศจากแอดมิน";
      const message = (box.querySelector("#v170AnnouncementBody")?.value || "").trim();
      const duration = Math.max(0, Math.floor(Number(box.querySelector("#v170AnnouncementDuration")?.value) || 0));
      const status = box.querySelector("#v170AnnouncementStatus");

      if (!message) {
        if (status) status.textContent = "❌ กรุณาพิมพ์ข้อความประกาศก่อน";
        return;
      }

      const now = Date.now();
      const list = v170LoadMail();
      list.unshift({
        id: "announcement-" + now + "-" + Math.random().toString(36).slice(2),
        createdAt: now,
        target: "server",
        targetUser: "",
        type: "message",
        title,
        message,
        item: null,
        qty: 1,
        expiresAt: duration > 0 ? now + duration * 60000 : 0,
        durationMinutes: duration,
        claims: {}
      });
      v170SaveMail(list);

      if (status) {
        status.textContent = `✅ ส่งประกาศให้ผู้เล่นทั้งหมดแล้ว · แสดงในกล่องของขวัญ ${v170DurationText(duration)}`;
      }

      try {
        const badge = document.getElementById("mailboxBadge");
        if (badge) {
          badge.textContent = "!";
          badge.classList.remove("hidden");
        }
        document.getElementById("openMailboxButton")?.classList.add("has-mail");
      } catch (_) {}

      box.querySelector("#v170AnnouncementBody").value = "";
    });
  }

  // Keep every existing admin page intact; add only the new announcement page.
  const v170PreviousRenderAdmin = renderAdmin;
  renderAdmin = function(){
    if (adminTab === "announcement") {
      const box = document.getElementById("adminContent");
      if (!box) return;
      document.querySelectorAll("[data-admin-tab]").forEach(button => {
        button.classList.toggle("active", button.dataset.adminTab === "announcement");
      });
      renderAdminAnnouncement(box);
      return;
    }
    return v170PreviousRenderAdmin.apply(this, arguments);
  };
})();

/* =========================
   V180 FIX — MAIN ADMIN SHOP PRICE LIVE APPLY
   Fix only the main-admin shop price path. Secondary Admin is untouched.
   ========================= */
(()=>{
  function v180ApplyMainAdminShopPrices(){
    adminConfig.items=adminConfig.items||{};
    adminConfig.farm=adminConfig.farm||{};
    adminConfig.farm.crops=adminConfig.farm.crops||{};

    // RPG shop: adminConfig is the saved source of truth.
    Object.values(ITEM_DATABASE||{}).forEach(base=>{
      const cfg=adminConfig.items[base.id];
      if(!cfg)return;
      if(Object.prototype.hasOwnProperty.call(cfg,'price')){
        const p=Number(cfg.price);
        cfg.price=Number.isFinite(p)?Math.max(0,p):Math.max(0,Number(base.price)||0);
        base.price=cfg.price;
      }
      if(Object.prototype.hasOwnProperty.call(cfg,'currency')){
        cfg.currency=cfg.currency==='diamond'?'diamond':'coin';
        base.currency=cfg.currency;
      }
      if(Object.prototype.hasOwnProperty.call(cfg,'shop')){
        cfg.shop=!!cfg.shop;
        base.shop=cfg.shop;
      }
    });

    // Farm seed shop: copy edited prices into the live crop definitions too.
    Object.entries(adminConfig.farm.crops).forEach(([id,cfg])=>{
      const crop=crops?.[id];
      if(!crop)return;
      if(Object.prototype.hasOwnProperty.call(cfg,'cost')){
        const p=Number(cfg.cost);
        cfg.cost=Number.isFinite(p)?Math.max(0,p):Math.max(0,Number(crop.cost)||0);
        crop.cost=cfg.cost;
      }
      if(Object.prototype.hasOwnProperty.call(cfg,'enabled'))crop.enabled=cfg.enabled!==false;
    });

    try{localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));}catch(_){}
    try{renderSeedShop();}catch(_){}
    try{renderAdminDrivenRpgShop();}catch(_){}
    try{syncCurrencyDisplays();}catch(_){}
  }

  const v180PreviousSaveAdminConfig=saveAdminConfig;
  saveAdminConfig=function(){
    // Keep every existing main-admin save behavior, then force the edited shop
    // prices into the live stores after all older wrappers have finished.
    const result=v180PreviousSaveAdminConfig.apply(this,arguments);
    v180ApplyMainAdminShopPrices();
    const s=document.getElementById('adminStatus');
    if(s){
      s.textContent='✅ บันทึกแล้ว · ราคาของร้านค้าอัปเดตและใช้จริงทันที';
      setTimeout(()=>{if(s.textContent.includes('ราคาของร้านค้า'))s.textContent='พร้อมแก้ไข';},2500);
    }
    return result;
  };

  // The save button has older listeners captured by previous versions.
  // Add this final listener so the current live shop values are always applied
  // after those legacy handlers, without changing Secondary Admin.
  document.getElementById('adminSave')?.addEventListener('click',()=>{
    try{v180ApplyMainAdminShopPrices();}catch(_){}
  });

  try{v180ApplyMainAdminShopPrices();}catch(_){}
})();


/* =========================
   V191 — WORLD BOSS PLAYABLE MAP TEST ONLY
   - Uses the exact existing RPG battle scene and controls.
   - No boss and no monsters are spawned yet.
   - Does not change PvP, Tower, Dungeon, skills, movement or other systems.
   ========================= */
(()=>{
  const v191ResetRpgPacks=resetRpgPacks;
  resetRpgPacks=function(){
    if(rpg.currentZone==='worldboss'){
      rpg.damageFloats=[];
      rpg.packs=[];
      return;
    }
    return v191ResetRpgPacks.apply(this,arguments);
  };

  const v191EnterPlayableWorld=enterRpgJungle;
  enterRpgJungle=function(){
    const result=v191EnterPlayableWorld.apply(this,arguments);
    if(rpg.currentZone==='worldboss'){
      // Guarantee an empty combat map: player only, with every existing movement/attack/skill control intact.
      rpg.packs=[];
      rpg.hitEffects=[];
      rpg.particles=[];
      const title=document.querySelector('#rpgWorld .rpg-topbar h1');
      const kicker=document.querySelector('#rpgWorld .rpg-kicker');
      const subtitle=document.querySelector('#rpgWorld .rpg-topbar p');
      if(title)title.textContent='🌍 บอสโลก';
      if(kicker)kicker.textContent='WORLD BOSS';
      if(subtitle)subtitle.textContent='โหมดทดสอบระบบการเล่น';
      rpg.combatLog='🌍 เข้าสู่บอสโลก';
      syncRpgHud?.();
    }
    return result;
  };
})();


/* =========================
   V192 — WORLD BOSS ONLY
   Replaces only World Boss encounter contents:
   - no dungeon monsters in World Boss
   - one custom World Boss
   - three boss skills with distinct visual / sound effects
   - no Dungeon / Tower / PvP / UI changes
   ========================= */
(()=>{
  const WB={active:false,boss:null,effects:[],skillCd:0,skillIndex:0};

  function wbCreateBoss(){
    const boss={
      isWorldBoss:true, elite:true, alive:true, aggro:false,
      x:480,y:205,homeX:480,homeY:205,
      hp:18000,maxHp:18000,attack:0,attackCd:9999,attackAnim:0,
      hitFlash:0,slow:0,
      name:'ราชันอสูรโลก'
    };
    rpg.packs=[{x:480,y:205,index:-192,mobs:[boss],respawnAt:0,isWorldBoss:true}];
    WB.active=true; WB.boss=boss; WB.effects=[]; WB.skillCd=2.5; WB.skillIndex=0;
  }
  window.__forceWorldBossOnly=wbCreateBoss;

  function wbSfx(type){
    try{
      if(type===0) sfx('hurt');
      else if(type===1) sfx('hit');
      else sfx('skill');
    }catch(_){}
  }

  function wbDamage(amount,label){
    const p=rpg.player;
    if(!WB.active || p.hitCd>0 || rpg.deathPending) return;
    const def=Math.max(0,Number(getEffectiveDefense?.()||0));
    const dmg=Math.max(1,Math.round(amount*100/(100+def)));
    p.hp=Math.max(0,p.hp-dmg); p.hitCd=.35; p.hurtAnim=.32;
    rpg.damageFloats.push({x:p.x,y:p.y-28,text:`-${dmg}`,color:'#ff7070',life:0,maxLife:.8,drift:-28});
    if(p.hp<=0) handleRpgDeath();
  }

  function wbCast(){
    const b=WB.boss,p=rpg.player;
    if(!b||!b.alive) return;
    const k=WB.skillIndex++%3;
    if(k===0){
      // 1) Crimson Charge — long range red shock wave
      const a=Math.atan2(p.y-b.y,p.x-b.x);
      WB.effects.push({type:0,x:b.x,y:b.y,angle:a,t:0,d:1.05,hit:false});
      rpg.combatLog='🔥 บอสใช้สกิล: เปลวเพลิงทะลวง!';
      wbSfx(0);
    }else if(k===1){
      // 2) Thunderfall — repeated lightning markers around player
      const strikes=[];
      for(let i=0;i<4;i++){const a=Math.random()*Math.PI*2,r=35+Math.random()*90;strikes.push({x:p.x+Math.cos(a)*r,y:p.y+Math.sin(a)*r,hit:false,delay:.18*i});}
      WB.effects.push({type:1,t:0,d:1.2,strikes});
      rpg.combatLog='⚡ บอสใช้สกิล: พายุสายฟ้า!';
      wbSfx(1);
    }else{
      // 3) Void Nova — expanding purple-black area blast
      WB.effects.push({type:2,x:b.x,y:b.y,t:0,d:1.15,hit:false});
      rpg.combatLog='🌌 บอสใช้สกิล: ระเบิดสุญญากาศ!';
      wbSfx(2);
    }
  }

  const v192Update=updateRpg;
  updateRpg=function(dt){
    v192Update.apply(this,arguments);
    if(rpg.currentZone!=='worldboss' || !WB.active) return;
    const b=WB.boss,p=rpg.player;
    if(!b||!b.alive){WB.active=false;return;}
    b.attackCd=9999; b.aggro=false;
    WB.skillCd-=dt;
    if(WB.skillCd<=0 && !rpg.deathPending){
      wbCast(); WB.skillCd=4.2+Math.random()*1.3;
    }
    for(const e of WB.effects){
      e.t+=dt;
      if(e.type===0){
        const prog=Math.min(1,e.t/e.d),x=e.x+Math.cos(e.angle)*prog*520,y=e.y+Math.sin(e.angle)*prog*520;
        if(!e.hit && Math.hypot(p.x-x,p.y-y)<48){e.hit=true;wbDamage(28,'เปลวเพลิง');}
      }else if(e.type===1){
        for(const q of e.strikes) if(!q.hit && e.t>=q.delay+.42){
          q.hit=true;if(Math.hypot(p.x-q.x,p.y-q.y)<62) wbDamage(38,'สายฟ้า');
        }
      }else if(e.type===2){
        const rad=Math.min(220,(e.t/.78)*220);
        if(!e.hit && e.t>=.72 && Math.hypot(p.x-e.x,p.y-e.y)<rad){e.hit=true;wbDamage(58,'สุญญากาศ');}
      }
    }
    WB.effects=WB.effects.filter(e=>e.t<e.d);
    if(!b.alive){WB.active=false;rpg.combatLog='🏆 คุณปราบราชันอสูรโลกได้แล้ว!';}
  };

  const v192Draw=drawRpg;
  drawRpg=function(){
    v192Draw.apply(this,arguments);
    if(rpg.currentZone!=='worldboss') return;
    const ctx=rpgCtx,b=WB.boss,p=rpg.player,t=performance.now()/1000;
    if(!ctx||!b) return;
    // Cover the default monster with a custom boss model, without touching shared renderer/UI.
    if(b.alive){
      const bob=Math.sin(t*2)*4;
      ctx.save();ctx.translate(b.x,b.y+bob);
      // shadow + aura
      const aura=ctx.createRadialGradient(0,0,15,0,0,95);
      aura.addColorStop(0,'rgba(255,90,40,.28)');aura.addColorStop(.5,'rgba(130,30,120,.16)');aura.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=aura;ctx.beginPath();ctx.arc(0,0,95,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(0,0,0,.55)';ctx.beginPath();ctx.ellipse(0,48,52,15,0,0,Math.PI*2);ctx.fill();
      // demon king body
      ctx.fillStyle='#2b1837';ctx.strokeStyle='#ff7045';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(-34,42);ctx.lineTo(-43,-5);ctx.lineTo(-25,-50);ctx.lineTo(0,-70);ctx.lineTo(25,-50);ctx.lineTo(43,-5);ctx.lineTo(34,42);ctx.closePath();ctx.fill();ctx.stroke();
      // horns
      ctx.fillStyle='#e9c58b';ctx.beginPath();ctx.moveTo(-20,-52);ctx.lineTo(-55,-83);ctx.lineTo(-42,-38);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(20,-52);ctx.lineTo(55,-83);ctx.lineTo(42,-38);ctx.closePath();ctx.fill();
      // wings
      ctx.fillStyle='#42194c';ctx.strokeStyle='#9a4cff';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(-35,-12);ctx.lineTo(-94,-45);ctx.lineTo(-75,10);ctx.lineTo(-115,42);ctx.lineTo(-36,32);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(35,-12);ctx.lineTo(94,-45);ctx.lineTo(75,10);ctx.lineTo(115,42);ctx.lineTo(36,32);ctx.closePath();ctx.fill();ctx.stroke();
      // face / eyes
      ctx.fillStyle='#160f1c';ctx.beginPath();ctx.arc(0,-37,25,0,Math.PI*2);ctx.fill();
      ctx.shadowColor='#ff3030';ctx.shadowBlur=14;ctx.fillStyle='#ff3b30';ctx.fillRect(-14,-40,9,5);ctx.fillRect(5,-40,9,5);ctx.shadowBlur=0;
      // crown crystal
      ctx.fillStyle='#ffd55f';ctx.beginPath();ctx.moveTo(0,-93);ctx.lineTo(9,-78);ctx.lineTo(0,-63);ctx.lineTo(-9,-78);ctx.closePath();ctx.fill();
      ctx.restore();
    }
    // boss HP/name overlay
    if(b.alive){
      ctx.save();ctx.textAlign='center';ctx.font='bold 15px sans-serif';ctx.fillStyle='#ffe4ba';ctx.fillText('👑 ราชันอสูรโลก',b.x,b.y-115);
      const w=190,h=12,x=b.x-w/2,y=b.y-103;ctx.fillStyle='rgba(0,0,0,.7)';ctx.fillRect(x,y,w,h);
      ctx.fillStyle='#d93434';ctx.fillRect(x,y,w*Math.max(0,b.hp/b.maxHp),h);ctx.strokeStyle='#ffd7a0';ctx.strokeRect(x,y,w,h);
      ctx.restore();
    }
    // skill effects
    for(const e of WB.effects){
      if(e.type===0){
        const prog=Math.min(1,e.t/e.d),x=e.x+Math.cos(e.angle)*prog*520,y=e.y+Math.sin(e.angle)*prog*520;
        ctx.save();ctx.translate(x,y);ctx.rotate(e.angle);ctx.shadowColor='#ff4d21';ctx.shadowBlur=25;ctx.fillStyle='rgba(255,100,30,.88)';ctx.beginPath();ctx.moveTo(38,0);ctx.lineTo(-30,-16);ctx.lineTo(-8,0);ctx.lineTo(-30,16);ctx.closePath();ctx.fill();ctx.restore();
      }else if(e.type===1){
        for(const q of e.strikes){const phase=e.t-q.delay;if(phase<0||phase>.75)continue;ctx.save();ctx.strokeStyle='#8eeaff';ctx.shadowColor='#5d8dff';ctx.shadowBlur=25;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(q.x,-10);ctx.lineTo(q.x-12,q.y-50);ctx.lineTo(q.x+7,q.y-22);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.fillStyle='rgba(120,220,255,.2)';ctx.beginPath();ctx.arc(q.x,q.y,55*(1-phase/.75),0,Math.PI*2);ctx.fill();ctx.restore();}
      }else{
        const rad=Math.min(220,(e.t/.78)*220);ctx.save();ctx.strokeStyle='rgba(180,80,255,.9)';ctx.shadowColor='#7d28ff';ctx.shadowBlur=35;ctx.lineWidth=7;ctx.beginPath();ctx.arc(e.x,e.y,rad,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(60,10,95,.13)';ctx.beginPath();ctx.arc(e.x,e.y,rad,0,Math.PI*2);ctx.fill();ctx.restore();
      }
    }
  };

  // Override only the World Boss entry path. Existing dungeon entry remains untouched.
  const v192EnterWorld=enterRpgJungle;
  enterRpgJungle=function(){
    const result=v192EnterWorld.apply(this,arguments);
    if(rpg.currentZone==='worldboss'){
      rpg.inDungeon=true;
      rpg.packs=[];
      rpg.hitEffects=[];rpg.particles=[];rpg.projectiles=[];
      wbCreateBoss();
      rpg.combatLog='🌍 ราชันอสูรโลกปรากฏตัว!';
      syncRpgHud?.();
    }
    return result;
  };
})();



/* =========================
   V193.1 — WORLD BOSS ENTRY HARD FIX
   Final guard for World Boss only. It intercepts only the World Boss fight button,
   then re-asserts one boss pack after the existing battle entry has completed.
   ========================= */
(()=>{
  function forceWorldBossOnly(){
    if(rpg.currentZone!=='worldboss') return;
    if(typeof window.__forceWorldBossOnly==='function'){
      window.__forceWorldBossOnly();
      return;
    }
    // Fallback used only if the earlier World Boss module is absent.
    const boss={isWorldBoss:true,elite:true,alive:true,aggro:false,x:480,y:205,homeX:480,homeY:205,hp:18000,maxHp:18000,attack:0,attackCd:9999,attackAnim:0,hitFlash:0,slow:0,name:'ราชันอสูรโลก'};
    rpg.packs=[{x:480,y:205,index:-193,mobs:[boss],respawnAt:0,isWorldBoss:true}];
    rpg.hitEffects=[];rpg.particles=[];rpg.projectiles=[];
  }
  const btn=document.getElementById('worldBossFightButton');
  btn?.addEventListener('click',(e)=>{
    // Capture phase: this applies ONLY to the World Boss button and blocks its older listener.
    e.preventDefault();e.stopImmediatePropagation();
    rpg.currentZone='worldboss';
    document.getElementById('worldBossScreen')?.classList.add('hidden');
    // Run the existing battle entry so movement, player skills, controls and all shared combat remain unchanged.
    enterRpgJungle();
    forceWorldBossOnly();
    requestAnimationFrame(forceWorldBossOnly);
    setTimeout(forceWorldBossOnly,0);
    setTimeout(forceWorldBossOnly,50);
  },true);

  // Safety net: if any old code tries to restore normal packs while World Boss is active, remove only those packs.
  const oldReset=resetRpgPacks;
  resetRpgPacks=function(){
    if(rpg.currentZone==='worldboss'){
      rpg.damageFloats=[];
      forceWorldBossOnly();
      return;
    }
    return oldReset.apply(this,arguments);
  };
})();


/* =========================
   V202 — WORLD BOSS DAILY ENTRY ONLY
   - 1 account = 1 World Boss entry per local calendar day
   - resets at 00:00 device local time
   - consumes entry only when the World Boss fight button is pressed
   - blocks entry with a confirmation message when no entry remains
   - leaves timer/end/exit and all non-World-Boss systems untouched
   ========================= */
(()=>{
  const WB_ENTRY_FIELD='worldBossDailyEntryV202';

  function wbDayKey(now=Date.now()){
    const d=new Date(now);
    const y=d.getFullYear();
    const m=String(d.getMonth()+1).padStart(2,'0');
    const day=String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }

  function wbNormalizeEntry(){
    state=state||{};
    const today=wbDayKey();
    const saved=state[WB_ENTRY_FIELD];
    if(!saved || saved.day!==today){
      state[WB_ENTRY_FIELD]={day:today,used:false};
      try{saveActiveAccountState?.();}catch(_){}
    }
    return state[WB_ENTRY_FIELD];
  }

  function wbHasEntry(){
    return !wbNormalizeEntry().used;
  }

  function wbRefreshEntryUi(){
    const el=document.getElementById('worldBossEntryStatus');
    if(!el)return;
    const has=wbHasEntry();
    el.textContent=has?'🎟️ สิทธิ์เข้าบอสโลก: 1/1':'🎟️ สิทธิ์เข้าบอสโลก: 0/1 · หมดสิทธิ์วันนี้';
    el.classList.toggle('used',!has);
  }

  function wbConsumeEntry(){
    const entry=wbNormalizeEntry();
    if(entry.used)return false;
    entry.used=true;
    try{saveActiveAccountState?.();}catch(_){}
    wbRefreshEntryUi();
    return true;
  }

  // Refresh every time the World Boss page is opened, so a new local day restores 1/1.
  const v202OpenWorldBoss=openWorldBoss;
  openWorldBoss=function(){
    const result=v202OpenWorldBoss.apply(this,arguments);
    wbRefreshEntryUi();
    return result;
  };

  // Replace only the World Boss button to remove older World Boss entry listeners.
  // This is required because previous World Boss versions use capture listeners.
  const oldBtn=document.getElementById('worldBossFightButton');
  if(oldBtn){
    const btn=oldBtn.cloneNode(true);
    oldBtn.replaceWith(btn);
    btn.addEventListener('click',()=>{
      if(!wbHasEntry()){
        wbRefreshEntryUi();
        alert('ยืนยัน\nหมดสิทธิ์เล่นบอสโลกในวันนี้แล้ว\nสิทธิ์จะรีเซ็ตอีกครั้งหลังเที่ยงคืน');
        return;
      }

      // Consume exactly once before entering the existing World Boss battle.
      if(!wbConsumeEntry())return;

      // Keep the existing World Boss combat path unchanged.
      rpg.currentZone='worldboss';
      document.getElementById('worldBossScreen')?.classList.add('hidden');
      enterRpgJungle();

      // Preserve the existing World Boss-only hard guards/boss spawn if present.
      if(typeof window.__forceWorldBossOnly==='function'){
        window.__forceWorldBossOnly();
        requestAnimationFrame(()=>window.__forceWorldBossOnly?.());
        setTimeout(()=>window.__forceWorldBossOnly?.(),0);
        setTimeout(()=>window.__forceWorldBossOnly?.(),50);
      }
    });
  }

  wbRefreshEntryUi();
  // Expose only for safe UI refresh from the World Boss page.
  window.refreshWorldBossDailyEntryV202=wbRefreshEntryUi;
})();


/* =========================
   V208 — WORLD BOSS SCORE / RANK ONLY
   - Adds score strictly from final damage dealt to the World Boss.
   - Uses the existing global World Boss rank storage and per-account identity.
   - Does not modify dungeon, PvP, tower, controls, combat rules, or other UIs.
   ========================= */
(()=>{
  const WB_SCORE_KEY='farmWorldBossRank';

  function wbScoreRows(){
    try{
      const rows=JSON.parse(localStorage.getItem(WB_SCORE_KEY)||'[]');
      return Array.isArray(rows)?rows:[];
    }catch(_){return [];}
  }
  function wbSaveScoreRows(rows){
    try{localStorage.setItem(WB_SCORE_KEY,JSON.stringify(rows));}catch(_){}
  }
  function wbPlayerName(){
    const account=(typeof getWorldBossAccountKey==='function'?getWorldBossAccountKey():'guest');
    const stateName=String((typeof state!=='undefined'&&(state.username||state.playerName))||'').trim();
    const domName=String(document.getElementById('playerName')?.textContent||'').trim();
    return stateName||domName||account||'ผู้เล่น';
  }
  function wbAddDamageScore(amount){
    const damage=Math.max(0,Math.round(Number(amount)||0));
    if(damage<=0 || rpg?.currentZone!=='worldboss')return;
    const account=(typeof getWorldBossAccountKey==='function'?getWorldBossAccountKey():'guest');
    const rows=wbScoreRows();
    let row=rows.find(r=>String(r?.account||'')===account);
    if(!row){
      row={account,name:wbPlayerName(),score:0};
      rows.push(row);
    }
    row.name=wbPlayerName();
    row.score=Math.max(0,Number(row.score||0))+damage;
    wbSaveScoreRows(rows);
    try{renderWorldBossRank?.();}catch(_){}
  }

  // The existing shared combat code displays boss damage through this function.
  // In World Boss mode, count only normal/skill damage numbers positioned on the live World Boss.
  const v208ShowDamage=showRpgDamageNumber;
  showRpgDamageNumber=function(x,y,damage,kind='normal'){
    const result=v208ShowDamage.apply(this,arguments);
    if(rpg?.currentZone==='worldboss' && (kind==='normal'||kind==='skill')){
      const boss=rpg.packs?.flatMap(pack=>pack?.mobs||[]).find(m=>m?.isWorldBoss);
      const dx=Number(x)-Number(boss?.x);
      const dy=Number(y)-Number(boss?.y);
      if(boss && Number.isFinite(dx) && Number.isFinite(dy) && Math.hypot(dx,dy)<=90){
        wbAddDamageScore(Math.min(Math.max(0,Number(damage)||0), Math.max(0,Number(boss.hp)||0)+Math.max(0,Number(damage)||0)));
      }
    }
    return result;
  };

  // World Boss ranking panel: only this World Boss UI is changed.
  const rankBtn=document.getElementById('worldBossRankButton');
  const rankPanel=document.getElementById('worldBossRankPanel');
  // Expose one World Boss-only toggle so the button works even if event binding order changes.
  window.toggleWorldBossRank=function(){
    const panel=document.getElementById('worldBossRankPanel');
    if(!panel)return false;
    try{renderWorldBossRank?.();}catch(_){ }
    const opening=panel.classList.contains('hidden');
    panel.classList.toggle('hidden',!opening);
    panel.setAttribute('aria-hidden',opening?'false':'true');
    return false;
  };
  rankBtn?.addEventListener('click',(e)=>{
    e.preventDefault();
    window.toggleWorldBossRank();
  });

  // Keep the existing openWorldBoss flow and only reset this panel to closed on page entry.
  const v208OpenWorldBoss=openWorldBoss;
  openWorldBoss=function(){
    const result=v208OpenWorldBoss.apply(this,arguments);
    rankPanel?.classList.add('hidden');
    return result;
  };
})();


/* =========================
   V209 ONLINE FIX — SERVER MAILBOX GIFTS VIA SUPABASE
   Replaces only the global admin-gift storage path.
   Local game systems and existing gift UI remain unchanged.
   ========================= */
(()=>{
  const MAIL_TABLE='game_server_mail';
  const CLAIM_TABLE='game_server_mail_claims';
  const MAIL_SYNC_MS=5000;
  let mailSyncBusy=false;
  let onlineMailCache=[];
  let onlineClaimIds=new Set();
  let lastMailSync=0;

  function onlineClient(){return window.supabaseClient||null;}
  function currentMailUser(){return String(state?.username||'').trim().toLowerCase();}
  function mailToRow(g){
    return {
      id:String(g.id),
      created_at:new Date(Number(g.createdAt)||Date.now()).toISOString(),
      expires_at:g.expiresAt?new Date(Number(g.expiresAt)).toISOString():null,
      item:g.item||{},
      qty:Math.max(1,Math.floor(Number(g.qty)||1))
    };
  }
  function rowToMail(r){
    return {
      id:String(r.id),
      createdAt:Date.parse(r.created_at||'')||Date.now(),
      expiresAt:r.expires_at?(Date.parse(r.expires_at)||0):0,
      item:r.item||{},
      qty:Math.max(1,Math.floor(Number(r.qty)||1)),
      claims:{}
    };
  }
  async function syncOnlineMail(force=false){
    const client=onlineClient(), user=currentMailUser();
    if(!client||!user||mailSyncBusy)return;
    if(!force&&Date.now()-lastMailSync<1200)return;
    mailSyncBusy=true;
    try{
      const nowIso=new Date().toISOString();
      const {data:mail,error:mailError}=await client.from(MAIL_TABLE).select('*').or(`expires_at.is.null,expires_at.gt.${nowIso}`).order('created_at',{ascending:false});
      if(mailError)throw mailError;
      const rows=(mail||[]).map(rowToMail);
      onlineMailCache=rows;
      const ids=rows.map(x=>x.id);
      onlineClaimIds=new Set();
      if(ids.length){
        const {data:claims,error:claimError}=await client.from(CLAIM_TABLE).select('mail_id').eq('username',user).in('mail_id',ids);
        if(claimError)throw claimError;
        (claims||[]).forEach(x=>onlineClaimIds.add(String(x.mail_id)));
      }
      lastMailSync=Date.now();
    }catch(err){
      console.warn('Supabase server mail sync failed; using local fallback',err);
    }finally{mailSyncBusy=false;}
  }

  const v209LocalLoadMail=v164LoadMail;
  const v209LocalSaveMail=v164SaveMail;

  v164LoadMail=function(){
    if(onlineClient()&&onlineMailCache.length)return onlineMailCache.map(v115Clone);
    return v209LocalLoadMail();
  };
  v164SaveMail=function(list){
    // Keep local cache only as an offline fallback. Supabase is the shared source online.
    v209LocalSaveMail(list);
  };

  const v209OldCreateGift=v164CreateServerGift;
  v164CreateServerGift=function(item,qty,durationMs){
    const now=Date.now();
    const gift={
      id:'server-gift-'+now+'-'+Math.random().toString(36).slice(2),
      createdAt:now,
      expiresAt:now+Math.max(0,Number(durationMs)||0),
      item:v115Clone(item),
      qty:Math.max(1,Math.floor(Number(qty)||1)),
      claims:{}
    };
    const client=onlineClient();
    if(!client){
      try{return v209OldCreateGift.apply(this,arguments);}catch(_){const list=v209LocalLoadMail();list.unshift(gift);v209LocalSaveMail(list);return gift;}
    }
    // Show immediately to the sender, then publish to Supabase for every player/browser.
    onlineMailCache.unshift(v115Clone(gift));
    lastMailSync=Date.now();
    client.from(MAIL_TABLE).insert(mailToRow(gift)).then(({error})=>{
      if(error){
        console.error('Supabase server gift insert failed',error);
        // Do not silently lose the gift if the online table is not ready.
        const list=v209LocalLoadMail(); if(!list.some(x=>x.id===gift.id)){list.unshift(gift);v209LocalSaveMail(list);}
        alert('ส่งของออนไลน์ไม่สำเร็จ: กรุณาตรวจ SQL Supabase ของ game_server_mail');
        return;
      }
      syncOnlineMail(true).then(()=>{try{v164RefreshMailboxIndicator();}catch(_){}});
    });
    return gift;
  };

  v164UnclaimedGifts=function(){
    const user=currentMailUser(),now=Date.now();
    if(!user)return [];
    const source=onlineClient()&&onlineMailCache.length?onlineMailCache:v209LocalLoadMail();
    return source.filter(g=>g&&g.id&&(!g.expiresAt||Number(g.expiresAt)>now)&&
      (onlineClient()&&onlineMailCache.length?!onlineClaimIds.has(String(g.id)):!g.claims?.[user]));
  };

  v164RenderMailbox=function(){
    const listBox=document.getElementById('mailboxList');if(!listBox)return;
    syncOnlineMail(false).then(()=>{try{v164RefreshMailboxIndicator();}catch(_){}});
    const gifts=v164UnclaimedGifts();
    if(!gifts.length){
      listBox.innerHTML='<div class="mailbox-empty">📭 <b>ยังไม่มีของขวัญใหม่</b><small>เมื่อแอดมินส่งของให้ทั้งเซิร์ฟเวอร์ ของจะปรากฏที่นี่</small></div>';
      v164RefreshMailboxIndicator();return;
    }
    listBox.innerHTML=gifts.map(g=>{
      const item=g.item||{},when=new Date(g.createdAt||Date.now()).toLocaleString(),left=Math.max(0,Number(g.expiresAt||0)-Date.now());
      return `<div class="mailbox-gift"><div class="mailbox-gift-icon">${adminEsc(item.icon||'🎁')}</div><div class="mailbox-gift-info"><h3>${adminEsc(item.name||'ของขวัญ')}</h3><p>${adminEsc(item.description||'ของขวัญจากแอดมิน')}</p><small>จำนวน ${Math.max(1,Number(g.qty)||1).toLocaleString()} · ส่งเมื่อ ${adminEsc(when)}${g.expiresAt?' · เหลือ '+adminEsc(v181DurationText(left)):''}</small></div><button type="button" class="mailbox-claim" data-v164-claim="${adminEsc(g.id)}">รับของ</button></div>`;
    }).join('');
    listBox.querySelectorAll('[data-v164-claim]').forEach(btn=>btn.addEventListener('click',async()=>{
      const id=String(btn.dataset.v164Claim||''),user=currentMailUser();if(!id||!user)return;
      const gift=(onlineClient()&&onlineMailCache.length?onlineMailCache:v209LocalLoadMail()).find(x=>String(x.id)===id);
      if(!gift||onlineClaimIds.has(id)||(gift.expiresAt&&Number(gift.expiresAt)<=Date.now())){v164RenderMailbox();return;}
      btn.disabled=true;
      if(onlineClient()){
        const {error}=await onlineClient().from(CLAIM_TABLE).insert({mail_id:id,username:user});
        if(error){
          // Unique violation means this account already claimed it elsewhere.
          if(String(error.code)!=='23505'){console.error('Supabase mail claim failed',error);alert('รับของออนไลน์ไม่สำเร็จ กรุณาลองใหม่');btn.disabled=false;return;}
        }
        onlineClaimIds.add(id);
      }else{
        const list=v209LocalLoadMail(),localGift=list.find(x=>String(x.id)===id);if(!localGift){v164RenderMailbox();return;}localGift.claims=localGift.claims||{};localGift.claims[user]=Date.now();v209LocalSaveMail(list);
      }
      const live={username:state?.username||'',state};
      v115Grant(live,gift.item||{},gift.qty);
      try{saveState();render();syncCurrencyDisplays();renderRpgInventory();renderRpgBag();}catch(_){}
      v164RenderMailbox();
    }));
    v164RefreshMailboxIndicator();
  };

  const v209OldShowGame=showGame;
  showGame=function(){
    const out=v209OldShowGame.apply(this,arguments);
    syncOnlineMail(true).then(()=>{try{v164RefreshMailboxIndicator();}catch(_){}});
    return out;
  };
  setInterval(()=>{
    if(currentMailUser())syncOnlineMail(false).then(()=>{try{v164RefreshMailboxIndicator();}catch(_){}});
  },MAIL_SYNC_MS);
  setTimeout(()=>syncOnlineMail(true),1200);
})();


/* =========================
   V209 ONLINE SHARED ADMIN CONFIG
   All main-admin settings are stored as one shared Supabase config.
   LocalStorage remains only as an offline/cache fallback.
   ========================= */
(function installV209SharedAdminConfig(){
  const TABLE='game_admin_config';
  const ROW_ID=1;
  const TOWER_TABLE='game_shared_configs';
  const TOWER_KEY='tower_rewards_v1';
  let lastRemoteUpdated='';
  let loading=false;
  let lastPoll=0;

  function client(){ return window.supabaseClient||null; }
  function clone(v){ try{return JSON.parse(JSON.stringify(v));}catch(_){return v;} }

  async function pullSharedAdminConfig(force=false){
    const c=client();
    if(!c||loading) return false;
    if(!force && document.getElementById('adminPanel') && !document.getElementById('adminPanel').classList.contains('hidden')) return false;
    loading=true;
    try{
      const {data,error}=await c.from(TABLE).select('config,updated_at').eq('id',ROW_ID).maybeSingle();
      if(error) throw error;
      if(!data?.config || typeof data.config!=='object') return false;
      const stamp=String(data.updated_at||'');
      if(!force && stamp && stamp===lastRemoteUpdated) return false;
      adminConfig=adminMergeDefaults(clone(data.config),adminClone(ADMIN_DEFAULT));
      Object.entries(crops).forEach(([id,c])=>{adminConfig.farm.crops[id]=adminConfig.farm.crops[id]||{name:c.name,icon:c.icon,cost:c.cost,sell:c.sell,growMs:c.growMs,enabled:true,currency:'coin'};});
      ensureAdminLoginRewards();
      syncLoginRewardConfigToGame();
      applyAdminConfig();
      try{localStorage.setItem(ADMIN_KEY,JSON.stringify(adminConfig));}catch(_){}
      lastRemoteUpdated=stamp;
      try{ if(document.getElementById('adminPanel') && !document.getElementById('adminPanel').classList.contains('hidden')) renderAdmin(); }catch(_){}
      return true;
    }catch(e){ console.warn('Shared admin config load failed:',e?.message||e); return false; }
    finally{ loading=false; }
  }

  async function pushSharedAdminConfig(){
    const c=client();
    if(!c) return false;
    try{
      const payload={id:ROW_ID,config:clone(adminConfig),updated_at:new Date().toISOString()};
      const {data,error}=await c.from(TABLE).upsert(payload,{onConflict:'id'}).select('updated_at').single();
      if(error) throw error;
      lastRemoteUpdated=String(data?.updated_at||payload.updated_at);
      return true;
    }catch(e){ console.warn('Shared admin config save failed:',e?.message||e); return false; }
  }

  // Catch the FINAL saveAdminConfig implementation, including all V99-V209 wrappers.
  const previousSaveAdminConfig=saveAdminConfig;
  saveAdminConfig=function(){
    const result=previousSaveAdminConfig.apply(this,arguments);
    pushSharedAdminConfig();
    return result;
  };

  // Login reward cycle promotion also changes global admin configuration.
  const previousEnsureLoginRewardState=ensureLoginRewardState;
  ensureLoginRewardState=function(){
    const before=JSON.stringify(adminConfig?.loginRewards||{});
    const result=previousEnsureLoginRewardState.apply(this,arguments);
    if(before!==JSON.stringify(adminConfig?.loginRewards||{})) pushSharedAdminConfig();
    return result;
  };

  // Secondary admin tower rewards are also server-wide.
  const previousSaveTowerRewards=saveTowerRewardsFromSecondaryAdmin;
  saveTowerRewardsFromSecondaryAdmin=function(floor,rows){
    previousSaveTowerRewards.apply(this,arguments);
    const c=client();
    if(c){
      const config=loadGlobalTowerRewardConfig();
      c.from(TOWER_TABLE).upsert({key:TOWER_KEY,config:clone(config),updated_at:new Date().toISOString()},{onConflict:'key'}).then(({error})=>{if(error)console.warn('Shared tower config save failed:',error.message);});
    }
  };

  async function pullSharedTowerConfig(){
    const c=client(); if(!c) return;
    try{
      const {data,error}=await c.from(TOWER_TABLE).select('config').eq('key',TOWER_KEY).maybeSingle();
      if(error||!data?.config||typeof data.config!=='object') return;
      localStorage.setItem(TOWER_GLOBAL_REWARD_CONFIG_KEY,JSON.stringify(data.config));
      try{renderTowerFloorSelect(true);}catch(_){}
    }catch(_){}
  }

  // Initial load: server data is authoritative whenever it exists.
  setTimeout(()=>{ pullSharedAdminConfig(true); pullSharedTowerConfig(); },350);

  // Polling keeps every player in sync even when Realtime is not enabled in Supabase.
  setInterval(()=>{
    const now=Date.now(); if(now-lastPoll<4500)return; lastPoll=now;
    pullSharedAdminConfig(false); pullSharedTowerConfig();
  },5000);

  window.addEventListener('storage',e=>{
    if(e.key===ADMIN_KEY){ try{pullSharedAdminConfig(true);}catch(_){} }
  });

  window.__farmSharedAdmin={pull:()=>pullSharedAdminConfig(true),push:pushSharedAdminConfig};
})();
