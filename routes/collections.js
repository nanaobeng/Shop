const express = require('express')
const router = express.Router()


const {
    create , collectionById , read , update , remove , list
} = require('../controllers/collections');
const {requireSignin,  isAuth , isAdmin } = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.get('/collection/:collectionId',read)
router.post('/collection/create/:userId', requireSignin, isAdmin , isAuth ,create);
router.put('/collection/:collectionId/:userId', requireSignin, isAdmin , isAuth ,update);
router.delete('/collection/:collectionId/:userId', requireSignin, isAdmin , isAuth ,remove);
router.get('/collections',list)


router.param('collectionId', collectionById)
router.param("userId",userById)

module.exports = router;