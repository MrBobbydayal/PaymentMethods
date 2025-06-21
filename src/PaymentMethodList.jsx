import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Modal from "./popup.jsx";

import amex from './assets/amex.png';
import gpay from './assets/gpay.png';
import ppay from './assets/ppay.png';
import paypal from './assets/paypal.png';
import bank from './assets/bank.png';
import bhim from './assets/bhim.png';
import cod from './assets/cod.png';
import credit from './assets/credit.png';
import debit from './assets/debit.png';
import emi from './assets/emi.png';
import giftcard from './assets/giftcard.png';
import master from './assets/master.png';
import paytm from './assets/paytm.png';
import pl from './assets/pl.png';
import rupay from './assets/rupay.png';
import visa from './assets/visa.png';
import wallet from './assets/wallet.png';
import axis from './assets/axis.png'
import bob from './assets/bob.png'
import pnb from './assets/pnb.png'
import hdfc from './assets/hdfc.png'
import union from './assets/union.png'
import sbi from './assets/sbi.png'


const methods = [
  { id: "paylater", label: "Buy Now Pay Later", description: "Buy now, pay after a week", logo: pl, badge: "NEW" },
  { id: "upi", label: "UPI Wallet", description:"Unified Payments Interface", logo: wallet },
  { id: "card", label: "Credit / Debit Card", logo: debit },
  { id: "netbanking", label: "Net Banking", logo: bank },
  { id: "cod", label: "Cash on Delivery", logo: cod },
  { id: "emi", label: "EMI Easy Installment ",description:" Equated Monthly Installment", logo: emi },
  { id: "giftcard", label: "Gift Card", logo: giftcard, link: "Add New" },
];

const upiApps = [
  { id: "phonepe", label: "PhonePe", logo: ppay },
  { id: "gpay", label: "Google Pay", logo: gpay },
  { id: "paytm", label: "Paytm", logo: paytm },
  { id: "bhim", label: "BHIM", logo: bhim },
  { id: "paypal", label: "PayPal", logo: paypal },
];

const cardApps = [
  { id: "visa", label: "Visa", logo: visa },
  { id: "mastercard", label: "Mastercard", logo: master },
  { id: "rupay", label: "RuPay", logo: rupay },
  { id: "amex", label: "American Express", logo: amex },
];

const bankApps = [
  { id: "hdfc", label: "HDFC", description: "", logo:hdfc },
  { id: "sbi", label: "SBI", description: "State Bank Of India", logo:sbi },
  { id: "bob", label: "BOB", description: "Bank Of Baroda", logo:bob },
  { id: "axis", label: "Axis Bank", description: "", logo:axis },
  { id: "union", label: "Union Bank", description: "", logo:union },
  { id: "pnb", label: "PNB", description: "Punjab National Bank", logo:pnb },
  { id: "other", label: "Other", description: "If none of the above", logo:"" },
];

export function PaymentMethods() {
  const [selected, setSelected] = useState(null);
  const [selectedUPI, setSelectedUPI] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [subModal, setSubModal] = useState(null);

  const renderCard = (item, isSelected, handleClick, showBadge = true, showLogo = true) => (
    <motion.button
      key={item.id}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center justify-between px-8 py-5 bg-white rounded-2xl transition shadow-lg ${
        isSelected ? "ring-2 ring-blue-400 bg-white" : "hover:shadow-black"
      }`}
    >
      <div className="flex items-center gap-5"> 
        {showLogo && item.logo && (
          <img src={item.logo} alt={item.label} className="w-6 h-6" />
        )}
        <div className="text-left">
          <p className="text-base font-medium text-gray-800">{item.label}</p>
          {item.description && (
            <p className="text-xs text-gray-500">{item.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showBadge && item.badge && (
          <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
        {item.link && (
          <span className="text-sm text-blue-500 hover:underline">{item.link}</span>
        )}
        {item.icon && <span className="text-lg">{item.icon}</span>}
        {isSelected && <CheckCircle2 className="w-5 h-5 text-green-500" />}
      </div>
    </motion.button>
  );

  const handleSubClick = (type, id) => {
    setSubModal(`${type}-${id}`);
    if (type === 'upi') setSelectedUPI(id);
    if (type === 'card') setSelectedCard(id);
    if (type === 'bank') setSelectedBank(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="bg-white p-6 rounded-3xl space-y-4 shadow-xl w-full min-w-[470px]">
        {methods.map((method) =>
          renderCard(method, selected === method.id, () => {
            setSelected(method.id);
            setSelectedUPI(null);
            setSelectedCard(null);
            setSelectedBank(null);
            if (method.id !== "upi" && method.id !== "card" && method.id !== "netbanking") {
              setSubModal(method.id);
            }
          })
        )}
      </div>

      {selected === "upi" && (
        <div className="bg-white p-6 rounded-3xl space-y-4 shadow-xl w-full min-w-[470px]">
          {upiApps.map((app) =>
            renderCard(
              { ...app, logo: app.logo },
              selectedUPI === app.id,
              () => handleSubClick("upi", app.id),
              false,
              true
            )
          )}
        </div>
      )}

      {selected === "card" && (
        <div className="bg-white p-6 rounded-3xl space-y-4 shadow-xl w-full min-w-[470px]">
          {cardApps.map((card) =>
            renderCard(
              { ...card, logo: card.logo },
              selectedCard === card.id,
              () => handleSubClick("card", card.id),
              false,
              true
            )
          )}
        </div>
      )}

      {selected === "netbanking" && (
        <div className="bg-white p-6 rounded-3xl space-y-4 shadow-xl w-full min-w-[470px]">
          {bankApps.map((bank) =>
            renderCard(
              { ...bank, logo: bank.logo },
              selectedBank === bank.id,
              () => handleSubClick("bank", bank.id),
              false,
              true
            )
          )}
        </div>
      )}

      <AnimatePresence>
        {subModal && <Modal id={subModal} onClose={() => setSubModal(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}







