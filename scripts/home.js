function populateMembers() {
  var memSection = document.getElementById("members-section")

  for (i=0; i < 5; i++){
    var div = document.createElement("div");
    div.className = "members-block"
    div.innerHTML = "Carlos Garcia"
    memSection.appendChild(div);
  }

}

document.addEventListener("DOMContentLoaded", function() {
  populateMembers();
});
