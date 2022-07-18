const elizalina = {
	__languages: [],
	__lookup: {},
	__fallback: "en",

	setFallback: function (langId) {
		this.__fallback = langId;
	},

	getFallback: function () {
		return this.__fallback;
	},

	noFallback: function () {
		this.__fallback = undefined;
	},

	addLanguage: function (source, targetIds) {
		this.__insertLanguageData(
			{
				loaded: false,
				source: source,
			},
			targetIds
		);
	},

	loadLanguage: async function (source, targetIds) {
		const response = await this.__fetch(source);
		const data = await response.json();

		this.loadLanguageObject(data, targetIds);
	},

	loadLanguageObject: function (object, targetIds) {
		this.__insertLanguageData(
			{
				loaded: true,
				data: object,
			},
			targetIds
		);
	},

	isAvailable: function (langId) {
		return this.__lookup.hasOwnProperty(langId);
	},

	fillDocument: async function (langId) {
		// a list of the accepted languages for the user
		// contains:
		// - only `langId` if it is given
		// - `navigator.languages` if it supported
		// - only `navigator.language` if it is supported
		// - otherwise nothing
		let accept = langId ? [langId] : (navigator.languages || [navigator.language] || []);

		// take the fist available language
		let userLanguage;
		for (const id of accept) {
			if (this.isAvailable(id)) {
				userLanguage = await this.__getLanguage(id);
				document.documentElement.lang = id;
				break;
			}
		}

		let fallback = await this.__getLanguage(this.__fallback);
		if (userLanguage === undefined) {
			userlanguage = {};
			document.documentElement.lang = this.__fallback;
		}

		let key, content;

		for (let node of document.getElementsByClassName("elz")) {
			key = undefined;
			for (const cls of node.classList) {
				if (cls.startsWith("_")) {
					key = cls.substring(1);
					break;
				}
			}
			if (key !== undefined) {
				content = userLanguage[key] || fallback[key];
				if (content !== undefined) {
					node.innerText = content;
				}
				else {
					node.innerText = "<missing #" + key + ">";
				}
			}
		}
	},

	__insertLanguageData: function (data, targetIds) {
		if (!Array.isArray(targetIds)) {
			targetIds = [targetIds];
		}

		this.__languages.push(data);
		const index = this.__languages.length - 1;

		for (const id of targetIds) {
			this.__lookup[id] = index;
		}
	},

	__getLanguage: async function (langId) {
		if (this.isAvailable(langId)) {
			let lang = this.__languages[this.__lookup[langId]];

			if (!lang.loaded) {
				const response = await this.__fetch(lang.source);
				lang.data = await response.json();
				lang.loaded = true;
			}

			return lang.data;
		} else {
			return {};
		}
	},

	__fetch: async function (url) {
		try {
			return await fetch(url);
		}
		catch {
			throw "ELIZALINA: unable to fetch <" + url + ">"
		}
	},
};