import React from "react";
import { Router,Route,Routes} from "react-router-dom";
import Inspection from './componets/Inspection';


const Rout = () => {
    return (
        <Routes>
          <Route path="/" element={<Inspection/>}/>
        </Routes>
    )
}
export default Rout;