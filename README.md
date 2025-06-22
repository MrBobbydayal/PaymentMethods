## Features

- Main list with multiple payment methods  
- Main-lists like UPI, Cards, EMI, Netbanking, COD, Gift Cards  
- Sub-lists-|- upi -> G-pay,PhonePe,PayPal,Paytm,BHIM
            |-Credit/Debit Card-> Visa ,Master card,American Express,Rupay Card
            |-Net Banking->hdfc,pnb,sbi,bob,union,axis,other

- Required Input Field according to Opytion Selected
- Validated input forms:
  - Card: 16-digit card number, future MM/YY expiry, holder name, CVV (3‑4 digits)
  - OTP flow with timer, Terms & Conditions checkbox (Pay Later, COD, Card, EMI)
  - EMI: pick a plan, Aadhaar + OTP input
  - UPI: UPI ID + QR code + Verify link
  - Gift Card: code + verify action
  - Netbanking: bank login or "Other Bank" with IFSC lookup
- Animated UI via Framer Motion
- Fully responsive layout
- Styled using Tailwind CSS
- Accessible forms & semantic HTML

---

## Tech Stack

- **React** (hooks + functional components)  
- **Vite** – fast dev server and build tool  
- **Framer Motion** – for smooth animations and card flips  
- **Tailwind CSS** – utility-first styling  
- **JavaScript** – validation and logic  
- No backend—everything is mocked for UI demo

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm 

### Installation

Clone the repo:

```bash
git clone https://github.com/MrBobbydayal/PaymentMethods.git
cd PaymentMethods
npm install