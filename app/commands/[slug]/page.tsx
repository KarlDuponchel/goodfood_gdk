import { CommandDetailPage } from "@/containers/commands/CommandDetailPage";

export const metadata = {
  title: "Détail commande"
}

export default function Page({
    params,
  }: {
    params: { slug: number };
  }) {

    return (
        <CommandDetailPage commandId={params.slug} />
    )
}