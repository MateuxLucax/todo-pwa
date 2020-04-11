// STORE TASKS

let tasks = JSON.parse(localStorage.getItem("list_tasks")) || [];

let completeTasks =
	JSON.parse(localStorage.getItem("list_complete_tasks")) || [];

function saveToStorage() {
	localStorage.setItem("list_tasks", JSON.stringify(tasks));
	localStorage.setItem("list_complete_tasks", JSON.stringify(completeTasks));
}

// RENDER TASKS

const listElement = document.querySelector(".list");

function renderTasks() {
	listElement.innerHTML = "";

	// List tasks
	for (task of tasks) {
		let markup = `
		<li class="list__item">
			<label class="list__label">
				<div class="list__check">
					<input type="checkbox" onchange="setTaskComplete(${tasks.indexOf(task)})" />
					<span></span>
				</div>
				<p class="list__text">${task}</p>
				</div>
			</label>
			<div class="list__icon">
				<!-- <svg class="list__bell">
					<use xlink:href="assets/svgs/sprite.svg#bell"></use>
				</svg> -->
			</div>
		</li>`;

		listElement.insertAdjacentHTML("beforeend", markup);
	}

	// List complete tasks
	for (completeTask of completeTasks) {
		let markup = `
		<li class="list__item">
			<label class="list__label">
				<div class="list__check">
					<input type="checkbox" checked onchange="setTask(${completeTasks.indexOf(
						completeTask
					)})">
					<span></span>
				</div>
				<p class="list__text list__text--checked">${completeTask}</p>
				</div>
			</label>
			<a class="list__icon" onclick="removeTask(${completeTasks.indexOf(
				completeTask
			)})">
				<svg class="list__bin">
					<use xlink:href="assets/svgs/sprite.svg#bin"></use>
				</svg>
			</a>
		</li>`;

		listElement.insertAdjacentHTML("beforeend", markup);
	}
}

// ADD TASK

let inputElement = document.querySelector(".input__input");

function addTask() {
	let taskText = inputElement.value;

	if (taskText !== "") {
		tasks.push(taskText);
		inputElement.value = "";
		renderTasks();
		saveToStorage();
		inputElement.focus();
	}
}

// SET COMPLETE TASK
function setTaskComplete(pos) {
	completeTasks.push(tasks[pos]);
	tasks.splice(pos, 1);
	renderTasks();
	saveToStorage();
}

// SET TASK

function setTask(pos) {
	tasks.push(completeTasks[pos]);
	completeTasks.splice(pos, 1);
	renderTasks();
	saveToStorage();
}

// REMOVE TASK

function removeTask(pos) {
	completeTasks.splice(pos, 1);
	renderTasks();
	saveToStorage();
}

// THEME SWITCHER

const toggleSwitch = document.querySelector(
	'.theme-switch input[type="checkbox"]'
);

const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const metaThemeColorIOS = document.querySelector(
	'meta[name="apple-mobile-web-app-status-bar-style"]'
);

const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);

	if (currentTheme === "dark") {
		metaThemeColor.setAttribute("content", "#000");
		metaThemeColorIOS.setAttribute("content", "black");
		toggleSwitch.checked = true;
	}
}

function switchTheme(element) {
	if (element.target.checked) {
		metaThemeColor.setAttribute("content", "#000");
		metaThemeColorIOS.setAttribute("content", "black");
		document.documentElement.setAttribute("data-theme", "dark");
		localStorage.setItem("theme", "dark");
	} else {
		metaThemeColor.setAttribute("content", "#FFF");
		metaThemeColorIOS.setAttribute("content", "white");
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");
	}
}

toggleSwitch.addEventListener("change", switchTheme, false);

// INIT

window.onload = () => {
	renderTasks(), setDocHeight();
};
inputElement.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		document.querySelector(".input__button").click();
	}
});

function setDocHeight() {
	document.documentElement.style.setProperty(
		"--vh",
		`${window.innerHeight / 100}px`
	);
	console.log(window.innerHeight / 100);
}
addEventListener("resize", setDocHeight);
addEventListener("orientationchange", setDocHeight);
