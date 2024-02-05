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
import { addTransactionStock } from "@/services/Restaurants";
import { Stock } from "@/utils/types";
import { Plus } from "lucide-react";

type StocksDialogOrderIngredientProps = {
  id_ingredient: number;
  name_ingredient: string;
  price: number;
  id_restaurant: number;
};

const numbers = Array.from({ length: 50 }, (_, index) => index + 1);

export const StocksDialogOrderIngredient: FunctionComponent<
  StocksDialogOrderIngredientProps
> = ({ id_ingredient, price, name_ingredient, id_restaurant }) => {
  const { toast } = useToast();
  const [selectValue, setSelectValue] = useState<string>("");

  const submit = () => {
    if (selectValue) {
      const body: Stock = {
        id_ingredient: id_ingredient,
        id_restaurant: id_restaurant,
        quantity: Number(selectValue),
      };

      addTransactionStock(body).then(() => {
        toast({
          title: "Ingrédient commandé",
          description: "L'ingrédient a bien été commandé",
        });
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className="h-5 w-5 cursor-pointer hover:text-green-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Commander un ingrédient</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir commander cet ingrédient ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-evenly gap-2 pt-4">
          <span>{name_ingredient}</span>
          <span>{price}€</span>
          <span>
            <Select onValueChange={(e) => setSelectValue(e)}>
              <SelectTrigger className="w-16">
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
          <span>
            {selectValue ? `Total : ${Number(selectValue) * price}€` : ""}
          </span>
          <BaseButton
            variant="black"
            label="Commander"
            onClick={submit}
          ></BaseButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
