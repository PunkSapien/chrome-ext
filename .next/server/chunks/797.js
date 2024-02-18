"use strict";
exports.id = 797;
exports.ids = [797];
exports.modules = {

/***/ 641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Import)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Index_content_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(166);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(617);


 // Ensure this path is correct
 // Ensure this path is correct
function Import({ setActionGlobal  }) {
    const [urlList, setUrlList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [timeRange, setTimeRange] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        from: 0,
        to: 10
    });
    const [isProcessing, setIsProcessing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [lists, setLists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedListId, setSelectedListId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchLists = async ()=>{
            const allLists = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .readAllLists */ .wy)();
            setLists(allLists);
            if (allLists.length > 0) {
                setSelectedListId(allLists[0].id); // Select the first list by default
            }
        };
        fetchLists();
    }, []);
    const saveToList = async (actionInstance)=>{
        const allLists = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .readAllLists */ .wy)();
        const selectedList = allLists.find((list)=>list.id === selectedListId);
        if (!selectedList) {
            console.error("No list selected");
            return;
        }
        const updatedList = {
            ...selectedList,
            items: [
                ...selectedList.items,
                actionInstance
            ],
            updatedAt: Date.now()
        };
        await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .upsertList */ .C$)(updatedList);
        // Update the local lists state with the new list data
        setLists(allLists.map((list)=>list.id === selectedListId ? updatedList : list));
    };
    const openUrlInCurrentTab = (url)=>{
        // Query for the active tab in the current window
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs)=>{
            // Update the URL of the active tab
            chrome.tabs.update(tabs[0].id, {
                url
            });
        });
    };
    const processUrls = async ()=>{
        setIsProcessing(true);
        const urls = urlList.split("\n").filter((url)=>url.trim() !== "");
        for (const url of urls){
            const delay = Math.random() * (timeRange.to - timeRange.from) + timeRange.from;
            await new Promise((resolve)=>setTimeout(resolve, delay * 1000));
            openUrlInCurrentTab(url); // Open each URL in the current tab
            let username = extractUsernameFromUrl(url);
            if (!username) continue;
            let actionInstance = new _Index_content_script__WEBPACK_IMPORTED_MODULE_2__/* .ActionClass */ .i(username);
            await actionInstance.solve();
            setActionGlobal(actionInstance);
            await saveToList(actionInstance);
        }
        setIsProcessing(false);
    };
    const extractUsernameFromUrl = (url)=>{
        try {
            let urlObj = new URL(url);
            let pathParts = urlObj.pathname.split("/").filter(Boolean);
            return pathParts[0];
        } catch (error) {
            console.error("Invalid URL:", url);
            return null;
        }
    };
    const handleUrlListChange = (event)=>{
        setUrlList(event.target.value);
    };
    const handleTimeRangeChange = (event)=>{
        setTimeRange({
            ...timeRange,
            [event.target.name]: parseInt(event.target.value)
        });
    };
    const handleListSelection = (event)=>{
        setSelectedListId(event.target.value);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "container mx-auto px-4",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "my-4",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                        className: "border p-2 rounded",
                        value: selectedListId,
                        onChange: handleListSelection,
                        children: lists.map((list)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                value: list.id,
                                children: list.name
                            }, list.id))
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                    className: "w-full border rounded p-2",
                    rows: "10",
                    placeholder: "Enter Instagram URLs (one per line)",
                    value: urlList,
                    onChange: handleUrlListChange
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-4 mb-4",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "number",
                            name: "from",
                            placeholder: "Time range from (seconds)",
                            className: "border p-2 rounded w-1/2",
                            value: timeRange.from,
                            onChange: handleTimeRangeChange
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "number",
                            name: "to",
                            placeholder: "Time range to (seconds)",
                            className: "border p-2 rounded w-1/2",
                            value: timeRange.to,
                            onChange: handleTimeRangeChange
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    className: `bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`,
                    onClick: processUrls,
                    disabled: isProcessing,
                    children: isProcessing ? "Processing..." : "Start Import"
                })
            ]
        })
    });
}


/***/ }),

/***/ 166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ ActionClass)
/* harmony export */ });
/*
* @admyre.club
* The following script is responsible for getting all the displayable data on popup screen
* Its entirely based on private api created by us for analytical purposes
*/ const WEBPROFILE_OPTIONS = {
    method: "GET",
    headers: {
        authority: "i.instagram.com",
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        dnt: "1",
        "sec-ch-ua": '"Chromium";v="117", "Not;A=Brand";v="8"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "none",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "x-asbd-id": "198387",
        "x-csrftoken": "ouXykei15LQdtOxTb7ygP5ahsGK0ZncH",
        "x-ig-app-id": "936619743392459",
        "x-ig-www-claim": "hmac.AR2_6X5WHvWhzlMyUBTI3QRb45iMqEqnTJCbAgi8guhQ73z-",
        "x-instagram-ajax": "1",
        "x-requested-with": "XMLHttpRequest"
    }
};
const feedHashv1 = "e7e2f4da4b02303f74f0841279e52d76";
const likeHash = "e0f59e4a1c8d78d0161873bc2ee7ec44";
const PRIVATE_URL = "https://i.instagram.com/";
const options = {
    method: "GET",
    headers: {
        authority: "i.instagram.com",
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        dnt: "1",
        "sec-ch-ua": '"Chromium";v="117", "Not;A=Brand";v="8"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "none",
        "x-ig-app-id": "936619743392459",
        "x-instagram-ajax": "1",
        "x-requested-with": "XMLHttpRequest"
    }
};
class Post {
    constructor(shortCode, playCount, likeCount, commentCount, displayUrl, captionText){
        this.shortCode = shortCode;
        this.playCount = playCount;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.displayUrl = displayUrl;
        this.captionText = captionText;
    }
}
class ActionClass {
    constructor(username){
        this.userid = null;
        this.username = username;
        this.followerCount = null;
        this.followingCount = null;
        this.postCount = null;
        this.bio = null;
        this.totalViews = null; // last 30 posts
        this.totalLikes = null; // last 30 posts
        this.totalComments = null; // last 30 posts
        this.postArray = [];
        this.time_stamp = null; //time stamp?
        this.email = null;
        this.phoneCode = null;
        this.phoneNumber = null;
        this.isValidUsername = null; //username validity test, to not catch keywords like /p/, /explore/ etc
        this.bioLink = []; //links associated with bio, attached externally
        this.paginationAfter = "";
        this.profilePicture = null;
        this.er = null;
        this.avgViews = null;
        this.avgLikes = null;
        this.avgComments = null;
        this.fullName = null;
        this.totalEngagement = null;
        this.erOfReach = null;
        this.avgReelsPlay30d = null;
        this.avgReach = null;
        this.storyReach = null;
        this.imageReach = null;
        this.reelsReach = null;
        this.imageEngagementRate = null;
        this.reelsEngagementRate = null;
        this.imgAvgLikes = null;
        this.reelsAvgLikes = null;
        this.imageAvgComments = null;
        this.reelsAvgComments = null;
    }
    webProfileGeneretor(username) {
        return `https://www.instagram.com/${username}/?__a=1&__d=dis`;
    }
    async setUserParameters(username) {
        let response = await fetch(this.webProfileGeneretor(username, this.WEBPROFILE_OPTIONS));
        let profileIcon = await this.getProfileIcon(username);
        let reachData = await this.reachFinder(username);
        if (!response.ok) {
            this.isValidUsername = false; // Invalid username or network error
            return null;
        }
        let data = await response.json();
        let icon = await profileIcon.json();
        let reachExtract = await reachData.json();
        if (username === "direct") {
            this.isValidUsername = false;
            return null;
        }
        if (username == "") {
            this.isValidUsername = false;
            return null;
        } else if (data.logging_page_id) {
            this.isValidUsername = true; // Valid username
            this.userid = data.graphql.user.id;
            this.followerCount = data.graphql.user.edge_followed_by.count;
            this.followingCount = data.graphql.user.edge_follow.count;
            this.bio = data.graphql.user.biography;
            this.bioLink = data.graphql.user.bio_links;
            this.postCount = data.graphql.user.edge_owner_to_timeline_media.count;
            //this.profilePicture = data.graphql.user.profile_pic_url;
            this.erOfReach = reachExtract.profiles[0].socialDetails.engagementRate;
            this.avgReelsPlay30d = reachExtract.profiles[0].socialDetails.avgReelsPlay30d;
            this.avgReach = reachExtract.profiles[0].socialDetails.avgReach;
            this.storyReach = reachExtract.profiles[0].socialDetails.storyReach;
            this.imageReach = reachExtract.profiles[0].socialDetails.imageReach;
            this.reelsReach = reachExtract.profiles[0].socialDetails.reelsReach;
            this.imageEngagementRate = reachExtract.profiles[0].socialDetails.imageEngagementRate;
            this.reelsEngagementRate = reachExtract.profiles[0].socialDetails.reelsEngagementRate;
            this.imgAvgLikes = reachExtract.profiles[0].socialDetails.imageAvgLikes;
            this.reelsAvgLikes = reachExtract.profiles[0].socialDetails.reelsAvgLikes;
            this.imageAvgComments = reachExtract.profiles[0].socialDetails.imageAvgComments;
            this.reelsAvgComments = reachExtract.profiles[0].socialDetails.reelsAvgComments;
            this.profilePicture = icon.icon_url;
            this.fullName = data.graphql.user.full_name;
            return null;
        }
        this.isValidUsername = false; // Username exists but is not a valid profile, those kinda cases handled here
        return null;
    }
    metrics() {
        this.totalEngagement = this.totalComments + this.totalViews + this.totalLikes;
        this.avgComments = this.totalComments / this.postArray.length;
        this.avgLikes = this.totalLikes / this.postArray.length;
        this.avgViews = this.totalViews / this.postArray.length;
        this.er = this.totalEngagement / (this.followerCount * this.postArray.length * this.postArray.length);
    }
    async moreContext(baseurl, userid) {
        let response = await fetch(`${baseurl}api/v1/users/${userid}/info`, options);
        let data = await response.json();
        this.email = data.user.public_email;
        this.phoneCode = data.user.public_phone_country_code;
        this.phoneNumber = data.user.public_phone_number;
    //console.log('heres more context data: ', data)
    //   fetch(`https://i.instagram.com/api/v1/users/${userid}/info`, this.WEBPROFILE_OPTIONS)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    }
    async reachFinder(username) {
        const response = await fetch(`http://tall-supreme-helenium.glitch.me/reach?username=${username}`);
        return response;
    }
    async fetchFeed_v1(userid, hash, after = "") {
        const variables = {
            id: userid,
            first: 50,
            after: after
        };
        const response = await fetch(`https://www.instagram.com/graphql/query?query_hash=${hash}&variables=` + encodeURIComponent(JSON.stringify(variables)), this.FEED_OPTIONS);
        const data = await response.json();
    }
    async fetchLikeCount(shortcode, hash) {
        hash = likeHash;
        const variables = {
            shortcode: shortcode,
            first: "0",
            after: ""
        };
        const response = await fetch(`https://www.instagram.com/graphql/query?query_hash=${hash}&variables=` + encodeURIComponent(JSON.stringify(variables)), this.FEED_OPTIONS);
        const data = await response.json();
    }
    async fetchFeed_v2(username, after = "") {
        // this has like count, play count, comment count
        //prefer to invoke this
        const encodedUsername = encodeURIComponent(username);
        const encodedAfter = encodeURIComponent(after);
        const url = `https://www.instagram.com/api/v1/feed/user/${encodedUsername}/username?count=30&max_id=${encodedAfter}`;
        const response = await fetch(url, {
            method: "GET",
            mode: "no-cors",
            headers: {
                authority: "i.instagram.com",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                accept: "application/json",
                origin: "https://www.instagram.com",
                referer: "https://www.instagram.com/",
                "user-agent": getUserAgent()
            }
        });
        let data = await response.json();
        let items = data.items || [];
        items.forEach((item)=>{
            const shortCode = item.code;
            const playCount = item.play_count;
            const likeCount = item.like_count;
            const commentCount = item.comment_count;
            const displayUrlArray = item.image_versions2 ? item.image_versions2.candidates.map((candidate)=>candidate.url) : [];
            const captionText = item.caption ? item.caption.text : "";
            const post = new Post(shortCode, playCount, likeCount, commentCount, displayUrlArray, captionText);
            this.postArray.push(post);
        });
    }
    async fetchFeed_v3(username, num, after = "") {
        // this has like count, play count, comment count
        //prefer to invoke this
        const encodedUsername = encodeURIComponent(username);
        for(let i = 0; i < num; i++){
            const encodedAfter = encodeURIComponent(after);
            const url = `https://www.instagram.com/api/v1/feed/user/${encodedUsername}/username?count=30&max_id=${encodedAfter}`;
            const response = await fetch(url, WEBPROFILE_OPTIONS);
            let data = await response.json();
            //console.log('feed data: ', data)
            // Extracting Posts and adding them to postArray
            let items = data.items || [];
            items.forEach((item)=>{
                const shortCode = item.code;
                const playCount = item.play_count;
                const likeCount = item.like_count;
                const commentCount = item.comment_count;
                const displayUrlArray = item.image_versions2 ? item.image_versions2.candidates.map((candidate)=>candidate.url) : [];
                const captionText = item.caption ? item.caption.text : "";
                const post = new Post(shortCode, playCount, likeCount, commentCount, displayUrlArray, captionText);
                this.postArray.push(post);
            });
            // Assuming next_max_id is present at the root of the response object.
            after = data.next_max_id;
            if (!after) break; // Break if there's no next_max_id to prevent infinite loop
        }
    }
    async newFeed(username) {
        const options = {
            method: "GET",
            headers: {
                cookie: 'mid=Y3o6mgAEAAEsaNsgaCx_Ao3owPjy; ig_did=4163E494-19D8-439F-A04C-2F00DC381D92; datr=ddJ6YyrlRPuDSw8A9tNDX-Ar; dpr=2.200000047683716; ig_nrcb=1; csrftoken=ouXykei15LQdtOxTb7ygP5ahsGK0ZncH; ds_user_id=53540676861; shbid="4642\\x2C53540676861\\x2C1728140886:01f7fd69c82b9b9fc9a6424a4421c1d616ef3f106dad6c5a8405b740a0363d87cde57eea"; shbts="1696604886\\x2C53540676861\\x2C1728140886:01f7d47602639136263c5458c56ee50cf2382404728a40367af4481eefbc5d9129bcc136"; sessionid=53540676861%3AV6zfdUBROMOpJE%3A28%3AAYeeRRj5Eb1RgxbnxCaOQI3s9j_PsiRb49aSdVa8il0; rur="CLN\\x2C53540676861\\x2C1728274418:01f7397d9df4741f54f31eca6ac14765fa4110192dddf6d3b63861ba6f1c6417ee7c0374"',
                authority: "www.instagram.com",
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                dnt: "1",
                dpr: "2.2",
                referer: "https://www.instagram.com/",
                "sec-ch-prefers-color-scheme": "light",
                "sec-ch-ua": '"Not=A?Brand";v="99", "Chromium";v="118"',
                "sec-ch-ua-full-version-list": '"Not=A?Brand";v="99.0.0.0", "Chromium";v="118.0.5993.70"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-model": '""',
                "sec-ch-ua-platform": '"macOS"',
                "sec-ch-ua-platform-version": '"14.0.0"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
                "viewport-width": "1358",
                "x-asbd-id": "129477",
                "x-csrftoken": "ouXykei15LQdtOxTb7ygP5ahsGK0ZncH",
                "x-ig-app-id": "936619743392459",
                "x-ig-www-claim": "hmac.AR2_6X5WHvWhzlMyUBTI3QRb45iMqEqnTJCbAgi8guhQ71PU",
                "x-requested-with": "XMLHttpRequest"
            }
        };
        await fetch(`https://www.instagram.com/api/v1/feed/user/${username}/username?count=30&max_id=`, options).then((response)=>{
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        }).then((data)=>{
            // Assuming the data structure is similar to that in fetchFeed_v3
            let items = data.items || [];
            items.forEach((item)=>{
                const shortCode = item.code;
                const playCount = item.play_count;
                const likeCount = item.like_count;
                const commentCount = item.comment_count;
                const displayUrlArray = item.image_versions2 ? item.image_versions2.candidates.map((candidate)=>candidate.url) : [];
                const captionText = item.caption ? item.caption.text : "";
                const post = new Post(shortCode, playCount, likeCount, commentCount, displayUrlArray, captionText);
                this.postArray.push(post);
            });
        // Log the posts to the console
        //console.log(this.postArray);
        }).catch((error)=>{
            console.error("There has been a problem with your fetch operation:", error);
        });
    }
    calculateTotals() {
        this.totalComments = 0;
        this.totalLikes = 0;
        this.totalViews = 0;
        this.postArray.forEach((post)=>{
            if (post.commentCount != undefined) {
                this.totalComments += post.commentCount;
            }
            if (post.likeCount != undefined) {
                this.totalLikes += post.likeCount;
            }
            if (post.playCount != undefined) {
                this.totalViews += post.playCount;
            }
        });
    }
    async fetchAnyFeed(which, after) {
        switch(which){
            case v1:
                return await this.fetchFeed_v1(this.userid, feedHashv1, after);
            case v2:
                return await this.fetchFeed_v2(this.username, after);
        }
    }
    async sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    async getProfileIcon(username) {
        const response = await fetch(`http://tall-supreme-helenium.glitch.me/?username=${username}`);
        return response;
    }
    async solve() {
        console.log("entering midtown");
        await this.setUserParameters(this.username);
        if (this.isValidUsername) {
            // Start both API calls, but don't wait for them to complete yet
            console.log("there is a problem here somewhere");
            const newFeedPromise = this.newFeed(this.username);
            const moreContextPromise = this.moreContext(PRIVATE_URL, this.userid);
            await this.getProfileIcon(this.username);
            // Wait for both promises to complete
            await Promise.all([
                newFeedPromise,
                moreContextPromise
            ]);
            // Perform other synchronous tasks after both promises are resolved
            this.calculateTotals();
            this.metrics();
        }
        //console.log('heres final data: ', this);
        return;
    }
} // function webProfileInfo(username) {
 //     // return `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`
 //     return `https://www.instagram.com/${username}/?__a=1&__d=dis`;
 //   };
 //   const userAgents = [
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 376668393)",
 //     "Mozilla/5.0 (Linux; Android 9; SM-A102U Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.136 Mobile Safari/537.36 Instagram 155.0.0.37.107 Android (28/9; 320dpi; 720x1468; samsung; SM-A102U; a10e; exynos7885; en_US; 239490550)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone11,8; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone14,3; iOS 15_5; en_US; en-US; scale=3.00; 1284x2778; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,4; iOS 15_5; en_US; en-US; scale=3.00; 1284x2778; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,2; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone14,3; iOS 15_5; en_US; en-US; scale=3.00; 1284x2778; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone14,5; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,4; iOS 15_5; en_US; en-US; scale=3.00; 1284x2778; 376668393) NW/3",
 //     "Mozilla/5.0 (Linux; Android 10; SM-G973F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36 Instagram 166.1.0.42.245 Android (29/10; 420dpi; 1080x2042; samsung; SM-G973F; beyond1; exynos9820; en_GB; 256099204)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone14,5; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 142.0.0.22.109 (iPhone12,5; iOS 14_1; en_US; en-US; scale=3.00; 1242x2688; 214888322) NW/1",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,2; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone11,8; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 160.1.0.31.120 (iPhone8,1; iOS 13_5_1; en_US; en-US; scale=2.00; 750x1334; 246979827) NW/1",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone14,2; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,3; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,5; iOS 15_5; en_US; en-US; scale=3.00; 1242x2688; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone11,8; iOS 13_3; en_US; en-US; scale=2.00; 828x1792; 190542906)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,8; iOS 15_5; en_US; en-US; scale=2.00; 750x1334; 376668393)",
 //     "Mozilla/5.0 (Linux; Android 10; SM-A102U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 Instagram 167.0.0.24.120 Android (29/10; 320dpi; 720x1402; samsung; SM-A102U; a10e; exynos7884B; en_US; 256966589)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone14,2; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_4_1; en_US; en-US; scale=2.00; 828x1792; 376668393)",
 //     "Mozilla/5.0 (Linux; Android 9; SM-G955U Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.111 Mobile Safari/537.36 Instagram 153.0.0.34.96 Android (28/9; 420dpi; 1080x2094; samsung; SM-G955U; dream2qltesq; qcom; en_US; 236572377)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,3; iOS 15_5; en_US; en-US; scale=3.00; 1170x2532; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,5; iOS 15_5; en_US; en-US; scale=3.00; 1242x2688; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_4_1; en_US; en-US; scale=2.00; 828x1792; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.0.0.17.109 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 375924574)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,8; iOS 15_5; en_US; en-US; scale=2.00; 750x1334; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone11,8; iOS 15_4_1; en_US; en-US; scale=2.00; 828x1792; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.21; 828x1792; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.0.0.17.109 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 375924574) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.0.0.24.115 (iPhone11,8; iOS 13_3; en_US; en-US; scale=2.00; 828x1792; 188362626)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone12,1; iOS 13_3; en_US; en-US; scale=2.00; 828x1792; 190542906)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 152.0.0.21.114 (iPhone12,3; iOS 13_6_1; en_US; en-US; scale=3.00; 1125x2436; 234053878)",
 //     "Mozilla/5.0 (Linux; Android 9; SM-G960U Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/85.0.4183.81 Mobile Safari/537.36 Instagram 156.0.0.26.109 Android (28/9; 480dpi; 1080x2076; samsung; SM-G960U; starqltesq; qcom; en_US; 240726484)",
 //     "Mozilla/5.0 (Linux; Android 10; SM-N975U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.89 Mobile Safari/537.36 Instagram 135.0.0.28.119 Android (29/10; 480dpi; 1080x2051; samsung; SM-N975U; d2q; qcom; en_US; 206670927)",
 //     "Mozilla/5.0 (Linux; Android 10; SM-G960U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.125 Mobile Safari/537.36 Instagram 156.0.0.26.109 Android (29/10; 720dpi; 1440x2744; samsung; SM-G960U; starqltesq; qcom; en_US; 240726484)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.21; 828x1792; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone13,2; iOS 15_4_1; en_US; en-US; scale=3.00; 1170x2532; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 238.0.0.13.112 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 374251869)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,1; iOS 15_5; es_MX; es-MX; scale=2.00; 828x1792; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 240.1.0.26.107 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 378200232)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone12,3; iOS 15_5; en_US; en-US; scale=3.00; 1125x2436; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.0.0.17.109 (iPhone11,8; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 375924574)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 242.0.0.7.110 (iPhone12,1; iOS 15_5; en_US; en-US; scale=2.00; 828x1792; 380322996)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone11,6; iOS 15_5; en_US; en-US; scale=3.00; 1242x2688; 376668393)",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 239.2.0.17.109 (iPhone11,8; iOS 15_4_1; en_US; en-US; scale=2.00; 828x1792; 376668393) NW/3",
 //     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone11,6; iOS 13_3; en_US; en-US; scale=3.00; 1242x2688; 190542906)",
 //   ];
 //   const getUserAgent = () => {
 //     const random = Math.floor(Math.random() * userAgents.length);
 //     return userAgents[random];
 //   };
 // // const response = await fetch(webProfileInfo('trashcanpaul'), {
 // //     method: "GET",
 // //     mode: "no-cors",
 // //     headers: {
 // //       authority: "i.instagram.com",
 // //       "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
 // //       accept: "application/json",
 // //       origin: "https://www.instagram.com",
 // //       referer: "https://www.instagram.com/",
 // //       "user-agent": getUserAgent(),
 // //     },
 // //   });
 // //   const profile = await response.json();
 // //   console.log(profile)
 // const options = {
 //   method: 'GET',
 //   headers: {
 //     authority: 'i.instagram.com',
 //     accept: 'application/json, text/plain, */*',
 //     'accept-language': 'en-US,en;q=0.9',
 //     dnt: '1',
 //     'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
 //     'sec-ch-ua-mobile': '?0',
 //     'sec-ch-ua-platform': '"macOS"',
 //     'sec-fetch-dest': 'empty',
 //     'sec-fetch-mode': 'cors',
 //     'sec-fetch-site': 'none',
 //     'x-ig-app-id': '936619743392459',
 //     'x-instagram-ajax': '1',
 //     'x-requested-with': 'XMLHttpRequest'
 //   }
 // };
 // fetch('https://www.instagram.com/graphql/query?query_hash=e7e2f4da4b02303f74f0841279e52d76&variables=%7B%22id%22%3A%2238230174766%22%2C%22first%22%3A50%2C%22after%22%3A%22%22%7D', options)
 // .then(response => response.json())
 // .then(response => console.log(response))
 // .catch(err => console.error(err));


/***/ }),

/***/ 982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Index)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(223);
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loader_spinner__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _content_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(166);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(423);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lucide_react__WEBPACK_IMPORTED_MODULE_4__);





function Index({ navigateToPage , setActionGlobal  }) {
    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isValid, setIsValid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // null initially, then true or false
    const [actionInstance, setActionInstance] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // null initially, then the actionInstance object
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        async function fetchData() {
            console.log("fetching data");
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, async function(tabs) {
                let tab = tabs[0];
                let url = new URL(tab.url);
                if (url.hostname === "www.instagram.com") {
                    let pathParts = url.pathname.split("/").filter(Boolean);
                    let username = pathParts[0];
                    if (username) {
                        setUsername(username);
                        let actionInstance = new _content_script__WEBPACK_IMPORTED_MODULE_3__/* .ActionClass */ .i(username);
                        console.log("starting to solve");
                        await actionInstance.solve();
                        console.log("done solving");
                        console.log("actionInstance", actionInstance);
                        setIsValid(actionInstance.isValidUsername);
                        setActionInstance(actionInstance);
                        setActionGlobal(actionInstance);
                    } else {
                        console.log("username is null");
                        setIsValid(false);
                    }
                } else {
                    console.log("Not an Instagram page");
                }
            });
        }
        fetchData();
    }, []); // Dependency array remains empty
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "container mx-auto px-4",
        children: isValid === null ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex justify-center items-center h-screen",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_loader_spinner__WEBPACK_IMPORTED_MODULE_2__.Puff, {
                color: "#1c0a1f",
                height: 100,
                width: 100
            })
        }) : isValid ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "my-4 bg-white shadow-md rounded-lg overflow-hidden",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "p-4 text-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        className: "rounded-full mx-auto mb-4",
                        src: actionInstance ? actionInstance.profilePicture : "",
                        alt: "Profile Pic",
                        width: "100"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: "text-lg font-semibold",
                        children: username
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        className: "text-md",
                        children: actionInstance ? actionInstance.fullName : ""
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-center gap-4 my-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: `mailto:${actionInstance?.email}`,
                                className: `button ${!actionInstance?.email ? "opacity-50 cursor-not-allowed" : ""}`,
                                disabled: !actionInstance?.email,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_4__.Mail, {
                                    title: "Email"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: `https://wa.me/${actionInstance?.phoneNumber}`,
                                className: `button ${!actionInstance?.phoneNumber ? "opacity-50 cursor-not-allowed" : ""}`,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                disabled: !actionInstance?.phoneNumber,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_4__.Phone, {
                                    title: "Phone Number"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "px-4 py-2 bg-slate-200 my-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: actionInstance.bio
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-wrap px-4 my-4 gap-4",
                        children: [
                            " ",
                            actionInstance && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Follower Count"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.followerCount.toLocaleString()
                                            }),
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Following Count"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.followingCount.toLocaleString()
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Post Count"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.postCount.toLocaleString()
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Engagement Rate"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                children: [
                                                    (actionInstance.er * 100).toFixed(2),
                                                    " %"
                                                ]
                                            }),
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Average Comments"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.avgComments.toFixed(2)
                                            }),
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Average Likes"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.avgLikes.toFixed(2)
                                            }),
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Average Views"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.avgViews.toFixed(2)
                                            }),
                                            " "
                                        ]
                                    }),
                                    actionInstance.erOfReach != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-blue-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "ER of Reach"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                children: [
                                                    (actionInstance.erOfReach * 100).toFixed(2),
                                                    " %"
                                                ]
                                            })
                                        ]
                                    }),
                                    actionInstance.avgReelsPlay30d != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-green-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Average Reels Plays (30d)"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.avgReelsPlay30d.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.avgReach != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-purple-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Average Reach"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.avgReach.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.storyReach != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-yellow-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Story Reach"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.storyReach.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.imageReach != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-pink-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Image Reach"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.imageReach.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.reelsReach != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-indigo-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Reels Reach"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.reelsReach.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.imageEngagementRate != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-teal-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Image Engagement Rate"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                children: [
                                                    (actionInstance.imageEngagementRate * 100).toFixed(2),
                                                    " %"
                                                ]
                                            })
                                        ]
                                    }),
                                    actionInstance.reelsEngagementRate != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-orange-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Reels Engagement Rate"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                children: [
                                                    (actionInstance.reelsEngagementRate * 100).toFixed(2),
                                                    " %"
                                                ]
                                            })
                                        ]
                                    }),
                                    actionInstance.imgAvgLikes != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-lime-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Image Average Likes"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.imgAvgLikes.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.reelsAvgLikes != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-amber-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Reels Average Likes"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.reelsAvgLikes.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.imageAvgComments != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-cyan-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Image Average Comments"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.imageAvgComments.toFixed(2)
                                            })
                                        ]
                                    }),
                                    actionInstance.reelsAvgComments != null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-4 py-2 my-2 bg-emerald-500 text-white rounded-lg shadow-md",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: "Reels Average Comments"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: actionInstance.reelsAvgComments.toFixed(2)
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "bg-red-500 text-white px-4 py-3 rounded relative",
            role: "alert",
            children: "Invalid Instagram Username or Not an Instagram page"
        })
    });
}
;


/***/ }),

/***/ 362:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Lists)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(423);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lucide_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(617);




function Lists() {
    const [lists, setLists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [newListName, setNewListName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [currentList, setCurrentList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // For the modal
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchLists = async ()=>{
            const allLists = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .readAllLists */ .wy)();
            console.log("allLists:", allLists);
            console.log("currentList:", currentList);
            setLists(allLists);
        };
        fetchLists();
    }, []);
    const handleAddList = async ()=>{
        0;
        const newList = {
            id: Date.now(),
            name: newListName,
            items: [],
            updatedAt: Date.now()
        };
        const constructInstagramUrl = (username)=>`https://www.instagram.com/${username}`;
        await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .upsertList */ .C$)(newList);
        const updatedLists = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .readAllLists */ .wy)();
        setLists(updatedLists);
        setNewListName("");
    };
    const updateList = async (id, newName)=>{
        const listToUpdate = lists.find((list)=>list.id === id);
        const updatedList = {
            ...listToUpdate,
            name: newName,
            updatedAt: Date.now()
        };
        await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .upsertList */ .C$)(updatedList);
        const updatedLists = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .readAllLists */ .wy)();
        setLists(updatedLists);
        setCurrentList(updatedList);
    };
    const deleteList = async (id)=>{
        // TODO: Implement a delete function in db.js and call it here
        await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .deleteListFromDB */ ._h)(id);
        const updatedLists = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .readAllLists */ .wy)();
        setLists(updatedLists);
        setCurrentList(null);
    };
    // Downloads the list as CSV
    const downloadListAsCSV = (list)=>{
        // Map your list items to CSV format
        const csvContent = list.items.map((item)=>[
                item.username,
                `https://instagram.com/${item.username}`,
                item.fullName,
                item.avgComments,
                item.avgLikes,
                item.avgReach,
                item.followerCount,
                item.followingCount,
                item.imageReach,
                item.imageEngagementRate,
                item.reelsViews,
                item.reelsAvgLikes,
                item.reelsEngagementRate,
                item.reelsReach,
                item.storyReach,
                item.totalComments,
                item.totalEngagement,
                item.totalLikes,
                item.totalViews,
                item.email,
                item.phoneNumber
            ].join(",")).join("\n");
        // Add a header row if needed
        const header = [
            "Username",
            "Instagram URL",
            "Full Name",
            "Average Comments",
            "Average Likes",
            "Average Reach",
            "Follower Count",
            "Following Count",
            "Image Reach",
            "Image Engagement Rate",
            "Reels Views",
            "Reels Average Likes",
            "Reels Engagement Rate",
            "Reels Reach",
            "Story Reach",
            "Total Comments",
            "Total Engagement",
            "Total Likes",
            "Total Views",
            "Email",
            "Phone Number"
        ].join(",");
        const csvFileContent = `data:text/csv;charset=utf-8,${header}\n${csvContent}`;
        // Create a link to download the csv
        const encodedUri = encodeURI(csvFileContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${list.name}.csv`);
        document.body.appendChild(link); // Required for FF
        // Trigger the download
        link.click();
        // Clean up the DOM
        document.body.removeChild(link);
    };
    // Opens the modal to display the list details
    const showListDetails = (list)=>{
        console.log("showListDetails invoked ", list);
        setCurrentList(list);
    };
    // Closes the modal
    const closeListDetails = ()=>{
        setCurrentList(null);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "container mx-auto p-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center mb-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "text",
                        placeholder: "New List Name",
                        className: "p-2 border border-gray-200 rounded flex-grow",
                        value: newListName,
                        onChange: (e)=>setNewListName(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: "ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600",
                        onClick: handleAddList,
                        disabled: !newListName,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.Plus, {
                            className: "w-5 h-5"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: lists.sort((a, b)=>b.updatedAt - a.updatedAt).map((list)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "p-4 mb-2 border border-gray-200 rounded flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "cursor-pointer",
                                onClick: ()=>showListDetails(list),
                                children: list.name
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "p-2 bg-green-500 text-white rounded hover:bg-green-600",
                                        onClick: ()=>downloadListAsCSV(list),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.Download, {
                                            className: "w-5 h-5"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "p-2 bg-red-500 text-white rounded hover:bg-red-600",
                                        onClick: ()=>deleteList(list.id),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.Trash2, {
                                            className: "w-5 h-5"
                                        })
                                    })
                                ]
                            })
                        ]
                    }, list.id))
            }),
            currentList && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",
                id: "my-modal",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-3 text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: "text-lg leading-6 font-medium text-gray-900",
                                children: currentList.name
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mt-2 px-7 py-3",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "space-y-3",
                                    children: currentList.items.length > 0 ? currentList.items.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "text-sm text-gray-500",
                                            children: item.username
                                        }, index)) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        children: "Nothing to display here."
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "items-center px-4 pb-3",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "mx-auto bg-red-500 text-white p-2 rounded hover:bg-red-600",
                                    onClick: closeListDetails,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.XCircle, {
                                        className: "w-5 h-5"
                                    })
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 617:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C$": () => (/* binding */ upsertList),
/* harmony export */   "_h": () => (/* binding */ deleteListFromDB),
/* harmony export */   "wy": () => (/* binding */ readAllLists)
/* harmony export */ });
// db.js
// This is a simple abstraction for IndexedDB operations
const DB_NAME = "chromeInfluencer";
const DB_VERSION = 1;
const LISTS_STORE = "lists";
// Open the IndexedDB
function openDB() {
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event)=>{
            const db = event.target.result;
            if (!db.objectStoreNames.contains(LISTS_STORE)) {
                // Object store for lists will now also include a listName and an items array
                db.createObjectStore(LISTS_STORE, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };
        request.onerror = (event)=>{
            reject("Database error: " + event.target.errorCode);
        };
        request.onsuccess = (event)=>{
            resolve(event.target.result);
        };
    });
}
// Read all lists from the store
async function readAllLists() {
    const db = await openDB();
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction([
            LISTS_STORE
        ], "readonly");
        const objectStore = transaction.objectStore(LISTS_STORE);
        const request = objectStore.getAll();
        request.onerror = (event)=>{
            reject("Error fetching data: " + event.target.errorCode);
        };
        request.onsuccess = (event)=>{
            resolve(event.target.result);
        };
    });
}
// Insert or update a list in the store
async function upsertList(list) {
    const db = await openDB();
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction([
            LISTS_STORE
        ], "readwrite");
        const objectStore = transaction.objectStore(LISTS_STORE);
        const request = objectStore.put(list);
        console.log("Attempting to write list:", list);
        request.onerror = (event)=>{
            reject("Error writing data: " + event.target.errorCode);
        };
        request.onsuccess = ()=>{
            resolve();
        };
    });
}
// More functions can be added here to interact with other data in the IndexedDB
async function deleteListFromDB(id) {
    const db = await openDB();
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction([
            LISTS_STORE
        ], "readwrite");
        const objectStore = transaction.objectStore(LISTS_STORE);
        const request = objectStore.delete(id);
        request.onerror = (event)=>{
            reject("Error deleting data: " + event.target.errorCode);
        };
        request.onsuccess = ()=>{
            resolve();
        };
    });
}


/***/ })

};
;