// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import DashboardHeader from '../champtradeComponent/dashboard/DashboardHeader';
// import Sidebar from '../champtradeComponent/dashboard/Sidebar';

// function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-dark-green">
//       <DashboardHeader />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;

import { Outlet } from 'react-router-dom';
import DashboardHeader from '../champtradeComponent/dashboard/DashboardHeader';
import Sidebar from '../champtradeComponent/dashboard/Sidebar';

function DashboardPage() {
  return (
    <div className="h-screen flex flex-col bg-dark-green overflow-hidden">
      {/* Fixed Header */}
      <header className="shrink-0">
        <DashboardHeader />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <aside className=" shrink-0 overflow-y-auto border-r border-gray-700">
          <Sidebar />
        </aside>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;