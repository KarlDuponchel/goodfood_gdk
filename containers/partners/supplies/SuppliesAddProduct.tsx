"use client";

import { FunctionComponent, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addProduct } from "@/services/Product";
import { PostProduct } from "@/utils/types";

type SuppliesAddProductProps = {
  idRestaurant: number;
};

export const SuppliesAddProduct: FunctionComponent<SuppliesAddProductProps> = ({
  idRestaurant,
}) => {
  const { toast } = useToast();

  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [imageProduct, setImageProduct] = useState("");

  const submitProduct = () => {
    const object: PostProduct = {
      activated: true,
      description: descriptionProduct,
      id_restaurant: idRestaurant,
      name: nameProduct,
      price: Number(priceProduct),
    };

    addProduct(object)
      .then(() => {
        toast({
          title: "Produit ajouté",
          description: "Le produit a bien été ajouté",
        });
      })
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BaseButton variant="black" label="Ajouter un produit" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
          <DialogDescription>
            Renseignez les informations ci dessous afin d'ajouter un produit
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 pt-4">
          <div className="flex flex-col gap-1">
            <span>Nom du produit</span>
            <Input
              className="w-5/6"
              placeholder="ex: Salade césar"
              onChange={(e) => setNameProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Description</span>
            <Input
              className="w-5/6"
              placeholder="ex: Pizza composée de ..."
              onChange={(e) => setDescriptionProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Prix</span>
            <Input
              className="w-5/6"
              type="number"
              placeholder="ex: 8.99"
              onChange={(e) => setPriceProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Image</span>
            <Input
              className="w-5/6"
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              onChange={(e) =>
                setImageProduct(
                  e.target.files && e.target.files[0].name
                    ? e.target.files[0].name
                    : "",
                )
              }
            />
          </div>
          <div className="flex w-full justify-end pt-4">
            <BaseButton
              label="Ajouter"
              className="w-24"
              variant="black"
              onClick={submitProduct}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
