import {
  Alert,
  Box,
  Button,
  IconButton,
  Link,
  OutlinedInput,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Done from "./assets/Done.svg";

export const BoxStyle = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: "350px",
  border: "none",
  borderRadius: "10px",
  padding: "20px",
  margin: "50px auto ",
  backgroundImage: `url(${Done})`,
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "center",
  backgroundSize: "200px",
  height: "auto",
  backgroundColor: " rgba(244, 194, 127, 0.67);",
});
export const TypographyStyle = styled(Typography)({
  color: "#ab003c",
  fontFamily: "cursive",
  margin: "10px",
  marginTop: "130px",
});
export const LinkStyle = styled(Link)({
  color: "#ab003c",
  fontFamily: "cursive",
});
export const TextFieldStyle = styled(TextField)({
  margin: "10px",
  padding: "0px",
  width: "80%",
  border: "none",
  borderRadius: "5px",
  backgroundImage: "linear-gradient(white,#fad4e9)",
});
export const OutlinedInputStyle = styled(OutlinedInput)({
  margin: "10px",
  padding: "0px",
  width: "80%",
  border: "none",
  borderRadius: "5px",
  backgroundImage: "linear-gradient(white,#fad4e9)",
});
export const IconButtonStyle = styled(IconButton)({
  padding: "30px",
});
export const ButtonStyle = styled(Button)({
  margin: "auto",
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
  },
});
export const AlertStyle = styled(Alert)({
  margin: "10px",
});
