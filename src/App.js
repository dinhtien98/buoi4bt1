import 'bootstrap/dist/css/bootstrap.min.css';
import Hook1 from './components/hook/Hook1';
import { useState } from 'react';
import API1 from './components/hook/API1';
import Hook2 from './components/hook/Hook2';
import './style.css'
import Students from './components/student/Students';

function App() {
  const [flag,setFlag]=useState(true)
  return (
    <div>
      {/* {
        flag?<Hook2/>:"not show hook2"
      }
      <button onClick={()=>setFlag(!flag)}>show</button>
      <API1/> */}
      <Students/>
    </div>
  );
}

export default App;
