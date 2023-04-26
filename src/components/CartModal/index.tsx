import * as Dialog from "@radix-ui/react-dialog"
import * as C from "./styles"
import { X } from "phosphor-react"
import { useShoppingCart } from "use-shopping-cart"
import { GetStaticProps } from "next"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"

export function CartModal() {
  const { cartDetails, cartCount, totalPrice, removeItem } = useShoppingCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    // console.log(product.defaultPriceId)

    // const products =
    //   cartDetails &&
    //   Object.values(cartDetails).map(product => {
    //     return { price: product.defaultPriceId, quantity: product.quantity }
    //   })

    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post("/api/checkout", {
        // priceId: product.defaultPriceId
        cartDetails
      })

      const { checkoutUrl } = response.data

      // se for enviar pra própria página da aplicação:
      //router.push("/checkout")

      // se for enviar pro stripe:
      window.location.href = checkoutUrl
    } catch (error) {
      // conectar com uma ferramente de observabilidade (datadog/sentry)
      alert("Falha ao redirecionar ao checkout")
      setIsCreatingCheckoutSession(false)
    }
  }

  function handleRemoveProduct(id: string) {
    try {
      removeItem(id)
    } catch (error) {
      console.log("Erro ao remover produto!")
    }
  }

  return (
    <Dialog.Portal>
      <C.Content>
        <C.CloseButon>
          <X size={24} />
        </C.CloseButon>
        <C.ShoppingSummary>
          <h3>Sacola de compras</h3>

          {cartDetails &&
            Object.values(cartDetails).map(product => {
              // console.log(product)
              return (
                <C.ProductContainer key={product.id}>
                  <C.ImageContainer>
                    {product.image && <Image src={product.image} alt="" width={120} height={100} />}
                  </C.ImageContainer>
                  <C.ProductDetails>
                    <span>{product.name}</span>
                    <h2>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      }).format(product.price)}
                    </h2>
                    <button onClick={() => handleRemoveProduct(product.id)}>Remover</button>
                  </C.ProductDetails>
                </C.ProductContainer>
              )
            })}

          <C.ValuesSummary>
            <C.Quantity>
              <span>Quantidade</span>
              <span>{cartCount} item(s)</span>
            </C.Quantity>
            <C.TotalValue>
              <span>Valor total</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(totalPrice ?? 0)}
              </span>
            </C.TotalValue>
          </C.ValuesSummary>

          <C.Footer onClick={handleBuyProduct}>Finalizar compra</C.Footer>
        </C.ShoppingSummary>
      </C.Content>
    </Dialog.Portal>
  )
}
