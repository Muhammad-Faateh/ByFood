import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TableSortLabel } from "@mui/material";
import OwnersService from "../../services/OwnerService";
import { useHistory } from "react-router";
import AlertDialog from "../controls/AlertDialog";

const useStyle = makeStyles({
  List: {
    "& li": {
      display: "inline-block",
    },
  },
});

const MenuTable = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const {
    searchItem,
    //  MenuData,
    Action,
  } = props;

  const [active, setActive] = React.useState({
    idActive: false,
    nameActive: false,
    categoryActive: false,
    priceActive: false,
  });
  const [sortNumberField, setSortNumberField] = React.useState("");
  const [sortAlphaField, setSortAlphaField] = React.useState("");
  const [direction, setDirection] = React.useState(false);
  const [ownerMenu, setOwnerMenu] = React.useState([]);
  const [openDialog, setDialog] = React.useState(false);
  const [deleteItemId, setDeleteId] = React.useState("");
  const [ownerId, setOwnerid] = React.useState("");

  const getOwner = async () => {
    const GetloggedOwner = await OwnersService.GetLoggedInUser();
    if (!(OwnersService.isLoggedIn() && GetloggedOwner.data.role === "Owner")) {
      history.push("/");
    } else {
      setOwnerMenu(GetloggedOwner.data.restaurant.menu);
      setOwnerid(GetloggedOwner.data._id);
    }
  };

  React.useEffect(() => {
    getOwner();
  }, []);

  const MenuDataSort = [...ownerMenu];

  MenuDataSort.sort((a, b) => {
    if (active.priceActive) {
      if (direction === true) {
        if (a[sortNumberField] < b[sortNumberField]) {
          return -1;
        }
        if (a[sortNumberField] > b[sortNumberField]) {
          return 1;
        }
        return 0;
      } else {
        if (a[sortNumberField] < b[sortNumberField]) {
          return 1;
        }
        if (a[sortNumberField] > b[sortNumberField]) {
          return -1;
        }
        return 0;
      }
    } else if (active.nameActive || active.categoryActive) {
      if (direction === true) {
        if (a[sortAlphaField].toUpperCase() < b[sortAlphaField].toUpperCase()) {
          return -1;
        }
        if (a[sortAlphaField].toUpperCase() > b[sortAlphaField].toUpperCase()) {
          return 1;
        }
        return 0;
      } else {
        if (a[sortAlphaField].toUpperCase() < b[sortAlphaField].toUpperCase()) {
          return 1;
        }
        if (a[sortAlphaField].toUpperCase() > b[sortAlphaField].toUpperCase()) {
          return -1;
        }
        return 0;
      }
    }
  });

  const HandleNameSort = () => {
    setActive({ [active]: false, nameActive: true });
    setDirection(!direction);
    setSortAlphaField("foodName");
  };
  const HandleCategorySort = () => {
    setActive({ [active]: false, categoryActive: true });
    setDirection(!direction);
    setSortAlphaField("category");
  };
  const HandlePriceSort = () => {
    setActive({ [active]: false, priceActive: true });
    setDirection(!direction);
    setSortNumberField("price");
  };
  const HandleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#E0475B" }}>
            <TableRow>
              <TableCell style={{ color: "white" }} align="center">
                #
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                <TableSortLabel
                  active={active.nameActive}
                  direction={direction ? "asc" : "desc"}
                  onClick={HandleNameSort}
                >
                  Food Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Description
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                <TableSortLabel
                  active={active.categoryActive}
                  direction={direction ? "asc" : "desc"}
                  onClick={HandleCategorySort}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  active={active.priceActive}
                  direction={direction ? "asc" : "desc"}
                  onClick={HandlePriceSort}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Picture
              </TableCell>
              {Action && (
                <TableCell style={{ color: "white" }} align="center">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {MenuDataSort.filter((menuitems) => {
              let menuNames = menuitems.foodName.toUpperCase();
              let searchName = searchItem.toUpperCase();
              if (menuNames.includes(searchName)) {
                return menuitems;
              }
            }).map((menuitems, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{menuitems.foodName}</TableCell>
                  <TableCell align="center" style={{ maxWidth: "20rem" }}>
                    {menuitems.description}
                  </TableCell>
                  <TableCell align="center">{menuitems.category}</TableCell>
                  <TableCell>{`Rs.${menuitems.price}`}</TableCell>
                  <TableCell align="center">
                    <img
                      src={menuitems.image}
                      alt="item-image"
                      style={{
                        width: "50%",
                        maxHeight: "5rem",
                        imageRendering: "pixelated",
                      }}
                    />
                  </TableCell>
                  {Action && (
                    <TableCell align="center">
                      <ul className={classes.List}>
                        <li>
                          <Button
                            onClick={() =>
                              history.push(`/editmenuitem/${menuitems._id}`)
                            }
                          >
                            <EditIcon color="warning" />
                          </Button>
                        </li>
                        <li>
                          <Button
                            id={menuitems._id}
                            onClick={(event) => {
                              setDeleteId(event.currentTarget.id);
                              setDialog(true);
                            }}
                          >
                            <DeleteIcon color="error" />
                          </Button>
                        </li>
                      </ul>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertDialog
        open={openDialog}
        HandleCloseDialog={HandleCloseDialog}
        deleteId={deleteItemId}
        getOwner={getOwner}
        ownerId={ownerId}
      />
    </>
  );
};

export default MenuTable;