import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { ElevationLevels, MD3Colors } from 'react-native-paper/lib/typescript/src/types';

interface IElevatedButtonProps {
    buttonStyle?: StyleProp<ViewStyle>;
    buttonSurfaceStyle?: StyleProp<ViewStyle>;
    children?: ReactNode;
    elevation: ElevationLevels;
    onPress: () => void;
}

export const ElevatedButton = ({
    buttonStyle,
    buttonSurfaceStyle,
    children,
    elevation,
    onPress
}: IElevatedButtonProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Surface elevation={elevation} style={buttonSurfaceStyle ?? style.buttonSurface}>
            <TouchableOpacity style={buttonStyle ?? style.button} onPress={onPress}>
                {children}
            </TouchableOpacity>
        </Surface>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        buttonSurface: {
            width: 64,
            height: 64,
            backgroundColor: colors.background,
            borderRadius: 32,
            marginLeft: 16,
            marginTop: 16
        },
        button: {
            flex: 1,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
