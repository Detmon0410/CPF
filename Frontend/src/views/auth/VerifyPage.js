import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { onMounted } from "../../helpers/frontend";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signInAPI } from "../../services/authentication.service"

function VerifyPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [otpstring, setotp] = useState('');
  const authentication = useSelector(({ authentication }) => authentication);
  const phoneNumber = "0" + authentication.phone_number.slice(3);
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
    const data = {
      phone_number: phoneNumber,
      otp: otpstring
    }
    const res = await signInAPI(data)
    if (res.status === 200) {
      dispatch({
        type: 'user/signin',
        payload: res.data
      });
      if ( res.data.is_manager ) return history.push("/manager")
      else return history.push("/")
      
    }
    // history.push("/");
  };

  useEffect(() => {
    onMounted();
    if (authentication.phone_number === "09xxxxxx00") return history.push('/sign-in')
  }, []);

  return (
    <>
      <section className="section-simple">
        <div className="container">
          <div
            className="simple-card box-shadow"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <p className="h5 fw-600 text-center mb-3">กรอกรหัสยืนยัน</p>

            <p className="xs text-center mt-4 color-gray">
              รหัสยืนยัน 6 หลักจะถูกส่งไปที่ เบอร์ {phoneNumber}
            </p>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                className="mt-6 mb-2 br-25"
                id="outlined-basic"
                label="รหัสยืนยัน"
                variant="outlined"
                color="success"
                sx={{ backgroundColor: "#d2f5d8" }}
                onChange={e => setotp(e.target.value) }
              />
              <Button
                fullWidth
                className="mt-6"
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#315790",
                  fontFamily: "Kanit",
                  borderRadius: "25px",
                  height: "56px",
                }}
              >
                <h6>ยืนยัน</h6>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

VerifyPage.defaultProps = {};
VerifyPage.propTypes = {
  // processName: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(VerifyPage);
