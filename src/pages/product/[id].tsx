import * as C from "@/styles/pages/product"
import { GetStaticProps } from "next"
import Image from "next/image"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <C.ProductContainer>
      <C.ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </C.ImageContainer>
      <C.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>Comprar agora</button>
      </C.ProductDetails>
    </C.ProductContainer>
  )
}

// para buscar os dados do produto, em um SPA nós poderíamos usar um useEffect, porém
// se a requisição for feita dentro do componente, esses dados não vao ser carregados
// quando um indexador ou um bot for visualizar a página. Assim, se o javascript estiver
// desabilitado, por exemplo, os dados não serão exibidos.

// por isso devemos fazer a requisição dos dados pelo server side:
// se a página não depende de dados do contexto atual (cookies, user autenticado etc)
// e não tem problema essa página ficar salva em cache algum tempo, a melhor escolha é optar
// por SSG

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params ? params.id : ""
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"]
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(price.unit_amount / 100)
          : null,
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1 // 1 hora da página salva no cache
  }
}
