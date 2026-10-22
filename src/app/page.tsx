"use client";
import { Card, Image, Input, Popover, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { MdBlockFlipped } from "react-icons/md";
import { IoReload } from "react-icons/io5";
import { TiExportOutline } from "react-icons/ti";
import { IoMdTime } from "react-icons/io";
import { TbDental } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
// Sample doctor data
const doctors = [
  {
    id: 1,
    label: "คุณหมอสมมุติ ทดสอบ",
    image:
      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png",
  },
  {
    id: 2,
    label: "คุณหมออธิป ธรรมกุล",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/024/183/535/small_2x/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg",
  },
  {
    id: 3,
    label: "คุณหมอสุดหล่อ ขั้นเทพ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkJJZLbiLCD_D0QI2c2vEnXnp8eCaDKuM0w&s",
  },
];

const timeSlots = [...Array(40)].map((_, index) => {
  const hour = 9 + Math.floor(index / 4);
  const minute = (index % 4) * 15;
  const period = hour < 12 || hour === 24 ? "AM" : "PM";
  const formattedTime = `${hour % 12 || 12}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;
  return formattedTime;
});

// console.log(timeSlots);

const appointments = [
  {
    id: 1,
    doctor: 1,
    room: "Room A",
    timeStart: "11:00 AM",
    timeEnd: "11:30 AM",
    patient: "นายร่ำรวย ทดสอบคนไข้",
    idMember: "67001",
    tel: "090-000-0000",
    detail: "รักษารากฟัน",
    price: "1,000 บาท",
  },
  {
    id: 1,
    doctor: 3,
    room: "Room A",
    timeStart: "10:00 AM",
    timeEnd: "11:00 AM",
    patient: "นายร่ำรวย ทดสอบคนไข้",
    idMember: "67001",
    tel: "090-000-0000",
    detail: "รักษารากฟัน",
    price: "1,800 บาท",
  },
  {
    id: 2,
    doctor: 1,
    room: "Room B",
    timeStart: "11:30 AM",
    timeEnd: "12:30 PM",
    patient: "นางสาวสมสวย ทดสอบคนไข้2",
    idMember: "67002",
    tel: "090-000-0001",
    detail: "ดัดฟัน",
    price: "1,500 บาท",
  },
  {
    id: 3,
    doctor: 2,
    room: "Room C",
    timeStart: "12:00 PM",
    timeEnd: "12:30 PM",
    patient: "นางสาวสมสวย ทดสอบคนไข้2",
    idMember: "67002",
    tel: "090-000-0001",
    detail: "ดัดฟัน",
    price: "1,500 บาท",
  },
  {
    id: 4,
    doctor: 2,
    room: "Room A",
    timeStart: "10:00 AM",
    timeEnd: "10:30 AM",
    patient: "นางสาวสมสวย ทดสอบคนไข้2",
    idMember: "67002",
    tel: "090-000-0001",
    detail: "ดัดฟัน",
    price: "1,500 บาท",
  },
  {
    id: 5,
    doctor: 2,
    room: "Room C",
    timeStart: "9:00 AM",
    timeEnd: "9:30 AM",
    patient: "นางสาวสมสวย ทดสอบคนไข้2",
    idMember: "67002",
    tel: "090-000-0001",
    detail: "ดัดฟัน",
    price: "1,500 บาท",
  },
];

type AppointmentStatus = "waiting" | "examining" | "payment" | "completed";

const Home = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(doctors[0]);
  const [appointmentList, setAppointmentList] = useState(
    appointments.map((appointment, index) => ({
      ...appointment,
      status: (index === 0 ? "examining" : "waiting") as AppointmentStatus,
    }))
  );
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    timeStart: "09:00 AM",
    timeEnd: "09:30 AM",
    detail: "ตรวจสุขภาพ",
  });

  // Filter appointments by selected doctor
  const filteredAppointments = appointmentList.filter(
    (appt) =>
      appt.doctor === selectedDoctor.id &&
      `${appt.patient} ${appt.idMember} ${appt.tel} ${appt.detail}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );


  const handleDoctorChange = (value: any) => {
    const selectedDoctor = doctors.find((doctor) => doctor.id === value);
    setSelectedDoctor(selectedDoctor);
  };

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedAppointment(null);
    setShowModal(false);
  };

  const handleAddAppointment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newAppointment.patient.trim()) return;

    setAppointmentList((current) => [
      ...current,
      {
        id: Date.now(),
        doctor: selectedDoctor.id,
        room: "Room A",
        ...newAppointment,
        status: "waiting" as AppointmentStatus,
        idMember: "DEMO-NEW",
        tel: "090-000-0000",
        price: "1,000 บาท",
      },
    ]);
    setNewAppointment({ patient: "", timeStart: "09:00 AM", timeEnd: "09:30 AM", detail: "ตรวจสุขภาพ" });
    setShowAddModal(false);
  };

  const updateAppointmentStatus = (status: AppointmentStatus) => {
    if (!selectedAppointment) return;
    setAppointmentList((current) =>
      current.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, status }
          : appointment
      )
    );
    setSelectedAppointment({ ...selectedAppointment, status });
  };
  const calculateSpan = (start: any, end: any) => {
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    return endIndex - startIndex;
  };

  const data = timeSlots.map((time, index) => {
    const appointment = filteredAppointments.find((a) => a.timeStart === time);

    return {
      key: index,
      time,
      room: appointment?.room || "",
      span: appointment
        ? calculateSpan(appointment.timeStart, appointment.timeEnd)
        : 1, // สำหรับรวมแถวของ `room`
      appointment,
    };
  });

  const columns = [
    {
      dataIndex: "time",
      key: "time",
      width: 100,
      render: (time: any) => {
        // เช็คว่าเวลาเป็นชั่วโมงเต็ม เช่น "9:00 AM", "10:00 AM", ...
        const isFullHour = time.endsWith(":00 AM") || time.endsWith(":00 PM");
        return <span className={isFullHour ? "font-bold" : ""}>{time}</span>;
      },
    },

    {
      dataIndex: "room",
      key: "room",
      onCell: (record: any) => {
        const colSpan = record.room ? 1 : 2;
        return {
          rowSpan: record.span,
          colSpan: colSpan,
        };
      },
      render: (room: any, record: any) => {
        const rowSpan = record.span; 

        return room ? (
          <div
            className="bg-slate-100  rounded-lg shadow-lg shadow-gray-400 hover:bg-[#2F80ED]"
            style={{
              height: `${rowSpan * 50}px`,
            }}
          >
            <div className="p-5">
              <span className=" font-bold">
                {record?.appointment?.patient} | {record?.appointment?.detail} |{" "}
                {record?.appointment?.idMember} <br />{" "}
                {record?.appointment?.tel} | {record?.appointment?.timeStart} -{" "}
                {record?.appointment?.timeEnd}
              </span>
            </div>
          </div>
        ) : (
          ""
        );
      },
    },
  ];

  const doctorOptions = (
    <div>
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2"
          onClick={() => handleDoctorChange(doctor.id)}
        >
          <img
            src={doctor.image}
            alt={doctor.label}
            className="w-10 h-10 rounded-full"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div suppressHydrationWarning={true} className="dashboard-shell min-h-screen p-2 sm:p-4 lg:p-8">
      <Card className="responsive-card" styles={{ body: { padding: 0 } }}>
        <div className="dashboard-content flex w-full flex-col gap-5 p-2 sm:gap-8 sm:p-5 lg:flex-row lg:gap-10 lg:p-8">
          <div className="flex w-full min-w-0 lg:w-1/2">
            <div className="my-2 flex w-full min-w-0 flex-col items-center sm:my-4 lg:my-8">
              <div className="w-full px-0 sm:px-3 lg:px-5">
                <div className="mb-4 flex items-center justify-between px-1">
                  <div>
                    <p className="section-eyebrow">CLINIC SCHEDULE</p>
                    <h2 className="section-title">ตารางนัดหมายแพทย์</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="live-badge"><span></span> วันนี้</div>
                    <button type="button" className="add-button" onClick={() => setShowAddModal(true)}>+ เพิ่มนัดหมาย</button>
                  </div>
                </div>
                <Select
                  id="doctor-select"
                  className="w-full border border-gray-300 rounded-md"
                  onChange={handleDoctorChange}
                  value={selectedDoctor.id}
                  showSearch
                  optionFilterProp="label" // กำหนดให้ค้นหาจาก label
                  filterOption={(input, option: any) =>
                    option?.label.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {doctors.map((doctor) => (
                    <Select.Option
                      key={doctor.id}
                      value={doctor.id}
                      label={doctor.label}
                    >
                      <div className="flex items-center">{doctor.label}</div>
                    </Select.Option>
                  ))}
                </Select>
                <div className="mt-3">
                  <Input
                    allowClear
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="ค้นหาชื่อผู้ป่วย, รหัสสมาชิก หรือบริการ"
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="schedule-card w-full max-w-4xl rounded-2xl p-2 sm:p-5">
                <div className="w-full">
                  <div className="doctor-banner flex w-full items-center rounded-xl p-2 text-base font-bold text-white sm:p-4 sm:text-2xl">
                    <h1 className="flex-1">ทันตแพทย์ {selectedDoctor.label}</h1>
                    <Popover content={doctorOptions} trigger="click">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.label}
                        className="ml-2 h-10 w-10 shrink-0 cursor-pointer rounded-full sm:ml-4 sm:h-12 sm:w-12"
                      />
                    </Popover>
                  </div>
                  <div className="hours-banner mt-2 w-full rounded-xl p-2 text-center text-sm font-bold text-white sm:text-lg">
                    <div className="flex items-center justify-center gap-1">
                      <IoMdTime size={30} />
                      <span>เวลาเข้างาน 09:00 - 19:00 น.</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="schedule-table w-full max-w-full overflow-x-auto">
                    <Table
                      showHeader={false}
                      columns={columns}
                      dataSource={data}
                      rowClassName={(record, index) =>
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      }
                      onRow={(record) => ({
                        onClick: () =>
                          record.appointment &&
                          handleAppointmentClick(record.appointment),
                        className: record.appointment ? "cursor-pointer" : "",
                      })}
                      pagination={false}
                      // bordered
                    />
                    </div>
                  </div>
                </div>
              </div>

              {showModal && selectedAppointment && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div
                    className="flex w-full items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    onClick={handleModalClose}
                  >
                    <div
                      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                      aria-hidden="true"
                    ></div>
                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      ​
                    </span>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block w-full align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                      <div className="w-full ">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg leading-6 font-bold text-[#2F80ED]">
                            นัดหมาย
                          </h3>
                          <div className="w-full flex justify-between items-center">
                            <div className="text-lg font-bold text-[#2F80ED]">
                              ทันตแพทย์{" "}
                              {
                                doctors.find(
                                  (doc) =>
                                    doc.id === selectedAppointment?.doctor
                                )?.label
                              }
                            </div>
                            <div className="flex justify-end">
                              <img
                                src={
                                  doctors.find(
                                    (doc) =>
                                      doc.id === selectedAppointment?.doctor
                                  )?.image
                                }
                                alt={
                                  doctors.find(
                                    (doc) =>
                                      doc.id === selectedAppointment?.doctor
                                  )?.label
                                }
                                className="w-12 h-12 rounded-full flex  "
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <div className="bg-gray-400 text-gray-400 p-4 rounded-l-lg mr-2">
                              {" "}
                            </div>
                            <div className="mt-2 ">
                              <div className="flex items-center  gap-1">
                                <div className="text-[#2F80ED]">
                                  <RxAvatar size={20} />
                                </div>
                                <p className="text-sm  text-black">
                                  {selectedAppointment?.idMember} |{" "}
                                  {selectedAppointment?.patient}
                                </p>
                              </div>

                              <div className="flex items-center  gap-1">
                                <div className="text-[#2F80ED]">
                                  <TbDental size={20} />
                                </div>
                                <p className="text-sm text-black">
                                  บริการ {selectedAppointment?.detail}
                                </p>
                              </div>

                              <div className="flex items-center ml-1 gap-1">
                                <div className="text-[#2F80ED]">
                                  <BsFillTelephoneFill size={15} />
                                </div>
                                <p className="text-sm text-black">
                                  {selectedAppointment?.tel}
                                </p>
                              </div>

                              <p className="text-sm text-black">
                                ประเมินค่าใช้จ่าย {selectedAppointment?.price}
                              </p>

                              <div className="flex items-center  gap-1">
                                <div className="text-[#2F80ED]">
                                  <FaClock size={20} />
                                </div>
                                <p className="text-sm text-black">
                                  {selectedAppointment?.timeStart} -{" "}
                                  {selectedAppointment?.timeEnd}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="workflow-box mt-5">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-bold text-slate-700">สถานะคิว</span>
                              <span className={`status-pill status-${selectedAppointment?.status || "waiting"}`}>
                                {selectedAppointment?.status === "examining" ? "กำลังตรวจ" : selectedAppointment?.status === "payment" ? "รอชำระเงิน" : selectedAppointment?.status === "completed" ? "เสร็จสิ้น" : "รอตรวจ"}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                              <button type="button" className="workflow-button" onClick={() => updateAppointmentStatus("waiting")}>เข้าคิว</button>
                              <button type="button" className="workflow-button" onClick={() => updateAppointmentStatus("examining")}>เรียกตรวจ</button>
                              <button type="button" className="workflow-button" onClick={() => updateAppointmentStatus("payment")}>ส่งชำระเงิน</button>
                              <button type="button" className="workflow-button" onClick={() => updateAppointmentStatus("completed")}>ปิดเคส</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
                          onClick={handleModalClose}
                        >
                          &times; {/* สัญลักษณ์กากบาท */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {showAddModal && (
            <div className="demo-modal fixed inset-0 z-50 flex" onClick={() => setShowAddModal(false)}>
              <form className="demo-form ml-auto h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl" onSubmit={handleAddAppointment} onClick={(event) => event.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">เพิ่มตารางงาน</h3>
                  <button type="button" className="text-2xl text-slate-400" onClick={() => setShowAddModal(false)}>×</button>
                </div>
                <label className="form-label">ชื่อผู้ป่วย<input required className="form-input" value={newAppointment.patient} onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })} placeholder="เช่น คุณสมชาย ใจดี" /></label>
                <label className="form-label">บริการ<input className="form-input" value={newAppointment.detail} onChange={(e) => setNewAppointment({ ...newAppointment, detail: e.target.value })} /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="form-label">เริ่ม<input className="form-input" value={newAppointment.timeStart} onChange={(e) => setNewAppointment({ ...newAppointment, timeStart: e.target.value })} /></label>
                  <label className="form-label">สิ้นสุด<input className="form-input" value={newAppointment.timeEnd} onChange={(e) => setNewAppointment({ ...newAppointment, timeEnd: e.target.value })} /></label>
                </div>
                <button className="save-button mt-4 w-full rounded-xl py-3 font-bold text-white" type="submit">บันทึกตารางงาน</button>
              </form>
            </div>
          )}
          <div className="summary-panel mt-2 w-full min-w-0 lg:mt-8 lg:w-1/2">
            <div className="mb-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="section-eyebrow">DAILY OVERVIEW</p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">วันที่ 30 ม.ค. 2564</h1>
              </div>

              <div className="flex items-center justify-between gap-2 sm:justify-center sm:gap-4">
                <div className="revenue-chip min-w-0 flex-1 px-2 py-2 text-center text-sm font-extrabold sm:px-6 sm:py-3 sm:text-lg lg:px-14">
                  รายได้ทั้งหมด 0.00 บาท
                </div>
                <div className="refresh-button rounded-xl border-2 px-3 py-2 font-extrabold shadow-sm">
                  <IoReload size={25} />
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* column1 */}
              <div className="status-card w-full">
                <div className="w-full ">
                  <div className="status-title w-full rounded-t-xl py-3 text-center text-white">
                    ห้องพิเศษ present ( 0)
                  </div>
                  <div className="h-40 rounded-br-xl bg-[#EAF4FF] sm:h-[500px]"></div>
                </div>
              </div>
              {/* column2 */}
              <div className="status-card w-full">
                <div className="w-full ">
                  <div className="status-title w-full rounded-t-xl py-3 text-center text-white">
                    แอดมิน (1)
                  </div>
                  <div className="h-40 rounded-b-xl bg-[#EAF4FF] p-3 sm:h-[500px] sm:p-5">
                    <div className="bg-white rounded-md shadow-lg ">
                      <div className="flex w-full h-[100px] gap-2">
                        <div className="w-1/5">
                          <div className="bg-[#2F80ED] text-center rounded-br-full text-white">
                            01
                          </div>
                          <div className="text-[#EAF4FF] mt-1">
                            <RxAvatar size={50} />
                          </div>
                        </div>
                        <div className="w-3/5 flex flex-col justify-between ml-1">
                          <div>
                            <h1 className="text-[16px] font-bold mt-1">
                              วรภัทร บารมี
                            </h1>
                            <h1 className="text-md">6401023</h1>
                          </div>
                          <div className="text-center text-sm text-gray-500 mt-auto">
                            9 วัน
                          </div>
                        </div>
                        <div className="w-1/5 flex flex-col ">
                          <div>
                            <div className="text-md text-white m-1 rounded-tr-md bg-[#1E5AA8] text-center ">
                              05
                            </div>
                          </div>

                          <div className="flex items-center justify-center mt-5 font-extrabold text-red-600 ">
                            <MdBlockFlipped size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* column3 */}
              <div className="status-card w-full">
                <div className="w-full ">
                  <div className="status-title w-full rounded-t-xl py-3 text-center text-white">
                    จุดชำระเงิน (1)
                  </div>
                  <div className="h-40 rounded-b-xl bg-[#EAF7FF] p-3 sm:h-[500px] sm:p-5">
                    <div className="bg-white rounded-md shadow-lg relative">
                      <div className="flex w-full h-[100px] gap-2">
                        <div className="w-1/5">
                          <div className="bg-[#2F80ED] text-center rounded-br-full text-white">
                            01
                          </div>
                          <div className="text-[#EAF4FF] mt-1">
                            <RxAvatar size={50} />
                          </div>
                        </div>
                        <div className="w-3/5 flex flex-col justify-between ml-1">
                          <div>
                            <h1 className="text-[16px] font-bold mt-1">
                              การดา สุขสวัสดิ์
                            </h1>
                            <h1 className="text-md">6401009</h1>
                          </div>
                          <div className="text-center text-sm text-gray-500 mt-auto">
                            5 วัน
                          </div>
                        </div>
                        <div className="w-1/5 flex flex-col ">
                          <div>
                            <div className="text-md text-white m-1 rounded-tr-md bg-[#1E5AA8] text-center ">
                              03
                            </div>
                          </div>
                          <div className="text-[#EAF4FF] absolute bottom-7 right-8">
                            <TiExportOutline size={25} />
                          </div>
                          <div className="flex items-center justify-center mt-5 font-extrabold text-red-600 ">
                            <MdBlockFlipped size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

