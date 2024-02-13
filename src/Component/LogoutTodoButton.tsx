import { generatePath, useNavigate } from "react-router-dom";
import APP_ROUTES from "../Constant/Routes";
import { LogoutButton } from "../Style/HomeStyle"

const LogoutTodoButton: React.FC = () => {
  const navigate = useNavigate();
  const handleLogoutButtonClick = () => {
    localStorage.removeItem('loggedInData');
    navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
  };
  return (
    <LogoutButton onClick={() => handleLogoutButtonClick()}>
      logout
    </LogoutButton>
  )
}
export default LogoutTodoButton;