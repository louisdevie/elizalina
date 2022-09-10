const elizalina = {
	__languages: [],
	__lookup: {},

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
		// - only `navigator.language`
		let accept = langId ? [langId] : (navigator.languages || [navigator.language]);

		let base = document.documentElement.lang;

		// take the fist available language
		let userLanguage, userLanguageId;
		for (const id of accept) {
			if (this.isAvailable(id)) {
				userLanguage = await this.__getLanguage(id);
				userLanguageId = id;
				break;
			}
			else if (id === base) {
				break;
			}
		}

		if (userLanguage !== undefined) {
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
					content = userLanguage[key];
					if (content !== undefined) {
						node.innerText = content;
					}
					else
					{
						console.warn("missing #" + key + " in " + userLanguageId + " translation")
					}
				}
			}

			document.documentElement.lang = userLanguageId;
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