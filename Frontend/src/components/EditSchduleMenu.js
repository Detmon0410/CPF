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

function EditSchduleMenu(props) {
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
                  <p className="mb-5">เลือกเวลาที่ใช้ในตารางงาน</p>
                  <div className="datetime-picker-wrapper mb-5">
                    <DateTimePicker onChange={setWorkStart} value={workStart} />
                    <h5 className="color-grey px-6">-</h5>
                    <DateTimePicker onChange={setWorkStop} value={workstop} />
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
                      <MenuItem value={0}>ปกติ</MenuItem>
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
                    <DateTimePicker onChange={setWorkStart} value={workStart} />
                    <h5 className="color-grey px-6">-</h5>
                    <DateTimePicker onChange={setWorkStop} value={workstop} />
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
                              <DoDisturbOnIcon className="p-3" color="error" />
                            }
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
      <AddWorkerModal open={openAdd} onClose={handleWorkerClose} />
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
