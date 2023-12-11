import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Room.css";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { DatePicker, Space } from "antd";
import { DataContext } from "../Context/DataContext";
import { toast } from "react-toastify";

const Rooms = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { RangePicker } = DatePicker;
  const [searchValue, setSearchValue] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
const {setFromDate , fromDate , toDate , setToDate} = useContext(DataContext)
  useEffect(() => {
//     if(!fromDate && !toDate) {
// toast.error('Please Select Booking Dates' , {
//   position: "top-right", // Position of the notification
//   autoClose: 3000, // Auto close the notification after 3 seconds
// });
    // }
   
      try {
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        axiosInstance
          .get("https://hotelbookingbackend-4asp.onrender.com/api/room/get-rooms")
          .then((res) => {
            setData(res.data);
          });
      } catch (error) {
        console.log("Error Occured", error.name);
      
    }
   
  }, []);

  const filterDates =  (dates) => {
    // console.log(dates[0].format("DD/MM/YY"));
    // console.log(dates[1].format("DD/MM/YY"));
     setFromDate(dates[0].format("DD/MM/YY"));
    setToDate(dates[1].format("DD/MM/YY"));
    
  };
 
  
  

  return (
    <div className='main-container'>
      <div className='filter-container '>
        <div className='   filter-input'>
          <Space direction='vertical' size={5}>
            <RangePicker format={"DD/MM/YY"} onChange={filterDates} />
          </Space>
        </div>
        <div className='   filter-input'>
          <input
            type='text'
            className='search-input'
            placeholder='Search...'
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className=' filter-input'>
          <select
            style={{
              width: "100%",
              height: "33px",
              border: "none",
              display: "flex",
              alignItems: "center",
            }}
            id='dropdown'
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='100'>Under 100</option>

            <option value='200'>Under 200</option>

            <option value='300'>Under 300</option>
          </select>
        </div>
      </div>
      {data &&
        data
          .filter((room) => {
            // if (searchValue == "" ) {
            //   return room;
            // } else {
            //   return room.name
            //     .toLowerCase()
            //     .includes(searchValue.toLowerCase());
            // }
            if (searchValue !== "" && filterPrice === "all") {
              return room.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            } else if (searchValue === "" && filterPrice !== "all") {
              return room.price <= parseInt(filterPrice);
            } else if (searchValue !== "" && filterPrice !== "all") {
              return (
                room.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                room.price <= parseInt(filterPrice)
              );
            } else {
              return room;
            }
          })
          .map((room, index) => (
            <div className='container position-relative' key={index}>
              <div className='room-container d-flex gap-5'>
                <div className='roomImage'>
                  <img src={room.img[0]} alt='roomImage' />
                </div>
                <div className='roomDetails d-flex flex-column gap-3'>
                  <div className='room title'> {room.name}</div>
                  <div className='room type'>Type: {room.type}</div>
                  <div className='room price'> Price: Rs.{room.price}</div>
                </div>
              </div>
              <button
                className='btn btn-dark viewDetails'
                onClick={() => {
                  setOpen(!open);
                  setSelectedRoom(room);
                }}
              >
                View Details
              </button>
            </div>
          ))}

      <Modal
        show={open}
        onEscapeKeyDown={() => setOpen(!open)}
        className='modal-main'
      >
        <Modal.Header>
          <Modal.Title>{selectedRoom && selectedRoom.name}</Modal.Title>
        </Modal.Header>

        <div className='modal-content'>
          <div className='title-area'></div>
          <div className='carousel-area'>
            <Carousel>
              {selectedRoom &&
                selectedRoom.img.map((image, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img src={image} alt='room-image' />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
          <div className='description-area'>
            {selectedRoom && selectedRoom.desc}
          </div>
        </div>

        <button
          className='btn btn-danger closebtn'
          onClick={() => setOpen(!open)}
        >
          Close
        </button>
        <Link
          to={`/book/${selectedRoom && selectedRoom._id}`}
          className='bookbtn mt-1'
        >
          <button className='btn btn-dark bookbtn'>Book Now</button>
        </Link>
      </Modal>
    </div>
  );
};
export default Rooms;