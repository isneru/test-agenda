import { poppins } from '@lib/font'
import Head from 'next/head'

type LayoutProps = {
  children: React.ReactNode
}

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
