import React from "react";
import { useQuery } from "@apollo/client"; // were using the useQuery hook to get the data from the server
import ThoughtList from "../components/ThoughtList";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";

const Home = () => {
  // use useQuery hook to make a query request to the server and get the data from the server
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more desc
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? ( //loading ? is a conditional statement that checks if the data is loading or not
            <div>Loading...</div>
          ) : (
            // ) : ( is a conditional statement that checks if the data is loading or not
            //and if it is not loading then it will render the data
            // if it is loading then it will render the loading message
            <ThoughtList //were calling the ThoughtList component and passing in the data from the server to the component
              //the data from the server is the thoughts array that we are getting from the server and we are passing it in as thoughts
              //basically were using React hooks to get the data from the server and we are passing it in as thoughts
              thoughts={thoughts}
              title="Some Feed for Thought(s)... "
            />
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
