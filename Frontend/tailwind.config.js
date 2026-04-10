export const content = ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
];
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      primary: "#FF5733",
      'theme-bg': 'var(--bg-color)',
      'theme-text': 'var(--text-color)',
      'theme-card': 'var(--card-bg)',
      'theme-border': 'var(--border-color)',
      'theme-sidebar': 'var(--sidebar-bg)',
    },
    rotate: {
      '17': '17deg',
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
    },
    borderImageSource: {
      'custom-gradient': 'linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 18.54%)',
    },
    screens: {
      '3xl': '1900px',
    },
  },
};
export const plugins = [];