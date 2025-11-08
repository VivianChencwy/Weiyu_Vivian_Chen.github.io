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
const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
d3.csv('loc.csv', parseRow).then(rows => {
  if (!rows.length) {
    return;
  }
  commits = buildCommits(rows);
  renderSummary(rows, commits);
  renderScatter(commits);
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
      lengthSum: entry.totalLength,
      fileCount: entry.files.size,
      lines: entry.lines
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
  const plot = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
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
  const brushGroup = plot.append('g').attr('class', 'brush');
  const dotsGroup = plot.append('g').attr('class', 'dots');
  const radiusScale = d3.scaleSqrt()
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
  const selectedCommits = selection ? commits.filter(commit => isCommitSelected(selection, commit)) : [];
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
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}
function buildTooltipContent(commit) {
  const date = formatDateTime(commit.datetime);
  return `<strong>${commit.author}</strong><br>${date}<br>${commit.lineCount.toLocaleString()} lines · ${commit.fileCount.toLocaleString()} files`;
}

