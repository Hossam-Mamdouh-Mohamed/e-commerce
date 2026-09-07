'use server'

import { UserSignIn } from "@/app/login/page";
import { cookies } from "next/headers";

type SignInResult =
    | { success: true }
    | { success: false; message: string };

export async function SignIn(data: UserSignIn): Promise<SignInResult> {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        return {
            success: false,
            message: payload?.message ?? "Invalid email or password",
        };
    }

    const cookie = await cookies();
    cookie.set('userToken', payload.token);

    return { success: true };
}
