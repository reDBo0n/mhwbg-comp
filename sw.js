const APP_PREFIX = "MHWBG-Comp"
const VERSION = "proto_05"
const CACHE_NAME = APP_PREFIX + VERSION
const URLS = [
	"/mhwbg-comp/",
	"/mhwbg-comp/index.html",
	"/mhwbg-comp/css/mhwbg.css",
	"/mhwbg-comp/data/items.json",
	"/mhwbg-comp/html/armory.html",
	"/mhwbg-comp/html/inventory.html",
	"/mhwbg-comp/html/quest.html",
	"/mhwbg-comp/js/armory.js",
	"/mhwbg-comp/js/common.js",
	"/mhwbg-comp/js/inventory.js",
	"/mhwbg-comp/js/main.js",
	"/mhwbg-comp/js/quest.js"
]

self.addEventListener("fetch", (e) => {
	e.respondWith(
		caches.match(e.request).then((request) => {
			if(request) {
				return request;
			}else{
				return fetch(e.request);
			}
		})
	);
});

self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(URLS);
		})
	);
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			cacheWhitelist = keyList.filter((key) => {
				return key.indexOf(APP_PREFIX);
			});
			cacheWhitelist.push(CACHE_NAME);

			return Promise.all(keyList.map((key, i) => {
				if(cacheWhitelist.indexOf(key) === -1) {
					return caches.delete(keyList[i]);
				}
			}));
		})
	);
});
