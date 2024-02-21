import React, { Fragment, useEffect } from "react";
import { ParentBox, PasswordIcon, Heading, Buttons } from "../Style/LoginScreenStyle";
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
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../Component/Input";

export interface IFormInput {
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
        .min(6, { message: "Password must be atleast 6 characters" })
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

                    <FormInput
                        control={control}
                        id="outlined-required"
                        name="email"
                        type="email"
                        placeholder="Enter your Email"
                        error={errors.email ? true : false}
                        showPassword={showPassword}
                        togglePasswordVisibility={handleClickShowPassword}
                        onMouseDownPassword={handleMouseDownPassword}
                        errors={errors.email?.message}
                    />

                    <FormInput
                        control={control}
                        id="outlined-required"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        error={errors.password ? true : false}
                        showPassword={showPassword}
                        togglePasswordVisibility={handleClickShowPassword}
                        onMouseDownPassword={handleMouseDownPassword}
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
                        errors={errors.password?.message}
                    />

                    <Buttons variant="contained" color="success" type="submit">
                        Login
                    </Buttons>
                </form>
            </ParentBox>
        </Fragment>
    );
};

export default LoginScreen;