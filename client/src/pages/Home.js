import React from "react";
import { useQuery } from "@apollo/client"; // were using the useQuery hook to get the data from the server
import ThoughtList from "../components/ThoughtList";
import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  // use useQuery hook to make a query request to the server and get the data from the server
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
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
      </div>
    </main>
  );
};

export default Home;
