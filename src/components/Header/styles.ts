import { styled } from "@/styles"

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between"
})

export const CartIcon = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$gray800",
  padding: "0.75rem",
  borderRadius: "8px",
  cursor: "pointer"
})
