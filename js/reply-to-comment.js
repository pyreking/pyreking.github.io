function reply(id) {
	document.getElementById("parent_id").value = id;
	document.getElementById("parent_name").value = document.getElementById(id).innerHTML;
	document.getElementById("depth").value++;
	document.getElementById("form-title").innerText = "Reply to " + document.getElementById(id).innerHTML;
	var commentForm = document.getElementById("comment-form");
	var replyID = document.getElementById("reply-to-" + id)
	replyID.append(commentForm);
	$(replyID.children[1]).show();
}

function closeReply() {
	document.getElementById("form-title").innerText = "Leave a comment";
	document.getElementById("parent_id").value = "";
	document.getElementById("parent_name").value = "";
	document.getElementById("depth").value = "0";
	var commentForm = document.getElementById("comment-form");
	var endOfDocument = document.getElementById("comment-submission-form");
	endOfDocument.append(commentForm);
	$(".close-reply").hide();
}
