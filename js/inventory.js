const commons = document.getElementById("commons");
const others = document.getElementById("others");
const monsters = document.getElementById("monsters");

function fill_inventory() {
	fetch("../data/items.json")
		.then((response) => response.json())
		.then((json) => {
			create_list(json.commons, commons);
			create_list(json.others, others);
			create_list(json.monsters, monsters);
		});
}

function create_list(data, div) {
	data.forEach((item) => {
		const label = document.createElement("label");
		label.setAttribute("for", item.id);

		const buttons = document.createElement("div");
		
		const sub_button = document.createElement("button");
		sub_button.setAttribute("onclick", `sub_day('${item.id}')`);
		sub_button.innerText = "-";

		const text = document.createElement("span");
		text.setAttribute("name", item.id);
		text.setAttribute("id", item.id);
		content = localStorage.getItem(item.id);
		if(content === null) {
			text.innerText = "0";
		}else{
			text.innerText = content;
		}
		
		const add_button = document.createElement("button");
		add_button.setAttribute("onclick", `add_day('${item.id}')`);
		add_button.innerText = "+";

		buttons.appendChild(sub_button);
		buttons.appendChild(text);
		buttons.appendChild(add_button);

		const type = document.createElement("img");
		type.src = "../data/icons/" + item.type + ".png";
		type.width = 20;
		type.height = 20;

		label.appendChild(buttons);
		label.appendChild(type);

		if(item.icon !== undefined) {
			const icon = document.createElement("img");
			icon.src = "../data/icons/" + item.icon + ".png";
			icon.width = 20;
			icon.height = 20;

			label.appendChild(icon);
		}

		label.appendChild(document.createTextNode(item.name));
		div.appendChild(label);
	});
}

fill_inventory();