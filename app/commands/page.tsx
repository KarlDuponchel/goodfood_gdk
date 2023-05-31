import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { ClockIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Commands() {

    const commands: {
        id: number,
        date: string,
        products: {
            id: number,
            name: string,
            price: number,
            image: string
        }[],
        status: number,
        idRestaurant: number
    }[] = [];
    /*const commands = [
        {
            id: 1,
            date: "20/05/2023",
            products: [
                {
                    id: 1,
                    name: "Cheeseburger avec frites",
                    price: 9.99,
                    image: ""
                },
                {
                    id: 2,
                    name: "Burrata avec tomates cerises",
                    price: 6.79,
                    image: ""
                },
            ],
            status: 2,
            idRestaurant: 9
        },
        {
            id: 2,
            date: "17/05/2023",
            products: [
                {
                    id: 1,
                    name: "Burger avocat avec frites",
                    price: 12,
                    image: ""
                },
                {
                    id: 2,
                    name: "Mozza sticks avec sauce tomate",
                    price: 8.49,
                    image: ""
                },
            ],
            status: 1,
            idRestaurant: 6
        },
        {
            id: 3,
            date: "16/05/2023",
            products: [
                {
                    id: 1,
                    name: "Pain pita Romain",
                    price: 7,
                    image: ""
                },
            ],
            status: 3,
            idRestaurant: 14
        },
    ]*/

    const getFullPrice = (products: any[]) => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].price;
        }
        return total.toFixed(2);
    }

    return (
        <>
            <Header />
                <div className="min-h-screen p-6 flex flex-col gap-8">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Vos <span className='text-primary'>commandes</span></span>
                    </div>
                    {commands.length === 0 ? (
                    <div className="w-full flex flex-col justify-center items-center text-4xl animate-pulse">
                        Aucune commandes passées
                    </div>
                    ) : (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-4/6 max-xl:w-5/6 max-sm:w-11/12 h-3/4 flex flex-col">
                            {commands.map((command, key) => {
                                return (
                                    <div key={key} className="flex flex-col py-3 border-b">
                                        <div className="flex">
                                            <div className="w-1/3 border-r px-3 max-xl:w-1/4">
                                                <div className="flex gap-2 justify-start items-center max-xl:justify-center">
                                                    <div className="w-14 h-14 rounded-full bg-red-500">
                                                    </div>
                                                    <div className="flex flex-col max-xl:hidden">
                                                        <span className="text-lg font-bold">Nom Restaurant - {command.date.substring(0,5)}</span>
                                                        <span className="text-sm">Adresse restaurant</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-1/3 border-r px-3 flex justify-start items-center max-xl:w-2/4">
                                                <ul className="font-bold list-disc pl-8">
                                                    {command.products.map((product, key) => {
                                                        return (
                                                            <li key={key}>{product.name} ({product.price}€)</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="w-1/3 px-12 flex items-center justify-between max-xl:w-1/4 max-xl:px-4">
                                                <span className="font-bold">{getFullPrice(command.products)}€</span>
                                                <span>{command.status === 1 ? (
                                                        <span className="p-1 bg-green-400 block rounded cursor-help" title="Commande validée">
                                                            <CheckIcon className="w-5" />
                                                        </span>
                                                    ) :
                                                    command.status === 2 ? (
                                                        <span className="p-1 bg-inherit border-2 border-zinc-300 block rounded cursor-help" title="Commande en cours">
                                                            <ClockIcon className="w-5" />
                                                        </span>
                                                    ) : (
                                                        <span className="p-1 bg-red-500 block rounded cursor-help" title="Commande annulée">
                                                            <XMarkIcon className="w-5" />
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    )}
                </div>
            <Footer />
        </>
    )
}