'use server';

import { revalidatePath } from "next/cache";
import z from "zod";

export default async function addUserToActivity(prevState, formData) {

    const userId = formData.get('userId');
    const access_token = formData.get('access_token');
    const activityId = formData.get('activityId');

    const schema = z.object({
        userId: z.string().min(1),
        access_token: z.string().min(1),
        activityId: z.string().min(1),
    });

    const validated = schema.safeParse({
        userId, access_token, activityId
    });

    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    }

    // add user
    const response = await fetch(`http://localhost:4000/api/v1/users/${validated.data.userId}/activities/${validated.data.activityId}`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + validated.data.access_token
        }
    });

    if (!response.ok) return {
        success: false,
        errors: ['Noget gik galt på serveren. Prøv igen senere']
    }

    revalidatePath(`http://localhost:3000/aktivitet/${activityId}`);
        
    return {
        success: true
    }
}

