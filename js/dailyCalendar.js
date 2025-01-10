let currentDate = new Date();
const options = { year: "numeric", month: "long", day: "numeric" }; //display format
const dayDisplay = document.getElementById("dayDisplay");

//sync with tdy or redirect date from month/year
if(sessionStorage.getItem("storageRedirectDate")) {
    currentDate = new Date(`${sessionStorage.getItem("storageRedirectDate")} 16:00:00`);
    dayDisplay.textContent = sessionStorage.getItem("storageRedirectDate");
    sessionStorage.removeItem("storageRedirectDate")
} else {
    currentDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000); //convert utc to malaysia time
    dayDisplay.textContent = currentDate.toLocaleDateString(undefined, options);
}

// Sample tasks (you can replace this with tasks from your data source)
const tasks = [
    { date: "2025-01-11", time: "09:00", description: "Team Meeting" },
    { date: "2025-01-11", time: "09:00", description: "Client Call" },
    { date: "2025-01-11", time: "13:00", description: "Lunch Break" },
    { date: "2025-01-11", time: "15:00", description: "Project Review" },
];

// Function to generate the timeline
function generateTimeline(dayTasks) {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = ""; // Clear any existing content

    for (let hour = 0; hour < 24; hour++) {
        const formattedHour = `${hour.toString().padStart(2, "0")}:00`;
        const tasksForHour = dayTasks.filter(t => t.time.startsWith(formattedHour));
    
        // Create time slot
        const timeSlot = document.createElement("div");
        timeSlot.className = "time-slot";
    
        const hourLabel = document.createElement("span");
        hourLabel.className = "hour";
        hourLabel.textContent = formattedHour;
        timeSlot.appendChild(hourLabel);
    
        tasksForHour.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.textContent = task.description;
            timeSlot.appendChild(taskDiv);
        });
    
        timeline.appendChild(timeSlot);
    }
}

function changeDay(offset) {
    currentDate.setDate(currentDate.getDate() + offset);
    dayDisplay.textContent = currentDate.toLocaleDateString(undefined, options);

    // Clear and regenerate the timeline for the new date
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayTasks = tasks.filter(t => t.date === formattedDate); // Filter tasks by current date
    generateTimeline(dayTasks); // Pass filtered tasks to the timeline
}

document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskTime = prompt("Enter task time (HH:MM, 24-hour format):");
    const taskDescription = prompt("Enter task description:");
    const taskDate = currentDate.toISOString().split("T")[0];

    if (taskTime && taskDescription) {
        tasks.push({ date: taskDate, time: taskTime, description: taskDescription });
        const dayTasks = tasks.filter(t => t.date === taskDate);
        generateTimeline(dayTasks);
    } else {
        alert("Both time and description are required!");
    }
});

//drop down bar
document.querySelector(".iconBorder").addEventListener("click",displayDropdown);
function displayDropdown() {
    document.querySelector(".profileDropDown").classList.toggle("showProfileDropDown");
    document.querySelector(".email").innerHTML = `Email => ${localStorage.getItem("user")}`
    document.querySelector(".iconBorder").classList.toggle("profileSelecting");
    document.querySelector(".mediumBar").classList.toggle("hideMediumBar");
}

document.querySelector(".logout").addEventListener("click",logOut);
function logOut() {
    localStorage.removeItem("user");
    window.location.href = "main.html";
}
//--------------------
// Initialize the timeline for the current date
const formattedDate = currentDate.toISOString().split("T")[0];
console.log(currentDate.toISOString().split("T"));
const dayTasks = tasks.filter(t => t.date === formattedDate);
generateTimeline(dayTasks);
