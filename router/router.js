const express=require('express');
const router=express.Router();
const controller=require('../controller/controller');

const {auth,checkUser}=require('../middleware/authenticate');

router.get('*',checkUser);
router.get('/signup',controller.signup_get);
router.post('/signup',controller.signup_post);
router.get('/login',controller.login_get);
router.post('/login',controller.login_post);
router.get('/',controller.home);
router.get('/main',auth,controller.main_get)
router.post('/main',controller.main_post);

router.get('/logout',controller.logout);
router.get('/main/:id',controller.route);
router.post('/cards',controller.cards);
router.post('/cards/all',controller.allCards);
router.post('/cards/:id',controller.searchCardsPost);
router.get('/cards/:id',controller.searchCardsGet);
router.get('/mainNoresult/:id',controller.noResult);
// router.get('/main/userId',controller.currentUserId);
router.delete('/main/:id',controller.deleteGroup);
router.post('/addCards',controller.addCards);
router.use('/404',controller.error404);

module.exports=router;
