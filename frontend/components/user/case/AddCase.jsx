import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AppContext } from "@/pages/_app";
import { useContext, useState } from "react";

export default function AddCaseDialog({
  openAddCaseDialog,
  setOpenAddCaseDialog,
  setGetAllCases
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { account, contract } = useContext(AppContext);
  const [caseName, setCaseName] = useState("");
  const [caseType, setCaseType] = useState("");
  const [caseDescription, setCaseDescription] = useState("");

  const handleClose = () => {
    setOpenAddCaseDialog(false);
  };

  const handleSubmit = () => {
    addCase();
    setGetAllCases(true);
    handleClose();
  };

  const addCase = async () => {
    await contract.methods
      .registerCase(caseName, caseType, caseDescription)
      .send({ from: account, gas: 3000000 });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openAddCaseDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Add a new Case"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Case Name"
                  name="name"
                  onChange={(e) => setCaseName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="type"
                  label="Case Type"
                  name="type"
                  onChange={(e) => setCaseType(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Case Description"
                  name="description" 
                  onChange={(e) => setCaseDescription(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
