# Lab 2: CSS Styling - Complete Changes Summary

## 总览 (Overview)
根据 DSC 106 Lab 2 的要求，我重构了原有的单页面作品集网站，创建了符合实验要求的多页面结构，并按照实验步骤逐步实现了所有 CSS 样式功能。

Based on DSC 106 Lab 2 requirements, I restructured the original single-page portfolio website, created a multi-page structure that meets the lab requirements, and systematically implemented all CSS styling features following the lab steps.

## 主要变更 (Major Changes)

### 1. 网站架构重构 (Website Architecture Restructuring)
**Before**: 单页面应用程序 (Single-page application)
**After**: 多页面网站结构 (Multi-page website structure)

**创建的新文件/目录:**
- `projects/` - 项目页面目录
- `projects/index.html` - 项目展示页面
- `resume/` - 简历页面目录  
- `resume/index.html` - 个人简历页面
- `LAB2_CHANGES_SUMMARY.md` - 本变更摘要文档

**修改的文件:**
- `index.html` - 完全重写为简洁的首页，包含导航和联系表单
- `styles.css` - 完全重写，实现 Lab 2 要求的所有样式
- ~~`script.js`~~ - 不再需要（原动态功能已移除）

### 2. Step 1: 防止内容过宽 (Prevent Content from Getting Too Wide)
在 `styles.css` 中实现:
```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  max-width: 100ch;        /* 限制最大宽度 */
  margin-inline: auto;      /* 居中对齐 */
  padding: 1em;            /* 添加内边距防止内容贴边 */
}
```

**效果:** 内容宽度被限制在合理范围内，在大屏幕上居中显示，在小屏幕上有适当的内边距。

### 3. Step 2: 导航栏样式 (Navigation Bar Styling)
实现了完整的导航栏样式系统:

**Step 2.1 & 2.2 - Flexbox 布局:**
```css
nav ul, nav li {
  display: contents;        /* 移除列表默认样式 */
}

nav {
  display: flex;           /* 启用弹性盒布局 */
  margin-bottom: 2em;
  border-bottom: 1px solid oklch(80% 3% 200);
}

nav a {
  flex: 1;                 /* 等宽分布 */
  text-decoration: none;
  color: inherit;
  text-align: center;
  padding: 0.5em;
}
```

**Step 2.3 & 2.4 - 样式和交互效果:**
```css
html {
  --color-accent: oklch(65% 50% 0);  /* 定义主题色 */
}

nav a.current {
  border-bottom: 0.4em solid oklch(80% 3% 200);
  padding-bottom: 0.1em;
}

nav a:hover {
  background-color: oklch(95% 1% 200);
  color: var(--color-accent);
}
```

**效果:** 现代化的导航栏，具有清晰的视觉层次，当前页面高亮显示，鼠标悬停效果。

### 4. Step 3: 联系表单布局 (Contact Form Layout)
实现了基于 CSS Grid 的表单布局:

**网格布局系统:**
```css
form {
  display: grid;
  grid-template-columns: auto 1fr;  /* 两列：标签和输入框 */
  gap: 1em;
}

form label {
  display: grid;
  grid-template-columns: subgrid;   /* 使用子网格 */
  grid-column: 1 / -1;             /* 跨越所有列 */
}
```

**表单元素样式:**
```css
form input, form textarea {
  border: 1px solid oklch(80% 3% 200);
  border-radius: 4px;
  padding: 0.5em;
}

form button {
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75em 1.5em;
  cursor: pointer;
}
```

**效果:** 专业外观的表单，标签和输入框完美对齐，具有一致的视觉样式。

### 5. Step 4: 项目页面样式 (Projects Page Styling)
创建了响应式项目网格布局:

**Step 4.1 - 虚拟内容:**
在 `projects/index.html` 中添加了 12 个项目条目，每个包含:
- `<h2>` 标题
- 占位图片 (来自 vis-society.github.io)
- Lorem ipsum 描述文本

**Step 4.2 & 4.3 - 响应式网格:**
```css
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 1em;
}

.projects article {
  display: grid;
  grid-template-rows: subgrid;      /* 子网格对齐 */
  grid-row: span 3;                /* 跨越 3 行 */
}
```

**Step 4.4 - 标题改进:**
```css
h1, h2, h3, h4, h5, h6 {
  line-height: 1.1;
  text-wrap: balance;
}

h1 {
  font-size: 400%;                 /* 大幅增大主标题 */
}
```

**效果:** 响应式项目网格，自动适应屏幕尺寸，内容垂直对齐，清晰的信息层次。

### 6. Step 5: 简历页面样式 (CV Page Styling)
创建了专业的简历页面样式:

**CV 专用样式系统:**
```css
.cv-section {
  margin-bottom: 2em;
  padding: 1.5em;
  background-color: oklch(98% 1% 200);
  border-left: 4px solid var(--color-accent);  /* 左侧强调色边框 */
  border-radius: 0 8px 8px 0;
}

.cv-section h2 {
  color: var(--color-accent);
  margin-bottom: 1em;
  font-size: 1.5em;
}
```

**效果:** 专业的简历布局，每个部分都有视觉分隔，使用统一的颜色系统。

## 技术特性 (Technical Features)

### 现代 CSS 特性使用:
- **CSS Grid**: 用于表单布局和项目网格
- **Flexbox**: 用于导航栏布局
- **CSS 自定义属性 (Custom Properties)**: 用于颜色主题管理
- **oklch() 颜色函数**: 现代颜色表示法
- **子网格 (Subgrid)**: 实现复杂对齐
- **响应式设计**: auto-fill 网格和相对单位

### 响应式设计:
- 使用相对单位 (`ch`, `em`) 确保可扩展性
- 自适应网格布局适应不同屏幕尺寸
- 移动友好的触摸目标尺寸

### 用户体验增强:
- 清晰的视觉层次
- 一致的颜色系统
- 平滑的交互反馈
- 易于导航的多页面结构

## 文件结构 (File Structure)
```
Weiyu_Vivian_Chen.github.io/
├── index.html              # 首页 - 个人简介和联系表单
├── styles.css              # 统一样式表 - 所有 Lab 2 样式
├── projects/
│   └── index.html          # 项目展示页 - 响应式网格布局
├── resume/
│   └── index.html          # 简历页 - 专业简历布局
├── figures/                # 图片资源 (保留原有)
└── LAB2_CHANGES_SUMMARY.md # 本变更摘要
```

## 验证和质量保证 (Validation & Quality Assurance)
- ✅ 所有 HTML 文件通过语法检查
- ✅ CSS 无语法错误
- ✅ 响应式布局在不同屏幕尺寸下正常工作
- ✅ 导航链接功能正常
- ✅ 表单布局和样式正确应用
- ✅ 遵循 Lab 2 所有要求

## 学习成果 (Learning Outcomes)
通过完成此实验，掌握了:
1. CSS Grid 和 Flexbox 的高级用法
2. 现代 CSS 特性 (自定义属性、oklch 颜色、子网格)
3. 响应式设计原则和实践
4. 专业网站的样式组织和维护
5. 用户体验导向的界面设计

---
**完成时间**: 2025年10月8日  
**所有 Lab 2 要求已完全实现** ✅
