function switchLanguage(newLang) {
	localStorage.setItem('preferredLanguage', newLang);

	const currentPath = window.location.pathname;
	
	if (newLang === 'es') {
		// If we're switching to Spanish, add /es/
		if (!currentPath.startsWith('/es/')) {
			window.location.href = '/es' + (currentPath === '/' ? '' : currentPath);
		}
	} else {
		// If we're switching to English, remove /es/
		if (currentPath.startsWith('/es/')) {
			window.location.href = currentPath.replace('/es', '') || '/';
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const langButtons = document.querySelectorAll('[data-lang]');
	langButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			const newLang = e.target.dataset.lang;
			switchLanguage(newLang);
		});
	});

	const storedLang = localStorage.getItem('preferredLanguage');
	const currentPath = window.location.pathname;
	const isSpanishPath = currentPath.startsWith('/es/');
	
	if (storedLang === 'es' && !isSpanishPath) {
		switchLanguage('es');
	} else if (storedLang === 'en' && isSpanishPath) {
		switchLanguage('en');
	}
});
