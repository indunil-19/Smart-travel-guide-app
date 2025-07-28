# 🧭 Smart Travel Guide App

##

A smart travel guide mobile application developed for **Sri Lanka**, featuring a mobile app, admin portal, and backend server.

## 🎥 Demo Video

Watch the demo of the Smart Travel Guide App:

[![Watch Demo](https://img.youtube.com/vi/YwweQU0rfBU/0.jpg)](https://youtu.be/YwweQU0rfBU)

---

## 🗂️ Project Structure

The project has **four main components**:

1. **Backend Server**


2. **Admin Portal**

For a detailed user guide on using the admin portal, please refer to this document:
[Smart Travel Guide App - User Guide admin portal](https://docs.google.com/document/d/12XdmX2QmU4vlicDRYfUY0LKmcaf4_0kSj7_PePjypLY/edit?usp=sharing)

<p float="left">
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/admin/1.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/admin/2.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/admin/3.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/admin/4.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/admin/5.png" width="200"/>
</p>


3. **Mobile Application**

For a detailed user guide on using the mobile application, please refer to this document:
[Smart Travel Guide App - User Guide mobile application](https://docs.google.com/document/d/1ZSOKFvEXmdRzjNfrPBVcs5kHOBz8zm5Vz2fZXzY70Yc/edit?usp=sharing)

<p float="left">
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/mobile/1.png" width="150"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/mobile/2.png" width="150"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/mobile/3.png" width="150"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/mobile/4.png" width="150"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/mobile/5.png" width="150"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/mobile/6.png" width="150"/>
</p>

4. **Web Application**

For a detailed user guide on using the web application, please refer to this document:
[Smart Travel Guide App - User Guide web application](https://docs.google.com/document/d/1JeFfx03i7i6kSYNR5Gl5jI5k41662VMzYCNkNfn8HVw/edit?usp=sharing)

<p float="left">
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/webapp/1.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/webapp/2.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/webapp/3.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/webapp/4.png" width="200"/>
<img src="https://github.com/indunil-19/Smart-travel-guide-app/blob/main/Screens/webapp/5.png" width="200"/>
</p>

---

## 🚀 Getting Started

### 🔁 Step 1: Clone the Repository

```bash
git clone https://github.com/indunil-19/Smart-travel-guide-app
cd Smart-travel-guide-app
```

---

## 🔧 Backend Server Setup

![Backend Server Screenshot](https://raw.githubusercontent.com/indunil-19/Smart-travel-guide-app/main/Server/ss/Capture.PNG)

### 📍 Location:

```bash
cd Server
```

### 🛠️ Installation:

```bash
npm install
```

### ▶️ Start the Server:

```bash
nodemon app     # If nodemon is installed
node app.js     # Otherwise
```

> ✅ You should see: `app is working on port 5000`

---

## 🖥️ Admin Portal and WebApplication Setup


### 📍 Location:

```bash
cd webapp
```

### 🛠️ Installation:

```bash
npm install
```

### ▶️ Run React App:

```bash
npm start
```

> 🌐 Open [http://localhost:3000/](http://localhost:3000) in your browser to access the landing page.

> 🌐 Open [http://localhost:3000/travelPlan](http://localhost:3000/travelPlan) in your browser to access the travel plan web app.

> 🌐 Open [http://localhost:3000/admin/signin](http://localhost:3000/admin/signin) in your browser to access the admin portal.

---

## 📱 Mobile App Setup

### 📍 Location:

```bash
cd Smart-travel-guide-app/smart_travel_guide
```

### 🛠️ Installation:

```bash
expo install
# or
npm install
```

---

## 🌐 Backend Integration (Using Ngrok)

You need **ngrok** to expose your local backend server to the internet:

### 🔌 Install ngrok:

```bash
npm install -g ngrok
```

### 🌍 Start ngrok:

```bash
ngrok http 5000
```

> 📸 Example output:\\

### 🛠️ Configure API Endpoint

Copy the **ngrok HTTPS forwarding URL** and update the following file:

```bash
Smart-travel-guide-app/smart_travel_guide/src/config/config.js
```

Replace the `localhost` URL at **line 2** with your ngrok URL.

---

## ▶️ Run the Mobile App

Start the Expo development server:

```bash
expo start
```

> 📱 You can now preview the mobile app on your Android/iOS device using Expo Go or an emulator.

---

## 📘 Resources

* [📱 Expo Documentation](https://docs.expo.dev/get-started/create-a-new-app/)
* [🌐 Ngrok on NPM](https://www.npmjs.com/package/ngrok)

---