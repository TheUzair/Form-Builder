# **Form Builder**

## **Overview**

Form Builder is an interactive platform designed to streamline the creation, management, and assessment of various question formats such as comprehension, cloze, and categorization questions. It provides educators and learners with a flexible and user-friendly interface, offering innovative tools to enhance the learning process.

### **Key Features**
- **Dynamic Question Creation:** Effortlessly create and manage comprehension, cloze, and categorization questions.
- **Drag-and-Drop Functionality:** Simplify categorization tasks with intuitive drag-and-drop tools.
- **Real-time Previews:** Instantly preview cloze sentences and comprehension passages as you create them.
- **Bulk Save Options:** Save multiple questions at once for efficient workflow management.
- **Responsive Design:** Optimized for both desktop and mobile platforms to ensure accessibility and ease of use.
- **User Authentication (Planned):** Secure application access using JWT-based authentication.
- **Customizable Theme Support (Planned):** Switch between light and dark modes for an enhanced user experience.

---

## **Tech Stack**

### **Frontend**
- **Frameworks & Libraries:**
	- **React:** A JavaScript library for building dynamic, component-based user interfaces.  
	- **Vite:** A fast and lightweight build tool for modern web development.  
	- **Tailwind CSS:** A utility-first CSS framework for creating responsive and customizable designs.  
	- **React DnD:** Provides drag-and-drop functionality for smooth user interaction.  
	- **Axios:** A promise-based HTTP client for making API requests.  
	- **Radix UI:** Accessible and customizable UI primitives for building robust components.  
	- **ShadCN/UI:** A library for creating elegant and consistent UI components with built-in accessibility and design standards.  

### **Backend**
- **Server & Database:**
  - Node.js (Backend runtime environment)
  - Express (Web application framework)
  - MongoDB (Document-based NoSQL database)
  - Mongoose (MongoDB object modeling)
- **Security:**
  - JWT (JSON Web Tokens for secure authentication)

---

## **Live Demo**

Check out the live application here: [**Form Builder Live**](https://formbuilder-6s1k.onrender.com)

---

## **Installation**

### **Prerequisites**
Before setting up the project, ensure you have:
- Node.js (v22 or higher)
- MongoDB (Local or cloud instance, e.g., MongoDB Atlas)

---

### **Clone the Repository**
Run the following command to clone the project:
```bash
git clone https://github.com/TheUzair/form-builder.git
cd form-builder
```

---

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

### **Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/form-builder
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   node app.js
   ```
   The backend will run on `http://localhost:5000`.

---

## **Usage**
1. Open your browser and go to `http://localhost:5173` to access the frontend locally or visit the live app at [**Form Builder Live**](https://formbuilder-6s1k.onrender.com).
2. Use the interface to:
   - Create and manage questions.
   - Categorize items using drag-and-drop.
   - Save and preview questions.
3. Securely manage questions using the backend API at `http://localhost:5000`.

---

## **API Endpoints**

### **Comprehension Questions**
- **GET** `/api/comprehension`: Retrieve all comprehension questions.
- **POST** `/api/comprehension`: Create a new comprehension question.
- **POST** `/api/comprehension/bulk-save`: Save multiple comprehension questions.

### **Cloze Questions**
- **GET** `/api/cloze`: Retrieve all cloze questions.
- **POST** `/api/cloze`: Create a new cloze question.
- **POST** `/api/cloze/bulk-save`: Save multiple cloze questions.

### **Categorization Questions**
- **GET** `/api/categorize`: Retrieve all categorization questions.
- **POST** `/api/categorize`: Create a new categorization question.
- **POST** `/api/categorize/bulk-save`: Save multiple categorization questions.

---

## **Contributing**
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -m "Description of changes"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

## **License**
This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this project.

---

## **Acknowledgments**
- Special thanks to the open-source community for the resources and libraries used in this project.
- Acknowledgment to the creators of **React**, **Vite**, **Node.js**, and **MongoDB** for their robust tools and frameworks.

---

## **Future Enhancements**
- **User Authentication:** Implement secure JWT-based login and role management.
- **Theme Support:** Add toggleable light and dark themes.
- **Analytics Dashboard:** Provide insights into question performance and usage.

---