const day_selector = document.getElementById("day-selector");
const selected_days = document.getElementById("selected-days");

function start_campaign() {
	if(localStorage.getItem("days") === null) {
		localStorage.setItem("days", 25);
	}
	localStorage.setItem("started", "true");

	location.reload();
}

function check_started() {
	if(localStorage.getItem("started") !== null) {
		day_selector.style.display = "none";
		selected_days.style.display = "";
		
	}
}

check_started();