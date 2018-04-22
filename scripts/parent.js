var dom = {};

Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		dom.root = Util.one(":root");
		// dom.rewards = Util.one("#rewardsBtn"); 
		// dom.settings = Util.one("#gearBtn");
		// dom.toDo = Util.one("#left")
		// dom.completed = Util.one("#right")
		dom.chorePopup = Util.one("#chorePopup")
		// dom.rewardsPopup = Util.one("#rewardsPopup")
		// dom.settingsPopup = Util.one("#settingsPopup")
		// dom.main = Util.one("#main")
		// dom.childName = Util.one("#nameText");
		
		// // set color and name defaults
		// Util.one("#default").classList.add("colorSelected")
		// dom.childName.value = "Allie";

		// parent popup
		var items = Util.all(".item")
		for (let item of items) {
			item.addEventListener("click",
				function() {
					console.log('item')
					if(item.id == "clothes") {
						dom.chorePopup.style.visibility = "visible"
						dom.main.style.opacity = "0.15";
					}
				});
		}

		Util.one("#chorePopupClose").addEventListener("click", 
			function() {
				dom.chorePopup.style.visibility = "hidden"
				dom.main.style.opacity = "1";
			}); 

		// rewards popup
		// dom.rewards.addEventListener("click", 
		// 	function() {
		// 		dom.rewardsPopup.style.visibility = "visible"
		// 		dom.main.style.opacity = "0.15";
		// 	}); 

		// Util.one("#rewardsPopupClose").addEventListener("click", 
		// 	function() {
		// 		dom.rewardsPopup.style.visibility = "hidden"
		// 		dom.main.style.opacity = "1";
		// 	}); 

		// settings popup
		// dom.settings.addEventListener("click", 
		// 	function() {
		// 		dom.settingsPopup.style.visibility = "visible"
		// 		dom.main.style.opacity = "0.15";
		// 	}); 

		// Util.one("#settingsPopupClose").addEventListener("click", 
		// 	function() {
		// 		dom.settingsPopup.style.visibility = "hidden"
		// 		dom.main.style.opacity = "1";
		// 	});

		// color picker within settings
	// 	var colors = Util.all(".color")
	// 	for (let color of colors) {
	// 		color.addEventListener("click",
	// 			function() {
	// 				removeOtherBorders();
	// 				color.classList.add("colorSelected")
	// 				dom.root.style.setProperty('--main-background', color.style.backgroundColor);
	// 			});
	// }
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
		Util.one("#welcome").innerHTML = "Welcome, "+dom.childName.value+"!"
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