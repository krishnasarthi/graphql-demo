import {
    buildSchema
} from 'graphql';
import {
    MongoClient,
    ObjectId
} from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017/blog'

const prepare = (o) => {
    o._id = o._id.toString()
    return o;
}

let Posts;
let Comments;

const db = MongoClient.connect(MONGO_URL, function (err, db) {
    if (err)
        throw err;
    console.log('connected to the mongodb........');
    Posts = db.collection('posts');
    Comments = db.collection('comments');
});


export const schema = buildSchema(`
    type Query {
        post(_id: String): Post
        posts: [Post]
        comment(_id: String): Comment
    }

    type Mutation {
        createPost(title: String, content: String): Post
        createComment(postId: String, content: String): Comment
    }

    type Post {
        _id: String
        title: String
        content: String
    }

    type Comment {
        _id: String
        postId: String
        content: String
    }
`);

export const resolvers = {
    post: ({
        _id
    }) => {
        return Posts.findOne(ObjectId(_id))
    },
    posts: () => {
        return Posts.find({}).toArray();
    },
    comment: ({
        _id
    }) => {
        return Comments.findOne(ObjectId(_id));
    },
    createPost: ({
        title,
        content
    }) => {
        Posts.insert({
            title: title,
            content: content
        }, function (err, result) {
            console.log(result);
            if (err)
                throw err;
            return Posts.findOne(ObjectId(result.insertedIds[0]));
        });
    },
    createComment: ({
        postId,
        content
    }) => {
        Comments.insert({
            postId: ObjectId(postId),
            content: content
        }, function (err, result) {
            if (err)
                throw err;
            return Comments.findOne(result.insertedIds[0]);
        });
    }
}