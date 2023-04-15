import * as C from "@/styles/pages/product"
import { GetStaticProps } from "next"
import Image from "next/image"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { useRouter } from "next/router"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  function handleBuyProduct() {
    console.log(product.defaultPriceId)
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <C.ProductContainer>
      <C.ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </C.ImageContainer>
      <C.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>Comprar agora</button>
      </C.ProductDetails>
    </C.ProductContainer>
  )
}

// Quando temos páginas estáticas que possuem parâmetros, infos dinâmicas, precisamos retornar
// a função getStaticPaths, que devolve esses ids
// esse método é executado no momento da build
export const getStaticPaths = async () => {
  return {
    // o path pode estar vazio, o que significa que não carrega nada antecipadamente,
    // o que faz com que as páginas estáticas sejam geradas conforme os produtos sejam acessados em prod,
    // ou pode conter os principais produtos mais acessados, por exemplo
    paths: [{ params: { id: "prod_NiA5icwzIy9TzX" } }],
    fallback: true
  }
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
        description: product.description,
        defaultPriceId: price.id,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format((price.unit_amount ? price.unit_amount : 0) / 100)
      }
    },
    revalidate: 60 * 60 * 1 // 1 hora da página salva no cache
  }
}
