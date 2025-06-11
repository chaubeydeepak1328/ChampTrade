// import React from "react";
// import { Clock, ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";

// interface Transaction {
//   id: string;
//   type: "claim" | "withdraw" | "buy" | "reinvest";
//   amount: number;
//   token: string;
//   status: "completed" | "pending" | "failed";
//   timestamp: string;
//   walletAddress: string;
// }

// const LatestTransactionsPanel: React.FC = () => {
//   // Sample transaction data
//   const transactions: Transaction[] = [
//     {
//       id: "TX-001",
//       type: "claim",
//       amount: 25.5,
//       token: "TCC",
//       status: "completed",
//       timestamp: "2024-03-20 14:30:00",
//       walletAddress: "0x1234...5678",
//     },
//     {
//       id: "TX-002",
//       type: "withdraw",
//       amount: 100,
//       token: "TCC",
//       status: "pending",
//       timestamp: "2024-03-20 13:45:00",
//       walletAddress: "0x8765...4321",
//     },
//     {
//       id: "TX-003",
//       type: "buy",
//       amount: 1000,
//       token: "TCC",
//       status: "completed",
//       timestamp: "2024-03-20 12:15:00",
//       walletAddress: "0xabcd...efgh",
//     },
//     {
//       id: "TX-004",
//       type: "reinvest",
//       amount: 50,
//       token: "TCC",
//       status: "completed",
//       timestamp: "2024-03-20 11:30:00",
//       walletAddress: "0x9876...5432",
//     },
//   ];

//   const getTransactionIcon = (type: string) => {
//     switch (type) {
//       case "claim":
//         return <ArrowDownLeft className="h-5 w-5 text-green-400" />;
//       case "withdraw":
//         return <ArrowUpRight className="h-5 w-5 text-red-400" />;
//       case "buy":
//         return <ArrowDownLeft className="h-5 w-5 text-blue-400" />;
//       case "reinvest":
//         return <RefreshCw className="h-5 w-5 text-yellow-500" />;
//       default:
//         return <Clock className="h-5 w-5 text-neutral-400" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-900/50 text-green-400";
//       case "pending":
//         return "bg-yellow-900/50 text-yellow-500";
//       case "failed":
//         return "bg-red-900/50 text-red-400";
//       default:
//         return "bg-neutral-900/50 text-neutral-400";
//     }
//   };

//   return (
//     <div className="bg-[rgb(20,20,20)] rounded-xl p-2 border-2 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
//             <RefreshCw className="w-5 h-5 text-yellow-500" />
//           </div>
//           <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
//             Latest Transactions
//           </h2>
//         </div>
//         <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">
//           View All
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <div className="sm:block hidden">
//           {/* Desktop Table View */}
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="border-b border-yellow-500/30 p-2">
//                 <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                   Type
//                 </th>
//                 <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                   Amount
//                 </th>
//                 <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                   Wallet
//                 </th>
//                 <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                   Status
//                 </th>
//                 <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                   Time
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-yellow-500/10">
//               {transactions.map((tx) => (
//                 <tr
//                   key={tx.id}
//                   className="hover:bg-yellow-500/5 transition-colors duration-200"
//                 >
//                   <td className="py-3 sm:py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       {getTransactionIcon(tx.type)}
//                       <span className="capitalize text-neutral-300">
//                         {tx.type}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-300">
//                     <span className="font-medium">{tx.amount}</span> {tx.token}
//                   </td>
//                   <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-400 text-xs sm:text-sm">
//                     {tx.walletAddress}
//                   </td>
//                   <td className="py-3 sm:py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
//                         tx.status
//                       )}`}
//                     >
//                       {tx.status}
//                     </span>
//                   </td>
//                   <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-400 text-xs sm:text-sm">
//                     {new Date(tx.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Card View */}
//         <div className="sm:hidden space-y-3">
//           {transactions.map((tx) => (
//             <div
//               key={tx.id}
//               className="p-2 rounded-lg bg-neutral-800/50 border border-yellow-500/10 hover:bg-yellow-500/5 transition-colors duration-200"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex items-center gap-2">
//                   {getTransactionIcon(tx.type)}
//                   <span className="capitalize text-neutral-300">{tx.type}</span>
//                 </div>
//                 <span
//                   className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
//                     tx.status
//                   )}`}
//                 >
//                   {tx.status}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <div className="text-xs text-neutral-400 mb-1">Amount</div>
//                   <div className="text-neutral-300">
//                     <span className="font-medium">{tx.amount}</span> {tx.token}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="text-xs text-neutral-400 mb-1">Wallet</div>
//                   <div className="text-neutral-400 text-xs truncate">
//                     {tx.walletAddress}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <div className="text-xs text-neutral-400 mb-1">Time</div>
//                 <div className="text-neutral-400 text-xs">
//                   {new Date(tx.timestamp).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LatestTransactionsPanel;

// import React, { useState } from "react";
// import { Clock, ArrowUpRight, ArrowDownLeft, RefreshCw, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

// interface Transaction {
//   id: string;
//   type: "claim" | "withdraw" | "buy" | "reinvest";
//   amount: number;
//   token: string;
//   status: "completed" | "pending" | "failed";
//   timestamp: string;
//   walletAddress: string;
// }

// interface Purchase {
//   id: string;
//   item: string;
//   amount: number;
//   token: string;
//   status: "completed" | "pending" | "failed";
//   timestamp: string;
//   walletAddress: string;
// }

// const LatestTransactionsPanel: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"transactions" | "purchases">("transactions");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20; // Changed to 20 rows per page

//   // Sample transaction data (generated to show pagination)
//   const transactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
//     id: `TX-${i + 1}`,
//     type: ["claim", "withdraw", "buy", "reinvest"][Math.floor(Math.random() * 4)] as "claim" | "withdraw" | "buy" | "reinvest",
//     amount: Math.floor(Math.random() * 1000) + 1,
//     token: "TCC",
//     status: ["completed", "pending", "failed"][Math.floor(Math.random() * 3)] as "completed" | "pending" | "failed",
//     timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
//     walletAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
//   }));

//   // Sample purchase data (generated to show pagination)
//   const purchases: Purchase[] = Array.from({ length: 50 }, (_, i) => ({
//     id: `PUR-${i + 1}`,
//     item: ["TCC Starter Pack", "VIP Membership", "Bonus Tokens", "Premium Package"][Math.floor(Math.random() * 4)],
//     amount: Math.floor(Math.random() * 1000) + 1,
//     token: "TCC",
//     status: ["completed", "pending", "failed"][Math.floor(Math.random() * 3)] as "completed" | "pending" | "failed",
//     timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
//     walletAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
//   }));

//   // Get current items based on active tab and pagination
//   const currentItems = activeTab === "transactions" 
//     ? transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//     : purchases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const totalPages = Math.ceil(
//     (activeTab === "transactions" ? transactions.length : purchases.length) / itemsPerPage
//   );

//   const getTransactionIcon = (type: string) => {
//     switch (type) {
//       case "claim":
//         return <ArrowDownLeft className="h-5 w-5 text-green-400" />;
//       case "withdraw":
//         return <ArrowUpRight className="h-5 w-5 text-red-400" />;
//       case "buy":
//         return <ArrowDownLeft className="h-5 w-5 text-blue-400" />;
//       case "reinvest":
//         return <RefreshCw className="h-5 w-5 text-yellow-500" />;
//       default:
//         return <Clock className="h-5 w-5 text-neutral-400" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-900/50 text-green-400";
//       case "pending":
//         return "bg-yellow-900/50 text-yellow-500";
//       case "failed":
//         return "bg-red-900/50 text-red-400";
//       default:
//         return "bg-neutral-900/50 text-neutral-400";
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleTabChange = (tab: "transactions" | "purchases") => {
//     setActiveTab(tab);
//     setCurrentPage(1); // Reset to first page when changing tabs
//   };

//   return (
//     <div className="bg-[rgb(20,20,20)] rounded-xl p-2 border-2 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
//             {activeTab === "transactions" ? (
//               <RefreshCw className="w-5 h-5 text-yellow-500" />
//             ) : (
//               <ShoppingBag className="w-5 h-5 text-yellow-500" />
//             )}
//           </div>
//           <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
//             {activeTab === "transactions" ? "Latest Transactions" : "Purchase History"}
//           </h2>
//         </div>
//         <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">
//           View All
//         </button>
//       </div>

//       {/* Tab Buttons */}
//       <div className="flex mb-4 border-b border-yellow-500/20">
//         <button
//           onClick={() => handleTabChange("transactions")}
//           className={`px-4 py-2 text-sm font-medium ${activeTab === "transactions" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-neutral-400 hover:text-neutral-300"}`}
//         >
//           Transactions
//         </button>
//         <button
//           onClick={() => handleTabChange("purchases")}
//           className={`px-4 py-2 text-sm font-medium ${activeTab === "purchases" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-neutral-400 hover:text-neutral-300"}`}
//         >
//           Purchases
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         {activeTab === "transactions" ? (
//           <>
//             <div className="sm:block hidden">
//               {/* Desktop Table View - Transactions */}
//               <table className="min-w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-yellow-500/30 p-2">
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Type
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Amount
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Wallet
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Status
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Time
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-yellow-500/10">
//                   {currentItems.map((tx) => (
//                     <tr
//                       key={tx.id}
//                       className="hover:bg-yellow-500/5 transition-colors duration-200"
//                     >
//                       <td className="py-3 sm:py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-2">
//                           {getTransactionIcon(tx.type)}
//                           <span className="capitalize text-neutral-300">
//                             {tx.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-300">
//                         <span className="font-medium">{tx.amount}</span> {tx.token}
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-400 text-xs sm:text-sm">
//                         {tx.walletAddress}
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
//                             tx.status
//                           )}`}
//                         >
//                           {tx.status}
//                         </span>
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-400 text-xs sm:text-sm">
//                         {new Date(tx.timestamp).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Card View - Transactions */}
//             <div className="sm:hidden space-y-3">
//               {currentItems.map((tx) => (
//                 <div
//                   key={tx.id}
//                   className="p-2 rounded-lg bg-neutral-800/50 border border-yellow-500/10 hover:bg-yellow-500/5 transition-colors duration-200"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center gap-2">
//                       {getTransactionIcon(tx.type)}
//                       <span className="capitalize text-neutral-300">{tx.type}</span>
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
//                         tx.status
//                       )}`}
//                     >
//                       {tx.status}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <div className="text-xs text-neutral-400 mb-1">Amount</div>
//                       <div className="text-neutral-300">
//                         <span className="font-medium">{tx.amount}</span> {tx.token}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-xs text-neutral-400 mb-1">Wallet</div>
//                       <div className="text-neutral-400 text-xs truncate">
//                         {tx.walletAddress}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-3">
//                     <div className="text-xs text-neutral-400 mb-1">Time</div>
//                     <div className="text-neutral-400 text-xs">
//                       {new Date(tx.timestamp).toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="sm:block hidden">
//               {/* Desktop Table View - Purchases */}
//               <table className="min-w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-yellow-500/30 p-2">
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Item
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Amount
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Wallet
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Status
//                     </th>
//                     <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider whitespace-nowrap">
//                       Time
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-yellow-500/10">
//                   {currentItems.map((purchase) => (
//                     <tr
//                       key={purchase.id}
//                       className="hover:bg-yellow-500/5 transition-colors duration-200"
//                     >
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-300">
//                         {purchase.item}
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-300">
//                         <span className="font-medium">{purchase.amount}</span> {purchase.token}
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-400 text-xs sm:text-sm">
//                         {purchase.walletAddress}
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
//                             purchase.status
//                           )}`}
//                         >
//                           {purchase.status}
//                         </span>
//                       </td>
//                       <td className="py-3 sm:py-4 whitespace-nowrap text-neutral-400 text-xs sm:text-sm">
//                         {new Date(purchase.timestamp).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Card View - Purchases */}
//             <div className="sm:hidden space-y-3">
//               {currentItems.map((purchase) => (
//                 <div
//                   key={purchase.id}
//                   className="p-2 rounded-lg bg-neutral-800/50 border border-yellow-500/10 hover:bg-yellow-500/5 transition-colors duration-200"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="text-neutral-300 font-medium">
//                       {purchase.item}
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
//                         purchase.status
//                       )}`}
//                     >
//                       {purchase.status}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <div className="text-xs text-neutral-400 mb-1">Amount</div>
//                       <div className="text-neutral-300">
//                         <span className="font-medium">{purchase.amount}</span> {purchase.token}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-xs text-neutral-400 mb-1">Wallet</div>
//                       <div className="text-neutral-400 text-xs truncate">
//                         {purchase.walletAddress}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-3">
//                     <div className="text-xs text-neutral-400 mb-1">Time</div>
//                     <div className="text-neutral-400 text-xs">
//                       {new Date(purchase.timestamp).toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {(transactions.length > itemsPerPage || purchases.length > itemsPerPage) && (
//         <div className="flex items-center justify-between mt-4 px-2">
//           <button
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//             className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${currentPage === 1 ? 'text-neutral-500 cursor-not-allowed' : 'text-yellow-500 hover:bg-yellow-500/10'}`}
//           >
//             <ChevronLeft className="h-4 w-4" />
//             Previous
//           </button>
          
//           <span className="text-sm text-neutral-400">
//             Page {currentPage} of {totalPages}
//           </span>
          
//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//             className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? 'text-neutral-500 cursor-not-allowed' : 'text-yellow-500 hover:bg-yellow-500/10'}`}
//           >
//             Next
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LatestTransactionsPanel;


import React, { useState } from "react";
import {
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "claim" | "withdraw" | "buy" | "reinvest";
  amount: number;
  token: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  walletAddress: string;
}

interface Purchase {
  id: string;
  item: string;
  amount: number;
  token: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  walletAddress: string;
}

const LatestTransactionsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"transactions" | "purchases">("transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const transactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
    id: `TX-${i + 1}`,
    type: ["claim", "withdraw", "buy", "reinvest"][
      Math.floor(Math.random() * 4)
    ] as Transaction["type"],
    amount: Math.floor(Math.random() * 1000) + 1,
    token: "TCC",
    status: ["completed", "pending", "failed"][
      Math.floor(Math.random() * 3)
    ] as Transaction["status"],
    timestamp: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(),
    walletAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
      .toString(16)
      .slice(2, 6)}`,
  }));

  const purchases: Purchase[] = Array.from({ length: 50 }, (_, i) => ({
    id: `PUR-${i + 1}`,
    item: ["TCC Starter Pack", "VIP Membership", "Bonus Tokens", "Premium Package"][
      Math.floor(Math.random() * 4)
    ],
    amount: Math.floor(Math.random() * 1000) + 1,
    token: "TCC",
    status: ["completed", "pending", "failed"][
      Math.floor(Math.random() * 3)
    ] as Purchase["status"],
    timestamp: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString(),
    walletAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
      .toString(16)
      .slice(2, 6)}`,
  }));

  const currentTransactions = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const currentPurchases = purchases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil((activeTab === "transactions" ? transactions.length : purchases.length) / itemsPerPage);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "claim":
        return <ArrowDownLeft className="h-5 w-5 text-green-400" />;
      case "withdraw":
        return <ArrowUpRight className="h-5 w-5 text-red-400" />;
      case "buy":
        return <ArrowDownLeft className="h-5 w-5 text-blue-400" />;
      case "reinvest":
        return <RefreshCw className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-900/50 text-green-400";
      case "pending":
        return "bg-yellow-900/50 text-yellow-500";
      case "failed":
        return "bg-red-900/50 text-red-400";
      default:
        return "bg-neutral-900/50 text-neutral-400";
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleTabChange = (tab: "transactions" | "purchases") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[rgb(20,20,20)] rounded-xl p-2 border-2 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
            {activeTab === "transactions" ? (
              <RefreshCw className="w-5 h-5 text-yellow-500" />
            ) : (
              <ShoppingBag className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400">
            {activeTab === "transactions" ? "Latest Transactions" : "Purchase History"}
          </h2>
        </div>
        <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium">View All</button>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 border-b border-yellow-500/20">
        <button
          onClick={() => handleTabChange("transactions")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "transactions" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-neutral-400 hover:text-neutral-300"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => handleTabChange("purchases")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "purchases" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-neutral-400 hover:text-neutral-300"}`}
        >
          Purchases
        </button>
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto">
        {activeTab === "transactions" ? (
          <>
            {/* Desktop View - Transactions */}
            <div className="sm:block hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-500/30">
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Type</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Amount</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Wallet</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-500/10">
                  {currentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-yellow-500/5 transition-colors duration-200">
                      <td className="py-3 whitespace-nowrap flex items-center gap-2 text-neutral-300">
                        {getTransactionIcon(tx.type)} <span className="capitalize">{tx.type}</span>
                      </td>
                      <td className="py-3 whitespace-nowrap text-neutral-300">
                        <span className="font-medium">{tx.amount}</span> {tx.token}
                      </td>
                      <td className="py-3 whitespace-nowrap text-neutral-400 text-xs">{tx.walletAddress}</td>
                      <td className="py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 whitespace-nowrap text-neutral-400 text-xs">
                        {new Date(tx.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Transactions */}
            <div className="sm:hidden space-y-3">
              {currentTransactions.map((tx) => (
                <div key={tx.id} className="p-2 rounded-lg bg-neutral-800/50 border border-yellow-500/10">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(tx.type)} <span className="capitalize text-neutral-300">{tx.type}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 text-sm gap-2 text-neutral-400">
                    <div>Amount: <span className="text-neutral-300 font-medium">{tx.amount} {tx.token}</span></div>
                    <div>Wallet: <span className="text-xs">{tx.walletAddress}</span></div>
                    <div className="col-span-2">Time: {new Date(tx.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Desktop View - Purchases */}
            <div className="sm:block hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-500/30">
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Item</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Amount</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Wallet</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-left text-yellow-500 font-medium uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-500/10">
                  {currentPurchases.map((p) => (
                    <tr key={p.id} className="hover:bg-yellow-500/5 transition-colors duration-200">
                      <td className="py-3 text-neutral-300">{p.item}</td>
                      <td className="py-3 text-neutral-300"><span className="font-medium">{p.amount}</span> {p.token}</td>
                      <td className="py-3 text-neutral-400 text-xs">{p.walletAddress}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-400 text-xs">{new Date(p.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Purchases */}
            <div className="sm:hidden space-y-3">
              {currentPurchases.map((p) => (
                <div key={p.id} className="p-2 rounded-lg bg-neutral-800/50 border border-yellow-500/10">
                  <div className="flex justify-between mb-2">
                    <div className="text-neutral-300 font-medium">{p.item}</div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 text-sm gap-2 text-neutral-400">
                    <div>Amount: <span className="text-neutral-300 font-medium">{p.amount} {p.token}</span></div>
                    <div>Wallet: <span className="text-xs">{p.walletAddress}</span></div>
                    <div className="col-span-2">Time: {new Date(p.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {(transactions.length > itemsPerPage || purchases.length > itemsPerPage) && (
        <div className="flex items-center justify-between mt-4 px-2">
          <button onClick={handlePrevious} disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${currentPage === 1 ? 'text-neutral-500 cursor-not-allowed' : 'text-yellow-500 hover:bg-yellow-500/10'}`}>
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm text-neutral-400">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? 'text-neutral-500 cursor-not-allowed' : 'text-yellow-500 hover:bg-yellow-500/10'}`}>
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestTransactionsPanel;
