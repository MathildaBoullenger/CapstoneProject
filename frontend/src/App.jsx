import "./App.css";
import WelcomeComponent from "./components/WelcomeComponent";
import LoginForm from "./components/LoginForm";
import ProfileSetupForm from "./components/ProfileSetUpForm";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import HobbyList from "./components/HobbyList";
import HobbyPage from "./components/HobbyPage";
import FacebookAccountForm from "./components/FacebookAccountForm";
import AddActivityForm from "./components/AddActivityForm";
import JoinedActivities from "./components/JoinedActivities";
import CreatedActivities from "./components/CreatedActivities"
/*import UpdateProfileForm from "./components/End/UpdateProfileForm";*/

function App() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<WelcomeComponent />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<RegistrationForm />} />
          <Route exact path="/signup/profile" element={<ProfileSetupForm />} /> {/*common route*/}
          <Route exact path="/signup/profile/facebook" element={<FacebookAccountForm />} />

          <Route path="/" element={<HobbyList />} />
          <Route path="/hobbies" element={<HobbyList />} />
          <Route path="/hobbies/:name" element={<HobbyPage />} />

          <Route exact path="/joined" element={<JoinedActivities />} />
          <Route exact path="/created" element={<CreatedActivities />} />

          <Route exact path="/add-activity" element={<AddActivityForm />} />
          {/*<Route exact path="/update" element={<UpdateProfileForm />} />*/}
        </Routes>   
    </>
  );
}

export default App;
