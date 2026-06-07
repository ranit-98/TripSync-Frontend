import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { memo, useCallback } from "react";

function DeleteAccountCard() {
  const handleDeleteAccount = useCallback(() => {
    // Delete account endpoint is not available in this client yet.
  }, []);

  return (
    <Box className="danger_panel">
      <Box>
        <Typography className="danger_title" component="h2">
          Danger Zone
        </Typography>
        <Typography className="danger_copy">
          Once you delete your account, there is no going back. Please be certain.
        </Typography>
      </Box>
      <Button
        className="delete_btn"
        onClick={handleDeleteAccount}
        startIcon={<DeleteIcon />}
        type="button"
        variant="contained"
      >
        Delete Account
      </Button>
    </Box>
  );
}

export default memo(DeleteAccountCard);
