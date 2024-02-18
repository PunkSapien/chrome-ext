(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 54:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./components/Footer/index.js

function Footer() {
    return /*#__PURE__*/ jsx_runtime.jsx("footer", {
        className: "px-4 py-2 bg-gray-100 text-center",
        children: /*#__PURE__*/ jsx_runtime.jsx("a", {
            className: "text-blue-500 hover:text-blue-700",
            href: "http://admyre.club",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "powered by admyre"
        })
    });
} // {
 //   "avgComments": 107.5,
 //   "avgLikes": 21445.733333333334,
 //   "avgViews": 52119.566666666666,
 //   "bio": "Official page of Toei Animation for North America, South Africa, and ANZ. Home of beloved hits such as Dragon Ball, Digimon, & One Piece since 1956.",
 //   "bioLink": [
 //     {}
 //   ],
 //   "email": "inquiry@toei-animation-usa.com",
 //   "er": 0.0017495292693647862,
 //   "followerCount": 1403669,
 //   "followingCount": 165,
 //   "fullName": "Toei Animation",
 //   "isValidUsername": true,
 //   "paginationAfter": "",
 //   "phoneCode": "",
 //   "phoneNumber": "",
 //   "postArray": [
 //     "l", "l", "l", "l", "l", "l", "l", "l", "l", "l",
 //     "l", "l", "l", "l", "l", "l", "l", "l", "l", "l",
 //     "l", "l", "l", "l", "l", "l", "l", "l", "l", "l"
 //   ],
 //   "postCount": 3696,
 //   "profilePicture": "https://scontent-iad3-2.xx.fbcdn.net/v/t51.2885-15/356955998_1071763357137649_8982447512876000969_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=7d201b&_nc_ohc=Gmm-tNxlvwgAX-U5pG_&_nc_ht=scontent-iad3-2.xx&edm=AL-3X8kEAAAA&oh=00_AfDAbgofbbu6oOuU90qZvZv_Ou9YjewzXWzNuf9eut6Dvg&oe=6548036C",
 //   "time_stamp": null,
 //   "totalComments": 3225,
 //   "totalEngagement": 2210184,
 //   "totalLikes": 643372,
 //   "totalViews": 1563587,
 //   "userid": "2321191491",
 //   "username": "toei_animation"
 // }

// EXTERNAL MODULE: external "lucide-react"
var external_lucide_react_ = __webpack_require__(423);
// EXTERNAL MODULE: ./utils/db.js
var db = __webpack_require__(617);
;// CONCATENATED MODULE: ./components/Header/index.js




function Header({ navigateToPage , activePage , getActionGlobal , setSelectedListId , listsProp  }) {
    const [lists, setLists] = (0,external_react_.useState)([]);
    const [selectedList, setSelectedList] = (0,external_react_.useState)(null);
    const [showDropdown, setShowDropdown] = (0,external_react_.useState)(false);
    const dropdownButtonRef = (0,external_react_.useRef)(null);
    const dropdownModalRef = (0,external_react_.useRef)(null);
    const fetchLists = async ()=>{
        const allLists = await (0,db/* readAllLists */.wy)();
        setLists(allLists);
        if (!selectedList) setSelectedList(allLists[0]?.id || null); // set only if not already set
    };
    (0,external_react_.useEffect)(()=>{
        fetchLists();
        const handleClickOutside = (event)=>{
            if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target) && dropdownModalRef.current && !dropdownModalRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleAddToSelectedList = async ()=>{
        if (!selectedList || !getActionGlobal) return;
        const listToUpdate = lists.find((list)=>list.id === selectedList);
        if (!listToUpdate) return;
        const itemIndex = listToUpdate.items.findIndex((item)=>item.userid === getActionGlobal.userid);
        let updatedItems;
        if (itemIndex > -1) {
            updatedItems = [
                ...listToUpdate.items
            ];
            updatedItems[itemIndex] = getActionGlobal;
        } else {
            updatedItems = [
                ...listToUpdate.items,
                getActionGlobal
            ];
        }
        const updatedList = {
            ...listToUpdate,
            items: updatedItems
        };
        await (0,db/* upsertList */.C$)(updatedList);
        fetchLists();
        setShowDropdown(false);
    };
    const handleListSelection = (id)=>{
        setSelectedListId(id);
        setShowDropdown(false);
    };
    const getButtonText = ()=>{
        if (selectedList) return lists.find((list)=>list.id === selectedList)?.name;
        return lists.length ? "Select a list" : "Create a list";
    };
    // Function to navigate to the imports page
    const navigateToImports = ()=>{
        navigateToPage("import");
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
        className: "w-100 px-4 py-2 flex justify-between items-center bg-gray-100",
        children: [
            activePage !== "index" ? /*#__PURE__*/ jsx_runtime.jsx("button", {
                className: "text-blue-500 hover:text-blue-700",
                onClick: ()=>navigateToPage("index"),
                children: "Go back to home"
            }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        className: "text-blue-500 hover:text-blue-700 mr-2",
                        onClick: ()=>navigateToPage("lists"),
                        children: "View all lists"
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        className: "text-blue-500 hover:text-blue-700",
                        onClick: navigateToImports,
                        children: "Import"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "relative flex items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        ref: dropdownButtonRef,
                        onClick: ()=>setShowDropdown(!showDropdown),
                        className: "border rounded mr-2 p-2 cursor-pointer hover:bg-gray-200",
                        children: getButtonText()
                    }),
                    showDropdown && /*#__PURE__*/ jsx_runtime.jsx("div", {
                        ref: dropdownModalRef,
                        className: "absolute top-full mt-2 w-64 border rounded shadow-md bg-white z-10",
                        children: lists.length ? lists.map((list)=>/*#__PURE__*/ jsx_runtime.jsx("div", {
                                onClick: ()=>handleListSelection(list.id),
                                className: "cursor-pointer p-2 hover:bg-gray-200",
                                children: list.name
                            }, list.id)) : /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "p-2 text-gray-600",
                            children: "No lists available"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        onClick: handleAddToSelectedList,
                        className: "bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300",
                        children: /*#__PURE__*/ jsx_runtime.jsx(external_lucide_react_.BookmarkPlus, {
                            className: "w-6 h-6"
                        })
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./components/Index/index.js
var Index = __webpack_require__(982);
// EXTERNAL MODULE: ./components/Lists/index.js
var Lists = __webpack_require__(362);
// EXTERNAL MODULE: ./components/Import/index.js
var Import = __webpack_require__(641);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(764);
;// CONCATENATED MODULE: ./pages/_app.js








function App() {
    const [activePage, setActivePage] = (0,external_react_.useState)("index");
    const [getActionGlobal, setActionGlobal] = (0,external_react_.useState)(null);
    const navigateToPage = (page)=>{
        console.log("Navigating to page:", page);
        setActivePage(page);
    };
    (0,external_react_.useEffect)(()=>{
        if (getActionGlobal) {
            console.log("ActionGlobal has been set:", getActionGlobal);
        }
    }, [
        getActionGlobal
    ]);
    let ActiveComponent;
    switch(activePage){
        case "index":
            ActiveComponent = /*#__PURE__*/ jsx_runtime.jsx(Index/* default */.Z, {
                navigateToPage: navigateToPage,
                setActionGlobal: setActionGlobal
            });
            break;
        case "lists":
            ActiveComponent = /*#__PURE__*/ jsx_runtime.jsx(Lists/* default */.Z, {
                navigateToPage: navigateToPage
            });
            break;
        case "import":
            ActiveComponent = /*#__PURE__*/ jsx_runtime.jsx(Import/* default */.Z, {
                navigateToPage: navigateToPage,
                setActionGlobal: setActionGlobal
            });
            break;
        default:
            ActiveComponent = /*#__PURE__*/ jsx_runtime.jsx(Index/* default */.Z, {
                navigateToPage: navigateToPage,
                setActionGlobal: setActionGlobal
            });
            break;
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Header, {
                navigateToPage: navigateToPage,
                activePage: activePage,
                getActionGlobal: getActionGlobal
            }),
            ActiveComponent,
            /*#__PURE__*/ jsx_runtime.jsx(Footer, {})
        ]
    });
}


/***/ }),

/***/ 764:
/***/ (() => {



/***/ }),

/***/ 423:
/***/ ((module) => {

"use strict";
module.exports = require("lucide-react");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 223:
/***/ ((module) => {

"use strict";
module.exports = require("react-loader-spinner");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [893,797], () => (__webpack_exec__(54)));
module.exports = __webpack_exports__;

})();