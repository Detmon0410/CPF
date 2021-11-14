import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Topnav from "../components/Topnav";
import CalendarMenu from "../components/CalendarMenu";
import Cookies from 'js-cookie';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  DateNavigator,
  Toolbar,
  WeekView,
  MonthView,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  formatDateYMD,
  formatDateYMDTHM,
  secondsToTime,
} from "../helpers/datetime";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

function EmployeePage(props) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("2018-11-01");
  const [currentViewName, setCurrentViewName] = useState("day");
  const [workTime, setWorkTime] = useState(0);
  const [category, setCategory] = useState("");
  const [schedulerData, setSchedulerData] = useState([
    {
      startDate: "2018-11-01T09:45",
      endDate: "2018-11-01T11:00",
      title: "Meeting",
    },
    {
      startDate: "2018-11-01T12:00",
      endDate: "2018-11-01T13:30",
      title: "Go to a gym",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAssign = () => setOpenAssign(true);
  const handleCloseAssign = () => setOpenAssign(false);
  const handleSelect = (event) => {
    setCategory(event.target.value);
  };
  const handleSubmit = (event) => {
    //prevent refresh
    event.preventDefault();
    //close popup
    handleClose()
  };
  const onDateChange = (calendarDate) => {
    setCalendarDate(calendarDate);
    setCurrentDate(formatDateYMD(calendarDate));
  };
  const commitChanges = ({ added, changed, deleted }) => {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
    handleClose();
  };

  const timecard = {
    name: "สมหมาย บุยบุย",
    field: "สับไก่",
    status: true,
    startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
  };

  let timer = 0;
  const startTimer = (startTime) => {
    if (startTime != null) {
      let timePass = (Date.now() - startTime) / 1000;
      let timeStr = secondsToTime(timePass);
      timer = setInterval(() => {
        setWorkTime(`${timeStr.h}:${timeStr.m}:${timeStr.s}`);
        timePass++;
        timeStr = secondsToTime(timePass);
      }, 1000);
    }
  };

  /* eslint-disable */
  useEffect(() => {
    if (!Cookies.get('access_token')) return history.push('/sign-in')
    console.log("Home Page");

    onDateChange(new Date());

    let startDate = new Date();
    startDate.setHours(9);
    let endDate = new Date();
    endDate.setHours(12);
    setSchedulerData(
      schedulerData.concat([
        {
          startDate: formatDateYMDTHM(startDate),
          endDate: formatDateYMDTHM(endDate),
          title: "Go to work",
        },
      ])
    );

    startTimer(timecard.startTime);
  }, []);
  /* eslint-enable */

  return (
    <>
      <Topnav />
      <section className="section-simple">
        <div className="container employee">
          <section className="section-work-detail">
            <div className="calendar-wrapper">
              <Calendar onChange={onDateChange} value={calendarDate} />
            </div>
            <div className="detail">
              <div className="timecard">
                <p className="mb-3">ชื่อ : {timecard.name}</p>
                <p className="mb-3">แผนก : {timecard.field}</p>
                <p className="mb-3 d-flex">
                  สถานะ :{" "}
                  <div
                    className={`ml-1 ${timecard.status ? "color-success" : "color-danger"
                      }`}
                  >
                    {timecard.status ? "เข้างาน" : "ออกงาน"}
                  </div>
                </p>
                <p className="mb-3 d-flex">
                  ระยะเวลาทำงาน :
                  <div
                    className={`ml-1 ${timecard.status ? "color-success" : "color-danger"
                      }`}
                  >
                    {workTime}
                  </div>
                </p>
              </div>
              <div className="options">
                <div className="option">
                  <Button
                    fullWidth
                    className="mt-6 bgcolor-lightgreen"
                    variant="contained"
                    sx={{
                      fontFamily: "Kanit",
                      borderRadius: "25px",
                    }}
                    onClick={handleOpenAssign}
                  >
                    <h6>ลงเวลางาน</h6>
                  </Button>
                </div>
                <div className="option">
                  <Button
                    fullWidth
                    className="mt-6"
                    variant="contained"
                    sx={{
                      fontFamily: "Kanit",
                      borderRadius: "25px",
                    }}
                    onClick={handleOpen}
                  >
                    <h6>ติดต่อหัวหน้างาน</h6>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="section-scheduler">
            <div className="scheduler">
              <h5 className="color-navy">เวลางานที่ได้รับมอบหมาย</h5>
              <Scheduler data={schedulerData} height={660}>
                <ViewState
                  currentDate={currentDate}
                  onCurrentDateChange={onDateChange}
                  currentViewName={currentViewName}
                  onCurrentViewNameChange={setCurrentViewName}
                />

                <WeekView name="week" displayName="Week" />
                <MonthView name="month" displayName="Month" />
                <DayView
                  name="day"
                  displayName="Day"
                  startDayHour={6}
                  endDayHour={24}
                />
                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments />
                <AppointmentTooltip />
              </Scheduler>
            </div>
            <div className="scheduler">
              <h5 className="color-navy">เวลางานที่ลงไว้</h5>
              <Scheduler data={schedulerData} height={660}>
                <ViewState
                  currentDate={currentDate}
                  onCurrentDateChange={onDateChange}
                  currentViewName={currentViewName}
                  onCurrentViewNameChange={setCurrentViewName}
                />
                <EditingState onCommitChanges={commitChanges} />
                <IntegratedEditing />

                <WeekView name="week" displayName="Week" />
                <MonthView name="month" displayName="Month" />
                <DayView
                  name="day"
                  displayName="Day"
                  startDayHour={6}
                  endDayHour={24}
                />
                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments />
                <AppointmentTooltip />
              </Scheduler>
            </div>
          </section>
        </div>
      </section>

      <Modal open={open} onClose={handleClose}>
        <div className="popup-container">
          <form onSubmit={handleSubmit}>
            <Box sx={{ width: 500 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">หมวดหมู่</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="หมวดหมู่"
                  onChange={handleSelect}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className="mt-6 "
                fullWidth
                id="outlined-multiline-static"
                label="อธิบายรายละเอียด"
                multiline
                rows={10}
              />
              <div className="d-flex-end">
                <Button
                  className="mt-6 bgcolor-lightgreen"
                  variant="contained"
                  type="submit"
                  sx={{
                    fontFamily: "Kanit",
                    borderRadius: "25px",
                    height: "56px",
                  }}
                >
                  <h6 className="p-2">ยืนยัน</h6>
                </Button>
              </div>
            </Box>
          </form>
        </div>
      </Modal>
      <CalendarMenu open={openAssign} onClose={handleCloseAssign} />
    </>
  );
}

EmployeePage.defaultProps = {};
EmployeePage.propTypes = {
  // processName: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(EmployeePage);
