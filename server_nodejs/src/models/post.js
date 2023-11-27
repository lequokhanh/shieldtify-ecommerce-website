module.exports = (sequelize, Sequelize) => {
    class Post extends Sequelize.Model {}

    Post.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
            },
            content: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            depth: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            key_words: {
                type: Sequelize.STRING,
            },
            is_edited: {
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'post',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Post.associate = (models) => {
        Post.belongsTo(models.client_account, {
            foreignKey: 'created_by',
        });
        Post.belongsTo(Post, {
            foreignKey: {
                name: 'parent_post',
                allowNull: true,
            },
        });
        Post.hasMany(Post, {
            foreignKey: 'parent_post',
            as: 'children_posts',
        });
        Post.hasMany(models.vote, {
            foreignKey: 'postid',
            as: 'vote',
        });
    };

    return Post;
};
