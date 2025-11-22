// js/index.js

// Run after the page loads
window.addEventListener("DOMContentLoaded", () => {
  insertFooter();
  insertSkills();
  setupMessageForm();
  loadGitHubRepos();
});

// 1 Insert footer content
function insertFooter() {
  const footerText = document.getElementById("footer-text");
  const currentYear = new Date().getFullYear();
  const name = "Shuntoria Reid";
  footerText.innerHTML = `&copy; ${currentYear} ${name}`;
}

// 2 Insert skills from an array
function insertSkills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Responsive Web Design",
    "Git and GitHub",
    "API Fetch (GitHub, Marvel)",
    "Debugging and Problem Solving",
    "Data Annotation and Labeling",
    "AI Training Tasks",
    "Customer Service and Communication",
    "Entrepreneurship  Major Pressure Plustique",
    "Content Creation and Branding"
  ];

  const skillsList = document.getElementById("skills-list");

  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });
}

// 3 Handle message form logic
function setupMessageForm() {
  const form = document.getElementById("leave-message");
  const messagesSection = document.getElementById("messages");
  const messageList = document.getElementById("message-list");

  // Hide messages section until we have messages
  messagesSection.style.display = "none";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = event.target.name;
    const emailInput = event.target.email;
    const messageInput = event.target.message;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      return;
    }

    // Show messages section when first message is added
    messagesSection.style.display = "block";

    // Create list item for this message
    const newMessage = document.createElement("li");
    newMessage.classList.add("message-item");

    // Name as a mailto link
    const messageHeader = document.createElement("h3");
    const mailLink = document.createElement("a");
    mailLink.href = `mailto:${email}`;
    mailLink.textContent = name;
    messageHeader.appendChild(mailLink);

    // Message text
    const messageText = document.createElement("p");
    messageText.textContent = message;

    // Buttons wrapper
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("message-buttons");

    // Edit button
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.classList.add("btn-secondary");

    editButton.addEventListener("click", () => {
      // Fill form with current data so user can edit
      nameInput.value = name;
      emailInput.value = email;
      messageInput.value = message;
      // Remove old message so they can resubmit updated version
      newMessage.remove();
      toggleMessagesVisibility(messagesSection, messageList);
    });

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn-danger");

    removeButton.addEventListener("click", () => {
      newMessage.remove();
      toggleMessagesVisibility(messagesSection, messageList);
    });

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(removeButton);

    // Build the message item
    newMessage.appendChild(messageHeader);
    newMessage.appendChild(messageText);
    newMessage.appendChild(buttonsDiv);

    messageList.appendChild(newMessage);

    // Reset form
    form.reset();
  });
}

// Show or hide messages section depending on whether there are messages
function toggleMessagesVisibility(messagesSection, messageList) {
  if (messageList.children.length === 0) {
    messagesSection.style.display = "none";
  }
}

// 4 Fetch GitHub repositories
function loadGitHubRepos() {
  const githubUsername = "shanny2022"; // Your GitHub username
  const projectList = document.getElementById("project-list");

  fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then((response) => response.json())
    .then((repos) => {
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.classList.add("project-item");

        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = repo.name;

        const description = document.createElement("p");
        description.textContent = repo.description
          ? repo.description
          : "No description provided yet.";

        const meta = document.createElement("p");
        const createdDate = new Date(repo.created_at).toLocaleDateString();
        meta.classList.add("project-meta");
        meta.textContent = `Created on ${createdDate}`;

        li.appendChild(link);
        li.appendChild(description);
        li.appendChild(meta);

        projectList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading GitHub repos", error);
      const li = document.createElement("li");
      li.textContent = "Unable to load repositories right now.";
      projectList.appendChild(li);
    });
}

