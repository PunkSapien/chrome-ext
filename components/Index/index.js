import React, { useEffect, useState } from 'react';
import { BallTriangle, CirclesWithBar, Dna, FidgetSpinner, Hourglass, InfinitySpin, Puff, RotatingSquare } from "react-loader-spinner";
import { ActionClass } from './content-script';
import { Mail, Phone } from 'lucide-react';


export default function Index({ navigateToPage, setActionGlobal}) {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(null);  // null initially, then true or false
  const [actionInstance, setActionInstance] = useState(null);  // null initially, then the actionInstance object

  useEffect(() => {
    async function fetchData() {
      console.log('fetching data');
      chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        let tab = tabs[0];
        let url = new URL(tab.url);

        if (url.hostname === 'www.instagram.com') {
          let pathParts = url.pathname.split('/').filter(Boolean);
          let username = pathParts[0];
          if (username) {
            setUsername(username);
            let actionInstance = new ActionClass(username);
            console.log("starting to solve")
            await actionInstance.solve();
            console.log("done solving")
            console.log('actionInstance', actionInstance);
            setIsValid(actionInstance.isValidUsername);
            setActionInstance(actionInstance);
            setActionGlobal(actionInstance);
          } else {
            console.log('username is null');
            setIsValid(false);
          }
        } else {
          console.log("Not an Instagram page");
        }
      });
    }

    fetchData();
  }, []); // Dependency array remains empty

return (
<div className="container mx-auto px-4">
  {isValid === null ? (
    <div className="flex justify-center items-center h-screen">
      <Puff color="#1c0a1f" height={100} width={100} />
    </div>
  ) : isValid ? (
    <div className="my-4 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Navigation and Hamburger Menu */}

      {/* Main Content */}
      <div className="p-4 text-center">
        <img className="rounded-full mx-auto mb-4" src={actionInstance ? actionInstance.profilePicture : ''} alt="Profile Pic" width="100" />
        <h3 className="text-lg font-semibold">{username}</h3>
        <h4 className="text-md">{actionInstance ? actionInstance.fullName : ''}</h4>

        {/* Contact Icons */}
        <div className="flex justify-center gap-4 my-4">
            <a
              href={`mailto:${actionInstance?.email}`}
              className={`button ${!actionInstance?.email ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!actionInstance?.email}
            >
              <Mail title="Email" />
            </a>
            <a
              href={`https://wa.me/${actionInstance?.phoneNumber}`}
              className={`button ${!actionInstance?.phoneNumber ? 'opacity-50 cursor-not-allowed' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              disabled={!actionInstance?.phoneNumber}
            >
              <Phone title="Phone Number" />
            </a>
        </div>


        <div className='px-4 py-2 bg-slate-200 my-4'>
          <p>{actionInstance.bio}</p>
        </div>
        {/* Metrics */}
        <div className="flex flex-wrap px-4 my-4 gap-4"> {/* Added gap-4 for spacing between cards */}
  {/* Assuming actionInstance has properties like followerCount, followingCount, etc. */}
  {actionInstance && (
    <>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md"> {/* Added w-full sm:w-auto to prevent stretching on small screens */}
        <p>Follower Count</p>
        <p>{actionInstance.followerCount.toLocaleString()}</p> {/* toLocaleString adds commas for thousands */}
      </div>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md">
        <p>Following Count</p>
        <p>{actionInstance.followingCount.toLocaleString()}</p>
      </div>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md">
        <p>Post Count</p>
        <p>{actionInstance.postCount.toLocaleString()}</p>
      </div>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md">
        <p>Engagement Rate</p>
        <p>{(actionInstance.er * 100).toFixed(2)} %</p> {/* Fixed to 2 decimal places */}
      </div>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md">
        <p>Average Comments</p>
        <p>{actionInstance.avgComments.toFixed(2)}</p> {/* Fixed to 2 decimal places */}
      </div>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md">
        <p>Average Likes</p>
        <p>{actionInstance.avgLikes.toFixed(2)}</p> {/* Fixed to 2 decimal places */}
      </div>
      <div className="px-4 py-2 my-2 bg-red-500 text-white rounded-lg shadow-md">
        <p>Average Views</p>
        <p>{actionInstance.avgViews.toFixed(2)}</p> {/* Fixed to 2 decimal places */}
      </div>
      {actionInstance.erOfReach != null && (
      <div className="px-4 py-2 my-2 bg-blue-500 text-white rounded-lg shadow-md">
        <p>ER of Reach</p>
        <p>{(actionInstance.erOfReach * 100).toFixed(2)} %</p>
      </div>
    )}
    {actionInstance.avgReelsPlay30d != null && (
      <div className="px-4 py-2 my-2 bg-green-500 text-white rounded-lg shadow-md">
        <p>Average Reels Plays (30d)</p>
        <p>{actionInstance.avgReelsPlay30d.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.avgReach != null && (
      <div className="px-4 py-2 my-2 bg-purple-500 text-white rounded-lg shadow-md">
        <p>Average Reach</p>
        <p>{actionInstance.avgReach.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.storyReach != null && (
      <div className="px-4 py-2 my-2 bg-yellow-500 text-white rounded-lg shadow-md">
        <p>Story Reach</p>
        <p>{actionInstance.storyReach.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.imageReach != null && (
      <div className="px-4 py-2 my-2 bg-pink-500 text-white rounded-lg shadow-md">
        <p>Image Reach</p>
        <p>{actionInstance.imageReach.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.reelsReach != null && (
      <div className="px-4 py-2 my-2 bg-indigo-500 text-white rounded-lg shadow-md">
        <p>Reels Reach</p>
        <p>{actionInstance.reelsReach.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.imageEngagementRate != null && (
      <div className="px-4 py-2 my-2 bg-teal-500 text-white rounded-lg shadow-md">
        <p>Image Engagement Rate</p>
        <p>{(actionInstance.imageEngagementRate * 100).toFixed(2)} %</p>
      </div>
    )}
    {actionInstance.reelsEngagementRate != null && (
      <div className="px-4 py-2 my-2 bg-orange-500 text-white rounded-lg shadow-md">
        <p>Reels Engagement Rate</p>
        <p>{(actionInstance.reelsEngagementRate * 100).toFixed(2)} %</p>
      </div>
    )}
    {actionInstance.imgAvgLikes != null && (
      <div className="px-4 py-2 my-2 bg-lime-500 text-white rounded-lg shadow-md">
        <p>Image Average Likes</p>
        <p>{actionInstance.imgAvgLikes.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.reelsAvgLikes != null && (
      <div className="px-4 py-2 my-2 bg-amber-500 text-white rounded-lg shadow-md">
        <p>Reels Average Likes</p>
        <p>{actionInstance.reelsAvgLikes.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.imageAvgComments != null && (
      <div className="px-4 py-2 my-2 bg-cyan-500 text-white rounded-lg shadow-md">
        <p>Image Average Comments</p>
        <p>{actionInstance.imageAvgComments.toFixed(2)}</p>
      </div>
    )}
    {actionInstance.reelsAvgComments != null && (
      <div className="px-4 py-2 my-2 bg-emerald-500 text-white rounded-lg shadow-md">
        <p>Reels Average Comments</p>
        <p>{actionInstance.reelsAvgComments.toFixed(2)}</p>
      </div>
    )}
    </>
  )}
</div>

      </div>

    </div>
  ) : (
    <div className="bg-red-500 text-white px-4 py-3 rounded relative" role="alert">
      Invalid Instagram Username or Not an Instagram page
    </div>
  )}
</div>

);
};

