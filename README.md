# Society-Management-System

A full stack project on Society management system.

![Demo App](./dashboard.png)

## Live url

**Frontend Url**
```
https://society-management-system-zeta.vercel.app
```

**Backend Url**
```
https://society-management-system-y5jd.onrender.com
```
# Society Management System

This project is designed to manage a society's operations, offering different panels for **Admin**, **Resident**, and **Security**. The system provides functionality for managing residents, security, maintenance, expenses, and announcements, among other things.

## Table of Contents

1. [Admin Panel Features](#admin-panel-features)
2. [Resident Panel Features](#resident-panel-features)
3. [Security Panel Features](#security-panel-features)
4. [Common Features](#common-features)
5. [Technologies Used](#technologies-used)
6. [Getting Started](#getting-started)

---

## Admin Panel Features

The **Admin** is the primary user who can perform several management tasks. Below are the features available to the admin:

### 1. **User Management**

- **Sign Up**: Only the admin can create a new account.
- **Login**: Admin can log in to the system.
- **Logout**: Admin can log out of the system.
- **Forgot Password**: Admin can reset the password if forgotten.
- **Reset Password**: Admin can change their password at any time.
- **Edit Profile**: Admin can update their personal details.

### 2. **Resident Management**

- **Add Resident**: Admin can add new residents (owners and tenants).
- **Update Resident**: Admin can update existing resident details.
- **Delete Resident**: Admin can delete resident records.
- **View Resident Data**: Admin can view the resident information at any time.

### 3. **Financial Management**

- **Maintenance Management**: Admin can create, update, delete, and view maintenance records.
- **Income Management**: Admin can manage and track other sources of income.
- **Expense Management**: Admin can manage and track expenses.
- **View Total Balance**: Admin can view the total balance, income, and expenses.

### 4. **Operations & Facility Management**

- **Facility Management**: Admin can manage the available facilities in the society.
- **Complaint Tracking**: Admin can track and manage complaints submitted by residents.
- **Request Tracking**: Admin can manage and track requests made by residents.
- **Security Management**:
  - **Visitor Log**: Admin can view the logs of visitors.
  - **Security Protocol**: Admin can set and manage security protocols.
  - **Security Guard Functionality**: Admin can manage security guard schedules and tasks.

### 5. **Announcement Management**

- **Create Announcements**: Admin can create two types of announcements:
  - **Event Announcement**: Inform residents about upcoming events.
  - **Activity Announcement**: Share information on activities happening in the society.
- **Important Number Management**: Admin can add, update, and manage important contact numbers.
- **View Pending Maintenance**: Admin can view any pending maintenance work.

### 6. **Notifications**

Admin will receive notifications for the following activities:

- Maintenance updates
- Other income and expense updates
- Announcements
- Resident cash approval requests (with the option to accept or reject)

---

## Resident Panel Features

### 1. **Account Management**

- **Forgot Password**: Residents can reset their password if they forget it.
- **Reset Password**: Residents can change their password anytime by resetting it.
- **View Personal Details**: Residents can view their personal information, such as name, address, and contact details.

### 2. **Maintenance & Payments**

- **View Pending Maintenance**: Residents can view any pending maintenance activities.
- **Pay Maintenance Fees**: Residents can pay the dues for pending maintenance services.
- **Pay for Events**: Residents can participate in events and pay per person as required.

### 3. **Event & Activity Management**

- **View Event & Activity Announcements**: Residents can see announcements related to events and activities.
- **Participate in Events & Activities**: Residents can participate for events and activities.
- **View Event & Activity Participant List**: Residents can see who else is participating in the events and activities.

### 4. **Complaint & Request Management**

- **Create Complaints**: Residents can submit complaints about issues in the society.
- **Create Requests**: Residents can submit requests for services or other needs.

### 5. **Community Engagement**

- **Connect with the Society Community**: Residents can interact with other residents in the society.
- **1-to-1 Chat**: Residents can message each other directly for personal or society-related conversations.
- **Ask Questions & Give Answers**: Residents can ask questions to the community and provide answers to others' queries.
- **Create Polls**: Residents can create polls to gather opinions or vote in other people's polls.

### 6. **Payments**

- **Payment Portal**: Residents can make payments through the dedicated online payment portal.
- **Payment Methods**: Payments can be made online, or through cash (with admin approval required for cash payments).

### 7. **Security**

- **Security Alerts**: Residents receive notifications about security alerts.
- **View Security Protocols**: Residents can view and follow security protocols set by the society.

### 8. **Notifications**

Residents will receive notifications for:

- New facilities available for booking
- Maintenance updates
- Event and activity announcements
- Security alerts

## Security Panel Features

## Security Features

The **Security Panel** offers the following features:

### 1. **Visitor Management**

- **Add Visitor Details**: Security can add details of visitors entering the society.
- **View Visitor Records**: Security can view the list of all visitors and their details for tracking purposes.

### 2. **Security Alerts**

- **Send Security Alerts**: Security can send immediate alerts to both admins and residents in case of security issues or emergencies.
- **Alert Notifications**: Security alerts are sent to ensure fast action and awareness.

### 4. **Login to the Security Panel**

- First, security need to log in to the system using their credentials.

**Managing Visitor Details**

- **Add Visitor Information**:  
  When a visitor enters the society, security can add the visitor's name, contact details, purpose of visit, and time of entry.
- **View Visitor History**:  
  Security can look at the visitor log and review previous entries for tracking and safety.

- **Sending Security Alerts**

- **Send Alerts to Admins & Residents**:  
  In case of any suspicious activity or emergency, security can quickly send alerts to both admins and residents.  
  Alerts include information about the security issue and may contain safety instructions.

- **Receive and Follow Security Protocols**

- Security can view and follow the security protocols set by the admin to ensure a safe environment within the society.

---

## Getting Started

## Git Clone URL

To get started, clone the repository to your local machine using the following command:

```
https://github.com/srlokesh146/Society-Management-System.git
```

--

## Install Commands

cd Frontend

- npm install

cd Backend

- npm install

--

## Folder structure

Client side - ./Frontend

Server side - ./Backend

--

## Project run commands

Frontend - npm run dev

Backend - npm run dev

--

## Live url

**Frontend Url**

 ```
 https://society-management-system-zeta.vercel.app
 ```

**Backend Url**

```
https://society-management-system-y5jd.onrender.com
```

# Society Management System - Technologies Used

This project utilizes a set of modern technologies for both the frontend and backend to ensure a seamless and efficient experience for users. Below is a list of the key technologies used in the development of this system.

---

## Frontend Technologies

The **frontend** of the Society Management System is designed to provide an interactive and responsive user interface. The following technologies are used:

### 1. **React**

- React is used to build the user interface of the application. It helps in creating a dynamic, fast, and responsive web application.

### 2. **Vite**

- Vite is a modern build tool that provides faster development and build processes. It helps in faster loading times for the application.

### 3. **Tailwind CSS**

- Tailwind CSS is used for styling the application. It allows us to build custom, responsive designs quickly by using utility classes.

### 4. **React Router DOM**

- React Router DOM is used for navigation between different pages and components in the application. It helps in creating a single-page application (SPA) with smooth transitions between views.

### 5. **Axios**

- Axios is a promise-based HTTP client used to make requests to the backend. It allows the frontend to communicate with the backend for fetching data and submitting forms.

### 6. **Socket.IO Client**

- Socket.IO Client is used to establish a real-time, bi-directional communication between the client (frontend) and server (backend). It enables live notifications, messaging, and event updates.

---

## Backend Technologies

The **backend** of the Society Management System is responsible for handling business logic, user authentication, data management, and communication with the database. Below are the technologies used:

### 1. **Node.js**

- Node.js is used as the runtime environment for running JavaScript code on the server. It allows us to handle backend operations and create APIs efficiently.

### 2. **Express**

- Express is a web application framework for Node.js. It simplifies the creation of routes, middleware, and API endpoints for the application.

### 3. **JWT (JSON Web Token)**

- JWT is used for secure authentication and authorization. It allows users to log in and access protected resources in the application.

### 4. **Bcrypt**

- Bcrypt is used for hashing passwords. It helps in securely storing user passwords in the database by encrypting them.

### 5. **Cloudinary**

- Cloudinary is used for managing and uploading images and other media files. It helps store images like profile pictures and document uploads in the cloud.

### 6. **Nodemailer**

- Nodemailer is used for sending emails. It is useful for sending password reset emails, notifications, and other messages to users.

---

## Database

The **database** stores all the data for the Society Management System. The following database technology is used:

### 1. **MongoDB**

- MongoDB is a NoSQL database used to store data in a flexible, scalable format. It is ideal for handling large amounts of data and provides fast data access with its document-based structure.

---

## Other Tools and Libraries

In addition to the core technologies, several other tools and libraries are used to enhance the functionality of the application:

- **CORS**: Used for handling cross-origin requests.
- **dotenv**: Used to manage environment variables in a secure way.
- **Mongoose**: A library used to interact with MongoDB in an easier and more structured way.
- **Moment.js**: Used for handling and formatting dates and times.

# Sample Data for Society Management System

This document provides the sample login data for different roles in the **Society Management System**. You can use these credentials to test the functionalities of the system.

## Sample User Data

### Admin User


- **Email**: 
```
admin@gmail.com
```

- **Password**: 
```
admin@123
```

### Resident User

- **Email**: 
```
lokeshinde500@gmail.com
```

- **Password**: 
```
123456
```

### Security User

- **Email**: 
```
lokesh.shinde@swiftrut.com
```

- **Password**: 
```
123456
```

---

### Frontend env credentials

VITE_BACKEND_URL =
 ```
 https://society-management-system-y5jd.onrender.com/api
 ```

VITE_SOCKET_URL = 
```
https://society-management-system-y5jd.onrender.com/
```

### Backend env credentials

PORT=3000
DATABASE_URL = YOUR_DATABASE_URL
NODE_ENV = development
JWT_SECRET = YOUR_JWT_SECRET
TWILIO_ACCOUNT_SID = YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN = YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER = YOUR_TWILIO_PHONE_NUMBER
cloud_name = YOUR_CLOUD_NAME
api_key = YOUR_API_KEY
api_secret = YOUR_API_SECRET
key_id=YOUR_RAZORPAY_KEY_ID
key_secret = YOUR_RAZORPAY_KEY_SECRET

### THANK YOU !
http://localhost:5173/admin/add-new-admin-secret-access