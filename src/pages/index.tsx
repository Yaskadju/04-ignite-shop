import { HomeContainer, Product } from "@/styles/pages/home"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"
import { stripe } from "../lib/stripe"
import { GetServerSideProps, GetStaticProps } from "next"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {/* <pre>{JSON.stringify(products)}</pre> */}

      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={400} alt="camiseta1" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
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
      price: price.unit_amount
        ? new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(price.unit_amount / 100)
        : null
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
