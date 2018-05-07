var dom = {};
var monthsDict = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"};
var currentChore = "";
var currentChild = "Dave";
var popupActive = false;
var error = false;

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
		dom.members = Util.one("#memberPopup")

		dom.name = Util.one("#name")
		dom.new = Util.one("#newButton")

		fillChores("Dave");

		// // set color and name defaults
		dom.parentName.value = "Andrew";

		// event listeners for each item popup
		// and checkmarks
		itemEventListeners();
		pendingCheckoffEventListeners();
		pendingRewardEventListeners();

		// settings popup
		dom.settings.addEventListener("click",
			function() {				
				skip()
				Util.one("#deleteConfirmation").style.display = "none"
				dom.members.style.display = "none"
				dom.editChorePopup.style.display = "none"
				dom.chorePopup.style.display = "none";
				dom.settingsPopup.style.display = "flex"
				dom.center.style.opacity = "0.15";
				dom.sidebar.style.opacity = "0.15";
			});

		//help sequence
		Util.one("#helpBtn").addEventListener("click",
			function() {
				skip()
				dom.members.style.display = "none"
				dom.editChorePopup.style.display = "none"
				dom.chorePopup.style.display = "none";
				dom.settingsPopup.style.display = "none"
				helpSequence1()
			});

		Util.one("#next1").addEventListener("click",
			function() {
				helpSequence2()
			});

		Util.one("#next2").addEventListener("click",
			function() {
				helpSequence3()
			});

		Util.one("#next3").addEventListener("click",
			function() {
				helpSequence4()
			});

		Util.one("#next4").addEventListener("click",
			function() {
				helpSequence5()
			});

		Util.one("#next5").addEventListener("click",
			function() {
				helpSequence6()
			});

		Util.one("#next6").addEventListener("click",
			function() {
				helpSequence7()
			});

		Util.one("#skip").addEventListener("click",
			function() {
				skip()
			});

		// close button for settings popup
		Util.one("#settingsPopupClose").addEventListener("click",
			function() {
				if (!error) {
					dom.settingsPopup.style.display = "none"
					dom.center.style.opacity = "1";
					dom.sidebar.style.opacity = "1";
				}
			});

		//close members
		Util.one("#memberExit").addEventListener("click",
			function() {
				if (!error) {
					dom.members.style.display = "none"
					dom.settingsPopup.style.display = "flex"
				}
			});

		//add member on save
		Util.one("#memberSave").addEventListener("click",
			function() {
				if (!error) {
					var div = document.createElement("div");
					div.className = "tab"
					var name = Util.one("#memberText").value
					div.id = name
					div.innerHTML = '<p>'+name+'</p> <i class="material-icons" style="font-size: 40px; margin-top:20px; ">keyboard_arrow_right</i>'
					Util.one("#sidebar").appendChild(div);
					dom.members.style.display = "none"
					dom.settingsPopup.style.display = "none"
					dom.center.style.opacity = "1";
					dom.sidebar.style.opacity = "1";

				}
			});

		// color picker within settings popup
		var colors = Util.all(".color")
		for (let color of colors) {
			color.addEventListener("click",
				function() {
					removeOtherBorders();
					color.classList.add("colorSelected")
					dom.root.style.setProperty('--main-background', color.style.backgroundColor);
				});
		}

		// for switching which child's chores user is looking at
		var children = Util.all(".tab")
		for (let child of children) {
			child.addEventListener("click",
				function() {
					skip()
					Util.one("#deleteConfirmation").style.display = "none"
					dom.members.style.display = "none"
					dom.editChorePopup.style.display = "none"
					dom.chorePopup.style.display = "none";	
					if (!error) {
						dom.settingsPopup.style.display = "none"
					}			
					dom.center.style.opacity = "1";
					dom.sidebar.style.opacity = "1";
					startClean();
					Util.one(".tabSelected").classList.remove("tabSelected")
					child.classList.add("tabSelected")
					Util.one("#childChores").innerHTML = child.id + "'s Chores"
					fillChores(child.id);
					itemEventListeners();
					pendingCheckoffEventListeners();
					pendingRewardEventListeners();
					// list item popups

					currentChild = child.id;
				});
		}

		// chore popup close button
		Util.one("#chorePopupClose").addEventListener("click",
			function() {
				dom.chorePopup.style.display = "none"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
				popupActive = false;
			});

		// open edit popup from within chore popup
		Util.one("#pencil").addEventListener("click",
			function() {
				dom.chorePopup.style.display = "none"
				editChorePopup(currentChore);
			});

		// open delete confirmation when trash can icon is clicked on chore popup
		Util.one("#trashcan").addEventListener("click",
			function() {
				dom.chorePopup.style.display = "none"
				Util.one("#deleteConfirmation").style.display = "block"
			});

		//edit members popup opens
		Util.one("#viewKids").addEventListener("click",
			function() {
				dom.settingsPopup.style.display = "none"
				dom.members.style.display = "block"
			});

		// confirm for delete confirmation
		Util.one("#confirm").addEventListener("click",
			function() {
				Util.one("#deleteConfirmation").style.display = "none"
				dom.chorePopup.style.display = "none";
				Util.one("#"+currentChore).remove();
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
			});

		// cancel for delete confirmation
		Util.one("#cancel").addEventListener("click",
			function() {
				dom.chorePopup.style.display = "block"
				Util.one("#deleteConfirmation").style.display = "none"
			});

		// new chore button opens new chore popup
		Util.one("#newButton").addEventListener("click",
			function() {
				skip()
				Util.one("#deleteConfirmation").style.display = "none"
				dom.members.style.display = "none"
				dom.editChorePopup.style.display = "none"
				dom.chorePopup.style.display = "none";	
				if (!error) {
					dom.settingsPopup.style.display = "none"
				}		
				currentChore = "";
				newChorePopup();
			});

		// edit/add chore popup exit, don't have to save any info
		Util.one("#editExit").addEventListener("click",
			function() {
				dom.editChorePopup.style.display = "none"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
				popupActive = false;
		});

		// edit/add chore popup save, need to save info
		Util.one("#editSave").addEventListener("click",
			function() {
				error = false;
				// if user doesn't type anything into name or date, don't let them save
				// and alert them of the problem with red border
				if (Util.one("#editChoreText").value.length == 0) {
					Util.one("#editChoreText").classList = "error"
					error = true
				}
				if (Util.one("#editDateText").value.length == 0) {
					Util.one("#editDateText").classList = "error"
					error = true
				}

				// if the user has filled out all required details, then save or edit info
				if (!error) {
					dom.editChorePopup.style.display = "none"
					dom.center.style.opacity = "1";
					dom.sidebar.style.opacity = "1";
					popupActive = false;

					if(currentChore == "") {
						currentChore = Util.one("#editChoreText").value.split(' ').join('+');
						chores[currentChore] = {};
						chores[currentChore].chore = Util.one("#editChoreText").value;
						chores[currentChore].formatdate = Util.one("#editDateText").value;
						chores[currentChore].duedate = getDate(Util.one("#editDateText").value);
						chores[currentChore].reward = Util.one("#editRewardText").value;
						chores[currentChore].details = Util.one("#editDetailsText").value;
						chores[currentChore].picture = "assets/images/broom.png";
						chores[currentChore].child = currentChild;
						chores[currentChore].completed = false;
						var chore = makeChore(currentChore, false);
						dom.incomplete.appendChild(chore);
						// make it clickable
						chore.addEventListener("click",
							function() {
								currentChore = chore.id;
								regularChorePopup(chore.id);
							});
					}
					else {
						chores[currentChore].chore = Util.one("#editChoreText").value;
						chores[currentChore].formatdate = Util.one("#editDateText").value;
						chores[currentChore].duedate = getDate(Util.one("#editDateText").value);
						chores[currentChore].reward = Util.one("#editRewardText").value;
						chores[currentChore].details = Util.one("#editDetailsText").value;
					}
					updateChoreDivs(currentChore)
				}

			});
	},

	// dynamically change user's name when they cahgne it in settings popup
	"keyup": function(evt) {
		Util.one("#welcome").innerHTML = "Hi, "+dom.parentName.value+"!"
		// alert the user to an error if they delete entire name
		if (dom.parentName.value.length == 0) {
			dom.parentName.classList = "error";
		}
		error = dom.parentName.value.length == 0;
	},

	"click": function(evt) {
		var elm = document.elementFromPoint(evt.clientX, evt.clientY);
		// remove red outline when user starts to type again
		if (elm.classList == "error") {
			elm.classList = "";
		}
	},

});

// begin helper functions

// function populateKids(){
// 	var kids = Util.all(".tab");
	
// 	for (var i in kids){
// 		var div = document.createElement("div");
// 		div.innerHTML = kids[i].id;
// 		Util.one("#members").appendChild(div)

// 		console.log(kids[i])
// 	}
// }

function regularChorePopup(choreName) {
	dom.chorePopup.style.display = "flex";
	dom.center.style.opacity = "0.15";
	dom.sidebar.style.opacity = "0.15";
	popupActive = true;

	Util.one("#choreText").innerHTML = chores[choreName].chore;
	Util.one("#dateText").innerHTML = chores[choreName].duedate;
	Util.one("#rewardText").innerHTML = chores[choreName].reward;
	Util.one("#detailsText").innerHTML = chores[choreName].details;
}

function editChorePopup(choreName) {
	dom.editChorePopup.style.display = "flex";
	dom.center.style.opacity = "0.15";
	dom.sidebar.style.opacity = "0.15";
	Util.one("#editTitle").innerHTML = "Edit Chore";
	popupActive = true;
	Util.one("#editChoreText").classList = ""
	Util.one("#editDateText").classList = ""

	Util.one("#editChoreText").value = chores[choreName].chore;
	Util.one("#editDateText").value = chores[choreName].formatdate;
	Util.one("#editRewardText").value = chores[choreName].reward;
	Util.one("#editDetailsText").value = chores[choreName].details;
}

function newChorePopup(choreName) {
	dom.editChorePopup.style.display = "flex";
	dom.center.style.opacity = "0.15";
	dom.sidebar.style.opacity = "0.15";
	Util.one("#editTitle").innerHTML = "Add Chore";
	popupActive = true;
	Util.one("#editChoreText").classList = ""
	Util.one("#editDateText").classList = ""


	Util.one("#editChoreText").value = "";
	Util.one("#editChoreText").focus();
	Util.one("#editDateText").value = "";
	Util.one("#editRewardText").value = "";
	Util.one("#editDetailsText").value = "";
}

function makeChore(choreName, isCompleted) {
	var div = document.createElement("div");
	div.classList = "item";
	div.id = choreName.split(' ').join('+');

	// image
	var img = document.createElement("img");
	img.src = chores[choreName].picture;
	img.classList = "itemImg"

	// chore name
	var name = document.createElement("div");
	name.innerHTML = chores[choreName].chore;
	name.classList = "choreName"
	name.id = div.id + "name"

	// due date
	var duedate = document.createElement("div");
	duedate.innerHTML = chores[choreName].duedate;
	duedate.id = div.id + "date"

	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(duedate);

	// icon if completed
	if(isCompleted) {
		var icon = document.createElement("i");
		icon.classList = "material-icons checkoffDone";
		icon.innerHTML = "done";
		icon.id = choreName;
		div.appendChild(icon)
	}

	return div;
}

function makeReward(rewardName) {
	var div = document.createElement("div");
	div.classList = "reward-item";
	div.id = rewardName;

	// image
	var img = document.createElement("img");
	img.src = rewards[rewardName].picture;
	img.classList = "itemImg"

	// chore name
	var name = document.createElement("div");
	name.innerHTML = rewards[rewardName].name;
	name.classList = "rewardName"

	// icon
	var icon = document.createElement("i");
	icon.classList = "material-icons rewardsDoneCheckoff";
	icon.innerHTML = "done"
	icon.id = rewardName;

	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(icon)

	return div;
}

function disableAroundPopup() {
	Util.one("#newButton").disabled = "true";
	dom.settings.disabled = "true";
}

function enableAroundPopup() {
	Util.one("#newButton").disabled = "false";
	dom.settings.disabled = "false";
}

function removeOtherBorders() {
	var colors = Util.all(".color")
	for (let color of colors) {
		color.classList.remove("colorSelected")
	}
}

function removeOtherColors() {
	var children = Util.all(".tab")
	for (let child of children) {
		child.style.classList = "tab"
	}
}

function getDate(date){
	var split = date.split("-");
	var month = parseInt(split[1]);
	return monthsDict[month] + " " + parseInt(split[2]);
}

function updateChoreDivs(choreName) {
	var chore =Util.one("#"+choreName);
	Util.one("#"+chore.id+"name").innerHTML = chores[currentChore].chore;
	Util.one("#"+chore.id+"date").innerHTML = chores[currentChore].duedate;
}

// differnt chores for different children
function fillChores(childName) {
	// if (childName != "Allie")
	for (var key in chores) {
		dict = chores[key]
		if (dict.child == childName) {
			if (!dict.completed) {
				dom.incomplete.appendChild(makeChore(key, false))
			}
			else {
				dom.checkoff.appendChild(makeChore(key, true))
			}

		}
	}

	for (var key in rewards) {
		dict = rewards[key]
		if (dict.child == childName) {
			dom.rewards.appendChild(makeReward(key))
		}
	}
}

function startClean() {
	var items = Util.all(".item")
	for (let item of items) {
		item.remove();
	}
	var items = Util.all(".reward-item")
	for (let item of items) {
		item.remove();
	}
}

function itemEventListeners(){
	var items = Util.all(".item")
	for (let item of items) {
		item.addEventListener("click",
			function() {
				skip()
				Util.one("#deleteConfirmation").style.display = "none"
				dom.members.style.display = "none"	
				if (!error) {
					dom.settingsPopup.style.display = "none"
				}		
				dom.editChorePopup.style.display = "none"
				dom.chorePopup.style.display = "none";		
				currentChore = item.id;
				regularChorePopup(item.id);
			});
	}
}

function pendingCheckoffEventListeners() {
	var items = Util.all(".checkoffDone")
	for (let item of items) {
		item.addEventListener("click",
			function(event) {
				event.stopPropagation();
				dom.rewards.appendChild(makeReward(chores[item.id].rewardid));
				pendingRewardEventListeners();
				this.parentNode.remove();
			});
	}
}

function pendingRewardEventListeners() {
	var items = Util.all(".rewardsDoneCheckoff")
	for (let item of items) {
		item.addEventListener("click",
			function(event) {
				event.stopPropagation();
				this.parentNode.remove();
			});
	}
}



//onboarding functions
function helpSequence1() {
	var welcomePopup = document.getElementById("welcomePopup");
	welcomePopup.style.display = "flex";

	var skip = document.getElementById("skip");
	skip.style.display = "flex"

	dom.sidebar.style.opacity = "0.15"
	dom.incomplete.style.opacity = "0.15"
	dom.checkoff.style.opacity = "0.15"
	dom.rewards.style.opacity = "0.15"
	dom.name.style.opacity = "0.15"
	dom.new.style.opacity = "0.15"
}

function helpSequence2() {
	var welcomePopup = document.getElementById("welcomePopup");
	welcomePopup.style.display = "none";

	var newChorePopup = document.getElementById("newChorePopup");
	newChorePopup.style.display = "flex";

	dom.new.style.opacity = "1"
	dom.new.style.border = "2px red solid"
}


function helpSequence3() {
	var newChorePopup = document.getElementById("newChorePopup");
	newChorePopup.style.display = "none";

	dom.new.style.opacity = "0.15"
	dom.new.style.border = ""

	var sidebarPopup = document.getElementById("sidebarPopup");
	sidebarPopup.style.display = "flex";

	dom.sidebar.style.opacity = "1"
	dom.sidebar.style.border = "2px red solid"

}

function helpSequence4() {
	var sidebarPopup = document.getElementById("sidebarPopup");
	sidebarPopup.style.display = "none";

	dom.sidebar.style.opacity = "0.15"
	dom.sidebar.style.border = ""

	var incompletePopup = document.getElementById("incompletePopup");
	incompletePopup.style.display = "flex";

	dom.incomplete.style.opacity = "1"
	dom.incomplete.style.border = "2px red solid"
}

function helpSequence5() {
	var incompletePopup = document.getElementById("incompletePopup");
	incompletePopup.style.display = "none";

	dom.incomplete.style.opacity = "0.15"
	dom.incomplete.style.border = ""

	var pendingPopup = document.getElementById("pendingPopup");
	pendingPopup.style.display = "flex";

	dom.checkoff.style.opacity = "1"
	dom.checkoff.style.border = "2px red solid"

}

function helpSequence6() {
	var pendingPopup = document.getElementById("pendingPopup");
	pendingPopup.style.display = "none";

	dom.checkoff.style.opacity = "0.15"
	dom.checkoff.style.border = ""

	var rewardsPopup = document.getElementById("rewardsPopup");
	rewardsPopup.style.display = "flex";

	dom.rewards.style.opacity = "1"
	dom.rewards.style.border = "2px red solid"
}

function helpSequence7() {
	var rewardsPopup = document.getElementById("rewardsPopup");
	rewardsPopup.style.display = "none";

	dom.sidebar.style.opacity = "1"
	dom.incomplete.style.opacity = "1"
	dom.checkoff.style.opacity = "1"
	dom.rewards.style.opacity = "1"
	dom.name.style.opacity = "1"
	dom.new.style.opacity = "1"

	dom.rewards.style.border = ""
	var skip = document.getElementById("skip");
	skip.style.display = "none"
}

function skip() {
	dom.sidebar.style.opacity = "1"
	dom.incomplete.style.opacity = "1"
	dom.checkoff.style.opacity = "1"
	dom.rewards.style.opacity = "1"
	dom.name.style.opacity = "1"
	dom.new.style.opacity = "1"

	dom.sidebar.style.border = ""
	dom.incomplete.style.border = ""
	dom.checkoff.style.border = ""
	dom.rewards.style.border = ""
	dom.name.style.border = ""
	dom.new.style.border = ""

	var rewardsPopup = document.getElementById("rewardsPopup");
	rewardsPopup.style.display = "none";
	var pendingPopup = document.getElementById("pendingPopup");
	pendingPopup.style.display = "none";
	var incompletePopup = document.getElementById("incompletePopup");
	incompletePopup.style.display = "none";
	var sidebarPopup = document.getElementById("sidebarPopup");
	sidebarPopup.style.display = "none";
	var newChorePopup = document.getElementById("newChorePopup");
	newChorePopup.style.display = "none";
	var welcomePopup = document.getElementById("welcomePopup");
	welcomePopup.style.display = "none";

	var skip = document.getElementById("skip");
	skip.style.display = "none"
}
