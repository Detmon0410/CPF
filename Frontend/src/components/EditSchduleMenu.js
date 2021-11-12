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
import {  getShiftService , postUnassignEmployee, postEditShift, postAddOT } from "../services/user.service"

function EditSchduleMenu(props) {
  const [workStart, setWorkStart] = useState(0);
  const [workStop, setWorkStop] = useState(0);
  const [workHoursOT, setWorkHoursOT] = useState(0);
  const [selectedWorker, setSelectedWorker] = useState([]);

  const [selectWorker, setSelectWorker] = useState("all");
  const [edit, setEdit] = useState(false);
  
  const [shift, setShift] = useState();
  const [worker, setWorker] = useState([]);
  const [checked, setChecked] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [title, setTitle] = useState();
  const handleChangeSelectWorker = (event) => {
    setSelectWorker(event.target.value);
    setEdit(false);
  };

  const handleTitle = (event) =>{
    setTitle(event.target.value)
  }
  const handleWorkerEdit = () => {
    setSelectWorker("all");
    setEdit(true);
  };
  const handleWorkerAdd = () => {
    setOpenAdd(true);
  };
  const handleWorkerAddClose = () => {
    getShiftService({ shift_id:props.selectedShift.id}).then(response => {
      console.log()
      setWorker([])
      setChecked([])
      setSelectedWorker([])
      for (let i = 0 ; i < response.employee_list.length ; i++){
        setWorker(worker => [...worker, {id: response.employee_list[i].employee._id, name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , start: response.employee_list[i].start_time , end: response.employee_list[i].end_time}])
        setSelectedWorker(selectedWorker => [...selectedWorker, response.employee_list[i].employee._id])
        
        setChecked(checked => [...checked, true ])
      }
    });

    setOpenAdd(false);
  };
  const handleWorkerClose = () => {
    
    setOpenAdd(false);
  };

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  const submit = () => {
    const payload = {
      shift_id: props.selectedShift.id,
      title: title,
      start_time: workStart? addZero(workStart.getFullYear())+ '-' + addZero((workStart.getMonth() + 1))+ '-'+ addZero(workStart.getDate()) +' ' + addZero(workStart.getHours())+":"+addZero(workStart.getMinutes())+':00': undefined,
      end_time:workStop? addZero(workStop.getFullYear())+ '-' + addZero((workStop.getMonth() + 1)) + '-'+ addZero(workStop.getDate()) +' ' + addZero(workStop.getHours())+":"+addZero(workStop.getMinutes())+':00': undefined,
      shift_count: undefined,
      shift_hours: undefined,
    }
    postEditShift(payload).then(
      response => {
          const payload = {
            shift_id: props.selectedShift.id,
            employee_id: selectedWorker,
            ot_hours:workHoursOT,
          }
          postAddOT(payload).then(response => {
            console.log(payload)
            props.onClose()
          })
      }
    )

    //close popup
    
  }

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

  const unassignEmployee = (employeeId) => {
    const payload = {
      shift_id: props.selectedShift.id,
      employee_id: employeeId,
    }
    console.log(payload)
    postUnassignEmployee(payload).then(response => {
      getShiftService({ shift_id:props.selectedShift.id}).then(response => {
        setWorker([])
        setChecked([])
        setSelectedWorker([])
        for (let i = 0 ; i < response.employee_list.length ; i++){
          setWorker(worker => [...worker, {id: response.employee_list[i].employee._id, name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , start: response.employee_list[i].start_time , end: response.employee_list[i].end_time}])
          setSelectedWorker(selectedWorker => [...selectedWorker, response.employee_list[i].employee._id])
          setChecked(checked => [...checked, true ])
        }
      })
      }
    )

  }

  useEffect(() => {
    if(selectWorker === "all"){
      setSelectedWorker([])
      for (let i = 0 ; i < worker.length ; i++){
        setSelectedWorker(selectedWorker => [...selectedWorker, worker[i].id])
      }
    }
  }, [selectWorker]);

  useEffect(() => {
    if(props.selectedShift){
      getShiftService({ shift_id:props.selectedShift.id}).then(response => {
        console.log(response.employee_list)
        setWorker([])
        setChecked([])
        setSelectedWorker([])
        setShift(response.shift)
        setTitle(response.shift.title)
        const startTime = new Date(response.shift.start_time)
        const endTime = new Date(response.shift.end_time)
        setWorkStart(startTime)
        setWorkStop(endTime)
        for (let i = 0 ; i < response.employee_list.length ; i++){
          setWorker(worker => [...worker, {id: response.employee_list[i].employee._id, name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , start: response.employee_list[i].start_time , end: response.employee_list[i].end_time}])
          setSelectedWorker(selectedWorker => [...selectedWorker, response.employee_list[i].employee._id])
          setChecked(checked => [...checked, true ])
        }
      })
    }
  }, [props.selectedShift]);
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
                      onClick={submit}
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
                    value={title}
                    onChange={(event) => handleTitle(event)}
                  />
                  <p className="mb-5">เลือกเวลาที่ใช้ในตารางงาน</p>
                  <div className="datetime-picker-wrapper mb-5">
                    <DateTimePicker onChange={(event) => setWorkStart(event)} value={workStart} />
                    <h5 className="color-grey px-6">-</h5>
                    <DateTimePicker onChange={(event) => setWorkStop(event)} value={workStop} />
                  </div>
                  <FormControl fullWidth className="mb-5">
                    <InputLabel id="demo-simple-select-label">
                      ประเภท
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="ประเภท"
                      defaultValue={1}
                    >
                      <MenuItem value={1}>โอที</MenuItem>
                    </Select>
                  </FormControl>
                  <RadioGroup
                    row
                    value={selectWorker}
                    onChange={handleChangeSelectWorker}
                    defaultValue="all"
                    aria-label="worker"
                    name="customized-radios"
                    className="mb-5"
                  >
                    <FormControlLabel
                      value="all"
                      control={
                        <Radio
                          disableRipple
                          color="primary"
                          checkedIcon={<CheckBoxIcon />}
                          icon={<CheckBoxOutlineBlankIcon />}
                          {...props}
                        />
                      }
                      label="พนักงานทุกคน"
                    />
                    <FormControlLabel
                      value="some"
                      control={
                        <Radio
                          disableRipple
                          color="primary"
                          checkedIcon={<CheckBoxIcon />}
                          icon={<CheckBoxOutlineBlankIcon />}
                          {...props}
                        />
                      }
                      label="พนักงานบางคน"
                    />
                  </RadioGroup>
                  <p className="mb-5">เลือกเวลาในการทำงานของพนักงาน</p>
                  <div className="datetime-picker-wrapper mb-5">
                  <TextField
                      label="ชั่วโมงโอที"
                      value={workHoursOT}
                      onChange={(event) => setWorkHoursOT(event.target.value)}
                      sx={{ m: 1, width: "25ch" }}
                    />
                  </div>
                  <Button
                    className="bgcolor-lightgreen"
                    onClick={handleWorkerEdit}
                    variant="contained"
                    sx={{
                      fontFamily: "Kanit",
                      borderRadius: "5px",
                    }}
                  >
                    <p>แก้ไขพนักงาน</p>
                  </Button>
                </div>
                <Collapse orientation="horizontal" in={selectWorker === "some"}>
                  <div className="content-right">
                    <FormGroup>
                      {worker.map((d, i) => {
                        return (
                          <FormControlLabel
                            className="border"
                            control={<Checkbox />}
                            label={d.name}
                            checked={checked[i]}
                            value={i}
                            onChange={handleChange}
                          />
                        );
                      })}
                    </FormGroup>
                  </div>
                </Collapse>
                <Collapse orientation="horizontal" in={edit}>
                  <div className="content-right">
                    <FormGroup className="mb-5">
                      {worker.map((d, i) => {
                        return (
                          <FormControlLabel
                            className="border"
                            control={
                              <DoDisturbOnIcon className="p-3" color="error"  />
                            }
                            value={d.id? d.id : 0}
                            onClick={(e) => {
                              unassignEmployee(d.id);
                              }}
                            
                            label={d.name}
                          />
                        );
                      })}
                    </FormGroup>
                    <div className="d-flex-end mr-4">
                      <Button
                        className="bgcolor-lightgreen"
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
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
      <AddWorkerModal selectedShift={props.selectedShift? props.selectedShift: undefined} open={openAdd} onClose={handleWorkerAddClose} />
    </>
  );
}

EditSchduleMenu.defaultProps = { open: false };
EditSchduleMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(EditSchduleMenu);
