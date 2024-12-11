import { TouchableOpacity, TouchableOpacityProps, Text, TextProps } from "react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";

function Button({children, style}: TouchableOpacityProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[s.container, style]}>
            {children}
        </TouchableOpacity>
    );
}

function Title({children}: TextProps) {
    return (
        <Text style={s.title}>
            {children}
        </Text>
    );
}

Button.Title = Title;

export { Button };