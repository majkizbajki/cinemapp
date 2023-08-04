import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IVotesAmountProps, IVotesAverageProps, VotesAmount, VotesAverage } from '../atoms';
import Config from 'react-native-config';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

export type MovieTileSize = 'small' | 'large';

interface IMovieTileProps extends IVotesAmountProps, IVotesAverageProps {
    id: number;
    imagePath: string;
    size: MovieTileSize;
    title: string;
}

export const MovieTile = ({
    id,
    imagePath,
    title,
    size,
    votesAmount,
    votesAverage
}: IMovieTileProps) => {
    const { colors } = useTheme();
    const style = styles(colors, size);

    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            style={style.container}
            onPress={() => navigate('DetailsScreen', { movieId: id })}
        >
            <Image
                resizeMode="contain"
                source={
                    imagePath
                        ? { uri: `${Config.IMAGES_URL}${imagePath}` }
                        : require('../../assets/images/popcorn.png')
                }
                style={style.image}
            />
            <Text variant={'titleMedium'} numberOfLines={2} style={style.title}>
                {title}
            </Text>
            <View style={style.votes}>
                <VotesAverage votesAverage={votesAverage} size={size} />
                <View style={size === 'small' ? style.votesAmount : undefined}>
                    <VotesAmount votesAmount={votesAmount} size={size} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = (colors: MD3Colors, size: MovieTileSize) =>
    StyleSheet.create({
        container: {
            width: size === 'large' ? 288 : 160,
            paddingHorizontal: 16,
            marginBottom: 16
        },
        image: {
            height: size === 'large' ? 384 : 192,
            borderRadius: 16
        },
        title: {
            marginTop: 12,
            marginLeft: 8,
            color: colors.primary
        },
        votes: {
            marginTop: size === 'large' ? 8 : 4,
            marginLeft: 8,
            flexDirection: size === 'large' ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: size === 'large' ? 'center' : undefined
        },
        votesAmount: {
            marginTop: 8,
            alignItems: 'flex-end'
        }
    });
