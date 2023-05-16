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
        icon: '/favicon.ico',
    },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
