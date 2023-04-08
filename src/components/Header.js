import { React, useState, useEffect } from "react";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";
import { BsCameraVideo, BsMicFill, BsSearch, BsYoutube } from "react-icons/bs";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io/";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from "react-redux";
import { AiOutlineClose, AiOutlineFullscreenExit } from "react-icons/ai";

const Header = ({toggle}) => {
  //   setInterval(style = {
  //     transform: 'rotate(180deg)',
  //     transition: 'transform 150ms ease', // smooth transition
  //    },1000)
  const [Colors, setColor] = useState("");
  const rotateicon = () => {
    setColor("animate-bounce");
  };

  setTimeout(rotateicon, 2000);
const [open,setOpen] = useState(false);

const hide =()=>{
  // document.getElementById("sehide").style.display="none"
setOpen(!open)


}
const showLogo =()=>{
  // document.getElementById("sehide").style.display="flex"
setOpen(!open)


}

const [input, setinput] = useState()
const navigate = useNavigate();

const handleForm = (e) =>{
e.preventDefault()

navigate(`/search/${input}`)

}
const {loading} = useSelector(
  state => state.homeVideos)


const [progress, setProgress] = useState(0)

useEffect(() => {

  if(loading===false){
    setProgress(100)
  }
})



// setProgress(50)
  return (
    <>

 <LoadingBar
        color='red'
        height={3}
        progress={progress}
        // onLoaderFinished={() => setProgress(90)}

      />

    
      {/* <nav className="bg-zinc-800 px-2 py-5  sticky w-full"> */}
    
      <div className="flex justify-between  px-2 py-5 sticky items-center h-max w-full ">
     
          <div className="text-white flex justify-start items-center  w-full gap-5 mx-3">
            <div className=" text-stone-100 text-2xl cursor-pointer" onClick={toggle}>
              <GiHamburgerMenu />
            </div>
            <div className=" text-5xl text-red-600 flex gap-1">
             <Link to="/"><BsYoutube className={Colors} /></Link> 
              <span className="text-white text-4xl hidden md:block  ">FunTube</span>
            </div>
          </div>

          {/* //second div */}
          <div className=" flex  items-center w-full justify-center mx-2 p-0 ">
           {/* <form action="" className=" justify-center items-center">
 <input type="text" size="100" id="search" className=" block w-full text-sm bg-gray-800 text-white h-10 p-4 focus:ring-blue-500 focus:border-blue-500 border border-red-600" placeholder="Search here..." required />

           </form> */}
            <form  onSubmit={handleForm} className="hidden sm:flex ">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className=" relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white  pointer-events-none">
                  <IoMdSearch/>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className=" border  rounded-l-full w-full border-gray-300 text-white h-10 bg-transparent font-semibold focus:bg-transparent pl-8  "
                  placeholder="Search Videos here..."
                  size={"100"}
                  required
                  value={input}
                  onChange={e => setinput(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 text-white flex items-center pr-3"
                >
                 <BsMicFill/>
                </button>
              </div>
              <button
                type="submit"
                className="items-center bg-zinc-50 h-10 px-3 rounded-r-full "
              >
                <BsSearch />
              </button>
            </form> 
            {/* mobile menu */}
   
          
         
          </div>
          
          {/* third div */}
          <div className="flex justify-end w-full items-center mx-2 sm:gap-2 " >
          <button id="show-menu" className=" text-xl  sm:hidden text-red-600  rounded-full mx-2 p-2 zindex" ><BsSearch onClick={hide}/></button>
            <div className="text-3xl text-white hover:text-red-600 m">
              <BsCameraVideo />
            </div>
            <div className="text-3xl text-white hover:text-red-600 m">
              <IoMdNotificationsOutline />
            </div>
            <div className="text-3xl">
              <div>
                <button
                  type="button"
                  className=" h-8 w-8 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  {/* <span className="sr-only">Open user menu</span> */}
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
          <div id="m-menu" className="flex justify-center items-center absolute mx-1  h-20  overflow-hidden" style={{backgroundColor:"#0f0f0f"}} >
          <form onSubmit={handleForm} className={open?"flex  w-full mx-2 animsearch ":"collapse-form"}>
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white  pointer-events-none">
                  <IoMdSearch />
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className= "border  rounded-l-full w-full border-gray-300 text-white h-10 bg-transparent font-semibold focus:bg-transparent pl-8 "
                  placeholder="Search Videos here..."
                  size={"100"}
                  required
                  value={input}
                  onChange={e => setinput(e.target.value)}
                />
                
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 text-white flex items-center pr-3"
                >
                 <GiSplitCross  onClick={showLogo} className="cursor-pointer"/>
                </button>
              </div>
              <button
                type="submit"
                className="items-center bg-zinc-50 h-10 px-3 rounded-r-full "
              >
                <BsSearch />
              </button>
            </form> 
            


            </div> 

        </div>
      {/* </nav> */}
    </>
  );
};

export default Header;
