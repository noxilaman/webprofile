/* ============================================================
   CONTENT  —  Parinya Kornpitak  ·  bilingual { en, th }
   Everything here is editable from the Admin backend.
   ============================================================ */

const DEFAULT_DATA = {
  meta: { version: 2, updated: "2026-06-11" },

  profile: {
    name: "Parinya Kornpitak",
    handle: "parinya.k",
    initials: "PK",
    photo: null, // base64 dataURL set via Admin
    role: {
      en: "IT Manager · Software Engineer · Tech Lead",
      th: "ผู้จัดการฝ่ายไอที · วิศวกรซอฟต์แวร์ · Tech Lead",
    },
    pitch: {
      en: "I build the software that runs the factory floor — 20+ years turning operations into systems that ship, from the codebase to the production line.",
      th: "ผมสร้างซอฟต์แวร์ที่ขับเคลื่อนสายการผลิตจริง ประสบการณ์ 20+ ปี เปลี่ยนงานปฏิบัติการให้เป็นระบบที่ใช้ได้จริง ตั้งแต่โค้ดจนถึงไลน์ผลิต",
    },
    location: { en: "Chiang Mai, Thailand · Open to relocation", th: "เชียงใหม่ · พร้อมย้ายที่ทำงาน" },
    education: { en: "MSc Computer Science — Chiang Mai University", th: "วท.ม. วิทยาการคอมพิวเตอร์ — ม.เชียงใหม่" },
    availability: { en: "Open to IT leadership & Tech Lead roles", th: "เปิดรับตำแหน่งผู้นำไอที & Tech Lead" },
    available: true,
    email: "pong.cpe@gmail.com",
    phone: "+66 95 592 5449",
    linkedin: "linkedin.com/in/parinya-kornpitak-pong",
    github: "https://github.com/noxilaman/",
    website: "https://www.noxilsoft.com/",
    summary: {
      en: "Over 20 years in IT with deep, hands-on expertise across PHP, Java, Node.js and C#/.NET, plus system and database design. I create technical design solutions, resolve critical issues, and lead projects end to end. Today I serve as IT Manager at an agriculture & food-processing company — using technology to streamline operations and lift efficiency across every department.",
      th: "ประสบการณ์กว่า 20 ปีในสายไอที เชี่ยวชาญลงมือจริงทั้ง PHP, Java, Node.js และ C#/.NET รวมถึงการออกแบบระบบและฐานข้อมูล ออกแบบโซลูชันทางเทคนิค แก้ปัญหาวิกฤต และนำโครงการตั้งแต่ต้นจนจบ ปัจจุบันเป็นผู้จัดการฝ่ายไอทีในบริษัทเกษตรและแปรรูปอาหาร ใช้เทคโนโลยียกระดับประสิทธิภาพในทุกแผนก",
    },
    metrics: [
      { value: "20+", label: { en: "Years in IT", th: "ปีในสายไอที" } },
      { value: "25+", label: { en: "Systems shipped", th: "ระบบที่ส่งมอบ" } },
      { value: "+20%", label: { en: "Production gain", th: "ผลผลิตเพิ่มขึ้น" } },
      { value: "MSc", label: { en: "Computer Science", th: "ป.โท วิทย์คอมฯ" } },
    ],
  },

  skills: [
    {
      group: { en: "Leadership & Management", th: "บริหาร & ภาวะผู้นำ" },
      items: ["Team Leadership", "Project & Budget Mgmt", "Software Architecture", "Mentoring", "IT Infrastructure", "Network & Security"],
    },
    {
      group: { en: "Programming", th: "การเขียนโปรแกรม" },
      items: ["C# / .NET", "Java", "Python", "Node.js", "PHP", "ReactJS", "SQL"],
    },
    {
      group: { en: "Data, Frameworks & Tools", th: "ฐานข้อมูล & เครื่องมือ" },
      items: ["MS SQL Server", "PostgreSQL", "MongoDB", "Oracle", "Laravel", "Angular", "ASP.NET", "Git", "Jenkins"],
    },
  ],

  work: [
    {
      company: "Lanna Agro Industry Co., Ltd.",
      role: { en: "IT Manager & Software Engineer", th: "ผู้จัดการฝ่ายไอที & วิศวกรซอฟต์แวร์" },
      period: "2017 — Present",
      location: { en: "Saraphi, Chiang Mai", th: "สารภี เชียงใหม่" },
      current: true,
      highlights: [
        { en: "Lead IT for an agriculture & food-processing company — develop and maintain software across every department, owning project time and budget.", th: "ดูแลงานไอทีให้บริษัทเกษตรและแปรรูปอาหาร พัฒนาและดูแลซอฟต์แวร์ทุกแผนก พร้อมบริหารเวลาและงบประมาณโครงการ" },
        { en: "Oversee design, implementation and testing; design business logic and manage IT infrastructure, network and security.", th: "กำกับการออกแบบ พัฒนา และทดสอบ ออกแบบ business logic และดูแลโครงสร้างพื้นฐานไอที เครือข่าย และความปลอดภัย" },
        { en: "Evaluate emerging technologies and present findings to executives; deliver internal IT training to staff.", th: "ประเมินเทคโนโลยีใหม่และนำเสนอผู้บริหาร พร้อมจัดอบรมไอทีภายในให้พนักงาน" },
      ],
      stack: ["Laravel", "PHP", "Python", "SQL", "Grafana", "Bootstrap"],
    },
    {
      company: "Aware Co., Ltd.",
      role: { en: "Technical Specialist", th: "ผู้เชี่ยวชาญทางเทคนิค" },
      period: "2004 — 2017",
      location: { en: "San Kamphaeng, Chiang Mai", th: "สันกำแพง เชียงใหม่" },
      current: false,
      highlights: [
        { en: "Progressed from Software Engineer to Senior Engineer to Technical Specialist over 13 years.", th: "เติบโตจาก Software Engineer สู่ Senior Engineer และ Technical Specialist ตลอด 13 ปี" },
        { en: "Led design, implementation and testing across projects; managed resources, timelines and budgets to deliver on time.", th: "นำการออกแบบ พัฒนา และทดสอบในหลายโครงการ บริหารทรัพยากร เวลา และงบประมาณให้ส่งมอบตรงเวลา" },
        { en: "Mentored software engineers, reviewed test cases, and owned deployment planning and configuration management.", th: "เป็นพี่เลี้ยงทีมวิศวกร รีวิว test case และดูแลแผนการ deploy และ configuration management" },
      ],
      stack: ["Java", "C# / .NET", "PHP", "SQL Server", "Oracle"],
    },
  ],

  projects: [
    {
      name: "LACO RTE Dashboard",
      client: "Lanna Agro Industry",
      role: { en: "Full-stack · IoT", th: "Full-stack · IoT" },
      tagline: { en: "Real-time production monitoring", th: "มอนิเตอร์การผลิตแบบเรียลไทม์" },
      description: { en: "Shop-floor dashboard wired to PLCs over RS485 and Raspberry Pi for live production visibility and instant problem-spotting.", th: "แดชบอร์ดหน้างานเชื่อม PLC ผ่าน RS485 และ Raspberry Pi เห็นการผลิตแบบสดและจับปัญหาได้ทันที" },
      impact: { en: "Production +20%", th: "ผลผลิต +20%" },
      tags: ["Laravel", "Raspberry Pi", "RS485 / PLC"],
      year: "2016",
      motif: "signal",
    },
    {
      name: "AE Contract Farming",
      client: "Lanna Agro Industry",
      role: { en: "PHP Full Stack", th: "PHP Full Stack" },
      tagline: { en: "Contract-farming management", th: "ระบบเกษตรพันธสัญญา" },
      description: { en: "End-to-end contract-farming system — farmer, land, sowing, QA, harvest and transport — integrated with Google Maps API and SAP.", th: "ระบบเกษตรพันธสัญญาครบวงจร เกษตรกร แปลง การเพาะปลูก QA เก็บเกี่ยว และขนส่ง เชื่อม Google Maps API และ SAP" },
      impact: { en: "Full traceability", th: "ตรวจสอบย้อนกลับได้ครบ" },
      tags: ["CakePHP", "Google Maps API", "SAP"],
      year: "2019",
      motif: "blocks",
    },
    {
      name: "FT Form",
      client: "Lanna Agro Industry",
      role: { en: "PHP Full Stack", th: "PHP Full Stack" },
      tagline: { en: "Production line management", th: "บริหารไลน์ผลิต" },
      description: { en: "Line-manufacture management with input/output tracking, forecast analysis and real-time reports for the production floor.", th: "ระบบบริหารไลน์ผลิต ติดตาม input/output วิเคราะห์พยากรณ์ และรายงานเรียลไทม์หน้างาน" },
      impact: { en: "Staffing −4–5 / line", th: "ลดคน 4–5 คน/ไลน์" },
      tags: ["Laravel", "SQL Server", "Forecasting"],
      year: "2020",
      motif: "topo",
    },
    {
      name: "LACO Auto Temp Alert",
      client: "Lanna Agro Industry",
      role: { en: "Full-stack · IoT", th: "Full-stack · IoT" },
      tagline: { en: "IoT temperature alerting", th: "แจ้งเตือนอุณหภูมิ IoT" },
      description: { en: "Real-time temperature alert system over RS485/PLC with Email & LINE notifications to prevent costly equipment damage.", th: "ระบบแจ้งเตือนอุณหภูมิแบบเรียลไทม์ผ่าน RS485/PLC ส่งแจ้งเตือนทาง Email และ LINE ป้องกันอุปกรณ์เสียหาย" },
      impact: { en: "Less downtime", th: "ดาวน์ไทม์ลดลง" },
      tags: ["Laravel", "RS485 / PLC", "LINE API"],
      year: "2017",
      motif: "orbit",
    },
    {
      name: "Carrot Rewards",
      client: "Carrot Rewards Co.",
      role: { en: "System Analyst · Architect", th: "นักวิเคราะห์ระบบ · สถาปนิก" },
      tagline: { en: "Loyalty rewards mobile app", th: "แอปสะสมแต้ม" },
      description: { en: "iOS & Android app for Rabbit card users to manage accounts, check loyalty points and redeem rewards — with QR promos and EN/TH support.", th: "แอป iOS & Android สำหรับผู้ใช้บัตร Rabbit จัดการบัญชี เช็กแต้ม แลกรางวัล มี QR โปรโมชัน รองรับ EN/TH" },
      impact: { en: "Consumer-scale launch", th: "สเกลผู้ใช้ทั่วไป" },
      tags: ["CakePHP", "iOS / Android", "Facebook API"],
      year: "2015",
      motif: "network",
    },
    {
      name: "PMI-GAP",
      client: "Philip Morris International",
      role: { en: "System Analyst · Architect", th: "นักวิเคราะห์ระบบ · สถาปนิก" },
      tagline: { en: "Good Agricultural Practices app", th: "แอปมาตรฐานเกษตรที่ดี (GAP)" },
      description: { en: "Tablet + web platform guiding tobacco suppliers and farmers on sustainable, safe Good Agricultural Practices across iOS and Android.", th: "แพลตฟอร์มแท็บเล็ต + เว็บ แนะแนวเกษตรกรและซัพพลายเออร์ยาสูบสู่มาตรฐาน GAP ที่ยั่งยืนและปลอดภัย บน iOS และ Android" },
      impact: { en: "International rollout", th: "ใช้งานระดับสากล" },
      tags: ["CakePHP", "iOS / Android", "MySQL"],
      year: "2014",
      motif: "blocks",
    },
    {
      name: "AMIS",
      client: "CropsData Technology",
      role: { en: "System Analyst · Programmer", th: "นักวิเคราะห์ระบบ · โปรแกรมเมอร์" },
      tagline: { en: "Agriculture management system", th: "ระบบบริหารข้อมูลเกษตร" },
      description: { en: "Re-implemented an agriculture management information system tracking production and sales for the tobacco industry across African markets — with USSD and tablet apps.", th: "พัฒนาใหม่ระบบสารสนเทศบริหารการเกษตร ติดตามการผลิตและการขายอุตสาหกรรมยาสูบในตลาดแอฟริกา พร้อมแอป USSD และแท็บเล็ต" },
      impact: { en: "Built to scale", th: "รองรับการขยายตัว" },
      tags: ["CakePHP", "MySQL", "USSD"],
      year: "2013",
      motif: "topo",
    },
    {
      name: "SORESH",
      client: "Maxketing Ltd.",
      role: { en: "Project Leader · Architect", th: "หัวหน้าโครงการ · สถาปนิก" },
      tagline: { en: "Social networking app", th: "แอปโซเชียลเน็ตเวิร์ก" },
      description: { en: "Led development of a social-networking mobile app with Facebook login, rich-media posts and location-based friend discovery.", th: "นำการพัฒนาแอปโซเชียลเน็ตเวิร์ก มี Facebook login โพสต์สื่อหลากหลาย และค้นหาเพื่อนตามตำแหน่ง" },
      impact: { en: "Led end-to-end", th: "นำตั้งแต่ต้นจนจบ" },
      tags: ["CakePHP", "Facebook API", "jQuery"],
      year: "2012",
      motif: "network",
    },
  ],

  certificates: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2023", id: "" },
    { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", year: "2023", id: "" },
    { name: "Microsoft AI Fundamentals (AI-900)", issuer: "Microsoft", year: "2023", id: "" },
    { name: "Node.js — The Complete Guide", issuer: "Online certification", year: "2022", id: "" },
    { name: "MCAD — Certified Application Developer", issuer: "Microsoft", year: "2006", id: "" },
    { name: "Java Programmer Certification", issuer: "Sun / Oracle", year: "2005", id: "" },
  ],

  side: [
    {
      name: "Guest Lecturer & Thesis Committee",
      type: { en: "Academia", th: "วิชาการ" },
      description: { en: "Guest lecturer on Agile methodology at Chiang Mai University and Far Eastern University, and a Master's thesis defense committee member at CMU Engineering.", th: "อาจารย์พิเศษสอน Agile ที่ ม.เชียงใหม่ และ ม.ฟาร์อีสเทอร์น และเป็นกรรมการสอบวิทยานิพนธ์ปริญญาโท คณะวิศวฯ มช." },
      link: "",
    },
    {
      name: "Differential Asia",
      type: { en: "Innovation Consultant · 2021–Present", th: "ที่ปรึกษานวัตกรรม · 2021–ปัจจุบัน" },
      description: { en: "Software engineer and innovation consultant — built Customer Satisfaction Index dashboards and provider data analytics.", th: "วิศวกรซอฟต์แวร์และที่ปรึกษานวัตกรรม สร้างแดชบอร์ด Customer Satisfaction Index และวิเคราะห์ข้อมูลผู้ให้บริการ" },
      link: "",
    },
    {
      name: "Vernity — REXX Platform",
      type: { en: "Technical Specialist · 2021–Present", th: "ผู้เชี่ยวชาญเทคนิค · 2021–ปัจจุบัน" },
      description: { en: "Technical specialist on REXX, a medical-education platform connecting learners and content.", th: "ผู้เชี่ยวชาญทางเทคนิคของ REXX แพลตฟอร์มการศึกษาด้านการแพทย์" },
      link: "",
    },
  ],
};

window.DEFAULT_DATA = DEFAULT_DATA;

/* tiny i18n helper: pick language with graceful fallback */
function pick(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || field.th || "";
}
window.pick = pick;

const UI_STRINGS = {
  nav:        { en: ["Work", "Projects", "Skills", "Certificates", "Side Work", "Contact"], th: ["ประสบการณ์", "โปรเจกต์", "ทักษะ", "ใบรับรอง", "งานนอก", "ติดต่อ"] },
  available:  { en: "Available", th: "พร้อมรับงาน" },
  hireMe:     { en: "Let's talk", th: "มาคุยกัน" },
  downloadCV: { en: "Download CV", th: "ดาวน์โหลด CV" },
  sec_work:   { en: "Work History", th: "ประวัติการทำงาน" },
  sec_proj:   { en: "Proud Projects", th: "โปรเจกต์ที่ภูมิใจ" },
  sec_skills: { en: "Skills & Stack", th: "ทักษะ & เทคโนโลยี" },
  sec_certs:  { en: "Certificates", th: "ใบรับรอง" },
  sec_side:   { en: "Side & Freelance", th: "งานนอก & ฟรีแลนซ์" },
  sec_contact:{ en: "Let's talk", th: "มาคุยกัน" },
  contactBlurb:{ en: "Looking for a leader who reads the P&L and the stack traces? Let's talk.", th: "กำลังมองหาผู้นำที่อ่านได้ทั้งงบกำไรขาดทุนและ stack trace? มาคุยกัน" },
  impact:     { en: "Impact", th: "ผลลัพธ์" },
  current:    { en: "Current", th: "ปัจจุบัน" },
  scrollHint: { en: "scroll", th: "เลื่อนลง" },
};
window.UI_STRINGS = UI_STRINGS;
