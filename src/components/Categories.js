import React from "react";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getHomePageVideos,
  getVideosByCate,
} from "../redux/actions/videos.act";
import { useEffect } from "react";

const Categories = () => {
  const categories = [
     {id:0,name:"All"},
     {id:1,name:"Gaming"},
     {id:2,name:"Music"},
     {id:3,name:"News"},
     {id:4,name:"Live"},
     {id:5,name:"React Js"},
     {id:6,name:"Mixes"},
     {id:7,name:"Comedy"},
     {id:8,name:"Cricket"},
     {id:9,name:"Cars"},
     {id:10,name:"MotorCycles"},
     {id:11,name:"Recently Uploaded"},
     {id:12,name:"New to You"},
     {id:13,name:"Filmi"},
  ];

  const [activeElement, setActiveElement] = useState("All");
  const dispatch = useDispatch();
  

  const handleVideo = (value) => {
    //  console.log();
    setActiveElement(value);
    if (value === "All") {
      dispatch(getHomePageVideos());
    } else {
      // console.log(element);
      dispatch(getVideosByCate(value));
    }
  };

  // $(document).ready(function() {
  //   $('#left').click(function() {
  //       $('#hscroll,ul').animate({
  //           scrollLeft: '-=50'
  //       },1000);

  //   });
  // });
  // $(document).ready(function() {
  //   $('#right').click(function() {
  //       $('#hscroll,ul').animate({
  //           scrollLeft: '+=50'

  //       },1000);

  //   });
  // });

  const [slideLeft, setSlideLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [hideButtonLeft, setHideButtonLeft] = useState(true);
  const [hideButtonRight, setHideButtonRight] = useState(false);

  useEffect(() => {
    setSliderWidth(
      document.getElementById("hscroll").scrollWidth -
        document.getElementById("hscroll").offsetWidth
    );
  }, []);
  const moveRight = () => {
    const el = document.getElementById(`hscroll`);
    setSlideLeft(
      $(el).animate(
        {
          scrollLeft: "+=100",
        },
        1000
      )
    );
  };

  const moveLeft = () => {
    const el = document.getElementById(`hscroll`);
    // setSlideLeft((el.scrollLeft -= 50));
    setSlideLeft(
      $(el).animate(
        {
          scrollLeft: "-=100",
        },
        1000
      )
    );
  };
  const onHScroll = () => {
    const el = document.getElementById(`hscroll`).scrollLeft;
    if (el > 0) {
      setHideButtonLeft(false);
    } else {
      setHideButtonLeft(true);
    }
    if (el < sliderWidth) {
      setHideButtonRight(false);
    } else {
      setHideButtonRight(true);
    }
  };

  return (
    <div className="flex justify-center items-center mx-1 ">
      <button id="left" onClick={moveLeft} hidden={hideButtonLeft}>
        <AiOutlineDoubleLeft className=" text-white text-3xl mx-1 text-center p-2 hover:bg-slate-500 rounded-full" />
      </button>
      <div
        id={`hscroll`}
        onScroll={() => onHScroll()}
        className=" hscroll my-2 mx-auto overflow-auto"
        style={{ width: "75vw" }}
      >
        <ul
          id="cate"
          className=" w-max flex flex-row text-white justify-center items-center"
        >
          {categories.map((value, index) =>(
          
            <li
              onClick={() => handleVideo(value.name)}
              key={index}
              className={`"${
                activeElement === value.name
                  ? " text-black bg-slate-500 w-max   mx-2 px-3 py-2 text-sm rounded-lg "
                  : " hover:bg-black w-max  bg-zinc-800 mx-2 px-3 py-2 text-sm rounded-lg "
              }"`}
            >
              <Link to="" >{value.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button id="right" onClick={moveRight} hidden={hideButtonRight}>
        <AiOutlineDoubleRight className="text-white text-3xl mx-1 text-center p-2 hover:bg-slate-500 rounded-full" />
      </button>
    </div>
  );
};
export default Categories;
