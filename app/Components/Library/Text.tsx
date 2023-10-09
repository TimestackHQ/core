import { Text, TextProps } from "react-native";

export default function TextComponent({
    children,
    fontFamily,
    fontSize,
    style,
    ellipsizeMode,
    numberOfLines,
}: {
    children: any
    fontFamily: (
        "Athelas" |
        "Bold" |
        "Regular" |
        "Semi Bold"
    ),
    fontSize?: number,
    style?: any,
    ellipsizeMode?: TextProps["ellipsizeMode"],
    numberOfLines?: TextProps["numberOfLines"],
}) {

    const fontFamilies = {
        'Athelas': 'Athelas Bold',
        'Bold': 'Red Hat Display Bold',
        'Regular': 'Red Hat Display Regular',
        'Semi Bold': 'Red Hat Display Semi Bold'
    }
    return <Text
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={{
            fontFamily: fontFamilies[fontFamily],
            fontSize: fontSize ? fontSize : undefined,
            ...style
        }}
    >
        {children}
    </Text>
}