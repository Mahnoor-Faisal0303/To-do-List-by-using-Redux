import React, { Fragment, useEffect } from "react";
import {
  ParentBox,
  PasswordIcon,
  InputPassword,
  Heading,
  InputField,
  Buttons,
  ErrorMessage,
} from "../Style/LoginScreenStyle";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { generatePath, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../Store/Slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import APP_ROUTES from "../Constant/Routes";
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from "../store";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInput {
  email: string;
  password: string;
}

const validationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

const LoginScreen: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: zodResolver(validationSchema),
  });

  const auth = useSelector((state: RootState) => state.logins);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(generatePath(APP_ROUTES.HOME_PAGE));
    }
  }, [auth.isLoggedIn, navigate]);

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    dispatch(setCurrentUser({ email, password }));
  };

  return (
    <Fragment>
      <ParentBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading variant="h3">Login</Heading>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputField
                {...field}
                id="outlined-required"
                type="email"
                placeholder="Enter your Email"
                error={errors.email ? true : false}
              />
            )}
          />
          <ErrorMessage variant="caption" color="error">
            {errors.email?.message}
          </ErrorMessage>

          <Controller
            control={control}
            // rules={{
            //     required: "Password is required",
            // }}
            name="password"
            render={({ field }) => (
              <InputPassword
                {...field}
                id="outlined-required"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <PasswordIcon
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </PasswordIcon>
                  </InputAdornment>
                }
                error={errors.password ? true : false}
              />
            )}
          />
          <ErrorMessage variant="caption" color="error">
            {errors.password?.message}
          </ErrorMessage>

          <Buttons variant="contained" color="success" type="submit">
            Login
          </Buttons>
        </form>
      </ParentBox>
    </Fragment>
  );
};

export default LoginScreen;
