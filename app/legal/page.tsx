import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";

export const metadata = {
    title: "Mentions légales"
}

export default function Legal() {
    return (
        <>
            <Header />
            <div className="p-6 flex flex-col gap-8 min-h-screen">
                <div className="flex justify-between font-bold text-lg">
                    <span>Mentions légales</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-1/2">
                        <p className="text-justify">
                        Notre politique de confidentialité vise à protéger les informations personnelles que vous nous fournissez lors de votre utilisation de notre site web pour passer des commandes de plats.<br/><br/>
                        Nous comprenons l'importance de la confidentialité de vos données, c'est pourquoi nous nous engageons à les traiter avec le plus grand soin et à respecter les normes de sécurité les plus élevées.<br/>
                        Les informations que vous nous communiquez, telles que votre nom, votre adresse de livraison et vos coordonnées de contact, ne seront utilisées que dans le cadre de la livraison de vos commandes et de la communication avec vous concernant ces commandes. Nous ne partagerons en aucun cas vos informations personnelles avec des tiers sans votre consentement explicite, sauf dans les cas où cela est nécessaire pour assurer le bon déroulement de la livraison ou lorsque la loi l'exige.<br/><br/>
                        Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations contre tout accès non autorisé ou toute utilisation abusive. Nous vous encourageons à lire attentivement notre politique de confidentialité pour comprendre comment nous collectons, utilisons et protégeons vos données personnelles.<br/><br/>
                        Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, n'hésitez pas à nous contacter. Votre confiance est primordiale pour nous, et nous mettons tout en œuvre pour préserver votre vie privée lors de votre expérience de commande sur notre site web.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}