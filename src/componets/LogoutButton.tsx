import { Button } from "@mui/material";
import style from "./css/LogoutButton.module.css"
interface Props {
  handleLogout: () => void;
}

export const LogoutButton: React.FC<Props> = ({ handleLogout }) => {
  return (
    <div className={style.LogoutButton}>
      <Button onClick={handleLogout} variant="contained" color="error">
        Logout
      </Button>
    </div>
  );
};
