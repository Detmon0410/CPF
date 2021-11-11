import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { onMounted } from "../helpers/frontend";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormGroup from "@mui/material/FormGroup";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import AddWorkerModal from "./AddWorkerModal";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DatePicker from "react-datepicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateYMD } from "../helpers/datetime";

function AddSchduleMenu(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09.00");
  const [endTime, setEndTime] = useState("21.00");
  const [workAmout, setWorkAmout] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [selectWorker, setSelectWorker] = useState(false);
  const worker = [
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
    { name: "สมปอง งานวัด", checked: false },
  ];

  const handleWorkerAdd = () => {
    setSelectWorker(true);
  };

  useEffect(() => {}, []);
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
                        borderRadius: "5px",
                      }}
                    >
                      <p>บันทึก</p>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="content-left">
                  <TextField
                    className="mb-5"
                    label="ชื่องาน"
                    variant="outlined"
                    fullWidth
                  />
                  <p className="mb-5">เลือกวันที่ทำงาน</p>
                  <div className="datetime-picker-wrapper mb-5">
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        value={formatDateYMD(startDate)}
                        endAdornment={
                          <InputAdornment position="end">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              customInput={
                                <DateRangeIcon className="color-navy mr-2" />
                              }
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <h5 className="color-grey px-6 mt-2">-</h5>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        value={formatDateYMD(endDate)}
                        endAdornment={
                          <InputAdornment position="end">
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              customInput={
                                <DateRangeIcon className="color-navy mr-2" />
                              }
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <p className="mb-5">เลือกเวลาที่ทำงาน</p>
                  <div className="datetime-picker-wrapper mb-5">
                    <TextField
                      value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                      sx={{ m: 1, width: "25ch" }}
                    />
                    <h5 className="color-grey px-6 mt-2">-</h5>
                    <TextField
                      value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                      sx={{ m: 1, width: "25ch" }}
                    />
                  </div>
                  <div className="d-space-between mb-5">
                    <TextField
                      label="จำนวนกะ"
                      value={workAmout}
                      onChange={(event) => setWorkAmout(event.target.value)}
                      sx={{ m: 1, width: "25ch" }}
                    />
                    <TextField
                      label="ชั่วโมงกะ"
                      value={workHours}
                      onChange={(event) => setWorkHours(event.target.value)}
                      sx={{ m: 1, width: "25ch" }}
                    />
                  </div>
                  <Button
                    className="bgcolor-navy"
                    onClick={handleWorkerAdd}
                    variant="contained"
                    sx={{
                      fontFamily: "Kanit",
                      borderRadius: "5px",
                    }}
                  >
                    <p>เพิ่มพนักงาน</p>
                  </Button>
                </div>
                <Collapse orientation="horizontal" in={selectWorker}>
                  <div className="content-right">
                    <FormGroup>
                      {worker.map((d, i) => {
                        return (
                          <FormControlLabel
                            className="border"
                            control={<Checkbox />}
                            label={d.name}
                          />
                        );
                      })}
                    </FormGroup>
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

AddSchduleMenu.defaultProps = { open: false };
AddSchduleMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(AddSchduleMenu);
