document.getElementById("add-tab").addEventListener("click", function () {
  createTab();
});

// load Iframe url
function loadURL(urlInput, urlLoader) {
  console.log("urlInput", urlInput);
  console.log("urlLoader", urlLoader);
  const url = urlInput.value.trim();
 console.log("url", url);
  if (url !== "") {
    fetch("https://cors-anywhere.herokuapp.com/" + url, {
      headers: {
        Origin: window.location.origin,
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        // Modify the fetched content to include necessary stylesheets and resources
        console.log("data", data);
        const modifiedContent = `<html>
                                  <head>
                                    <base href="${url}"> <!-- Set base URL for relative paths -->
                                  </head>
                                  <body>
                                    ${data} <!-- Insert fetched content -->
                                  </body>
                                </html>`;
        urlLoader.srcdoc = modifiedContent;
      })
      .catch((error) => console.error("Error fetching content:", error));
  } else {
    alert("Please enter a valid URL.");
  }
}

var count = 1;

function createTab() {
  //Remove the Active Class

  var allMenuTabs = document.querySelectorAll(".tab");
  allMenuTabs.forEach(function (tab) {
    tab.classList.remove("active");
  });

  var tabsMenu = document.getElementsByClassName("tabs-menu")[0];
  var tabsData = document.getElementsByClassName("tabs-data")[0];
  //console.log("tabsMenu", tabsMenu)

  // Create tab menu element
  var tab = document.createElement("div");
  tab.className = "tab";
  tab.innerHTML = "Tab " + count;
  tab.classList.add("active");

  //create close button
  var tabClose = document.createElement("span");
  tabClose.className = "tab-close";
  tabClose.innerHTML = "x";

  //create tab content element
  var tabContent = document.createElement("div");
  tabContent.className = "tab-content active";
  tabContent.innerHTML = "Enter the URL " + count + " ";

  // Create input element
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "urlInput");
  input.setAttribute("placeholder", "Enter URL and press Enter");

  // Create line break element
  const lineBreak = document.createElement("br");

  // Create iframe element
  const iframe = document.createElement("iframe");
  iframe.setAttribute("class", "urlLoader");

  //Create Search Button
  const search_button = document.createElement("button");
  search_button.setAttribute("class", "search-button");
  search_button.innerHTML = "Search";
  search_button.addEventListener("click", () => loadURL(input, iframe));

  tabContent.appendChild(input);
  tabContent.appendChild(search_button);
  tabContent.appendChild(lineBreak);
  tabContent.appendChild(iframe);

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      loadURL(input, iframe);
    }
  });

  tab.appendChild(tabClose);
  tabsMenu.appendChild(tab);
  tabsData.appendChild(tabContent);
  count++;

  tab.addEventListener("click", function () {
    showTab(tab, tabContent);
  });

  tabClose.addEventListener("click", function (event) {
    event.stopPropagation();
    var index = Array.from(tabsMenu.children).indexOf(tab);
    closeTab(tab, tabContent, index);
  });

  showTab(tab, tabContent);
}

function showTab(tab, tabContent) {
  // adjust active class and display style
  var allMenuTabs = document.querySelectorAll(".tab");
  allMenuTabs.forEach(function (menutab) {
    menutab.classList.remove("active");
  });
  tab.classList.add("active");

  var allTabsContent = document.querySelectorAll(".tab-content");
  allTabsContent.forEach(function (tab) {
    tab.style.display = "none";
    tab.classList.remove("active");
  });

  tabContent.style.display = "block";
  tab.classList.add("active");
}

function closeTab(tab, tabContent, index) {
  var tabsMenu = document.getElementsByClassName("tabs-menu")[0];
  var tabsData = document.getElementsByClassName("tabs-data")[0];

  tabsMenu.removeChild(tab);
  tabsData.removeChild(tabContent);

  //show tab fuction calls only when it is active and having some tabs
  if (tab.classList.contains("active")) {
    //if tab is las chid
    if (!tabsMenu.children[index]) {
      index = 0;
    }

    var tab = tabsMenu.children[index];
    var tabContent = tabsData.children[index];

    if (tabsMenu.children.length) {
      showTab(tab, tabContent);
    }
  }
}
