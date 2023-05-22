import { Inter } from 'next/font/google';
import '../styles/app.scss';
import Header from './Header';
import { ContextProvider } from '@/components/Client';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'This is a basic todo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <ContextProvider>
          <>
            <Header/>
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  )
}
