import { ReactElement } from "react";

export function Footer(): ReactElement {
      return (
        <footer className="absolute w-full bottom-0 bg-inherit border-t-2 border-t-gray-200 px-8 py-4 h-16">
            <div className="flex justify-between w-full font-thin text-xs">
                <div className="flex justify-center items-center gap-5 text-center w-1/3">
                    <div className="w-full">
                        <span className="cursor-pointer">Politique de confidentialité</span>
                    </div>
                    <div className="w-full">
                        <span className="cursor-pointer">Conditions d&apos;utilisation</span>
                    </div>
                    <div className="w-full">
                        <span className="cursor-pointer">A Propos</span>
                    </div>
                    <div className="w-full">
                        <span className="cursor-pointer">Contact</span>
                    </div>
                    </div>
                <div className="flex justify-center items-center">
                    <div>
                        <span className="cursor-pointer">© 2023 GoodFood</span>
                    </div>
                </div>
            </div>
        </footer>    
      )
}