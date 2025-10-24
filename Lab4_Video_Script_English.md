# Lab 4 Video Demonstration Script (60 seconds)

## 🎬 Recording Requirements
- **Format**: MP4
- **Duration**: 1 minute or less
- **Content**: Present webpage, show JavaScript interactions, share learning + answer Think About It question

---

## 📝 Complete Demo Script (60 seconds)

### Opening (5 seconds) [0:00 - 0:05]
**Camera**: Show homepage with URL visible
**Narration**: 
> "Hi! This is my portfolio website with Lab 4 completed. I'll demonstrate the new dynamic data loading features."

---

### Part 1: Home Page - Latest Projects & GitHub Stats (20 seconds) [0:05 - 0:25]

**[0:05 - 0:10]**
**Action**: Scroll down to "Latest Projects" section
**Narration**:
> "First, the homepage now displays my latest three projects, dynamically loaded from a JSON file."

**[0:10 - 0:15]**
**Action**: Continue scrolling to GitHub Stats section
**Narration**:
> "Below that, you can see my GitHub profile stats - public repos, gists, followers, and following - all fetched in real-time from the GitHub API."

**[0:15 - 0:20]**
**Action**: Open browser console (F12), show console logs
**Narration**:
> "The console shows data is being fetched successfully."

**[0:20 - 0:25]**
**Action**: Highlight one of the projects or stats
**Narration**:
> "All this content is generated dynamically using JavaScript modules and the Fetch API."

---

### Part 2: Projects Page - All Projects (15 seconds) [0:25 - 0:40]

**[0:25 - 0:30]**
**Action**: Click on "Projects" navigation link
**Narration**:
> "On the Projects page, all twelve projects are now rendered dynamically from the same JSON data file."

**[0:30 - 0:35]**
**Action**: Scroll through the projects list
**Narration**:
> "Each project includes a title, year, image, and description. Notice the project count at the top."

**[0:35 - 0:40]**
**Action**: Point to project count text ("Showing 12 projects")
**Narration**:
> "The count is calculated automatically - showing 12 projects total."

---

### Part 3: Dark Mode Compatibility (10 seconds) [0:40 - 0:50]

**[0:40 - 0:45]**
**Action**: Switch theme to Dark mode using the top-right switcher
**Narration**:
> "All the new features work seamlessly with the dark mode from Lab 3."

**[0:45 - 0:50]**
**Action**: Show projects and GitHub stats in dark mode
**Narration**:
> "Projects and GitHub stats both adapt to the dark theme automatically."

---

### Part 4: Learning Reflection + Think About It (10 seconds) [0:50 - 1:00]

**[0:50 - 1:00]**
**Action**: Return to homepage or show final overview
**Narration**:
> "The most interesting thing I learned was how to use ES6 modules with async/await to fetch and render data dynamically. Regarding the 'Think About It' question: we use type='module' because it enables ES6 import/export syntax and ensures scripts are deferred by default, which is essential for our modular architecture."

---

## 💡 Recording Tips

### Preparation
1. **Clear Browser State**:
   - Clear console logs
   - Start in Light mode
   - Close unnecessary tabs
   - Ensure URL is visible

2. **Test Data**:
   - Verify projects.json has 12 projects
   - Confirm GitHub API is accessible
   - Check that all images load properly

3. **Practice Run**:
   - Time yourself (aim for 55-58 seconds)
   - Practice smooth transitions
   - Prepare console view in advance

### Recording Settings
- **Resolution**: 1920x1080 or 1280x720
- **Frame Rate**: 30fps
- **Format**: MP4
- **Audio**: Clear narration (or text captions)

---

## 📋 Pre-Recording Checklist

### Technical Setup
- [ ] Local server running (or GitHub Pages deployed)
- [ ] Browser window maximized
- [ ] Developer console accessible (F12)
- [ ] Internet connection stable (for GitHub API)
- [ ] All 12 projects in projects.json
- [ ] Each project has year field

### Content Verification
- [ ] Homepage shows 3 latest projects
- [ ] GitHub stats display correctly
- [ ] Projects page shows all 12 projects
- [ ] Project count displays "Showing 12 projects"
- [ ] Dark mode works on all sections
- [ ] Console shows successful fetch operations

### Narration Points
- [ ] Introduce the website
- [ ] Explain dynamic project loading
- [ ] Highlight GitHub API integration
- [ ] Show project count feature
- [ ] Demonstrate dark mode compatibility
- [ ] Share most interesting learning
- [ ] Answer Think About It question

---

## 🎯 Key Demonstration Points (Must Include)

According to Lab 4 submission requirements:

### 1. ✅ Present your webpage
- Show homepage with new sections
- Navigate to Projects page
- Display overall layout and design

### 2. ✅ Show JavaScript interactions
- **Dynamic Project Loading**: Latest 3 on home, all 12 on projects page
- **GitHub API Data**: Profile stats with real-time data
- **Project Count**: Automatic calculation and display
- **Console Logs**: Show successful data fetching
- **Module System**: Mention use of ES6 imports

### 3. ✅ Share Learning + Answer Think About It
- **Most Interesting Thing**: ES6 modules with async/await for data fetching
- **Think About It Answer**: "Why do we need type='module'?"
  - Answer: Enables ES6 import/export syntax
  - Scripts are automatically deferred
  - Provides module scope isolation
  - Essential for our modular architecture

---

## 🎨 Visual Cues to Include

### On Homepage:
1. **Latest Projects Section**
   - Show 3 project cards
   - Point to project titles and descriptions
   - Hover over an image

2. **GitHub Stats Section**
   - Point to each stat (repos, gists, followers, following)
   - Show the grid layout
   - Mention real-time data

3. **Console View**
   - "IT'S ALIVE!" message
   - Successful fetch logs
   - Any relevant network activity

### On Projects Page:
1. **Project Count**
   - Highlight "Showing 12 projects" text
   - Scroll through projects list

2. **Project Details**
   - Show variety of years (2022, 2023, 2024)
   - Point to structured data (title, year, description)

### Dark Mode:
1. **Theme Transition**
   - Smooth switch from light to dark
   - Projects adapt colors
   - GitHub stats remain readable

---

## 🎓 Alternative "Think About It" Questions & Answers

If you want to answer different questions from the lab:

### Question 1: "Why do we include 'projects' as a class?"
**Answer**: 
> "We use 'projects' as a class to create a reusable selector that can be targeted from JavaScript. This allows our renderProjects function to find and populate the container regardless of which page we're on - whether it's the homepage showing 3 projects or the projects page showing all 12."

### Question 2: "What does fetchJSON do?"
**Answer**: 
> "fetchJSON is an asynchronous function that retrieves JSON data from a URL. It uses the Fetch API to make HTTP requests, checks if the response is successful, parses the JSON data, and handles any errors. This makes it easy to load data from both local JSON files and external APIs."

### Question 3: "Why do we check if profileStats exists before updating innerHTML?"
**Answer**: 
> "We check if the element exists because not all pages have a profile stats container. Without this check, trying to set innerHTML on null would cause a JavaScript error. This defensive programming ensures our code works correctly across different pages."

### Question 4: "What are the advantages of using template literals?"
**Answer**: 
> "Template literals make it much easier to build HTML strings with dynamic data. They support multi-line strings, automatic variable interpolation with ${}, and improved readability compared to string concatenation. This makes our code cleaner and less error-prone."

---

## 📝 Extended Script (Alternative Version - Focus on Technical Details)

If you want to emphasize technical implementation:

### Technical Deep Dive Version (60 seconds)

**[0:00 - 0:15]** - Homepage Overview
> "My portfolio now uses a modular JavaScript architecture. The homepage fetches data from two sources: a local JSON file for projects and the GitHub API for profile stats. Both use async/await with the Fetch API."

**[0:15 - 0:30]** - Show Console & Network Tab
> "In the console, you can see successful fetch operations. The Network tab shows GET requests to projects.json and the GitHub API endpoint. Both return JSON data that's parsed and rendered dynamically."

**[0:30 - 0:45]** - Projects Page & Code Architecture
> "The Projects page uses the same renderProjects function but displays all 12 items. This code reuse demonstrates the benefits of modular design. The project count is calculated using array.length."

**[0:45 - 1:00]** - Learning & Think About It
> "The most interesting learning was implementing ES6 modules with top-level await. For the Think About It question about type='module': it enables import/export statements, provides module scope, and automatically defers script execution until the DOM is ready."

---

## 🎬 Quick Reference: 60-Second Timeline

| Time | Content | Key Actions |
|------|---------|-------------|
| 0:00-0:05 | Opening | Introduce website |
| 0:05-0:25 | Homepage Features | Show projects + GitHub stats + console |
| 0:25-0:40 | Projects Page | Show all 12 projects + count |
| 0:40-0:50 | Dark Mode | Toggle and show compatibility |
| 0:50-1:00 | Learning + Q&A | Share insight + answer question |

---

## 📤 Post-Recording Checklist

Before submission:
- [ ] Video format is MP4 ✅
- [ ] Video duration ≤ 60 seconds ✅
- [ ] Showed homepage with latest projects ✅
- [ ] Showed GitHub API stats ✅
- [ ] Showed all projects on Projects page ✅
- [ ] Showed project count feature ✅
- [ ] Demonstrated dark mode compatibility ✅
- [ ] Shared most interesting learning ✅
- [ ] Answered a Think About It question ✅
- [ ] Audio is clear (if included) ✅
- [ ] Video quality is good ✅

---

## 🌟 Submission Components

Remember to include ALL of these in your Lab 4 submission:

1. **GitHub Repo Link**: Your repository URL
2. **Website Link**: GitHub Pages or live site URL
3. **Video (MP4)**: 1 minute demonstration
4. **In Video**:
   - Present webpage
   - Show all JavaScript modifications
   - Share most interesting learning
   - Answer one Think About It question

---

## 💡 Pro Tips for a Great Video

### Do's:
- ✅ Speak clearly and at a moderate pace
- ✅ Show cursor movements to guide attention
- ✅ Zoom in on important details if needed
- ✅ Test audio levels before final recording
- ✅ Have good lighting on screen content
- ✅ Practice timing to stay under 60 seconds

### Don'ts:
- ❌ Don't rush through content
- ❌ Don't spend too long on one section
- ❌ Don't forget to show console/network activity
- ❌ Don't skip the learning reflection
- ❌ Don't exceed 60 seconds (will cause deduction!)
- ❌ Don't use formats other than MP4

---

## 🎬 Alternative Shorter Script (45 seconds)

If you want a more concise version:

**[0:00-0:10]** - Show website, point to theme switcher
**[0:10-0:20]** - Switch to Dark mode, show transformation
**[0:20-0:30]** - Refresh page, show persistence
**[0:30-0:40]** - Click navigation links, show auto-highlighting
**[0:40-0:45]** - Return to homepage, conclude

---

## 📝 Final Notes

**Most Important Points to Communicate:**
1. Projects are loaded **dynamically** from JSON
2. GitHub data is fetched from a **live API**
3. Code uses **ES6 modules** for organization
4. Features work in **both light and dark mode**
5. **Modular design** allows code reuse

**Most Interesting Learning (Sample Answers):**
- "Learning to structure asynchronous data fetching with ES6 modules"
- "Understanding how the Fetch API works with both local and remote data"
- "Implementing template literals for dynamic HTML generation"
- "Using async/await for cleaner asynchronous code"
- "Building a modular architecture that scales across multiple pages"

Good luck with your recording! 🎉
