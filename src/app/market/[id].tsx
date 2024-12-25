import { Text, View, Alert, Modal } from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";
import { router } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useState, useRef } from "react";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { useCameraPermissions, CameraView } from "expo-camera";
type DataProps = PropsDetails & {
    cover: string
};

export default function Market() {
    const params = useLocalSearchParams<{ id: string }>()
    const [data, setData] = useState<DataProps>();
    const [isLoading, setIsLoading] = useState(true);
    const [coupon, setCoupon] = useState<string | null>();
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [couponIsFetching, setCouponIsFetching] = useState(false);
    const qrLocked = useRef(false);

    console.log(params.id);
    async function fetchMarket() {
        try{
            const { data } = await api.get("/markets/" + params.id);
            setData(data);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao buscar estabelecimento", [
                { text: "Ok", onPress: () => router.back() },
            ]);
        }
    }

    async function handleOpenCameraModal() {
        try {
            const { granted } = await requestPermission();

            if(!granted) {
                return Alert.alert("Permissão negada", "Precisamos da permissão para abrir a camera");
            }

            qrLocked.current = false;
            setIsVisibleCameraModal(true);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao abrir camera", [
                { text: "Ok", onPress: () => router.back() },
            ]);
        }
    }

    async function getCoupon(id: string) {
        try{
            setCouponIsFetching(true);
            const { data } = await api.patch("/coupons/" + id);
            Alert.alert("Cupom", data.coupon);
            setCoupon(data.coupon);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao buscar cupom", [
                { text: "Ok", onPress: () => router.back() },
            ])
        }
        finally {
            setCouponIsFetching(false);
        }

    }

    function handleUseCoupon(id: string) {
        setIsVisibleCameraModal(false);

        Alert.alert("Cupom", "Não é possivel reutilizar um cupom resgatado. Deseja realmente utilizar esse cupom?",
            [
                {style: "cancel", text: "Não"},
                {text: "Sim", onPress: () => getCoupon(id)}
            ]
        );
    }

    useEffect(() => {
        fetchMarket();
    }, [params.id, coupon])

    if (isLoading) {
        return <Loading />
    }

    if(!data) {
        return <Redirect href="/home" />;
    }

    return (
        <View style={{ flex: 1}}>
            <Cover uri={data.cover} />

            <Details data={data} />

            {coupon && <Coupon code={coupon} />}

            <View style={{ padding: 32 }} >
                <Button onPress={handleOpenCameraModal}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
                <CameraView
                    style={{flex: 1}}
                    facing="back"
                    onBarCodeScanned={({ data }) => {
                        if(data && !qrLocked.current) {
                            qrLocked.current = true;
                            setTimeout(() => handleUseCoupon(data), 500);
                        }
                    }}
                />

                <View style={{ position: "absolute", bottom: 32, right: 32, left: 32 }}>
                    <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={couponIsFetching}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}