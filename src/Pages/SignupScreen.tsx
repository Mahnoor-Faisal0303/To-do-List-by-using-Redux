import React, { Fragment } from 'react';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { generatePath, useNavigate } from 'react-router-dom';
import { ParentBox, _Button, PasswordIcon, InputPassword, Heading, InputField, ErrorMessage } from '../Style/LoginScreenStyle';
import uuid from 'react-uuid';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import APP_ROUTES from '../Constant/Routes';
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string
    email: string
    password: string
    confirmPassword: string
}
const SignupScreen: React.FC = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm<IFormInput>()

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const passwordSchema = new PasswordValidator();

    passwordSchema
        .is().min(8)
        .has().digits(1)
        .has().uppercase()
        .has().lowercase()
        .symbols(0)

    const onSubmit: SubmitHandler<IFormInput> = ({ name, email, password, confirmPassword }) => {
        const userInformation = {
            id: `${uuid()}`,
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
        };

        let valid = true;

        if (!validator.isEmail(email)) {
            setError("email", { type: "manual", message: "Invalid email" });
            valid = false;
        }
        if (!passwordSchema.validate(password)) {
            setError("password", { type: "manual", message: "Invalid password" });
            valid = false;
        }
        if (password !== confirmPassword) {
            setError("confirmPassword", { type: "manual", message: "password not matched" });
            valid = false;
        }
        if (!valid) {
            return;
        }
        const data = localStorage.getItem("initialData")

        if (!data) {
            const initialData = [];
            initialData.push(userInformation);
            localStorage.setItem('initialData', JSON.stringify(initialData));
            console.log(initialData);
        } else {
            const newData = JSON.parse(data);
            newData.push(userInformation);
            localStorage.setItem('initialData', JSON.stringify(newData));
            console.log(newData);
        }
        navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
    }

    return (
        <Fragment>
            <ParentBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading variant="h2">
                        Signup Page </Heading>

                    <InputField
                        {...register("name", { required: true })}
                        id="outlined-required"
                        type="text"
                        placeholder='Enter your Name'
                        error={errors.name ? true : false}
                    />
                    <ErrorMessage variant="caption" color="error">
                        {errors.name && "name is required"}
                    </ErrorMessage>

                    <InputField
                        {...register("email", { required: true })}
                        id="outlined-required"
                        type="email"
                        placeholder='Enter your Email Id'
                        error={errors.email ? true : false}
                    />
                    {errors.email && errors.email.type !== "manual" && (
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
                        {...register("password", { required: true })}
                        id="outlined-required"
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
                        placeholder='Enter Password'
                        error={errors.password ? true : false}
                    />
                    {errors.password && errors.password.type !== "manual" && (
                        <ErrorMessage variant="caption" color="error">
                            Password is required
                        </ErrorMessage>
                    )}
                    {errors.password && errors.password.type === "manual" && (
                        <ErrorMessage variant="caption" color="error">
                            Invalid password
                        </ErrorMessage>
                    )}

                    <InputPassword
                        {...register("confirmPassword", { required: true })}
                        id="outlined-required"
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        error={errors.confirmPassword ? true : false}
                    />
                    {errors.confirmPassword && errors.confirmPassword.type !== "manual" && (
                        <ErrorMessage variant="caption" color="error">
                            Password is required
                        </ErrorMessage>
                    )}
                    {errors.confirmPassword && errors.confirmPassword.type === "manual" && (
                        <ErrorMessage variant="caption" color="error">
                            password not matched
                        </ErrorMessage>
                    )}

                    <_Button variant="contained" color="success" type="submit">
                        Signup
                    </_Button>
                </form>
            </ParentBox>
        </Fragment>
    )
}
export default SignupScreen;