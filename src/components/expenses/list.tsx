import { useState, useCallback } from "react";
import { StyleSheet, Pressable } from 'react-native';

import { router, useFocusEffect } from "expo-router";
import { useActionSheet, ActionSheetOptions } from "@expo/react-native-action-sheet";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { FlashList } from "@shopify/flash-list";

import { expense } from "@/types/expenses";

import { list, deleteExpense as deleteExpenseAPI } from "@/api/expense";

import { dateVerboseFormatter, pesoFormatter } from "@/utilities/formatters";

import { View } from '@/components/Themed';

import { MontserratBold, MontserratLight } from '@/components/text/StyledText';


function listExpenses(
    setExpenses: React.Dispatch<React.SetStateAction<expense[]>>,
    setNext: React.Dispatch<React.SetStateAction<string | null>>,
    url?: string): void {
    list(url)
        .then(data => {
            if (url) {
                setExpenses(prevItem => prevItem.concat(data.results));
            } else {
                setExpenses(data.results);
            }
            setNext(data.next);
        })
        .catch(error => console.log(error));
}

function openActionSheet(
    expenseId: string,
    showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i?: number) => void | Promise<void>) => void,
    expenses: expense[],
    setExpenses: React.Dispatch<React.SetStateAction<expense[]>>) {
    const options: string[] = ['Editar', 'Eliminar', 'Cancelar'];
    const destructiveButtonIndex: number = 1;
    const cancelButtonIndex: number = 2;

    showActionSheetWithOptions({
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        showSeparators: true,
        icons: [
            <Feather name="edit" size={24} color="black" />,
            <MaterialIcons name="delete" size={24} color="black" />,
            <MaterialCommunityIcons name="cancel" size={24} color="black" />
        ]
    }, (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
            case 0:
                router.navigate({
                    pathname: '/expenses/update/[id]',
                    params: { expenseId: expenseId }
                })
                break;
            case destructiveButtonIndex:
                    deleteExpenseAPI(expenseId)
                    .then(_ => {
                        setExpenses(expenses.filter(expense => expense.expense_id !== expenseId));
                    })
                break;
            default: //CANCEL
                break;
        }
    })
}

function ListExpensesPage() {
    const [expenses, setExpenses] = useState<expense[]>([]);
    const [next, setNext] = useState<string | null>(null);
    const { showActionSheetWithOptions } = useActionSheet();

    useFocusEffect(
        useCallback(() => {
            listExpenses(setExpenses, setNext);
        }, [])
    );

    return (
        <FlashList
            data={expenses}
            renderItem={({ item }) =>
                <Pressable
                    style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}
                    onPress={_ => {
                        openActionSheet(
                            item.expense_id,
                            showActionSheetWithOptions,
                            expenses,
                            setExpenses);
                    }}>
                    <View style={{ flex: 0.7, flexDirection: 'column', justifyContent: 'center', paddingLeft: 10 }}>
                        <MontserratBold style={{ fontSize: 15 }}>{dateVerboseFormatter().format(new Date(item.created))}</MontserratBold>
                        <MontserratLight style={{ flex: 0.8, fontSize: 15 }}>{item.description ? item.description : 'Sin descripcion'}</MontserratLight>
                    </View>
                    <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                        <MontserratBold style={{ fontSize: 15 }}>{pesoFormatter().format(item.value)}</MontserratBold>
                    </View>
                </Pressable>
            }
            estimatedItemSize={50}
            onEndReached={() => {
                if (next) {
                    listExpenses(setExpenses, setNext, next);
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flashListContainer: {
        marginTop: 10,
        backgroundColor: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 15,
        height: 1,
        width: '80%',
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
export default ListExpensesPage;