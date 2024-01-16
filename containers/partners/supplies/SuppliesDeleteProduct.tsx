import { FunctionComponent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteProduct } from "@/services/Product";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type SuppliesDeleteProductProps = {
  idProduct: number;
};

export const SuppliesDeleteProduct: FunctionComponent<
  SuppliesDeleteProductProps
> = ({ idProduct }) => {
  const { toast } = useToast();
  const router = useRouter();

  const submit = () => {
    deleteProduct(idProduct)
      .then(() => {
        toast({
          title: "Produit supprimé",
          description: "Le produit a bien été supprimé",
        });
        router.refresh();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue",
        });
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="h-5 w-5 cursor-pointer hover:text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer un produit</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur de supprimer ce produit ? Cette action est
            irréversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={submit}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
