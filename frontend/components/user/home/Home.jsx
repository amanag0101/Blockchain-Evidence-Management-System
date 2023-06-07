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
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/pages/_app";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import AddCaseDialog from "../case/AddCase";

const theme = createTheme();

export default function UserHome() {
  const router = useRouter();
  const { account, contract } = useContext(AppContext);
  const [openAddCaseDialog, setOpenAddCaseDialog] = useState(false);
  const [getAllCases, setGetAllCases] = useState(false);

  const [data, setData] = useState([
    {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: [],
    },
  ]);

  useEffect(() => {
    // console.log();
    getCases();
  }, []);

  useEffect(() => {
    if (getAllCases) {
      console.log();
      getCases();
      setGetAllCases(false);
    }
  }, [getAllCases]);

  const getCases = async () => {
    await contract?.methods
      .getCases(account)
      .call()
      .then((cases) => setData(cases));
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
                  image="/icons/folder.png"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item[2]}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="h4">
                    {item[3]}
                  </Typography>
                  <Typography>{item[4]}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => router.push(`/user/view-case/${item[0]}`)}
                  >
                    View Evidence
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Fab
          sx={{
            position: "sticky",
            bottom: "5vh",
            right: "0",
            marginLeft: "82%",
          }}
          variant="extended"
          onClick={() => setOpenAddCaseDialog(true)}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Add new Case
        </Fab>

        {openAddCaseDialog ? (
          <AddCaseDialog
            openAddCaseDialog={openAddCaseDialog}
            setOpenAddCaseDialog={setOpenAddCaseDialog}
            setGetAllCases={setGetAllCases}
          />
        ) : (
          <></>
        )}
      </Container>
    </ThemeProvider>
  );
}
