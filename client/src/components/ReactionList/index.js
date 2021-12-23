import React from "react";
import { Link } from "react-router-dom";

//where is ({reactions}) coming from? // it is coming from via props from the  ThoughtList component
const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Reactions</span>
      </div>
      <div className="card-body">
        {reactions &&
          reactions.map((reaction) => (
            <p className="pill mb-3 key={reaction._id">
              {reaction.reactionBody} {"// "}
              <Link
                to={`/profile/${reaction.username}`}
                style={{ fontWeight: 700 }}
              >
                {reaction.username} on {reaction.createdAt.split("T")[0]}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;
