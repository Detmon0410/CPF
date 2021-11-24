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
import { addTime } from "../services/user.service"

function CalendarMenu(props) {
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(0);
  const [repeat, setRepeat] = useState(false);

  const handleChangeRepeat = () => {
    setRepeat((prev) => !prev);
  };
  // start_time: "2021-01-01 00:00:00"
  // end_time: "2021-01-01 00:00:00"
  const submit = () => {
    console.log(
    start? addZero(start.getFullYear())+ '-' + addZero((start.getMonth() + 1))+ '-'+ addZero(start.getDate()) +' ' + addZero(start.getHours())+":"+addZero(start.getMinutes())+':00': undefined, 
    stop? addZero(stop.getFullYear())+ '-' + addZero((stop.getMonth() + 1)) + '-'+ addZero(stop.getDate()) +' ' + addZero(stop.getHours())+":"+addZero(stop.getMinutes())+':00': undefined 
  )
  const payload = {
    start_time: start? addZero(start.getFullYear())+ '-' + addZero((start.getMonth() + 1))+ '-'+ addZero(start.getDate()) +' ' + addZero(start.getHours())+":"+addZero(start.getMinutes())+':00': undefined,
    end_time: stop? addZero(stop.getFullYear())+ '-' + addZero((stop.getMonth() + 1)) + '-'+ addZero(stop.getDate()) +' ' + addZero(stop.getHours())+":"+addZero(stop.getMinutes())+':00': undefined 
  }
  addTime(payload).then(response => {
    props.reloadState()
  });
  props.onClose()
  // close popup
  }

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  useEffect(() => {
    onMounted();
  }, []);
  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <Slide direction="right" in={props.open} mountOnEnter unmountOnExit>
          <div className="popup-container left">
            <div className="calendar-menu-container employee-calendar">
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
                      onClick={submit}
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
                  <p className="mb-5">เลือกเวลาลงชื่อเข้าทำงาน</p>
                  <div className="datetime-picker-wrapper">
                    <DateTimePicker onChange={setStart} value={start} />
                    <h5 className="color-grey px-6">-</h5>
                    <DateTimePicker onChange={setStop} value={stop} />
                  </div>
                </div>
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
