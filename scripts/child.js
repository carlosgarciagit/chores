var dom = {};
Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		dom.rewards = Util.one("#rewardsBtn"); 
		dom.settings = Util.one("#gearBtn");
		dom.toDo = Util.one("#left")
		dom.completed = Util.one("#right")

		dom.rewards.addEventListener("click", 
			function() {
				console.log('rewards')
		}); 

		dom.settings.addEventListener("click", 
			function() {
				console.log('settings')
			}); 

		var items = Util.all(".item")
		for (let item of items) {
			item.addEventListener("click",
				function() {
					console.log('item')
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
		// if (elm.hasParent()) {
		// 	console.log("click")
		// }
		// else if (elm.id.includes("pic") && !animationInProgress){
		// 	dragCandy = elm;
		// 	dragCandy.style.pointerEvents = "none";
		// 	dragCandy.style.zIndex = "10";
		// 	dragCandy.style.top = "0px";
		// 	dragCandy.style.left = "0px";
		// 	lastX = evt.clientX;
		// 	lastY = evt.clientY;

		// 	removePulsing();
		// 	clearTimeout(hintVar);
		// }
	},
});
