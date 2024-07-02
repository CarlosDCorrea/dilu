import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Image } from "expo-image";

import { useSession } from "../../context/ctx";

import { ClashGroteskBold } from "../../components/text/StyledText";


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
                <ClashGroteskBold style={styles.headerText}>Iniciar Sesión</ClashGroteskBold>
            </View>
            <View style={styles.middleContainer}>
                <TextInput 
                style={styles.formTextInput}
                value={form.username}
                placeholder='Correo'
                onChangeText={text => onChangeForm(text, 'username')}></TextInput>
                <TextInput 
                style={styles.formTextInput}
                value={form.password}
                placeholder='Contraseña'
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
                    router.replace('/login')
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Crear Cuenta</Text>
                </Pressable>
                <Text style={{alignSelf: 'center', fontSize: 15, marginTop: 20}}>Ya tienes una cuenta?
                    <Link replace href='/auth/login' asChild>
                        <Text style={{color: '#fb8500'}}> Iniciar Sesión</Text>
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