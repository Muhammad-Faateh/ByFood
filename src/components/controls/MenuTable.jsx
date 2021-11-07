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

const useStyle = makeStyles({
  List: {
    "& li": {
      display: "inline-block",
    },
  },
});

const MenuTable = (props) => {
  const classes = useStyle();
  const { searchItem, MenuData, Action } = props;
  const [active, setActive] = React.useState({
    idActive: false,
    nameActive: false,
    categoryActive: false,
    priceActive: false,
  });
  const [sortNumberField, setSortNumberField] = React.useState("");
  const [sortAlphaField, setSortAlphaField] = React.useState("");
  const [direction, setDirection] = React.useState(false);

  const MenuDataSort = [...MenuData];

  MenuDataSort.sort((a, b) => {
    if (active.priceActive || active.idActive) {
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

  React.useEffect(() => {
    console.log([active]);
  }, [active]);

  const HandleIdSort = () => {
    setActive({ [active]: false, idActive: true });
    setDirection(!direction);
    setSortNumberField("menuId");
  };
  const HandleNameSort = () => {
    setActive({ [active]: false, nameActive: true });
    setDirection(!direction);
    setSortAlphaField("name");
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

  return (
    <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
      <Table size="small">
        <TableHead style={{ backgroundColor: "#E0475B" }}>
          <TableRow>
            <TableCell style={{ color: "white" }}>
              <TableSortLabel
                active={active.idActive}
                direction={direction ? "asc" : "desc"}
                onClick={HandleIdSort}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ color: "white" }}>
              <TableSortLabel
                active={active.nameActive}
                direction={direction ? "asc" : "desc"}
                onClick={HandleNameSort}
              >
                Food Name
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ color: "white" }}>Description</TableCell>
            <TableCell style={{ color: "white" }}>
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
            <TableCell style={{ color: "white" }}>Picture</TableCell>
            {Action && (
              <TableCell style={{ color: "white" }} align="center">
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {MenuDataSort.filter((menuitems) => {
            let menuNames = menuitems.name.toUpperCase();
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
                <TableCell>{menuitems.menuId}</TableCell>
                <TableCell>{menuitems.name}</TableCell>
                <TableCell align="center" style={{ maxWidth: "20rem" }}>
                  {menuitems.description}
                </TableCell>
                <TableCell>{menuitems.category}</TableCell>
                <TableCell>{menuitems.price}</TableCell>
                <TableCell>{menuitems.picture}</TableCell>
                {Action && (
                  <TableCell align="center">
                    <ul className={classes.List}>
                      <li>
                        <Button
                        // onClick={()}
                        >
                          <EditIcon color="warning" />
                        </Button>
                      </li>
                      <li>
                        <Button>
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
  );
};

export default MenuTable;
