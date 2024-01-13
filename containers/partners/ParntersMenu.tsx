"use client";

import { BaseButton } from "@/components/button/Button";
import { useAuth } from "@/hooks/useAuth";
import {
  ChartBarSquareIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function PartnersMenu() {
  const { logout } = useAuth();

  return <div className="flex h-full w-[13%] flex-col bg-zinc-200"></div>;
}
