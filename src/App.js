import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
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
import Restaurant from "./components/pages/RestaurantPages/Restaurant";
import OwnerForgotPassword from "./components/pages/Sign up pages/OwnerForgotPassword";
import OwnerLogIn from "./components/pages/Sign up pages/OwnerLogIn";
import OwnerSignUp from "./components/pages/Sign up pages/OwnerSignUp";
import UserForgotPassword from "./components/pages/Sign up pages/UserForgotPassword";
import UserLogIn from "./components/pages/Sign up pages/UserLogIn";
import UserSignUp from "./components/pages/Sign up pages/UserSignUp";
import UserRestaurants from "./components/pages/CustomerPage/UserRestaurants";
import UserRestaurant from "./components/pages/CustomerPage/UserRestaurant";
import OwnerPost from "./components/pages/RestaurantPages/OwnerPost";
import UserPost from "./components/pages/CustomerPage/UserPost";
import AdminSignIn from "./components/pages/AdminPages/AdminSignin";
import AdminDashBoard from "./components/pages/AdminPages/AdminDashboard";
import AdminRestaurants from "./components/pages/AdminPages/AdminRestaurants";
import REstaurantApproval from "./components/pages/AdminPages/RestaurantApproval";
import ViewRestaurant from "./components/pages/AdminPages/ViewRestaurant";
import AdminRestaurant from "./components/pages/AdminPages/AdminRestaurant";
import MenuApproval from "./components/pages/AdminPages/MenuApproval";
import AdminProfile from "./components/pages/AdminPages/AdminProfile";
import AdminPost from "./components/pages/AdminPages/AdminPosts";
import ViewMenuItem from "./components/pages/AdminPages/ViewMenuItem";
import MyRestaurantReview from "./components/pages/RestaurantPages/MyRestaurantReview";
import RestaurantView from "./components/pages/RestaurantPages/RestaurantView";
import UserRestaurantView from "./components/pages/CustomerPage/UserRestaurantReview";
import UserProfile from "./components/pages/CustomerPage/UserProfile";
import OwnerProfile from "./components/pages/RestaurantPages/OwnerProfile";

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
        <Route
          path="/myrestaurant/review"
          exact
          component={MyRestaurantReview}
        />

        <Route path="/allrestaurants" exact component={AllRestaurants} />
        <Route path="/allrestaurants/:id" exact component={Restaurant} />
        <Route
          path="/allrestaurants/:id/reviews"
          exact
          component={RestaurantView}
        />
        <Route path="/addmenuitem" exact component={AddMenuItem} />
        <Route path="/editmenuitem/:id" exact component={EditMenuItem} />
        <Route path="/posts" exact component={OwnerPost} />
        <Route path="/ownerprofile" component={OwnerProfile} />

        {/*       USERS PAGES       */}
        <Route path="/restaurants" exact component={UserRestaurants} />
        <Route path="/restaurants/:id" exact component={UserRestaurant} />
        <Route
          path="/restaurants/:id/reviews"
          exact
          component={UserRestaurantView}
        />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/userpost" component={UserPost} />

        {/*          ADMIN PAGES        */}
        <Route path="/adminsignin" exact component={AdminSignIn} />
        <Route path="/admindashboard" exact component={AdminDashBoard} />
        <Route path="/adminallrestaurants" exact component={AdminRestaurants} />
        <Route
          path="/adminallrestaurants/:id"
          exact
          component={AdminRestaurant}
        />
        <Route
          path="/restaurantapprovals"
          exact
          component={REstaurantApproval}
        />
        <Route path="/viewrestaurant/:id" exact component={ViewRestaurant} />
        <Route path="/menuapproval" exact component={MenuApproval} />
        <Route
          path="/viewmenuitem/:ownerId/:menuId"
          exact
          component={ViewMenuItem}
        />

        <Route path="/adminprofile" exact component={AdminProfile} />
        <Route path="/adminposts" exact component={AdminPost} />
      </Switch>
    </Router>
  );
}

export default App;
