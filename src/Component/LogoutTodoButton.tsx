// import { generatePath, useNavigate } from "react-router-dom";
// import APP_ROUTES from "../Constant/Routes";
// import { LogoutButton } from "../Style/HomeStyle"
// import { useSelector } from "react-redux";
// import { RootState } from "../store";

// const LogoutTodoButton: React.FC = () => {
//   const navigate = useNavigate();
//   const auth = useSelector((state: RootState) => state.logins);
//   const handleLogoutButtonClick = () => {
//    // localStorage.removeItem('loggedInData');
   
//     navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
//   };
//   return (
//     <LogoutButton onClick={() => handleLogoutButtonClick()}>
//       logout
//     </LogoutButton>
//   )
// }
// export default LogoutTodoButton;

// src/Components/LogoutTodoButton.tsx

// import React from 'react';
// import { generatePath, useNavigate } from 'react-router-dom';
// import APP_ROUTES from '../Constant/Routes';
// import { LogoutButton } from '../Style/HomeStyle';
// import { useDispatch } from 'react-redux';
// import { setLoggedOut } from '../Store/Slices/loginSlice';

// const LogoutTodoButton: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogoutButtonClick = () => {
//     dispatch(setLoggedOut());
//     navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
//   };

//   return (
//     <LogoutButton onClick={handleLogoutButtonClick}>
//       Logout
//     </LogoutButton>
//   );
// };

// export default LogoutTodoButton;

import React from 'react';
import { LogoutButton } from '../Style/HomeStyle';

interface LogoutButtonProps {
    onClick: () => void;
  }
const LogoutTodoButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
    return (
        <LogoutButton onClick={onClick}>
            Logout
        </LogoutButton>
    );
};

export default LogoutTodoButton;
