import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";

const Header = () => {
  const uname = useSelector((state) => state.users.UserName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    //ensure that the state update from the logout action has been processed before proceeding to the next step.
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login"); //redirect to login page route.
  };

  return (
    <div>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <img src={logo} className="logoImage" />
          </NavItem>

          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>

          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>

          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>

          <NavItem>
            <Link to="/register">Register</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handlelogout}>Logout</Link>
          </NavItem>

          <NavItem>Hi {uname} !</NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
