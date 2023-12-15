import { type AppType } from 'next/app'
import { api } from '@utils/api'
import { OrderProvider } from '@lib/providers/new-order'

import '@styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <OrderProvider>
      <Component {...pageProps} />
    </OrderProvider>
  )
}

export default api.withTRPC(MyApp)
