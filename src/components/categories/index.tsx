import { View, Text } from "react-native";
import { Category } from "../category";

export default function categories() { 
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Category name="Categoria 1" />
        </View>
    );
}
