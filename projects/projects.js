import { fetchJSON, renderProjects, setupProjectModal } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('#projects-list') || document.querySelector('.projects');
const searchInput = document.getElementById('project-search');

let selectedIndex = -1;
let selectedYear = null;
let currentProjects = projects;

const colors = d3.scaleOrdinal(d3.schemeCategory10);

function setQuery(query) {
  if (!query || query.trim() === '') {
    return projects;
  }
  
  const lowerQuery = query.toLowerCase();
  return projects.filter(project => {
    const title = (project.title || '').toLowerCase();
    const description = (project.description || '').toLowerCase();
    const summary = (project.summary || '').toLowerCase();
    const details = (project.details || '').toLowerCase();
    
    return title.includes(lowerQuery) ||
           description.includes(lowerQuery) ||
           summary.includes(lowerQuery) ||
           details.includes(lowerQuery);
  });
}

function renderPieChart(filteredProjects) {
  const svg = d3.select('#projects-pie-plot');
  svg.selectAll('path').remove();
  
  const rolledData = d3.rollup(
    filteredProjects,
    (v) => v.length,
    (d) => d.year
  );
  
  const pieData = Array.from(rolledData, ([year, count]) => ({
    year: year,
    count: count
  }));
  
  if (pieData.length === 0) {
    return;
  }
  
  const pie = d3.pie()
    .value((d) => d.count)
    .sort(null);
  
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(50);
  
  const arcData = pie(pieData);
  
  arcData.forEach((arcDatum, i) => {
    svg
      .append('path')
      .attr('d', arc(arcDatum))
      .attr('fill', colors(i))
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .style('--color', colors(i))
      .on('click', () => {
        const year = arcDatum.data.year;
        selectedYear = selectedYear === year ? null : year;
        selectedIndex = selectedYear == null ? -1 : i;
        updateSelection();
        filterByYear();
      });
  });
  
  updateLegend(pieData);
  
  svg.datum(arcData);
}

function updateLegend(pieData) {
  const legend = d3.select('#projects-legend');
  legend.selectAll('li').remove();
  
  pieData.forEach((d, i) => {
    const li = legend
      .append('li')
      .style('--color', colors(i))
      .on('click', () => {
        selectedYear = selectedYear === d.year ? null : d.year;
        selectedIndex = selectedYear == null ? -1 : i;
        updateSelection();
        filterByYear();
      });
    
    li.append('span')
      .attr('class', 'legend-swatch');
    
    li.append('span')
      .attr('class', 'legend-label')
      .text(`${d.year}: ${d.count}`);
  });
}

function updateSelection() {
  const svg = d3.select('#projects-pie-plot');
  const legend = d3.select('#projects-legend');
  
  svg.selectAll('path')
    .attr('class', (d) => (selectedYear != null && d.data.year === selectedYear ? 'selected' : ''));
  
  legend.selectAll('li')
    .attr('class', (_, idx) => (selectedYear != null && idx === selectedIndex ? 'selected' : ''));
}

function filterByYear() {
  const svg = d3.select('#projects-pie-plot');
  const arcData = svg.datum();

  const baseProjects = setQuery(searchInput.value);
  currentProjects = selectedYear == null
    ? baseProjects
    : baseProjects.filter(p => p.year === selectedYear);

  renderProjects(currentProjects, projectsContainer, true);
}

renderProjects(projects, projectsContainer, true);
renderPieChart(projects);
setupProjectModal();

searchInput.addEventListener('input', (event) => {
  const filteredProjects = setQuery(event.target.value);
  currentProjects = filteredProjects;

  // Preserve selectedYear; recompute selectedIndex against new pie data
  renderProjects(
    selectedYear == null ? filteredProjects : filteredProjects.filter(p => p.year === selectedYear),
    projectsContainer,
    true
  );
  renderPieChart(filteredProjects);

  // After re-render, attempt to restore selection class based on selectedYear
  if (selectedYear != null) {
    const svg = d3.select('#projects-pie-plot');
    const arcData = svg.datum() || [];
    const i = Array.isArray(arcData) ? arcData.findIndex(a => a.data.year === selectedYear) : -1;
    selectedIndex = i;
    updateSelection();
  } else {
    selectedIndex = -1;
    updateSelection();
  }
});
