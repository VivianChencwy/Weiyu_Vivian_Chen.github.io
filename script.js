// Data definitions
const researchProjects = [
  {
    id: 'sta-tcn',
    title: 'STA‑TCN: Neural Decoder for Upper Limb Rehabilitation',
    summary: 'Continuous motion prediction using sEMG for cable‑driven exoskeletons.',
    image: 'figures/STA-TCN Neural Decoder for Upper Limb Rehabilitation.png',
    description: `This project focuses on continuous motion prediction for upper‑limb rehabilitation robotics using surface electromyography (sEMG) signals.\n\n` +
                 `A Spatio‑Temporal Attention and lightweight Temporal Convolutional Network (STA‑TCN) architecture was proposed to enable subject‑independent, real‑time estimation of elbow joint angles. ` +
                 `The work enhances motion prediction accuracy for cable‑driven exoskeletons, laying the groundwork for personalized, home‑based rehabilitation systems.`,
    details: `**Objectives**\n\n` +
             `• Develop a robust, real‑time neural decoding model to estimate elbow joint angles from sEMG signals.\n` +
             `• Eliminate the need for subject‑specific calibration by enhancing cross‑subject generalization.\n` +
             `• Validate the model's feasibility in controlling a cable‑driven upper‑limb rehabilitation exoskeleton.\n\n` +
             `**Role & Duration**\n\n` +
             `Sep 2024 – Apr 2025 — Project leader & first author: led model design, conducted experiments and data analysis, and coordinated the resulting paper submission.`
  },
  {
    id: 'catheter',
    title: 'Robotic Catheter System for Cardiac Ablation',
    summary: 'Robot‑assisted catheter ablation system improving precision, safety and feedback.',
    image: 'figures/Robotic Catheter System for Cardiac Ablation.png',
    description: `Development of a robot ablation catheter system for cardiac ablation therapy, aimed at improving the precision, safety and usability of catheter‑based treatments for atrial fibrillation.\n\n` +
                 `The system integrates advanced sensing, actuation and control components to enhance surgeon‑robot interaction during remote procedures.`,
    details: `**Objectives**\n\n` +
             `• Design a robotic system to support remote‑controlled catheter ablation with enhanced precision and feedback.\n` +
             `• Develop two core subsystems: (1) an IMU‑based dynamic pose tracker for real‑time monitoring of C‑arm movement and (2) a motor‑based haptic force feedback system simulating tactile resistance.\n\n` +
             `**Role & Duration**\n\n` +
             `Jul 2024 – Aug 2024 — Core developer for sensing and feedback systems: designed and implemented the IMU pose‑tracking module and built a motor‑based haptic feedback system.`
  },
  {
    id: 'analog-ic',
    title: 'Automated Analog IC Layout System',
    summary: 'Automated layout generation for matched resistors and capacitors.',
    image: 'figures/Automated Analog IC Layout System(1).png',
    description: `This project tackles the problem of device mismatch in analog integrated circuits by developing an automated layout generation system for matched resistors and capacitors.\n\n` +
                 `Process variation can severely degrade circuit performance in precision modules such as differential amplifiers, current mirrors and filters. The proposed system automates the creation of symmetrical layouts, reducing mismatch and improving yield.`,
    details: `**Overview**\n\n` +
             `The automated layout tool produces symmetrical placements and routings for matched components, helping analog designers mitigate mismatch without manual intervention.`
  }
];

const courseProjects = [
  {
    id: 'rrt-motion',
    title: 'RRT Motion Planner',
    summary: 'Rapidly‑exploring random tree motion planner for a manipulator.',
    image: 'figures/RRT Motion Planner.png',
    github: 'https://github.com/VivianChencwy/RRT_Motion_Planner',
    description: `Course project implementing a rapidly‑exploring random tree (RRT) algorithm to plan collision‑free paths for a robotic arm.`,
    details: `**Highlights**\n\n` +
             `Built a motion planner capable of exploring high‑dimensional configuration spaces and generating feasible trajectories for a 6‑DOF manipulator.`
  },
  {
    id: 'fynthesizer',
    title: 'Fynthesizer',
    summary: 'Modular audio synthesizer.',
    image: 'figures/Fynthesizer.jpg',
    github: 'https://github.com/VivianChencwy/Fynthesizer',
    description: `Designed and built a small audio synthesizer as a course project, focusing on modular sound generation and signal processing.`,
    details: `**Features**\n\n` +
             `Implemented oscillators, filters and envelope generators; integrated a microcontroller to sequence and control parameters.`
  },
  {
    id: 'vision-robot',
    title: 'Vision‑Controlled Vibrating Robot',
    summary: 'Vibrating robot controlled via computer vision.',
    image: 'figures/Vision-Controlled Vibrating Robot.png',
    github: 'https://github.com/VivianChencwy/Vision_Controlled_Vibrating_Robot',
    description: `Created a robot that uses computer‑vision feedback to control a vibrating platform for remote exploration and manipulation tasks.`,
    details: `**Project Goals**\n\n` +
             `Developed algorithms to track visual markers and adjust vibration patterns in real time, enabling closed‑loop control.`
  },
  {
    id: 'sim-lan',
    title: 'Sim_LAN',
    summary: 'Local area network simulation project.',
    github: 'https://github.com/VivianChencwy/Sim_LAN',
    description: `Simulated the design and performance of a local area network, analysing throughput, latency and fault tolerance.`,
    details: ''
  },
  {
    id: 'pokesnap',
    title: 'PokeSnap',
    summary: `An intelligent camera application capable of recognising Pokémon`,
    github: 'https://github.com/VivianChencwy/PokeSnap',
    description: `An intelligent camera application capable of recognising Pokémon, utilising computer vision technology to identify and classify Pokémon characters.`,
    details: ''
  },
  {
    id: 'mobile-robot',
    title: 'Mobile Robot Navigation & Control',
    summary: 'Navigation and control algorithms for a mobile robot.',
    github: 'https://github.com/VivianChencwy/Mobile_Robot_Navigation_Control',
    description: `Implemented navigation, mapping and control algorithms for an autonomous mobile robot as part of a course project.`,
    details: ''
  }
];

const skills = {
  programming: [
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'C', icon: 'fas fa-code' },
    { name: 'Matlab', icon: 'fas fa-calculator' },
    { name: 'VHDL', icon: 'fas fa-microchip' }
  ],
  hardware: [
    { name: 'Myo Armband', icon: 'fas fa-hand-paper' },
    { name: 'BNO055 IMU', icon: 'fas fa-compass' },
    { name: 'DC brushless servo motor', icon: 'fas fa-cog' },
    { name: 'IMU sensors', icon: 'fas fa-satellite' }
  ],
  tools: [
    { name: 'PyTorch', icon: 'fas fa-brain' },
    { name: 'Matlab/Simulink', icon: 'fas fa-chart-line' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'Notion', icon: 'fas fa-sticky-note' }
  ]
};

// Helper functions
function createCard(project) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = project.id;
  
  let cardHTML = '';
  
  // Add image if available
  if (project.image) {
    cardHTML += `<div class="card-image"><img src="${project.image}" alt="${project.title}" /></div>`;
  }
  
  cardHTML += `
    <div class="card-content">
      <div class="card-title">${project.title}</div>
      <div class="card-summary">${project.summary}</div>
  `;
  
  // Add GitHub link for course projects
  if (project.github) {
    cardHTML += `<div class="card-github"><a href="${project.github}" target="_blank" onclick="event.stopPropagation()"><i class="fab fa-github"></i> View on GitHub</a></div>`;
  }
  
  cardHTML += `</div>`;
  card.innerHTML = cardHTML;
  
  card.addEventListener('click', () => openModal(project.id, project.github ? 'course' : 'research'));
  return card;
}

function populateProjects() {
  const researchGrid = document.getElementById('researchProjectsGrid');
  const courseGrid = document.getElementById('courseProjectsGrid');
  
  researchProjects.forEach(project => {
    const card = createCard(project);
    researchGrid.appendChild(card);
  });
  
  courseProjects.forEach(project => {
    const card = createCard(project);
    courseGrid.appendChild(card);
  });
}

function populateSkills(category) {
  const list = document.getElementById('skillsList');
  list.innerHTML = '';
  skills[category].forEach(skill => {
    const el = document.createElement('span');
    el.className = 'skill-item';
    el.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
    list.appendChild(el);
  });
}

function openModal(projectId, projectType) {
  let project;
  if (projectType === 'course') {
    project = courseProjects.find(p => p.id === projectId);
  } else {
    project = researchProjects.find(p => p.id === projectId);
  }
  
  if (!project) return;
  
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  const detailsContainer = document.getElementById('modalDetails');
  detailsContainer.innerHTML = '';
  
  // Add GitHub link in modal for course projects
  if (project.github) {
    const githubLink = document.createElement('div');
    githubLink.className = 'modal-github';
    githubLink.innerHTML = `<a href="${project.github}" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>`;
    detailsContainer.appendChild(githubLink);
  }
  
  if (project.details) {
    // Convert markdown‑like line breaks to paragraphs
    project.details.split(/\n\n/).forEach(section => {
      const p = document.createElement('p');
      // replace bullet points with HTML lists where appropriate
      if (section.trim().startsWith('•')) {
        const ul = document.createElement('ul');
        section.split(/\n/).forEach(line => {
          const li = document.createElement('li');
          li.textContent = line.replace(/^•\s*/, '').trim();
          ul.appendChild(li);
        });
        detailsContainer.appendChild(ul);
      } else {
        // bold headings indicated by **Heading**
        const html = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        p.innerHTML = html;
        detailsContainer.appendChild(p);
      }
    });
  }
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function setupModal() {
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('modalClose');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    // Close when clicking outside the content
    if (e.target === modal) closeModal();
  });
}

function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      populateSkills(category);
    });
  });
  // Initialize default category
  populateSkills('programming');
}

// Initialise on DOM load
document.addEventListener('DOMContentLoaded', () => {
  populateProjects();
  setupModal();
  setupTabs();
});