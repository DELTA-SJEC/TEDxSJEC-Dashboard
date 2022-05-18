/* eslint-disable */
import React from "react";
import {
  Button,
  Card,
  Modal,
  Typography,
  ListItem,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import "./Style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 425,
  bgcolor: "background.paper",

  scrollbarWidth: "none" /* Firefox */,
  boxShadow: 24,
  p: 4,
  height: "90vh",
  overflowY: "scroll",
};

const style_list = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
  borderRadius: 2,
};

const successCard = {
  bgcolor: "#b9fbc0",
  boxShadow: 24,
  p: 2,
  marginTop: 5,
  width: 360,
};
const failureCard = {
  bgcolor: "#ffadad",
  boxShadow: 24,
  p: 2,
  marginTop: 5,
  width: 360,
};
const noerror = {
  display: "none",
};
const errors = {};

const More = (payData) => {
  console.log(payData);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} id="moreContainer">
          <Typography
            id="modal-modal-title"
            color="#00ab55"
            variant="h3"
            component="h2"
          >
            Payment Details
          </Typography>

          {payData.payData.map((element) => {
            return (
              <Card
                sx={element.status == "captured" ? successCard : failureCard}
              >
                <List
                  sx={style_list}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <ListItem button>
                    <ListItemText primary="Payment ID" secondary={element.id} />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="Amount"
                      secondary={parseInt(element.amount) / 100}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary="Payment Method"
                      secondary={element.method}
                    />
                  </ListItem>
                  <Divider />

                  <ListItem button>
                    <ListItemText
                      primary="Status"
                      secondary={
                        element.status == "captured" ? "Success" : "Failed"
                      }
                    />
                  </ListItem>
                  <Divider
                    sx={element.status == "captured" ? noerror : errors}
                  />
                  <ListItem
                    button
                    sx={element.status == "captured" ? noerror : errors}
                  >
                    <ListItemText
                      primary="Error Reason"
                      secondary={element.error_reason}
                    />
                  </ListItem>
                </List>
              </Card>
            );
          })}
        </Card>
      </Modal>
    </div>
  );
};

export default More;
