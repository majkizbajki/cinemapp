import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import tinycolor from 'tinycolor2';
import { ThemeContainer } from '../molecules';

interface SettingsProps {
    toggleSheet: () => void;
}

export const Settings = ({ toggleSheet }: SettingsProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <>
            <Pressable style={style.backdrop} onPress={toggleSheet} />
            <Animated.View
                style={style.sheet}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}
            >
                <View style={style.theme}>
                    <ThemeContainer />
                </View>
            </Animated.View>
        </>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        backdrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: tinycolor('#000').setAlpha(0.4).toRgbString(),
            zIndex: 1
        },
        sheet: {
            backgroundColor: colors.shadow,
            padding: 16,
            height: 192,
            width: '100%',
            position: 'absolute',
            bottom: -20 * 1.1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            zIndex: 1
        },
        theme: {
            marginTop: 48
        }
    });
