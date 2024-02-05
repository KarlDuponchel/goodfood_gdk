import { useState } from "react";
import { BaseButton } from "@/components/button/Button";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateRestaurant } from "@/services/Restaurants";
import { Restaurant } from "@/utils/types";

type PartnersRestaurantFormProps = {
  restaurant: Restaurant;
};

export const PartnersRestaurantForm = ({
  restaurant,
}: PartnersRestaurantFormProps) => {
  const { toast } = useToast();

  const [nameRestaurant, setNameRestaurant] = useState("");
  const [addressRestaurant, setAddressRestaurant] = useState("");
  const [addAddressRestaurant, setAddAddressRestaurant] = useState("");
  const [cityRestaurant, setCityRestaurant] = useState("");
  const [zipCodeRestaurant, setZipCodeRestaurant] = useState("");
  const [countryRestaurant, setCountryRestaurant] = useState("");

  const submit = () => {
    const body: Restaurant = {
      ID: restaurant.ID,
      name: nameRestaurant !== "" ? nameRestaurant : restaurant.name,
      address:
        addressRestaurant !== "" ? addressRestaurant : restaurant.address,
      additional_address:
        addAddressRestaurant !== ""
          ? addAddressRestaurant
          : restaurant.additional_address,
      city: cityRestaurant !== "" ? cityRestaurant : restaurant.city,
      zip_code:
        zipCodeRestaurant !== "" ? zipCodeRestaurant : restaurant.zip_code,
      country:
        countryRestaurant !== "" ? countryRestaurant : restaurant.country,
    };

    updateRestaurant(body).then(() => {
      toast({
        title: "Restaurant modifié",
        description: "Le restaurant a bien été modifié",
      });
    });

    console.log(body);
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-md p-4 shadow">
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <span className="text-2xl font-extrabold">{restaurant.name}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Modifier ici les informations de votre restaurant
        </span>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 pl-16 pt-8">
        <div className="flex w-full flex-col gap-1">
          <span>Nom du restaurant</span>
          <Input
            className="w-3/4"
            placeholder={restaurant.name}
            onChange={(e) => setNameRestaurant(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <span>Adresse</span>
          <Input
            className="w-3/4"
            placeholder={restaurant.address}
            onChange={(e) => setAddressRestaurant(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <span>Adresse complémentaire</span>
          <Input
            className="w-3/4"
            placeholder={restaurant.additional_address}
            onChange={(e) => setAddAddressRestaurant(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <span>Ville</span>
          <Input
            className="w-3/4"
            placeholder={restaurant.city}
            onChange={(e) => setCityRestaurant(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <span>Code postal</span>
          <Input
            className="w-3/4"
            placeholder={restaurant.zip_code}
            onChange={(e) => setZipCodeRestaurant(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <span>Pays</span>
          <Input
            className="w-3/4"
            placeholder={restaurant.country}
            onChange={(e) => setCountryRestaurant(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full justify-end pt-8">
        <AlertDialog>
          <AlertDialogTrigger>
            <BaseButton label="Enregistrer" variant="black" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Modifier le restaurant</AlertDialogTitle>
              <AlertDialogDescription>
                Vous êtes sur de vouloir modifier les informations de ce
                restaurant ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={submit}>Modifier</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
