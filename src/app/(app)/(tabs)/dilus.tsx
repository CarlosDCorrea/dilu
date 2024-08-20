import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Image } from "expo-image";
import { Link } from "expo-router";

import { FlashList } from "@shopify/flash-list";

import { Montserrat, MontserratBold } from "@/components/text/StyledText";
import { View } from "@/components/Themed";

import { dilu } from "@/types/dilu";
import { list } from "@/api/dilu";


function getDilus(setDilus: React.Dispatch<React.SetStateAction<dilu[]>>): void {
    list()
        .then(data => {
            console.log(data)
            setDilus(data.results);
        })
        .catch(error => console.log(error))
}


function DilusHome() {
    const [dilus, setDilus] = useState<dilu[]>([]);

    const icon = require('@/images/sections.png');

    // useEffect(() => getDilus(setDilus), [dilus])
    console.log(dilus)

    return (
        <View style={styles.container}>
            {dilus.length ? (
                <FlashList
                    data={dilus}
                    renderItem={({ item }) =>
                        <Pressable>
                            <Montserrat>{item.name}</Montserrat>
                        </Pressable>} />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={icon}
                        contentFit="cover"
                    />
                    <MontserratBold style={{ fontSize: 22, padding: 10 }}>No se han encontrado Dilus</MontserratBold>
                    <Link
                        href='/dilus/create'>
                        <MontserratBold style={{ fontSize: 18, padding: 10, color: '#763c28' }}>Crear Dilu</MontserratBold>
                    </Link>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default DilusHome;