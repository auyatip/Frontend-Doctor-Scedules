"use client";
import { Card, Image, Popover, Select, Table } from "antd";
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

const Home = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(doctors[0]);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter appointments by selected doctor
  const filteredAppointments = appointments.filter(
    (appt) => appt.doctor === selectedDoctor.id
  );

  console.log(selectedAppointment);

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
        const rowSpan = record.span; // ใช้ rowSpan ของแต่ละแถว
        console.log(record);

        return room ? (
          <div
            className="bg-slate-100  rounded-lg shadow-lg shadow-gray-400 hover:bg-[#FE9901]"
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
    <div suppressHydrationWarning={true}>
      <Card>
        <div className="flex  w-full gap-10">
          <div className="w-1/2 flex m-2">
            <div className="flex flex-col items-center my-8 w-full">
              <div className=" w-full px-5">
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
              </div>

              <div className="bg-white shadow-md rounded-md p-5 w-full max-w-4xl">
                <div className="w-full">
                  <div className="bg-[#2F4169] text-white w-full rounded-lg p-3 text-2xl font-bold flex items-center">
                    <h1 className="flex-1">ทันตแพทย์ {selectedDoctor.label}</h1>
                    <Popover content={doctorOptions} trigger="click">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.label}
                        className="w-12 h-12 rounded-full ml-4 cursor-pointer"
                      />
                    </Popover>
                  </div>
                  <div className="bg-[#9DDDCC] text-white w-full text-center rounded-lg p-1 text-lg font-bold">
                    <div className="flex items-center justify-center gap-1">
                      <IoMdTime size={30} />
                      <span>เวลาเข้างาน 09:00 - 19:00 น.</span>
                    </div>
                  </div>
                  <div className="w-full">
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
                          <h3 className="text-lg leading-6 font-bold text-[#1BB99A]">
                            นัดหมาย
                          </h3>
                          <div className="w-full flex justify-between items-center">
                            <div className="text-lg font-bold text-[#1BB99A]">
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
                                <div className="text-[#1BB99A]">
                                  <RxAvatar size={20} />
                                </div>
                                <p className="text-sm  text-black">
                                  {selectedAppointment?.idMember} |{" "}
                                  {selectedAppointment?.patient}
                                </p>
                              </div>

                              <div className="flex items-center  gap-1">
                                <div className="text-[#1BB99A]">
                                  <TbDental size={20} />
                                </div>
                                <p className="text-sm text-black">
                                  บริการ {selectedAppointment?.detail}
                                </p>
                              </div>

                              <div className="flex items-center ml-1 gap-1">
                                <div className="text-[#1BB99A]">
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
                                <div className="text-[#1BB99A]">
                                  <FaClock size={20} />
                                </div>
                                <p className="text-sm text-black">
                                  {selectedAppointment?.timeStart} -{" "}
                                  {selectedAppointment?.timeEnd}
                                </p>
                              </div>
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
          <div className="w-1/2 mt-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold">วันที่ 30 ม.ค. 2564</h1>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="text-[#FE9901] bg-[#D8E8F4] px-14 text-lg py-3 font-extrabold">
                  รายได้ทั้งหมด 0.00 บาท
                </div>
                <div className="text-[#FE9901] px-3 py-2 shadow-md font-extrabold border-[#FE9901] rounded-lg border-2">
                  <IoReload size={25} />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 gap-3">
              {/* column1 */}
              <div className="w-1/3 shadow-lg ">
                <div className="w-full ">
                  <div className="bg-[#1BB99A] w-full text-center py-2 rounded-tr-lg text-white">
                    ห้องพิเศษ present ( 0)
                  </div>
                  <div className="bg-[#D8E8F5] h-[500px] rounded-br-xl"></div>
                </div>
              </div>
              {/* column2 */}
              <div className="w-1/3 shadow-lg ">
                <div className="w-full ">
                  <div className="bg-[#1BB99A] w-full text-center py-2 rounded-t-lg text-white">
                    แอดมิน (1)
                  </div>
                  <div className="bg-[#D8E8F5] h-[500px] p-5 rounded-b-xl">
                    <div className="bg-white rounded-md shadow-lg ">
                      <div className="flex w-full h-[100px] gap-2">
                        <div className="w-1/5">
                          <div className="bg-[#1BB99A] text-center rounded-br-full text-white">
                            01
                          </div>
                          <div className="text-[#D8E8F5] mt-1">
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
                            <div className="text-md text-white m-1 rounded-tr-md bg-[#2F4169] text-center ">
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
              <div className="w-1/3 shadow-lg ">
                <div className="w-full ">
                  <div className="bg-[#1BB99A] w-full text-center py-2 rounded-t-lg text-white">
                    จุดชำระเงิน (1)
                  </div>
                  <div className="bg-[#CFF4D3] h-[500px] p-5 rounded-b-xl">
                    <div className="bg-white rounded-md shadow-lg relative">
                      <div className="flex w-full h-[100px] gap-2">
                        <div className="w-1/5">
                          <div className="bg-[#1BB99A] text-center rounded-br-full text-white">
                            01
                          </div>
                          <div className="text-[#D8E8F5] mt-1">
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
                            <div className="text-md text-white m-1 rounded-tr-md bg-[#2F4169] text-center ">
                              03
                            </div>
                          </div>
                          <div className="text-[#D8E8F5] absolute bottom-7 right-8">
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
