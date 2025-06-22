import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import qr from "./assets/qr.png";
import { isValidCardNumber, isValidExpiry, isValidCVV } from "./utils/utils.js";


import axis from './assets/axis.png'
import bob from './assets/bob.png'
import pnb from './assets/pnb.png'
import hdfc from './assets/hdfc.png'
import union from './assets/union.png'
import sbi from './assets/sbi.png'


export default function Modal({ onClose, id }) {

 const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [holder, setHolder] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const checkErrors = () => {
    const errs = {};
    if (!isValidCardNumber(num)) errs.num = "Card number must be 16 digits.";
    if (!isValidExpiry(exp)) errs.exp = "Enter valid future MM/YY.";
    if (!holder.trim()) errs.holder = "Cardholder name is required.";
    const isAmex = num.replace(/\D/g, "").startsWith("3");
    if (!isValidCVV(cvv, isAmex)) errs.cvv = `CVV must be ${isAmex ? 4 : 3} digits.`;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };






  const [selectedEmiOption, setSelectedEmiOption] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSendOtp = () => {
    if (termsAccepted && resendTimer === 0) {
      setOtpSent(true);
      setResendTimer(90); // 1.5 minutes = 90 seconds
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((id === "paylater" || id === "cod") && !termsAccepted) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  const renderFields = () => {
    if (id === "paylater" || id === "cod") {
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {id === "paylater"
              ? "Enter OTP sent to your KYC verified account"
              : "No advance payment required. Confirm your delivery address."}
          </p>
         

          <button
                type="button"
                onClick={handleSendOtp}
                disabled={!termsAccepted || resendTimer > 0}
                className={`text-sm underline ${
                  termsAccepted && resendTimer === 0 ? "bg-blue-500 text-white hover:text-blue-600" : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Send OTP"}
              </button>
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">I agree to the Terms and Conditions</span>
              </label>
              <a
                href="#"
                className="text-blue-500 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Terms and Conditions
              </a>
        </div>
      );
    }
    if (id.startsWith("upi-")) {
      return (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter UPI ID or Phone Number"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button type="button" className="text-sm text-blue-500 hover:underline">
            Verify
          </button>
          <div className="text-center">
            <img src={qr} alt="Scan QR" className="mx-auto w-24 h-24 mt-2" />
            <p className="text-xs text-gray-500 mt-1">Or scan to pay</p>
          </div>
        </div>
      );
    }
    if (id.startsWith("card-")) {
         return (
    <div className="space-y-3">
      {/* Card Number */}
      <input
        type="text"
        maxLength={19}
        placeholder="1234 5678 9012 3456"
        value={num}
        onChange={e => {
          const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
          setNum(digits.match(/.{1,4}/g)?.join(" ") || digits);
        }}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.num && <p className="text-red-500 text-sm">{errors.num}</p>}

      {/* Expiry */}
      <input
        type="text"
        placeholder="MM/YY"
        maxLength={5}
        value={exp}
        onChange={e => {
          const v = e.target.value.replace(/\D/g, "");
          setExp(v.length > 2 ? `${v.slice(0,2)}/${v.slice(2,4)}` : v);
        }}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.exp && <p className="text-red-500 text-sm">{errors.exp}</p>}

      {/* Card Holder */}
      <input
        type="text"
        placeholder="Cardholder Name"
        value={holder}
        onChange={e => setHolder(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.holder && <p className="text-red-500 text-sm">{errors.holder}</p>}

      {/* CVV */}
      <input
        type="text"
        placeholder="CVV"
        maxLength={4}
        value={cvv}
        onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

       <button
        type="button"
        onClick={() => {
          if (checkErrors()) {
          
            handleSendOtp();
          }
        }}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Send OTP"}
      </button>
      {handleSendOtp()&& <input type="text" placeholder="Enter OTP"></input>}

    </div>
  );
   }
     if (id.startsWith("bank-")) {
      if (id === "bank-other") {
        return (
          <div className="space-y-3">
            <input type="text" placeholder="Bank Name" className="w-full px-4 py-2 border rounded-md" required />
            <input type="text" placeholder="IFSC CODE" className="w-full px-4 py-2 border rounded-md" required />
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Search Bank</button>
          </div>
        );
      }
      return (
        <div className="space-y-3">
          <input type="text" placeholder="User ID" className="w-full px-4 py-2 border rounded-md" required />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" required />
        </div>
      );
    }
    if (id === "giftcard") {
      return (
        <div className="space-y-4">
          <input type="text" placeholder="Gift Card Code" className="w-full px-4 py-2 border rounded-md" required />
          <button type="button" className="text-sm text-blue-500 hover:underline">Verify Card</button>
        </div>
      );
    }
    if (id === "emi") {
      const emiOptions = [
        { label: "3 months @ ₹3500/mo", logo: hdfc },
        { label: "6 months @ ₹1800/mo", logo: sbi },
        { label: "9 months @ ₹1250/mo", logo: pnb },
        { label: "12 months @ ₹950/mo", logo: axis },
        { label: "18 months @ ₹750/mo", logo: bob },
        { label: "18 months @ ₹650/mo", logo: union },
      ];

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {emiOptions.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedEmiOption(option.label)}
                className={`flex items-center gap-2 border px-4 py-2 rounded-md text-sm w-full text-left transition shadow-xl ${
                  selectedEmiOption === option.label ? "bg-blue-100 border-blue-500" : "hover:border-blue-400  hover:shadow-black"
                }`}
              >
                <img src={option.logo} alt="Bank Logo" className="w-6 h-6" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {selectedEmiOption && (
            <div className="space-y-3 mt-4">
              <input
                type="text"
                placeholder="Enter Aadhaar Number"
                className="w-full px-4 py-2 border rounded-md shadow-xl"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!termsAccepted || resendTimer > 0}
                className={`text-sm underline ${
                  termsAccepted && resendTimer === 0 ? "bg-blue-500 text-white hover:text-blue-600" : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Send OTP"}
              </button>
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">I agree to the Terms and Conditions</span>
              </label>
              <a
                href="#"
                className="text-blue-500 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Terms and Conditions
              </a>
            </div>
          )}
        </div>
      );
    }
    return <p className="text-sm text-gray-500">No input required.</p>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Enter Required Details</h2>
        {submitted ? (
          <div className="text-green-600 text-center font-medium py-4"><h2>Payed SuccesFully </h2><p><strong>Transaction Id;-</strong>16275782166783y627382728277</p></div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {renderFields()}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
             Pay
            </button>
          </form>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

