import { View, Text } from 'react-native'
import { s } from "./styles"
import { Step } from '../step'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
export default function Steps() { 
    return (
        <View style={s.container}>
            <Text style={s.title}>Veja como funciona:</Text>

            <Step
                title="Encontre estabelecimentos"
                description="Veja locais perto de voce que são parceiros Nearby"
                icon={IconMapPin}

            />
            
            <Step
                title="Ative o cupom com QR Code"
                description="Escaneie o código no estabelecimento para usar o beneficio"
                icon={IconQrcode}
            />
            
            <Step
                title="Garanta vantagens perto de voce"
                description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos"
                icon={IconTicket}
            />
        </View>
    )
}