"use client";

import { FunctionComponent, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { updateProduct } from "@/services/Product";
import { Pencil } from "lucide-react";

type SuppliesUpdateProductProps = {
  idProduct: number;
};

export const SuppliesUpdateProduct: FunctionComponent<
  SuppliesUpdateProductProps
> = ({ idProduct }) => {
  const product = useFetchProductByID(idProduct);
  const { toast } = useToast();

  const formData = new FormData();

  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [activatedProduct, setActivatedProduct] = useState<boolean>();

  const submitChange = () => {
    if (nameProduct !== "") {
      formData.append("name", nameProduct);
    }
    if (descriptionProduct !== "") {
      formData.append("description", descriptionProduct);
    }
    if (priceProduct !== "") {
      formData.append("price", priceProduct);
    }
    if (activatedProduct !== undefined) {
      formData.append("activated", String(activatedProduct));
    }

    updateProduct(idProduct, formData)
      .then((value) => {
        toast({
          title: "Produit modifié",
          description: `Le produit ${value.name} a bien été modifié`,
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

  if (!product.data) return <div>loading...</div>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier {product.data.name}</DialogTitle>
          <DialogDescription>
            Modifiez les champs que vous souhaitez mettre à jour
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 pt-4">
          <div className="flex flex-col gap-1">
            <span>Nom du produit</span>
            <Input
              className="w-5/6"
              placeholder={product.data.name}
              onChange={(e) => setNameProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Description</span>
            <Textarea
              className="w-5/6"
              placeholder={product.data.description}
              onChange={(e) => setDescriptionProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Prix</span>
            <Input
              type="number"
              className="w-5/6"
              placeholder={String(product.data.price)}
              onChange={(e) => setPriceProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Image</span>
            <Input type="file" className="w-5/6" />
          </div>
          <div className="flex flex-col gap-1">
            <span>Est activé ?</span>
            <Switch
              defaultChecked={product.data.activated}
              onCheckedChange={(e) => setActivatedProduct(e)}
            />
          </div>
        </div>
        <DialogFooter>
          <BaseButton
            variant="black"
            label="Confirmer"
            onClick={submitChange}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
