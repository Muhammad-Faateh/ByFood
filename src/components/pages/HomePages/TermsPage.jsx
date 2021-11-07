import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeFooter from "../../controls/HomeFooter";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  Body: {
    backgroundColor: "white",
    paddingTop: "5rem",
    "& h1": {
      textAlign: "center",
      margin: "2rem 0px",
    },
    "& Button": {
      marginLeft: "1rem",
      backgroundColor: "#E0475B",
      "&:hover": {
        backgroundColor: "#E0475B",
      },
    },
    "& p": {
      margin: "1.5rem",
      fontSize: "1.1rem",
      paddingBottom: "1.5rem",
    },
    "& h2": {
      marginLeft: "1.5rem",
    },
  },
});

const TermsPage = () => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <div>
      <div className={classes.Body}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => history.push("/")}
        >
          Home
        </Button>
        <h1>Terms and Condition</h1>
        <h2>Copyright Notices:</h2>
        <p>
          Unless otherwise specified, the copyright in the contents of all the
          pages in this Website are owned by or licensed to ByFood.com.
        </p>
        <h2>Data Protection and Privacy :</h2>
        <p>
          All contact details that you provide, is used for identification, and
          is held and processed in accordance with our Registration Data
          Protection policies. Where you are required to register before
          accessing a service, the information gathered is used for invoicing,
          issuing passwords, and for the occasional dispatch of information
          which may help you to make better use of our services. We will respect
          your email privacy, and no customer or visitor information will be
          passed on to third parties without your prior consent
        </p>
        <h2>Limitation of Liability:</h2>
        <p>
          For each and every tender/RFP information initial tender notice
          (issued by the tendering authority) has been made available on
          website. Bidders are requested to read the tender notices very
          carefully etenders.com and its affiliates, agents, and licensors
          provide the service on as is basis, and cannot and do not warrant the
          accuracy, completeness, correctness, non- infringement,
          merchantability, or fitness for a particular purpose of the
          information available through this service, or the service itself.
          Neither Etenders.com nor any of its employee, affiliates, agents, or
          licensors shall be liable to users or anyone else for any loss or
          injury caused in whole or part by its negligence or contingencies
          beyond its control in procuring, compiling, interpreting, reporting,
          or delivering the service and any information through the service.
        </p>
      </div>
      <HomeFooter />
    </div>
  );
};

export default TermsPage;
