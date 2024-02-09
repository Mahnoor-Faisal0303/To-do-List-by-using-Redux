import React, { Fragment, useEffect, useState } from 'react';
import { AlertStyle, BoxStyle, ButtonStyle, IconButtonStyle, LinkStyle, OutlinedInputStyle, TextFieldStyle, TypographyStyle } from '../LoginScreenStyle';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { generatePath, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Store/Slices/loginSlice';
import { useDispatch } from 'react-redux';
import APP_ROUTES from '../Constant/Routes';
import uuid from 'react-uuid';

const LoginScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const passwordInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loginData = localStorage.getItem("loggedInData");
        if (loginData) {
            navigate(generatePath(APP_ROUTES.HOME_PAGE));
        }
    },[navigate]);

    const loginFunction = () => {
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
                console.log("not found");
                setShowAlert(true);
                setTimeout(function () {
                    setShowAlert(false);
                }, 2000);
            }
        }
        else{
            setShowAlert(true);
                setTimeout(function () {
                    setShowAlert(false);
                }, 2000);
        }
    }


    // const isLoggedIn = useSelector((state: RootState) => state.logins.isLoggedIn);
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate(generatePath(APP_ROUTES.HOME_PAGE))
    //     }
    // })
    return (
        <Fragment>
            <BoxStyle>
                <TypographyStyle variant="h3">Login /
                    <LinkStyle href="#" underline="hover" onClick={() => navigate(generatePath(APP_ROUTES.SIGNUP_PAGE))}>
                        {' SignUP'}
                    </LinkStyle>
                </TypographyStyle>

                <TextFieldStyle
                    required
                    id="outlined-required"
                    type="email"
                    value={email}
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, passwordInputRef)}
                />
                <OutlinedInputStyle
                    required
                    id="outlined-required"
                    placeholder='Enter Password'
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    inputRef={passwordInputRef}
                />

                <ButtonStyle variant="contained" color="success" onClick={loginFunction} >
                    Login
                </ButtonStyle>

                {showAlert && (
                    <AlertStyle variant="filled" severity="info">
                        Invalid Email or Password!
                    </AlertStyle>
                )}
            </BoxStyle>
        </Fragment>
    );
};

export default LoginScreen;


