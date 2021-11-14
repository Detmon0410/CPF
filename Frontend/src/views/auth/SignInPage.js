import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { onMounted } from "../../helpers/frontend";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { requestOTP } from "../../services/authentication.service"

function SignInPage(props) {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
    const data = await { phone_number: phoneNumber }
    const res = await requestOTP(data)
    if (res.status === 200) {
      dispatch({
        type: 'authentication/requestOTP',
        payload: res.data
      });
      history.push("/verify")
    }
  };

  useEffect(() => {
    onMounted();
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
            <p className="h5 fw-600 text-center mb-3">เข้าสู่ระบบ</p>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                className="mt-6 mb-2 br-25"
                id="outlined-basic"
                label="เบอร์โทรศัพท์"
                type="text"
                variant="outlined"
                color="success"
                sx={{ backgroundColor: "#d2f5d8" }}
                onChange={e => setPhoneNumber(e.target.value) }
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
                <h6>เข้าสู่ระบบ</h6>
              </Button>
            </form>

            <p className="xs text-center mt-4 color-gray underline cursor-pointer">
              แจ้งปัญหาการเข้าสู่ระบบ
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

SignInPage.defaultProps = {};
SignInPage.propTypes = {
  // processName: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(SignInPage);
