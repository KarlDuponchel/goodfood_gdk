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
import { deleteProductIngredient } from "@/services/Product";
import { Trash } from "lucide-react";

type SuppliesDeleteProductIngredientProps = {
  id_ingredient: number;
  id_product: number;
};

export const SuppliesDeleteProductIngredient: FunctionComponent<
  SuppliesDeleteProductIngredientProps
> = ({ id_ingredient, id_product }) => {
  const { toast } = useToast();

  const submit = () => {
    deleteProductIngredient(id_product, id_ingredient)
      .then(() => {
        toast({
          title: "Ingrédient supprimé",
          description: "L'ingrédient a bien été supprimé",
        });
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
          <AlertDialogTitle>Supprimer un ingrédient</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur de supprimer cet ingrédient ? Cette action est
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
