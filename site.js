const ul = document.querySelector("ul");
const search = document.querySelector("#txtSearch");
const taskForm = document.querySelector("#taskForm");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const txtInput = document.querySelector("#txtInput");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const taskList = document.querySelector("#task-list");
const btnUpdateTask = document.querySelector("#btnUpdateTask");
const badge = document.querySelector("#badge");
const toastTrigger = document.getElementById("btnAddNewTask");
const toastLiveExample = document.getElementById("liveToast");

let updateIndex;
let updatedText = "";
let modeUpdate = false;
let liCollection = [];
let liArray = [];
liCollection = document.querySelectorAll("li");
liArray = Array.from(liCollection);
badge.textContent = liArray.length.toString();
let index = liArray.length;

eventListeners();

function eventListeners() {
	btnAddNewTask.addEventListener("click", addNewTask);
	btnDeleteAll.addEventListener("click", deleteAll);
	taskList.addEventListener("click", deleteUpdateItem);
	btnUpdateTask.addEventListener("click", updateValue);
	search.addEventListener("keyup", filterElement);
}

function addNewTask(e) {
	e.preventDefault();

	if (txtInput.value.trim().length == 0) {
		const toastBootstrap =
			bootstrap.Toast.getOrCreateInstance(toastLiveExample);
		txtInput.value.trim() === "" && toastBootstrap.show();
		txtInput.value = "";
		return;
	}
	if (modeUpdate) {
		updateValue();
	} else {
		const li = document.createElement("li");
		li.classList =
			index % 2 == 1
				? "list-group-item d-flex align-items-center fs-5"
				: "list-group-item list-group-item-dark d-flex align-items-center fs-5";
		li.appendChild(document.createTextNode(txtInput.value));

		const a = document.createElement("a");
		a.classList = "btn btn-sm float-end";
		a.setAttribute("href", "#");

		a.innerHTML =
			"<i class='bi bi-pencil-square fs-5 text-warning'> </i><i class='bi bi-x-circle fs-5 text-danger'></i>";
		li.appendChild(a);

		taskList.appendChild(li);
		txtInput.value = "";
		index++;
		liCollection = document.querySelectorAll("li");
		liArray = Array.from(liCollection);
		badge.textContent = liArray.length.toString();
	}
}

function deleteAll() {
	const taskCount = document.querySelector("#task-list .bi-x-circle");
	if (taskList.length != 0 && confirm("Are you sure?")) taskList.innerHTML = "";
	liCollection = document.querySelectorAll("li");
	liArray = Array.from(liCollection);
	badge.textContent = liArray.length.toString();
}

function deleteUpdateItem(e) {
	if (e.target.className === "bi bi-x-circle fs-5 text-danger") {
		e.target.parentElement.parentElement.remove();
	} else if (e.target.className === "bi bi-pencil-square fs-5 text-warning") {
		txtInput.value = e.target.parentElement.parentElement.textContent.trim();
		btnUpdateTask.classList.remove("d-none");
		btnUpdateTask.classList.add("d-block");
		btnAddNewTask.classList.remove("d-block");
		btnAddNewTask.classList.add("d-none");
		modeUpdate = true;
		liCollection = document.querySelectorAll("li");
		liArray = Array.from(liCollection);
		liArray.forEach((item, index) => {
			if (item.textContent === e.target.parentElement.parentElement.textContent)
				updateIndex = index;
		});
	}
	liCollection = document.querySelectorAll("li");
	liArray = Array.from(liCollection);
	badge.textContent = liArray.length.toString();
}

function updateValue() {
	liArray.forEach((item, index) => {
		if (index == updateIndex) {
			item.textContent = txtInput.value;
			const a = document.createElement("a");
			a.classList = "btn btn-sm float-end";
			a.setAttribute("href", "#");

			a.innerHTML =
				"<i class='bi bi-pencil-square fs-5 text-warning'> </i><i class='bi bi-x-circle fs-5 text-danger'></i>";
			item.appendChild(a);
		}
	});

	modeUpdate = false;
	txtInput.value = "";
	btnAddNewTask.classList.remove("d-none");
	btnAddNewTask.classList.add("d-block");
	btnUpdateTask.classList.remove("d-block");
	btnUpdateTask.classList.add("d-none");
}

const filterFunc = (filterValue) => {
	Array.from(ul.children)
		.filter((todo) => !todo.textContent.toLowerCase().includes(filterValue))
		.forEach((todo) => todo.classList.add("filtered"));

	Array.from(ul.children)
		.filter((todo) => todo.textContent.toLowerCase().includes(filterValue))
		.forEach((todo) => todo.classList.remove("filtered"));
};

function filterElement() {
	const filterValue = search.value.trim().toLowerCase();
	filterFunc(filterValue);
}
