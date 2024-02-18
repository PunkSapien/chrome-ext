/*
* @admyre.club
* The following script is responsible for getting all the displayable data on popup screen
* Its entirely based on private api created by us for analytical purposes
*/

const WEBPROFILE_OPTIONS = {
    method: 'GET',
    headers: {
        authority: 'i.instagram.com',
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        dnt: '1',
        'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'none',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'x-asbd-id': '198387',
        'x-csrftoken': 'ouXykei15LQdtOxTb7ygP5ahsGK0ZncH',
        'x-ig-app-id': '936619743392459',
        'x-ig-www-claim': 'hmac.AR2_6X5WHvWhzlMyUBTI3QRb45iMqEqnTJCbAgi8guhQ73z-',
        'x-instagram-ajax': '1',
        'x-requested-with': 'XMLHttpRequest'
    }
}

const feedHashv1 = "e7e2f4da4b02303f74f0841279e52d76";
const likeHash = "e0f59e4a1c8d78d0161873bc2ee7ec44";
const PRIVATE_URL = "https://i.instagram.com/";

const options = {
    method: 'GET',
    headers: {
      authority: 'i.instagram.com',
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      dnt: '1',
      'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'none',
      'x-ig-app-id': '936619743392459',
      'x-instagram-ajax': '1',
      'x-requested-with': 'XMLHttpRequest'
    }
  };

class Post {
    constructor(shortCode, playCount, likeCount, commentCount, displayUrl, captionText) {
        this.shortCode = shortCode;
        this.playCount = playCount;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.displayUrl = displayUrl;
        this.captionText = captionText;
    }
}

export class ActionClass {
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




    webProfileGeneretor(username){
        return `https://www.instagram.com/${username}/?__a=1&__d=dis`;
    }

    async setUserParameters(username){
        let response = await fetch(this.webProfileGeneretor(username, this.WEBPROFILE_OPTIONS));
        let profileIcon = await this.getProfileIcon(username);
        let reachData = await this.reachFinder(username);
        if (!response.ok) {
            this.isValidUsername = false;  // Invalid username or network error
            return null;
        }
        let data = await response.json();
        let icon = await profileIcon.json();
        let reachExtract = await reachData.json();
        if(username === 'direct'){
            this.isValidUsername = false;
            return null;
        }
        if(username == ''){
            this.isValidUsername = false;
            return null;
        }
        else if (data.logging_page_id) {
            this.isValidUsername = true;  // Valid username
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
            this.imgAvgLikes = reachExtract.profiles[0].socialDetails.imageAvgLikes ;
            this.reelsAvgLikes = reachExtract.profiles[0].socialDetails.reelsAvgLikes;
            this.imageAvgComments = reachExtract.profiles[0].socialDetails.imageAvgComments;
            this.reelsAvgComments = reachExtract.profiles[0].socialDetails.reelsAvgComments;
            this.profilePicture = icon.icon_url;
            this.fullName = data.graphql.user.full_name;
            return null;
        }
        this.isValidUsername = false;  // Username exists but is not a valid profile, those kinda cases handled here
        return null;
    }


      metrics(){
        this.totalEngagement = this.totalComments + this.totalViews + this.totalLikes;
        this.avgComments = this.totalComments / this.postArray.length;
        this.avgLikes = this.totalLikes / this.postArray.length;
        this.avgViews = this.totalViews / this.postArray.length;
        this.er = this.totalEngagement / (this.followerCount * this.postArray.length * this.postArray.length);
    }


    async moreContext(baseurl, userid){
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

    async reachFinder(username){
        const response = await fetch(`http://tall-supreme-helenium.glitch.me/reach?username=${username}`);
        return response;
    }

    async fetchFeed_v1(userid, hash, after=""){
        const variables = {
            id: userid,
            first: 50,
            after: after
        };
        const response = await fetch(`https://www.instagram.com/graphql/query?query_hash=${hash}&variables=` + encodeURIComponent(JSON.stringify(variables)), this.FEED_OPTIONS);
        const data = await response.json();
    }

    async fetchLikeCount(shortcode, hash){
        hash = likeHash;
        const variables = {
            shortcode: shortcode,
            first: '0',
            after: ''
        };
        const response = await fetch(`https://www.instagram.com/graphql/query?query_hash=${hash}&variables=` + encodeURIComponent(JSON.stringify(variables)), this.FEED_OPTIONS);
        const data = await response.json();
    }

    async fetchFeed_v2(username, after=""){
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
              "user-agent": getUserAgent(),
            },
          });
        let data = await response.json();
        let items = data.items || [];
            items.forEach(item => {
                const shortCode = item.code;
                const playCount = item.play_count;
                const likeCount = item.like_count;
                const commentCount = item.comment_count;
                const displayUrlArray = item.image_versions2 ? item.image_versions2.candidates.map(candidate => candidate.url) : [];
                const captionText = item.caption ? item.caption.text : "";
                const post = new Post(shortCode, playCount, likeCount, commentCount, displayUrlArray, captionText);
                this.postArray.push(post);
            });

    }


    async fetchFeed_v3(username, num, after="") {
        // this has like count, play count, comment count
        //prefer to invoke this
        const encodedUsername = encodeURIComponent(username);
        for (let i = 0; i < num; i++) {
            const encodedAfter = encodeURIComponent(after);
            const url = `https://www.instagram.com/api/v1/feed/user/${encodedUsername}/username?count=30&max_id=${encodedAfter}`;
            const response = await fetch(url, WEBPROFILE_OPTIONS);
            let data = await response.json();
            //console.log('feed data: ', data)
            // Extracting Posts and adding them to postArray
            let items = data.items || [];
            items.forEach(item => {
                const shortCode = item.code;
                const playCount = item.play_count;
                const likeCount = item.like_count;
                const commentCount = item.comment_count;
                const displayUrlArray = item.image_versions2 ? item.image_versions2.candidates.map(candidate => candidate.url) : [];
                const captionText = item.caption ? item.caption.text : "";
                const post = new Post(shortCode, playCount, likeCount, commentCount, displayUrlArray, captionText);
                this.postArray.push(post);
            });

            // Assuming next_max_id is present at the root of the response object.
            after = data.next_max_id;
            if (!after) break;  // Break if there's no next_max_id to prevent infinite loop
        }
    }
    async newFeed(username){
        const options = {
            method: 'GET',
            headers: {
                cookie: 'mid=Y3o6mgAEAAEsaNsgaCx_Ao3owPjy; ig_did=4163E494-19D8-439F-A04C-2F00DC381D92; datr=ddJ6YyrlRPuDSw8A9tNDX-Ar; dpr=2.200000047683716; ig_nrcb=1; csrftoken=ouXykei15LQdtOxTb7ygP5ahsGK0ZncH; ds_user_id=53540676861; shbid="4642\\x2C53540676861\\x2C1728140886:01f7fd69c82b9b9fc9a6424a4421c1d616ef3f106dad6c5a8405b740a0363d87cde57eea"; shbts="1696604886\\x2C53540676861\\x2C1728140886:01f7d47602639136263c5458c56ee50cf2382404728a40367af4481eefbc5d9129bcc136"; sessionid=53540676861%3AV6zfdUBROMOpJE%3A28%3AAYeeRRj5Eb1RgxbnxCaOQI3s9j_PsiRb49aSdVa8il0; rur="CLN\\x2C53540676861\\x2C1728274418:01f7397d9df4741f54f31eca6ac14765fa4110192dddf6d3b63861ba6f1c6417ee7c0374"',
              authority: 'www.instagram.com',
              accept: '*/*',
              'accept-language': 'en-US,en;q=0.9',
              dnt: '1',
              dpr: '2.2',
              referer: 'https://www.instagram.com/',
              'sec-ch-prefers-color-scheme': 'light',
              'sec-ch-ua': '"Not=A?Brand";v="99", "Chromium";v="118"',
              'sec-ch-ua-full-version-list': '"Not=A?Brand";v="99.0.0.0", "Chromium";v="118.0.5993.70"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-model': '""',
              'sec-ch-ua-platform': '"macOS"',
              'sec-ch-ua-platform-version': '"14.0.0"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
              'viewport-width': '1358',
              'x-asbd-id': '129477',
              'x-csrftoken': 'ouXykei15LQdtOxTb7ygP5ahsGK0ZncH',
              'x-ig-app-id': '936619743392459',
              'x-ig-www-claim': 'hmac.AR2_6X5WHvWhzlMyUBTI3QRb45iMqEqnTJCbAgi8guhQ71PU',
              'x-requested-with': 'XMLHttpRequest'
            }
          };

          await fetch(`https://www.instagram.com/api/v1/feed/user/${username}/username?count=30&max_id=`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Assuming the data structure is similar to that in fetchFeed_v3
            let items = data.items || [];
            items.forEach(item => {
                const shortCode = item.code;
                const playCount = item.play_count;
                const likeCount = item.like_count;
                const commentCount = item.comment_count;
                const displayUrlArray = item.image_versions2 ? item.image_versions2.candidates.map(candidate => candidate.url) : [];
                const captionText = item.caption ? item.caption.text : "";
                const post = new Post(shortCode, playCount, likeCount, commentCount, displayUrlArray, captionText);
                this.postArray.push(post);
            });

            // Log the posts to the console
            //console.log(this.postArray);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
    calculateTotals() {
        this.totalComments = 0;
        this.totalLikes = 0;
        this.totalViews = 0;

        this.postArray.forEach(post => {
            if(post.commentCount != undefined){this.totalComments += post.commentCount;}
            if(post.likeCount != undefined){this.totalLikes += post.likeCount;}
            if(post.playCount != undefined){this.totalViews += post.playCount;}
        });
    }

    async fetchAnyFeed(which, after){
        switch(which){
            case v1:
                return await this.fetchFeed_v1(this.userid, feedHashv1, after);
            case v2:
                return await this.fetchFeed_v2(this.username, after);
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getProfileIcon(username){
        const response = await fetch(`http://tall-supreme-helenium.glitch.me/?username=${username}`);
        return response;
    }

    async solve() {
        console.log("entering midtown")
        await this.setUserParameters(this.username);
        if (this.isValidUsername) {
          // Start both API calls, but don't wait for them to complete yet
          console.log("there is a problem here somewhere")
          const newFeedPromise = this.newFeed(this.username);
          const moreContextPromise = this.moreContext(PRIVATE_URL, this.userid);
          await this.getProfileIcon(this.username);
          // Wait for both promises to complete
          await Promise.all([newFeedPromise, moreContextPromise]);

          // Perform other synchronous tasks after both promises are resolved
          this.calculateTotals();
          this.metrics();
        }
        //console.log('heres final data: ', this);
        return;
      }



}


// function webProfileInfo(username) {
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
