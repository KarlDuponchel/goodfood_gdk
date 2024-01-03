"use client";

import { ClockIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { useFetchOrdersByEmail } from "@/hooks/order/use_fetch_orders_by_email";
import { useAuth } from "@/hooks/useAuth";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";

export const CommandsPage = () => {

    const { user } = useAuth();

    const commands = useFetchOrdersByEmail(user?.email ?? "oui");
    console.log(commands.data)

    const getFullPrice = (products: any[]) => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].price;
        }
        return total.toFixed(2);
    }

    if (!commands.data) return (
        <div>
            Loading...
        </div>
    )

    return (
        <>
            <Header />
                <div className="min-h-screen p-6 flex flex-col gap-8">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Vos <span className='text-primary'>commandes</span></span>
                    </div>
                    {commands.data.length === 0 ? (
                    <div className="w-full flex flex-col justify-center items-center text-4xl animate-pulse">
                        Aucune commandes passées
                    </div>
                    ) : (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-4/6 max-xl:w-5/6 max-sm:w-11/12 h-3/4 flex flex-col">
                            {commands.data.map((command) => {
                                return (
                                    <div key={command.id} className="flex flex-col py-3 border-b">
                                        <div className="flex">
                                            <div className="w-1/3 border-r px-3 max-xl:w-1/4">
                                                <div className="flex gap-2 justify-start items-center max-xl:justify-center">
                                                    <div className="w-14 h-14 rounded-full bg-zinc-200">
                                                    </div>
                                                    <div className="flex flex-col max-xl:hidden">
                                                        <span className="text-lg font-bold">Nom Restaurant - {command.createdAt}</span>
                                                        <span className="text-sm">Adresse restaurant</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-1/3 border-r px-3 flex justify-start items-center max-xl:w-2/4">
                                                <ul className="font-bold list-disc pl-8">
                                                    {command.orderContents.map((product) => {
                                                        return (
                                                            <li key={product.id}>{product.idContent} ({product.price}€)</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="w-1/3 px-12 flex items-center justify-between max-xl:w-1/4 max-xl:px-4">
                                                <span className="font-bold">{getFullPrice(command.orderContents)}€</span>
                                                <span>{command.commandType === "done" ? (
                                                        <a className="p-1 bg-green-400 block rounded" href={`/commands/${command.id}`} title="Commande validée">
                                                            <CheckIcon className="w-5" />
                                                        </a>
                                                    ) :
                                                    command.commandType === "wait" ? (
                                                        <a className="p-1 bg-inherit border-2 border-zinc-300 block rounded cursor-pointer" href={`/commands/${command.id}`} title="Commande en cours">
                                                            <ClockIcon className="w-5" />
                                                        </a>
                                                    ) : (
                                                        <a className="p-1 bg-red-500 block rounded" href={`/commands/${command.id}`} title="Commande annulée">
                                                            <XMarkIcon className="w-5" />
                                                        </a>
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