# TOGYZ BRAND — Web Technologies 1 (Assignments 4–5)

**Project:** TOGYZ BRAND Fashion Boutique Website  
**Course:** Web Technologies 1 (Front End)  
**Developer:** Dariya Yersainova  
**Repository:** https://github.com/yersdaiya/togyz-wedsite

## 1. Project Overview

TOGYZ BRAND is a responsive fashion boutique website developed using HTML5, CSS3, Bootstrap 5.3.2, and JavaScript.

The project continues the website developed during Assignments 1–3 and the Midterm Project. Assignments 4–5 focus on implementing interactive features, JavaScript logic, DOM manipulation, event handling, form validation, and client-side data management.

The main goal is to allow visitors to browse clothing collections, select individual products, manage a shopping cart, explore size recommendations, submit demonstration orders, and leave reviews.

## 2. Technologies Used

- **HTML5:** Semantic page structure and forms.
- **CSS3:** Responsive styling and visual design.
- **Bootstrap 5.3.2:** Navigation, cards, grids, buttons, and modal components.
- **JavaScript:** Functions, arrays, objects, conditions, loops, DOM manipulation, and events.
- **localStorage:** Browser-based storage for demonstration data.
- **Git and GitHub:** Version control and project management.
- **Visual Studio Code:** Development environment.

## 3. Website Pages

| Page | Description |
|---|---|
| `index.html` | Homepage, brand information, and store gallery |
| `catalog.html` | Clothing collections, individual items, and product filtering |
| `size-guide.html` | Size chart and clothing size recommendations |
| `cart.html` | Shopping cart, quantity management, and price calculation |
| `order.html` | Order form, validation, summary, and demonstration confirmation |
| `reviews.html` | Customer reviews and feedback form |

## 4. JavaScript Functionality

### 4.1 Language Switching

Visitors can select Kazakh, Russian, or English.

The website stores the selected language in localStorage and applies translations to supported interface elements.

The translation system uses JavaScript objects and DOM manipulation.

### 4.2 Product Catalog

The catalog is organized into six complete outfits containing twelve individual clothing items.

Each outfit has a main photo and contains individual products with their own names, prices, images, and available sizes.

The planned catalog interactions include product search, category filtering, price filtering, size selection, sorting, and adding products to the shopping cart.

Outfit 5 contains two separately priced clothing items, each costing 13,495 KZT. The combined price is 26,990 KZT.

### 4.3 Shopping Cart

The cart functionality is designed to support:

- Adding selected products with their sizes.
- Increasing or decreasing quantities.
- Removing individual products.
- Clearing the shopping cart.
- Calculating item subtotals and total price.
- Displaying the total number of selected items.
- Continuing to the checkout page.

Shopping cart data is stored locally in the browser.

### 4.4 Demonstration User Profile

The website includes a browser-based demonstration profile system.

The intended workflow includes registration form validation, selecting an existing demo profile, displaying profile information, editing profile details, and logging out.

Shopping carts and demonstration order histories can be associated with individual browser-based profiles.

**This is not a real authentication system.** Passwords must not be saved in localStorage. No server-side account is created.

### 4.5 Order Form

The checkout form collects the customer's name, phone number, delivery region, delivery address, and payment method.

JavaScript validates user input and displays relevant feedback.

The order page displays a summary of selected products and the calculated total.

Successful submission produces a demonstration confirmation only. No actual payment, booking, or order is processed.

### 4.6 Customer Reviews

The reviews page provides a form for entering a customer name and review text.

The JavaScript functionality includes field validation, a character counter, review rendering, and feedback messages.

### 4.7 Size Guide

The size guide contains a measurement table with chest, waist, and hip measurements.

Visitors can enter measurements to obtain a suggested clothing size.

### 4.8 Interactive Effects

The website uses JavaScript events and visual state changes to improve interaction, including scroll-based animations and feedback messages.

## 5. Functionality Plan

| Page | Visitor Goal | Planned Function | Expected Result | Responsible Student |
|---|---|---|---|---|
| All pages | Change website language | Language selection and translation | Selected language is applied and remembered | To be assigned |
| All pages | Use a demo profile | Registration, profile, editing, logout | Profile information can be viewed and updated | To be assigned |
| Catalog | Find suitable clothes | Search and combined filters | Matching products appear | To be assigned |
| Catalog | Select clothing items | Size selection and Add to Cart | Selected item is added to the cart | To be assigned |
| Cart | Manage selected products | Quantity update, removal, total calculation | Cart contents and totals are updated | To be assigned |
| Order | Complete checkout | Field validation and demonstration confirmation | Valid form shows a summary and demo reference | To be assigned |
| Reviews | Submit feedback | Review form and validation | Review is displayed after valid submission | To be assigned |
| Size Guide | Find suitable size | Measurement comparison | Suggested size appears | To be assigned |

## 6. JavaScript File Structure

```text
js/
├── data.js
├── main.js
├── auth.js
├── catalog.js
├── cart.js
├── order.js
├── reviews.js
├── size-guide.js
└── home.js
```

**File responsibilities:**

- `data.js` — Product data and translation dictionaries.
- `main.js` — Shared functions, language switching, cart utilities, and events.
- `auth.js` — Demonstration registration, login interface, and profile.
- `catalog.js` — Outfit rendering, product selection, and filtering.
- `cart.js` — Cart display, quantity controls, removal, and totals.
- `order.js` — Checkout validation, summaries, and demonstration orders.
- `reviews.js` — Review form, validation, and rendering.
- `size-guide.js` — Size recommendation functionality.
- `home.js` — Homepage interactions.

## 7. JavaScript Concepts Applied

The project demonstrates:

- Variables and constants (`const`, `let`).
- Arrays and objects.
- Conditional statements.
- Comparison and logical operators.
- Loops and array methods such as `forEach()`, `find()`, `filter()`, and `reduce()`.
- Reusable functions with parameters.
- Arithmetic calculations.
- DOM element creation and modification.
- `addEventListener()` for click, change, input, and submit events.
- Form validation.
- Browser localStorage.
- Dynamic content rendering.

## 8. Main User Journeys

**Journey 1 — Product Discovery**

Homepage → Catalog → Outfit → Individual Product → Size Selection.

The visitor explores an outfit, checks the individual clothing pieces, and selects an appropriate size.

**Journey 2 — Shopping and Checkout**

Catalog → Add to Cart → Cart → Checkout → Demonstration Confirmation.

The visitor chooses products, updates quantities, reviews the total, completes a form, and receives a demonstration confirmation.

**Journey 3 — Customer Profile**

Registration → Demo Profile → View Information → Edit Profile → Logout.

The visitor interacts with a browser-based demonstration profile.

**Journey 4 — Customer Feedback**

Reviews → Enter Name and Review → Validation → Demonstration Submission.

The visitor enters feedback and receives a confirmation message.

## 9. How to Run the Project

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if necessary.
4. Open `index.html` with Live Server.
5. Navigate between pages using the navbar.
6. Open browser Developer Tools to inspect the JavaScript console.

## 10. Testing Checklist

The following checks should be completed before submission:

- [ ] All pages load without console errors.
- [ ] KZ/RU/EN translations are consistent across pages.
- [ ] Catalog search and filters show correct results.
- [ ] All six outfits and twelve individual items appear.
- [ ] Add to Cart updates the correct shopping cart.
- [ ] Quantity changes update the total.
- [ ] Empty-cart and no-results states work.
- [ ] Registration and profile buttons behave correctly.
- [ ] Checkout validates all required fields.
- [ ] Successful checkout displays a demo confirmation.
- [ ] Review submission validates input.
- [ ] Size recommendations work.
- [ ] Mobile, tablet, and desktop layouts work correctly.

## 11. Limitations

This project is a front-end demonstration.

It does not provide real authentication, secure server-side storage, online payment processing, or actual order fulfillment.

Browser data can be changed or removed by users. Sensitive credentials should never be saved in browser storage.

## 12. AI Assistance

ChatGPT was used during development for explaining JavaScript concepts, discussing debugging problems, reviewing implementation approaches, and generating draft code suggestions. The use of AI is documented in `ai-log.txt`.

All suggested implementations must be reviewed, understood, tested, and verified before final submission.

## 13. Submission Information

The repository should include the final source files, README, Functionality Plan, JavaScript checklist, screenshots or other evidence, AI log, and the required Git tags:

- `assignment-4`
- `assignment-5`

The existing Midterm tag must remain unchanged.

**Project status:** Local JavaScript development and integration testing in progress. Final working functionality and submission evidence require verification.