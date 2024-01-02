import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { AccountForm } from "@/containers/account/AccountForm";

export const metadata = {
    title: "Mon compte"
}

export default function Account() {
    return (
        <>
            <Header />
                <div className="p-6 flex flex-col gap-8 min-h-screen">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Mon  <span className='text-primary'>compte</span></span>
                    </div>
                    <div className="w-full flex justify-center">
                        <AccountForm />
                    </div>
                </div>
            <Footer />
        </>
    )
}