import { HomeContainer, Product, CartIcon } from "@/styles/pages/home"
import Head from "next/head"
import Link from "next/link"
import { GetServerSideProps, GetStaticProps } from "next"
import Image from "next/image"

import { stripe } from "../lib/stripe"
import Stripe from "stripe"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Bag } from "phosphor-react"

import * as Dialog from "@radix-ui/react-dialog"
import { CartModal } from "@/components/CartModal"
import { useShoppingCart } from "use-shopping-cart"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string

    currency: string
    sku: string
    priceNum: number
  }[]
}

interface ProductCartProps {
  id: string
  name: string
  image: string
  description: string
  defaultPriceId: string
  currency: string
  sku: string
  price: number
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  function handleAddProduct(product: ProductCartProps) {
    try {
      addItem(product)
    } catch (error) {
      console.log("Erro ao adicionar produto!")
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <div key={product.id}>
              <Product className="keen-slider__slide">
                <Link href={`/product/${product.id}`} prefetch={false}>
                  <Image src={product.imageUrl} width={620} height={540} alt="camiseta1" />
                </Link>

                <footer>
                  <div className="info">
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <CartIcon
                    onClick={() =>
                      handleAddProduct({
                        ...product,
                        price: product.priceNum,
                        image: product.imageUrl
                      })
                    }>
                    <Bag size={25} color="#FFFFFF" weight="bold" />
                  </CartIcon>
                </footer>
              </Product>
            </div>
          )
        })}
      </HomeContainer>
    </>
  )
}

// para simular o funcionamento do getStaticProps, deve-se simular o comportamento em prod
// fazendo o comando npm run build e depois npm run start

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  })

  // console.log(response.data)

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      defaultPriceId: price.id,
      currency: "BRL",
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format((price.unit_amount ? price.unit_amount : 0) / 100),
      priceNum: (price.unit_amount ? price.unit_amount : 0) / 100,
      sku: product.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
