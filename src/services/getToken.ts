import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getToken() {

    const cookie = await cookies();
    const encryptedToken = cookie.get('next-auth.session-token')?.value;
    const decryptedToken =await decode({
        secret:process.env.NEXTAUTH_SECRET!,
        token:encryptedToken
    })

    return decryptedToken?.accessToken
}

export async function getUserId() {

    const cookie = await cookies();
    const encryptedToken = cookie.get('next-auth.session-token')?.value;
    const decryptedToken =await decode({
        secret:process.env.NEXTAUTH_SECRET!,
        token:encryptedToken
    })

    return decryptedToken?.id
}
