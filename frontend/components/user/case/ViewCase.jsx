import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import AddEvidenceDialog from "./AddEvidence";
import { AppContext } from "@/pages/_app";
import { useContext, useState, useEffect } from "react";

const theme = createTheme();

export default function ViewCase({ caseId }) {
  const [openAddEvidenceDialog, setOpenAddEvidenceDialog] = useState(false);
  const [getAllEvidence, setGetAllEvidence] = useState(false);
  const { contract, account } = useContext(AppContext);
  const [data, setData] = useState([
    {
      0: "",
      1: "",
      2: "",
      3: "",
      4: ""
    },
  ]);

  useEffect(() => {
    getEvidence();
  }, []);

  useEffect(() => {
    if (getAllEvidence) {
      getEvidence();
      setGetAllEvidence(false);
    }
  }, [getAllEvidence]);

  const getEvidence = async () => {
    await contract?.methods
      .getEvidenceForCase(caseId)
      .call({ from: account })
      .then((evidences) => setData(evidences));
  };

  const getDate = (timestamp) => {
    const timestampInSeconds = timestamp;
    const timestampInMilliseconds = timestampInSeconds * 1000;
    const date = new Date(timestampInMilliseconds);

    const options = { timeZone: "Asia/Kolkata" };
    const dateString = date.toLocaleDateString("en-IN", options);

    return dateString;
  };

  const getTime = (timestamp) => {
    const timestampInSeconds = timestamp;
    const timestampInMilliseconds = timestampInSeconds * 1000;
    const date = new Date(timestampInMilliseconds);

    const options = { timeZone: "Asia/Kolkata" };
    const timeString = date.toLocaleTimeString("en-IN", options);

    return timeString;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {data?.map((item) => (
            <Grid item key={item[0]} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://gateway.pinata.cloud/ipfs/${item[4]}`}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    ID: {item[0]}
                  </Typography>
                  <Typography>
                    <b>Upload Date:</b> {getDate(item[1])}
                  </Typography>
                  <Typography>
                    <b>Upload Time:</b> {getTime(item[1])}
                  </Typography>
                  <Typography>
                    <b>Type:</b> {item[2]}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: 1,
                    }}
                  >
                    {item[3]}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <div
        style={{
          position: "sticky",
          bottom: "5vh",
          right: "0",
          marginLeft: "82%",
          marginBottom: "20px",
        }}
      >
        <Fab variant="extended" onClick={() => setOpenAddEvidenceDialog(true)}>
          <NavigationIcon sx={{ mr: 1 }} />
          Add new Evidence
        </Fab>
      </div>

      {openAddEvidenceDialog ? (
        <AddEvidenceDialog
          openAddEvidenceDialog={openAddEvidenceDialog}
          setOpenAddEvidenceDialog={setOpenAddEvidenceDialog}
          setGetAllEvidence={setGetAllEvidence}
          caseId={caseId}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}
