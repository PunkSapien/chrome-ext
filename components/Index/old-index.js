// import { useEffect } from 'react';
// import styles from '../../styles/Pages.module.css';

// export default function Index({ navigateToPage }) {
//   useEffect(() => {
//     // Use console.log to check if you can access parts of the UI
//     const options = {
//       method: 'GET',
//       headers: {
//         cookie: 'mid=Y3o6mgAEAAEsaNsgaCx_Ao3owPjy; ig_did=4163E494-19D8-439F-A04C-2F00DC381D92; datr=ddJ6YyrlRPuDSw8A9tNDX-Ar; dpr=2.200000047683716; ig_nrcb=1; csrftoken=ouXykei15LQdtOxTb7ygP5ahsGK0ZncH; ds_user_id=53540676861; shbid="4642\\x2C53540676861\\x2C1728140886:01f7fd69c82b9b9fc9a6424a4421c1d616ef3f106dad6c5a8405b740a0363d87cde57eea"; shbts="1696604886\\x2C53540676861\\x2C1728140886:01f7d47602639136263c5458c56ee50cf2382404728a40367af4481eefbc5d9129bcc136"; sessionid=53540676861%3AV6zfdUBROMOpJE%3A28%3AAYeeRRj5Eb1RgxbnxCaOQI3s9j_PsiRb49aSdVa8il0; rur="CLN\\x2C53540676861\\x2C1728274418:01f7397d9df4741f54f31eca6ac14765fa4110192dddf6d3b63861ba6f1c6417ee7c0374"',
//         authority: 'www.instagram.com',
//         accept: 'application/json, text/plain, */*',
//         'accept-language': 'en-US,en;q=0.9',
//         dnt: '1',
//         'sec-ch-ua': '"Chromium";v="117", "Not;A=Brand";v="8"',
//         'sec-ch-ua-mobile': '?0',
//         'sec-ch-ua-platform': '"macOS"',
//         'sec-fetch-dest': 'empty',
//         'sec-fetch-mode': 'cors',
//         'sec-fetch-site': 'none',
//         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
//         'x-asbd-id': '198387',
//         'x-csrftoken': 'ouXykei15LQdtOxTb7ygP5ahsGK0ZncH',
//         'x-ig-app-id': '936619743392459',
//         'x-ig-www-claim': 'hmac.AR2_6X5WHvWhzlMyUBTI3QRb45iMqEqnTJCbAgi8guhQ73z-',
//         'x-instagram-ajax': '1',
//         'x-requested-with': 'XMLHttpRequest'
//       }
//     };

//     fetch('https://www.instagram.com/trashcanpaul?__a=1&__d=dis', options)
//       .then(response => response.json())
//       .then(response => console.log(response))
//       .catch(err => console.error(err));
//   }, []);
//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <h1 className={styles.title}>NEXT-CHROME-STARTER</h1>
//         <p className={styles.description}>
//           This is an example of a Browser Extension built with NEXT.JS. Please
//           refer to the GitHub repo for running instructions and documentation
//         </p>
//         <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
//         <p>{"[ - This is Index page content - ]"}</p>
//         <p onClick={() => navigateToPage('new')}>{"Go to New Page >"}</p>
//       </main>
//     </div>
//   );
// }
