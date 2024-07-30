import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, Platform } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, router, Link } from "expo-router";

import { DateTimePickerAndroid, DateTimePickerEvent, AndroidNativeProps } from '@react-native-community/datetimepicker';
import Toast from 'react-native-root-toast';

import { Montserrat, MontserratBold } from "@/components/text/StyledText";

import { get as getCategoryAPI } from "@/api/category";
import { update, get as getExpenseAPI } from "@/api/expense";

import { dateFormatter, pesoFormatter } from "@/utilities/formatters";

import { form } from "@/types/expenses";
import { category } from "@/types/category";


const initialFormState = {
    value: '',
    description: '',
    category: null,
    created: new Date(Date.now())
};

function canCreateExpense(form: form): boolean {
    return form.value !== '';
}

function onChangeForm(action: any, form: any, text: string, field: string) {
    if (field === 'value') {
        text = text.replace(/[^0-9]/g, "");
    }

    console.log('callind on change form');

    action({
        ...form,
        [field]: text
    });
}

function onChangeDateClosure(form: form, setForm: React.Dispatch<React.SetStateAction<form>>) {
    function onChangeDate(_: DateTimePickerEvent, selectedDate: Date | undefined) {
        setForm({
            ...form,
            ['created']: selectedDate ? selectedDate : new Date(Date.now())
        });
    };

    function showMode(currentMode: AndroidNativeProps['mode']) {
        DateTimePickerAndroid.open({
            value: form.created,
            onChange: onChangeDate,
            mode: currentMode
        });
    };

    return showMode;
}

function getExpense(
    setForm: React.Dispatch<React.SetStateAction<form>>,
    setCategorySelected: React.Dispatch<React.SetStateAction<category | null>>,
    expenseId?: string,
    categorySelectedId?: string) {
    if (expenseId) {
        getExpenseAPI(expenseId)
            .then(expense => {
                expense.created = new Date(expense.created);
                setForm(expense);

                if (categorySelectedId && categorySelectedId !== expense.category) {
                    getCategoryAPI(categorySelectedId)
                        .then(category => {
                            expense.category = category.category_id;
                            setForm({
                                ...expense,
                                category: category.category_id
                            });
                            setCategorySelected(category);
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    }
}

function expenseUpdate() {
    const { expenseId, categorySelectedId } = useLocalSearchParams<{ expenseId: string, categorySelectedId?: string }>();
    const [categorySelected, setCategorySelected] = useState<category | null>(null);
    const [form, setForm] = useState<form>(initialFormState);

    useEffect(() => {
        getExpense(setForm, setCategorySelected, expenseId, categorySelectedId)
    }, [categorySelectedId]);

    let showDatePicker = onChangeDateClosure(form, setForm);

    return (
        <View style={styles.container}>
            <MontserratBold style={{ fontSize: 30, alignSelf: 'center', color: '#8b4513' }}>Actualizar Gasto</MontserratBold>
            <View style={styles.middleContainer}>
                <TextInput
                    style={styles.formTextInput}
                    placeholder="Valor"
                    keyboardType="numeric"
                    placeholderTextColor='black'
                    value={form.value ? pesoFormatter().format(parseInt(form.value)).toString().split(',')[0] : ""}
                    onChangeText={text => onChangeForm(setForm, form, text, 'value')}></TextInput>
                <TextInput style={styles.formTextInput}
                    placeholder="Breve Descripción"
                    placeholderTextColor='gray'
                    value={form.description}
                    onChangeText={text => onChangeForm(setForm, form, text, 'description')}></TextInput>
                <Link href={{
                    pathname: '/category',
                    params: {
                        categorySelectedIdParam: form.category ? categorySelected?.name : undefined,
                        expenseId: expenseId
                    }
                }} asChild>
                    <Pressable>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder="Categoría"
                            placeholderTextColor='black'
                            value={categorySelected?.name}
                            editable={false}
                            onChangeText={text => onChangeForm(setForm, form, text, 'category')}></TextInput>
                    </Pressable>
                </Link>
                <Pressable onPress={_ => showDatePicker('date')}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={`Fecha: ${dateFormatter().format(form.created)}`}
                        placeholderTextColor='black'
                        editable={false}>
                    </TextInput>
                </Pressable>
            </View>
            <View style={{ backgroundColor: 'transparent' }}>
                <Pressable
                    style={[styles.createExpenseButton, canCreateExpense(form) ? styles.createExpenseActiveButton : styles.createExpenseInactiveButton]}
                    onPress={() => {
                        if (expenseId) {
                            update(expenseId, form)
                            .then(_ => {
                                console.log('about to go back');
                                router.back();
                            });
                        }
                    }}>
                    <Montserrat style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Actualizar</Montserrat>
                </Pressable>
                <Pressable
                    style={styles.dismissButton}
                    onPress={() => {
                        router.back();
                    }}
                >
                    <Montserrat style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>Dismiss</Montserrat>
                </Pressable>
            </View>
            <StatusBar style={Platform.OS == 'ios' ? 'light' : 'dark'} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fffaf0'
    },
    middleContainer: {
        padding: 20,
        paddingTop: 40,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'red'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    createExpenseButton: {
        width: '50%',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 10
    },
    createExpenseActiveButton: {
        backgroundColor: '#ff4500'
    },
    createExpenseInactiveButton: {
        backgroundColor: '#FF9D79'
    },
    dismissButton: {
        width: '50%',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 10
    },
    formTextInput: {
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        paddingVertical: 11,
        paddingStart: 10,
        color: 'black'
    }
});
export default expenseUpdate;