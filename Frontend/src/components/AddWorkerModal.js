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

function AddWorkerModal(props) {
  const [workStart, setWorkStart] = useState(0);
  const [workstop, setWorkStop] = useState(0);
  const [selectWorker, setSelectWorker] = useState("all");
  const [edit, setEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
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

  useEffect(() => {}, []);
  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <div className="popup-container add-worker">
          <div className="d-space-between mb-5">
            <TextField className="mb-5" label="ชื่อ" variant="outlined" />
            <TextField className="mb-5" label="นามสกุล" variant="outlined" />
          </div>

          <p className="mb-5">เลือกเวลาในการทำงาน</p>
          <div className="datetime-picker-wrapper mb-5">
            <DateTimePicker onChange={setWorkStart} value={workStart} />
            <h5 className="color-grey px-6">-</h5>
            <DateTimePicker onChange={setWorkStop} value={workstop} />
          </div>
          <p className="mb-5">เลือกเวลาในการทำโอที</p>
          <div className="datetime-picker-wrapper mb-5">
            <DateTimePicker onChange={setWorkStart} value={workStart} />
            <h5 className="color-grey px-6">-</h5>
            <DateTimePicker onChange={setWorkStop} value={workstop} />
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
