const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});
const sluggify = (title) =>{
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}
const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('open', 'closed')
    }
  });
  Page.beforeValidate((pageInstance) => {
    pageInstance.slug = sluggify(pageInstance.title)
    console.log("its sluggifying")
  })
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  Page.belongsTo(User, { as: 'author' });

module.exports = {
  db, Page, User
}
