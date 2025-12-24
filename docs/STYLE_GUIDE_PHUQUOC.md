# 🏝️ 越南富國島 - 設計風格規範 (Design System)

> **用途說明**：當你需要 AI 產生類似風格的頁面時，請將此文件提供給 AI 作為參考。

---

## 📌 設計風格概述

| 項目 | 說明 |
|------|------|
| **風格名稱** | 熱帶海島玻璃擬態 (Tropical Glassmorphism) |
| **主題** | 漸層海洋背景 + 玻璃質感卡片 + 波浪/氣泡動態效果 |
| **適用場景** | 海島旅遊、度假行程、熱帶主題展示 |
| **響應式** | Mobile-First，支援手機、平板、桌機 |
| **文化元素** | 越南風情（斗笠、蓮花、竹編紋理） |

---

## 🎨 色彩系統 (Color Palette)

```css
:root {
    /* 主色調 */
    --ocean-blue: #00CED1;         /* 海洋藍綠 - 標題、強調文字 */
    --sand-white: #FFF8E7;         /* 沙灘白 - 主要文字 */
    --coral-orange: #FF6B6B;       /* 珊瑚橘紅 - 按鈕、互動元素、重點標示 */
    --palm-green: #2ECC71;         /* 棕櫚綠 - 次要強調 */
    
    /* 背景色 */
    --deep-ocean: #0A1628;         /* 深海藍 - 主背景 */
    --ocean-mid: #0D2137;          /* 中層海洋 - 漸層用 */
    --ocean-light: #1A4B6E;        /* 淺海藍 - 漸層用 */
    --sunset-gold: #FFD93D;        /* 夕陽金 - 特殊強調 */
    
    /* 玻璃效果 */
    --glass-bg: rgba(255,255,255,0.12);     /* 玻璃背景 */
    --glass-border: rgba(255,255,255,0.25); /* 玻璃邊框 */
    --glass-water: rgba(0,206,209,0.15);    /* 水波玻璃 */
    
    /* 功能色 */
    --success-green: #2ECC71;      /* 成功/完成 */
    --danger-red: #E74C3C;         /* 警告/刪除 */
    
    /* 越南元素色 */
    --vietnam-red: #DA251D;        /* 越南國旗紅 */
    --vietnam-yellow: #FFCD00;     /* 越南國旗黃 */
    --lotus-pink: #FF69B4;         /* 蓮花粉 */
}
```

### 背景漸層
```css
/* 深海漸層 */
background: linear-gradient(180deg, var(--deep-ocean) 0%, var(--ocean-mid) 40%, var(--ocean-light) 100%);

/* 日落漸層（可選） */
background: linear-gradient(180deg, #FF6B6B 0%, #FFD93D 30%, #00CED1 60%, #0A1628 100%);
```

---

## 📝 字型系統 (Typography)

```css
font-family: 'Microsoft JhengHei', 'Noto Sans TC', sans-serif;
```

| 元素 | 字級 | 顏色 | 備註 |
|------|------|------|------|
| 主標題 H1 | 2.8em | sand-white | 帶陰影 `text-shadow: 2px 2px 8px rgba(0,0,0,0.5)` |
| 區塊標題 | 1.8em | ocean-blue | 置中，帶圖示 |
| 卡片標題 | 1.2em | sand-white | - |
| 內文 | 1em (16px) | sand-white | opacity: 0.9 |
| 小字/標籤 | 0.75em~0.9em | sand-white | opacity: 0.7~0.8 |

---

## 🧊 玻璃擬態卡片 (Glassmorphism Card)

```css
.glass-card {
    background: var(--glass-bg);           /* 半透明白 */
    backdrop-filter: blur(12px);           /* 模糊效果 */
    -webkit-backdrop-filter: blur(12px);   /* Safari 支援 */
    border: 1px solid var(--glass-border); /* 微透邊框 */
    border-radius: 20px;                   /* 圓角 */
    padding: 20px~25px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,206,209,0.1);
}

/* 懸停效果 */
.glass-card:hover {
    transform: translateY(-5px);
    background: rgba(255,255,255,0.18);
    box-shadow: 0 12px 35px rgba(0,206,209,0.2);
    border-color: var(--ocean-blue);
}

/* 水波紋卡片變體 */
.glass-card-water {
    background: var(--glass-water);
    border: 1px solid rgba(0,206,209,0.3);
}
```

---

## 🔘 按鈕樣式 (Buttons)

### 主要按鈕 (Primary)
```css
.btn-primary {
    background: linear-gradient(135deg, var(--coral-orange) 0%, #FF8E53 100%);
    color: white;
    border: none;
    border-radius: 25px;          /* 膠囊形狀 */
    padding: 12px 30px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(255,107,107,0.4);
}

.btn-primary:hover {
    background: linear-gradient(135deg, #FF8E53 0%, var(--coral-orange) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255,107,107,0.5);
}
```

### 次要按鈕 (Secondary/Glass)
```css
.btn-secondary {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--sand-white);
    border-radius: 12px;
    padding: 8px 16px;
}

.btn-secondary:hover {
    background: var(--glass-water);
    border-color: var(--ocean-blue);
}
```

### 越南風格按鈕（可選）
```css
.btn-vietnam {
    background: linear-gradient(135deg, var(--vietnam-red) 0%, #FF4136 100%);
    color: var(--vietnam-yellow);
    border: 2px solid var(--vietnam-yellow);
}
```

---

## 📱 底部導航 (Mobile Bottom Navigation)

```css
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(10, 22, 40, 0.95);
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: space-around;
    padding: 10px 5px;
    z-index: 999;
    border-top: 1px solid var(--glass-border);
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
    color: var(--sand-white);
    opacity: 0.6;
    transition: all 0.3s;
    border-radius: 10px;
    font-size: 0.75em;
}

.nav-item.active {
    opacity: 1;
    background: var(--glass-water);
}

.nav-item.active i {
    color: var(--coral-orange);  /* 選中狀態用珊瑚橘 */
}
```

---

## 🌊 波浪動畫 (Wave Animation)

```css
.waves {
    position: fixed;
    bottom: 70px; /* 底部導航上方 */
    left: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%2300CED1" fill-opacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
    background-size: 50% 100%;
    animation: wave 8s linear infinite;
}

.wave:nth-child(2) {
    bottom: 10px;
    opacity: 0.5;
    animation: wave 6s linear reverse infinite;
}

.wave:nth-child(3) {
    bottom: 20px;
    opacity: 0.3;
    animation: wave 10s linear infinite;
}

@keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
```

---

## 🫧 氣泡動畫 (Bubble Animation)

```css
.bubbles {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.bubble {
    position: absolute;
    bottom: -50px;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(0,206,209,0.3));
    border-radius: 50%;
    animation: rise linear infinite;
}

@keyframes rise {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0.6;
    }
    100% {
        transform: translateY(-100vh) scale(0.5);
        opacity: 0;
    }
}
```

### JavaScript 生成氣泡
```javascript
function createBubbles() {
    const container = document.querySelector('.bubbles');
    
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 30 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 8 + 6) + 's';
        bubble.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(bubble);
    }
}
```

---

## 🌴 椰子樹裝飾 (Palm Tree Decoration)

```css
.palm-decoration {
    position: fixed;
    bottom: 60px;
    font-size: 4em;
    opacity: 0.3;
    z-index: 0;
    animation: sway 4s ease-in-out infinite;
}

.palm-left {
    left: -20px;
    transform: scaleX(-1);
}

.palm-right {
    right: -20px;
}

@keyframes sway {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
}
```

---

## ✨ 動畫效果 (Animations)

### 淡入動畫
```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animated-element {
    animation: fadeIn 0.4s ease;
}
```

### 閃爍效果（陽光）
```css
@keyframes shimmer {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
}

.sun-shimmer {
    animation: shimmer 3s ease-in-out infinite;
}
```

### 通用過渡
```css
transition: all 0.3s ease;
```

---

## 🏷️ 標籤/徽章 (Badge/Tag)

```css
.badge {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 10px 20px;
    backdrop-filter: blur(10px);
}

.badge i {
    color: var(--coral-orange);
    margin-right: 5px;
}

/* 越南風格徽章 */
.badge-vietnam {
    background: linear-gradient(135deg, rgba(218,37,29,0.2), rgba(255,205,0,0.2));
    border: 1px solid var(--vietnam-yellow);
}
```

---

## 🪷 越南文化元素 (Vietnamese Elements)

### 斗笠裝飾
```css
.non-la {
    font-size: 2em;
    color: #D4A574;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* 使用 emoji 或 SVG */
.non-la::before {
    content: '🎋'; /* 或使用斗笠 SVG */
}
```

### 蓮花強調
```css
.lotus-accent {
    color: var(--lotus-pink);
}

.lotus-divider {
    text-align: center;
    margin: 20px 0;
    font-size: 1.5em;
    opacity: 0.6;
}

.lotus-divider::before {
    content: '🪷 ✦ 🪷';
}
```

### 竹編紋理背景（可選）
```css
.bamboo-pattern {
    background-image: 
        repeating-linear-gradient(
            90deg,
            rgba(139,119,101,0.1) 0px,
            rgba(139,119,101,0.1) 2px,
            transparent 2px,
            transparent 20px
        );
}
```

---

## 📐 間距規範 (Spacing)

| 用途 | 大小 |
|------|------|
| 區塊內距 (padding) | 20px ~ 40px |
| 元素間距 (gap) | 10px ~ 20px |
| 卡片內距 | 15px ~ 25px |
| 圓角 (border-radius) | 15px ~ 25px（較大圓角更有海島感） |
| 底部導航高度 | ~70px |

---

## 🖼️ 圖示庫 (Icons)

使用 **Font Awesome 6**：
```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
```

常用圖示：
- 首頁：`fa-home`
- 行程：`fa-calendar-days`
- 地圖：`fa-map-location-dot`
- 清單：`fa-list-check`
- 設定：`fa-gear`
- 海灘：`fa-umbrella-beach`
- 太陽：`fa-sun`
- 海浪：`fa-water`
- 椰子樹：`fa-tree` 或 emoji 🌴
- 飛機：`fa-plane`
- 餐廳：`fa-utensils`
- 飯店：`fa-hotel`
- 潛水：`fa-mask-snorkel`
- 船：`fa-ship`
- 珍珠：`fa-gem`
- 魚：`fa-fish`

越南相關 Emoji：
- 🇻🇳 越南國旗
- 🍜 河粉
- 🪷 蓮花
- 🏝️ 海島
- 🌴 椰子樹
- 🦀 海鮮
- ☀️ 太陽
- 🌊 海浪

---

## 📱 響應式斷點 (Breakpoints)

```css
/* 手機優先 */
@media (min-width: 768px) {
    /* 平板 */
}

@media (min-width: 1024px) {
    /* 桌機 */
}
```

---

## 🔧 HTML 基本結構範本

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>頁面標題 - 越南富國島探險</title>
    <meta name="theme-color" content="#0A1628">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        /* 載入 CSS 變數與基本樣式 */
    </style>
</head>
<body>
    <!-- 氣泡效果 -->
    <div class="bubbles"></div>
    
    <!-- 波浪效果 -->
    <div class="waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
    </div>
    
    <!-- 主要內容 -->
    <main class="section">
        <h2 class="section-title"><i class="fas fa-umbrella-beach"></i> 區塊標題</h2>
        <!-- 內容 -->
    </main>
    
    <!-- 底部導航 -->
    <nav class="bottom-nav">
        <a href="index.html" class="nav-item">
            <i class="fas fa-home"></i>
            <span>首頁</span>
        </a>
        <!-- 更多導航項目 -->
    </nav>
    
    <script>
        // 氣泡動畫
        createBubbles();
    </script>
</body>
</html>
```

---

## 💡 設計原則

1. **海洋主題**：使用深海藍漸層背景，營造水下或海邊感
2. **玻璃質感**：卡片使用半透明白/藍 + blur 效果，如同水中光影
3. **暖色點綴**：珊瑚橘用於重點元素，象徵熱帶陽光與活力
4. **動態細節**：波浪、氣泡動畫增添海島氛圍
5. **越南風情**：適度加入蓮花、斗笠等文化元素
6. **手機優先**：底部導航、大觸控區域、適當的字級

---

## 🎯 與冰雪主題的對比

| 項目 | 冰雪主題 | 熱帶海島主題 |
|------|----------|--------------|
| 背景 | 深藍夜空 | 深海藍漸層 |
| 主強調色 | 冰藍 #87CEEB | 海洋藍綠 #00CED1 |
| 互動色 | 暖橘 #FF8C42 | 珊瑚橘 #FF6B6B |
| 動畫 | 飄雪 ❄️ | 波浪 🌊 + 氣泡 🫧 |
| 氛圍 | 寧靜、冷冽 | 活力、熱情 |
| 文化元素 | - | 蓮花、斗笠 |

---

## 📋 使用方式

當你需要 AI 產生新頁面時，請在對話中說明：

> 請參考 `STYLE_GUIDE_PHUQUOC.md` 的設計規範，幫我建立一個 [頁面描述]，
> 風格要保持「熱帶海島玻璃擬態」主題，使用相同的色彩系統和元件樣式。

或直接將此文件內容貼給 AI 參考。
