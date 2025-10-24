console.log('IT\'S ALIVE!');

export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, container, headingLevel = 'h2') {
  container.innerHTML = '';
  
  const isInSubfolder = location.pathname.includes('/projects/') || 
                        location.pathname.includes('/resume/') || 
                        location.pathname.includes('/contact/');
  
  projects.forEach(project => {
    const article = document.createElement('article');
    
    let imageSrc = project.image;
    if (imageSrc && !imageSrc.startsWith('http')) {
      imageSrc = isInSubfolder ? `../${imageSrc}` : imageSrc;
    }
    
    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      ${imageSrc ? `<img src="${imageSrc}" alt="${project.title}" />` : ''}
      <p>${project.description}</p>
    `;
    
    container.appendChild(article);
  });
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
const pages = [
  { url: './', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' }
];

function createNavigation() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  const existingNav = nav.querySelector('.nav-container');
  if (existingNav && existingNav.querySelector('.nav-links')) {
    highlightCurrentPage();
    return;
  }

  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container';

  const navBrand = document.createElement('div');
  navBrand.className = 'nav-brand';
  
  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  const navBrandLink = document.createElement('a');
  navBrandLink.href = ARE_WE_HOME ? './' : '../';
  navBrandLink.textContent = 'Weiyu Chen';
  navBrand.appendChild(navBrandLink);

  const navLinksList = document.createElement('ul');
  navLinksList.className = 'nav-links';

  for (let p of pages) {
    const url = !ARE_WE_HOME ? '../' + p.url : p.url;
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url;
    a.textContent = p.title;

    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
    }

    if (a.host !== location.host) {
      a.target = '_blank';
    }

    li.appendChild(a);
    navLinksList.appendChild(li);
  }

  navContainer.appendChild(navBrand);
  navContainer.appendChild(navLinksList);
  
  nav.innerHTML = '';
  nav.appendChild(navContainer);
}

function highlightCurrentPage() {
  const navLinks = $$('nav a');
  
  navLinks.forEach(link => link.classList.remove('current'));
  
  let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname
  );

  currentLink?.classList.add('current');
}

function setupColorScheme() {
  const switchHTML = `
    <label class="color-scheme">
      Theme:
      <select id="colorSchemeSelect">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `;

  document.body.insertAdjacentHTML('afterbegin', switchHTML);

  const select = document.getElementById('colorSchemeSelect');
  
  function setColorScheme(colorScheme) {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    select.value = colorScheme;
  }

  if ("colorScheme" in localStorage) {
    setColorScheme(localStorage.colorScheme);
  }

  select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    setColorScheme(event.target.value);
    localStorage.colorScheme = event.target.value;
  });
}

function setupContactForm() {
  const form = document.querySelector('.contact-form');
  
  form?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const data = new FormData(form);
    let params = [];
    
    for (let [name, value] of data) {
      if (name !== 'name') {
        params.push(`${name}=${encodeURIComponent(value)}`);
      }
    }
    
    const url = `mailto:vivianchen12210127@gmail.com?${params.join('&')}`;
    location.href = url;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  highlightCurrentPage();
  setupColorScheme();
  setupContactForm();
});

