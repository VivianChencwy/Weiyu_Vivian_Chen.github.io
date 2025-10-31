import { fetchJSON, renderProjects, setupProjectModal } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');
const searchInput = document.getElementById('project-search');

let selectedIndex = -1;
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
        selectedIndex = selectedIndex === i ? -1 : i;
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
        selectedIndex = selectedIndex === i ? -1 : i;
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
    .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));
  
  legend.selectAll('li')
    .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));
}

function filterByYear() {
  const svg = d3.select('#projects-pie-plot');
  const arcData = svg.datum();
  
  if (selectedIndex === -1) {
    currentProjects = setQuery(searchInput.value);
    renderProjects(currentProjects, projectsContainer, true);
  } else {
    const selectedYear = arcData[selectedIndex].data.year;
    const searchFiltered = setQuery(searchInput.value);
    currentProjects = searchFiltered.filter(p => p.year === selectedYear);
    renderProjects(currentProjects, projectsContainer, true);
  }
}

renderProjects(projects, projectsContainer, true);
renderPieChart(projects);
setupProjectModal();

searchInput.addEventListener('input', (event) => {
  const filteredProjects = setQuery(event.target.value);
  currentProjects = filteredProjects;
  
  selectedIndex = -1;
  updateSelection();
  
  renderProjects(filteredProjects, projectsContainer, true);
  renderPieChart(filteredProjects);
});
