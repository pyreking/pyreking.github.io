function reply(id) {
	document.getElementById("replying-to").value = id;
	var depthLevel = document.getElementById("depth-level").value;
	if (depthLevel < 3) {
		document.getElementById("depth-level").value++;
	}
	document.getElementById("form-title").innerText = "Leave a reply";
	var topParent = document.getElementById(id).parentElement.parentElement;
	var commentForm = document.getElementById("comment-form");
	topParent.append(commentForm);
	$(".close-reply").hide();
	$(".close-reply").show();
}

function closeReply() {
	document.getElementById("form-title").innerText = "Leave a comment";
	document.getElementById("replying-to").value = "";
	document.getElementById("depth-level").value = "0";
	var commentForm = document.getElementById("comment-form");
	var endOfDocument = document.getElementById("append-comment-form");
	endOfDocument.append(commentForm);
	$(".close-reply").hide();
}
