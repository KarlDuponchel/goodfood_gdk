import PartnersMenu from "@/containers/partners/ParntersMenu";

export const metadata = {
    title: "Partenaires",
}

export default function Partners() {
    return (
        <div className="bg-background w-full min-h-screen grid">
            <PartnersMenu />
        </div>
    )
}