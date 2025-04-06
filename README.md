# Nirog Sathi - Comprehensive Healthcare Management Platform

Nirog Sathi is a full stack MERN application designed to streamline the process of scheduling and managing appointments for doctors, patients, and administrators. With a premium, modern look powered by Ant Design components, this platform provides an intuitive, role-based interface that enhances the user experience for all stakeholders. 🚀🛡

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
Nirog Sathi is a comprehensive healthcare management system that caters to the needs of doctors, patients, and administrators by providing:
- A user-friendly, role-based interface.
- Advanced scheduling capabilities, including auto-generation of 15-minute time slots for doctors.
- Robust features like digital prescriptions, digital invoices, and Rezopay payment gateway integration.
- Tools for detailed data analysis and insights via advanced graphs and charts.

---

## Features
- 🛡 **Admin Dashboard**
  - Manage user roles and permissions.
  - Oversee overall system operations.
- 🛡 **Doctor Dashboard**
  - View and manage their schedule.
  - Handle appointments efficiently with auto-generated 15-minute time slots.
  - Interact directly with patients.
- 🛡 **Patient Dashboard**
  - Book appointments easily.
  - Review appointment history.
  - Communicate with doctors.
- 🛡 **Digital Prescription & Invoice**
  - Seamless generation of digital prescriptions and invoices.
- 🛡 **Payment Integration**
  - Integrated Rezopay payment gateway for secure transactions.
- 🛡 **Advanced Search & Filter**
  - Find doctors by expertise, experience, and more.
- 🛡 **Additional Functionalities**
  - Favorite doctors list.
  - Option for patients to share past medical history with new doctors.
  - Blog publishing feature for doctors.
  - Simplified registration request for new doctors.
  - Comprehensive insights with advanced graphs and charts.
  - Automated email notifications for appointment bookings and status updates.
  - Detailed doctor profiles with reviews.

---

## Tech Stack
- **Frontend:** React, Ant Design 🎨
- **Backend:** Node.js, Express.js 🛠
- **Database:** MongoDB 🗄
- **Payment Integration:** Rezopay 💳
- **Authentication:** JWT and role-based access control 🔐

---

## Installation

### Prerequisites
- **Node.js** (v14+)
- **MongoDB**
- **npm** or **yarn**

### Steps
1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/nirog-sathi.git
   cd nirog-sathi
   ```

   
2. **Install dependencies:**

    ```
    npm install
    ```

3. **Configure environment variables:** Create a .env file in the root directory and add the following variables:

    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    REZOPAY_KEY=your_rezopay_key
    ```


4. **Run the application:**

    ```
    npm start
    ```

---

## Usage

After starting the application, navigate to the appropriate dashboard based on your role:

  - Admin Dashboard: http://localhost:3000/admin

  - Doctor Dashboard: http://localhost:3000/doctor

  - Patient Dashboard: http://localhost:3000/patient

---

## Contributing

We welcome contributions! To contribute:

  - Fork the repository.

  - Create a new branch for your feature or bug fix.

  - Commit your changes with clear messages.

  - Open a Pull Request for review.

---

## License
This project is licensed under the MIT License.

---

## Contact
For further inquiries or support, please reach out:

Email: support@nirog-sathi.com

GitHub: yourusername

Enjoy a seamless healthcare experience with Nirog Sathi! 🚀🛡
