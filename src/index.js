import { renderTasks, renderTaskSection, taskManager } from "./createTask"
import { renderProjectSection, resetProjectSection } from "./newProject";

const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks(taskList);

renderProjectSection();

renderTaskSection.taskForm.addEventListener("submit", e => {
    taskManager.addNewTask(e)
    renderTaskSection.taskForm.reset();
    resetProjectSection();
    renderProjectSection();
});

console.log(taskList);