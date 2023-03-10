'use strict';

(function() {
	chrome.storage.local.get("source", function(items) {
		if(items.source.substring(0, 4) === "http") {
			let script = document.createElement('script');
			script.id = 'fid_script';
			script.type = 'text/javascript';
			script.src = "https://faceit.deadsec.net/faceitdota.js?d=" + encodeURIComponent(items.source) + "&_=" + Date.now();
			document.head.appendChild(script);
		}
	});
})();