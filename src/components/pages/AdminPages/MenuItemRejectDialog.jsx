import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import { FormControlLabel, RadioGroup, Snackbar } from "@mui/material";
import RestaurantService from "../../../services/RestaurantService";
import NotifService from "../../../services/NotifService";
import Radio from "@mui/material/Radio";
import MenuService from "../../../services/MenuService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MenuItemRejectDialog = (props) => {
  const { open, HandleCloseDialog, ownerID, role, getOwners, itemID } = props;
  const [messages, setMessage] = React.useState("None");
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    severity: "",
    message: "",
  });
  const options = [
    "None",
    "Inappropriate Image",
    "Inappropriate Food Name",
    "Give price too low",
    "Given price too high",
    "Inappropriate Description",
  ];
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandleRejection = () => {
    MenuService.RejectMenuItem(itemID, { ownerID: ownerID }).then(
      (response) => {
        setAlert({
          openAlert: true,
          severity: "success",
          message: "Request Rejected",
        });
        NotifService.CreateNotif({
          id: ownerID,
          role,
          message: `Your request for addition of menu item was rejected by Admin. Reason: ${messages}`,
        });
        HandleCloseDialog();
        getOwners();
      }
    );
  };

  return (
    <div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Reasons</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            name="message"
            value={messages}
            onChange={(event) => setMessage(event.target.value)}
          >
            {options.map((option) => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={HandleCloseDialog}>
            Cancel
          </Button>
          <Button
            disabled={messages === "None" ? true : false}
            onClick={HandleRejection}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isAlert.openAlert}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={CloseAlert}
      >
        <Alert severity={isAlert.severity} onClose={CloseAlert}>
          {isAlert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default MenuItemRejectDialog;
