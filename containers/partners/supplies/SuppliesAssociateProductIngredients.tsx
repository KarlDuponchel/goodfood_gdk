import { FunctionComponent, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addProductIngredient } from "@/services/Product";
import { addTransactionStock } from "@/services/Restaurants";
import { Stock } from "@/utils/types";
import { Plus } from "lucide-react";

type SuppliesAssociateProductIngredientsProps = {
  id_ingredient: number;
  name_ingredient: string;
  id_restaurant: number;
  id_product: number;
};

const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

export const SuppliesAssociateProductIngredients: FunctionComponent<
  SuppliesAssociateProductIngredientsProps
> = ({ id_ingredient, name_ingredient, id_restaurant, id_product }) => {
  const { toast } = useToast();
  const [selectValue, setSelectValue] = useState<string>("");

  const submit = () => {
    if (selectValue) {
      addProductIngredient(id_product, id_ingredient, Number(selectValue)).then(
        () => {
          toast({
            title: "Ingrédient associé",
            description: "L'ingrédient a bien été associé au produit",
          });
        },
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className="h-5 w-5 cursor-pointer hover:text-green-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Associer un ingrédient</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir associer cet ingrédient ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center gap-6 pt-4">
          <span>{name_ingredient}</span>
          <span>
            <Select onValueChange={(e) => setSelectValue(e)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={"Sélectionnez une quantité"}
                ></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {numbers.map((number) => (
                  <SelectItem value={String(number)}>{number}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>
        </div>
        <DialogFooter className="flex items-center gap-1 pt-4">
          <BaseButton
            variant="black"
            label="Associer"
            onClick={submit}
          ></BaseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
