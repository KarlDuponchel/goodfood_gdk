import { BaseButton } from "@/components/button/Button";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { useRouter } from "next/navigation";

export const Loading = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="-mt-16 flex min-h-screen w-full flex-col items-center justify-center gap-4">
        <span className="animate-pulse text-3xl">Chargement...</span>
        <BaseButton
          label="Retour à l'accueil"
          onClick={() => router.push("/")}
          variant="primary"
          className="flex h-fit w-fit"
        ></BaseButton>
      </div>
      <Footer />
    </>
  );
};
