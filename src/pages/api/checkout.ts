import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
const { validateCartItems } = require("use-shopping-cart/utilities")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cartDetails } = req.body

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." })
  }

  console.log(cartDetails)

  if (Object.keys(cartDetails).length <= 0) {
    return res.status(400).json({ error: "Cart is empty" })
  }

  const response = await stripe.products.list({
    expand: ["data.default_price"]
  })

  const inventory = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      description: product.description,
      currency: "BRL",
      price: price.unit_amount
    }
  })

  // if (!priceId) {
  //   return res.status(400).json({ error: "Price not found" })
  // }

  const line_items = validateCartItems(inventory, cartDetails)

  console.log(cartDetails)
  console.log(inventory)
  console.log(line_items)

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
