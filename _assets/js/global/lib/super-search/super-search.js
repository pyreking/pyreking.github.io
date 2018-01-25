/* super-search
Author: Kushagra Gour (http://kushagragour.in)
MIT Licensed
*/
(function () {
	var searchFile = '/atom.xml',
		searchEl,
		searchInputEl,
		searchResultsEl,
		currentInputValue = '',
		lastSearchResultHash,
		posts = [];

	// Changes XML to JSON
	// Modified version from here: http://davidwalsh.name/convert-xml-json
	function xmlToJson(xml) {
		// Create the return object
		var obj = {};
		if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		// If all text nodes inside, get concatenated text from them.
		var textNodes = [].slice.call(xml.childNodes).filter(function (node) { return node.nodeType === 3; });
		if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
			obj = [].slice.call(xml.childNodes).reduce(function (text, node) { return text + node.nodeValue; }, '');
		}
		else if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	}

	function getPostsFromXml(xml) {
		var json = xmlToJson(xml);
		
		// If an array already exists, return it.
		if (json.entry && json.entry instanceof Array) {
			return json.entry;
		}
		
		// Build an array if one doesn't exist.
		else if (json.entry) {
			arr = []
			arr.push(json.entry);
			return arr;
		} else {
			return [];
		}
	}

	window.toggleSearch = function toggleSearch() {
		searchEl.classList.toggle('is-active');
		if (searchEl.classList.contains('is-active')) {
			// while opening
			searchInputEl.value = '';
		} else {
			// while closing
			searchResultsEl.classList.add('is-hidden');
		}
		setTimeout(function () {
			searchInputEl.focus();
		}, 210);
	}

	function handleInput() {
		var currentResultHash, d;

		currentInputValue = (searchInputEl.value + '').toLowerCase();
		if (!currentInputValue || currentInputValue.length < 3) {
			lastSearchResultHash = '';
			searchResultsEl.classList.add('is-hidden');
			return;
		}
		searchResultsEl.style.offsetWidth;

		var matchingPosts = posts.filter(function (post) {
			// Search `description` and `content` both to support 1.0 and 2.0 formats.
			if ((post.title + '').toLowerCase().indexOf(currentInputValue) !== -1 || ((post.description || post.content) + '').toLowerCase().indexOf(currentInputValue) !== -1 || ((post.tags) + '').toLowerCase().indexOf(currentInputValue) !== -1) {
				return true;
			}
		});
		if (!matchingPosts.length) {
			searchResultsEl.classList.add('is-hidden');
		}
		currentResultHash = matchingPosts.reduce(function(hash, post) { return post.title + hash; }, '');
		
		if (matchingPosts.length && currentResultHash !== lastSearchResultHash) {
			searchResultsEl.classList.remove('is-hidden');
			searchResultsEl.innerHTML = matchingPosts.map(function (post) {
				
				// Get the post date
				d = new Date(post.updated);
				
				// Get the name of the month
				var utcMonth = getMonthName(d.getUTCMonth());
				
				// Get the day of the month with an ordinal
				var utcDay = getOrdinal(d.getUTCDate());
				
				// Get the full year
				var utcYear = d.getFullYear().toString();
				
				// Construct the full date
				var fullDate = utcMonth + " " + utcDay + ", " + utcYear;
				
				// Return the search result
				return '<li><a href="' + post.id + '">' + post.title + '<span class="super-search__result-date">' + fullDate + '</span></a></li>';
			}).join('');
		}
		lastSearchResultHash = currentResultHash;
	}
	
	
	// Returns the day of the month with an ordinal
	function getOrdinal(n) {
		if ((parseFloat(n) == parseInt(n)) && !isNaN(n)) {
        	var s=["th","st","nd","rd"],
        	v=n%100;
        return n+(s[(v-20)%10]||s[v]||s[0]);
    	}
    	return n;     
	}
	
	// Returns the full name of the month
	function getMonthName(n) {
		var month = new Array(12);
		month[0] = "January";
		month[1] = "Febuary";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "Septempter";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		return month[n];
	}

	function init(options) {
		searchFile = options.searchFile || searchFile;
		searchEl = document.querySelector(options.searchSelector || '#js-super-search');
		searchInputEl = document.querySelector(options.inputSelector || '#js-super-search__input');
		searchResultsEl = document.querySelector(options.resultsSelector || '#js-super-search__results');

		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open('GET', searchFile);
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState != 4) return;
			if (xmlhttp.status != 200 && xmlhttp.status != 304) { return; }
			var node = (new DOMParser).parseFromString(xmlhttp.responseText, 'text/xml');
			node = node.children[0];
			posts = getPostsFromXml(node);
		}
		xmlhttp.send();

		// Toggle on ESC key
		window.addEventListener('keyup', function onKeyPress(e) {
			if (e.which === 27) {
				toggleSearch();
			}
		});
		
		searchInputEl.addEventListener('input', function onInputChange() {
			handleInput();
		});
	}

	init.toggle = toggleSearch;

	window.superSearch = init;

})();
