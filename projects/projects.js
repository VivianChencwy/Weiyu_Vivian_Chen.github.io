import { fetchJSON, renderProjects, setupProjectModal } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

if (projectsContainer) {
  renderProjects(projects, projectsContainer, true);
  
  const projectCount = projects.length;
  console.log(`Total projects: ${projectCount}`);
  
  const countElement = document.createElement('p');
  countElement.className = 'project-count';
  countElement.textContent = `Showing ${projectCount} projects`;
  projectsContainer.parentElement.insertBefore(countElement, projectsContainer);
  
  setupProjectModal();
}

