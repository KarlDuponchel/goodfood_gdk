import { BaseButton } from "@/components/button/Button";
import { BaseInputAccount } from "@/components/input/InputAccount";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";

export const metadata = {
    title: "Mon compte"
}

export default function Account() {
    //const [user, setUser] = useState<any>();
    
    return (
        <>
            <Header />
                <div className="p-6 flex flex-col gap-8 min-h-screen">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Mon  <span className='text-primary'>compte</span></span>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="w-1/2 bg-zinc-200 rounded shadow-md p-3 flex flex-col gap-6 justify-center items-center max-2xl:w-2/3 max-lg:w-10/12">
                            <span className="w-full font-bold text-lg">Informations</span>
                            <div className="w-3/4 grid grid-cols-2 gap-6 max-lg:w-10/12 max-sm:grid-cols-1 max-sm:w-full max-sm:place-items-center">
                                <BaseInputAccount label="Nom" defaultValue={"Duponchel"} />
                                <BaseInputAccount label="Prénom" defaultValue={"Karl"} />
                                <BaseInputAccount label="Mot de passe" defaultValue={"********"} type="password" />
                                <BaseInputAccount label="Adresse mail" defaultValue={"karl.duponchel@viacesi.fr"} />
                                <BaseInputAccount label="Confirmation de mot de passe" defaultValue={"********"} type="password" />
                            </div>
                            <div className="w-full flex justify-end max-sm:justify-center">
                                <BaseButton className="w-40 hover:scale-105 transition-all duration-150" label="Sauvegarder" variant="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}