// Import the projects object
import { projects } from "./components.js";

// Function to render projects to the DOM
function renderProjects() {
  const webDevContainer = document.querySelector(
    ".webdev__projects_list-container"
  );
  const gameDevContainer = document.querySelector(
    ".gamedev__projects_list-container"
  );

  // Clear template data
  webDevContainer.innerHTML = "";
  gameDevContainer.innerHTML = "";

  let webDevDelay = 0;
  let gameDevDelay = 0;

  // Loop through projects and add them to the DOM
  Object.entries(projects).forEach(([name, project]) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("projects__item");
    projectItem.setAttribute("tabindex", "0"); // Make the card focusable

    // Add event listener to make the entire card clickable
    projectItem.addEventListener("click", () => {
      window.open(project.link || "#", "_blank");
    });

    // Add keyboard accessibility
    projectItem.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        window.open(project.link || "#", "_blank");
      }
    });

    // Add project details without a clickable title link
    projectItem.innerHTML = `
    <h3 class="projects__name">
        ${name}
        <div class="projects__links">
          <a href="${project.git || "#"}"  class="projects__link"
          onclick= "event.stopPropagation();">
            <img src="./images/github.png" class="git-link">
          </a>
        </div>
    </h3>
    <p class="projects__description">${project.description}</p>
    `;

    // Append to the appropriate container and animate
    if (project.type === "web") {
      webDevContainer.appendChild(projectItem);
      // Staggered animation for web dev cards
      setTimeout(() => {
        projectItem.classList.add("animate-in");
      }, webDevDelay);
      webDevDelay += 150; // 150ms delay between each card
    } else if (project.type === "game") {
      gameDevContainer.appendChild(projectItem);
      // Staggered animation for game dev cards
      setTimeout(() => {
        projectItem.classList.add("animate-in");
      }, gameDevDelay);
      gameDevDelay += 150; // 150ms delay between each card
    }
  });
}

// Function to animate title letters "Jake's Domain"
function animateTitle() {
  const titleElement = document.querySelector('.header__title');
  const titleText = titleElement.textContent;
  titleElement.innerHTML = '';

  let letterCount = 0;

  const baseDelay = 50; // 100ms per letter index
  const randomDelayMax = 100; // 200ms max random delay

  // Split text into letters and spaces
  Array.from(titleText).forEach((char, index) => {
    const span = document.createElement('span');
    
    if (char === ' ') {
      span.classList.add('space');
      span.innerHTML = '&nbsp;';
    } else {
      span.classList.add('letter');
      span.textContent = char;
      letterCount++; // Count actual letters (not spaces)
    }
    
    titleElement.appendChild(span);
    
    // Animate each letter with staggered delay
    if (char !== ' ') {
      setTimeout(() => {
        span.classList.add('animate-in');
      }, index * baseDelay + Math.floor(Math.random() * randomDelayMax)); // 100ms base + 0-200ms random offset
    }
  });

  // Calculate when all letters finish animating
  const totalAnimationTime = (titleText.length - 1) * baseDelay + randomDelayMax + 600; // base delay + max random + animation duration
  
  // Start neon flicker after all letters finish
  setTimeout(() => {
    titleElement.classList.add('flicker');
    
    // After flicker animation ends, keep the glow permanently
    setTimeout(() => {
      titleElement.classList.remove('flicker');
      titleElement.classList.add('neon-glow');
    }, 1000); // flicker duration is 2s
  }, totalAnimationTime);
}

// Execute the functions when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateTitle();
  renderProjects();
});
