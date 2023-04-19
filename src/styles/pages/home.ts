import { styled } from ".."

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px)/2))",
  marginLeft: "auto",
  minHeight: "656px"
})

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  // padding: "0.25rem",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover"
  },

  ".info": {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    borderRadius: 6,
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",
    overflow: "hidden",

    strong: {
      fontSize: "$md",
      color: "$gray100"
    },

    span: {
      fontSize: "$md",
      fontWeight: "bold",
      color: "$green300"
    }
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1
    }
  }
})

export const CartIcon = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$green300",
  padding: "0.75rem",
  borderRadius: "8px",
  cursor: "pointer",
  border: "none"
})
