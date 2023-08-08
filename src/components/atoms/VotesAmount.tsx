import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type VotesAmountSize = 'small' | 'large';

export interface VotesAmountProps {
    size: VotesAmountSize;
    votesAmount: number;
}

export const VotesAmount = ({ size, votesAmount }: VotesAmountProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <View style={style.votesDetailsContainer}>
            <AntDesignIcon name="like2" color={colors.primary} size={size === 'large' ? 16 : 12} />
            <Text variant={size === 'large' ? 'labelLarge' : 'labelMedium'} style={style.votes}>
                {votesAmount}
            </Text>
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        votesDetailsContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        votes: {
            marginLeft: 8,
            color: colors.primary
        }
    });
