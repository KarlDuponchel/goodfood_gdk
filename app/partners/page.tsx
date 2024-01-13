import { BaseButton } from "@/components/button/Button";
import Image from "next/image";

export const metadata = {
  title: "Partenaires",
};

export default function Partners() {
  return (
    <div className="grid-rows-10 grid min-h-screen w-full grid-cols-6 bg-background">
      <div className="col-span-1 col-start-1 row-span-full flex flex-col items-center justify-between border-r border-black bg-zinc-200 py-8">
        <div>
          <Image
            alt="logo goodfood"
            src={"/images/logoblackv2.png"}
            width={200}
            height={200}
          />
        </div>
        <div>
          <BaseButton variant="black" label="Déconnexion" />
        </div>
      </div>
      <div className="h-hit col-span-5 col-start-2 row-span-2 bg-zinc-200"></div>
      <div className="row-span-8 col-span-5 col-start-2"></div>
    </div>
  );
}
