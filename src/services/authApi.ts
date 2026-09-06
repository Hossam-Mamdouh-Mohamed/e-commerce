import { error } from "console";
import { promises } from "dns";

export async function SignIn(data: any) {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    if (!response.ok)
        throw new Error('Errror');

    const payload = await response.json();
    return payload
}
