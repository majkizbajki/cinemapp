import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../atoms';

export const LanguageContainer = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.languageContainer}>
            <Text variant="titleMedium" style={styles.language}>
                {t('settings.language')}
            </Text>
            <View style={styles.buttons}>
                <LanguageButton language="en" title="English" />
                <LanguageButton language="pl" title="Polski" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    language: {
        width: 96,
        marginLeft: 32
    },
    buttons: {
        flex: 1,
        alignItems: 'center'
    }
});
