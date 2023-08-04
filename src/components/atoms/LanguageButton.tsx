import { useTranslation } from 'react-i18next';
import { ElevatedButton } from './ElevatedButton';
import { Locales } from '../../i18n/i18n';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

interface ILanguageButtonProps {
    language: keyof typeof Locales;
    title: string;
}

export const LanguageButton = ({ language, title }: ILanguageButtonProps) => {
    const { i18n } = useTranslation();

    const { colors } = useTheme();
    const style = styles(colors, i18n.language === language);

    return (
        <ElevatedButton
            elevation={1}
            onPress={() => i18n.changeLanguage(language)}
            buttonSurfaceStyle={style.buttonSurface}
            buttonStyle={style.button}
        >
            <View>
                <Text variant="bodyMedium" style={style.title}>
                    {title}
                </Text>
            </View>
        </ElevatedButton>
    );
};

const styles = (colors: MD3Colors, picked: boolean) =>
    StyleSheet.create({
        buttonSurface: {
            width: 160,
            height: 48,
            backgroundColor: picked ? colors.backdrop : colors.shadow,
            borderRadius: 16,
            marginLeft: 16,
            marginTop: 16
        },
        button: {
            flex: 1,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            color: picked ? '#fff' : colors.primary
        }
    });
