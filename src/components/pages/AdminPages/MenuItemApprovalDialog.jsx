import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import RestaurantService from "../../../services/RestaurantService";
import NotifService from "../../../services/NotifService";
import MenuService from "../../../services/MenuService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MenuItemApprovalDialog = (props) => {
  const { open, HandleCloseDialog, ownerID, role, getOwners, itemID } = props;
  console.log("ownerid", ownerID);
  console.log("itemID ", itemID);
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    severity: "",
    message: "",
  });
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandleApprove = async () => {
    MenuService.ApproveMenuItem(itemID, { ownerID: ownerID }).then(
      (response) => {
        NotifService.CreateNotif({
          id: ownerID,
          role,
          message:
            "Your request for approval of menuitem was accepted by admin",
        });
        HandleCloseDialog();
        getOwners();
        setAlert({
          openAlert: true,
          severity: "success",
          message: "Request Approved",
        });
      }
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={HandleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to approve this menu item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleApprove} color="success" variant="contained">
            Approve
          </Button>
          <Button
            onClick={HandleCloseDialog}
            variant="contained"
            color="primary"
          >
            Cancel
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
export default MenuItemApprovalDialog;
