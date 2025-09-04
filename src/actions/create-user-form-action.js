'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export default async function createUserFormAction(prevState, formData) {

    const passwordFirst = formData.get('passwordFirst');
    const passwordSecond = formData.get('passwordSecond');
    
    const passwordSchema = z.object({
        passwordFirst: z.string().min(1, {message: 'Adgangskode skal være udfyldt'}).max(50, {message: 'Adganskode er for lang. Max 50 tegn'}),
        passwordSecond: z.string().min(1, {message: 'Gentag adgangskode skal være udfyldt'}).max(50, {message: 'Gentaget adganskode er for lang. Max 50 tegn'})
    })
    .refine((values) => {
        return values.passwordFirst === values.passwordSecond;
    }, {
        message: 'Adgangskoderne skal være ens',
        path: ['passwordSecond'],
    });
    
    const validatedPasswords = passwordSchema.safeParse({
        passwordFirst, passwordSecond
    });
    
    if (!validatedPasswords.success) return {
        ...validatedPasswords,
        ...(z.treeifyError(validatedPasswords.error))
    }

    //return validatedPasswords;
    
    const password = validatedPasswords.data.passwordFirst;
    const username = formData.get('username');
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const age = formData.get('age');
    const role = formData.get('role');

    const schema = z.object({
        username: z.string().min(1, {message: 'Brugernavn skal være udfyldt'}).max(50, {message: 'Brugernavn er for langt. Max 50 tegn'}),
        password: z.string().min(1),
        firstname: z.string().min(1, {message: 'Fornavn skal være udfyldt'}).max(50, {message: 'Fornavn er for langt. Max 50 tegn'}),
        lastname: z.string().min(1, {message: 'Efternavn skal være udfyldt'}).max(50, {message: 'Efternavn er for langt. Max 50 tegn'}),
        age: z.string().min(1, {message: 'Alder skal være udfyldt'}).max(3, {message: 'Alder er for lang. Max 3 tal'}),
        role: z.string().min(1)
    });

    const validated = schema.safeParse({
        username, password, firstname, lastname, age, role
    });

    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    }
    
    //return validated;

    // lav post request på brugeren. 
    const createUserResponse = await fetch('http://localhost:4000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${validated.data.username}&password=${validated.data.password}&firstname=${validated.data.firstname}&lastname=${validated.data.lastname}&age=${validated.data.age}&role=${validated.data.role}`
    });

    if (!createUserResponse.ok) return {
        success: false,
        errors: ['Noget gik galt på serveren. Prøv igen senere']
    }

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
        errors: ['Noget gik galt på serveren. Prøv igen senere']
    }

    const data = await response.json();
    console.log('token response: ', data);


    // gem access token, id og role i cookie
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