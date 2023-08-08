import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export interface MovieOverviewProps {
    genres: string[];
    isRank: boolean;
    overview: string;
    productionCountries: string[];
}

export const MovieOverview = ({ genres, overview, productionCountries }: MovieOverviewProps) => {
    const { t } = useTranslation();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text variant="bodySmall" style={styles.overview}>
                {overview}
            </Text>
            <Text style={styles.genres} variant="bodyMedium">
                {`${t('movieDetails.genre')}: `}
                <Text variant="bodySmall">{genres.join(', ').toLowerCase()}</Text>
            </Text>
            <Text style={styles.production} variant="bodyMedium">
                {`${t('movieDetails.productionCountry')}: `}
                <Text variant="bodySmall">{productionCountries.join(', ')}</Text>
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    overview: {
        textAlign: 'justify',
        marginBottom: 32
    },
    genres: {
        marginBottom: 16
    },
    production: {
        marginBottom: 32
    }
});
