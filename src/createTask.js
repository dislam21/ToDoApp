import { format }  from "date-fns";
import { renderProjectSection, resetProjectSection } from "./newProject";

const tasksContainer = document.querySelector(".tasks");
const newTaskContainer = document.querySelector(".new-task-container");

// render task section structure and form functionality
const renderTaskSection = (() => {
    const newTaskBtn = document.querySelector(".new-task-button");
    const cancelNewTask = document.querySelector(".cancel-new-task");

    const taskForm = document.querySelector(".new-task-form")
    taskForm.style.display = "none";

    newTaskBtn.addEventListener("click", () => {
        newTaskBtn.style.display = "none";
        taskForm.style.display = "flex";
        cancelNewTask.style.display = "block";
        newTaskContainer.style.height = "760px";
    })

    cancelNewTask.addEventListener("click", () => {
        newTaskContainer.style.height = "70px";
        cancelNewTask.style.display = "none";
        newTaskBtn.style.display = "block";
        taskForm.style.display = "none";
    })

    return {
        taskForm,
        cancelNewTask,
        newTaskBtn
    }
})();

let taskList = [
    {
        title: "clean room",
        project: "Personal",
        priority: "low",
        importance: "low",
        date: "2022-12-21",
        description: "pick up clothes and vacuum",
        firstAction: "pick up 1 shirt",
        complete: false
    },

    {
        title: "workout",
        project: "Fitness",
        priority: "low",
        importance: "low",
        date: "2022-08-03",
        description: "Do weight training and cardio for 60 mins total",
        firstAction: "Drive to the Gym",
        complete: false
    }
];

console.log(taskList)

const addTasktoStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

const getTasks = JSON.parse(localStorage.getItem("tasks"));
taskList = getTasks

const renderTasks = (() => {

    taskList.forEach((task, i) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-container");
        taskCard.setAttribute("data-index", i);
        tasksContainer.insertBefore(taskCard, newTaskContainer);

        const taskCardPreview = document.createElement("div");
        const taskCardLeft = document.createElement("div");
        const taskCardRight = document.createElement("div");
        taskCardPreview.classList.add("task-card-preview");
        taskCardLeft.classList.add("task-card-left");
        taskCardRight.classList.add("task-card-right");
        taskCard.appendChild(taskCardPreview);
        taskCardPreview.appendChild(taskCardLeft);
        taskCardPreview.appendChild(taskCardRight);

        const taskTitle = document.createElement("div");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = task.title;
        taskCardLeft.appendChild(taskTitle);

        const taskProject = document.createElement("div");
        taskProject.classList.add("task-project");
        taskProject.textContent = task.project;
        taskCardLeft.appendChild(taskProject);

        const taskDate = document.createElement("div");
        taskDate.classList.add("task-date");
        const dateObject = new Date(task.date);
        const dateformated = format(dateObject, "MMM-do");
        taskDate.textContent = dateformated;
        taskCardRight.appendChild(taskDate);

        const taskCardExpanded = document.createElement("div");
        taskCardExpanded.classList.add("task-card-expanded");

        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = task.description;
        taskCardExpanded.appendChild(taskDescription);

        const taskFirstAction = document.createElement("div");
        taskFirstAction.classList.add("task-first-action");
        taskFirstAction.textContent = `First Action: ${task.firstAction}`;
        taskCardExpanded.appendChild(taskFirstAction);

        const taskPriority = document.createElement("div");
        taskPriority.classList.add("task-priority");
        taskPriority.textContent = `Priority: ${task.priority}`;
        taskCardExpanded.appendChild(taskPriority);

        const taskImportance = document.createElement("div");
        taskImportance.classList.add("task-importance");
        taskImportance.textContent = `Importance: ${task.importance}`;
        taskCardExpanded.appendChild(taskImportance);

        taskCardRight.textContent = "Status";
        const taskComplete = document.createElement("input");
        taskComplete.classList.add("task-complete");
        taskComplete.setAttribute("type", "checkbox");
        taskCardRight.appendChild(taskComplete);

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.textContent = "Remove"
        removeTaskBtn.classList.add("remove-task");
        taskCardRight.appendChild(removeTaskBtn);
        
        taskComplete.addEventListener("change", (e) => {
            if (e.target.checked) {
              taskCard.classList.remove("task-container");
              taskCard.classList.add("completed");
              taskTitle.style.textDecoration = "line-through 4px";
            } else {
              taskCard.classList.add("task-container");
              taskCard.classList.remove("completed");
              taskTitle.style.textDecoration = "none";
            }
          });

        taskCard.addEventListener("mouseenter", () => {
            if (task)
            taskCard.style.height = "110px";
            taskCard.style.boxShadow = "2px 2px 2px 0.5px";
            taskCard.appendChild(taskCardExpanded);
        });

        taskCard.addEventListener("mouseleave", () => {
            taskCard.style.height = "70px";
            taskCard.style.boxShadow = "none";
            taskCard.removeChild(taskCardExpanded);
        });

        removeTaskBtn.addEventListener("click", (e) => {
            // eslint-disable-next-line
            taskManager.removeTask(e, taskList);
        });
    });
});


const taskManager = (() => {

    // eslint-disable-next-line arrow-body-style
    const createTask = (title, project, priority, importance, date, description, firstAction, complete=false) => {
        return {
            title,
            project,
            priority,
            importance,
            date,
            description,
            firstAction,
            complete
        }
    }
    
    const addNewTask = (e) => {
        e.preventDefault()

        const taskTitle = (document.querySelector("#title")).value;
        const taskProject = (document.querySelector("#project")).value;
        const taskPriority = (document.querySelector("#priority")).value;
        const taskImportance = (document.querySelector("#importance")).value;
        const taskDate = (document.querySelector("#date")).value;
        const taskDescription = (document.querySelector("#description")).value;
        const taskFirstAction = (document.querySelector("#firstAction")).value;

        const newTask = createTask(taskTitle, taskProject, taskPriority, taskImportance, taskDate, taskDescription, taskFirstAction);
        taskList.push(newTask);

        const taskCards = document.querySelectorAll(".task-container");
        taskCards.forEach(taskCard => tasksContainer.removeChild(taskCard));
        addTasktoStorage()
        renderTasks();
        newTaskContainer.style.height = "70px";
        renderTaskSection.cancelNewTask.style.display = "none";
        renderTaskSection.newTaskBtn.style.display = "block";
        renderTaskSection.taskForm.style.display = "none";

        console.log(taskList)
    }

    const removeTask = (e) => {
        const taskCards = document.querySelectorAll(".task-container");
        taskCards.forEach(taskCard => tasksContainer.removeChild(taskCard));
        const element = e.target;
        const i = element.parentElement.parentElement.parentElement.dataset.index;
        taskList.splice(i, 1);
        addTasktoStorage();
        renderTasks();
        resetProjectSection();
        renderProjectSection();
    }

    console.log("task manager is working");

    return {
        createTask,
        addNewTask,
        removeTask
    }

})();

// eslint-disable-next-line import/prefer-default-export
export { renderTasks, renderTaskSection, taskManager }