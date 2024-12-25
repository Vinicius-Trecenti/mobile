
import { Text, View } from "react-native";
import { s } from "./styles";
import { IconProps } from "@tabler/icons-react-native";
import { colors } from "@/styles/theme";

type Props = {
    description: string;
    icon: React.ComponentType<IconProps>;
};

export function Info({ description, icon: Icon }: Props) {
    return (
        <View style={s.container}>
            <Icon size={16} color={colors.gray[400]} />
            <Text style={s.text}>{description}</Text>
        </View>
    );
}