/* Copyright (c) 2017 Austin Guiney.
 * MIT Licensed */
 
function reply(id) {
	document.getElementById("parent_id").value = id;
	document.getElementById("parent_name").value = document.getElementById(id).innerHTML;
	document.getElementById("depth").value++;
	document.getElementById("form-title").innerText = "Reply to " + document.getElementById(id).children[0].innerHTML;
	var commentForm = document.getElementById("comment-form");
	var replyID = document.getElementById("reply-to-" + id)
	replyID.append(commentForm);
	replyID.children[1].style.display = 'block';
}

function closeReply() {
	document.getElementById("form-title").innerText = "Leave a comment";
	document.getElementById("parent_id").value = "";
	document.getElementById("parent_name").value = "";
	document.getElementById("depth").value = "0";
	var commentForm = document.getElementById("comment-form");
	var endOfDocument = document.getElementById("comment-submission-form");
	endOfDocument.append(commentForm);
	document.getElementsByClassName("close-reply")[0].style.display = 'none';
}
