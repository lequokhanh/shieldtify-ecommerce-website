const { AppError } = require('../errors/AppError');
const db = require('../../models');

const findAllSubPosts = async (uid) => {
    const posts = await db.sequelize.query(
        `
        select posts.*, count(upvotes.postid) as upvotes, count(downvotes.postid) as downvotes
        from posts
        left join votes as upvotes on posts.uid = upvotes.postid and upvotes.type = 'upvote'
        left join votes as downvotes on posts.uid = downvotes.postid and downvotes.type = 'downvote'
        where posts.parent_post = '${uid}'
        group by posts.uid
    `,
        { type: db.Sequelize.QueryTypes.SELECT },
    );
    for (const post of posts) {
        delete post.parent_post;
        delete post.title;
        let subPosts = await findAllSubPosts(post.uid);
        if (subPosts.length > 0) post.children_posts = subPosts;
    }
    return posts;
};

module.exports = (server) => {
    const io = require('socket.io')(server);
    io.of('/post').on('connection', async (socket) => {
        let interval;
        socket.on('get-data', (data) => {
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(async () => {
                const post = await db.sequelize.query(
                    `
                    select posts.*, count(upvotes.postid) as upvotes, count(downvotes.postid) as downvotes
                    from posts
                    left join votes as upvotes on posts.uid = upvotes.postid and upvotes.type = 'upvote'
                    left join votes as downvotes on posts.uid = downvotes.postid and downvotes.type = 'downvote'
                    where posts.uid = '${data.uid}'
                    group by posts.uid
                    `,
                    { type: db.Sequelize.QueryTypes.SELECT },
                );

                post[0].children_posts = await findAllSubPosts(post[0].uid);
                socket.emit('data', post);
            }, 5000);
        });
        socket.on('disconnect', () => {
            clearInterval(interval);
        });
    });
    return io;
};
