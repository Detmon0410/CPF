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
import { getEmployeeService, createShiftService } from '../services/user.service';

function AddSchduleMenu(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("21:00");
  const [workAmout, setWorkAmout] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [workName, setWorkName] = useState("");

  const [selectWorker, setSelectWorker] = useState(false);
  const [worker, setWorker] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleWorkerAdd = () => {
    getEmployeeService().then( (response) => {
    for (let i = 0 ; i < response.length ; i++){
        setWorker(worker => [...worker, {id: response[i].employee_id, name: response[i].firstname + " " + response[i].lastname , checked: false}])
        setChecked(checked => [...checked, false ])
      }
    });
    setSelectWorker(true);
  };

  const submitAddShift = () => {
    const formateStartDate =  startDate.getFullYear()+ '-' + (startDate.getMonth() + 1) + '-'+ startDate.getDate() +' ' + startTime+':00';
    const formateEndDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-'+ endDate.getDate()+' ' + endTime+':00';
    const payload = {
      title : workName,
      start_time : formateStartDate,
      end_time : formateEndDate,
      employee_list : selectedWorker,
      shift_count : workAmout,
      shift_hours : workHours
    }
    
    createShiftService(payload)
    setWorkName('')
    setEndDate(new Date())
    setStartDate(new Date())
    setWorkAmout('')
    setWorkHours('')
    setChecked([])
    
    //close popup
    props.onClose()
  };
  const handleChange = (event) => {
    if(event.target.checked === true){
      setSelectedWorker(selectedWorker => [...selectedWorker, worker[event.target.value].id ])
    }
    else if(event.target.checked === false){
      setSelectedWorker(selectedWorker.filter(e => e !== worker[event.target.value].id));
    }
    let changeCheck = checked;
    changeCheck[event.target.value]= event.target.checked
    setChecked(changeCheck);
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
                      onClick={submitAddShift}
                      className="bgcolor-lightgreen"
                      variant="contained"
                      sx={{
                        fontFamily: "Kanit",
                        borderRadius: "5px",
                      }}
                    >
                      <p>บันทึก </p>
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
                    value={workName}
                    onChange={(event) => setWorkName(event.target.value)}
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
                            key={d.id}
                            value={i}
                            className="border"
                            checked={checked[i]}
                            control={<Checkbox />}
                            label={d.name}
                            onChange={handleChange}
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
