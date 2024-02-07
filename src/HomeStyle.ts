import { Box, TextField, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { List, ListItem } from "@mui/material";
import Done from "./assets/Done.svg";
export const BoxStyle = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "20px",
  maxWidth: "615px",
  padding: "20px",
  margin: "50px auto ",
  background: "none",
  backgroundImage: `url(${Done})`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "right",
  backgroundSize: "150px",
  backgroundColor: " rgba(244, 194, 127, 0.67);",
  width: "auto",
});

export const TypographyStyle = styled(Typography)({
  color: "#ab003c",
  fontFamily: "cursive",
  fontWeight: "bolder",
});

export const TextFieldStyle = styled(TextField)({
  margin: "10px",
  padding: "0px",
  width: "100%",
  height: "auto",
  border: "none",
  borderRadius: "5px",
  backgroundImage: "linear-gradient(white,#fad4e9)",
});

export const ButtonStyle = styled(Button)({
  marginRight: "auto",
  fontFamily: "cursive",
  fontSize: "25px",
  color: "white",
  height: "50px",
  width: "120px",
  fontWeight: "bold",
  borderRadius: "50px",
  backgroundImage: "linear-gradient(to right, #c62828, #ef6c00)",
  padding: "10px",
  boxShadow: "2px 2px 2px 2px #ef6c00",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundImage: "linear-gradient(to right, yellow, #ef6c00)",
    width: "117px",
    height: "45px",
  },
});
export const ListStyle = styled(List)({
  display: "flex",
  flexDirection: "column",
});
export const ListItemStyle = styled(ListItem)({
  display: "block",
  fontWeight: "bold",
  borderRadius: "20px",
  width: "550px",
  backgroundImage: "linear-gradient(to left,#c62828, #ef6c00)",
  padding: "10px 30px 10px 30px",
  color: "white",
  margin:"5px",
});


export const DeleteEditButtonStyle = styled(Button)({
  fontFamily: "cursive",
  fontSize: "20px",
  color: "white",
  height: "50px",
  width: "auto",
  fontWeight: "bold",
  borderRadius: "50px",
  backgroundImage: "linear-gradient(to right, #c62828, #ef6c00)",
  padding: "10px",
  transition: "background-color 0.3s ease",
  margin:"7px",
  "&:hover": {
    backgroundImage: "linear-gradient(to right, yellow, #ef6c00)",
  },
});
