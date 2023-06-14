import PartnersConnectForm from "@/containers/partners/ConnectPartnersForm";

export const metadata = {
    title: "Connexion Partenaires",
}

export default function PartnersConnect() {
    return (
        <div className="bg-background w-full bg-cover h-screen grid place-items-center">
            <PartnersConnectForm />
        </div>
    )
}