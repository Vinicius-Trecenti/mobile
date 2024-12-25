import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";
import { fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
    },

    content: {
        flexDirection: "row",
        backgroundColor: colors.green.soft,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        gap: 10,
    },

    title: {
        color: colors.gray[500],
        fontFamily: fontFamily.medium,
        marginBottom: 12,
        fontSize: 14,
    },
    code: {
        color: colors.gray[600],
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        textTransform: "uppercase",
    },
})