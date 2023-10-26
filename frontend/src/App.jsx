import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/AppTheme";
import WelcomeComponent from "./pages/WelcomeComponent";
import LoginForm from "./pages/LoginForm";
import ProfileSetupForm from "./pages/ProfileSetUpForm";
import RegistrationForm from "./pages/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import PrivateRoute from "./PrivateRoute";
import HobbyList from "./pages/HobbyList";
import HobbyPage from "./pages/HobbyPage";
import FacebookAccountForm from "./pages/FacebookAccountForm";
import AddActivityForm from "./pages/AddActivityForm";
import JoinedActivities from "./pages/JoinedActivities";
import CreatedActivities from "./pages/CreatedActivities";
import Menu from "./components/Menu";
import UpdateProfile from "./pages/UpdateProfileForm";
/*import UpdateProfileForm from "./components/End/UpdateProfileForm";*/

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
      <Routes>
        <Route exact path="/" element={<WelcomeComponent />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<RegistrationForm />} />
        <Route
          exact
          path="/signup/profile"
          element={<ProfileSetupForm />}
        />
        {/*common route*/}
        <Route
          exact
          path="/signup/profile/facebook"
          element={<FacebookAccountForm />}
        />
        {/* <Route path="/" element={<HobbyList />} /> */}
        <Route exact path='/' element={<PrivateRoute/>}>
        <Route path="/hobbies" element={<HobbyList />} />
        <Route path="/hobbies/:name" element={<HobbyPage />} />
        <Route exact path="/joined" element={<JoinedActivities />} />
        <Route exact path="/created" element={<CreatedActivities />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/update-profile" element={<UpdateProfile />} />
        <Route exact path="/add-activity" element={<AddActivityForm />} />
        {/*<Route exact path="/update" element={<UpdateProfileForm />} />*/}
        </Route>
      </Routes>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
