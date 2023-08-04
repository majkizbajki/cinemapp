import { useTranslation } from 'react-i18next';
import { Locales } from '../../i18n/i18n';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILanguageButtonProps {
    language: keyof typeof Locales;
    title: string;
}

export const LanguageButton = ({ language, title }: ILanguageButtonProps) => {
    const { i18n } = useTranslation();

    const { colors } = useTheme();
    const style = styles(colors, i18n.language === language);

    const handleChangeLanguage = async () => {
        if (i18n.language !== language) {
            try {
                await AsyncStorage.setItem('language', language);
                i18n.changeLanguage(language);
            } catch (error) {
                // TODO: Error handler
            }
        }
    };

    return (
        <TouchableOpacity onPress={handleChangeLanguage} style={style.button}>
            <Text variant="bodyMedium" style={style.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = (colors: MD3Colors, picked: boolean) =>
    StyleSheet.create({
        button: {
            width: 160,
            height: 48,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: picked ? colors.backdrop : colors.shadow
        },
        title: {
            color: picked ? '#fff' : colors.primary
        }
    });
