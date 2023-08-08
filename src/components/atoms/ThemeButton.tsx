import { ReactNode, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { ThemeContext } from '../../context/ThemeContext';

interface ThemeButtonProps {
    children: ReactNode;
    theme: 'light' | 'dark';
}

export const ThemeButton = ({ children, theme }: ThemeButtonProps) => {
    const { themeMode, toggleTheme } = useContext(ThemeContext);

    const { colors } = useTheme();
    const style = styles(colors, themeMode === theme);

    return (
        <TouchableOpacity
            style={style.button}
            onPress={() => toggleTheme(theme === 'dark' ? 'dark' : 'light')}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = (colors: MD3Colors, isCurrentTheme: boolean) =>
    StyleSheet.create({
        button: {
            width: 48,
            height: 48,
            borderRadius: 24,
            marginHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isCurrentTheme ? colors.backdrop : undefined
        }
    });
