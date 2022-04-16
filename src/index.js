import { renderTasks, renderTaskSection, taskManager } from "./createTask";

const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

renderTaskSection.taskForm.addEventListener("submit", e => {
    taskManager.addNewTask(e)
});

console.log(taskList);