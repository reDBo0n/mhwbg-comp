const armor = document.getElementById("armor");

function fill_armory() {
	fetch("../data/items.json")
		.then((response) => response.json())
		.then((json) => {
			create_armor(json.armor);
		});
}

function save_box(field_id) {
	const field = document.getElementById(field_id);
	localStorage.setItem(field_id, field.checked);
}

function create_armor(data) {
	data.forEach((item) => {
		const label = document.createElement("label");
		label.setAttribute("for", item.id);

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = item.id;
		if(item.default) {
			checkbox.disabled = true;
			checkbox.checked = true;
		}
		saved = localStorage.getItem(item.id);
		if(saved !== null) {
			checkbox.checked = saved;
		}
		checkbox.setAttribute("onclick", `save_box('${item.id}')`);

		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(item.name));
		armor.appendChild(label);
	});
}

fill_armory();