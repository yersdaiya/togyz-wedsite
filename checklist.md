# CSS Checklist — Assignment 2

* **Team:** TOGYZ BRAND
* **Students:** Дария Ерсайнова (`css/dariya.css`), Гаухар (`css/gaukhar.css`)
* **Shared Stylesheet:** `css/base.css`

---

## 1. Dariya's Checklist (`css/dariya.css` & shared pages)

| Requirement | Selector / Property / Technique | File | Line Number |
| :--- | :--- | :--- | :--- |
| **Universal selector** | `*` | `css/dariya.css` | Line 7 |
| **Type selector** | `select`, `input` | `css/dariya.css` | Line 12 |
| **Class selector** | `.product-grid` | `css/dariya.css` | Line 31 |
| **ID selector** | `#login-modal` | `css/base.css` | Line 45 |
| **Descendant selector** | `.product-card h3` | `css/dariya.css` | Line 81 |
| **Child selector** | `.product-grid > article` | `css/dariya.css` | Line 49 |
| **Adjacent sibling** | `.product-card h3 + p` | `css/dariya.css` | Line 89 |
| **Grouping with commas** | `select:focus, input:focus` | `css/dariya.css` | Line 22 |
| **Attribute selector** | `select[class="product-select"]` | `css/dariya.css` | Line 12 |
| **Pseudo-class :hover** | `.add-to-cart-btn:hover` | `css/dariya.css` | Line 106 |
| **Pseudo-class :focus** | `select:focus` | `css/dariya.css` | Line 22 |
| **Pseudo-class :nth-child** | `tr:nth-child(even)` | `css/dariya.css` | Line 110 |
| **Pseudo-element** | `::selection` / `::before` | `css/base.css` | Line 18 |
| **Flexbox (Nav row)** | `display: flex; gap; justify-content` | `css/base.css` | Line 30 |
| **Flexbox (Wrap/Direction)**| `flex-wrap: wrap; flex-direction: row` | `css/dariya.css` | Line 115 |
| **Grid Layout** | `grid-template-columns; repeat(); fr; minmax()` | `css/dariya.css` | Line 31 |
| **Grid Item Span** | `grid-column: 1 / -1` | `css/dariya.css` | Line 41 |
| **Positioning: Static** | `position: static` | `css/base.css` | Line 60 |
| **Positioning: Relative** | `position: relative` | `css/dariya.css` | Line 61 |
| **Positioning: Absolute** | `position: absolute` | `css/dariya.css` | Line 66 |
| **Positioning: Fixed** | `position: fixed` | `css/base.css` | Line 75 |
| **Centering 1 (Margin auto)**| `margin-left: auto; margin-right: auto` | `css/dariya.css` | Line 139 |
| **Centering 2 (Flexbox)** | `display: flex; justify-content: center` | `css/dariya.css` | Line 146 |
| **Centering 3 (Grid)** | `display: grid; place-items: center` | `css/dariya.css` | Line 152 |
| **Single !important** | `display: none !important;` (media print) | `css/dariya.css` | Line 159 |
| **Internal Style Block** | `<style>` (cascade demonstration) | `index.html` | Line 11 |
| **Inline Style Attribute**| `style="..."` (cascade demonstration) | `order.html` | Line 30 |
| **Specificity Experiment**| `.price-badge` (0,0,1,0) vs `span.price-badge` (0,0,1,1) | `css/dariya.css` | Line 166 |

---

## 2. Gaukhar's Checklist (`css/gaukhar.css`)

| Requirement | Selector / Property / Technique | File | Line Number |
| :--- | :--- | :--- | :--- |
| **Float element** | `float: left` | `css/gaukhar.css` | Line 40 |
| **Clear float** | `clear: both` | `css/gaukhar.css` | Line 58 |
| **Pseudo-class :first-child**| `.review-card:first-child` | `css/gaukhar.css` | Line 125 |
| **Specificity Experiment**| `.review-author` (0,0,1,0) vs `h4.review-author` (0,0,1,1) | `css/gaukhar.css` | Line 138 |