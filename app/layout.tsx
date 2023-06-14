import { Toaster } from '@/components/ui/toaster';
import './globals.css'
import { Kanit } from 'next/font/google'

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
    <head>
      <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' />
    </head>
    <body className={inter.className}>
      {children}
      <Toaster />
    </body>
  </html>
  )
}
