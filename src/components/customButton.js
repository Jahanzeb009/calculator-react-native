import { useTheme } from "@react-navigation/native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton(props) {

    let fontSize = { title: 20, subtitle: 16, body: 14, button: 14 }

    const { colors } = useTheme()

    const style = StyleSheet.create({
        TOS: {
            margin: 4,
            elevation: 2,
            borderRadius: 20,
            alignSelf: 'center',
            shadowColor: '#000',
            paddingVertical: 10,
            paddingHorizontal: '8%',
            justifyContent: 'center',
            backgroundColor: colors.primary
        },
        TS: {
            textAlign: 'center',
            fontSize: fontSize.body,
        }
    })

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.onPress()}
                style={{ ...style.TOS, ...props.bgStyle }}
            >
                <Text
                    style={{ ...style.TS, color: colors.background, ...props.textStyle }}
                >
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
