'use server'

import { UserChangePassword } from "@/app/change-password/page";
import { EmailSchema, ResetCodeSchema, ResetPasswordRequestData } from "@/app/forget-password/page";
import { UserSignUp } from "@/app/signup/page";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

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

export async function ForgetPassword(data: EmailSchema): Promise<SignUpResult> {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
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
            message: payload?.message ?? "Unable to send reset code ",
            errors: payload?.errors,
        };
    }
    return {
        success: true,
    }
}

export async function ResetCode(data: ResetCodeSchema): Promise<SignUpResult> {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
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
            message: payload?.message ?? "Unable to send reset code ",
            errors: payload?.errors,
        };
    }
    return {
        success: true,
    }
}


export async function ResetPassword(data: ResetPasswordRequestData): Promise<SignUpResult> {

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
            method: "PUT",
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
            message: payload?.message ?? "Unable to reset password ",
            errors: payload?.errors,
        };
    }
    return {
        success: true,
    }
}


export async function ChangePassword(data: UserChangePassword): Promise<SignUpResult> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("next-auth.session-token")
        ?? cookieStore.get("__Secure-next-auth.session-token");

    if (!sessionCookie) {
        return {
            success: false,
            message: "You must be signed in to change your password",
        };
    }

    const request = new NextRequest(process.env.NEXTAUTH_URL ?? "http://localhost:3000", {
        headers: {
            cookie: `${sessionCookie.name}=${sessionCookie.value}`,
        },
    });

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: sessionCookie.name,
    });

    if (!token?.accessToken) {
        return {
            success: false,
            message: "You must be signed in to change your password",
        };
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token.accessToken,
            },
            body: JSON.stringify(data),
        }
    );
    const payload = await response.json().catch(() => null);

    // Sign out the user after changing the password
    await signOut({ redirect: false , callbackUrl: '/login'});

    if (!response.ok) {
        return {
            success: false,
            message: payload?.message ?? "Unable to Change Password ",
            errors: payload?.errors,
        };
    }
    return {
        success: true,
    }
}
