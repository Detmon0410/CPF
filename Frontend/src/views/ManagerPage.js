import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, connectAdvanced } from "react-redux";
import { onMounted } from "../helpers/frontend";
import Topnav from "../components/Topnav";
import EditSchduleMenu from "../components/EditSchduleMenu";
import Cookies from 'js-cookie';
import moment from 'moment';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddSchduleMenu from "../components/AddSchduleMenu";
import { getAllShiftService, getShiftService } from "../services/user.service"
function ManagerPage(props) {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [allShift, setAllShift] = useState([]);
  const [selectedShift, setSelectedShift] = useState();
  const [paginate, setPaginate] = useState({ page: 1, pp: 10 });
  const [rows, setRows] = useState([]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // Table
  const columns = [
    { label: "ชื่อ - นามสกุล", align: "center" },
    { label: "เริ่มงาน", align: "center" },
    { label: "จบงาน", align: "center" },
    { label: "เวลาเข้างาน", align: "center" },
    { label: "เวลาออกงาน", align: "center" },
    { label: "เวลางานทั้งหมด (ชั่วโมง)", align: "center" },
    { label: "เวลางาน OT (ชั่วโมง)", align: "center" },
  ];
  
  const onChangePage = (e, newPage) => {
    setPaginate({ ...paginate, page: newPage + 1 });
  };
  const onChangePerPage = (e) => {
    setPaginate({ ...paginate, page: 1, pp: e.target.value });
  };

  const selectHandle = (e) => {
    setSelectedShift(allShift.find(shift => shift.id === e.target.value))
  };
  
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    getAllShiftService().then( response => {
      const shifts = response.shift
      setAllShift([])
      const shiftsList = []
      for (let i = 0 ; i < shifts.length ; i++){
        shiftsList.push({
          id: shifts[i]._id, 
          title: shifts[i].title , 
          start_time: moment(shifts[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
          end_time: moment(shifts[i].end_time).format("YYYY-MM-DD HH:mm:ss")
        })
      }
      setAllShift(shiftsList)
    });
    setOpenAdd(false)
  };
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    getShiftService({shift_id: selectedShift.id}).then(response => {
      setRows([])
      for (let i = 0 ; i < response.employee_list.length ; i++){
        if (!response.employee_list[i].enter_time) {
          setRows(rows => [...rows, {
            id: response.employee_list[i]._id, 
            name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , 
            start: moment(response.employee_list[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
            end: moment(response.employee_list[i].end_time).format("YYYY-MM-DD HH:mm:ss"), 
            arrive: "", 
            leave: "", 
            ot: response.employee_list[i].ot_hours}])
        }
        else {
          setRows(rows => [...rows, {
            id: response.employee_list[i]._id, 
            name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , 
            start: moment(response.employee_list[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
            end: moment(response.employee_list[i].end_time).format("YYYY-MM-DD HH:mm:ss"), 
            arrive: moment(response.employee_list[i].enter_time).format("YYYY-MM-DD HH:mm:ss"), 
            total: response.employee_list[i].total_work_hours,
            leave: moment(response.employee_list[i].leave_time).format("YYYY-MM-DD HH:mm:ss"), 
            ot: response.employee_list[i].ot_hours}])
        }
      }
    });
    getAllShiftService().then( response => {
      const shifts = response.shift
      setAllShift([])
      const shiftsList = []
      for (let i = 0 ; i < shifts.length ; i++){
        shiftsList.push({
          id: shifts[i]._id, 
          title: shifts[i].title , 
          start_time: moment(shifts[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
          end_time: moment(shifts[i].end_time).format("YYYY-MM-DD HH:mm:ss")
        })
      }
      setAllShift(shiftsList)
    });
    setOpenEdit(false)
    
  };

  useEffect(() => {
    if (!Cookies.get('access_token')) return history.push('/sign-in')
    console.log("Manager page");
    onMounted();
    getAllShiftService().then( response => {
      const shifts = response.shift
      setAllShift([])
      const shiftsList = []
      for (let i = 0 ; i < shifts.length ; i++){
        shiftsList.push({
          id: shifts[i]._id, 
          title: shifts[i].title , 
          start_time: moment(shifts[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
          end_time: moment(shifts[i].end_time).format("YYYY-MM-DD HH:mm:ss")
        })
      }
      setAllShift(shiftsList)
    });
  }, []);

  useEffect(() => {
    if(!selectedShift){
      setSelectedShift(allShift[0])
    }
  }, [allShift]);

  useEffect(() => {
    if(selectedShift){
      getShiftService({shift_id: selectedShift.id}).then(response => {
        setRows([])
        for (let i = 0 ; i < response.employee_list.length ; i++){
          if (!response.employee_list[i].enter_time) {
            setRows(rows => [...rows, {
              id: response.employee_list[i]._id, 
              name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , 
              start: moment(response.employee_list[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
              end: moment(response.employee_list[i].end_time).format("YYYY-MM-DD HH:mm:ss"), 
              arrive: "", 
              leave: "", 
              ot: response.employee_list[i].ot_hours}])
          }
          else {
            setRows(rows => [...rows, {
              id: response.employee_list[i]._id, 
              name: response.employee_list[i].employee.firstname+" "+response.employee_list[i].employee.lastname , 
              start: moment(response.employee_list[i].start_time).format("YYYY-MM-DD HH:mm:ss"), 
              end: moment(response.employee_list[i].end_time).format("YYYY-MM-DD HH:mm:ss"), 
              arrive: moment(response.employee_list[i].enter_time).format("YYYY-MM-DD HH:mm:ss"), 
              leave: moment(response.employee_list[i].leave_time).format("YYYY-MM-DD HH:mm:ss"), 
              total: response.employee_list[i].total_work_hours,
              ot: response.employee_list[i].ot_hours}])
          }
        }
      });
    console.log(selectedShift)

    }
  }, [selectedShift]);

  return (
    <>
      <Topnav />
      <section className="section-simple">
        <div className="container manager">
          <TableContainer>
            <div className="options d-space-between table-options">
              <div className="option left">
                <PersonIcon className="color-navy mr-1" />{" "}
              </div>
              <div className="option right">
                <Button
                  className="bgcolor-navy mr-2"
                  variant="contained"
                  onClick={handleOpenAdd}
                  sx={{
                    fontFamily: "Kanit",
                    borderRadius: "5px",
                  }}
                >
                  เพิ่มตารางงาน
                </Button>
                <Button
                  className="bgcolor-navy"
                  variant="contained"
                  onClick={handleOpenEdit}
                  sx={{
                    fontFamily: "Kanit",
                    borderRadius: "5px",
                  }}
                >
                  จัดการตารางงาน
                </Button>
              </div>
            </div>
            <select id="table" onChange={selectHandle} value={selectedShift? selectedShift.id : undefined} defaultValue='Jeng Jaw'>
            {allShift.map((d, i) => {
                return (
                  <option key={d.id} value={d.id}>{d.title} วันที่ {d.start_time} ถึง {d.end_time}</option>
                );
              })}
              {/* <option value="1">งานถอนขน กะ 1 เวลา 05.00 - 13.00 น.</option>
              <option value="2">งานถอนขน กะ 2 เวลา 05.00 - 13.00 น.</option>
              <option value="3">งานถอนขน กะ 3 เวลา 05.00 - 13.00 น.</option>
              <option value="4">งานถอนขน กะ 4 เวลา 05.00 - 13.00 น.</option> */}
            </select>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col, i) => (
                    <TableCell
                      key={i}
                      align={col.align ? col.align : "left"}
                      padding="normal"
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!rows.length ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows
                    .slice(
                      (paginate.page - 1) * paginate.pp,
                      paginate.page * paginate.pp
                    )
                    .map((d, i) => {
                      let index = (paginate.page - 1) * paginate.pp + i + 1;
                      return (
                        <TableRow
                          className={d.online ? "" : "color-gray"}
                          key={index}
                          hover
                        >
                          <TableCell align="left">{d.name}</TableCell>
                          <TableCell align="center">{d.start}</TableCell>
                          <TableCell align="center">{d.end}</TableCell>
                          <TableCell align="center">{d.arrive}</TableCell>
                          <TableCell align="center">{d.leave}</TableCell>
                          <TableCell align="center">{d.total}</TableCell>
                          <TableCell align="center">{d.ot}</TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Show"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={paginate.pp}
            page={paginate.page - 1}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangePerPage}
          />
        </div>
      </section>
      <EditSchduleMenu selectedShift={selectedShift? selectedShift: undefined} open={openEdit} onClose={handleCloseEdit} />
      <AddSchduleMenu open={openAdd} onClose={handleCloseAdd} />
    </>
  );
}

ManagerPage.defaultProps = {};
ManagerPage.propTypes = {
  // processName: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  // processName: actionName
})(ManagerPage);
