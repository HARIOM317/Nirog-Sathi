# Nirog Sathi - Comprehensive Healthcare Management Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com/HARIOM317/Nirog-Sathi) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE) 
[![Repo Size](https://img.shields.io/badge/repo%20size-25MB-blue.svg?style=for-the-badge)](https://github.com/HARIOM317/Nirog-Sathi) 
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=for-the-badge)](https://github.com/HARIOM317/Nirog-Sathi)


Nirog Sathi is a full-stack MERN application designed to streamline the process of scheduling and managing appointments for doctors, patients, and administrators. With a premium, modern look powered by Ant Design components, this platform provides an intuitive, role-based interface that enhances the user experience for all stakeholders. 🚀🛡

---

## Table of Contents
- [🧑🏼‍💻 Overview](#-overview)
- [✨ Features](#-features)
- [📸 Project Screenshots](#-project-screenshots)
- [🛠 Tech Stack](#-tech-stack)
- [⚙ Installation & Setup](#-installation--setup)
- [🚀 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📩 Contact](#-contact)

---

## 🧑🏼‍💻 Overview
Nirog Sathi is a comprehensive healthcare management system that caters to the needs of doctors, patients, and administrators by providing:
- A user-friendly, role-based interface.
- Advanced scheduling capabilities, including auto-generation of 15-minute time slots for doctors.
- Robust features like digital prescriptions, invoices, and Rezopay payment gateway integration.
- Tools for detailed data analysis and insights via advanced graphs and charts.

---

## ✨ Features
- **Admin Dashboard**
  - Manage user roles and permissions.
  - Oversee overall system operations.

- **Doctor Dashboard**
  - View and manage their schedule.
  - Handle appointments efficiently with auto-generated 15-minute time slots.
  - Interact directly with patients.

- **Patient Dashboard**
  - Book appointments easily.
  - Review appointment history.
  - Communicate with doctors.

- **Digital Prescription & Invoice**
  - Seamless generation of digital prescriptions and invoices.

- **Payment Integration**
  - Integrated Rezopay payment gateway for secure transactions.
 
- **Advanced Search & Filter**
  - Find doctors by expertise, experience, and more.

- **Additional Functionalities**
  - Favorite doctors list.
  - Option for patients to share past medical history with new doctors.
  - Blog publishing feature for doctors.
  - Simplified registration request for new doctors.
  - Comprehensive insights with advanced graphs and charts.
  - Automated email notifications for appointment bookings and status updates.
  - Detailed doctor profiles with reviews.

---

## 📸 Project Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/a7d0c3ec-2815-4e64-bfb6-267cf77b6c63" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/85dda2a7-1d2e-4aa6-8276-1954bd1eddd4" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/f7df732c-67c9-49b5-8223-369d8888ff29" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/b7c648a2-a291-42b0-a56a-e5d55c7ebe15" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/fc3caa43-ed0c-40ea-909b-3c22b8e4026e" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/495e9bbb-239b-4477-907b-574604fcb6e9" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/51894e37-aa27-48e9-b98d-3454691b8c66" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/f4cef9ea-9a6f-4a04-9a6c-83ed5b37dc5c" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/2c3d6a8e-a45d-4cb6-b083-d31278d92b56" alt="doctor appointment nirog sathi" width="400" />
  <img src="https://github.com/user-attachments/assets/1e11a0a0-b116-4ff1-a9a9-9ee817460604" alt="doctor appointment nirog sathi" width="400" />
</div>

---

## 🛠 Tech Stack
- **Frontend:** React, Ant Design 🎨
- **Backend:** Node.js, Express.js 🛠
- **Database:** MongoDB 🗄
- **Payment Integration:** Rezopay 💳
- **Authentication:** JWT and role-based access control 🔐

---

## ⚙ Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB**
- **npm** or **yarn**

### Steps
1. **Clone the repository:**

   ```bash
   git clone https://github.com/HARIOM317/Nirog-Sathi.git
   cd Nirog-Sathi
   ```

   
2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:** Create a .env file in the root directory and add the following variables:
    ```env
    # MongoDB Connection
    DATABASE_URL=<your_mongodb_connection_string>
    
    # JSON Web Token (JWT) configuration
    JWT=<your_jwt_token>
    JWT_SCRET=<your_jwt_secret>
    JWT_EXPIRED_IN=<jwt_expiration_time>         # e.g., 30d
    JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
    JWT_SCRET_SALT_ROUND=<salt_round_number>       # e.g., 10
    
    # Server configuration
    PORT=<your_app_port>                           # e.g., 5000
    NODE_ENV=<your_environment>                    # e.g., production or development
    
    # Default passwords for roles (ensure to change for production)
    DOCTOR_PASS=<default_doctor_password>
    PATIENT_PASS=<default_patient_password>
    
    # Cloudinary configuration
    CLOUND_NAME=<your_cloudinary_cloud_name>
    API_KEY=<your_cloudinary_api_key>
    API_SECRET=<your_cloudinary_api_secret>
    
    # Email configuration
    EMAIL_PASS=<your_cloudnarry_email_password>
    ADMIN_EMAIL=<your_cloudnary_email_address>
    GMAIL_APP_EMAIL=<gmail_app_email_address>
    
    # Client URLs
    CLIENT_URL=<your_client_url>                   # e.g., http://localhost:3000/
    CLIENT__LOCAL_URL=<your_client_local_url>        # e.g., http://localhost:3000/
    
    # Razorpay configuration
    RAZORPAY_API_KEY=<your_razorpay_api_key>
    RAZORPAY_APT_SECRET=<your_razorpay_api_secret>
    ```


4. **Run the application:**

    ```bash
    npm start
    ```

---

## 🚀 Usage

After starting the application, navigate to the appropriate dashboard based on your role:

  - Admin Dashboard: http://localhost:3000/admin

  - Doctor Dashboard: http://localhost:3000/doctor

  - Patient Dashboard: http://localhost:3000/patient

---

## 🤝 Contributing

We ❤️ contributions! Follow these steps:

1. **Fork the Repository**
2. **Clone Your Fork**
    ```bash
    git clone https://github.com/HARIOM317/Nirog-Sathi.git
    cd Nirog-Sathi
    ```
3. **Create a New Branch**
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. **Make Your Changes & Commit**
    ```bash
    git add .
    git commit -m "✨ Add [feature/fix]: description"
    ```
5. **Push to Your Fork & Create a PR**
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Submit a Pull Request** on GitHub 🚀

---

## 📜 License

**Nirog Sathi** is licensed under the **MIT License**. You can view the Full License (here)(LICENSE).

---

## 📩 Contact

For further information, feedback, or support, please reach out:

📧 Email: [support@nirog-sathi.com](mailto:support@nirog-sathi.com)

🌐 Website: [www.nirogsathi.com](https://www.nirogsathi.com)

Or you can reach out to me at:
  - Project Maintainer: Hariom Singh Rajput
  - GitHub: [@HARIOM317](https://github.com/HARIOM317)
  - LinkedIn: [@in/hariom-singh-mewada](https://www.linkedin.com/in/hariom-singh-mewada/)


🚀 **Nirog Sathi – Enjoy a seamless healthcare experience with Nirog Sathi! 🚀🛡.**
