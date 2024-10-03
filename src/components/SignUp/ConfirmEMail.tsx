import React, { useEffect, useState } from 'react';
import { Center, HStack, Text, Heading, Icon, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConfirmEmail = ({ navigation }: { navigation: any }) => {
    const [countdown, setCountdown] = useState<number>(5); // Geri sayım başlangıç değeri

    useEffect(() => {
        // Geri sayım başlatma
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(timer); // Geri sayım bittiğinde timer'ı temizle
                    setTimeout(() => {
                        navigation.navigate("Login"); // 3 saniye sonra Login sayfasına yönlendir
                    }, 3000);
                    return 0; // Geri sayımı sıfırla
                }
                return prev - 1; // Geri sayımı azalt
            });
        }, 1000); // Her 1 saniyede bir güncelle

        return () => clearInterval(timer); // Temizleme işlemi
    }, []);

    return (
        <VStack bg="#fff" h="full" w="full" alignItems={"center"} _text={{ color: "white" }}>
            <Ionicons name="checkmark-circle" size={30} color="green" />
            <Heading paddingX={"12px"} marginBottom={"24px"}>
                <Text color={"brand.800"}> Kayıt Başarılı!</Text>
            </Heading>
            <Text fontSize={15} paddingX={4}>Mail adresinizi doğruladıktan sonra giriş yapabilirsiniz.</Text>
            {/* Geri Sayım */}
            <Text marginTop={4} fontSize={14}>
                {countdown} saniye içinde
            </Text>
            <Text fontSize={14}>
                Giriş Sayfasına Yönlendiriliyorsunuz.
            </Text>
        </VStack>
    );
};

export default ConfirmEmail;
