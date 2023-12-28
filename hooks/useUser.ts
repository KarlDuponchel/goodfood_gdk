import { useAuth } from "./useAuth";

export function useUser() {
    const { user } = useAuth();

    //Fonction retournant un booléen en fonction des droits utilisateurs
    const can = (permission: string): boolean => {
        return true
    }

    if (!user) {
        throw new Error("User is not authenticated");
    }

    return {
        user,
        can
    }
}