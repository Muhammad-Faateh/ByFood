import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReviewService from "../../../services/ReviewService";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReviewDialog = (props) => {
  const { open, HandleCloseDialog, restaurantID, reviewID, GetRestaurant } =
    props;
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    error: false,
    message: "",
  });
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandleDelete = async () => {
    ReviewService.DeleteReview(reviewID, { restaurantID }).then((response) => {
      setAlert({ ...isAlert, openAlert: true, error: false });
      GetRestaurant();
      HandleCloseDialog();
    });
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
            Are you sure you want to delete your review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={HandleDelete}
            style={{ backgroundColor: "#E0475B", color: "white" }}
          >
            Delete
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
        <Alert
          severity={isAlert.error ? "error" : "success"}
          onClose={CloseAlert}
        >
          {isAlert.error ? isAlert.message : "Delete SuccessFully"}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ReviewDialog;
