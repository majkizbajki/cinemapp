import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

interface ErrorScreenProps {
    errorMessage: string;
    onPress: () => void;
}

export const ErrorScreen = ({ errorMessage, onPress }: ErrorScreenProps) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <AntDesignIcon name="arrowleft" color={colors.primary} size={24} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text variant="titleLarge" style={styles.title}>
                    {`${t('errors.error')}!`}
                </Text>
                <Text variant="bodySmall" style={styles.message}>
                    {errorMessage}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    button: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    content: {
        flex: 0.8,
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        marginBottom: 32
    },
    message: {
        marginHorizontal: 16,
        textAlign: 'center'
    }
});
