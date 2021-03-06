const moment = require("moment");

module.exports = {
  createSubforum: async (req, res) => {
    const db = req.app.get("db"),
      { user_id } = req.session.user,
      {
        subforum_name,
        subforum_img,
        subforum_banner,
        rules_section,
        description,
      } = req.body,
      cake_day = moment().format("LL"),
      subforum = await db.subforum.create_subforum(
        subforum_name,
        user_id,
        subforum_img,
        subforum_banner,
        rules_section,
        description,
        cake_day
      );
    if (!subforum) {
      return res.status(404).send(`Something went wrong, enter info again!`);
    }
    return res.status(200).send(subforum);
  },
  getSubforums: async (req, res) => {
    const db = req.app.get("db");
    const subforums = await db.subforum.get_subforums();
    if (!subforums) {
      return res
        .status(500)
        .send(`Couldn't get subforums, we're working on that!`);
    }
    return res.status(200).send(subforums);
  },
  getSingleSubforum: async (req, res) => {
    const db = req.app.get("db");
    const { subforumId } = req.params;
    const subforum = await db.subforum.get_single_subforum(subforumId);

    if (!subforum) {
      res.status(500).send(`Couldn't retrieve chamber, we're fixing that!`);
    }

    res.status(200).send(subforum);
  },
  getTopCommunities: async (req, res) => {
    const db = req.app.get("db");
    const topCommunities = await db.subforum.get_top_communities();

    if (!topCommunities) {
      res.status(500).send(`Couldn't get communities, we're fixing that!`);
    }

    res.status(200).send(topCommunities);
  },
  getUserSubforums: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

    const userSubforums = await db.subforum.get_user_subforums(user_id);

    res.status(200).send(userSubforums);
  },
  deleteSubforum: async (req, res) => {
    const db = req.app.get("db");
    const { subforumId } = req.params;
    const deleteSubforum = await db.subforum.delete_subforum(subforumId);

    return res.sendStatus(200);
  },
  editSubforum: async (req, res) => {
    const db = req.app.get("db");
    const { subforumId, userId } = req.params;
    const { user_id } = req.session.user;
    const {
      subforum_name,
      subforum_img,
      subforum_banner,
      rules_section,
      description,
    } = req.body;
    const editSubforum = await db.subforum.edit_subforum(
      subforum_name,
      user_id,
      subforum_img,
      subforum_banner,
      rules_section,
      description,
      subforumId
    );
    if (user_id === userId) {
      return res.sendStatus(200).send(editSubforum);
    }
    if (!editSubforum) {
      return res
        .status(500)
        .send(`Unable to edit subforum, we're fixing that!`);
    }
    res.sendStatus(200);
  },
  addSubforumUser: async (req, res) => {
    const db = req.app.get("db");
    const { subforumId } = req.params;
    const { user_id } = req.session.user;
    const newUser = db.subforum.add_subforum_user(user_id, subforumId);

    if (!newUser) {
      return res.status(500).send(`You couldn't join, try again later!`);
    }

    return res.status(200).send(newUser);
  },
  removeSubforumUser: async (req, res) => {
    const db = req.app.get("db");
    const { subforumId } = req.params;
    const { user_id } = req.session.user;
    let removeUser = db.subforum.remove_subforum_user(user_id, subforumId);

    if (req.session.user) {
      return res.status(200).send(removeUser);
    }
    if (!removeUser) {
      return res.status(500).send(`Unable to leave subforum, try again later!`);
    }
  },

  hasJoined: async (req, res) => {
    const db = req.app.get("db");
    const { subforum_id } = req.params;
    const { user_id } = req.session.user;

    const checkJoined = await db.subforum.check_if_user_has_joined(user_id, subforum_id)
    
    if(checkJoined.length === 0){
      return res.status(200).send(`User has not yet joined this chamber.`)
    } else {
        return res.status(500).send(`User has already joined this chamber.`)
    }
  }
};
