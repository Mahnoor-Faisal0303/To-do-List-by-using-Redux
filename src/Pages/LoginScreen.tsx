import React, { Fragment, useEffect } from 'react';
import { ParentBox, PasswordIcon, InputPassword, Heading, InputField, _Button, ErrorMessage } from '../Style/LoginScreenStyle';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { generatePath, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Store/Slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import APP_ROUTES from '../Constant/Routes';
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from '../store';
import PasswordValidator from 'password-validator';

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

    const passwordSchema = new PasswordValidator();

    passwordSchema
        .is().min(8)
        .has().digits(1)
        .has().uppercase()
        .has().lowercase()
        .symbols(0)

    const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
        if (!passwordSchema.validate(password)) {
            setError("password", { type: "manual", message: "Invalid password" });
        } else {
            dispatch(setCurrentUser({ email, password }))
        }
    }

    return (
        <Fragment>
            <ParentBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading variant="h3">Login
                    </Heading>
                    <InputField
                        {...register("email", { required: true })}
                        id="outlined-required"
                        type="email"
                        placeholder='Enter your Email'
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

                    <_Button variant="contained" color="success" type="submit">
                        Login
                    </_Button>
                </form>
            </ParentBox>
        </Fragment>
    );
};

export default LoginScreen;

