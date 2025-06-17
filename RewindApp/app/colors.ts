export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  border: string;
  accent: string;
}

export const lightColors: ThemeColors = {
  background: '#f9fafb',
  card: '#ffffff',
  text: '#18181b',
  secondaryText: '#6b7280',
  border: '#f3f4f6',
  accent: '#fb5607',
};

export const darkColors: ThemeColors = {
  background: '#1e1e1e',
  card: '#27272a',
  text: '#f3f4f6',
  secondaryText: '#a1a1aa',
  border: '#3f3f46',
  accent: '#fb5607',
};
