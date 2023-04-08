
import './App.css';
import Home from './components/Home';
import Watch from './components/Watch';
import Search from './components/Search'

import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";




 function App() {


 
  return (
  <>
{/* //   <div className='m-0 w-full max-h-screen overflow-hidden ' style={{backgroundColor:"#0f0f0f"}}>
//     <Header/>
//     <div className='w-full flex ' >
//       <div className='w-1/4  p-2   ' style={{height:"92.5vh"}}>
//       <Sidebar/>
//     </div>
//     <div className='w-full border border-black'>
//       <Categories/>
//     <MainVideo/>
//     </div>
//     </div>
//   </div>
//   );
// } */}

<Provider store={store}>

<BrowserRouter>
      <Routes>
        <Route path="/search/:query" element={<Search />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
        </Provider>
</>

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