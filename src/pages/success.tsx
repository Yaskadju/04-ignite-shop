import { stripe } from "@/lib/stripe"
import { ImageContainer } from "@/styles/pages/success"
import { SuccessContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Stripe from "stripe"

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra Efetuada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"]
  })

  console.log(session?.line_items?.data[0].price)

  const customerName = session?.customer_details?.name
  const product = session.line_items?.data[0]?.price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}

// para pegar o check session id, há 3 formas:
// client-side (useEffect) /getServerSideProps / getStaticProps

// getStaticProps: como é uma página dinâmica, não faz sentido todos os usuários verem
// a mesma página. Esse método é usado quando precisamos de uma página que é acessada
// muitas vezes por minuto etc. Nesse caso nao faz sentido, pois temos um checkout id
// diferente toda vez, e a página nao é acessada muitas vezes

// useEffect: se for feito pelo cliente-side, vai ser necessário pensar numa tela de loading
// pra mostrar algo em tela até os dados serem carregados. Além disso, a api do stripe não
// permite fazer chamada para buscar dados de uma checkout session, por exemplo, pelo client
// side, visto que isso não seria seguro, pois exporia a chave secreta do stripe no client-side

// getServerSideProps: é a melhor opção nesse caso
