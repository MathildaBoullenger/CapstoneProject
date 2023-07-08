import "./App.css";
import WelcomeComponent from "./components/WelcomeComponent";
import LoginForm from "./components/LoginForm";
import ProfileSetupForm from "./components/ProfileSetUpForm";
import SignUpForm from "./components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import { RegistrationProvider } from "./components/RegistrationContext";
import { ProfileProvider } from "./components/ProfileContext";

function App() {
  return (
    <>
      <RegistrationProvider>
        <ProfileProvider>
          <Routes>
            <Route exact path="/" element={<WelcomeComponent />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/signup" element={<SignUpForm />} />
          </Routes>
        </ProfileProvider>
      </RegistrationProvider>
    </>
  );
}

export default App;
