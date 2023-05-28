import * as React from "react";
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
import { useContext, useState } from "react";
import { AppContext } from "@/pages/_app";

export default function AddEvidenceDialog({
  openAddEvidenceDialog,
  setOpenAddEvidenceDialog,
  setGetAllEvidence,
  caseId,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { account, contract } = useContext(AppContext);
  const [evidenceType, setEvidenceType] = useState("");
  const [evidenceDescription, setEvidenceDescription] = useState("");

  const handleClose = () => {
    setOpenAddEvidenceDialog(false);
  };

  const handleSubmit = () => {
    addEvidence();
    setGetAllEvidence(true);
    handleClose();
  };

  const addEvidence = async () => {
    await contract.methods
      .addEvidenceToCase(caseId, evidenceType, evidenceDescription)
      .send({ from: account, gas: 3000000 });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openAddEvidenceDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Add new Evidence"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="evidenceType"
                  label="Evidence Type"
                  name="evidenceType"
                  onChange={e => setEvidenceType(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="evidenceDescription"
                  label="Evidence Description"
                  name="evidenceDescription"
                  onChange={e => setEvidenceDescription(e.target.value)}
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
