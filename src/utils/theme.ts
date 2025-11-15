export type Theme = 'light' | 'dark';

export function getThemePreference(): Theme {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
}

export function saveThemePreference(theme: Theme): void {
  localStorage.setItem('theme', theme);
}

export function applyTheme(theme: Theme): void {
  document.body.setAttribute('data-theme', theme);
}

export function getSystemTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}
