Util.events(document, {
	"DOMContentLoaded": function() {
		Util.one("#name").focus();
	},

	"keyup": function(evt) {
		Util.one("#error").style.display = "none"
		if (evt.key == "Enter") {
			//child
			if (Util.one("#name").value.toLowerCase() == "allie") {
				window.open("child.html", name="_self")
			}
			//parent
			else if (Util.one("#name").value.toLowerCase() == "andrew") {
				window.open("parent.html", name="_self")
			}
			else {
				Util.one("#error").style.display = "flex"
			}
		}
	},
});