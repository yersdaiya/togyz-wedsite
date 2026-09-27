# 🛍️ TOGYZ BRAND — Bootstrap Responsive Website

TOGYZ BRAND is a responsive fashion boutique website created with HTML5, Bootstrap 5.3.8, and a small amount of custom CSS.

This version of the project was updated for Assignment 3 to use Bootstrap for the main layout, responsive grid, navigation, forms, buttons, tables, cards, and utility classes.

---

## 🚀 Features

- Responsive Bootstrap navigation bar with a collapsible mobile menu
- Responsive product catalog
- Product cards with size and color selection
- Size guide with a responsive Bootstrap table
- Order form with Kazakhstan regions and cities
- Customer reviews page
- Shopping cart and order summary
- Responsive layouts for phone, tablet, and desktop
- Login and registration forms
- Bootstrap cards, badges, alerts, tables, buttons, and forms

---

## 🛠️ Technologies

- **HTML5** — semantic page structure, forms, tables, and content
- **Bootstrap 5.3.8** — responsive grid, navbar, cards, buttons, forms, tables, utilities, badges, and alerts
- **CSS3** — brand colors, fonts, image corrections, and small visual adjustments

Bootstrap is responsible for the main layout and responsive behavior, while custom CSS is used only as a correction layer for the TOGYZ BRAND visual identity.

---

## 📱 Responsive Design

The website is designed for different screen sizes using Bootstrap breakpoints.

Examples of responsive classes used in the project:

- `col-12`
- `col-md-6`
- `col-lg-4`
- `navbar-expand-lg`
- `table-responsive`
- `text-center`
- `text-md-start`
- `d-flex`
- `d-grid`
- `flex-wrap`

The navigation bar automatically collapses into a mobile toggler on smaller screens.

---

## 🧩 Bootstrap Components

The project uses several Bootstrap components:

- Navbar
- Cards
- Buttons
- Forms
- Responsive tables
- Badges
- Alerts

Bootstrap utility classes are also used for spacing, borders, shadows, alignment, display, and flex behavior.

---

## 🎨 Custom CSS

Custom CSS was reduced during the migration to Bootstrap.

### `base.css`

Contains:

- TOGYZ BRAND colors
- Typography
- Navbar color corrections
- Button color corrections
- Basic brand-specific styling

### `gaukhar.css`

Contains small corrections for:

- Store images
- Form focus states
- Contact elements

### `dariya.css`

Contains small corrections for:

- Product images
- Product card hover effects
- Price colors
- Form focus states

Old custom layout rules were removed and replaced with Bootstrap classes where possible.

See `css-cleanup.txt` for a list of removed CSS rules and their Bootstrap replacements.

---

## 📂 Project Structure

```text
togyz-website/
├── css/
│   ├── base.css
│   ├── dariya.css
│   └── gaukhar.css
│
├── images/
│
├── index.html
├── catalog.html
├── size-guide.html
├── order.html
├── reviews.html
├── cart.html
├── css-cleanup.txt
└── README.md