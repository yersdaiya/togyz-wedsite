TOGYZ BRAND — Web Technologies 1 (Endterm) Project: TOGYZ BRAND Fashion Boutique WebsiteCourse: Web Technologies 1 (Front End)Developer: Dariya Yersainova ; Gaukhar Amanbay
 Repository: https://github.com/yersdaiya/togyz-wedsite1. Project OverviewTOGYZ BRAND is a fully responsive fashion boutique website developed using HTML5, CSS3, Bootstrap 5.3.2, and JavaScript (jQuery).The project represents the complete front-end web application for Assignments 4–5, focusing on interactive features, client-side data management (localStorage), DOM manipulation, dynamic rendering, and responsive dark/light mode toggling.2. Technologies UsedHTML5: Semantic page structure, accessibility, and modern forms.CSS3: Responsive styling, CSS variables for dark/light themes, custom animations.Bootstrap 5.3.2: Responsive layouts, navigation, cards, modals, and grid system.JavaScript & jQuery: Interactive functionality, event handling, DOM manipulation, dynamic HTML generation.localStorage API: Client-side persistent storage for cart state and theme preferences.Git and GitHub: Version control, branching, and assignment tagging.3. Website PagesPageDescriptionindex.htmlHomepage, brand storytelling, features, and dynamic dark/light mode togglecatalog.htmlInteractive clothing collection with size selection and Add to Cart logicsize-guide.htmlInteractive size chart and size recommendation calculatorcart.htmlDynamic shopping cart with quantity adjustment, item removal, and subtotal calculationorder.htmlCheckout form with real-time field validation and demo confirmationreviews.htmlCustomer reviews page with dynamic submission and validation4. Implemented Functionality & Features4.1 Dark / Light Mode Theme SwitchingUser preference can be toggled across the site.Current active theme is saved in localStorage (togyz_theme), ensuring persistence across page reloads.4.2 Shopping Cart Logic (cart.js)Add to Cart: Users can select clothing items along with preferred sizes.Persistence: Cart contents are saved in localStorage under togyz_cart.Cart Management: Incremental/decremental quantity controls, individual item removal, and full cart clearing.Dynamic Calculation: Total price and badge counters update automatically upon changes.4.3 Interactive Size Guide (size-guide.js)Accepts chest, waist, and hip measurements.Evaluates input and suggests the most fitting clothing size (S, M, L, XL).4.4 Checkout & Form Validation (order.js, reviews.js)Validates user input fields (name, phone number, address) before processing.Generates demonstration confirmations without external server calls.5. Directory Structure├── index.html
├── catalog.html
├── size-guide.html
├── cart.html
├── order.html
├── reviews.html
├── css/
│   ├── base.css
│   ├── dariya.css
│   └── gaukhar.css
├── js/
│   ├── data.js
│   ├── main.js
│   ├── catalog.js
│   ├── cart.js
│   ├── order.js
│   ├── reviews.js
│   └── size-guide.js
├── README.md
├── quality-pass.txt
├── ai-log.txt
└── checklist.md
6. How to Run the ProjectClone the repository:git clone https://github.com/yersdaiya/togyz-wedsite.git
Open the project directory in Visual Studio Code.Launch index.html using Live Server.Test theme switching, product selection, size guide, cart modifications, and checkout forms.7. Submission StatusStatus: Fully completed and tested.Tags: endterm