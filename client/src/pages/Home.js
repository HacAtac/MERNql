import React from "react";
import { useQuery } from "@apollo/client"; // were using the useQuery hook to get the data from the server

import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  // use useQuery hook to make a query request to the server and get the data from the server
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">{/* PRINT THOUGHT LIST */}</div>
      </div>
    </main>
  );
};

export default Home;
