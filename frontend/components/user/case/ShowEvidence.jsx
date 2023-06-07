import { Button, Modal } from "@mui/material";

export default function ShowEvidence({
  showEvidence,
  setShowEvidence,
  imgHash,
}) {
  const handleClose = () => {
    setShowEvidence(false);
  };

  return (
    <div>
      <Modal
        sx={{
          backgroundColor: "#ccc",
          width: "80%",
          margin: "auto",
          height: "80%",
        }}
        open={showEvidence}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src={imgHash}
            alt="Image in modal"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
          <Button
            sx={{
              color: "#fff",
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
