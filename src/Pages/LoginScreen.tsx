import React, { Fragment, useEffect } from 'react';
import { ParentBox, PasswordIcon, SignupLink, InputPassword, Heading, InputField, _Button, ErrorMessage } from '../Style/LoginScreenStyle';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { generatePath, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Store/Slices/loginSlice';
import { useDispatch } from 'react-redux';
import APP_ROUTES from '../Constant/Routes';
import uuid from 'react-uuid';


import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    email: string
    password: string
}

const LoginScreen: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm<IFormInput>()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        const loginData = localStorage.getItem("loggedInData");
        if (loginData) {
            navigate(generatePath(APP_ROUTES.HOME_PAGE));
        }
    }, [navigate]);

    const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
        const uservalid = {
            id: `${uuid()}`,
            email: `${email}`,
            password: `${password}`,
        };
        const userEnteredEmail = uservalid.email;
        const userEnteredPassword = uservalid.password;
        const data = localStorage.getItem("initialData");
        if (data) {
            const newData = JSON.parse(data);
            console.log(newData);

            const isUserValid = newData.find((userData: { password: string; email: string; }
            ) => userData.email === userEnteredEmail && userData.password === userEnteredPassword);

            if (isUserValid) {
                localStorage.setItem('loggedInData', JSON.stringify(userEnteredEmail));
                console.log("email and password found");
                dispatch(setCurrentUser(isUserValid));
                navigate(generatePath(APP_ROUTES.HOME_PAGE));
            }
            else {
                setError("email", { type: "manual", message: "Invalid email or password" });
                console.log("not found");
            }
        }
    }

    return (
        <Fragment>
            <ParentBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading variant="h3">Login /
                        <SignupLink href="#" underline="hover" onClick={() => navigate(generatePath(APP_ROUTES.SIGNUP_PAGE))}>
                            {' SignUP'}
                        </SignupLink>
                    </Heading>
                    <InputField
                        {...register("email", { required: true })}
                        id="outlined-required"
                        type="email"
                        placeholder='Enter your Email'
                        error={errors.email ? true : false}
                    />
                    {errors.email && errors.email.type!=="manual" && (
                        <ErrorMessage variant="caption" color="error">
                            Email id is required
                        </ErrorMessage>
                    )}
                    {errors.email && errors.email.type === "manual" && (
                        <ErrorMessage variant="caption" color="error">
                            Invalid email or password
                        </ErrorMessage>
                    )}
                    <InputPassword
                        {...register("password", { required: "required password" })}
                        id="outlined-required"
                        placeholder='Enter Password'
                        type={showPassword ? 'text' : 'password'}
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
                    <ErrorMessage variant="caption" color="error">
                        {errors.password && "Password is required"}
                    </ErrorMessage>

                    <_Button variant="contained" color="success" type="submit">
                        Login
                    </_Button>
                </form>
            </ParentBox>
        </Fragment>
    );
};

export default LoginScreen;



