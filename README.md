# 🛒 E-Commerce Appliances Store

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react) ![Django](https://img.shields.io/badge/Django-4.2-green?logo=django) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)


## **Project Overview**

This is a full-stack **e-commerce web application for appliances**, allowing users to:

* Browse, search, and filter home and kitchen appliances
* Add products to the cart with real-time updates
* See promotional banners with **5–10% OFF discounts**
* Experience a **responsive, modern UI**

---

## **Technologies Used**

* **Frontend:** React.js, HTML, CSS
* **Backend:** Django REST Framework
* **Database:** SQLite/MySQL
* **APIs:** RESTful APIs for products and cart

---

## **Setup Instructions**

### **Backend Setup (Django)**

```bash
git clone <your-repo-url>
cd <your-project-folder>
python -m venv env      # Create virtual environment
# Activate environment
# Windows:
env\Scripts\activate
# Linux/Mac:
source env/bin/activate
pip install -r requirements.txt   # Install dependencies
python manage.py migrate           # Run migrations
python manage.py runserver         # Start backend server
```

Backend runs at: `http://127.0.0.1:8000/`

---

### **Frontend Setup (React)**

```bash
cd frontend
npm install        # Install dependencies
npm start          # Start frontend server
```

Frontend runs at: `http://localhost:3000/`

---

## **Project Structure**

```
/frontend
  ├── src
      ├── components
      ├── pages
      ├── api
      └── Home.css
/backend
  ├── manage.py
  ├── app
      ├── models.py
      ├── views.py
      └── urls.py
      |_requirements.txt 
```

---

## **Features**

* 🏷 Browse products by **category** and **price range**
* 🔍 Dynamic **search functionality**
* 🛒 **Add-to-cart** with real-time updates
* 🎯 **Promotional banners** with discount badges
* 📱 Fully **responsive layout** for mobile and desktop
* ✨ Smooth **hover effects** on buttons and cards

---

## **Screenshots**

### **1. Homepage**

![Homepage Screenshot](screenshots/homepage.png)
![Homepage2 Screenshot](screenshots/homepage2.png)
![Homepage3 Screenshot](screenshots/homepage3.png)

## **Authentication**
![Authentication Screenshot](screenshots/login.png)
![Authentication Screenshot](screenshots/register.png)

### **2. Product Listing**

![Product Listing Screenshot](screenshots/products.png)

### **3. Cart Page**

![Cart Screenshot](screenshots/cart.png)

### **4. checkout Page**

![checkout Screenshot](screenshots/checkout.png)

### **5. creditcard  Page**

![credit Card Screenshot](screenshots/card.png)

### **5. paymentsuccess Page**

![paymentsuccess Screenshot](screenshots/paymentsuccess.png)

### **5. order Page**

![order page Screenshot](screenshots/order.png)


### **5. invoice Page**

![invoice page Screenshot](screenshots/invoice.png)

## **Usage**

1. Open frontend: `http://localhost:3000/`
2. Browse products or use **search/filter options**
3. Click “Shop Now” or “Explore Deals” banners
4. Add products to cart and view items

