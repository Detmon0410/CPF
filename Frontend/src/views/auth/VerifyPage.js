import PropTypes from "prop-types";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { onMounted } from "../../helpers/frontend";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function VerifyPage(props) {
  const history = useHistory();
  const phoneNumber = "09xxxxxx00";

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
    history.push("/");
  };

  useEffect(() => {
    onMounted();
    console.log("Sign-in page");
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
              รหัสยืนยัน 4 หลักจะถูกส่งไปที่ เบอร์ {phoneNumber}
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
