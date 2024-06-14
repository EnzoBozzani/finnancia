export type Color =
	| 'transparent'
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose';

export const colors: Color[] = [
	'transparent',
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose',
];

export const colorMap: { [key in Color]: { dark: string; light: string } } = {
	amber: {
		dark: '#451a03',
		light: '#fef3c7',
	},
	blue: {
		dark: '#172554',
		light: '#dbeafe',
	},
	cyan: {
		dark: '#083344',
		light: '#cffafe',
	},
	green: {
		dark: '#052e16',
		light: '#dcfce7',
	},
	indigo: {
		dark: '#1e1b4b',
		light: '#e0e7ff',
	},
	orange: {
		dark: '#431407',
		light: '#ffedd5',
	},
	pink: {
		dark: '#500724',
		light: '#fce7f3',
	},
	purple: {
		dark: '#3b0764',
		light: '#f3e8ff',
	},
	red: {
		dark: '#450a0a',
		light: '#fee2e2',
	},
	teal: {
		dark: '#042f2e',
		light: '#ccfbf1',
	},
	yellow: {
		dark: '#422006',
		light: '#fef9c3',
	},
	emerald: {
		dark: '#022c22',
		light: '#d1fae5',
	},
	fuchsia: {
		dark: '#4a044e',
		light: '#fae8ff',
	},
	lime: {
		dark: '#1a2e05',
		light: '#ecfccb',
	},
	rose: {
		dark: '#4c0519',
		light: '#fff1f2',
	},
	sky: {
		dark: '#082f49',
		light: '#e0f2fe',
	},
	violet: {
		dark: '#2e1065',
		light: '#ede9fe',
	},
	transparent: {
		dark: 'transparent',
		light: 'transparent',
	},
};
