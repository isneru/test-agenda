import { Poppins } from 'next/font/google'
import Head from 'next/head'

type LayoutProps = {
  children: React.ReactNode
}

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Cex Order Agenda</title>
        <link rel="icon" href="/cex.png" />
      </Head>
      <div className={poppins.className}>{children}</div>
    </>
  )
}
