import { StyleSheet, View } from 'react-native';
import { VotesAmount, VotesAverage } from '../atoms';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Text, useTheme } from 'react-native-paper';
import { MovieOverviewProps, MovieOverview } from '../molecules/MovieOverview';

interface MovieDetailsProps extends MovieOverviewProps {
    title: string;
    votesAverage: number;
    votesAmount: number;
}

export const MovieDetails = ({
    genres,
    isRank,
    overview,
    productionCountries,
    title,
    votesAmount,
    votesAverage
}: MovieDetailsProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <View style={{ ...style.container, marginTop: isRank ? 0 : 24 }}>
            <Text variant="titleMedium" style={style.title}>
                {title}
            </Text>
            <View style={style.votesContainer}>
                <VotesAverage votesAverage={votesAverage} size="small" />
                <VotesAmount votesAmount={votesAmount} size="small" />
            </View>
            <MovieOverview
                genres={genres}
                isRank={isRank}
                overview={overview}
                productionCountries={productionCountries}
            />
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 32
        },
        title: {
            color: colors.primary,
            marginVertical: 8
        },
        votesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    });
