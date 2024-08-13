import { diluForm, diluListResponse } from "@/types/dilu";
import { serverUrl } from "@/constants/server";


export function create(form: diluForm): Promise<Response> {
    return fetch(`${serverUrl}/dilu/create`, {
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

export function list(): Promise<diluListResponse> {
    return fetch(`${serverUrl}/dilu/list`, {
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

            return response.text().then(error => {
                throw new Error(error)
            });
        });
}