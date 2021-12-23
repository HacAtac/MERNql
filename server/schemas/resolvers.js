const { User, Thought } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth"); //this will be used to create the token and send it back to the client.
// { signToken } is a method that we created in utils/auth.js

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({})
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }
      throw new AuthenticationError("You must be logged in to view this data");
    },

    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {}; //this is how we pass in a query param we could have named it anything but  params makes it easier to read
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    //get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    //get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user); //we put this here because we want to sign the token after the user is created
      //we pass in the user object because we want to send back the user object with the token

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credintials");
      }
      const token = signToken(user); //we put this here because we want to sign the token after we have checked the password
      return { token, user };
    },
    addThought: async (parent, args, context) => {
      //what is context param? // it is the context object that we pass into the resolvers
      // in easy words its the jwt token that we get from the client and we use it to get the user id
      //and then we can use that to create a thought for that user id
      //were basically saying that we want to create a thought for the user that is logged in
      //and were verifying that the user is logged in by checking the context object with the jwt token
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
        return thought;
      }
      throw new AuthenticationError("You must be logged in to do that");
    },
    addReaction: async (parent, args, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              reactions: { reactionBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedThought;
      }
      throw new AuthenticationError("You must be logged in to do that");
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate;

        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in to do that");
    },
  },
};

module.exports = resolvers;
