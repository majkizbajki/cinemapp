import { Platform } from 'react-native';

type Font = {
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    fontStyle?: 'normal' | 'italic' | undefined;
};

type MD3Type = {
    fontFamily?: string;
    letterSpacing?: number;
    fontWeight?: Font['fontWeight'];
    lineHeight?: number;
    fontSize?: number;
    fontStyle?: Font['fontStyle'];
};

export const fontConfig: Record<string, MD3Type> = {
    // Medium 500
    // (Figma: Medium 8)
    labelMedium: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Regular' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '500',
        fontSize: 11,
        letterSpacing: 0.5,
        lineHeight: 16
    },
    // Bold 700
    // (Figma: Bold 8)
    labelSmall: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '700'
    },
    // Regular 400
    // (Figma: Regular 10)
    bodySmall: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Regular' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '400',
        fontSize: 14,
        letterSpacing: 0.25,
        lineHeight: 20
    },
    // Bold 700
    // (Figma: Bold 10)
    bodyMedium: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '700'
    },
    // Bold 700
    // (Figma: Bold 16)
    headlineSmall: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '700'
    },
    // Bold 700
    // (Figma: Bold 14)
    titleLarge: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '700'
    },
    // Bold 700
    // (Figma: Bold 12)
    titleMedium: {
        fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins',
        fontWeight: Platform.OS === 'android' ? undefined : '700'
    }
};
