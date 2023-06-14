import RegisterForm from "@/containers/register/RegisterForm";

export const metadata = {
    title: "Inscription",
}

export default function Register() {
    return (
        <div className="bg-bg-food w-full bg-cover h-screen grid place-items-center">
            <RegisterForm />
        </div>
    )
}