# 🛍️ TOGYZ BRAND — Fashion Boutique Web Application

<p align="center">
  <b>Web Technologies 1 (Endterm) Project</b><br>
  Modern and stylish women's fashion boutique e-commerce web application developed for Kazakhstan.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white" alt="jQuery">
</p>

---

## 👥 Developers
* **Dariya Yersainova**
* **Gaukhar Amanbay**

---

## 🚀 Project Overview
**TOGYZ BRAND** is a fully responsive e-commerce front-end web application built for Assignments 4–5. It features a rich user interface, interactive shopping cart management, multilingual support (KZ / RU / EN), dark/light mode toggling, and real-time form validations.

🌐 **Live Demo / Repository:** [GitHub Repository](https://github.com/yersdaiya/togyz-wedsite)[cite: 23]

---

## ✨ Key Features & Functionality

* 🌓 **Dark / Light Theme Switcher:** Persistent theme preference saved in `localStorage` (`togyz_theme`).
* 🌍 **Multilingual Support:** Dynamic language translation (Kazakh 🇰🇿, Russian 🇷🇺, English 🇬🇧) across all pages.
* 🛒 **Interactive Shopping Cart:** 
  * Add products with custom sizes (S, M, L, XL) and colors.
  * Real-time quantity adjustment (+ / -) and item removal.
  * Persistent cart state using `localStorage` (`userCart`).
* 📐 **Interactive Size Guide:** Helps users find their perfect fit based on bust, waist, and hip measurements[cite: 23].
* 📦 **Checkout & Validation:** Real-time form validation for user details, regional addresses (with map links), and phone number formatting[cite: 23].
* ⭐ **Customer Reviews:** Interactive review section with star ratings and photo upload capabilities.

---

## 🗂️ Project Pages & Structure

| Page | Description |
| :--- | :--- |
| **`index.html`** | Homepage with brand storytelling, boutique galleries, philosophy, and branches[cite: 23]. |
| **`catalog.html`** | Interactive clothing collection with category filtering, search, and size selection[cite: 23]. |
| **`size-guide.html`** | Interactive size chart and measurement instructions[cite: 23]. |
| **`cart.html`** | Dynamic shopping cart with subtotal calculation and summary[cite: 23]. |
| **`order.html`** | Checkout form with region selection, address suggestions, and order confirmation[cite: 23]. |
| **`reviews.html`** | Customer reviews page with dynamic submission, star ratings, and photo uploads[cite: 23]. |

---

## 📁 Directory Structure

```text
togyz-website/
│
├── css/
│   ├── base.css
│   ├── dariya.css
│   └── gaukhar.css
│
├── js/
│   ├── data.js
│   ├── main.js
│   ├── cart.js
│   ├── order.js
│   └── reviews.js
│
├── images/
│   └── (Product & look images)
│
├── index.html
├── catalog.html
├── size-guide.html
├── cart.html
├── order.html
├── reviews.html
└── README.md