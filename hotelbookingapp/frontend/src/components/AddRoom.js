import { useState } from "react";
import "../css/AddRoom.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [imgArr, setImgArr] = useState([]);



  const handleAddRoom = async () => {
    // Handle logic to add room
    if (
      !roomName ||
      !description ||
      !type ||
      !price ||
      !img1 ||
      !img2 ||
      !img3
    ) {
      toast.error("Please fill all the related Fields", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      const  updatedArr = [...imgArr, img1, img2, img3]
      setImgArr(updatedArr);
      // setImgArr((prevArr)=>{
      //   return [...prevArr , img1 , img2 , img3]
      // })
      console.log(imgArr);
      try {        
        const Rooms = {
          name: roomName,
          desc: description,
          type: type,
          price: price,
          img: imgArr,
        };
        console.log(Rooms);
        const axiosInstance = axios.create({
          withCredentials: true,
        });
  
       axiosInstance.post(
          "https://hotelbookingbackend-4asp.onrender.com/api/room/add-rooms",
          Rooms
        );
        toast.success("Successfully Room Booked", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Error! Room not Booked", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Error Occurred", error.name);
      }

      
    }
  };

  return (
    <div className='add-room-container'>
      <form>
        <div className='holder'>
          <input
            type='text'
            id='roomName'
            placeholder='Room Name'
            value={roomName}
            required
            onChange={(e) => setRoomName(e.target.value)}
          />

          <textarea
            id='description'
            placeholder='Room Description'
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className='holder'>
          <input
            type='text'
            id='type'
            placeholder='Room Type'
            value={type}
            required
            onChange={(e) => setType(e.target.value)}
          />

          <input
            type='number'
            id='price'
            placeholder='Price'
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='holder'>
          <input
            type='text'
            id='price'
            placeholder='image url 1'
            value={img1}
            required
            onChange={(e) => {
              setImg1(e.target.value);
            }}
          />

          <input
            type='text'
            id='price'
            placeholder='image url 2'
            value={img2}
            onChange={(e) => {
              setImg2(e.target.value);
            }}
            required
          />
        </div>
        <div className='holder'>
          <input
            type='text'
            id='price'
            placeholder='image url 3'
            value={img3}
            onChange={(e) => {
              setImg3(e.target.value);
            }}
            required
          />
        </div>
        <div className='holder'>
          <button type='button' onClick={handleAddRoom}>
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;