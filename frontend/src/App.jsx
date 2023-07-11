import "./App.css";
import WelcomeComponent from "./components/WelcomeComponent";
import LoginForm from "./components/LoginForm";
import ProfileSetupForm from "./components/ProfileSetUpForm";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import HobbyList from "./components/HobbyList";
import FacebookAccountForm from "./components/FacebookAccountForm";
import AddActivityForm from "./components/AddActivityForm";
import { UserProvider } from "./components/CredentialsContext";
/*import UpdateProfileForm from "./components/End/UpdateProfileForm";*/

function App() {
  return (
    <>
    <UserProvider>
        <Routes>
          <Route exact path="/" element={<WelcomeComponent />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<RegistrationForm />} />
          <Route exact path="/signup/profile" element={<ProfileSetupForm />} /> {/*common route*/}
          <Route exact path="/hobbies" element={<HobbyList />} />
          <Route exact path="/facebook" element={<FacebookAccountForm />} />
          <Route exact path="/add" element={<AddActivityForm />} />
          {/*<Route exact path="/update" element={<UpdateProfileForm />} />*/}
        </Routes>
    </UserProvider>    
    </>
  );
}

export default App;