import { globalStyles } from "@/styles/global"
import type { AppProps } from "next/app"
import { Container } from "@/styles/pages/app"

import { Cart } from "@/components/Cart"
import { Header } from "@/components/Header"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Cart>
        <Header />
        <Component {...pageProps} />
      </Cart>
    </Container>
  )
}
