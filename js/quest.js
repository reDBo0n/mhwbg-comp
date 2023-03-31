const quests = document.getElementById("quests");

function fill_quests() {
	fetch("../data/items.json")
		.then((response) => response.json())
		.then((json) => {
			create_list(json.quests, quests);
		})
}

function create_list(data, div) {
	if(localStorage.getItem("started") !== "true") {
		quests.appendChild(document.createTextNode("Please start your campaign first"));
		return;
	}

	data.forEach((item) => {
		const label = document.createElement("label");
		label.setAttribute("for", item.id);

		const buttons = document.createElement("div");
		
		const sub_button = document.createElement("button");
		sub_button.setAttribute("onclick", `add_day('${item.id}')`);
		sub_button.innerText = "-";
		sub_button.className = "calc";

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
		add_button.setAttribute("onclick", `sub_day('${item.id}')`);
		add_button.innerText = "+";
		add_button.className = "calc";

		buttons.appendChild(sub_button);
		buttons.appendChild(text);
		buttons.appendChild(add_button);

		const type = document.createElement("img");
		type.src = "../data/icons/" + item.type + ".png";
		type.width = 20;
		type.height = 20;

		label.appendChild(type);

		if(item.icon !== undefined) {
			const icon = document.createElement("img");
			icon.src = "../data/icons/" + item.icon + ".png";
			icon.width = 20;
			icon.height = 20;

			label.appendChild(icon);
		}

		label.appendChild(document.createTextNode(item.name));
		label.appendChild(buttons);
		div.appendChild(label);
	});

	const label = document.createElement("label");
	label.setAttribute("for", "downtime");

	const buttons = document.createElement("div");
		
	const sub_button = document.createElement("button");
	sub_button.setAttribute("onclick", `add_day('downtime')`);
	sub_button.innerText = "-";
	sub_button.className = "calc";

	const text = document.createElement("span");
	text.setAttribute("name", "downtime");
	text.setAttribute("id", "downtime");
	content = localStorage.getItem("downtime");
	if(content === null) {
		text.innerText = "0";
	}else{
		text.innerText = content;
	}
		
	const add_button = document.createElement("button");
	add_button.setAttribute("onclick", `sub_day('downtime', Number.MAX_SAFE_INTEGER)`);
	add_button.innerText = "+";
	add_button.className = "calc";

	buttons.appendChild(sub_button);
	buttons.appendChild(text);
	buttons.appendChild(add_button);

	label.appendChild(document.createTextNode("Downtime Activities"));
	label.appendChild(buttons)
	div.appendChild(label);
}

function sub_day(form_name, max=4) {
	const tmp = Number(localStorage.getItem(form_name));
	if(tmp < max) {
		localStorage.setItem("days", Number(localStorage.getItem("days"))-1);
		add_one(form_name);
	}
}

function add_day(form_name) {
	const tmp = Number(localStorage.getItem(form_name));
	if(tmp > 0) {
		localStorage.setItem("days", Number(localStorage.getItem("days"))+1);
		sub_one(form_name);
	}
}

fill_quests();