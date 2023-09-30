import { VerifyForm } from "@/containers/verify/VerifyForm"

export const metadata = {
    title: "Vérification du compte",
}

export default function Verify() {
    return (
        <div className="bg-bg-food w-full bg-cover h-screen grid place-items-center">
            <VerifyForm />
        </div>
    )
}