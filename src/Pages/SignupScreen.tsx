import React, { Fragment, useState } from 'react';
import { Alert, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { generatePath, useNavigate } from 'react-router-dom';
import { AlertStyle, BoxStyle, ButtonStyle, IconButtonStyle, OutlinedInputStyle, TextFieldStyle, TypographyStyle } from '../LoginScreenStyle';
import uuid from 'react-uuid';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import APP_ROUTES from '../Constant/Routes';

const SignupScreen: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleKeyPress = (event: React.KeyboardEvent<unknown>, nextInputRef: React.RefObject<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (nextInputRef && nextInputRef.current) {
                nextInputRef.current.focus();
            }
        }
    };

    const EmailInputRef = React.useRef<HTMLInputElement>(null);
    const PasswordInputRef = React.useRef<HTMLInputElement>(null);
    const ConfirmPasswordInputRef = React.useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showCPasswordAlert, setShowCPassowrdAlert] = useState(false);

    const passwordSchema = new PasswordValidator();

    passwordSchema
        .is().min(8)
        .has().digits(1)
        .has().uppercase()
        .has().lowercase()
        .symbols(0)

    const onClickLogin = function onClickLoginFunc() {
        if (!name || !email || !password) {
            setShowNameAlert(true);
            setTimeout(function () {
                setShowNameAlert(false);
            }, 1000);
            return;
        }

        if (!validator.isEmail(email)) {
            setShowEmailError(true);
            setTimeout(function () {
                setShowEmailError(false);
            }, 1000);
            return;
        }

        if (!passwordSchema.validate(password)) {
            setShowAlert(true);
            setTimeout(function () {
                setShowAlert(false);
            }, 2000);
            return;
        }

        if (password !== confirmPassword) {
            setShowCPassowrdAlert(true);
            setTimeout(function () {
                setShowCPassowrdAlert(false);
            }, 1000);
            return;
        }
        if (password !== confirmPassword) {
            setShowAlert(true);
            setTimeout(function () {
                setShowAlert(false);
            }, 2000);
        }

        const userInformation = {
            id: `${uuid()}`,
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
        };

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
            <BoxStyle>
                <TypographyStyle variant="h2">
                    Signup Page </TypographyStyle>
                {showNameAlert && (
                    <Alert>
                        Must fill all the Information!
                    </Alert>
                )}
                {showAlert && (
                    <Alert>
                        Password must be at least 8 characters
                        long and contain at least one uppercase letter,
                        one lowercase letter,one symbol, and one number!
                    </Alert>
                )}
                {showCPasswordAlert && (
                    <Alert>
                        Password not Matched!
                    </Alert>
                )}

                <TextFieldStyle
                    required
                    id="outlined-required"
                    type="text"
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, EmailInputRef)}
                />
                <TextFieldStyle
                    required
                    id="outlined-required"
                    type="email"
                    placeholder='Enter your Email Id'
                    onChange={(e) => setEmail(e.target.value)}
                    inputRef={EmailInputRef}
                    onKeyPress={(e) => handleKeyPress(e, PasswordInputRef)}
                    error={showEmailError && !validator.isEmail(email)}
                    helperText={showEmailError ? 'invalid format' : ''}
                />
                <OutlinedInputStyle
                    required
                    id="outlined-required"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButtonStyle
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButtonStyle>
                        </InputAdornment>
                    }
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    inputRef={PasswordInputRef}
                    onKeyPress={(e) => handleKeyPress(e, ConfirmPasswordInputRef)}
                    error={showAlert && !passwordSchema.validate(password)}
                />
                <OutlinedInputStyle
                    required
                    id="outlined-required"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    inputRef={ConfirmPasswordInputRef}

                />

                <ButtonStyle variant="contained" color="success" onClick={onClickLogin}>
                    SignUp
                </ButtonStyle>

                {showAlert && (
                    <AlertStyle variant="filled" severity="info">
                        Invalid Information!
                    </AlertStyle>
                )}
            </BoxStyle>
        </Fragment>
    )
}
export default SignupScreen;