             // CardPaymentForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function CardPaymentForm() {
  const [flipped, setFlipped] = useState(false);
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [holder, setHolder] = useState("");
  const [cvv, setCvv] = useState("");

  const commonStyle = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "0.75rem",
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div className="perspective w-80 h-44">
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <div style={commonStyle} className="bg-gray-900 p-6 text-white overflow-hidden">
            {/* Chip SVG */}
            <svg
              className="absolute top-4 left-4 w-[42px] h-[32px]"
              viewBox="0 0 42 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="42" height="32" rx="6" fill="url(#grad)" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffdd57" />
                  <stop offset="100%" stopColor="#ffc107" />
                </linearGradient>
              </defs>
            </svg>

            {/* Contactless icon */}
            <div className="absolute top-6 right-16 w-4 h-4 border-2 border-white rounded-tr-full rotate-45 border-t-0 border-l-0" />

            {/* Mastercard text logo */}
            <div className="absolute top-4 right-4 text-white text-xs tracking-widest font-bold">
              MASTERCARD
            </div>

            {/* Card Number */}
            <input
              type="text"
              maxLength={19}
              value={number}
              onChange={e => setNumber(formatCardNumber(e.target.value))}
              placeholder="9759 2484 5269 6576"
              className="mt-12 w-full bg-transparent text-lg font-mono font-semibold outline-none placeholder-gray-400"
            />

            {/* Valid Thru / Card Holder */}
            <div className="flex justify-between items-end mt-4 text-xs uppercase">
              <div>
                <div className="text-gray-400">VALID THRU</div>
                <input
                  type="text"
                  maxLength={5}
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  placeholder="12/24"
                  className="w-14 bg-transparent outline-none placeholder-gray-400"
                />
              </div>
              <input
                type="text"
                value={holder}
                onChange={e => setHolder(e.target.value)}
                placeholder="Bruce Wayne"
                className="flex-1 ml-4 bg-transparent outline-none uppercase placeholder-gray-400"
              />
            </div>

            {/* Mastercard circles */}
            <div className="absolute bottom-4 right-4 flex space-x-[-6px]">
              <div className="w-6 h-6 bg-red-600 rounded-full" />
              <div className="w-6 h-6 bg-orange-500 rounded-full" />
            </div>
          </div>

          {/* Back Side */}
          <div style={{ ...commonStyle, transform: "rotateY(180deg)" }} className="bg-gray-900 p-6 text-white overflow-hidden">
            <div className="h-6 bg-black mb-4" />
            <div className="flex justify-between items-center">
              <div className="flex-1 bg-gray-800 h-6" />
              <input
                type="text"
                maxLength={3}
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
                placeholder="CVV"
                className="w-16 bg-gray-700 text-white text-right pr-2 outline-none"
              />
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-[-6px]">
              <div className="w-6 h-6 bg-red-600 rounded-full" />
              <div className="w-6 h-6 bg-orange-500 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setFlipped(v => !v)}>
        {flipped ? "Show Front" : "Show CVV"}
      </button>
    </div>
  );
}

function formatCardNumber(val) {
  const digits = val.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join(" ") || digits;
}
function formatExpiry(val) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}












// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function CardPaymentForm() {
//   const [flipped, setFlipped] = useState(false);
//   const [number, setNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [holder, setHolder] = useState("");
//   const [cvv, setCvv] = useState("");

//   const common = {
//     backfaceVisibility: "hidden",
//     WebkitBackfaceVisibility: "hidden",
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     borderRadius: "0.75rem",
//   };

//   return (
//     <div className="flex flex-col items-center p-6 space-y-4">
//       <div className="perspective w-80 h-44">
//         <motion.div
//           className="relative w-full h-full"
//           animate={{ rotateY: flipped ? 180 : 0 }}
//           transition={{ duration: 0.6 }}
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           {/* Front */}
//           <div style={common} className="bg-gray-900 p-6 text-white overflow-hidden">
//             {/* Chip */}
//             <div
//               className="absolute top-4 left-4"
//               style={{
//                 width: "42px",
//                 height: "32px",
//                 background: "linear-gradient(145deg, #ffdd57, #ffc107)",
//                 borderRadius: "6px",
//               }}
//             />

//             {/* Contactless icon */}
//             <div className="absolute top-6 right-16 w-4 h-4 border-2 border-white rounded-tr-full rotate-45 border-t-0 border-l-0"></div>

//             {/* Mastercard logo */}
//             <div className="absolute top-4 right-4 text-white text-xs tracking-widest font-semibold">
//               MASTERCARD
//             </div>

//             {/* Card Number */}
//             <input
//               type="text"
//               maxLength={19}
//               value={number}
//               onChange={(e) => setNumber(formatCardNumber(e.target.value))}
//               placeholder="Enter 16 Digit No.5269 6576"
//               className="mt-12 w-full bg-transparent text-lg font-mono font-semibold outline-none placeholder-gray-400"
//             />

//             {/* Expiry & Holder */}
//             <div className="flex justify-between items-end mt-4 text-xs uppercase">
//               <div>
//                 <div className="text-gray-400">VALID TILL</div>
//                 <input
//                   type="text"
//                   maxLength={5}
//                   value={expiry}
//                   onChange={(e) => setExpiry(formatExpiry(e.target.value))}
//                   placeholder="MM/YY"
//                   className="w-14 bg-transparent outline-none placeholder-gray-400"
//                 />
//               </div>
//               <input
//                 type="text"
//                 value={holder}
//                 onChange={(e) => setHolder(e.target.value)}
//                 placeholder="Card holder Name"
//                 className="flex-1 ml-4 bg-transparent outline-none uppercase placeholder-gray-400"
//               />
//             </div>

//             {/* Mastercard icon circles */}
//             <div className="absolute bottom-4 right-4 flex space-x-[-6px]">
//               <div className="w-6 h-6 bg-red-600 rounded-full"></div>
//               <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
//             </div>
//           </div>

//           {/* Back */}
//           <div style={{ ...common, transform: "rotateY(180deg)" }} className="bg-gray-900 p-6 text-white overflow-hidden">
//             <div className="h-6 bg-black mb-4"></div>
//             <div className="flex justify-between items-center">
//               <div className="flex-1 bg-gray-800 h-6"></div>
//               <input
//                 type="text"
//                 maxLength={3}
//                 value={cvv}
//                 onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
//                 placeholder="CVV"
//                 className="w-16 bg-gray-700 text-white text-right pr-2 outline-none"
//               />
//             </div>
//             <div className="absolute bottom-4 right-4 flex space-x-[-6px]">
//               <div className="w-6 h-6 bg-red-600 rounded-full"></div>
//               <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <button
//         onClick={() => setFlipped((v) => !v)}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {flipped ? "Flip" : "Enter CVV"}
//       </button>
//     </div>
//   );
// }

// function formatCardNumber(val) {
//   const digits = val.replace(/\D/g, "").slice(0, 16);
//   return digits.match(/.{1,4}/g)?.join(" ") || digits;
// }
// function formatExpiry(val) {
//   const digits = val.replace(/\D/g, "").slice(0, 4);
//   return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
// }








