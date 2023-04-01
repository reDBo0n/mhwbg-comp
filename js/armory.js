const armor = document.getElementById("armor");
const bow = document.getElementById("bow");
const charge_blade = document.getElementById("charge-blade");
const dual_blades = document.getElementById("dual-blades");
const great_sword = document.getElementById("great-sword");
const gunlance = document.getElementById("gunlance");
const hammer = document.getElementById("hammer");
const heavy_bowgun = document.getElementById("heavy-bowgun");
const hunting_horn = document.getElementById("hunting-horn");
const insect_glaive = document.getElementById("insect-glaive");
const lance = document.getElementById("lance");
const light_bowgun = document.getElementById("light-bowgun");
const long_sword = document.getElementById("long-sword");
const switch_axe = document.getElementById("switch-axe");
const sword_shield = document.getElementById("sword-shield");

function fill_armory() {
	fetch("../data/items.json")
		.then((response) => response.json())
		.then((json) => {
			create_list(json.armor, armor);
			create_list(json.bow, bow);
			create_list(json.charge_blade, charge_blade);
			create_list(json.dual_blades, dual_blades);
			create_list(json.great_sword, great_sword);
			create_list(json.gunlance, gunlance);
			create_list(json.hammer, hammer);
			create_list(json.heavy_bowgun, heavy_bowgun);
			create_list(json.hunting_horn, hunting_horn);
			create_list(json.insect_glaive, insect_glaive);
			create_list(json.lance, lance);
			create_list(json.light_bowgun, light_bowgun);
			create_list(json.long_sword, long_sword);
			create_list(json.switch_axe, switch_axe);
			create_list(json.sword_shield, sword_shield);
		});
}

function save_box(field_id) {
	const field = document.getElementById(field_id);
	localStorage.setItem(field_id, field.checked);
}

function create_list(data, div) {
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
		if(saved === "true") {
			checkbox.checked = true;
		}
		checkbox.setAttribute("onclick", `save_box('${item.id}')`);

		const tier = document.createElement("img");
		tier.src = "../data/icons/" + item.tier + ".png";
		tier.width = 20;
		tier.height = 20;

		const icon = document.createElement("img");
		icon.src = "../data/icons/" + item.icon + ".png";
		icon.width = 20;
		icon.height = 20;

		const icons = document.createElement("div");
		icons.className = "icons";

		label.appendChild(checkbox);
		icons.appendChild(tier);

		if(item.icon === "kushala-daora-teostra") {
			icon.src = "../data/icons/teostra.png";

			const icon2 = document.createElement("img");
			icon2.src = "../data/icons/kushala-daora.png";
			icon2.width = 20;
			icon2.height = 20;

			icons.appendChild(icon2);
		}
		icons.appendChild(icon);
		label.appendChild(icons);

		label.appendChild(document.createTextNode(item.name));
		div.appendChild(label);
	});
}

fill_armory();