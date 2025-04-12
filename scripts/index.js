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
            <img src="../images/github.png" class="git-link">
          </a>
        </div>
    </h3>
    <p class="projects__description">${project.description}</p>
    `;

    // Append to the appropriate container
    if (project.type === "web") {
      webDevContainer.appendChild(projectItem);
    } else if (project.type === "game") {
      gameDevContainer.appendChild(projectItem);
    }
  });
}

// Execute the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", renderProjects);
