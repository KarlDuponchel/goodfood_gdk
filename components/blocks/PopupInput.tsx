import { Dialog, Transition } from '@headlessui/react';
import { ComponentProps, FormEvent, Fragment, FunctionComponent, useRef } from 'react';
import { BaseButton } from '../button/Button';
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { BaseInput } from '../input/Input';
import { BaseInputAccount } from '../input/InputAccount';

 type PopupProps = ComponentProps<"div"> & {
    content: string;
    submit: (event: FormEvent) => void;
    btnLbl: string;
    ouvrir: boolean;
    fermer: () => void;
    inputValue: (n: string) => void;
  };

  export const PopupInput: FunctionComponent<PopupProps> = ({
    title,
    content,
    submit,
    btnLbl,
    ouvrir,
    fermer,
    inputValue
  }) => {
    const sendInputValue = (e: any) => {
      inputValue(e.target.value)
    }

    return (
    <div className="z-50">
      <Transition.Root as={Fragment} show={ouvrir}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10"
          open={ouvrir}
          onClose={fermer}
        >
          <div className="flex sm:block justify-center items-end sm:p-0 px-4 pt-4 pb-20 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* Cet élément piège le navigateur pour centrer les élements de ce conteneur. */}
            <span
              aria-hidden="true"
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="z-50 inline-block overflow-hidden sm:my-8 sm:w-full sm:max-w-lg align-bottom sm:align-middle bg-white rounded-lg shadow-xl transition-all transform">
                <div className="sm:p-6 px-4 pt-5 pb-4 sm:pb-4 bg-white">
                  <div className="sm:flex sm:items-start">
                    <div className="flex flex-shrink-0 justify-center items-center mx-auto sm:mx-0 w-12 sm:w-10 h-12 sm:h-10 bg-primary rounded-full">
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="w-6 h-6 text-black"
                      />
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col gap-2">
                        <p className="text-base text-gray-500">{content}</p>
                        <div className='w-full'>
                            <BaseInputAccount label='Adresse email' onChange={sendInputValue} type='email'></BaseInputAccount>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:flex sm:flex-row-reverse gap-2 py-3 px-4 sm:px-6 text-sm bg-gray-50">
                  <BaseButton
                    className="font-semibold w-28 max-sm:w-full"
                    label={btnLbl}
                    type="button"
                    variant="primary"
                    onClick={submit}
                  >
                  </BaseButton>
                  <button
                    className="inline-flex justify-center py-2 px-4 mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto text-base sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                    type="button"
                    onClick={fermer}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
    )
  }