import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const LightTheme: MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        background: '#E8E8E8',
        primary: '#161C30',
        secondary: '#FC094B',
        shadow: '#E2E2E2',
        surface: '#BABABA'
    }
};
