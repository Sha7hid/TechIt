import './globals.css'
import { Inter } from 'next/font/google'
import NavbarComponent from './navbar'
import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import Providers from './Provider';
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <NavbarComponent/>
        {children}
        </Providers>
       
        </body>
    </html>
  )
}
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export const metadata = {
  title: 'TechIt',
  description: 'Generated by create next app',
}