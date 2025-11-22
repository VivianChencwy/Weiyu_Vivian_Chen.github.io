const tooltip = d3.select('#tooltip');
const overviewStats = document.getElementById('overview-stats');
const distinctStats = document.getElementById('distinct-stats');
const languageSummary = document.getElementById('language-summary');
const extremeStats = document.getElementById('extreme-stats');
const selectionCount = document.getElementById('selection-count');
const languageBreakdown = document.getElementById('language-breakdown');
let commits = [];
let xScale;
let yScale;
let dots;
let commitProgress = 100;
let commitMaxTime;
let timeScale;
let filteredCommits = [];
let plot;
let radiusScale;
let brushGroup;
let dotsGroup;
let filesData = [];
const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const repoUrl = 'https://github.com/VivianChencwy/Weiyu_Vivian_Chen.github.io';
d3.csv('loc.csv', parseRow).then(rows => {
  if (!rows.length) {
    return;
  }
  commits = buildCommits(rows);
  
  // Set up time scale for filtering
  timeScale = d3
    .scaleTime()
    .domain([
      d3.min(commits, (d) => d.datetime),
      d3.max(commits, (d) => d.datetime),
    ])
    .range([0, 100]);
  commitMaxTime = timeScale.invert(commitProgress);
  filteredCommits = commits.filter((d) => d.datetime <= commitMaxTime);
  
  renderSummary(rows, commits);
  renderScatter(commits);
  
  // Initialize commit slider
  const slider = document.getElementById('commit-progress');
  if (slider) {
    slider.addEventListener('input', onTimeSliderChange);
  }
  onTimeSliderChange();
  
  // Render file unit visualization
  renderFileUnitViz(rows);
  
  // Initialize files slider AFTER rendering files
  const filesSlider = document.getElementById('files-progress');
  if (filesSlider) {
    filesSlider.addEventListener('input', onFilesSliderChange);
    console.log('Files slider initialized');
  }
  // Initialize the files display
  onFilesSliderChange();
  
  // Generate commit narrative text for scrollytelling
  generateCommitNarrative();
  generateFileNarrative();
  
  // Set up Scrollama
  setupScrollama();
});
function parseRow(row) {
  const datetime = new Date(row.datetime);
  const length = Number(row.length) || 0;
  return {
    file: row.file,
    line: Number(row.line) || 0,
    type: row.type,
    commit: row.commit,
    author: row.author,
    datetime,
    length
  };
}
function buildCommits(rows) {
  const map = new Map();
  rows.forEach(row => {
    if (!row.commit) {
      return;
    }
    let entry = map.get(row.commit);
    if (!entry) {
      const date = row.datetime;
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      entry = {
        id: row.commit,
        author: row.author,
        datetime: date,
        dayName: weekdayNames[date.getDay()],
        hourFrac: hour + minute / 60 + second / 3600,
        lines: [],
        totalLength: 0,
        files: new Set()
      };
      map.set(row.commit, entry);
    }
    entry.lines.push({ type: row.type, file: row.file, length: row.length });
    entry.totalLength += row.length;
    entry.files.add(row.file);
  });
  return Array.from(map.values())
    .map(entry => ({
      id: entry.id,
      author: entry.author,
      datetime: entry.datetime,
      dayName: entry.dayName,
      hourFrac: entry.hourFrac,
      lineCount: entry.lines.length,
      totalLines: entry.lines.length,
      lengthSum: entry.totalLength,
      fileCount: entry.files.size,
      lines: entry.lines,
      url: `${repoUrl}/commit/${entry.id}`
    }))
    .sort((a, b) => d3.ascending(a.datetime, b.datetime));
}
function renderSummary(rows, commitsData) {
  const totalLines = rows.length;
  const totalCharacters = d3.sum(rows, d => d.length);
  const totalCommits = commitsData.length;
  const totalFiles = new Set(rows.map(d => d.file)).size;
  overviewStats.innerHTML = `
    <dt>Lines Tracked</dt>
    <dd>${totalLines.toLocaleString()}</dd>
    <dt>Characters</dt>
    <dd>${totalCharacters.toLocaleString()}</dd>
    <dt>Commits</dt>
    <dd>${totalCommits.toLocaleString()}</dd>
    <dt>Files</dt>
    <dd>${totalFiles.toLocaleString()}</dd>
  `;
  const distinctAuthors = new Set(commitsData.map(d => d.author)).size;
  const distinctTypes = new Set(rows.map(d => d.type)).size;
  const distinctCommits = commitsData.length;
  distinctStats.innerHTML = `
    <dt>Authors</dt>
    <dd>${distinctAuthors.toLocaleString()}</dd>
    <dt>Languages</dt>
    <dd>${distinctTypes.toLocaleString()}</dd>
    <dt>Active Commits</dt>
    <dd>${distinctCommits.toLocaleString()}</dd>
  `;
  const languageTotals = Array.from(d3.rollups(rows, v => v.length, d => d.type))
    .sort((a, b) => d3.descending(a[1], b[1]));
  languageSummary.innerHTML = languageTotals
    .map(([type, count]) => `<li><span class="stat-label">${type}</span><span class="stat-value">${count.toLocaleString()}</span></li>`)
    .join('');
  const earliest = commitsData[0];
  const latest = commitsData[commitsData.length - 1];
  const largest = d3.greatest(commitsData, d => d.lineCount);
  extremeStats.innerHTML = `
    <dt>Earliest</dt>
    <dd>${formatDateTime(earliest.datetime)} · ${earliest.author}</dd>
    <dt>Latest</dt>
    <dd>${formatDateTime(latest.datetime)} · ${latest.author}</dd>
    <dt>Largest Commit</dt>
    <dd>${largest.lineCount.toLocaleString()} lines · ${largest.author}</dd>
  `;
}
function renderScatter(commitsData) {
  const svg = d3.select('#commit-scatter');
  const width = 960;
  const height = 520;
  const margin = { top: 60, right: 40, bottom: 70, left: 150 };
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  plot = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  xScale = d3.scaleLinear().domain([0, 24]).range([0, innerWidth]);
  const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  yScale = d3.scalePoint().domain(weekdayOrder).range([0, innerHeight]).padding(0.5);
  const grid = plot.append('g').attr('class', 'grid-lines');
  grid.call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(''));
  grid.selectAll('line').attr('stroke', '#d6d3f0');
  grid.selectAll('path').remove();
  const xAxis = d3.axisBottom(xScale).tickValues([0, 4, 8, 12, 16, 20, 24]).tickFormat(formatHourLabel);
  const yAxis = d3.axisLeft(yScale);
  plot.append('g').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
  plot.append('g').call(yAxis);
  plot.append('text')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight + 50)
    .attr('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .text('Time of Day');
  plot.append('text')
    .attr('x', -innerHeight / 2)
    .attr('y', -110)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .text('Day of Week');
  brushGroup = plot.append('g').attr('class', 'brush');
  dotsGroup = plot.append('g').attr('class', 'dots');
  radiusScale = d3.scaleSqrt()
    .domain([1, d3.max(commitsData, d => d.lineCount)])
    .range([4, 24]);
  dots = dotsGroup.selectAll('circle')
    .data(commitsData, d => d.id)
    .join('circle')
    .attr('cx', d => xScale(d.hourFrac))
    .attr('cy', d => yScale(d.dayName))
    .attr('r', d => radiusScale(d.lineCount))
    .attr('class', 'dot')
    .on('mouseenter', onMouseEnter)
    .on('mousemove', onMouseMove)
    .on('mouseleave', onMouseLeave);
  const brush = d3.brush()
    .extent([[0, 0], [innerWidth, innerHeight]])
    .on('start brush end', brushed);
  brushGroup.call(brush);
  
  // Store brush reference for later
  window.commitBrush = brush;
}

function updateScatterPlot(commitsData) {
  // Update the dots with filtered data
  dots = dotsGroup.selectAll('circle')
    .data(commitsData, d => d.id)
    .join(
      enter => enter.append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.hourFrac))
        .attr('cy', d => yScale(d.dayName))
        .attr('r', 0)
        .style('opacity', 0)
        .on('mouseenter', onMouseEnter)
        .on('mousemove', onMouseMove)
        .on('mouseleave', onMouseLeave)
        .call(enter => enter.transition()
          .duration(300)
          .attr('r', d => radiusScale(d.lineCount))
          .style('opacity', null)),
      update => update
        .on('mouseenter', onMouseEnter)
        .on('mousemove', onMouseMove)
        .on('mouseleave', onMouseLeave),
      exit => exit.transition()
        .duration(300)
        .attr('r', 0)
        .style('opacity', 0)
        .remove()
    )
    .call(update => update.transition()
      .duration(300)
      .attr('cx', d => xScale(d.hourFrac))
      .attr('cy', d => yScale(d.dayName))
      .attr('r', d => radiusScale(d.lineCount))
      .style('opacity', null));
}
function onMouseEnter(event, commit) {
  tooltip.classed('hidden', false);
  tooltip.html(buildTooltipContent(commit));
  d3.select(this).raise().classed('hovered', true);
}
function onMouseMove(event) {
  tooltip
    .style('left', `${event.pageX + 16}px`)
    .style('top', `${event.pageY + 16}px`);
}
function onMouseLeave() {
  tooltip.classed('hidden', true);
  d3.select(this).classed('hovered', false);
}
function brushed(event) {
  const selection = event.selection;
  dots.classed('selected', commit => isCommitSelected(selection, commit));
  const selectedCommits = selection ? filteredCommits.filter(commit => isCommitSelected(selection, commit)) : [];
  renderSelectionCount(selectedCommits);
  renderLanguageBreakdown(selectedCommits);
}
function isCommitSelected(selection, commit) {
  if (!selection) {
    return false;
  }
  const [[x0, y0], [x1, y1]] = selection;
  const x = xScale(commit.hourFrac);
  const y = yScale(commit.dayName);
  return x >= x0 && x <= x1 && y >= y0 && y <= y1;
}
function renderSelectionCount(selectedCommits) {
  if (!selectedCommits.length) {
    selectionCount.textContent = 'No commits selected';
    return;
  }
  selectionCount.textContent = `${selectedCommits.length.toLocaleString()} commits selected`;
}
function renderLanguageBreakdown(selectedCommits) {
  if (!selectedCommits.length) {
    languageBreakdown.innerHTML = '';
    return;
  }
  const lines = selectedCommits.flatMap(commit => commit.lines);
  const totals = Array.from(d3.rollups(lines, v => v.length, d => d.type))
    .sort((a, b) => d3.descending(a[1], b[1]));
  const formatter = d3.format('.1~%');
  const totalLines = lines.length;
  languageBreakdown.innerHTML = totals
    .map(([type, count]) => `<dt>${type}</dt><dd>${count.toLocaleString()} lines (${formatter(count / totalLines)})</dd>`)
    .join('');
}
function formatHourLabel(hour) {
  const wrapped = hour === 24 ? 0 : hour;
  const suffix = wrapped >= 12 ? 'pm' : 'am';
  const base = wrapped % 12 === 0 ? 12 : wrapped % 12;
  return `${base}${suffix}`;
}
function formatDateTime(date) {
  return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}
function buildTooltipContent(commit) {
  const date = formatDateTime(commit.datetime);
  return `<strong>${commit.author}</strong><br>${date}<br>${commit.lineCount.toLocaleString()} lines · ${commit.fileCount.toLocaleString()} files`;
}

function onTimeSliderChange() {
  const slider = document.getElementById('commit-progress');
  const timeDisplay = document.getElementById('commit-time');
  
  if (slider && timeDisplay && timeScale) {
    const rawValue = Number.isNaN(slider.valueAsNumber) ? Number(slider.value) : slider.valueAsNumber;
    const clampedValue = Math.min(Math.max(rawValue, 0), 100);
    if (Number(slider.value) !== clampedValue) {
      slider.value = clampedValue;
    }
    commitProgress = clampedValue;
    commitMaxTime = timeScale.invert(commitProgress);
    filteredCommits = commits.filter((d) => d.datetime <= commitMaxTime);
    if (!filteredCommits.length && commits.length) {
      filteredCommits = [commits[0]];
    }
    
    timeDisplay.textContent = commitMaxTime.toLocaleString('en', {
      dateStyle: 'long',
      timeStyle: 'short'
    });
    timeDisplay.setAttribute('datetime', commitMaxTime.toISOString());
    
    updateScatterPlot(filteredCommits);
    // Note: We removed updateFileVisualization() here so files slider works independently
  }
}

// This function is no longer used - files are now controlled by their own slider

function onFilesSliderChange() {
  const slider = document.getElementById('files-progress');
  const timeDisplay = document.getElementById('files-time');
  
  console.log('onFilesSliderChange called', slider, timeDisplay, timeScale);
  
  if (!slider || !timeDisplay || !timeScale) {
    console.warn('Missing elements:', { slider: !!slider, timeDisplay: !!timeDisplay, timeScale: !!timeScale });
    return;
  }
  
  const rawValue = Number.isNaN(slider.valueAsNumber) ? Number(slider.value) : slider.valueAsNumber;
  const clampedValue = Math.min(Math.max(rawValue, 0), 100);
  if (Number(slider.value) !== clampedValue) {
    slider.value = clampedValue;
  }
  const filesProgress = clampedValue;
  const filesMaxTime = timeScale.invert(filesProgress);
  let filesFilteredCommits = commits.filter((d) => d.datetime <= filesMaxTime);
  
  if (!filesFilteredCommits.length && commits.length) {
    filesFilteredCommits = [commits[0]];
  }
  
  console.log('Files filtered commits:', filesFilteredCommits.length);
  
  timeDisplay.textContent = filesMaxTime.toLocaleString('en', {
    dateStyle: 'long',
    timeStyle: 'short'
  });
  timeDisplay.setAttribute('datetime', filesMaxTime.toISOString());
  
  // Update file visualization based on files slider
  const filteredLines = filesFilteredCommits.flatMap(commit => commit.lines);
  const filteredFilesData = d3
    .groups(filteredLines, (d) => d.file)
    .map(([name, lines]) => {
      return { name, lines };
    })
    .sort((a, b) => b.lines.length - a.lines.length);
  
  console.log('Filtered files data:', filteredFilesData.length);
  
  const filesContainer = d3.select('#files');
  if (!filesContainer.node()) {
    console.warn('Files container not found');
    return;
  }
  
  const markup = filteredFilesData
    .map(file => {
      const escapedName = escapeHTML(file.name);
      const dots = file.lines
        .map((line, idx) => {
          const color = colors(line.type);
          return `<span class="loc" style="--color:${color}" data-line-index="${idx}"></span>`;
        })
        .join('');
      const safeName = escapeHTML(file.name);
      return `<dt data-file="${escapedName}">${safeName}</dt><dd data-file="${escapedName}">${dots}</dd>`;
    })
    .join('');
  
  filesContainer.html(markup);
  console.log('Files visualization updated');
}

function renderFileUnitViz(rows) {
  filesData = d3
    .groups(rows, (d) => d.file)
    .map(([name, lines]) => {
      return { name, lines };
    })
    .sort((a, b) => b.lines.length - a.lines.length);
  
  const filesContainer = d3.select('#files');
  if (!filesContainer.node()) {
    return;
  }
  
  const markup = filesData
    .map(file => {
      const escapedName = escapeHTML(file.name);
      const dots = file.lines
        .map((line, idx) => {
          const color = colors(line.type);
          return `<span class="loc" style="--color:${color}" data-line-index="${idx}"></span>`;
        })
        .join('');
      const safeName = escapeHTML(file.name);
      return `<dt data-file="${escapedName}">${safeName}</dt><dd data-file="${escapedName}">${dots}</dd>`;
    })
    .join('');
  
  filesContainer.html(markup);
}

const colors = d3.scaleOrdinal(d3.schemeTableau10);

function generateCommitNarrative() {
  d3.select('#scatter-story')
    .selectAll('.step')
    .data(commits)
    .join('div')
    .attr('class', 'step commit-step')
    .html(
      (d, i) => `
        On ${d.datetime.toLocaleString('en', {
          dateStyle: 'full',
          timeStyle: 'short',
        })},
        I made <a href="${d.url}" target="_blank">${
          i > 0 ? 'another glorious commit' : 'my first commit, and it was glorious'
        }</a>.
        I edited ${d.totalLines} lines across ${
          d3.rollups(
            d.lines,
            (D) => D.length,
            (d) => d.file,
          ).length
        } files.
        Then I looked over all I had made, and I saw that it was very good.
      `,
    );
}

function generateFileNarrative() {
  const filesStory = d3.select('#files-story');
  if (!filesStory.node()) {
    return;
  }

  const topFiles = filesData.slice(0, 10);
  filesStory
    .selectAll('.file-step')
    .data(topFiles, d => d.name)
    .join('div')
    .attr('class', 'step file-step')
    .html(d => {
      const lineCount = d.lines.length.toLocaleString();
      const typeSummary = summarizeFileTechnologies(d.lines);
      return `
        <h3>${d.name}</h3>
        <p>${lineCount} lines of code make this file one of the heaviest hitters in the repo.</p>
        <p>${typeSummary}</p>
      `;
    });
}

function onCommitStepEnter(response) {
  const commit = response.element.__data__;
  if (commit && commit.datetime) {
    commitMaxTime = commit.datetime;
    commitProgress = timeScale(commitMaxTime);
    filteredCommits = commits.filter((d) => d.datetime <= commitMaxTime);
    updateScatterPlot(filteredCommits);
    
    // Update slider and time display
    const slider = document.getElementById('commit-progress');
    const timeDisplay = document.getElementById('commit-time');
    if (slider) slider.value = commitProgress.toFixed(1);
    if (timeDisplay) {
      timeDisplay.textContent = commitMaxTime.toLocaleString('en', {
        dateStyle: 'long',
        timeStyle: 'short'
      });
      timeDisplay.setAttribute('datetime', commitMaxTime.toISOString());
    }
  }
}

function setupScrollama() {
  import('https://cdn.jsdelivr.net/npm/[email protected]/+esm').then(module => {
    const scrollama = module.default;
    const commitScroller = scrollama();
    commitScroller
      .setup({
        container: '#scrolly-1',
        step: '#scrolly-1 .commit-step',
      })
      .onStepEnter(onCommitStepEnter);

    if (document.querySelector('#scrolly-2 .file-step')) {
      const fileScroller = scrollama();
      fileScroller
        .setup({
          container: '#scrolly-2',
          step: '#scrolly-2 .file-step',
        })
        .onStepEnter(onFileStepEnter);
    }
  });
}

function onFileStepEnter(response) {
  const file = response.element.__data__;
  if (!file) {
    return;
  }
  highlightFileEntry(file.name);
}

function highlightFileEntry(fileName) {
  if (!fileName) {
    return;
  }
  const filesDl = d3.select('#files');
  if (!filesDl.node()) {
    return;
  }
  const escaped = escapeForSelector(fileName);
  d3.selectAll('#files dt, #files dd').classed('file-active', false);
  d3.selectAll(`#files dt[data-file="${escaped}"], #files dd[data-file="${escaped}"]`).classed('file-active', true);
  const target = document.querySelector(`#files dt[data-file="${escaped}"]`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function summarizeFileTechnologies(lines) {
  if (!lines || !lines.length) {
    return 'This file mostly contains whitespace tweaks.';
  }
  const totals = Array.from(d3.rollups(lines, v => v.length, d => d.type))
    .sort((a, b) => d3.descending(a[1], b[1]));
  const totalLines = lines.length;
  const [primaryType, primaryCount] = totals[0] || ['code', totalLines];
  const formatPercent = d3.format('.0%');
  const primaryShare = formatPercent(primaryCount / totalLines);
  const secondary = totals[1]
    ? `${totals[1][0]} follows with ${formatPercent(totals[1][1] / totalLines)} of the lines.`
    : 'Everything else makes up the remaining lines.';
  return `${primaryType} dominates (${primaryShare}) of the content. ${secondary}`;
}

function escapeHTML(value) {
  if (typeof value !== 'string') {
    return value;
  }
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeForSelector(value) {
  if (typeof value !== 'string') {
    return value;
  }
  if (window.CSS && CSS.escape) {
    return CSS.escape(value);
  }
  return value.replace(/([!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g, '\\$1');
}

