const projectSection = document.querySelector(".projects");

// eslint-disable-next-line no-unused-vars
const renderProjectSection = (projects) => {
    const getfromStorage = JSON.parse(localStorage.getItem("tasks"));

    const projectArray = [];
    for (let i=0; i<getfromStorage.length; i+=1) {
        projectArray.push(getfromStorage[i].project)
    }
    console.log(projectArray);

    const projectList = new Set (projectArray);
    
    projectList.forEach((project) => {
        const projectLabel = document.createElement("li");
        projectLabel.classList.add("project-label");
        projectLabel.textContent = project;
        projectSection.appendChild(projectLabel);
    });
    // console.log(projectList)
};

const resetProjectSection = () => {
    const projectListElement = document.querySelectorAll(".project-label")
    projectListElement.forEach(project => projectSection.removeChild(project));
}

// eslint-disable-next-line import/prefer-default-export
export { renderProjectSection, resetProjectSection }