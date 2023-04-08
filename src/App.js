
import './App.css';
import Home from './components/Home';
import Watch from './components/Watch';
import Search from './components/Search'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Categories from './components/Categories';
import Channel from './components/Channel';

const Layout = ({ children }) => {

  var x =  window.matchMedia("(max-width: 1124px)")

  // if (x.matches) { // If media query matches
  //     var z = false
  // } else {
  //   var z = true
  // }
  
  const location = useLocation();
  
      if(location.pathname ==="/" && !x.matches){
      var z = true;
       }
       else{
    var z = false
       }

// console.log(location.pathname);


const [open,setOpen] = useState(z);

// console.log(z)

useEffect(() => {
  setOpen(z)
},[location])






const toggle = ()=>{
  setOpen(!open)
}
return (
  <div className="h-screen overflow-hidden relative" style={{backgroundColor:"#0f0f0f"}}>

  <Header toggle={toggle}/>
 <div className="flex " > 
 <div className='max-h-screen' id='side-main-m'>
   <Sidebar open={open}/>
   </div>
   <div className='w-full mx-1' >
  

        {children}
        </div>
     </div>
     </div>
  )
}



 function App() {


 
  return (
  


<Provider store={store}>
<BrowserRouter>
<>
      <Routes>
        <Route path="/search/:query" element={<Layout><Search /></Layout>} />
        <Route path="/channel/:channelId" element={<Layout><Channel /></Layout>} />
        <Route path="/watch/:id" element={<Layout><Watch /></Layout>} />
        <Route path="/" element={<Layout><Home/></Layout>}>
            </Route>
      </Routes>
      </>
    </BrowserRouter>
    
        </Provider>


  )
  }

export default App;
{/* <div className="max-h-screen overflow-hidden"style={{backgroundColor:"#0f0f0f"}}>
      
<Header/>

<div className="flex " style={{height:"88vh"}} id="sidebar" > 
 <Sidebar/>
 <div className='w-full border border-black' >
<div id="cate-main">
<Categories/>
</div>
<MainVideo/>
</div>
 </div>
 </div>
 </Provider> */}