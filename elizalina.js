/**
 * Client-side translation tool.
 * 
 * @author Louis DEVIE
 * @version 2.1.0-dev
 */

const elizalina = {
	__languages: [],
	__lookup: {},
	__fallback: [],

	addLanguage: function (source, targetIds, ...otherTargets) {
		this.__insertLanguageData(
			{
				loaded: false,
				source: source,
			},
			targetIds,
			otherTargets,
		);
	},

	loadLanguage: async function (source, targetIds, ...otherTargets) {
		const response = await this.__fetch(source);
		const data = await response.json();

		this.loadLanguageObject(data, targetIds, ...otherTargets);
	},

	loadLanguageObject: function (object, targetIds, ...otherTargets) {
		this.__insertLanguageData(
			{
				loaded: true,
				data: object,
			},
			targetIds,
			otherTargets,
		);
	},

	isAvailable: function (langId) {
		return this.__lookup.hasOwnProperty(langId);
	},

	fillDocument: async function (...langIds) {
		let accept;
		if (langIds) {
			accept = langIds;
		}
		else {
			accept = navigator.languages || [navigator.language];
		}

		if (this.__fallback) accept.push(this.__fallback);

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

		return userLanguageId;
	},

	setFallback: function (langId) {
		this.__fallback = langId;
	},

	__insertLanguageData: function (data, targetIds, otherTargetIds) {
		if (!Array.isArray(targetIds)) {
			targetIds = [targetIds];
		}

		this.__languages.push(data);
		const index = this.__languages.length - 1;

		for (const id of targetIds.concat(otherTargetIds)) {
			this.__lookup[id] = index;
		}
	},

	__getLanguage: async function (langId) {
		let lang = this.__languages[this.__lookup[langId]];

		if (!lang.loaded) {
			const response = await this.__fetch(lang.source);
			lang.data = await response.json();
			lang.loaded = true;
		}

		return lang.data;
	},

	__fetch: async function (url) {
		try {
			return await fetch(url);
		}
		catch {
			throw "ELIZALINA: unable to fetch <" + url + ">";
		}
	},
};