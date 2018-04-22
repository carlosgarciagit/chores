var dom = {};
var prevX = 0;
var prevY = 0;
var startingColumn = null;

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
		/*if (candy != null) {
			var otherCandy = document.elementFromPoint(evt.clientX, evt.clientY);
			if (otherCandy.tagName == "IMG") {
				otherCandy = otherCandy.parentElement
			}
			if (otherCandy.tagName == "SPAN") {
				var candyParent = candy.parentElement
				var fromCandy = board.getCandyAt(candyParent.id.slice(0, 1), candyParent.id.slice(2, 3))
				var toCandy = board.getCandyAt(otherCandy.id.slice(0, 1), otherCandy.id.slice(2, 3))
				var directions = ["left", "right", "up", "down"];
				for (i = 0; i < directions.length; i++) {
					direction = directions[i];
					if (board.getCandyInDirection(fromCandy, direction) == toCandy) {
						if (rules.isMoveTypeValid(fromCandy, direction)) {
							board.flipCandies(fromCandy, toCandy)
							crushCandy()
							return
						} else {
							candy.className = "candy-drag-bad"
							board.flipCandies(fromCandy, toCandy);
							setTimeout(function() {
								board.flipCandies(toCandy, fromCandy)
							}, 400)
							hintTimer = setTimeout(showHint, 5000);
							return
						}
					}
				}

			}*/
			if (item != null) {
				var column = document.elementFromPoint(evt.clientX, evt.clientY);
				console.log(column.id)
				if (column.id == "left" && column.id != startingColumn) {
					dom.toDo.appendChild(item)
					document.documentElement.style.setProperty('--top', (item.offsetTop - evt.clientY) + 'px')
					document.documentElement.style.setProperty('--left', (item.offsetLeft - evt.clientX) + 'px')
				}
				else if (column.id == "right" && column.id != startingColumn) {
					dom.completed.appendChild(item)
					item.className = "item"
					console.log((item.offsetLeft - evt.clientX) + ", " + (item.offsetTop - evt.clientY))
					document.documentElement.style.setProperty('--top', (item.offsetTop - evt.clientY) + 'px')
					document.documentElement.style.setProperty('--left', (item.offsetLeft - evt.clientX) + 'px')
				}
				item.className = "item-move-back"
				var promise = Util.afterAnimation(item, "moveBack")
				promise.then(function() {
					item.className = "item";
				})
				
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

