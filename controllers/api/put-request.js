const router = require('express').Router();
const { User } = require("../../models");



            
router.put('/user', async (req, res) => {
  try {
        console.log(req.body)
        const dbUserData = await User.update(req.body, {
          where: {
              id: req.session.data.id
          },
        });
        let rowsAffected = dbUserData[0];
                
        if (rowsAffected === 0) {
          res.status(404).json({ message: 'There are no accounts with this user information' });
          return;
        }
                
        res.status(200).json(dbUserData);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});
module.exports = router;
