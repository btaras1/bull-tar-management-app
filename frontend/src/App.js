import "./App.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Main } from "./lib/style/generalStyles";
import Dogs from "./Pages/Dogs/Dogs";
import Mating from "./Pages/Mating/Mating";
import Home from "./Pages/Home/Home";
import Litter from "./Pages/Litter/Litter";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Buyers from "./Pages/Buyers/Buyers";
import Admin from "./Pages/Admin/Admin";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu";

const App = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const { setIsLoggedIn, setIsAdmin, isAdmin, isLoggedIn } =
    useContext(AuthContext);
  const history = useHistory();

  const openHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("authToken") ? true : false);
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    if (localStorage.getItem("authToken") === null) setIsLoggedIn(false);
    if (!isLoggedIn) history.push("/login");
  }, [isLoggedIn, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    history.push("/login");
  };

  return (
    <>
      {hamburgerMenu ? (
        <>
          <Header
            setHamburgerMenu={openHamburgerMenu}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <Main>
            <HamburgerMenu
              onLogout={handleLogout}
              isAdmin={isAdmin}
              setHamburgerMenu={openHamburgerMenu}
            />
          </Main>
        </>
      ) : (
        <>
          <Header
            setHamburgerMenu={openHamburgerMenu}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            isAdmin={isAdmin}
          />
          <Main>
            <Router history={history}>
              <Switch>
                {isLoggedIn ? (
                  <>
                    <ProtectedRoute exact path="/" component={Home} />
                    <ProtectedRoute path="/dog" component={Dogs} />
                    <ProtectedRoute path="/mating" component={Mating} />
                    <ProtectedRoute path="/litter" component={Litter} />
                    <ProtectedRoute path="/buyer" component={Buyers} />
                    <ProtectedRoute
                      isAdminRoute={true}
                      path="/users"
                      component={Admin}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/login" component={Login} />
                    <Redirect from="*" to="/login" />
                  </>
                )}
              </Switch>
            </Router>
          </Main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
