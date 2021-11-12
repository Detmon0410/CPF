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
import { postAssignEmployee } from "../services/user.service";
function AddWorkerModal(props) {
  const [workStart, setWorkStart] = useState(0);
  const [workStop, setWorkStop] = useState(0);
  const [selectWorker, setSelectWorker] = useState("all");
  const [edit, setEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [workHoursOT, setWorkHoursOT] = useState(0);

  const [worker, setWorker] = useState([
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
  ]);

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

  const handleSubmit = () => {
    const payload = {
      shift_id:props.selectedShift.id,
      firstname: firstname,
      lastname: lastname,
      start_time: workStart? addZero(workStart.getFullYear())+ '-' + addZero((workStart.getMonth() + 1))+ '-'+ addZero(workStart.getDate()) +' ' + addZero(workStart.getHours())+":"+addZero(workStart.getMinutes())+':00': undefined,
      end_time:workStop? addZero(workStop.getFullYear())+ '-' + addZero((workStop.getMonth() + 1)) + '-'+ addZero(workStop.getDate()) +' ' + addZero(workStop.getHours())+":"+addZero(workStop.getMinutes())+':00': undefined,
      ot_hours: workHoursOT,
    }
    
    postAssignEmployee(payload).then(response => {
      console.log(response)
      setFirstname('');
      setLastname('');
      setWorkStart(0);
      setWorkStop(0);
      setWorkHoursOT(0);
      props.onClose()
    } , error => {
      console.log(error)
      setFirstname('');
      setLastname('');
      setWorkStart(0);
      setWorkStop(0);
      setWorkHoursOT(0);
      props.onClose()
    });

    //close popup
  }
  
  useEffect(() => {
    if(props.selectedShift){
    console.log(props.selectedShift.id)
    }

  }, []);
  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <div className="popup-container add-worker">
          <div className="d-space-between mb-5">
            <TextField className="mb-5" label="ชื่อ" variant="outlined" onChange={(event)=>{setFirstname(event.target.value)}} value={firstname} />
            <TextField className="mb-5" label="นามสกุล" variant="outlined" onChange={(event)=>{setLastname(event.target.value)}} value={lastname} />
          </div>
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
