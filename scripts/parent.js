var dom = {};
var foldClothes = ["Fold clothes", "April 22, 2018", "A trip to the park!", "Your clean clothes will be in the laundry basket downstairs in the kitchen. Take the basket to your room and fold and put up all your clothes. Be sure to hang up your sundress in the closet."]
var add = false;

Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		dom.root = Util.one(":root");
		dom.settings = Util.one("#settings");

		dom.chorePopup = Util.one("#chorePopup")
		dom.editChorePopup = Util.one("#editChorePopup")
		dom.settingsPopup = Util.one("#settingsPopup")

		dom.incomplete = Util.one("#incomplete")
		dom.checkoff = Util.one("#checkoff")
		dom.rewards = Util.one("#reward")
		dom.parentName = Util.one("#nameText");
		dom.center = Util.one("#center")
		dom.sidebar = Util.one("#sidebar")
		dom.saveChore = Util.one("#newchorePopupSave")

		fillChores();

		// // set color and name defaults
		Util.one("#default").classList.add("colorSelected")
		dom.parentName.value = "Andrew";


		// edit popup for each chore
		var edits = Util.all(".pencil")
		for (let item of edits) {
			item.addEventListener("click",
				function() {
					editChorePopup(item.id);
				});
		}

		// chore popup
		var items = Util.all(".item")
		for (let item of items) {
			item.addEventListener("click",
				function() {
					console.log(item.id)
					regularChorePopup(item.id);
				});
		}

		// edit popup for each chore
		var edits = Util.all(".pencil")
		for (let item of edits) {
			item.addEventListener("click",
				function(event) {
					event.stopPropagation();
					editChorePopup(item.id);
				});
		}

		// don't have to save any info if it's exit
		Util.one("#editExit").addEventListener("click",
			function() {
				dom.editChorePopup.style.display = "none"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
		});

		Util.one("#newButton").addEventListener("click",
			function() {
				newChorePopup();
			});

		var items = Util.all(".checkoffDone")
		for (let item of items) {
			item.addEventListener("click",
				function(event) {
					event.stopPropagation();
					dom.rewards.appendChild(makeReward(chores[item.id].reward));
					this.parentNode.remove();
				});
		}

		var items = Util.all(".rewardsDoneCheckoff")
		for (let item of items) {
			item.addEventListener("click",
				function(event) {
					event.stopPropagation();
					this.parentNode.remove();
				});
		}


		Util.one("#chorePopupClose").addEventListener("click", 
			function() {
				dom.chorePopup.style.display = "none"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
			});

		// Util.one("#newchorePopupClose").addEventListener("click",
		// 	function() {
		// 		dom.newChore.style.display = "none"
		// 		dom.center.style.opacity = "1";
		// 		dom.sidebar.style.opacity = "1";

		// 		add = false;
		// 	});

		// Util.one("#save").addEventListener("click",
		// 	function() {
		// 		dom.newChore.style.visibility = "hidden"
		// 		Util.one("#newchoreText").value = ""
		// 		Util.one("#newdateText").value = ""
		// 		Util.one("#newrewardText").value =""
		// 		Util.one("#newdetailsText").value = ""
		// 		dom.center.style.opacity = "1";
		// 		dom.sidebar.style.opacity = "1";
		// 		if(add) {
		// 			Util.one("#dinner").style.visibility = "visible";
		// 		}
		// 	});

		// settings popup
		dom.settings.addEventListener("click",
			function() {
				dom.settingsPopup.style.visibility = "visible"
				dom.center.style.opacity = "0.15";
				dom.sidebar.style.opacity = "0.15";
			});

		Util.one("#settingsPopupClose").addEventListener("click",
			function() {
				dom.settingsPopup.style.visibility = "hidden"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
			});

		// color picker within settings
		var colors = Util.all(".color")
		for (let color of colors) {
			color.addEventListener("click",
				function() {
					removeOtherBorders();
					color.classList.add("colorSelected")
					dom.root.style.setProperty('--main-background', color.style.backgroundColor);
				});
		}

		// checkmark in pending checkoffs
		// Util.one("#checkoffDone").addEventListener("click",
		// 	function(event) {
		// 		Util.one("#doggie").remove();
		// 		event.stopPropagation();
		// 		Util.one("#hiddenReward").style.visibility = "visible"
		// 	});
	},


	"keyup": function(evt) {
		Util.one("#welcome").innerHTML = "Hi, "+dom.parentName.value+"!"
	},
});

// begin helper functions
function regularChorePopup(choreName) {
	dom.chorePopup.style.display = "flex";
	dom.center.style.opacity = "0.15";
	dom.sidebar.style.opacity = "0.15";

	Util.one("#choreText").innerHTML = chores[choreName].chore;
	Util.one("#dateText").innerHTML = chores[choreName].duedate;
	Util.one("#rewardText").innerHTML = chores[choreName].reward;
	Util.one("#detailsText").innerHTML = chores[choreName].details;
}

function editChorePopup(choreName) {
	dom.editChorePopup.style.display = "flex";
	dom.center.style.opacity = "0.15";
	dom.sidebar.style.opacity = "0.15";

	Util.one("#editChoreText").value = chores[choreName].chore;
	Util.one("#editDateText").value = chores[choreName].duedate;
	Util.one("#editRewardText").value = chores[choreName].reward;
	Util.one("#editDetailsText").value = chores[choreName].details;
}

function newChorePopup(choreName) {
	dom.editChorePopup.style.display = "flex";
	dom.center.style.opacity = "0.15";
	dom.sidebar.style.opacity = "0.15";

	Util.one("#editChoreText").value = "";
	Util.one("#editDateText").value = "";
	Util.one("#editRewardText").value = "";
	Util.one("#editDetailsText").value = "";
}

function fillChores() {
	dom.incomplete.appendChild(makeChore("lawn", true));
	dom.incomplete.appendChild(makeChore("clothes", true));
	dom.incomplete.appendChild(makeChore("dishes", true));
	
	dom.checkoff.appendChild(makeChore("dog", false));
	
	dom.rewards.appendChild(makeReward("park"));
}

function makeChore(choreName, isEdit) {
	var div = document.createElement("div");
	div.classList = "item";
	div.id = choreName;

	// image
	var img = document.createElement("img");
	img.src = chores[choreName].picture;
	img.classList = "itemImg"

	// chore name
	var name = document.createElement("div");
	name.innerHTML = chores[choreName].chore;
	name.classList = "choreName"

	// due date
	var duedate = document.createElement("div");
	duedate.innerHTML = chores[choreName].duedate;

	// icon 
	var icon = document.createElement("i");
	icon.classList = "material-icons";
	icon.innerHTML = isEdit ? "mode_edit" : "done";
	icon.classList.add(isEdit ? "pencil" : "checkoffDone");
	icon.id = choreName;

	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(duedate);
	div.appendChild(icon)

	return div;
}

function makeReward(rewardName) {
	var div = document.createElement("div");
	div.classList = "item";
	div.id = rewardName;

	// image
	var img = document.createElement("img");
	img.src = rewards[rewardName].picture;
	img.classList = "itemImg"

	// chore name
	var name = document.createElement("div");
	name.innerHTML = rewards[rewardName].name;
	name.classList = "choreName"

	// icon 
	console.log(icon)
	var icon = document.createElement("i");
	icon.classList = "material-icons rewardsDoneCheckoff";
	icon.innerHTML = "done"
	icon.id = rewardName;

	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(icon)

	return div;
}



function removeOtherBorders() {
	var colors = Util.all(".color")
	for (let color of colors) {
		color.classList.remove("colorSelected")
	}
	console.log('end of fun')
}
