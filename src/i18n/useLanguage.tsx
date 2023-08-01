import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { AvailableLanguages } from '../constants/language';

export const useLanguage = () => {
    const { i18n } = useTranslation();

    const getDeviceLanguage = async () => {
        try {
            const language = await AsyncStorage.getItem('language');
            if (language) {
                i18n.changeLanguage(language);
            }
        } catch {
            i18n.changeLanguage('en');
        }
    };

    const setLanguage = async (language: AvailableLanguages) => {
        try {
            await AsyncStorage.setItem('language', language);
            i18n.changeLanguage(language);
        } catch (error) {
            // TODO
            // Handle error here
        }
    };

    return { getDeviceLanguage, setLanguage };
};
