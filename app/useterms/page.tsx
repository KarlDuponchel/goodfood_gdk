import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";

export const metadata = {
    title: "Conditions d'utlisations"
}

export default function UseTerms() {

    return (
        <>
            <Header />
            <div className="p-6 flex flex-col gap-8 min-h-screen">
                <div className="flex justify-between font-bold text-lg">
                    <span>Conditions d'utilisation</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-1/2">
                        <p className="text-justify">
                        En utilisant notre site web pour passer des commandes de plats, vous acceptez les présentes conditions d'utilisation. Nous vous encourageons à les lire attentivement avant de procéder à toute commande. Les conditions d'utilisation régissent votre utilisation du site web et établissent les droits et les responsabilités de toutes les parties impliquées.<br/><br/>
                        Vous reconnaissez que le contenu de notre site web, y compris les informations, les images, les textes et les fonctionnalités, est protégé par des droits d'auteur et d'autres lois sur la propriété intellectuelle. Vous vous engagez à n'utiliser notre site web qu'à des fins légales et conformément à ces conditions d'utilisation. Vous acceptez également de ne pas utiliser notre site web d'une manière qui pourrait porter atteinte à nos droits ou à ceux de tiers, ou causer des dommages ou des perturbations à notre site web.<br/><br/>
                        Nous nous réservons le droit de mettre à jour, de modifier ou de suspendre notre site web, ainsi que les conditions d'utilisation, à tout moment et sans préavis. Il est de votre responsabilité de consulter régulièrement les conditions d'utilisation pour rester informé des éventuelles modifications. Nous ne garantissons pas que notre site web sera exempt d'erreurs, de virus ou d'autres éléments nuisibles, et nous déclinons toute responsabilité quant aux dommages éventuels causés par l'utilisation de notre site web.<br/><br/>
                        En utilisant notre site web, vous reconnaissez que vous le faites à vos propres risques. Si vous avez des questions ou des préoccupations concernant nos conditions d'utilisation, n'hésitez pas à nous contacter. Votre utilisation continue de notre site web constitue votre acceptation des conditions d'utilisation en vigueur.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}