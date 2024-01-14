import { SidebarPartners } from "@/containers/partners/SidebarPartners";

export const StatisticsPage = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8">Statistiques</div>
    </div>
  );
};
