import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";

function Topnav(props) {
  const history = useHistory();
  const [offsetY, setOffsetY] = useState(0);
  const user = { avatar: null, name: "Employee Name" };

  const handleLogout = async (evt) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
    document.cookie = "access_token=; expires=Thu, 18 Dec 1970 12:00:00 UTC";
    history.push("/sign-in");
  };

  useEffect(() => {
    setOffsetY(window.pageYOffset);
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav className={`topnav ${offsetY > 50 ? "sticky" : ""}`}>
        <div className="container">
          <div className="options">
            <div className="option">
              <div className="logo color-navy">
                <h4 className="fw-700 cursor-pointer">CPF</h4>
              </div>
            </div>
            <div className="option color-lightgreen">
              <div className="avatar mr-3 ml-3">
                <Avatar
                  src={user.avatar}
                  className="xs mr-2"
                  sx={{ bgcolor: "#79ab81" }}
                />

                <p className="xs text-center">{user.name}</p>
              </div>
              <div className="logout" onClick={(evt) => handleLogout(evt)}>
                <p className="xs ml-3 text-center cursor-pointer">ออกจากระบบ</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

Topnav.defaultProps = {};
Topnav.propTypes = {
  // processName: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(Topnav);
