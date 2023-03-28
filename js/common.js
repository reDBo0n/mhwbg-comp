const items = document.querySelectorAll("*[name]");

function add_one(field_id, max_value=0) {
	const field = document.getElementById(field_id);
	curr_value = Number(field.innerText);

	curr_value += 1;
	if(max_value > 0 && curr_value > max_value) {
		curr_value = max_value;
	}

	field.innerText = curr_value;
	localStorage.setItem(field_id, curr_value);
}

function sub_one(field_id) {
	const field = document.getElementById(field_id);
	curr_value = Number(field.innerText);

	curr_value -= 1;
	if(curr_value < 0){
		curr_value = 0;
	}

	field.innerText = curr_value;
	localStorage.setItem(field_id, curr_value);
}

function load_data() {
	items.forEach((item) => {
		value = localStorage.getItem(item.id);
		if(value !== null) {
			item.innerText = value;
		}
	});
}

function reset_data() {
	localStorage.clear();
	if(window.location.pathname !== "/index.html") {
		location.assign("../index.html");
	}else{
		location.reload();
	}
}

load_data();