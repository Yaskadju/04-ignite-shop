import * as C from "./styles"

import logoImg from "../../assets/logo.svg"
import { Bag } from "phosphor-react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { CartModal } from "@/components/CartModal"
import Link from "next/link"
import { CartProvider, useShoppingCart } from "use-shopping-cart"

export function Header() {
  const { cartCount } = useShoppingCart()

  return (
    <C.Header>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <C.CartIcon>
            {(cartCount as number) > 0 && <C.CartNumber>{cartCount}</C.CartNumber>}

            <Bag size={25} color="#8D8D99" weight="bold" />
          </C.CartIcon>
        </Dialog.Trigger>
        <CartModal />
      </Dialog.Root>
    </C.Header>
  )
}
