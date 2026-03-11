const promptOutput = document.getElementById("promptOutput");

const promptResponses = {
  "Explain this project structure":
    "Example: Walk through the repo, explain the moving parts, and point out where to start editing.",
  "Find and fix the bug":
    "Example: Reproduce the issue, inspect the code path, patch the root cause, and verify the fix.",
  "Write the README better":
    "Example: Rewrite the documentation so a new contributor can understand setup, workflow, and purpose quickly.",
  "Build a landing page":
    "Example: Create a polished page with strong layout, clear messaging, and responsive styling."
};

document.querySelectorAll(".prompt-chip").forEach((button) => {
  button.addEventListener("click", () => {
    promptOutput.textContent = promptResponses[button.textContent] ?? "Tell me the task and I'll turn it into action.";
  });
});