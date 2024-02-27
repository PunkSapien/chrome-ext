// contentScript.js

// Example CSS styles for the sheet
var customStyles = `
    #toggleSheetButton {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        cursor: pointer;
    }

    #custom-sheet {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        height: 100%;
        background-color: #f0f0f0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        overflow-y: auto;
        transition: transform 0.3s ease; /* Smooth transition effect */
        transform: translateX(100%); /* Initial position outside the viewport */
    }

    #custom-sheet.show {
        transform: translateX(0);
        display:block; /* Move the sheet into view */
    }

    #custom-sheet p {
        color: #333;
        font-family: Arial, sans-serif;
        padding: 10px;
    }
`;

// Function to toggle the visibility of the sheet and update button text
function toggleSheet() {
  var sheet = document.getElementById("custom-sheet");
  var button = document.getElementById("toggleSheetButton");

  sheet.classList.toggle("show");
  button.textContent = sheet.classList.contains("show")
    ? "Close Sheet"
    : "Open Sheet";
}

// Function to load HTML content into the sheet
function loadContentIntoSheet(htmlContent) {
  var container = document.getElementById("custom-sheet");
  container.innerHTML = htmlContent;
}

// Function to inject HTML and CSS into the current web page
function injectCustomContent() {
  // Inject HTML
  var container = document.createElement("div");
  container.innerHTML = `
        <button id="toggleSheetButton">Open Sheet</button>
        <div id="custom-sheet"></div>
    `;
  document.body.appendChild(container);

  // Inject CSS
  var style = document.createElement("style");
  style.innerHTML = customStyles;
  document.head.appendChild(style);

  // Add click event listener to the button
  var toggleButton = document.getElementById("toggleSheetButton");
  toggleButton.addEventListener("click", function () {
    toggleSheet();
    if (document.getElementById("custom-sheet").classList.contains("show")) {
      // Load content into the sheet when it becomes visible
      loadContentIntoSheet(``);
    }
  });
}

// Run the injection function
injectCustomContent();
const clerkPublishableKey ="pk_test_c2hhcnAtZHJhZ29uLTM5LmNsZXJrLmFjY291bnRzLmRldiQ"
const frontendApi = "https://sharp-dragon-39.clerk.accounts.dev/npm/@clerk/clerk-js@4/dist/clerk.browser.js";
const version = "@latest"; // Set to appropriate version

// Creates asynchronous script
const script = document.createElement("script");
script.setAttribute("data-clerk-frontend-api", frontendApi);
script.setAttribute("data-clerk-publishable-key", clerkPublishableKey);
script.async = true;
script.src = `https://${frontendApi}/npm/@clerk/clerk-js${version}/dist/clerk.browser.js`;

// Adds listener to initialize ClerkJS after it's loaded
script.addEventListener('load', async function () {
  await window.Clerk.load();

  const signInComponent = document.querySelector('#sign-in');

  window.Clerk.openSignIn(signInComponent, {
    appearance: {
      baseTheme: dark
    }
  });
});


document.body.appendChild(script);



function extractUsernameFromInstagramUrl(url) {
  // Regular expression to match the Instagram username
  var regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/;

  // Match the regex against the URL
  var match = url.match(regex);

  // Check if there is a match and return the username
  return match ? match[1] : null;
}

// Get the current tab's URL
var currentTabUrl = window.location.href;

// Extract username from the Instagram URL
var username = extractUsernameFromInstagramUrl(currentTabUrl);
