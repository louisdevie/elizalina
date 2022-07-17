let elizalina = {
	__languages: [],
	__languagesLookup: {},
	__fallback: "en",

	setFallback: function (langId) {
		this.__fallback = langId;
	},

	getFallback: function () {
		return this.__fallback;
	},

	loadLanguage: async function (source, targetLanguages) {
		const response = await fetch(source);
		const data = await response.json();

		this.loadLanguageObject(data, targetLanguages);
	},

	loadLanguageObject: function (object, targetLanguages) {
		if (!Array.isArray(targetLanguages)) {
			targetLanguages = [targetLanguages];
		}

		this.__languages.push(object);
		const index = this.__languages.length - 1;

		for (const id of targetLanguages) {
			this.__languagesLookup[id] = index;
		}
	},

	isAvailable: function (langId) {
		return this.__languagesLookup.hasOwnProperty(langId);
	},

	fillDocument: function () {
		let lang = this.__languages[this.__languagesLookup[navigator.language]];
		let fallback = this.__languages[this.__languagesLookup[this.__fallback]];

		for (let node of document.getElementsByClassName("elz")) {
			let key = undefined;
			for (const cls of node.classList) {
				if (cls.startsWith("_")) {
					key = cls.substring(1);
					break;
				}
			}
			if (key !== undefined) {
				let content = lang[key] || fallback[key];
				if (content !== undefined) {
					node.innerText = content;
				}
				else
				{
					node.innerText = "<missing #" + key + ">";
				}
			}
		}
	},
};