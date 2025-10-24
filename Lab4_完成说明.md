# Lab 4 完成说明

## ✅ 所有任务已完成

### Step 1: Projects页面数据驱动渲染 ✅
- ✅ 创建 `lib/projects.json`（12个项目）
- ✅ 在 `global.js` 实现 `fetchJSON()` 和 `renderProjects()`
- ✅ 创建 `projects/projects.js` 动态加载所有项目
- ✅ 自动计算并显示项目数量

### Step 2: 首页显示最新3个项目 ✅
- ✅ 创建 `index.js` 获取前3个项目
- ✅ 在 `index.html` 添加 `.projects` 容器
- ✅ 使用 `slice(0, 3)` 获取最新3个
- ✅ 动态渲染到首页

### Step 3: GitHub API 集成 ✅
- ✅ 实现 `fetchGitHubData()` 函数
- ✅ 从 `https://api.github.com/users/VivianChencwy` 获取数据
- ✅ 显示4个统计：Public Repos、Gists、Followers、Following
- ✅ 使用 `<dl>` 标签和Grid布局展示

### Step 4: 准备项目数据 ✅
- ✅ 12个项目，每个都有 `year` 字段
- ✅ 年份多样化：2022, 2023, 2024
- ✅ 包含真实GitHub项目：
  - RRT Motion Planner (RRT_arm_Planner)
  - Micro Vibration Robot (Micro_Vibration_Robot)
  - Fynthesizer
- ✅ 为所有项目撰写了详细描述

### 额外修复：图片路径问题 ✅
- ✅ 更新 `renderProjects()` 自动处理相对路径
- ✅ 首页：使用 `figures/xxx.png`
- ✅ Projects页面：使用 `../figures/xxx.png`
- ✅ 外部URL（http/https）在所有页面都正常工作

---

## 📁 关键文件

### 新增文件
1. **lib/projects.json** - 12个项目数据（包含year字段）
2. **index.js** - 首页逻辑（最新3个项目 + GitHub统计）
3. **projects/projects.js** - 项目页面逻辑（所有12个项目）

### 修改文件
1. **global.js** - 添加导出函数：
   - `fetchJSON(url)` - 获取JSON数据
   - `renderProjects(...)` - 动态渲染项目（修复图片路径）
   - `fetchGitHubData(username)` - 获取GitHub数据

2. **index.html** - 添加：
   - Latest Projects 部分
   - GitHub Profile Stats 部分
   - `index.js` 脚本引用

3. **projects/index.html** - 简化为动态加载

---

## 🎯 功能演示

### 首页（index.html）
1. **Latest Projects** - 显示最新3个项目
   - 标题、图片、描述
   - 自动从JSON加载
   
2. **GitHub Profile Stats** - 实时统计数据
   - Public Repos: 你的公开仓库数
   - Public Gists: Gists数量
   - Followers: 关注者数
   - Following: 正在关注数

### 项目页面（projects/index.html）
1. **所有项目** - 显示全部12个项目
2. **项目计数** - "Showing 12 projects"
3. **控制台日志** - "Total projects: 12"

---

## 🔧 技术实现

### ES6 模块
```javascript
// global.js
export async function fetchJSON(url) { ... }
export function renderProjects(...) { ... }
export async function fetchGitHubData(username) { ... }

// index.js
import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';
```

### 图片路径自动处理
```javascript
const isInSubfolder = location.pathname.includes('/projects/');
let imageSrc = project.image;
if (imageSrc && !imageSrc.startsWith('http')) {
  imageSrc = isInSubfolder ? `../${imageSrc}` : imageSrc;
}
```

### 获取最新3个项目
```javascript
const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);
renderProjects(latestProjects, container, 'h2');
```

---

## 🧪 测试方法

### 启动本地服务器
```bash
python -m http.server 8000
```

### 测试首页
1. 访问 `http://localhost:8000`
2. 查看 "Latest Projects" 显示3个项目
3. 查看 "GitHub Profile Stats" 显示4个统计
4. 打开控制台（F12）查看数据加载日志
5. 切换暗黑模式验证样式

### 测试项目页面
1. 访问 `http://localhost:8000/projects/`
2. 查看所有12个项目
3. 验证 "Showing 12 projects" 显示
4. 查看控制台输出 "Total projects: 12"
5. 验证所有图片正确加载（带../前缀）

### 测试API
1. 打开Network标签
2. 刷新页面
3. 查看对 `projects.json` 的请求
4. 查看对 GitHub API 的请求
5. 验证两个请求都返回200状态码

---

## 📊 项目数据分布

### 年份分布
- **2024年**: 5个项目
- **2023年**: 5个项目
- **2022年**: 2个项目

### 真实GitHub项目
1. **RRT Motion Planner** (2023) - 来自 RRT_arm_Planner 仓库
2. **Micro Vibration Robot** (2022) - 来自 Micro_Vibration_Robot 仓库
3. **Fynthesizer** (2023) - 来自 Fynthesizer 仓库

### 其他项目
基于你的研究方向和技能添加的相关项目：
- STA-TCN Neural Decoder
- Robotic Catheter System
- Automated Analog IC Layout System
- EEG Cross-Subject Recognition Framework
- 等等

---

## ✨ 功能亮点

1. **模块化架构** - 使用ES6 modules，代码可重用
2. **异步数据加载** - async/await处理数据获取
3. **智能路径处理** - 自动适配不同页面的图片路径
4. **实时API集成** - 从GitHub获取最新统计数据
5. **响应式设计** - 移动端友好的布局
6. **暗黑模式** - 所有新功能完全支持暗黑主题

---

## 🎬 录制视频要点

### 时间分配（60秒）
- 0-20秒：首页功能（3个项目 + GitHub统计 + 控制台）
- 20-35秒：项目页面（12个项目 + 计数）
- 35-45秒：暗黑模式切换
- 45-60秒：学习心得 + Think About It问答

### 必须展示
1. ✅ 首页最新3个项目
2. ✅ GitHub统计数据
3. ✅ 项目页面所有12个项目
4. ✅ 项目计数功能
5. ✅ 控制台日志
6. ✅ 暗黑模式兼容性

### 回答问题
**最有趣的学习**：使用ES6模块和async/await构建模块化数据获取架构

**Think About It问题**：为什么需要type="module"？
- 启用ES6 import/export语法
- 脚本自动延迟执行
- 提供模块作用域隔离

---

## 🎉 总结

所有Lab 4要求已完成：
- ✅ Step 1: Projects页面数据驱动
- ✅ Step 2: 首页显示最新3个项目
- ✅ Step 3: GitHub API集成
- ✅ Step 4: 12个项目数据准备
- ✅ 图片路径修复
- ✅ 真实GitHub项目描述

准备录制视频并提交！🚀

