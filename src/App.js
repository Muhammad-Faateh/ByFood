import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserHomePage from "./components/pages/CustomerPage/HomePage";

import FaqPage from "./components/pages/HomePages/FaqPage";
import HomePage from "./components/pages/HomePages/HomePage";
import PrivacyPage from "./components/pages/HomePages/PrivacyPage";
import TermsPage from "./components/pages/HomePages/TermsPage";
import AddMenuItem from "./components/pages/RestaurantPages/AddMenuitem";
import AllRestaurants from "./components/pages/RestaurantPages/AllRestaurants";
import CreateRestaurant from "./components/pages/RestaurantPages/CreateRestaurant";
import EditMenuItem from "./components/pages/RestaurantPages/EditMenuitem";
import EditRestaurant from "./components/pages/RestaurantPages/EditRestaurant";
import RestaurantHomePage from "./components/pages/RestaurantPages/HomePage";
import Posts from "./components/pages/RestaurantPages/Posts";
import Restaurant from "./components/pages/RestaurantPages/Restaurant";
import OwnerForgotPassword from "./components/pages/Sign up pages/OwnerForgotPassword";
import OwnerLogIn from "./components/pages/Sign up pages/OwnerLogIn";
import OwnerSignUp from "./components/pages/Sign up pages/OwnerSignUp";
import UserForgotPassword from "./components/pages/Sign up pages/UserForgotPassword";
import UserLogIn from "./components/pages/Sign up pages/UserLogIn";
import UserSignUp from "./components/pages/Sign up pages/UserSignUp";
import OwnersService from "./services/OwnerService";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/termsandcondition" exact component={TermsPage} />
        <Route path="/privacypolicy" exact component={PrivacyPage} />
        <Route path="/faq" exact component={FaqPage} />

        {/* sign ups routes  */}
        <Route path="/usersignup" exact component={UserSignUp} />
        <Route path="/ownersignup" exact component={OwnerSignUp} />
        <Route path="/userlogin" exact component={UserLogIn} />
        <Route path="/ownerlogin" exact component={OwnerLogIn} />
        <Route
          path="/ownerforgotpassword"
          exact
          component={OwnerForgotPassword}
        />
        <Route
          path="/userforgotpassword"
          exact
          component={UserForgotPassword}
        />

        {/*       OWNERS PAGES       */}

        <Route path="/createrestaurant" exact component={CreateRestaurant} />
        <Route path="/editrestaurant" exact component={EditRestaurant} />
        <Route path="/myrestaurant" exact component={RestaurantHomePage} />
        <Route path="/allrestaurants" exact component={AllRestaurants} />
        <Route path="/allrestaurants/:id" exact component={Restaurant} />
        <Route path="/addmenuitem" exact component={AddMenuItem} />
        <Route path="/editmenuitem/:id" exact component={EditMenuItem} />
        <Route path="/posts" exact component={Posts} />

        {/*       USERS PAGES       */}
        <Route path="/userhome" exact component={UserHomePage} />
      </Switch>
    </Router>
  );
}

export default App;
