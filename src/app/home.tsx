import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import  Categories  from "@/components/categories";

export default function Home() {

    const [categories, setCategories] = useState();

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Erro ao buscar categorias");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Categories />
        </View>
    );
} 