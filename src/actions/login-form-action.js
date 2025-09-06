'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export default async function loginFormAction(prevState, formData) {

    const username = formData.get('username');
    const password = formData.get('password');

    const schema = z.object({
        username: z.string().min(1, {message: 'Brugernavn skal være udfyldt'}),
        password: z.string().min(1, {message: 'Adgangskode skal være udfyldt'})
    });

    const validated = schema.safeParse({
        username: username,
        password: password
    });

    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    }

    //return validated;

    // lav access token
    const response = await fetch("http://localhost:4000/auth/token", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "username": `${validated.data.username}`,
            "password": `${validated.data.password}` 
        })
    })

    if (!response.ok) return {
        success: false,
        errors: ['Ugyldigt login. Prøv igen.']
    }

    const data = await response.json();
    //console.log('token response: ', data);

    const cookieStore = await cookies();
    cookieStore.set({
        name: 'landrupdans_access_token',
        value: data.token,
        maxAge: 60*60
    });

    cookieStore.set({
        name: 'landrupdans_userId',
        value: data.userId,
        maxAge: 60*60
    });
    
    cookieStore.set({
        name: 'landrupdans_userRole',
        value: data.role,
        maxAge: 60*60
    });
    
    redirect('/');
}