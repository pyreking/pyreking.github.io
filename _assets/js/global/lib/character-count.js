/* Copyright (c) 2013 Viktor Evdokimov. */

function textCounter(field, cnt, maxlimit) {         
	var cntfield = document.getElementById(cnt);
	cntfield.value = maxlimit - field.value.length;
	cntfield.innerText = cntfield.value;
}
