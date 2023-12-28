import { Toaster } from '@/components/ui/toaster';
import './globals.css'
import { Kanit } from 'next/font/google'
import clsx from 'clsx';
import { Providers } from './providers';

const inter = Kanit({
    subsets: ["latin"],
    weight: '200'
});

export const metadata = {
    title: {
      default: 'GoodFood',
      template: 'GoodFood | %s',
    },
    icons: {
        icon: '/icon.ico',
        default: '/icon.ico',
    },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
  <html lang="fr">
    <body className={clsx("text-black", inter.className)}>
      <Providers>{children}</Providers>
      <Toaster />
    </body>
  </html>
  )
}
