import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MenuService from "../../services/MenuService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AlertDialog = (props) => {
  const { open, HandleCloseDialog, deleteId, getOwner, ownerId } = props;

  const HandleDelete = async () => {
    MenuService.DeleteMenuItem(`deleteitems/${deleteId}`, {
      id: ownerId,
    })
      .then((response) => {
        HandleCloseDialog();
        getOwner();
      })
      .catch((error) => {
        console.log(error);
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
            Are you sure you want to delete this item?
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
    </div>
  );
};
export default AlertDialog;
