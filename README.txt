VERSION: V208 WORLD BOSS SCORE / RANK ONLY
- เพิ่มการนับคะแนนเฉพาะบอสโลกจากดาเมจจริงที่ผู้เล่นทำใส่บอสโลก
- คะแนนสะสมต่อผู้เล่นตามบัญชี และเรียงอันดับจากคะแนนมากไปน้อย
- เพิ่มปุ่ม “🏆 ดูอันดับ” ไว้ข้างปุ่ม “← หน้าล็อบบี้” ในหน้าบอสโลก
- กดดูอันดับแล้วแสดงรายชื่อและคะแนนสะสม
- ไม่แก้ดันเจี้ยน PVP หอคอย ระบบต่อสู้/ควบคุม หรือ UI อื่นนอกบอสโลก

VERSION: V202 WORLD BOSS DAILY ENTRY
- เพิ่มสิทธิ์เข้าบอสโลก ID ละ 1/1 ต่อวัน
- รีเซ็ตสิทธิ์ตามวันใหม่หลังเวลา 00:00
- แสดงสถานะสิทธิ์ใต้ปุ่ม สู้บอสโลก
- กดสู้สำเร็จจึงตัดสิทธิ์เหลือ 0/1
- หมดสิทธิ์แล้วกดสู้ไม่ได้ และแจ้งว่า หมดสิทธิ์เล่นบอสโลกในวันนี้แล้ว
- แก้เฉพาะเส้นทางเข้าและสถานะสิทธิ์ของบอสโลก ไม่แตะระบบอื่น

VERSION: V187 ADMIN LOGIN REWARD CONTROL
- เพิ่มแท็บ 🎁 รางวัลล็อกอิน ในแอดมินหลัก
- แอดมินตั้งค่ารางวัลล่วงหน้าแยกสำหรับ 7 วัน และ 30 วัน
- เลือกเหรียญ เพชร ของฟาร์ม และไอเท็มจากคลังเกม พร้อมกำหนดจำนวนได้
- กดบันทึกแล้วชุดรางวัลถูกเก็บเป็น “ชุดถัดไป”
- ครบรอบ 7/30 วัน ระบบรีเซ็ตสถานะผู้เล่นและสลับมาใช้ชุดที่เตรียมไว้
- ไม่แก้ระบบอื่นนอกจากส่วนควบคุมรางวัลล็อกอิน

VERSION: V178

V178 GLOBAL TOWER SEASON RESET
- เปลี่ยนรอบรีเซ็ตหอคอยจากการเริ่มนับแยกตามผู้เล่น เป็นรอบกลางของเกม
- รอบแรกอ้างอิง 13 ส.ค. 2026 เวลา 00:00 ประเทศไทย
- รีเซ็ตทุก 1 เดือนตามปฏิทิน ในวัน/เวลาเดียวกันของรอบ
- ผู้เล่นทุก ID เห็นรอบเดียวกันและเวลานับถอยหลังเดียวกันตามเวลาที่อุปกรณ์แสดง
- สถานะเคลียร์/รับรางวัลจะรีเซ็ตเมื่อเปลี่ยนรอบกลาง
- ไม่แก้ระบบต่อสู้ มอนสเตอร์ การควบคุม จำนวนครั้งเล่นต่อวัน หรือระบบอื่น

NOTE: โปรเจกต์ ZIP นี้ยังเป็นเว็บฝั่ง client/localStorage และไม่มี backend/server time จริง ดังนั้นเวอร์ชันนี้ทำให้ 'กำหนดรอบ' เหมือนกันทุก ID แต่การกันโกงเวลาเครื่องและการซิงก์ข้ามเครื่องอย่างแท้จริงต้องเชื่อม backend/database ในขั้นต่อไป.

VERSION: V170

V170 ADMIN ANNOUNCEMENT
- เพิ่มปุ่มแท็บ “📢 ประกาศ” ในหลังบ้านแอดมิน
- แอดมินพิมพ์หัวข้อและข้อความประกาศได้
- กดปุ่มเดียวเพื่อประกาศให้ผู้เล่นทั้งหมด
- ประกาศจะไปแสดงในกล่อง 🎁 ของขวัญ/จดหมายของผู้เล่น
- ผู้เล่นเห็นสัญลักษณ์แจ้งเตือนเมื่อมีประกาศใหม่
- ตั้งเวลาหมดอายุของประกาศได้ หรือกำหนด 0 เพื่อไม่ให้หมดอายุ
- ใช้ระบบกล่องจดหมายเดิม จึงไม่กระทบระบบเกมอื่น

VERSION: V139

V139 PASS TICKET TIMER
- เพิ่มไอเท็มใหม่ "ใบผ่านทาง" 🎫 เข้ากระเป๋าไอเท็มกลางแล้ว
- เพิ่มสถานะใบผ่านทางไว้บนแถบด้านบนร่วมกับเหรียญและเพชร ในรูปแบบขนาดเล็ก
- แสดงจำนวนใบผ่านทางปัจจุบัน / 120
- แสดงเวลาถอยหลังแบบ นาที:วินาที จนกว่าจะได้รับใบถัดไป
- ได้รับใบผ่านทาง 1 ใบทุก 30 นาที
- เก็บสะสมได้สูงสุด 120 ใบ
- เวลายังคงนับจากเวลาจริงแม้ออกจากเกมหรือปิดหน้าเว็บ
- กลับเข้าเกมแล้วคำนวณเวลาที่ผ่านไปและมอบใบผ่านทางที่ควรได้รับทันที
- เมื่อเต็ม 120 ใบ จะหยุดสะสมเวลาเพื่อไม่ให้มีเวลาค้างสะสมเกินเพดาน
- ยังไม่ได้กำหนดการใช้งานของใบผ่านทาง รอเพิ่มระบบภายหลัง

VERSION: V138

V138 IT COMBAT RESET FIX
- ออกจากดันเจี้ยนแล้วรีเซ็ตสถานะการต่อสู้ทั้งหมดทันที
- จบ/ออกจาก PVP แล้วรีเซ็ตสถานะการต่อสู้ทั้งหมดทันที
- เริ่มดันเจี้ยนหรือเปลี่ยนเข้าแมปใหม่จะไม่พกคูลดาวน์สกิลเดิมไปด้วย
- ล้าง Skill Cooldown, Attack Cooldown, Hit Cooldown และ Skill Animation
- ล้างพิษ/DoT/ดีบัฟ รวมถึงพิษบอสสะสมของผู้เล่น
- ล้าง Poison Zone, Summon, Projectile, Skill Effect, Particle และ Damage Float ที่เป็นข้อมูลชั่วคราว
- ล้างสถานะชั่วคราวของมอนสเตอร์ เช่นพิษและคูลดาวน์ เพื่อไม่ให้เอฟเฟกต์ตกค้างข้ามแมป
- แก้ปัญหาใช้สกิลในป่าดงดิบแล้วเปลี่ยนไปภูเขาไฟแต่สกิล/พิษเดิมยังทำงาน

VERSION: V137

V137 PVP ONLY FIX
- PVP นำยา HP และ Mana ที่มีอยู่ในกระเป๋าผู้เล่นเข้าห้องต่อสู้อัตโนมัติ แต่ไม่พกน้ำชุบชีวิตเข้ามา
- PVP ตายแล้วแพ้ทันที ไม่มีการชุบชีวิตทุกกรณี
- จำกัดการใช้ยา HP และ Mana ของฝั่งผู้เล่นอย่างละ 3 ครั้งต่อแมตช์
- AI ฝั่งตรงข้ามตรวจจับผู้เล่นทันทีทั้งแมป วิ่งเข้าหาจนถึงระยะโจมตี/ระยะสกิลจริง ไม่ต้องเอาหน้าติดกัน
- AI ใช้ชุดสกิลจากข้อมูลพลังของคู่ต่อสู้ ใช้ตามระยะ, MP และคูลดาวน์ของสกิล
- แสดงสถานะคู่ต่อสู้ฝั่งขวาแบบเต็ม: ชื่อ, Lv., HP, MP, DEF, พลัง, ชื่อพลัง, อาวุธ และจำนวนยา
- หน้าก่อนเริ่มต่อสู้แสดงข้อมูลทั้งสองฝ่าย: Lv., HP, MP, DEF, พลัง, พลังที่ติดตั้ง, อาวุธ และรายการสกิล/ระยะ
- คืนยา HP/Mana ที่เหลือกลับกระเป๋าหลังจบ PVP

VERSION: V135

V135 PVP ONLY FIX
- แก้เฉพาะระบบ PVP โดยไม่แตะระบบอื่น
- ฝั่งคู่ต่อสู้มีแท็บสถานะฝั่งตรงข้ามเหมือนผู้เล่น: ชื่อ, Lv., DEF, HP, MP และจำนวนไอเท็ม HP/Mana
- เข้าแมตช์แล้วคู่ต่อสู้ตรวจจับผู้เล่นทันทีทั้งแมป ไม่มีระยะตรวจจับ
- คู่ต่อสู้วิ่งเข้าหาผู้เล่นทันที: สกิลประชิดเข้าระยะประชิดก่อน, สกิลระยะไกลใช้เมื่อถึงระยะของสกิล
- ผู้เล่นและคู่ต่อสู้ใช้ไอเท็มเพิ่ม HP ได้สูงสุด 3 ครั้ง และเพิ่ม Mana ได้สูงสุด 3 ครั้งต่อคนต่อแมตช์
- ใช้ครบ 3 ครั้งแล้วใช้ไม่ได้อีกจนกว่าแมตช์ใหม่จะเริ่ม
- ตัวนับของผู้เล่นและคู่ต่อสู้รีเซ็ตเป็น 3/3 เมื่อเริ่มแมตช์ใหม่

VERSION: V134

V134 PVP AI / COMBAT FIX
- แก้ AI คู่ต่อสู้ตรวจจับผู้เล่นทั้งสนามตั้งแต่เกิดและวิ่งเข้าต่อสู้ทันที
- ปรับระยะยืนต่อสู้ ไม่ต้องให้โมเดลชน/ติดกันก่อนโจมตี
- เพิ่มระยะโจมตีปกติของผู้เล่นใน PVP เป็นระยะต่อสู้ที่เหมาะกับขนาดตัวละคร
- AI ใช้สกิลตามสกิลที่ปลดล็อก, MP และคูลดาวน์ของคู่ต่อสู้
- AI ใช้ฮีลได้สูงสุด 3 ครั้ง และใช้ไอเท็มมานาได้สูงสุด 3 ครั้งต่อแมตช์
- เพิ่มเอฟเฟกต์และข้อความการใช้ไอเท็ม/สกิลของ AI
- แท็บสถานะคู่ต่อสู้แสดงฝั่งขวาตลอด PVP: ชื่อ, Lv., DEF, HP, MP และจำนวนฮีล/มานาที่เหลือ
- PVP เป็นแบบหนึ่งชีวิต: ฝั่งใด HP หมดแพ้ทันที ไม่มีการเกิดใหม่
- แก้ระบบให้ PVP ใช้ AI เพียงลูปเดียว ป้องกันการโจมตี/การขยับซ้ำจากโค้ดเวอร์ชันก่อน

VERSION: V101

V101 CHANGELOG
- ออกจากดันเจี้ยนแล้วกลับไปหน้าเลือก/กดเข้าดันเจี้ยน ไม่เด้งกลับหน้าฟาร์ม
- เมื่อตายในดันเจี้ยนจะค้างสถานะตายจนกดใช้น้ำชุบหรือกดคืนชีพฟรีเอง ไม่มีการเกิดอัตโนมัติ
- เพิ่มปุ่ม “ออกจากดันเจี้ยน · ไม่ชุบ” ในหน้าตาย
- หากตายแล้วออกจากดันเจี้ยนโดยไม่ชุบ จะใช้การสุ่มความเสียหายความทนทานแบบเดียวกับ “คืนชีพฟรี” และไม่เกิดใหม่
- หากยังไม่ตายแล้วกดออกจากดันเจี้ยน ออกได้ตามปกติโดยไม่เสียความทนทานเพิ่ม
- เพิ่มปุ่ม “ถอดอุปกรณ์ทั้งหมด” ในหน้าอุปกรณ์ กดครั้งเดียวถอดทุกชิ้นกลับเข้ากระเป๋าอุปกรณ์
- หลังถอดหมด ช่องอุปกรณ์ว่างจริงและโบนัส HP/ATK/DEF จากอุปกรณ์ถูกรีเซ็ตทันทีจนกว่าจะสวมใหม่
- รองรับการบันทึกช่องอุปกรณ์ว่าง ไม่สร้างอุปกรณ์เดิมกลับมาเองหลังรีโหลด
- ย้ายเวอร์ชันจาก V100 เป็น V101

VERSION: V100

V100 CHANGELOG
- แก้หน้าแอดมินกาชาให้ตรงกับหน้ากาชาจริงในเกม 1:1
- เปลี่ยนจาก NORMAL / ORANGE / RED ที่ผิดระบบ เป็น 3 ตู้จริง: ตู้สุ่มไอเท็ม, ตู้สุ่มพลัง, ตู้สุ่มอุปกรณ์
- ราคาเริ่มต้นตรงกับหน้ากาชาจริง: ไอเท็ม 200 💎 / 5 ครั้ง, พลัง 300 💎 / 1 และ 600 💎 / 8, อุปกรณ์ 200 💎 / 1 และ 500 💎 / 10
- ไม่มีการสร้างกาชาใช้เหรียญขึ้นมาเอง
- รายการรางวัลในแอดมินสร้างจากแหล่งข้อมูลที่ระบบกาชาใช้งานจริง และเพิ่ม/ลบ/ปรับอัตราออกได้
- กดบันทึกแล้วหน้ากาชา ราคา และระบบสุ่มใช้ข้อมูลใหม่ทันที
- ย้ายเวอร์ชันจาก V99 เป็น V100

Farm Game V68 — Jungle Combat / Cross-Platform Controls

ต่อจาก V67 โดยไม่ตัดระบบร้านค้า กระเป๋าหลัก ตีบวก ซ่อม Rarity REGEN และระบบไอเท็มเดิม

รายการแก้ไข V68:
- เพิ่มหน้าเลือกแพลตฟอร์ม PC / โทรศัพท์ และจำค่าด้วย localStorage
- PC ใช้ WASD + Space / Q / 1–5
- โทรศัพท์ใช้ Virtual Joystick + Touch
- แก้ Movement ให้เดินได้จริง
- Skill 5 ช่องปลดล็อกตาม Weapon Level ไม่ใช่ Character Level
- Skill ใช้งานจริง มี MP Cost / Cooldown / Damage
- REGEN เพิ่ม HP/MP/DEF x6 และ Skill Damage x3
- เพิ่ม DEF ใน Combat HUD
- ปรับ Combat UI ให้เป็นสไตล์ MOBA: Attack กลาง + Skill 5 วงรอบ
- เพิ่ม Dungeon Quickbar 5 ช่อง
- เพิ่ม Dungeon Bag สำหรับเงิน ขยะ และไอเท็มใช้งานในด่าน
- Potion / Mana Potion / Revival Potion ถูกพกเข้าดันเจี้ยนและคืนของเหลือเมื่อออก
- เงินและขยะจากดันเจี้ยนไม่เข้ากระเป๋าหลักทันที จะอยู่ใน Dungeon Bag จนออกจากดันเจี้ยน
- เพิ่มระบบลากไอเท็มจาก Dungeon Bag ไป Quickbar
- เพิ่มปุ่มคืนชีพฟรีกลับมา
- คืนชีพฟรีทำความเสียหายอุปกรณ์แบบสุ่ม 10–100% แยกแต่ละชิ้น
- ใช้น้ำทิพย์คืนชีพไม่เสียอุปกรณ์
- เพิ่มปุ่มออกจากดันเจี้ยนแบบเล็กเพื่อไม่ให้หน้าเกมตัน
- ซ่อน Zone Info / จำนวนกองมอน / จำนวนฆ่า / เงิน / เพชร และ UI ที่รบกวน Gameplay ในดันเจี้ยน

หมายเหตุ:
- ระบบเงินทดสอบ 500,000,000 เหรียญ และ 500,000,000 เพชรจาก V65/V67 ยังคงอยู่
- ระบบหลักเดิมถูกเก็บไว้


V69 fixes: robust PC WASD input, explicit PC/mobile combat wheel positioning at lower-right, explicit attack button, dungeon bag semantics (consumables carried in; coins/junk only generated by dungeon loot), and clearer mana-potion full-MP feedback.


V72: Added persistent PC/Mobile platform selector to the RPG World Select screen. The selection is saved and controls switch using the existing dungeon platform system.

V73: Added a Mobile Legends-inspired 3/4 follow camera, lower-center hero framing, mild camera zoom/smoothing, tilted battlefield plane with upright sprites, and exact movement-direction character facing/front-back presentation. Existing combat, skills, inventory, drops and PC/mobile platform systems are preserved.

V74: Fixed the player render transform so the player is drawn inside the same 3/4 camera/world transform as the battlefield. Restored the camera transform after world rendering to prevent the player from becoming invisible/off-canvas.


V75: Restored the original fixed dungeon camera. Skills now belong to the character and unlock at character Lv.1/10/20/35/50, capped at Lv.50. Weapon remains an accessory stat item: enhancement, durability, breakage, repair, and bonuses remain active, but no weapon is rendered in the character model. Existing weapon rarity/REGEN progress is migrated to the character rarity/REGEN.


V76: Monster HP bars now visibly deplete and change green/yellow/red by remaining HP. Added floating damage numbers for normal attacks and character skills; weapon condition affects skill damage through the existing accessory calculation.

V77: Fixed blank-screen crash after first attack by defining a safe frame delta inside drawRpg.

V78: อาวุธและชุดเกราะเปลี่ยนเป็นระบบ 1–8 ดาว แยก 3 ระดับ: สามัญดาวขาว, อัคนีดาวส้ม, โลหิตดาวแดง. เพิ่มกาชาในล็อบบี้: สามัญ 100,000 เหรียญ/ครั้ง หรือ 1,000,000/10 ครั้ง; อัคนี 1,000,000 เหรียญ/ครั้ง หรือ 10,000,000/10 ครั้ง; โลหิต 100 เพชร/ครั้ง หรือ 500 เพชร/10 ครั้ง. เพิ่มคลังอุปกรณ์และสวมใส่ พร้อมตีบวกตามดาว.

V79: แยกกระเป๋าอุปกรณ์ออกจากกระเป๋าทั่วไป, กาชาไม่ให้สวมใส่จากหน้ากาชา, เพิ่มระบบเลือกอุปกรณ์แล้วสวมใส่แทนของเดิม, กล่องกาชาแบบภาพ, แอนิเมชันเปิดทีละชิ้น/ปุ่มข้าม, ผลสุ่มล้างเมื่อปิดหรือสุ่มรอบใหม่ และเสียงตามระดับความหายาก.


V81: Extreme equipment power scale. Within a tier, 1★..8★ scale directly by star count. Tier multipliers are NORMAL x100, ORANGE x1000, RED x10000. Existing gacha equipment is migrated to the new stat model.


V85 GACHA 3-BOX RULES
- ตู้ซ้าย: ไอเท็มทั่วไปเท่านั้น — 200 💎 เปิด 5 ครั้ง
  ไม่มีอาวุธหรือชุดเกราะปะปน
  รวมยา, น้ำทิพย์คืนชีพ, วัสดุซ่อม, ใบบวก, ลูกแก้วเวทมนตร์,
  ใบบวก REGEN, ผงแห่งจักรวาล และไอเท็มใช้งานที่อยู่ในร้านค้า
- ตู้กลาง: ฮีโร่ — 300 💎 เปิด 1 ครั้ง / 600 💎 เปิด 8 ครั้ง
  รวม C, B, A, S, SS, SS+, SSR, REGEN
  ฮีโร่ใหม่เริ่ม Lv.1
- ตู้ขวา: อุปกรณ์ — 200 💎 เปิด 1 ครั้ง / 500 💎 เปิด 10 ครั้ง
  รวมอาวุธและชุดเกราะ ดาวขาว/ดาวส้ม/ดาวแดง
  ของที่สุ่มได้เข้า "คลังอุปกรณ์" ไม่สวมให้อัตโนมัติ
- ระบบเปิดกล่องยังเป็นแบบแตะเพื่อเปิดทีละชิ้น
  และปุ่ม "เปิดทั้งหมด" จะเปิดของที่เหลือพร้อมกันแล้วรวมกับของที่เปิดไปก่อนหน้า


V87 POWER RANK CORRECTION
- ระดับของ "พลัง" ใช้ C, B, A, S, SS, SS+, SSR, REGEN เท่านั้น
- ดาวขาว/ดาวส้ม/ดาวแดงใช้กับ "อุปกรณ์" เท่านั้น ไม่ใช่ระดับพลัง
- แก้ชื่อภายในจาก SSSP เป็น SS+ และมี migration สำหรับเซฟ V86 เดิม


V89:
- แก้ตู้กาชาทั้ง 3 ตู้ ไม่แสดงข้อความบอกอัตราออกบ่อย/หายาก/ออกน้อย
- รายการไอเท็มที่สุ่มได้จากตู้ไอเท็ม ใช้ทะเบียนไอเท็มเดียวกับร้านค้า และหน้า reveal/ผลสุ่มใช้ภาพ itemVisual เดียวกับร้านค้า
- ผงวิเศษยังเป็นไอเท็มกาชา ไม่ขายในร้านค้า
- เพิ่ม "ตราทะลวงระดับ" ในร้านค้า ใช้คู่กับผงวิเศษเพื่อเพิ่มระดับพลังสำเร็จ 100% +1 ระดับ
- แยกหน้า "เพิ่มระดับพลัง" ออกจากหน้า "ตีบวกอุปกรณ์"
- หน้าเพิ่มระดับพลังแสดงเฉพาะพลังที่กำลังติดตั้ง
- Power Lv.1–10: ปลดล็อกสกิลที่ Lv.1 / 3 / 5 / 7 / 10
- ค่าใช้ผงวิเศษ: Lv.1→2 = 10 และเพิ่ม 3 เท่าทุกรอบถัดไป
- โอกาสสำเร็จลดลงตามระดับ โดยช่วง Lv.5→10 ยากมาก และ Lv.9→10 = 3%
- ล้มเหลวลดพลัง 1 ระดับ แต่พลังไม่แตก/ไม่หาย
- ตราทะลวงระดับยังใช้ผงวิเศษตามจำนวนปกติ + ตรา 1 ชิ้น และรับประกันสำเร็จ

V90 PATCH NOTES
- Restored 3 equipment enhancement modes: normal, magic orb, and REGEN scroll.
- REGEN scroll consumes the normal enhancement scroll requirement plus 1 REGEN scroll and guarantees success for +1 star.
- Enhancement scroll requirements reduced to one-third of the previous values at every star/tier, with minimum 1.
- Bag now renders all central ITEM_DATABASE items automatically, so new items such as Magic Powder and Breakthrough Seal always appear when obtained.
- Gacha rewards enter the same RPG inventory used by the bag.
- Breakthrough Seal remains shop-only and is not added to the item gacha pool.
- Item visuals use the same itemVisual registry across shop, bag, gacha results, and enhancement materials.


V91 PATCH
- ตลาดผู้เล่นรองรับไอเท็มทั้งหมดจากกระเป๋ากลาง (รวมไอเท็ม registry ทุกชนิด)
- ตาทะลวงระดับ, ใบบวก REGEN, ผงเฮงจักรวาล เป็นกาชา-only และไม่มีขายในร้าน
- ทั้ง 3 ชิ้นมีน้ำหนักสุ่มต่ำมากและเข้ากระเป๋าทันทีเมื่อสุ่มได้
- ใบบวก REGEN ใช้ visual กลางเดียวกันทุกจุด


V97 PATCH
- หน้าเติมเพชร: กดแพ็กเกจแล้วเลือกช่องทาง พร้อมเพย์ หรือ TrueMoney Wallet ก่อนยืนยัน
- พร้อมเพย์ใช้ QR Placeholder และ TrueMoney Wallet ใช้ข้อมูล Placeholder; ยังไม่ใส่ข้อมูลจริงและยังไม่ตัดเงินจริง
- หน้าอุปกรณ์แสดงสถานะอุปกรณ์เพิ่ม: ดาเมจ / DEF / HP และโบนัสที่ได้รับ
- เพิ่มรายละเอียดพลังที่ติดตั้ง: ระดับความหายาก ตัวคูณพลัง และรายละเอียดสกิล 5 ช่อง (ดาเมจ / MP / CD / คำอธิบาย)
- กระเป๋าอุปกรณ์เพิ่มปุ่มเรียงตามดาวและเรียงตามดาเมจ กดซ้ำเพื่อสลับมาก→น้อย / น้อย→มาก


V98 FIX:
- Lobby HP/MP/DMG/DEF now synchronizes immediately with currently equipped gear.
- Swapping equipment refreshes character, equipment, and dungeon HUD stats together.
- Opening equipment bag / equipment view / power roster synchronizes current effective stats.
- Power enhancement remains in the separate lobby service; power-change buttons open only the power roster.


V107 PATCH - GACHA FIX
- Fixed gacha currency validation to read the central coin/diamond wallet.
- Normalizes legacy formatted currency values before checking cost.
- Removed duplicate coin/diamond display from inside the gacha screen.
- Top HUD is now the only currency display used during gacha.

V107.1 FIX: แก้การตรวจยอดเพชรกาชาให้ใช้ state กลางและแปลงค่าที่มี comma/ข้อความเป็นตัวเลขก่อนตรวจยอด

V117: Fix Universe Powder count in enhancement UI; admin gifts now list equipment variants for every discovered equipment template at 1★ through 8★.


V119 SPACE DUNGEON
- Added playable Space world to World Select.
- Added 4 new space monsters with stronger stats than Deep Sea.
- Added 7 new monster junk drops.
- Added cooldown skills: Laser Barrage, Plasma Nova, Gravity Rift, Supernova.
- Added deep-space visual theme and boss combat effects.


V121 SPACE BLACK SCREEN FIX
- Fixed a JavaScript ReferenceError: the Space combat code used `space` without declaring it.
- This error stopped the RPG frame loop before drawRpg() could render the player and monsters, causing the black/empty screen.
- Space now has its own combat effect storage and safe effect renderer.


V122 SPACE VISUAL / BOSS UPGRADE
- Rebuilt Space monster models as canvas models: armored drone, plasma alien, nebula mage, Void Emperor boss.
- Added animated parallax stars, moving planets/moons with rings, floating asteroids and crystal satellites.
- Added dedicated Space combat visuals: Laser Barrage, Plasma Nova, Gravity Rift, Supernova.
- Added dedicated synthesized SFX for all Space skills.
- Boss Supernova now has a large glowing long-range explosion effect.
- Space zone no longer uses the normal road/tree decoration path.


V123 SPACE SKILL / ANIMATION FIX
- Space monsters now visibly charge skills on their own models before firing.
- Added direct animated projectiles/effects in the main renderer instead of relying on post-render overlays.
- Laser Barrage visibly travels from monster to player.
- Plasma Nova expands as a multi-ray energy explosion.
- Gravity Rift opens as animated rotating rings.
- Boss Supernova has a large charge-up animation, orbiting cores, warning halo and a long-range expanding blast.
- Fixed duplicate effect wrappers that could shorten or hide skill effects.

V124 BALANCED SEA DUNGEON SKILLS
- Reworked only the deep-sea dungeon skill visuals.
- Water Bolt: compact glowing projectile + short trail + impact ring.
- Whirlpool: 3 animated rotating water rings + central core.
- Abyss Tsunami boss: controlled shockwave + wave arcs + 6 foam particles.
- Tidal Bite: visible water arc.
- Sea monsters show a subtle charging aura while casting.
- Added short low-volume synthesized skill sounds.
- Sea effects capped at 8 active effects and delta time capped to avoid heavy effect buildup.
- No changes to monster stats, damage formulas, dungeon progression, or other zones.

V136 PvP clarification fix:
- Starting a new PvP match resets only the local player's HP/Mana item-use counters to 3/3.
- The opponent is treated as a real-player data proxy controlled by AI; its matched player data is not overwritten or reset to 3/3 when our match starts.
- PvP-only behavior and the existing instant-aggro/combat logic remain unchanged.


V210 patch: in-game ADMIN launcher button removed; admin settings/panel code retained. Shared admin config sync updated for Supabase server-wide settings.


V216 FIX: separate admin page loads Supabase before script.js; startup pull cannot overwrite shared config with another browser's LocalStorage.

VERSION: V219 TRUE ONLINE PLAYER STATE SYNC
- Login and registration now use Supabase game_player_accounts.
- Every player's game data is saved to Supabase game_player_states.
- saveState() still keeps a local cache, but online Supabase state is also written automatically.
- Existing local accounts are migrated automatically to Supabase the first time they successfully log in.
- Admin global gifts continue to use game_server_mail and game_server_mail_claims.
- Shared admin settings continue to use the single game_admin_config row.
- Included V219_SUPABASE_SETUP.sql must be run once in Supabase SQL Editor.


V228: mailbox visibility lock added to prevent legacy mailbox code from hiding the open mailbox panel.


V231: single authoritative online mailbox controller. Replace the whole deployed bundle.
