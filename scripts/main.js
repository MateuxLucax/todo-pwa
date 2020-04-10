const toggleSwitch = document.querySelector(
	'.theme-switch input[type="checkbox"]'
);

const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);

	if (currentTheme === "dark") {
		document
			.querySelector('meta[name="theme-color"]')
			.setAttribute("content", "#000");
		toggleSwitch.checked = true;
	}
}

function switchTheme(element) {
	if (element.target.checked) {
		document
			.querySelector('meta[name="theme-color"]')
			.setAttribute("content", "#000");
		document.documentElement.setAttribute("data-theme", "dark");
		localStorage.setItem("theme", "dark");
	} else {
		document
			.querySelector('meta[name="theme-color"]')
			.setAttribute("content", "#FFF");
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");
	}
}

toggleSwitch.addEventListener("change", switchTheme, false);
