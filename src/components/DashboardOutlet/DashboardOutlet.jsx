// import React, { useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import { Outlet } from "react-router-dom";

// const DashboardOutlet = () => {
//   return (
//     <>
//       <Navbar />
//       <Sidebar />

//       {/* <div className="sm:relative  bottom-[16px] left-0  sm:top-[80px] md:top-[74px] xl:top-[84px]">
//         <div className=" left-20 mt-6 w-full"> */}
//       <Outlet />
//       {/* </div>
//       </div> */}
//     </>
//   );
// };

// export default DashboardOutlet;
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const DashboardOutlet = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start">
        <Sidebar />

        <Outlet />
      </div>
    </>
  );
};

export default DashboardOutlet;
