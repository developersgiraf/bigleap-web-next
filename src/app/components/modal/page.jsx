// "use client";

// import { useEffect } from "react";

// export default function ModalStyle() {
//   useEffect(() => {
//     // Dynamically import Bootstrap JS only on client side
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");
//   }, []);

//   return (
//     <>
//       {/* First Modal */}
//       <div
//         className="modal fade"
//         id="exampleModalToggle"
//         aria-hidden="true"
//         aria-labelledby="exampleModalToggleLabel"
//         tabIndex="-1"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
//                 Modal 1
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               Show a second modal and hide this one with the button below.
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="btn btn-primary"
//                 data-bs-target="#exampleModalToggle2"
//                 data-bs-toggle="modal"
//               >
//                 Open second modal
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Second Modal */}
//       <div
//         className="modal fade"
//         id="exampleModalToggle2"
//         aria-hidden="true"
//         aria-labelledby="exampleModalToggleLabel2"
//         tabIndex="-1"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
//                 Modal 2
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               Hide this modal and show the first with the button below.
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="btn btn-primary"
//                 data-bs-target="#exampleModalToggle"
//                 data-bs-toggle="modal"
//               >
//                 Back to first
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Trigger Button */}
//       <button
//         className="btn btn-primary"
//         data-bs-target="#exampleModalToggle"
//         data-bs-toggle="modal"
//       >
//         Open first modal
//       </button>
//     </>
//   );
// }
