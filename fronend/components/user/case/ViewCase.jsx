import * as React from "react";
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
import { useState } from "react";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();

export default function ViewCase() {
  const [openAddEvidenceDialog, setOpenAddEvidenceDialog] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Evidence ID
                    </Typography>
                    <Typography>
                      <b>Upload Date:</b> 22/04/23
                    </Typography>
                    <Typography>
                      <b>Upload Time:</b> 1:00 PM
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 1,
                      }}
                    >
                      A brief description about the Evidence
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
      </main>

      <div
        style={{
          position: "sticky",
          bottom: "5vh",
          right: "0",
          "margin-left": "82%",
          "margin-bottom": "20px",
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
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}
