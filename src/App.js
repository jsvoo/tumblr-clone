import "./styles.css";
import "./singlePostStyles.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LandingPage from "./components/LandingPage";
import Admin from "./components/Admin";
import TumblrContext from "./context/TumblrContext";
import CreatePost from "./components/CreatePost";
import FullPost from "./components/FullPost";
import Profile from "./components/Profile";
export default function App() {
  return (
    <div className="App">
      <TumblrContext>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route element={<Navigation />} path="nav" />
            <Route element={<Profile />} path="profile" />
            <Route element={<Admin />} path="admin" />
            <Route element={<FullPost />} path="post/:id" />
            <Route element={<FullPost />} path="admin/post/:id" />
            <Route element={<LandingPage />} path="/" />
            <Route element={<CreatePost />} path="create" />
          </Routes>
        </BrowserRouter>
      </TumblrContext>
    </div>
  );
}
