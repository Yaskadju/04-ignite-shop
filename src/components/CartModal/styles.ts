import { styled } from "../../styles"
import * as Dialog from "@radix-ui/react-dialog"
import * as RadioGroup from "@radix-ui/react-radio-group"

export const Content = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  background: "$gray800",
  width: "35rem",
  padding: "4rem 3rem 3rem",

  display: "flex",
  flexDirection: "column",
  overflow: "auto"
})

export const CloseButon = styled(Dialog.Close, {
  color: "$gray500",
  position: "absolute",
  lineHeight: 0,
  border: 0,
  borderStyle: "none",
  cursor: "pointer",
  top: "1.5rem",
  right: "1.5rem",
  background: "transparent"
})

export const ShoppingSummary = styled("div", {
  // background: "green",
  height: "90vh",

  display: "flex",
  flexDirection: "column"
  // justifyContent: "space-between"
})

export const ProductContainer = styled("div", {
  display: "flex",
  gap: "1rem",

  marginTop: "2rem"
})

export const ImageContainer = styled("div", {
  flex: "2",
  borderRadius: "8px",
  height: "9rem",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})

export const ProductDetails = styled("div", {
  flex: "5",

  display: "flex",
  flexDirection: "column",

  span: {
    fontSize: "$xl",
    color: "$gray500",
    marginBottom: "0.5rem"
  },

  button: {
    marginTop: "auto",
    border: 0,
    background: "transparent",
    color: "$green300",
    fontWeight: "bold",
    fontSize: "$md",
    cursor: "pointer",

    display: "flex"
  }
})

export const ValuesSummary = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "4rem 0",
  gap: "1rem"
})

export const Quantity = styled("div", {
  display: "flex",
  alignContent: "space-between",
  alignItems: "space-between",
  justifyContent: "space-between",
  color: "$gray500"
})

export const TotalValue = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "$xl",
  fontWeight: "bold"
})

export const Footer = styled("button", {
  marginTop: "auto",
  backgroundColor: "$green500",
  border: 0,

  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed"
  },

  "&:not(:disabled):hover": {
    backgroundColor: "$green300"
  }
})
