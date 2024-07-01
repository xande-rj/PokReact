import { Button } from "@mui/material";

interface Props {
  handleLogout: () => void;
}

export const LogoutButton: React.FC<Props> = ({ handleLogout }) => {
  return (
    <Button onClick={handleLogout} variant="outlined" color="error">
      Logout
    </Button>
  );
};
