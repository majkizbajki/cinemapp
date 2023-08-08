import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

type VotesAverageSize = 'small' | 'large';

export interface VotesAverageProps {
    size: VotesAverageSize;
    votesAverage: number;
}

export const VotesAverage = ({ size, votesAverage }: VotesAverageProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <View style={style.votesDetailsContainer}>
            <IoniconsIcon name="star" size={size === 'large' ? 16 : 12} color={colors.secondary} />
            <IoniconsIcon
                name="star"
                size={size === 'large' ? 16 : 12}
                color={votesAverage > 2 ? colors.secondary : colors.primary}
            />
            <IoniconsIcon
                name="star"
                size={size === 'large' ? 16 : 12}
                color={votesAverage > 4 ? colors.secondary : colors.primary}
            />
            <IoniconsIcon
                name="star"
                size={size === 'large' ? 16 : 12}
                color={votesAverage > 6 ? colors.secondary : colors.primary}
            />
            <IoniconsIcon
                name="star"
                size={size === 'large' ? 16 : 12}
                color={votesAverage > 8 ? colors.secondary : colors.primary}
            />
            <Text
                variant={size === 'large' ? 'labelLarge' : 'labelMedium'}
                style={style.votes}
            >{`${votesAverage.toPrecision(3)}/10`}</Text>
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        votesDetailsContainer: {
            flexDirection: 'row'
        },
        votes: {
            marginLeft: 8,
            color: colors.primary
        }
    });
