import { ReactElement } from "react";

export function Footer(): ReactElement {
      return (
        <footer className="sticky w-full bottom-0 bg-inherit border-t-2 border-t-gray-200 px-8 py-4 h-16 max-md:hidden">
            <div className="flex justify-between items-center w-full h-full font-thin text-xs">
                <div className="flex justify-center items-center gap-5 text-center w-1/3">
                    <div className="w-full">
                        <a className="cursor-pointer" href="/legal">Politique de confidentialité</a>
                    </div>
                    <div className="w-full">
                        <a className="cursor-pointer" href="/useterms">Conditions d&apos;utilisation</a>
                    </div>
                    <div className="w-full">
                        <a className="cursor-pointer" href="/about-us">A Propos</a>
                    </div>
                    <div className="w-full">
                        <span className="cursor-pointer">Contact</span>
                    </div>
                    </div>
                <div className="flex justify-center items-center">
                    <div>
                        <span className="cursor-pointer">© {new Date().getFullYear()} GoodFood</span>
                    </div>
                </div>
            </div>
        </footer>    
      )
}