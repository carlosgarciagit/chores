var dom = {};
var prevX = 0;
var prevY = 0;
var startingColumn = null;

var foldClothes = ["Fold clothes", "April 22, 2018", "A trip to the park!", "Your clean clothes will be in the laundry basket downstairs in the kitchen. Take the basket to your room and fold and put up all your clothes. Be sure to hang up your sundress in the closet."]
var grandma = ["Talk to Grandma", "April 18, 2018", "One hour of video games", "It's Grandma's birthday! Call her sometime after soccer practice and wish her a happy day and tell her about how school is going."]


Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		dom.root = Util.one(":root");
		dom.rewards = Util.one("#rewardsBtn"); 
		dom.settings = Util.one("#gearBtn");
		dom.toDo = Util.one("#left")
		dom.completed = Util.one("#right")
		dom.chorePopup = Util.one("#chorePopup")
		dom.rewardsPopup = Util.one("#rewardsPopup")
		dom.settingsPopup = Util.one("#settingsPopup")
		dom.main = Util.one("#main")
		dom.childName = Util.one("#nameText");
		
		// set color and name defaults
		Util.one("#default").classList.add("colorSelected")
		dom.childName.value = "Allie";

		fillChores();

		// chore popup
		var items = Util.all(".item")
		for (let item of items) {
			item.addEventListener("click",
				function() {
					
					// need to add for all chores!
					switch(item.id) {
						case "clothes": 
							populateChoreDetails(foldClothes); break;
						case "grandma":
							populateChoreDetails(grandma); break;
					}
				});
		}

		Util.one("#chorePopupClose").addEventListener("click", 
			function() {
				dom.chorePopup.style.visibility = "hidden"
				dom.main.style.opacity = "1";
			}); 

		// rewards popup
		dom.rewards.addEventListener("click", 
			function() {
				dom.rewardsPopup.style.visibility = "visible"
				dom.main.style.opacity = "0.15";
			}); 

		Util.one("#rewardsPopupClose").addEventListener("click", 
			function() {
				dom.rewardsPopup.style.visibility = "hidden"
				dom.main.style.opacity = "1";
			}); 

		// remind buttons
		var reminds = Util.all(".remind")
		for (let remind of reminds) {
			remind.addEventListener("click",
				function() {
					remind.classList.remove("remind");
					remind.classList.add("reminded");
					remind.innerHTML = "Reminded!"
				});
		}

		// settings popup
		dom.settings.addEventListener("click", 
			function() {
				dom.settingsPopup.style.visibility = "visible"
				dom.main.style.opacity = "0.15";
			}); 

		Util.one("#settingsPopupClose").addEventListener("click", 
			function() {
				dom.settingsPopup.style.visibility = "hidden"
				dom.main.style.opacity = "1";
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
	},

	"mousedown": function(evt) {
		var elm = document.elementFromPoint(evt.clientX, evt.clientY);
		
		var parents = Util.all(".item");
		for (let item of parents) {
			if(item.contains(elm)) {
				console.log('hello')
				if(elm.innerHTML == "dehaze") {
					item.className = "item-drag"
					prevX = evt.clientX
					prevY = evt.clientY
					document.documentElement.style.setProperty('--top', 0 + 'px')
					document.documentElement.style.setProperty('--left', 0 + 'px')
					startingColumn = item.parentElement.id;
					elm.ondragstart = function() {
						return false;
			}
				}
			}
		}
	},

	"mousemove": function(evt) {
		var element = Util.one(".item-drag");
		if (element != null) {
			document.documentElement.style.setProperty('--top', (evt.clientY - prevY) + 'px')
			document.documentElement.style.setProperty('--left', (evt.clientX - prevX) + 'px')
		}
	},


	"mouseup": function(evt) {
		var item = Util.one(".item-drag");
			if (item != null) {
				var box = item.children.item(item.children.length - 1);
				var column = document.elementFromPoint(evt.clientX, evt.clientY);
				if (column.id == "left" && column.id != startingColumn) {
					dom.toDo.appendChild(item)
					document.documentElement.style.setProperty('--top', (0) + 'px')
					document.documentElement.style.setProperty('--left', (0) + 'px')
				}
				else if (column.id == "right" && column.id != startingColumn) {
					dom.completed.appendChild(item)
					document.documentElement.style.setProperty('--top', (0) + 'px')
					document.documentElement.style.setProperty('--left', (0) + 'px')
				}
				item.className = "item-move-back"
				var promise = Util.afterAnimation(item, "moveBack")
				promise.then(function() {
					item.className = "item";
				})
				
			}
	},

	"keyup": function(evt) {
		Util.one("#welcome").innerHTML = "Hi, "+dom.childName.value+"!"
	},
});

function fillChores() {
	dom.toDo.appendChild(makeItem("lawn"));
	dom.toDo.appendChild(makeItem("clothes"));
	dom.toDo.appendChild(makeItem("dishes"));
	dom.toDo.appendChild(makeItem("dinner"));
	
	dom.completed.appendChild(makeItem("dog"));
	dom.completed.appendChild(makeItem("grandma"));
}

function populateChoreDetails(details) {
	dom.chorePopup.style.visibility = "visible"
	dom.main.style.opacity = "0.15";
	Util.one("#choreText").innerHTML = details[0]
	Util.one("#dateText").innerHTML = details[1]
	Util.one("#rewardText").innerHTML = details[2]
	Util.one("#detailsText").innerHTML = details[3]
}

function makeItem(choreName) {
	var div = document.createElement("div");
	div.classList = "item";

	// image
	var img = document.createElement("img");
	img.src = chores[choreName].picture;
	img.classList = "itemImg"

	// chore name
	var name = document.createElement("div");
	name.innerHTML = chores[choreName].chore;

	// due date
	var duedate = document.createElement("div");
	duedate.innerHTML = chores[choreName].duedate;

	// drag and drop img 
	var dehaze = document.createElement("i");
	dehaze.classList = "material-icons";
	dehaze.innerHTML = "dehaze";

	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(duedate);
	div.appendChild(dehaze)

	return div;
}

function makeChorePopup(choreDict) {

}

function removeOtherBorders() {
	var colors = Util.all(".color")
	for (let color of colors) {
		color.classList.remove("colorSelected")
	}
}



