function reply(id) {
	var topParent = document.getElementById(id).parentElement.parentElement;
	document.getElementById("parent").value = id;
	document.getElementById("depth").value++;
	document.getElementById("form-title").innerText = "Leave a reply";
	var commentForm = document.getElementById("comment-form");
	topParent.append(commentForm);
	$(topParent.children[1]).show();
}

function closeReply() {
	document.getElementById("form-title").innerText = "Leave a comment";
	document.getElementById("parent").value = "";
	document.getElementById("depth").value = "0";
	var commentForm = document.getElementById("comment-form");
	var endOfDocument = document.getElementById("append-comment-form");
	endOfDocument.append(commentForm);
	$(".close-reply").hide();
}
