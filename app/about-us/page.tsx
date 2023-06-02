'use client';

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import logoGoodFood from '../../images/logoBlackPng.png';

export default function AboutUs() {

    return (
        <>
            <Header />
            <div className="p-6 flex flex-col gap-8 min-h-screen">
                <div className="flex justify-between font-bold text-lg">
                    <span>A propos de nous</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-1/2 flex flex-col gap-8">
                        <div className="w-full justify-center flex">
                            <img src={logoGoodFood.src} className="" alt="Logo goodfood" width={350} />
                        </div>
                        <div>
                            <p className="text-justify">
                                Bienvenue sur notre site web !<br/><br/>
                                Chez <span className="font-bold">GoodFood</span>, nous sommes passionnés par la cuisine et nous nous efforçons de fournir à nos clients une expérience culinaire exceptionnelle. 
                                Nos partenaires dévoués travaille avec soin pour préparer des plats délicieux et de haute qualité, en utilisant des ingrédients frais et savoureux. <br/><br/>
                                Nous croyons en la satisfaction de nos clients et nous nous engageons à offrir un service de livraison pratique et fiable. 
                                Notre objectif est de rendre votre expérience de commande de plats aussi simple et agréable que possible. Que vous recherchiez une cuisine traditionnelle, des plats exotiques ou des options végétariennes, notre menu diversifié saura satisfaire tous les palais.<br/><br/>
                                Nous accordons une grande importance à la qualité de nos produits et à la satisfaction de nos clients. Nous apprécions vos commentaires et suggestions, car ils nous aident à améliorer constamment nos services.
                                N'hésitez pas à parcourir notre site web pour découvrir notre menu alléchant, passer vos commandes et nous contacter en cas de besoin. Nous sommes impatients de vous servir et de faire de votre repas une expérience délicieuse et sans tracas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}