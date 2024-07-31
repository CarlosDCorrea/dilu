import { serverUrl } from "@/constants/server";
import { form, expense, listExpensesResponse } from "@/types/expenses";


export function create(form: form): Promise<Response> {
    return fetch(`${serverUrl}/expense/create`, {
        method: 'POST',
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
        },
        body: JSON.stringify(form)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return response.text().then(error => {
                throw new Error(error)
            });
        });
}

export function list(url?: string): Promise<listExpensesResponse> {
    if (!url) {
        url = `${serverUrl}/expense/list-by-owner`;
    }

    return fetch(url, {
        method: 'GET',
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.text().then(text => { throw new Error(text) })
        })
}

export function update(id: string, form: form): Promise<Response> {
    return fetch(`${serverUrl}/expense/update/${id}`, {
        method: 'PUT',
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
        },
        body: JSON.stringify(form)
    })
        .then(response => {
            console.log('getting response')
            if (response.ok) {
                return response.json();
            }
            return response.text().then(text => {
                console.log(text);
                throw new Error(text)
            })
        })
}

export function deleteExpense(expenseId: string): Promise<Response> {
    return fetch(`${serverUrl}/expense/delete/${expenseId}`, {
        method: 'DELETE',
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.text().then(text => {
                console.log(text);
                throw new Error(text)
            })
        })
}

export function get(id: string): Promise<form> {
    return fetch(`${serverUrl}/expense/get-by-owner/${id}`, {
        method: 'GET',
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.text().then(text => { throw new Error(text) })
        })
}

export function getTotal(startDate: string, endDate: string): Promise<{ total: number }> {
    return fetch(`${serverUrl}/expense/total-value/${startDate}/${endDate}`, {
        method: 'GET',
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6b6e12cf2e3732506a0811ecd2703b958025d190'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return response.text().then(text => { throw new Error(text) });
        })
}