'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import axios from "axios";

export async function login(prevState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        // console.log({ email, password })

        const resp = await axios.post(`${process.env.STRAPI_BASE_URL}/api/auth/local`, {
            identifier: email,
            password: password
        })

        if (resp.data.jwt) {
            cookies().set("token", resp.data.jwt);
        }

    } catch (error) {
        console.log("error", error.response)
        let errorMessage = ''
        if (error.response && error.response.data.error.message) {
            errorMessage = error.response.data.error.message
        }
        return { message: errorMessage || "Failed to login" };
    }

    redirect("/special-blogs");
}