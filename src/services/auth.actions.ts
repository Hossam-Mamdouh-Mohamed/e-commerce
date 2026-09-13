'use server'

import { UserSignUp } from "@/app/signup/page";
type SignUpResult =
    | { success: true }
    | { success: false; message: string; errors?: unknown };


export async function SignUp(data: UserSignUp): Promise<SignUpResult> {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const payload = await response.json().catch(() => null);
    console.log(payload);
    if (!response.ok) {
        return {
            success: false,
            message: payload?.message ?? "Unable to create your account",
            errors: payload?.errors,
        };
    }
    return {
        success: true,
    }
}