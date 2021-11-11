import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DateTimePicker from "react-datetime-picker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slide from "@mui/material/Slide";
import Collapse from "@mui/material/Collapse";
import { onMounted } from "../helpers/frontend";

function CalendarMenu(props) {
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(0);
  const [repeat, setRepeat] = useState(false);

  const handleChangeRepeat = () => {
    setRepeat((prev) => !prev);
  };

  useEffect(() => {
    onMounted();
  }, []);
  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <Slide direction="right" in={props.open} mountOnEnter unmountOnExit>
          <div className="popup-container left">
            <div className="calendar-menu-container">
              <div className="options d-space-between header">
                <div className="option left">
                  <div className="cursor-pointer">
                    <CloseIcon onClick={props.onClose} />
                  </div>
                </div>
                <div className="option right d-flex">
                  <div className="option other">
                    <div className="cursor-pointer">
                      <DeleteOutlineOutlinedIcon />
                    </div>
                  </div>
                  <div className="option save">
                    <Button
                      className="bgcolor-lightgreen"
                      variant="contained"
                      sx={{
                        fontFamily: "Kanit",
                        borderRadius: "25px",
                      }}
                    >
                      <p>บันทึก</p>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="content-left">
                  <p className="mb-5">เลือกเวลาที่สามารถทำงานได้</p>
                  <div className="datetime-picker-wrapper">
                    <DateTimePicker onChange={setStart} value={start} />
                    <h5 className="color-grey px-6">-</h5>
                    <DateTimePicker onChange={setStop} value={stop} />
                  </div>

                  <FormControlLabel
                    className="ml-0"
                    control={
                      <Checkbox value={repeat} onChange={handleChangeRepeat} />
                    }
                    label="ทำซ้ำ"
                  />
                </div>
                <Collapse orientation="horizontal" in={repeat}>
                  <div className="content-right">
                    <p className="mb-5">ทำซ้ำ</p>
                    <select name="table">
                      <option value="1">ทุกวัน</option>
                      <option value="2">ทุกสัปดาห์</option>
                      <option value="3">ทุกเดือน</option>
                    </select>
                    <div className="d-item-bottom ">
                      <p>ทำซ้ำทุก</p>
                      <input type="number" className="inp-day-repeat" />
                      <p>วัน</p>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
    </>
  );
}

CalendarMenu.defaultProps = { open: false };
CalendarMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(CalendarMenu);
