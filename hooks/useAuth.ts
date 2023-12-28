import { useToast } from "@/components/ui/use-toast";
import { getMe, loginUser } from "@/services/User";
import { useUserStore } from "@/store/useUserStore";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export enum AuthStatus {
    Unknown = 0,
    Authenticated = 1,
    Guest = 2
}

export function useAuth() {
    const { user, setUser } = useUserStore();
    const router = useRouter();
    const { toast } = useToast();
    let status = AuthStatus.Unknown; 

    switch (user) {
        case null:
            status = AuthStatus.Guest;
            break;
        case undefined:
            status = AuthStatus.Unknown;
            break;
        default:
            status = AuthStatus.Authenticated;
            break;
    } 

    const authenticate = useCallback(() => {
        getMe().then((value) => setUser(value.user)).catch(() => setUser(null))
    }, [setUser])

    const login = useCallback((email: string, password: string) => {
        loginUser(email, password)
        .then((value) => {
            setCookie("accessToken", value.accessToken)
            setCookie("refreshToken", value.refreshToken)
        })
        .then(authenticate)
        .then(() => {
            toast({
                title: "Connexion réussie",
                description: "Vous allez être redirigé(e) rapidement"
            })
            setTimeout(() => {
                router.push("/");
            }, 2000)
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Informations de connexion erronées"
            })
        });
    }, [authenticate, router, toast])

    return {
        user,
        status,
        authenticate,
        login
    }
}