import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sun,
  Moon,
  Droplets,
  Sparkles,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Layers3,
  Info,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ingredients = [
  {
    id: "niacinamide",
    name: "Niacinamide",
    group: "Brightening + Barrier",
    icon: Shield,
    bestTime: ["AM", "PM"],
    effects: ["ลดรอยดำ", "คุมมัน", "ลดอักเสบ", "เสริม skin barrier"],
    worksFor: ["รอยสิว", "ผิวมัน", "ผิวแพ้ง่าย", "barrier อ่อนแอ"],
    comboGood: [
      "Vitamin C",
      "Retinoid",
      "Tranexamic Acid",
      "Hyaluronic Acid",
      "Ceramides",
      "Azelaic Acid",
    ],
    caution: [],
    overlap: ["Vitamin C", "Tranexamic Acid", "Azelaic Acid", "Arbutin"],
    summary:
      "ตัวอเนกประสงค์ ใช้ง่าย ช่วยเรื่องรอยดำ ผิวมัน และเสริมเกราะผิว เหมาะเป็นแกนกลางของ routine",
    strength: "อ่อน → กลาง",
    irritation: "ต่ำ",
    skinFit: { oily: "ดีมาก", dry: "ดี", sensitive: "ดีมาก" },
    evidenceLevel: "ค่อนข้างสูง",
    forms: ["Serum", "Essence", "Moisturizer", "Toner"],
    percentGuide: [
      {
        range: "2%",
        effect:
          "มีข้อมูลเรื่อง barrier และเริ่มเห็นผลด้านความมัน/ความสม่ำเสมอของผิว",
        note: "จุดเริ่มต้นที่อ่อนโยน",
      },
      {
        range: "4–5%",
        effect:
          "เป็นช่วงที่งานวิจัยและผลิตภัณฑ์ใช้บ่อยสุด เห็นผลชัดเรื่องรอยดำ ผิวมัน barrier",
        note: "sweet spot สำหรับหลายคน",
      },
      {
        range: "10%+",
        effect: "อาจยังใช้ได้ แต่ไม่ได้แปลว่าดีกว่าเสมอไป",
        note: "บางสูตรใส่สูงเพื่อการตลาดมากกว่าความจำเป็น",
      },
    ],
    deepDive: [
      "มักแนะนำเริ่มที่ 2–5% เพราะเป็นช่วงที่มีข้อมูลรองรับและทนง่าย",
      "เหมาะมากกับผิวมัน ผิวเป็นรอยสิว และคนที่ barrier อ่อนแอ",
      "ถ้าเจอ 10% ขึ้นไป ไม่ได้ผิด แต่ไม่ได้มีหลักฐานว่าต้องสูงขนาดนั้นถึงจะเห็นผลเสมอ",
    ],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    group: "Antioxidant + Brightening",
    icon: Sparkles,
    bestTime: ["AM"],
    effects: [
      "ต้านอนุมูลอิสระ",
      "ลดหมอง",
      "ช่วยเรื่องรอยดำ",
      "สนับสนุนคอลลาเจน",
    ],
    worksFor: ["ผิวหมอง", "photodamage", "รอยดำ", "ริ้วรอยเริ่มต้น"],
    comboGood: [
      "Vitamin E",
      "Ferulic Acid",
      "Niacinamide",
      "Hyaluronic Acid",
      "Ceramides",
    ],
    caution: ["AHA/BHA", "Retinoid (ถ้าผิวแพ้ง่ายให้แยกเวลา)"],
    overlap: ["Niacinamide", "Tranexamic Acid", "Arbutin"],
    summary:
      "เด่นเรื่องกันแดดเชิง antioxidant และลดผิวหมอง มักเหมาะตอนเช้า โดยเฉพาะถ้าใช้คู่ sunscreen",
    strength: "กลาง → สูง",
    irritation: "กลาง",
    skinFit: { oily: "ดี", dry: "กลาง", sensitive: "กลางถึงต่ำ" },
    evidenceLevel: "สูง",
    forms: [
      "L-Ascorbic Acid",
      "Ethyl Ascorbic Acid",
      "Magnesium Ascorbyl Phosphate",
      "Ascorbyl Glucoside",
    ],
    percentGuide: [
      {
        range: "5%",
        effect: "เริ่มมีข้อมูลด้าน antioxidant และ anti-aging ในบางสูตร",
        note: "อ่อนโยนกว่า แต่ผล brightening อาจช้ากว่า",
      },
      {
        range: "10–15%",
        effect:
          "เป็นช่วงที่เห็นผลบ่อยในงานวิจัยและสูตรดัง ๆ โดยเฉพาะ L-ascorbic acid",
        note: "sweet spot สำหรับทั้งประสิทธิภาพและการยอมรับของผิว",
      },
      {
        range: "20%+",
        effect:
          "อาจแรงขึ้นแต่ระคายเคืองง่ายขึ้น และไม่ได้ชนะทุกสูตร 10–15% เสมอไป",
        note: "เหมาะกับคนผิวทนและสูตรต้องนิ่งจริง",
      },
    ],
    deepDive: [
      "ถ้าเป็น L-ascorbic acid มักเห็นการพูดถึงช่วง 10–20% มากที่สุด",
      "สูตรสำคัญพอ ๆ กับเปอร์เซ็นต์ เพราะวิตามินซีเสถียรยาก",
      "คนผิวแห้งหรือแพ้ง่ายมักทนอนุพันธ์ได้ดีกว่า L-ascorbic acid เข้มข้น",
    ],
  },
  {
    id: "retinoid",
    name: "Retinoid",
    group: "Anti-aging + Acne",
    icon: Moon,
    bestTime: ["PM"],
    effects: ["ลดสิว", "เร่ง turnover", "ลดริ้วรอย", "ปรับ texture"],
    worksFor: ["สิวอุดตัน", "ริ้วรอย", "ผิวไม่เรียบ", "photoaging"],
    comboGood: ["Niacinamide", "Hyaluronic Acid", "Ceramides", "Peptides"],
    caution: ["AHA/BHA", "Vitamin C (ถ้าผิวระคายง่ายให้แยกเวลา)"],
    overlap: ["Bakuchiol", "Peptides"],
    summary:
      "ตัวหลักสาย anti-aging และสิว แต่ระคายเคืองได้ง่าย จึงควรใช้ตอนกลางคืนและมีตัวช่วยพยุง barrier",
    strength: "กลาง → สูงมาก",
    irritation: "สูง",
    skinFit: { oily: "ดีมาก", dry: "กลาง", sensitive: "ต่ำถ้าเริ่มแรงเกิน" },
    evidenceLevel: "สูงมาก",
    forms: ["Retinol", "Retinal", "Tretinoin", "Adapalene"],
    percentGuide: [
      {
        range: "Retinol 0.1%",
        effect: "เริ่มเห็นผลในสาย anti-aging และสิวเบา ๆ",
        note: "เหมาะเป็นจุดเริ่มต้นสำหรับมือใหม่",
      },
      {
        range: "Retinol 0.3–0.5%",
        effect: "เห็นผลชัดขึ้นด้าน texture และริ้วรอย แต่ระคายเคืองเพิ่ม",
        note: "sweet spot ของสาย cosmetic retinol",
      },
      {
        range: "Retinol 1%",
        effect: "แรงและต้องการผิวที่ทนได้ดี",
        note: "ไม่ใช่ทุกคนจำเป็นต้องใช้ถึงระดับนี้",
      },
    ],
    deepDive: [
      "retinoid ต้องแยกตามชนิด เพราะ 0.1% retinol ไม่เท่ากับ 0.1% tretinoin",
      "เปอร์เซ็นต์สูงขึ้นมักเพิ่มทั้งผลลัพธ์และการระคายเคืองพร้อมกัน",
      "คนผิวแห้งหรือ sensitive ควรมี niacinamide/ceramides ประกบแทบทุกครั้ง",
    ],
  },
  {
    id: "ha",
    name: "Hyaluronic Acid",
    group: "Hydration",
    icon: Droplets,
    bestTime: ["AM", "PM"],
    effects: ["เติมน้ำ", "ลดตึง", "ช่วยให้ผิวดูฟู"],
    worksFor: ["ผิวแห้ง", "ขาดน้ำ", "ใช้คู่ actives แล้วแสบง่าย"],
    comboGood: [
      "Niacinamide",
      "Vitamin C",
      "Retinoid",
      "AHA/BHA",
      "Ceramides",
      "Peptides",
      "Azelaic Acid",
    ],
    caution: [],
    overlap: ["Glycerin", "Polyglutamic Acid", "Panthenol"],
    summary:
      "เน้นเติมน้ำและช่วยให้ผิวทนต่อ active อื่นได้ดีขึ้น ใช้ได้เกือบทุก routine",
    strength: "อ่อน",
    irritation: "ต่ำมาก",
    skinFit: { oily: "ดี", dry: "ดีมาก", sensitive: "ดีมาก" },
    evidenceLevel: "กลางถึงค่อนข้างสูง",
    forms: [
      "High molecular weight HA",
      "Low molecular weight HA",
      "Crosspolymer HA",
    ],
    percentGuide: [
      {
        range: "0.1–0.5%",
        effect: "พบได้บ่อยและเพียงพอสำหรับ hydration ในหลายสูตร",
        note: "ปริมาณไม่ต้องสูงมากก็ทำงานได้",
      },
      {
        range: "0.5–2%",
        effect: "ใช้ใน serum hydration หลายสูตร ให้สัมผัสฟูและอิ่มน้ำขึ้น",
        note: "ช่วงที่พบในตลาดบ่อย",
      },
      {
        range: "สูงกว่านี้มาก",
        effect:
          "ไม่ได้แปลว่าดีกว่าเสมอไป เพราะขึ้นกับ molecular weight และ vehicle มาก",
        note: "ตัวเลขสูงอาจฟังดูดีเชิงการตลาด",
      },
    ],
    deepDive: [
      "HA เป็นทีมเติมน้ำ ไม่ใช่ active ลดรอยดำหรือรักษาสิวโดยตรง",
      "ประสิทธิภาพขึ้นกับ molecular weight และสูตร ไม่ใช่ดูเปอร์เซ็นต์อย่างเดียว",
      "เหมาะทั้งผิวมันและผิวแห้ง แต่ผิวแห้งมักได้ประโยชน์ชัดกว่า",
    ],
  },
  {
    id: "ceramides",
    name: "Ceramides",
    group: "Barrier Repair",
    icon: Shield,
    bestTime: ["AM", "PM"],
    effects: ["ซ่อม barrier", "ลดแสบตึง", "ลดการสูญเสียน้ำ"],
    worksFor: ["barrier พัง", "ผิวแห้ง", "ผิวไวต่อ actives"],
    comboGood: [
      "Niacinamide",
      "Vitamin C",
      "Retinoid",
      "AHA/BHA",
      "Hyaluronic Acid",
      "Azelaic Acid",
    ],
    caution: [],
    overlap: ["Fatty Acids", "Cholesterol"],
    summary:
      "ไม่ใช่ตัวเร่งผลัดเซลล์หรือไวท์เทนนิง แต่สำคัญมากถ้าผิวพังจากการใช้ active หลายตัว",
    strength: "อ่อน",
    irritation: "ต่ำมาก",
    skinFit: { oily: "กลางถึงดี", dry: "ดีมาก", sensitive: "ดีมาก" },
    evidenceLevel: "ค่อนข้างสูง",
    forms: ["Ceramide NP", "Ceramide AP", "Ceramide EOP", "Pseudoceramides"],
    percentGuide: [
      {
        range: "ไม่มี % เดียวมาตรฐาน",
        effect: "งานวิจัยมักเน้นระบบ lipid blend มากกว่าเลข % เดี่ยว",
        note: "ดูสูตรรวมมากกว่าตัวเลขลอย ๆ",
      },
      {
        range: "สูตรผสม ceramides + cholesterol + fatty acids",
        effect: "มักสมเหตุผลกว่า ceramide เดี่ยว",
        note: "สะท้อนโครงสร้าง barrier มากกว่า",
      },
      {
        range: "ceramide แปะฉลากแต่ปลายสูตร",
        effect: "อาจมีไว้เชิงการตลาดมากกว่าผลชัด",
        note: "ต้องดูตำแหน่ง ingredient list ด้วย",
      },
    ],
    deepDive: [
      "ceramides ไม่มีเลข % มหัศจรรย์ที่อ้างอิงง่ายเท่า niacinamide หรือวิตามินซี",
      "สิ่งที่สำคัญคือมี lipid system สมดุลหรือไม่",
      "เหมาะมากกับผิวแห้ง ผิวแพ้ง่าย และคนที่ใช้ retinoid/acids",
    ],
  },
  {
    id: "aha-bha",
    name: "AHA / BHA",
    group: "Exfoliation",
    icon: Layers3,
    bestTime: ["PM"],
    effects: [
      "ผลัดเซลล์",
      "ช่วยสิวอุดตัน",
      "ผิวเรียบขึ้น",
      "ลดความหมองบางส่วน",
    ],
    worksFor: ["สิวอุดตัน", "รูขุมขน", "texture", "ผิวหมอง"],
    comboGood: ["Hyaluronic Acid", "Ceramides", "Niacinamide"],
    caution: ["Retinoid", "Vitamin C เข้มข้น"],
    overlap: [
      "Retinoid",
      "Azelaic Acid (บางเป้าหมายซ้อนกันเรื่องสิว/ผิวเรียบ)",
    ],
    summary:
      "เหมาะกับสายอุดตันและ texture แต่ถ้าจับคู่ผิดจะระคายเคืองง่าย ควรมีตัวชดเชย barrier เสมอ",
    strength: "กลาง → สูง",
    irritation: "กลาง → สูง",
    skinFit: { oily: "ดีมาก", dry: "กลางถึงต่ำ", sensitive: "ต่ำถ้าใช้ถี่" },
    evidenceLevel: "ค่อนข้างสูง",
    forms: ["Glycolic Acid", "Lactic Acid", "Mandelic Acid", "Salicylic Acid"],
    percentGuide: [
      {
        range: "Salicylic Acid 0.5–2%",
        effect: "ช่วงคลาสสิกสำหรับสิวอุดตันและผิวมัน",
        note: "2% เป็นจุดที่เห็นบ่อยมากใน OTC",
      },
      {
        range: "Glycolic/Lactic 5–10%",
        effect: "เหมาะกับการผลัดเซลล์ใน home care",
        note: "เริ่มเห็นผลและยังควบคุม irritation ได้ดีกว่า % สูง",
      },
      {
        range: "สูงกว่านี้มาก",
        effect: "ผลัดแรงขึ้น แต่ระคายเคืองและไวแดดเพิ่ม",
        note: "มักเข้าเขต peel/professional หรือใช้ด้วยความระวังมาก",
      },
    ],
    deepDive: [
      "BHA เหมาะกับผิวมันและสิวอุดตันมากกว่า AHA",
      "AHA โดยเฉพาะ glycolic เหมาะกับ texture และผิวหมอง แต่คนผิวแห้งอาจระคายง่าย",
      "ถ้าใช้คู่ retinoid ในคืนเดียว โอกาส barrier พังเพิ่มชัด",
    ],
  },
  {
    id: "azelaic",
    name: "Azelaic Acid",
    group: "Acne + Redness + Pigment",
    icon: CheckCircle2,
    bestTime: ["AM", "PM"],
    effects: ["ลดสิว", "ลดรอยดำ", "ช่วยรอยแดง", "ลดการอักเสบ"],
    worksFor: ["สิว", "PIH", "ผิวแดงง่าย", "ผิวแพ้ง่ายกว่ากลุ่ม acid บางตัว"],
    comboGood: ["Niacinamide", "Hyaluronic Acid", "Ceramides"],
    caution: ["AHA/BHA หรือ Retinoid ในคืนเดียวกันถ้าผิวไม่ทน"],
    overlap: ["Niacinamide", "Tranexamic Acid", "AHA/BHA"],
    summary:
      "เป็นตัวกลางที่เก่งหลายอย่างในขวดเดียว โดยเฉพาะสิว + รอยดำ + รอยแดง",
    strength: "กลาง",
    irritation: "ต่ำ → กลาง",
    skinFit: { oily: "ดีมาก", dry: "กลาง", sensitive: "ดี" },
    evidenceLevel: "ค่อนข้างสูง",
    forms: ["10% serum/cream", "15% gel/foam", "20% cream"],
    percentGuide: [
      {
        range: "10%",
        effect: "เริ่มใช้ในสาย cosmetic เพื่อสิว รอยดำ และผิวแดง",
        note: "เหมาะกับคนเริ่มต้น",
      },
      {
        range: "15–20%",
        effect:
          "เป็นช่วงที่ evidence ทางคลินิกพูดถึงบ่อย โดยเฉพาะ 15% gel และ 20% cream",
        note: "sweet spot เชิงงานวิจัย",
      },
      {
        range: "สูงกว่านี้",
        effect: "ไม่ได้พบใช้ทั่วไปใน skincare consumer มากนัก",
        note: "ไม่ใช่จุดหลักของตลาด",
      },
    ],
    deepDive: [
      "เด่นมากถ้ามีทั้งสิว รอยดำ และรอยแดงในคนเดียว",
      "โดยรวมทนง่ายกว่า retinoid และ AHA/BHA หลายกรณี",
      "ผิวแห้งอาจยังต้องประกบด้วย HA/Ceramides",
    ],
  },
  {
    id: "tranexamic",
    name: "Tranexamic Acid",
    group: "Pigment Control",
    icon: Sparkles,
    bestTime: ["AM", "PM"],
    effects: ["ลดฝ้า/รอยดำ", "ช่วย pigment pathways"],
    worksFor: ["melasma", "PIH", "สีผิวไม่สม่ำเสมอ"],
    comboGood: ["Niacinamide", "Vitamin C", "Hyaluronic Acid", "Ceramides"],
    caution: [],
    overlap: ["Niacinamide", "Vitamin C", "Arbutin"],
    summary: "เด่นสายรอยดำและฝ้า เหมาะใช้เป็นตัวเฉพาะทางถ้าปัญหาหลักคือเม็ดสี",
    strength: "กลาง",
    irritation: "ต่ำ",
    skinFit: { oily: "ดี", dry: "ดี", sensitive: "ดี" },
    evidenceLevel: "กลางถึงค่อนข้างสูง",
    forms: ["2% serum", "3% serum", "5% cream/serum"],
    percentGuide: [
      {
        range: "2%",
        effect: "เริ่มมีข้อมูลทั้งเดี่ยว ๆ และสูตรจับคู่กับ niacinamide",
        note: "อ่อนโยนและน่าเริ่มต้น",
      },
      {
        range: "3–5%",
        effect: "เป็นช่วงที่งาน melasma พูดถึงบ่อยและเห็นผลมากขึ้น",
        note: "sweet spot ของ topical TXA",
      },
      {
        range: "6.5%+",
        effect: "มีข้อมูลบางสูตร แต่ไม่จำเป็นต้องสูงขนาดนี้สำหรับทุกคน",
        note: "เริ่มเข้าโซนเฉพาะสูตร",
      },
    ],
    deepDive: [
      "ถ้าปัญหาหลักคือฝ้าหรือเม็ดสี TXA เป็น active ที่น่าสนใจมาก",
      "มักใช้ร่วมกับ niacinamide หรือ vitamin C ได้ดี",
      "โดยรวม irritation ต่ำกว่าหลาย active สาย brightening",
    ],
  },
  {
    id: "peptides",
    name: "Peptides",
    group: "Supportive Anti-aging",
    icon: CheckCircle2,
    bestTime: ["AM", "PM"],
    effects: ["support คอลลาเจน", "ผิวดูเรียบ", "อ่อนโยนกว่า retinoid"],
    worksFor: ["ริ้วรอยเริ่มต้น", "ผิวที่ไม่ทน retinoid"],
    comboGood: ["Retinoid", "Hyaluronic Acid", "Ceramides", "Niacinamide"],
    caution: [],
    overlap: ["Retinoid", "Bakuchiol", "Growth Factors"],
    summary: "หลักฐานมีแต่ไม่แน่นเท่า retinoid เหมาะเป็นตัวเสริมมากกว่าตัวหลัก",
    strength: "อ่อน → กลาง",
    irritation: "ต่ำ",
    skinFit: { oily: "ดี", dry: "ดี", sensitive: "ดีมาก" },
    evidenceLevel: "กลาง",
    forms: ["Signal peptides", "Copper peptides", "Matrixyl-type peptides"],
    percentGuide: [
      {
        range: "ไม่มีมาตรฐาน % เดียว",
        effect: "หลายงานวิจัยดูที่ peptide complex หรือ proprietary blend",
        note: "อ่านฉลากแล้วเทียบยากกว่ากลุ่มอื่น",
      },
      {
        range: "สูตรที่โปร่งใสเรื่องชนิด peptide",
        effect: "น่าเชื่อถือกว่าสูตรที่บอกแค่ peptide เฉย ๆ",
        note: "ดูชนิดมากกว่าเลข %",
      },
      {
        range: "ใส่ peptide หลายชื่อแต่ไม่บอกปริมาณ",
        effect: "อาจมีน้ำหนักเชิงการตลาดสูง",
        note: "ต้องดูทั้งสูตรและแบรนด์",
      },
    ],
    deepDive: [
      "peptides เหมาะเป็นตัวเสริม anti-aging ที่ทนง่าย",
      "งานวิจัยมี แต่ความสม่ำเสมอของหลักฐานยังไม่แน่นเท่า retinoid",
      "ถ้าต้องเลือกตัวหลักเพียงหนึ่งตัวสำหรับริ้วรอย retinoid ยังแข็งแรงกว่า",
    ],
  },
  {
    id: "arbutin",
    name: "Arbutin / Alpha-Arbutin",
    group: "Brightening",
    icon: Sparkles,
    bestTime: ["AM", "PM"],
    effects: ["ลดรอยดำ", "ช่วยให้สีผิวดูสม่ำเสมอ"],
    worksFor: ["จุดด่างดำ", "รอยสิว", "ผิวหมอง"],
    comboGood: [
      "Niacinamide",
      "Tranexamic Acid",
      "Hyaluronic Acid",
      "Ceramides",
    ],
    caution: ["AHA/BHA หลายตัวพร้อมกันถ้าผิวไว"],
    overlap: ["Vitamin C", "Niacinamide", "Tranexamic Acid"],
    summary:
      "เน้นเรื่องรอยดำค่อนข้างตรงไปตรงมา แต่หน้าที่ค่อนข้างซ้อนกับ brightening actives ตัวอื่น",
    strength: "อ่อน → กลาง",
    irritation: "ต่ำ",
    skinFit: { oily: "ดี", dry: "ดี", sensitive: "ดี" },
    evidenceLevel: "กลาง",
    forms: ["Arbutin", "Alpha-Arbutin", "Deoxyarbutin"],
    percentGuide: [
      {
        range: "1–2%",
        effect: "เป็นช่วงที่พบใน alpha-arbutin skincare บ่อย",
        note: "เหมาะกับการใช้ระยะยาว",
      },
      {
        range: "3%",
        effect: "มีข้อมูลในอนุพันธ์บางชนิด เช่น deoxyarbutin",
        note: "เริ่มเฉพาะทางมากขึ้น",
      },
      {
        range: "สูงกว่านี้มาก",
        effect: "ไม่ได้มีข้อสรุปว่าดีกว่าเสมอไป",
        note: "มักดูเป็น marketing number ได้",
      },
    ],
    deepDive: [
      "เหมาะกับคนที่อยากลดรอยดำแบบไม่ aggressive มาก",
      "หน้าที่ค่อนข้างซ้อนกับ niacinamide, TXA และ vitamin C",
      "ถ้าใช้หลาย brightening พร้อมกันเกินไป อาจซ้ำซ้อนมากกว่าคุ้ม",
    ],
  },
];

const goals = [
  "ทั้งหมด",
  "รอยดำ",
  "สิว",
  "ผิวมัน",
  "ผิวแห้ง",
  "barrier อ่อนแอ",
  "ริ้วรอย",
  "texture",
  "ผิวหมอง",
];

const colorMap = {
  "Brightening + Barrier": "bg-amber-50 border-amber-200",
  "Antioxidant + Brightening": "bg-yellow-50 border-yellow-200",
  "Anti-aging + Acne": "bg-violet-50 border-violet-200",
  Hydration: "bg-sky-50 border-sky-200",
  "Barrier Repair": "bg-emerald-50 border-emerald-200",
  Exfoliation: "bg-rose-50 border-rose-200",
  "Acne + Redness + Pigment": "bg-orange-50 border-orange-200",
  "Pigment Control": "bg-fuchsia-50 border-fuchsia-200",
  "Supportive Anti-aging": "bg-indigo-50 border-indigo-200",
  Brightening: "bg-lime-50 border-lime-200",
};

function Chip({ children, tone = "default" }) {
  const styles = {
    default: "bg-white border-slate-200 text-slate-700",
    good: "bg-emerald-50 border-emerald-200 text-emerald-700",
    warn: "bg-rose-50 border-rose-200 text-rose-700",
    overlap: "bg-amber-50 border-amber-200 text-amber-700",
    info: "bg-slate-100 border-slate-200 text-slate-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function ScorePill({ label, value, tone = "slate" }) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    sky: "bg-sky-50 text-sky-700 border-sky-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <div className={`rounded-2xl border px-3 py-2 ${tones[tone]}`}>
      <div className="text-[11px] uppercase tracking-wide opacity-70">
        {label}
      </div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function IngredientModal({ item, onClose }) {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-[28px] border-b bg-white/95 p-5 backdrop-blur">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                <Info className="h-3.5 w-3.5" /> ingredient deep dive
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {item.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{item.group}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-2xl"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 p-5 md:p-6">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <ScorePill
                label="ระดับความแรง"
                value={item.strength}
                tone="violet"
              />
              <ScorePill
                label="โอกาสระคายเคือง"
                value={item.irritation}
                tone="rose"
              />
              <ScorePill
                label="ใช้ตอนไหน"
                value={item.bestTime.join(" / ")}
                tone="sky"
              />
              <ScorePill
                label="ระดับหลักฐาน"
                value={item.evidenceLevel}
                tone="emerald"
              />
            </div>

            <Card className="rounded-3xl border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">เหมาะกับผิวแบบไหน</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                <ScorePill
                  label="ผิวมัน"
                  value={item.skinFit.oily}
                  tone="sky"
                />
                <ScorePill
                  label="ผิวแห้ง"
                  value={item.skinFit.dry}
                  tone="amber"
                />
                <ScorePill
                  label="ผิวแพ้ง่าย"
                  value={item.skinFit.sensitive}
                  tone="emerald"
                />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">มีแบบไหนบ้าง</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {item.forms.map((f) => (
                  <Chip key={f} tone="info">
                    {f}
                  </Chip>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  ช่วง % ที่น่าสนใจจากงานวิจัยและการใช้จริง
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.percentGuide.map((p) => (
                  <div
                    key={p.range}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-base font-semibold text-slate-900">
                        {p.range}
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-700">
                      <b>เห็นผลยังไง:</b> {p.effect}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      <b>ตีความ:</b> {p.note}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  สรุปแบบอ่านจบใน 30 วินาที
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                {item.deepDive.map((line) => (
                  <div key={line} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-600" />
                    <span>{line}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SerumIngredientGuide() {
  const [query, setQuery] = useState("");
  const [time, setTime] = useState("ALL");
  const [goal, setGoal] = useState("ทั้งหมด");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return ingredients.filter((item) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        [
          item.name,
          item.group,
          item.summary,
          ...item.effects,
          ...item.worksFor,
          ...item.comboGood,
          ...item.forms,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const matchesTime = time === "ALL" || item.bestTime.includes(time);
      const matchesGoal =
        goal === "ทั้งหมด" ||
        item.worksFor.includes(goal) ||
        item.effects.includes(goal);
      return matchesQuery && matchesTime && matchesGoal;
    });
  }, [query, time, goal]);

  const amStars = ingredients
    .filter((i) => i.bestTime.includes("AM"))
    .map((i) => i.name);
  const pmStars = ingredients
    .filter((i) => i.bestTime.includes("PM"))
    .map((i) => i.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 lg:grid-cols-[1.5fr_1fr]"
        >
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                <Sparkles className="h-4 w-4" />
                Serum Ingredient Guide
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                สารใน serum ตัวไหน ทำอะไร ใช้ตอนไหน และกี่ % ถึงจะสมเหตุผล
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
                เวอร์ชันนี้เพิ่มข้อมูลเชิงลึกแบบกดดู popup ได้: ระดับความแรง,
                โอกาสระคายเคือง, เหมาะกับผิวมันหรือผิวแห้ง, และช่วง %
                ที่งานวิจัย/การใช้จริงพูดถึงบ่อย
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">อ่านเร็วภายใน 20 วินาที</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <Sun className="mt-0.5 h-4 w-4" />
                <span>
                  <b>เช้า:</b> Vitamin C เด่นที่สุด, Niacinamide / HA /
                  Ceramides ใช้ง่าย
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Moon className="mt-0.5 h-4 w-4" />
                <span>
                  <b>ก่อนนอน:</b> Retinoid, AHA/BHA, และตัว active
                  ที่ระคายเคืองง่าย
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4" />
                <span>
                  <b>คู่ปลอดภัยบ่อย:</b> Niacinamide + หลายอย่าง, HA/Ceramides +
                  เกือบทุกตัว
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <span>
                  <b>คู่ที่ต้องระวัง:</b> Retinoid + AHA/BHA และ Vitamin C
                  เข้มข้น + acid
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4" />
                <span>
                  <b>กดแต่ละการ์ด:</b> เพื่อดู % ที่แนะนำและความเสี่ยงระคายเคือง
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-5 md:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_auto_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ค้นหา ingredient, ปัญหาผิว หรือ combination"
                  className="h-11 rounded-2xl pl-9"
                />
              </div>

              <Tabs
                value={time}
                onValueChange={setTime}
                className="w-full lg:w-auto"
              >
                <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                  <TabsTrigger value="ALL">ทั้งหมด</TabsTrigger>
                  <TabsTrigger value="AM">เช้า</TabsTrigger>
                  <TabsTrigger value="PM">ก่อนนอน</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-wrap gap-2">
                {goals.map((g) => (
                  <Button
                    key={g}
                    variant={goal === g ? "default" : "outline"}
                    className="rounded-2xl"
                    onClick={() => setGoal(g)}
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                >
                  <Card
                    className={`h-full cursor-pointer rounded-3xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${colorMap[item.group] || "bg-white border-slate-200"}`}
                    onClick={() => setSelected(item)}
                  >
                    <CardContent className="p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="rounded-2xl bg-white/80 p-2 shadow-sm">
                              <Icon className="h-5 w-5 text-slate-700" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900">
                              {item.name}
                            </h3>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">
                            {item.group}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 text-right">
                          {item.bestTime.includes("AM") && (
                            <Badge className="rounded-full">
                              <Sun className="mr-1 h-3 w-3" />
                              AM
                            </Badge>
                          )}
                          {item.bestTime.includes("PM") && (
                            <Badge variant="secondary" className="rounded-full">
                              <Moon className="mr-1 h-3 w-3" />
                              PM
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="mb-4 text-sm leading-6 text-slate-700">
                        {item.summary}
                      </p>

                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <ScorePill
                          label="ความแรง"
                          value={item.strength}
                          tone="violet"
                        />
                        <ScorePill
                          label="ระคายเคือง"
                          value={item.irritation}
                          tone="rose"
                        />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            ส่งผลยังไง
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.effects.map((e) => (
                              <Chip key={e}>{e}</Chip>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            เหมาะกับ
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.worksFor.map((e) => (
                              <Chip key={e}>{e}</Chip>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            ใช้คู่กันได้
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.comboGood.map((e) => (
                              <Chip key={e} tone="good">
                                {e}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            ควรระวัง
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.caution.length ? (
                              item.caution.map((e) => (
                                <Chip key={e} tone="warn">
                                  {e}
                                </Chip>
                              ))
                            ) : (
                              <Chip>ไม่มีคู่เด่นที่ต้องกังวลมาก</Chip>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 text-sm font-medium text-slate-700">
                          กดเพื่อดู % ที่แนะนำและรายละเอียดเพิ่ม
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-4">
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick combo map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                <div>
                  <div className="mb-2 font-medium text-slate-900">
                    คู่ที่เด่น
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      Vitamin C + Vitamin E + Ferulic Acid
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      Niacinamide + Retinoid
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      Niacinamide + Tranexamic Acid
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      Azelaic Acid + Niacinamide
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      HA / Ceramides + เกือบทุก active
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 font-medium text-slate-900">
                    คู่ที่มักพังเพราะระคายเคือง
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-2xl bg-rose-50 p-3">
                      Retinoid + AHA/BHA
                    </div>
                    <div className="rounded-2xl bg-rose-50 p-3">
                      Vitamin C เข้มข้น + AHA/BHA
                    </div>
                    <div className="rounded-2xl bg-rose-50 p-3">
                      Brightening หลายตัวพร้อมกันเกินจำเป็น
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Morning vs Night</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-3xl bg-yellow-50 p-4">
                  <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
                    <Sun className="h-4 w-4" />
                    เช้า
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {amStars.map((n) => (
                      <Chip key={n}>{n}</Chip>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-violet-50 p-4">
                  <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
                    <Moon className="h-4 w-4" />
                    ก่อนนอน
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pmStars.map((n) => (
                      <Chip key={n}>{n}</Chip>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle>จำง่ายแบบสั้นมาก</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                <p>
                  <b>ลดรอยดำ:</b> Niacinamide / Vitamin C / Tranexamic / Arbutin
                  / Azelaic
                </p>
                <p>
                  <b>สิว + texture:</b> Retinoid / AHA-BHA / Azelaic
                </p>
                <p>
                  <b>ซ่อมผิว:</b> HA / Ceramides
                </p>
                <p>
                  <b>ริ้วรอย:</b> Retinoid เป็นแกนหลัก, Peptides เป็นตัวเสริม
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <IngredientModal item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
