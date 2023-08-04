import { MD3DarkTheme, MD3Theme } from 'react-native-paper';

export const DarkTheme: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#161C30',
        primary: '#E8E8E8',
        secondary: '#FC094B',
        shadow: '#2C3656',
        backdrop: '#FC094B'
    }
};
