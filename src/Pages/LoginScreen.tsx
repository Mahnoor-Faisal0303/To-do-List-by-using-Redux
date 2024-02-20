import React, { Fragment, useEffect } from 'react';
import { ParentBox, PasswordIcon, InputPassword, Heading, InputField, Buttons, ErrorMessage } from '../Style/LoginScreenStyle';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { generatePath, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Store/Slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import APP_ROUTES from '../Constant/Routes';
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from '../store';
import { z } from "zod";
import { Controller } from "react-hook-form"


interface IFormInput {
    email: string
    password: string
}

const LoginScreen: React.FC = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm<IFormInput>()

    const auth = useSelector((state: RootState) => state.logins);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate(generatePath(APP_ROUTES.HOME_PAGE));
        }
    }, [auth.isLoggedIn, navigate]);

    const passwordSchema = z.string({
        required_error: "Password is required",
      }) 
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol");
       
        const emailSchema = z.string({
            required_error: "Email is required",
          })
          .nonempty("Email is required")
            //.regex(/^\S+@\S+$/i, "Invalid email format");
    

    const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
        try {
            passwordSchema.parse(password);
           // dispatch(setCurrentUser({ email, password }))
        } catch (error) {
            if (error instanceof z.ZodError) {
                const message = error.errors.map(err => err.message).join("\n");
                setError("password", { type: "manual", message: message });
            }
        }
        try {  
            emailSchema.parse(email);
            //dispatch(setCurrentUser({ email, password }))
        } catch (error) {
            if (error instanceof z.ZodError) {
                const message = error.errors.map(err => err.message).join("\n");
                setError("email", { type: "manual", message: message });
            }
        }
        if(passwordSchema.parse(password) && emailSchema.parse(email) ){
            dispatch(setCurrentUser({ email, password }))
        }
    }

    return (
        <Fragment>
            <ParentBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading variant="h3">Login
                    </Heading>
                    <Controller
                        control={control}
                        // rules={{
                        //     required: "Email is required",
                        //     pattern: {
                        //         value: /^\S+@\S+$/i,
                        //         message: "Invalid email format",
                        //     },
                        // }}
                        name="email"
                        render={({ field }) => (
                            <InputField
                                {...field}
                                id="outlined-required"
                                type="email"
                                placeholder='Enter your Email'
                                error={errors.email ? true : false}
                            />
                        )}
                    />
                    <ErrorMessage variant="caption" color="error">
                        {errors.email?.message}
                    </ErrorMessage>
                    {/* {errors.email && errors.email.type === "pattern" && (
                        <ErrorMessage variant="caption" color="error">
                            {errors.email.message}
                        </ErrorMessage>
                    )}
                    {errors.email && errors.email.type !== "pattern" && (
                        <ErrorMessage variant="caption" color="error">
                            {errors.email.message}
                        </ErrorMessage>
                    )} */}

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
        </Fragment >
    );
};

export default LoginScreen;


