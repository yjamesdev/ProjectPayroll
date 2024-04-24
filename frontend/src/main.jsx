import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Nav from "./components/Navbar";
import home from './views/home.jsx'
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Main = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <React.StrictMode>
      <Router>
        <header>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        </header>
        <Nav show={showNav} />
        <div className="main">
          <Route path='/' exact={true} component={home} ></Route>  
        </div>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

export default Main;
