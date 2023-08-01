import { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { PaperProvider, configureFonts } from 'react-native-paper';
import { DarkTheme, LightTheme, fontConfig } from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IThemeContext {
    themeMode: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
    themeMode: 'light',
    toggleTheme: () => {}
});

interface IThemeProvider {
    children: ReactNode;
}

export const ThemeProvider: FC<IThemeProvider> = ({ children }: IThemeProvider) => {
    const [variant, setVariant] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        checkLocalThemeMode();
    }, []);

    const toggleTheme = async () => {
        try {
            await AsyncStorage.setItem('theme', variant === 'dark' ? 'light' : 'dark');
            setVariant(state => (state === 'dark' ? 'light' : 'dark'));
        } catch (e) {
            // TODO
            // Add error
        }
    };

    const checkLocalThemeMode = async () => {
        try {
            const deviceScheme = await AsyncStorage.getItem('deviceTheme');
            if (deviceScheme === 'dark') {
                toggleTheme();
            }
        } catch {
            // Do nothing
            // Keep initial state - light theme
        }
    };

    const themeMode = useMemo(
        () => ({
            toggleTheme,
            themeMode: variant
        }),
        [variant]
    );

    const theme = useMemo(() => {
        if (variant === 'dark') {
            return {
                ...DarkTheme,
                fonts: configureFonts({ config: fontConfig })
            };
        }
        return {
            ...LightTheme,
            fonts: configureFonts({ config: fontConfig })
        };
    }, [variant]);

    return (
        <ThemeContext.Provider value={themeMode}>
            <PaperProvider theme={theme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
};
