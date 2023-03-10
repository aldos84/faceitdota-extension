'use strict';

function restore() {
	chrome.storage.local.get("source", function(items) {
		document.getElementById('source').value = items.source;
	});
}

function save() {
	let source = document.getElementById('source').value;

	chrome.storage.local.set({
		source: source
	}, function() {
		let res = document.getElementById('saveResult');
		res.textContent = "settings saved";
		setTimeout(function() {
			res.textContent = "";
		}, 750)
	});
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);