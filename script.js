const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = theme;

    try {
        localStorage.setItem('theme', theme);
    } catch {
        // The current theme still works when browser storage is unavailable.
    }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('is-pending');
            observer.unobserve(entry.target);
        });
    });

    document.querySelectorAll('.reveal-up').forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) return;
        section.classList.add('is-pending');
        observer.observe(section);
    });

    document.addEventListener('focusin', event => {
        for (let element = event.target; element; element = element.parentElement) {
            element.classList.remove('is-pending');
            observer.unobserve(element);
        }
    });
}
