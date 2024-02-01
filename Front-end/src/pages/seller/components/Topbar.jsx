import { Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import logo from '../../../assets/logo.png'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MessageIcon from "@mui/icons-material/Message";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
const Topbar = ({chatOpen,setChatOpen}) => {

  return (
    <div className='flex justify-between '>
      <div className="md:ml-12 flex md:gap-[90px] ">
        <div className="">
        <img src={logo} alt="" className='min-w-[84px] h-[84px]' />
        </div>
      <div className="mt-6">
            
            <input
              type="text"
              className=" border-b border-[#004456] md:w-[700px] w-[170px] h-[40px]  bg-[#003366] p-2 mx-1"
              placeholder="search for..."
              name=""
              id=""
              disabled
              onClick={()=>{}}
            />
            <IconButton
              type="submit"
              sx={{
                p: "-10px",
                color: "white",
                marginLeft: "-52px",
                position: "absolute",
              }}
            >
              <Search />
            </IconButton>
          </div>
      </div>
      <div className="flex mr-6 md:mr-12 mt-9 gap-4 md:gap-12">
       <LightModeOutlinedIcon sx={{ color: "white" }} />
       <div className="">
              <MessageIcon onClick={()=>setChatOpen(true)} sx={{ color: "white" }} />
              <h5 className="absolute top-6 px-2 ml-3 rounded-full w-6 h-6 bg-red-600 text-white">
                3
              </h5>
            </div>
       <div className="">
              <NotificationsOutlinedIcon sx={{ color: "white" }} />
              <h5 className="absolute top-6 px-2 ml-3 rounded-full w-6 h-6 bg-red-600 text-white">
                3
              </h5>
            </div>
      </div>



    </div>
  )
}

export default Topbar