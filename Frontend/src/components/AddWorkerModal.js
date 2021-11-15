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
import Select from 'react-select';
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormGroup from "@mui/material/FormGroup";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { postAssignEmployee , getEmployeeService, getUserWorkerList} from "../services/user.service";
import React from 'react';
function AddWorkerModal(props) {
  const [workStart, setWorkStart] = useState(0);
  const [workStop, setWorkStop] = useState(0);
  const [selectWorker, setSelectWorker] = useState("all");
  const [edit, setEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState();
  const [workHoursOT, setWorkHoursOT] = useState(0);

  const [worker, setWorker] = useState([]);

  const handleChangeSelectWorker = (event) => {
    setSelectWorker(event.target.value);
    setEdit(false);
  };
  const handleWorkerEdit = () => {
    setSelectWorker("");
    setEdit(true);
  };
  const handleWorkerAdd = () => {
    setOpenAdd(true);
  };
  const handleWorkerClose = () => {
    setOpenAdd(false);
  };
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }


/* Simple example */
  const handleSubmit = () => {
    if(name.value !== undefined){
    const realName = name.value.split(" ");
    console.log(realName)
    const payload = {
      shift_id:props.selectedShift.id,
      firstname: realName[0],
      lastname: realName[1],
      start_time: workStart? addZero(workStart.getFullYear())+ '-' + addZero((workStart.getMonth() + 1))+ '-'+ addZero(workStart.getDate()) +' ' + addZero(workStart.getHours())+":"+addZero(workStart.getMinutes())+':00': undefined,
      end_time:workStop? addZero(workStop.getFullYear())+ '-' + addZero((workStop.getMonth() + 1)) + '-'+ addZero(workStop.getDate()) +' ' + addZero(workStop.getHours())+":"+addZero(workStop.getMinutes())+':00': undefined,
      ot_hours: workHoursOT,
    }
    
    postAssignEmployee(payload).then(response => {
      console.log(response)
      setName('');
      setWorkStart(0);
      setWorkStop(0);
      setWorkHoursOT(0);
      props.onClose()
      
    } , error => {
      console.log(error)
      setName('');
      setWorkStart(0);
      setWorkStop(0);
      setWorkHoursOT(0);
      props.onClose()
    });
    }
    else{
      props.onClose()
    }
    //close popup
  }
  
  useEffect(() => {
    if(props.selectedShift !== undefined){
      getUserWorkerList({ shift_id : props.selectedShift? props.selectedShift.id : undefined}).then(response => {
        setWorker([])
        for (let i = 0 ; i < response.length ; i++){
          console.log(response[i].firstname)
          setWorker(worker => [...worker, { label: response[i].firstname + " " + response[i].lastname ,value: response[i].firstname+ " "+response[i].lastname }])
        }
      });
      setWorkStart(props.start)
      setWorkStop(props.stop)
    }
   
  }, [props.check]);

  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <div className="popup-container add-worker">
            <Select
            className="mb-5"
            value={name}
            onChange={setName}
            isClearable={true}
            options={worker}
          />
          
          <p className="mb-5">เลือกเวลาในการทำงานของพนักงาน</p>
          <div className="datetime-picker-wrapper mb-5">
            <DateTimePicker onChange={(event) => setWorkStart(event)} value={workStart} />
            <h5 className="color-grey px-6">-</h5>
            <DateTimePicker onChange={(event) => setWorkStop(event)} value={workStop} />
          </div>
          <div className="d-space-between mb-5">
          
          <TextField
            label="ชั่วโมงโอที"
            value={workHoursOT}
            onChange={(event) => setWorkHoursOT(event.target.value)}
            sx={{ m: 1, width: "25ch" }}
          />
          </div>
          <div className="option save">
          <Button
            className="bgcolor-lightgreen "
            variant="contained"
            onClick={handleSubmit}
            sx={{
              fontFamily: "Kanit",
              borderRadius: "5px",
            }}
          >
            <p>บันทึก</p>
          </Button>
        </div>
        </div>
       
      </Modal>
    </>
  );
}

AddWorkerModal.defaultProps = { open: false };
AddWorkerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(AddWorkerModal);
