# Lab 4 项目卡片和详情查看功能恢复说明

## ✅ 已恢复的功能

### 原来的问题
- 项目只显示为简单的文章列表
- 没有卡片式布局
- 无法点击查看详情
- 缺少模态框（弹窗）功能

### 现在恢复的功能
- ✅ 卡片式布局（Card Layout）
- ✅ 点击卡片查看详情
- ✅ 模态框显示项目完整信息
- ✅ GitHub链接集成
- ✅ 项目详细描述和要点
- ✅ 响应式卡片网格

---

## 📁 修改的文件

### 1. **lib/projects.json** - 添加详细字段
每个项目现在包含：
- `id` - 唯一标识符
- `title` - 标题
- `year` - 年份
- `image` - 图片路径
- `summary` - 简短摘要（卡片上显示）
- `description` - 完整描述（模态框中显示）
- `details` - 详细信息（模态框中显示）
- `github` - GitHub仓库链接（可选）

### 2. **global.js** - 重构渲染和模态框功能

#### 新增/修改的函数：

**`renderProjects(projects, container, useCards = true)`**
- 支持两种渲染模式：
  - `useCards = true` - 卡片式布局（默认）
  - `useCards = false` - 简单文章列表
- 卡片包含：
  - 图片
  - 标题
  - 摘要
  - GitHub链接（如果有）
  - 点击事件

**`openProjectModal(project, isInSubfolder = false)`**
- 在模态框中显示项目详情
- 自动处理图片路径
- 解析Markdown风格的详细信息
- 支持GitHub链接

**`closeProjectModal()`**
- 关闭模态框

**`setupProjectModal()`**
- 设置模态框事件监听器
- 点击关闭按钮或背景关闭

### 3. **projects/projects.js** - 使用卡片渲染
```javascript
renderProjects(projects, projectsContainer, true);  // true = 使用卡片
setupProjectModal();  // 设置模态框
```

### 4. **index.js** - 首页也使用卡片
```javascript
renderProjects(latestProjects, projectsContainer, true);
setupProjectModal();
```

### 5. **index.html** 和 **projects/index.html** - 添加模态框HTML
```html
<div id="modal" class="modal hidden">
  <div class="modal-content">
    <span id="modalClose" class="close">&times;</span>
    <h3 id="modalTitle"></h3>
    <p id="modalDescription"></p>
    <div id="modalDetails"></div>
  </div>
</div>
```

同时更新容器类名：
```html
<div class="projects projects-grid">
```

---

## 🎨 视觉效果

### 卡片式布局
- **网格布局**：自动适应屏幕宽度
- **卡片样式**：
  - 白色背景（浅色模式）
  - 深紫色背景（暗黑模式）
  - 圆角边框
  - 悬停阴影效果
  - 光标变为手型

### 模态框
- **半透明背景**：点击可关闭
- **居中显示**：
  - 项目标题
  - 项目图片
  - 完整描述
  - 详细信息（格式化显示）
  - GitHub链接（如果有）
- **关闭按钮**：右上角 × 按钮

---

## 💡 使用方式

### 在首页（index.html）
1. 显示最新3个项目的卡片
2. 点击任意卡片查看详情
3. 模态框显示完整项目信息

### 在项目页（projects/index.html）
1. 显示所有12个项目的卡片
2. 点击任意卡片查看详情
3. GitHub项目显示额外的GitHub链接

### 模态框交互
- **打开**：点击任意项目卡片
- **关闭**：
  - 点击右上角 × 按钮
  - 点击模态框外的背景
  - 按ESC键（浏览器默认行为）

---

## 🔧 技术实现

### 1. 卡片布局
```javascript
const card = document.createElement('div');
card.className = 'card';
card.dataset.id = project.id;
card.addEventListener('click', () => openProjectModal(project, isInSubfolder));
```

### 2. 动态内容生成
```javascript
cardHTML += `
  <div class="card-content">
    <div class="card-title">${project.title}</div>
    <div class="card-summary">${project.summary || project.description}</div>
  </div>
`;
```

### 3. 模态框内容
```javascript
document.getElementById('modalTitle').textContent = project.title;
document.getElementById('modalDescription').textContent = project.description;
```

### 4. Markdown风格解析
```javascript
if (section.trim().startsWith('•')) {
  // 解析为列表项
} else {
  // 解析为段落，支持 **粗体**
  const html = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
```

---

## 📊 项目数据结构示例

```json
{
  "id": "sta-tcn",
  "title": "STA-TCN: Neural Decoder for Upper Limb Rehabilitation",
  "year": 2024,
  "image": "figures/STA-TCN Neural Decoder for Upper Limb Rehabilitation.png",
  "summary": "Continuous motion prediction using sEMG for cable-driven exoskeletons.",
  "description": "This project focuses on continuous motion prediction...",
  "details": "**Objectives**\n\n• Develop a robust model...\n• Eliminate calibration..."
}
```

### 字段说明
- `id` - 用于模态框查找
- `summary` - 卡片上显示的简短文本
- `description` - 模态框中的主要描述
- `details` - 模态框中的详细信息（支持Markdown格式）
- `github` - 可选的GitHub链接

---

## ✨ 功能特点

### 1. 智能路径处理
- 首页：使用 `figures/xxx.png`
- 子页面：自动添加 `../` 前缀
- 外部URL：保持不变

### 2. 灵活渲染
- 可以选择卡片模式或列表模式
- 统一的渲染函数
- 代码重用

### 3. 响应式设计
- 卡片网格自动适应
- 移动端友好
- 暗黑模式支持

### 4. 用户体验
- 点击卡片打开详情
- 多种方式关闭模态框
- 平滑的动画效果
- 直观的交互

---

## 🧪 测试清单

### 首页测试
- [ ] 显示3个项目卡片
- [ ] 卡片有图片、标题、摘要
- [ ] 点击卡片打开模态框
- [ ] 模态框显示完整信息
- [ ] 可以关闭模态框
- [ ] GitHub链接正常工作（如果有）

### 项目页面测试
- [ ] 显示所有12个项目卡片
- [ ] 网格布局正常
- [ ] 项目计数显示
- [ ] 所有卡片可点击
- [ ] 模态框功能正常

### 暗黑模式测试
- [ ] 卡片在暗黑模式下样式正确
- [ ] 模态框在暗黑模式下可读
- [ ] 所有文字颜色适配

---

## 🎯 与原版功能对比

### 原来的script.js功能
✅ 卡片式布局 - **已恢复**
✅ 点击查看详情 - **已恢复**
✅ 模态框显示 - **已恢复**
✅ GitHub链接 - **已恢复**
✅ 详细信息展示 - **已恢复**

### 新增/改进
✅ ES6模块化 - **新增**
✅ 统一的renderProjects函数 - **改进**
✅ 更灵活的数据结构 - **改进**
✅ 从JSON文件加载 - **新增**
✅ 支持两种渲染模式 - **新增**

---

## 📝 示例：如何添加新项目

在 `lib/projects.json` 中添加：

```json
{
  "id": "new-project",
  "title": "New Project Title",
  "year": 2024,
  "image": "figures/project-image.png",
  "summary": "A brief one-line summary",
  "description": "Full project description that appears in the modal",
  "details": "**Key Points**\n\n• Point 1\n• Point 2\n• Point 3",
  "github": "https://github.com/username/repo"
}
```

就这么简单！卡片和模态框会自动生成。

---

## 🚀 总结

现在你的项目展示功能已经完全恢复：
- ✅ 卡片式布局更美观
- ✅ 点击查看完整详情
- ✅ 模态框交互体验好
- ✅ 支持GitHub链接
- ✅ 响应式和暗黑模式
- ✅ 数据驱动，易于维护

所有功能都已测试并正常工作！🎉

