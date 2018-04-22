var dom = {};
var foldClothes = ["Fold clothes", "April 22, 2018", "A trip to the park!", "Your clean clothes will be in the laundry basket downstairs in the kitchen. Take the basket to your room and fold and put up all your clothes. Be sure to hang up your sundress in the closet."]


Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		dom.root = Util.one(":root");
		// dom.rewards = Util.one("#rewardsBtn");
		dom.settings = Util.one("#settings");
		// dom.toDo = Util.one("#left")
		// dom.completed = Util.one("#right")
		dom.chorePopup = Util.one("#chorePopup")
		dom.choreDone = Util.one("#choreCompleted")
		dom.newChore = Util.one("#newchorePopup")
		// dom.rewardsPopup = Util.one("#rewardsPopup")
		dom.settingsPopup = Util.one("#settingsPopup")
		dom.parentName = Util.one("#nameText");
		dom.center = Util.one("#center")
		dom.sidebar = Util.one("#sidebar")


		// // set color and name defaults
		Util.one("#default").classList.add("colorSelected")
		dom.parentName.value = "Andrew";

		// set margins of settings
		dom.settingsPopup.style.marginTop = "-525px";
		dom.settingsPopup.style.marginLeft = "400px";

		dom.chorePopup.style.marginLeft="500px"
		dom.chorePopup.style.marginTop="-525px"

		// item popup
		var items = Util.all(".item")
		for (let item of items) {
			item.addEventListener("click",
				function() {
					if(item.id == "clothes" ) {
						dom.chorePopup.style.visibility = "visible"
						dom.center.style.opacity = "0.15";
						dom.sidebar.style.opacity = "0.15";
					}
					if (item.id == "doggie"){
						dom.choreDone.style.visibility = "visible"
						dom.center.style.opacity = "0.15";
						dom.sidebar.style.opacity = "0.15";
					}
				});
		}

		Util.one("#clothesPencil").addEventListener("click",
			function(event) {
				event.stopPropagation();
				dom.newChore.style.visibility = "visible"
				Util.one("#newtitle").innerHTML = "Edit Chore"
				Util.one("#newchoreText").value = foldClothes[0]
				Util.one("#newdateText").value = foldClothes[1]
				Util.one("#newrewardText").value = foldClothes[2]
				Util.one("#newdetailsText").value = foldClothes[3]
				dom.center.style.opacity = "0.15";
				dom.sidebar.style.opacity = "0.15";
			});

		Util.one("#chorePopupClose").addEventListener("click",
			function() {
				dom.chorePopup.style.visibility = "hidden"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
				});

		Util.one("#chorePopupClose1").addEventListener("click", 
			function() {
				dom.choreDone.style.visibility = "hidden"
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
			}); 

		Util.one("#newButton").addEventListener("click", 
			function() {
				dom.newChore.style.visibility = "visible"
				dom.center.style.opacity = "0.15";
				dom.sidebar.style.opacity = "0.15";
			}); 

		Util.one("#newchorePopupClose").addEventListener("click", 
			function() {
				dom.newChore.style.visibility = "hidden"
				Util.one("#newchoreText").value = ""
				Util.one("#newdateText").value = ""
				Util.one("#newrewardText").value =""
				Util.one("#newdetailsText").value = ""
				dom.center.style.opacity = "1";
				dom.sidebar.style.opacity = "1";
			}); 

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
		Util.one("#checkoffDone").addEventListener("click",
			function(event) {
				Util.one("#doggie").remove();
				event.stopPropagation();
				Util.one("#hiddenReward").style.visibility = "visible"
			});
},

	// "mousedown": function(evt) {
	// 	var elm = document.elementFromPoint(evt.clientX, evt.clientY);

	// 	var parents = Util.all(".item");
	// 	for (let item of parents) {
	// 		if(item.contains(elm)) {
	// 			console.log('hello')
	// 		}
	// 	}
	// },

	"keyup": function(evt) {
		Util.one("#welcome").innerHTML = "Hi, "+dom.parentName.value+"!"
	},
});

function removeOtherBorders() {
	var colors = Util.all(".color")
	for (let color of colors) {
		color.classList.remove("colorSelected")
	}
	console.log('end of fun')
}
