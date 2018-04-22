Util.events(document, {
	"keyup": function(evt) {
		if (evt.key == "Enter") {
			//child
			if (Util.one("#name").value == "Allie") {
				window.open("child.html", name="_self")
			}
			//parent
			if (Util.one("#name").value == "Joe") {
				window.open("parent.html", name="_self")
			}
		}
	},
});