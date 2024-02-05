import { CommandsDetail } from "@/containers/partners/commands-management/CommandsDetail";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";

export const metadata = {
  title: "Gestion de commande",
};

export default function Page({ params }: { params: { slug: number } }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8 max-lg:col-span-full">
        <CommandsDetail idOrder={params.slug} />
      </div>
    </div>
  );
}
