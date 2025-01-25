function getTranslationSlug(newLang) {
	const isPost = document.querySelector('[data-type="post"]') !== null;
	if (!isPost) return null;
	
	const button = document.querySelector(`[data-lang="${newLang}"]`);
	return button?.hasAttribute("data-translation") ? button.dataset.translation : null;
}

function getNewPath(newLang, currentPath) {
	const isPost = document.querySelector('[data-type="post"]') !== null;

	if (isPost) {
		const translationSlug = getTranslationSlug(newLang);
		if (translationSlug) {
			return newLang === "es" ? `/es/${translationSlug}` : `/${translationSlug}`;
		}
		// If it's a post without translation, go to home page
		return newLang === "es" ? "/es" : "/";
	}

	// For non-post pages, just add/remove the /es prefix
	return newLang === "es" 
		? currentPath === "/" ? "/es" : `/es${currentPath}`
		: currentPath === "/es" ? "/" : currentPath.replace("/es", "");
}

function switchLanguage(newLang) {
	localStorage.setItem("preferredLanguage", newLang);
	const currentPath = window.location.pathname;

	// Don't redirect if already in correct language section
	const isSpanish = currentPath.startsWith("/es");
	if ((newLang === "es" && isSpanish) || (newLang === "en" && !isSpanish)) {
		return;
	}

	const newPath = getNewPath(newLang, currentPath);

	window.location.href = newPath;
}

document.addEventListener("DOMContentLoaded", () => {
	const langButtons = document.querySelectorAll("[data-lang]");
	langButtons.forEach(button => {
		button.addEventListener("click", e => {
			const newLang = e.target.dataset.lang;
			switchLanguage(newLang);
		});
	});

	const storedLang = localStorage.getItem("preferredLanguage");
	const currentPath = window.location.pathname;
	const isSpanishPath = currentPath.startsWith("/es/");

	if (storedLang === "es" && !isSpanishPath) {
		switchLanguage("es");
	} else if (storedLang === "en" && isSpanishPath) {
		switchLanguage("en");
	}
});
