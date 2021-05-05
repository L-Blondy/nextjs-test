import 'src/styles/globals.css'
import { Layout, Navbar } from 'src/components'

interface Props {
  Component: any
  pageProps: any
}

function MyApp({
  Component,
  pageProps
}: Props) {

  return (
    <Layout nav={<Navbar />}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
