import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ThemeButton } from '../atoms/ThemeButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeContainer = () => {
    const { t } = useTranslation();

    const { colors } = useTheme();
    const { themeMode } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <Text variant="titleMedium" style={styles.label}>
                {t('settings.theme')}
            </Text>
            <View style={styles.themeContainer}>
                <ThemeButton theme="light">
                    <FeatherIcon
                        name="sun"
                        size={24}
                        color={themeMode === 'dark' ? colors.primary : colors.background}
                    />
                </ThemeButton>
                <ThemeButton theme="dark">
                    <FeatherIcon name="moon" size={24} color={colors.primary} />
                </ThemeButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        width: 96,
        marginLeft: 32
    },
    themeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
