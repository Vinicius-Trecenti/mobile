import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import  Categories  from "@/components/categories";
import { CategoriesProps } from "@/components/categories";

export default function Home() {

    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category , setCategory] = useState("");

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
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
            <Categories data={categories} onSelected={setCategory} selected={category} />
        </View>
    );
}