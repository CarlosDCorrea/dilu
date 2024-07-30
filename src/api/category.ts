import { serverUrl } from "@/constants/server";

import { category } from "@/types/category";


export function get(id: string): Promise<category> {
    return fetch(`${serverUrl}/category/get/${id}`, {
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
        });
}