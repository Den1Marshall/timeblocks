export interface Background {
  primary: string;
  secondary: string;
  tertiary: string;
}

export const backgroundLight: Background = {
  primary: 'rgba(255, 255, 255, 1)',
  secondary: 'rgba(242, 242, 247, 1)',
  tertiary: 'rgba(255, 255, 255, 1)',
};

export const backgroundDarkBase: Background = {
  primary: 'rgba(0, 0, 0, 1)',
  secondary: 'rgba(28, 28, 30, 1)',
  tertiary: 'rgba(44, 44, 46, 1)',
};

export const backgroundDarkElevated: Background = {
  primary: 'rgba(28, 28, 30, 1)',
  secondary: 'rgba(44, 44, 46, 1)',
  tertiary: 'rgba(58, 58, 60, 1)',
};
