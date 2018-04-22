var dom = {};

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
			}
		}
	},

	"keyup": function(evt) {
		Util.one("#welcome").innerHTML = "Hi, "+dom.childName.value+"!"
		console.log('hi')
	},
});

function removeOtherBorders() {
	var colors = Util.all(".color")
	for (let color of colors) {
		color.classList.remove("colorSelected")
	}
	console.log('end of fun')
}

function populateChoreDetails(details) {
	dom.chorePopup.style.visibility = "visible"
	dom.main.style.opacity = "0.15";
	Util.one("#choreText").innerHTML = details[0]
	Util.one("#dateText").innerHTML = details[1]
	Util.one("#rewardText").innerHTML = details[2]
	Util.one("#detailsText").innerHTML = details[3]
}

