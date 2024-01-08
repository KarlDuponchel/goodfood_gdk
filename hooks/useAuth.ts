import { useToast } from "@/components/ui/use-toast";
import { disconnect, getMe, loginUser } from "@/services/User";
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
        getMe().then((value) => {console.log(value.user); setUser(value.user)}).catch(() => setUser(null))
    }, [setUser])

    const login = useCallback((email: string, password: string) => {
        loginUser(email, password)
        .then((value) => {
            setCookie("accessToken", value.accessToken)
            setCookie("refreshToken", value.refreshToken)

            setTimeout(() => {
                if (value.user._role.name === "accountant") {
                    router.push("/test")
                } else {
                    router.push("/")
                }
            }, 2000)
        })
        .then(authenticate)
        .then(() => {
            toast({
                title: "Connexion réussie",
                description: "Vous allez être redirigé(e) rapidement"
            })
        }).catch(() => {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Informations de connexion erronées"
            })
        });
    }, [authenticate, router, toast])

    const logout = useCallback(() => {
        disconnect().then(() => {
            setCookie("accessToken", "", { expires: new Date(0) })
            setCookie("refreshToken", "", { expires: new Date(0) })
        })
        .then(() => {
            toast({
                title: "Déconnexion réussie",
                description: "Vous allez être redirigé(e) vers la page de connexion"
            })
        })
        .then(() => setUser(null))
        .then(() => { router.push("/connect") })
    }, [router, setUser, toast])

    return {
        user,
        status,
        authenticate,
        login,
        logout
    }
}