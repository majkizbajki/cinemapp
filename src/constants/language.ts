import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';

export type AvailableLanguages = 'en' | 'pl';

export type Language = {
    shortName: AvailableLanguages;
    image: AvatarImageSource;
};

export const languages: Language[] = [
    {
        shortName: 'en',
        image: require('../assets/images/language/united-kingdom.png')
    },
    {
        shortName: 'pl',
        image: require('../assets/images/language/poland.png')
    }
];
