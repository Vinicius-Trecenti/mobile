import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";
import { fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        backgroundColor: colors.gray[100],
    },

    content: {
        gap: 12,
        padding: 24,
        paddingBottom: 100,
    },

    indicator:{
        width: 80,
        height: 4,
        backgroundColor: colors.gray[300],
    },

    title: {
        color: colors.gray[600]
    }


})