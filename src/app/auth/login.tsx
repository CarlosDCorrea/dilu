import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { useSession } from "../../context/ctx";

import { Montserrat } from "../../components/text/StyledText";


type form = {
    username: string;
    password: string;
};

export default function LoginScreen() {
    const [form, setForm] = useState<form>({
        username: 'admin@admin.com',
        password: 'admin123'
    });
    const [loginFailed, setLoginFailed] = useState<boolean>(true);

    const { signIn } = useSession();

    function onChangeForm(text: string, field: string) {
        setForm({
            ...form,
            [field]: text
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Montserrat style={styles.headerText}>Iniciar Sesión</Montserrat>
            </View>
            <View style={styles.middleContainer}>
                <TextInput
                secureTextEntry
                onChangeText={text => onChangeForm(text, 'password')}></TextInput>
                <Text 
                style={{textAlign: 'right', 
                        marginEnd: 10,
                        marginTop: 10, 
                        marginBottom: 10 }}>No recuerdas tu contraseña?</Text>
                {/* {loginFailed && <Text style={{textAlign: 'center', color: 'red'}}>Tu correo o contraseña son incorrectos</Text>} */}
                <Pressable 
                   style={styles.loginButton}
                   onPress={() => {
                    signIn('token');
                    router.replace('/home')
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Iniciar Sesión</Text>
                </Pressable>
                <Text style={{alignSelf: 'center', fontSize: 15, marginTop: 20}}>¿No tienes una cuenta?
                    <Link href='/auth/sign-up' asChild>
                        <Text style={{color: '#fb8500'}}> Registrate</Text>
                    </Link>
                </Text>
            </View>
            {/* <View style={styles.bottomContainer}></View> */}
        </SafeAreaView>
    )
}

//COLORS
//c69b7c
//763c28

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#023047'
    }, 
    headerContainer: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    middleContainer: {
        flex: 1.5,
        padding: 20,
        paddingTop: 40,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        backgroundColor: '#edede9',
        flexDirection: 'column'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'red'
    },
    headerText: {
        fontSize: 40,
        color: 'white',
        paddingStart: 30,
        paddingBottom: 10
    },
    formTextInput: {
        marginVertical: 10,
        borderRadius: 10,
        borderWidth:1,
        fontSize: 20,
        paddingVertical: 11,
        paddingStart: 10
    },
    loginButton: {
        width: '50%',
        backgroundColor: '#fb8500',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 10
    }
});