import { ConnectForm } from "@/containers/connect/ConnectForm";

export const metadata = {
    title: "Connexion",
}

export default function Connect() {
    return (
        <div className="bg-bg-food w-full bg-cover h-screen grid place-items-center">
            <ConnectForm />
        </div>
    )
}