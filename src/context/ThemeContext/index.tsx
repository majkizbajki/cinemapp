import { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { PaperProvider, configureFonts } from 'react-native-paper';
import { DarkTheme, LightTheme, fontConfig } from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../i18n/useLanguage';

interface IThemeContext {
    themeMode: 'light' | 'dark';
    toggleTheme: (mode: 'light' | 'dark') => void;
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

    const { getDeviceLanguage } = useLanguage();

    useEffect(() => {
        checkLocalThemeMode();
        getDeviceLanguage();
    }, []);

    const toggleTheme = async (mode: 'light' | 'dark') => {
        try {
            await AsyncStorage.setItem('theme', mode);
            setVariant(mode);
        } catch (e) {
            // TODO
            // Add error
        }
    };

    const checkLocalThemeMode = async () => {
        try {
            const deviceScheme = await AsyncStorage.getItem('theme');
            if (deviceScheme === 'dark') {
                toggleTheme('dark');
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
