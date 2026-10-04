# 🛍️ TOGYZ BRAND — Bootstrap Responsive Website (Midterm Submission)

**Developer:** Dariya Yersainova  
**Repository:** https://github.com/yersdaiya/togyz-website.git  

TOGYZ BRAND is a responsive fashion boutique website built using HTML5, Bootstrap 5.3.2, and custom CSS correction layers. This version represents the **Midterm Freeze Stage**, where the complete site structure, responsive layout, and JavaScript readiness (hooks and state classes) are frozen and fully operational.

---

## 🧭 Three User Journeys

### Journey 1: Product Browsing & Size Verification
1. **Start:** User opens the homepage (`index.html`) to learn about the store, view physical store locations, and navigates to the Catalog via the main navbar (`catalog.html`).
2. **Steps:** 
   - Browses available autumn collections ("1-ОБРАЗ", "2-ОБРАЗ", etc.) and checks specific product pricing in the product table.
   - Navigates to the Size Guide page (`size-guide.html`) to check body measurements (chest, waist, hips) and select their correct size.
3. **End:** User determines their size using the responsive chart and returns smoothly to the catalog to choose an outfit.

### Journey 2: Selecting Clothes & Placing an Order
1. **Start:** User selects outfit details (e.g., size "S (42)") on `catalog.html` and clicks "Себетке қосу" (`#add-to-cart-btn-1`).
2. **Steps:**
   - Navigates to the Cart page (`cart.html`) to review the item list, quantity, and total price (`#cart-total-price`).
   - Clicks "Тапсырысты рәсімдеу →" (`#checkout-btn`) to move to the Order page (`order.html`).
   - Fills out the checkout form (`#order-checkout-form`) with full name, phone number, region, delivery address, and payment method.
3. **End:** Clicks "Тапсырысты растау" (`#submit-order-btn`) and receives order submission feedback (`#order-success-message`).

### Journey 3: Customer Feedback & Store Discovery
1. **Start:** A returning customer or new visitor visits `reviews.html` to read store reviews or leave feedback.
2. **Steps:**
   - Reads customer reviews ("Айгерім", "Динара") in the recent reviews grid.
   - Fills out the feedback form (`#add-review-form`) with their name and comment, clicking "Пікірді жіберу" (`#submit-review-btn`).
   - Uses the footer or navbar links to check store contacts and 2GIS map links on the homepage.
3. **End:** Successfully leaves a review (`#review-success-message`) and navigates through the brand's social links without dead links.

---

## 🛠️ JavaScript Preparedness (Freeze Stage)

- **Unique IDs Assigned:** All forms (`#checkout-form`, `#order-checkout-form`, `#add-review-form`), inputs (`#fullname`, `#phone`, `#review-name`), buttons (`#submit-order-btn`, `#add-to-cart-btn-1`), and dynamic labels have lowercase, unique English IDs.
- **Empty Containers:** Form feedback containers (`#order-confirmation`, `#order-success-message`, `#review-success-message`) and cart lists (`#cart-items-container`) are pre-structured with state-toggling readiness.
- **State Classes in `css/dariya.css`:** Added utility state classes `.is-hidden`, `.is-active`, `.has-error`, `.has-success`, and `.is-selected` for future JS DOM manipulation.

---

## 🚀 Features & Components

- Responsive Bootstrap navbar with a mobile toggler menu
- Responsive product grid with aspect-ratio normalized store images (`ratio-4x3`, `object-fit: cover`)
- Product cards with size and outfit variation selections
- Interactive size guide with Bootstrap responsive tables
- Kazakhstan region-selectable checkout order form
- Customer review submission section
- Shopping cart summary
- Unified login and registration modal markup

---

## 🛠️ Technologies

- **HTML5** — Semantic page structure, forms, tables, and modal components
- **Bootstrap 5.3.2** — Responsive grid system, navbar, cards, buttons, forms, tables, badges, and alerts
- **CSS3** — Visual identity corrections, custom color palettes, and layout adjustments (`base.css`, `dariya.css`)

---

## 📂 Project Structure

```text
togyz-website/
├── css/
│   ├── base.css
│   ├── dariya.css
│   └── gaukhar.css
├── images/
│   ├── togyz.png
│   ├── togyz16.jpg
│   └── togyz(1).png ... togyz(6).png
├── index.html
├── catalog.html
├── size-guide.html
├── order.html
├── reviews.html
├── cart.html
├── quality-pass.txt
├── css-cleanup.txt
└── README.md