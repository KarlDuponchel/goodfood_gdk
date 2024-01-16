"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { BaseInputConnect } from "@/components/input/InputConnect";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type ConnectFormProps = {};

export const ConnectForm: FunctionComponent<ConnectFormProps> = () => {
  const { toast } = useToast();

  const { login } = useAuth();

  const router = useRouter();

  const refEmail = useRef<HTMLInputElement>(null);
  const refPswd = useRef<HTMLInputElement>(null);

  const [typeInput, setTypeInput] = useState<string>("password");

  const handleClick = () => {
    if (typeInput == "password") {
      setTypeInput("text");
    } else {
      setTypeInput("password");
    }
  };

  const redirectToRegister = () => {
    router.push("/register");
  };

  const submitConnect = () => {
    if (!refEmail.current || !refPswd.current) return;
    const email = refEmail.current.value;
    const password = refPswd.current.value;

    try {
      login(email, password);
    } catch {
      toast({
        description: "Informations de connexion erronées",
      });
    }
  };

  return (
    <div className="flex h-fit w-1/5 flex-col items-center rounded-lg bg-slate-50 p-4 max-xl:w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-2/3">
      <div className="pb-2 text-center text-3xl font-bold">
        <Image
          alt="Logo goodfood"
          src={"/images/logoGF.png"}
          width={120}
          height={120}
        />
      </div>
      <span className="h-0.5 w-full bg-primary" />
      <div className="flex w-full flex-col justify-center gap-4 py-4">
        <div className="flex items-center justify-center">
          <BaseInputConnect ref={refEmail} label="Adresse mail" type="email" />
        </div>
        <div className="relative flex items-center justify-center">
          <BaseInputConnect
            ref={refPswd}
            label="Mot de passe"
            type={typeInput}
          />
          {typeInput == "password" ? (
            <EyeIcon
              onClick={handleClick}
              className="absolute bottom-2 right-6 w-6 cursor-pointer"
            />
          ) : (
            <EyeSlashIcon
              onClick={handleClick}
              className="absolute bottom-2 right-6 w-6 cursor-pointer"
            />
          )}
          <span className="absolute -bottom-6 right-4 cursor-pointer text-sm hover:underline">
            Mot de passe oublié ?
          </span>
        </div>
      </div>
      <div className="flex w-full gap-4 pt-10">
        <BaseButton
          variant="primary"
          label="Connexion"
          type="button"
          onClick={submitConnect}
          className="w-full"
        />
        <BaseButton
          variant="transparent"
          label="Inscription"
          onClick={redirectToRegister}
          className="w-full"
        />
      </div>
    </div>
  );
};
