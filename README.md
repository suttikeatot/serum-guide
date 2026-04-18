# Serum Ingredient Guide

Interactive web app สำหรับสรุปสารสำคัญใน serum/skincare ให้ดูง่ายในหน้าเดียว  
ออกแบบมาเพื่อใช้ดูเองเป็นหลัก โดยเน้นความเข้าใจแบบ practical มากกว่าการอ่าน paper กระจัดกระจายหลายแหล่ง

โปรเจกต์นี้ช่วยตอบคำถามหลัก ๆ เช่น:

- สารตัวไหนช่วยเรื่องอะไร
- ใช้ตอนเช้าหรือก่อนนอน
- ใช้คู่กับสารไหนได้
- คู่ไหนควรระวังเรื่องการระคายเคือง
- ตัวไหนหน้าที่ทับซ้อนกัน
- ingredient แต่ละตัวมีระดับความแรงประมาณไหน
- โอกาสระคายเคืองมากน้อยแค่ไหน
- เหมาะกับผิวมัน / ผิวแห้ง / ผิวแพ้ง่าย หรือไม่
- % ที่มักพบในงานวิจัยและการใช้จริงอยู่ช่วงไหน
- % ไหนพอสมเหตุผล, % ไหนแรงไป, และ % ไหนอาจมีน้ำหนักทางการตลาดมากกว่า

---

## จุดประสงค์ของโปรเจกต์

โปรเจกต์นี้ไม่ได้ตั้งใจเป็น medical tool หรือระบบวินิจฉัยทางคลินิก  
แต่เป็น **interactive reference web app** สำหรับใช้ดู ingredient ใน serum แบบสรุปให้เข้าใจเร็ว

เหมาะสำหรับ:

- ใช้เปิดดูเองบน Mac
- ใช้เทียบ ingredient ก่อนเลือกซื้อ serum
- ใช้ดูว่าตัวไหนหน้าที่ซ้อนกัน
- ใช้ดูคร่าว ๆ ว่าควรใช้เช้าหรือก่อนนอน
- ใช้ประกอบการจัด skincare routine แบบไม่ overload ผิว
- ใช้เป็น knowledge map ส่วนตัวเกี่ยวกับ active ingredients

---

## สิ่งที่มีในเว็บ

### 1) Ingredient cards
มีการ์ดของสารหลักที่พบบ่อยใน serum เช่น:

- Niacinamide
- Vitamin C
- Retinoid
- Hyaluronic Acid
- Ceramides
- AHA / BHA
- Azelaic Acid
- Tranexamic Acid
- Peptides
- Arbutin / Alpha-Arbutin

---

### 2) Search
สามารถค้นหาได้ด้วยคำต่าง ๆ เช่น:

- ชื่อ ingredient
- ปัญหาผิว
- ชื่อ combination
- กลุ่มการทำงาน

ตัวอย่างคำค้น:
- `niacinamide`
- `รอยดำ`
- `สิว`
- `texture`
- `retinoid`
- `vitamin c`
- `ผิวแห้ง`

---

### 3) Filters
สามารถกรองตามช่วงเวลาใช้งานได้:

- All
- AM
- PM

และกรองตามปัญหาผิวได้ เช่น:

- รอยดำ
- สิว
- ผิวมัน
- ผิวแห้ง
- barrier อ่อนแอ
- ริ้วรอย
- texture
- ผิวหมอง

---

### 4) Ingredient popup / modal
เมื่อกดที่ ingredient card จะมี popup แสดงรายละเอียดเพิ่มเติมโดยไม่เปลี่ยนหน้า

ข้อมูลใน popup มี:

- ระดับความแรง
- โอกาสระคายเคือง
- ใช้ช่วงเวลาไหน
- ระดับความน่าเชื่อถือของหลักฐานโดยรวม
- เหมาะกับผิวมัน / ผิวแห้ง / ผิวแพ้ง่ายหรือไม่
- มี ingredient form แบบไหนบ้าง
- ช่วง % ที่มักพบในงานวิจัยและการใช้จริง
- การตีความว่า % ไหนเป็น sweet spot
- % ไหนอาจแรงเกินไป
- % ไหนอาจมีน้ำหนักเชิงการตลาดมากกว่า
- สรุปสั้น ๆ แบบอ่านจบใน 30 วินาที

---

### 5) Quick combo map
มี section สรุปให้ดูเร็วว่า

**คู่ที่เด่น**
- Vitamin C + Vitamin E + Ferulic Acid
- Niacinamide + Retinoid
- Niacinamide + Tranexamic Acid
- Azelaic Acid + Niacinamide
- HA / Ceramides + เกือบทุก active

**คู่ที่ควรระวัง**
- Retinoid + AHA/BHA
- Vitamin C เข้มข้น + AHA/BHA
- ใช้ brightening หลายตัวพร้อมกันเกินจำเป็น

---

### 6) Morning vs Night summary
มี block สรุปให้ดูง่ายว่าสารไหนเหมาะกับ
- เช้า
- ก่อนนอน

---

## Ingredient logic ที่ใช้ในเว็บ

แนวคิดหลักของเว็บนี้คือ  
**ingredient ใน skincare ไม่ได้ดูแค่ชื่อสารอย่างเดียว แต่ต้องดูด้วยว่า**

- ทำงานเรื่องอะไร
- ระคายเคืองง่ายไหม
- เหมาะกับผิวแบบไหน
- ใช้เดี่ยว ๆ หรือใช้คู่กับอะไรได้
- หน้าที่ซ้ำกับตัวอื่นหรือเปล่า
- เปอร์เซ็นต์ที่ใส่มาสมเหตุผลไหม
- formulation สำคัญกว่าเลข % ลอย ๆ หรือไม่

ตัวอย่างแนวคิด:
- Niacinamide มักมีช่วงที่ practical มากที่ประมาณ 2–5%
- Vitamin C โดยเฉพาะ L-ascorbic acid มักถูกพูดถึงในช่วง 10–20%
- Retinoid ต้องแยกตามชนิด เพราะ 0.1% retinol ไม่เท่ากับ 0.1% tretinoin
- HA, Ceramides, Peptides บางครั้งดูเลข % อย่างเดียวไม่พอ เพราะ formulation สำคัญมาก
- การใส่ active สูง ไม่ได้แปลว่าดีกว่าเสมอไป
- บางสูตรใส่ active สูงเพื่อ marketing มากกว่าความจำเป็นจริง

---

## Tech Stack

โปรเจกต์นี้ทำด้วย:

- React
- Vite
- Framer Motion
- lucide-react
- shadcn/ui components
- Tailwind CSS

---

## Project Structure

ตัวอย่างโครงสร้างหลักของโปรเจกต์:

```bash
serum-guide/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── ...
├── public/
├── package.json
├── vite.config.js
└── README.md


---

## Deploy
#
การติดตั้งและรันบน macOS แบบ local
1) สิ่งที่ต้องมีในเครื่อง

ควรมี:

macOS
Node.js
npm

เช็กเวอร์ชัน:

node -v
npm -v

ถ้ายังไม่มี Node.js และใช้ Homebrew:

brew install node
2) สร้างโปรเจกต์ใหม่ด้วย Vite
npm create vite@latest serum-guide -- --template react
cd serum-guide
npm install
3) ติดตั้ง dependencies ที่ใช้ในโปรเจกต์
npm install framer-motion lucide-react

เพราะหน้าเว็บนี้ใช้ UI component แนว shadcn/ui ด้วย
ให้ติดตั้งเพิ่ม:

npx shadcn@latest init
npx shadcn@latest add card button input tabs badge

ระหว่าง init อาจมี prompt ให้เลือก style, base color, component path
ถ้าใช้ดูเองคนเดียว ใช้ค่า default ได้เลย

4) วาง source code

เอา source code หลักของหน้าเว็บไปวางในไฟล์:

src/App.jsx

จากนั้นตรวจว่า src/main.jsx import App ถูกต้อง

ตัวอย่าง src/main.jsx:

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
5) รันแบบ local development
npm run dev

Vite จะโชว์ URL ประมาณนี้:

http://localhost:5173

เปิดใน browser ได้เลย

วิธี build production ไว้เปิดดูเอง
1) build โปรเจกต์
npm run build

หลัง build เสร็จ จะได้โฟลเดอร์:

dist/
2) preview แบบ local
npm run preview

ระบบจะโชว์ URL สำหรับ preview production build

3) เปิดผ่าน local server ด้วย Python

ถ้าอยากใช้ไฟล์ใน dist แบบเสถียร ๆ ให้รัน local server:

cd dist
python3 -m http.server 8080

จากนั้นเปิด:

http://localhost:8080
หมายเหตุสำคัญเกี่ยวกับการเปิด local

ไม่ควรดับเบิลคลิกเปิด dist/index.html ตรง ๆ ด้วย file://
ถ้าอยากให้ behavior ของเว็บสมบูรณ์ ควรเปิดผ่าน local server จะดีกว่า

---
