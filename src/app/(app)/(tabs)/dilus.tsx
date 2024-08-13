import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { FlashList } from "@shopify/flash-list";

import { Montserrat } from "@/components/text/StyledText";
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

    useEffect(() => getDilus(setDilus), [dilus])
    console.log(dilus)

    return (
        <View style={styles.container}>
            {dilus.length ? (
                <FlashList
                    data={dilus}
                    renderItem={({item}) =>
                        <Pressable>
                            <Montserrat>{item.name}</Montserrat>
                        </Pressable>}/>
            ) : (
                <View><Montserrat>There is not dilus</Montserrat></View>
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