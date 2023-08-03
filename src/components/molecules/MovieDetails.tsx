import { StyleSheet, View } from 'react-native';
import { IMovieOverviewProps, MovieOverview } from '../atoms';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Text, useTheme } from 'react-native-paper';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

interface IMovieDetailsProps extends IMovieOverviewProps {
    title: string;
    voteAverage: number;
    voteCount: number;
}

export const MovieDetails = ({
    genres,
    isRank,
    overview,
    productionCountries,
    title,
    voteAverage,
    voteCount
}: IMovieDetailsProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <View style={{ ...style.container, marginTop: isRank ? 0 : 24 }}>
            <Text variant="titleMedium" style={style.title}>
                {title}
            </Text>
            <View style={style.votesContainer}>
                <View style={style.votesDetailsContainer}>
                    <IoniconsIcon name="star" size={16} color={colors.secondary} />
                    <IoniconsIcon
                        name="star"
                        size={16}
                        color={voteAverage > 2 ? colors.secondary : colors.primary}
                    />
                    <IoniconsIcon
                        name="star"
                        size={16}
                        color={voteAverage > 4 ? colors.secondary : colors.primary}
                    />
                    <IoniconsIcon
                        name="star"
                        size={16}
                        color={voteAverage > 6 ? colors.secondary : colors.primary}
                    />
                    <IoniconsIcon
                        name="star"
                        size={16}
                        color={voteAverage > 8 ? colors.secondary : colors.primary}
                    />
                    <Text variant="labelLarge" style={style.votes}>{`${voteAverage.toPrecision(
                        3
                    )}/10`}</Text>
                </View>
                <View style={style.votesDetailsContainer}>
                    <AntDesignIcon name="like2" color={colors.primary} size={16} />
                    <Text variant="labelLarge" style={style.votes}>
                        {voteCount}
                    </Text>
                </View>
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
            marginBottom: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        votesDetailsContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        votes: {
            marginLeft: 8
        }
    });
