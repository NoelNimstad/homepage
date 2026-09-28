const updateContent = data =>
{
	document.querySelectorAll("[data-i18n]").forEach(e =>
	{
		const key = e.getAttribute("data-i18n");
		e.textContent = data[key];
	});
}

const toggleLanguagePreference = lang =>
{
	localStorage.setItem("language", lang);
}

const fetchLanguageData = async lang =>
{
	const response = await fetch(`lang/${ lang }.json`);
	return response.json();
}

const changeLanguage = async () =>
{
	storage_language = storage_language === "en" ? "sv" : "en";
	
	toggleLanguagePreference(storage_language);
	
	const lang_data = await fetchLanguageData(storage_language);
	updateContent(lang_data);
}

let storage_language = "";
(async () =>
{
	storage_language = localStorage.getItem("language") || "en";
	const lang_data = await fetchLanguageData(storage_language);
	updateContent(lang_data);
})();