FARM GAME V206 ONLINE SETUP — ทำตามทีละขั้น

1) SUPABASE SQL
- เปิด Supabase Dashboard > SQL Editor > New query
- เปิดไฟล์ supabase_online_setup.sql
- คัดลอกทั้งหมดไปวาง แล้วกด Run
- ต้องไม่มี Error สีแดง

2) SUPABASE AUTH
- ไปที่ Authentication > Providers > Email
- เปิด Enable Email provider
- ช่วงทดสอบ: ถ้าไม่อยากให้ต้องกดยืนยันอีเมล ให้ปิด Confirm email ชั่วคราว
- ก่อนเปิดเกมจริง แนะนำเปิด Confirm email
- ไปที่ Authentication > URL Configuration
- ใส่ Site URL หลังจากได้ URL จาก Render เช่น https://ชื่อเกม.onrender.com
- เพิ่ม URL เดียวกันใน Redirect URLs ด้วย

3) API KEY
- supabase-config.js มี URL และ Publishable key แล้ว
- ห้ามใส่ Secret key / service_role key ในไฟล์เกม

4) ADMIN
- สมัครบัญชีแอดมินของจริงก่อน โดยใช้อีเมล + รหัสผ่าน และตั้งชื่อผู้ใช้ opchan
- ไปที่ Authentication > Users > เปิดผู้ใช้ opchan > คัดลอก UUID
- เปิด SQL Editor แล้วรัน:
  update public.game_admins
  set auth_user_id = 'UUID-ของ-opchan'
  where username = 'opchan';
- หลังจากนั้น logout/login ใหม่ บัญชีนี้จึงเห็นเมนูแอดมิน

5) ทดสอบ
- สมัครผู้เล่น A
- เล่นและเปลี่ยนข้อมูล เช่น ใช้เงิน/ปลูกพืช
- รอประมาณ 2 วินาทีเพื่อให้ autosave ทำงาน
- Logout แล้ว Login ใหม่: ข้อมูลต้องกลับมา
- เปิดอีก Browser/มือถือ Login บัญชี A: ข้อมูลเดียวกันต้องโหลด
- สมัคร B: B ต้องไม่เห็นข้อมูลของ A
- B ต้องไม่เห็นปุ่ม Admin

6) RENDER
- อัปไฟล์เกมขึ้น GitHub โดยให้ index.html อยู่ในโฟลเดอร์หลักของ Repository
- Render > New > Static Site
- Connect GitHub Repository
- Branch: main
- Build Command: เว้นว่าง
- Publish Directory: .
- Deploy
- เอา URL ที่ได้กลับไปใส่ Supabase Authentication > URL Configuration

หมายเหตุสำคัญ
- V206 นี้ยังคงเก็บ localStorage เป็น backup เพื่อไม่ให้ระบบเกมเดิมพังง่าย
- เมื่อ Supabase login สำเร็จ saveState เดิมของเกมจะถูก sync ไป game_saves โดยอัตโนมัติ
- ระบบต่อสู้ ฟาร์ม บอสโลก ดันเจี้ยน และระบบเกมเดิมไม่ได้ถูกรื้อ
- game_admin_config ยังไม่ได้เปลี่ยนเป็น shared online config ใน patch นี้ เพื่อหลีกเลี่ยงการกระทบระบบแอดมินเดิม
