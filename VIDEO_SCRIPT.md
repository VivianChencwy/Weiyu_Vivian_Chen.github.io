# Lab 5 Video Script

**Duration: 1 minute maximum**

---

## Segment 1: Visualization Presentation (15 seconds)

"Hi! This is my Lab 5 submission for DSC 106. Here's my interactive pie chart visualization of projects by year."

[Show the webpage with pie chart and legend clearly visible]

"The pie chart displays the distribution of my projects across different years, with each year represented by a different color. The legend shows the year and count for each segment."

---

## Segment 2: Interactive Demonstration (25 seconds)

"Let me demonstrate the interactive features."

[Show hover effect on pie chart]
"When I hover over a wedge, the other wedges fade out to highlight the hovered section."

[Click on a pie wedge]
"Clicking on a pie slice filters the projects to show only those from that year. Notice the selected wedge changes color to indicate it's active."

[Show search functionality]
"Now let me search for 'robotics' in the search bar."
[Type in search]
"The pie chart updates reactively to show only projects matching the search term, and the project list filters accordingly."

[Click legend item]
"You can also click on legend items to filter by year."

---

## Segment 3: Bug Explanation (15 seconds)

"However, there's a bug: you can't combine search and pie slice filtering at the same time. If I search for something and then click a pie slice, the search filter is lost and only the year filter is applied."

[Demonstrate the bug: search for something like "robotics", then click a pie slice]

"The bug occurs because: (1) When you search, the search handler on line 156 calls `renderPieChart(filteredProjects)` which recreates the pie chart with new indices based on filtered data. (2) When you then click a pie slice, the click handler on line 80-83 sets `selectedIndex` and calls `filterByYear()`. (3) In `filterByYear()` on line 143, it tries to get the selected year from `arcData[selectedIndex].data.year`, but this depends on the pie chart having been rendered correctly with the right data. (4) More critically, the search handler resets `selectedIndex` to -1 on line 161, which is correct, but the real issue is that when the pie chart is re-rendered after search, if you then click it, the `arcData` stored might not align correctly with the search query state."

---

## Segment 4: Code Locations & Fix (5 seconds)

"To fix this, I would need to: (1) Store the selected year value separately (not just the index) to avoid index mismatches when the pie chart is re-rendered. (2) Modify `filterByYear()` around lines 133-148 to ensure it always checks the current search query value AND preserves it when filtering by year. (3) Update the search handler around line 161 to preserve the selected year (if any) instead of always resetting to -1, or update `filterByYear()` to work with year values directly rather than indices."

---

## Segment 5: Most Interesting Learning (Remaining time, ~5 seconds)

"The most interesting thing I learned is how D3's data binding and selection API allows for declarative visualization updates. The way `d3.rollup` groups data and `d3.pie` generates arc geometry automatically handles the mathematical complexity, letting me focus on the interactive behavior."

---

## Key Points to Highlight:

1. **Visualization**: Pie chart with legend showing project distribution by year
2. **Interactions**: 
   - Hover effects on wedges
   - Click to filter by year
   - Search functionality
   - Legend interaction
3. **Bug Explanation**: Search and year filters don't combine because handlers reset each other's state
4. **Code Locations**: 
   - Search handler: line 156
   - Pie click handler: line 80-83
   - `filterByYear()` function: lines 133-148
5. **Learning**: D3's declarative data binding and automatic geometry generation

## Tips for Recording:

- Show clear cursor movements
- Pause briefly after each interaction to show the result
- Speak clearly and at a moderate pace
- Make sure the pie chart and legend are clearly visible
- Test the interactions before recording to ensure they work smoothly

