import { Router } from 'express';
const router = Router();
import passport from 'passport';
import { createOrder } from '../controllers/order.controller';
import { changePassword, changeProfile } from './../controllers/user.controller';
import { checkPasswordChangeRequest } from './../middlewares/editProfile.midlleware';

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('success');
});

router.post('/changePwd', passport.authenticate('jwt', { session: false }), checkPasswordChangeRequest, changePassword);
// ! Falta middleware
router.post('/changeProfile', passport.authenticate('jwt', { session: false }), changeProfile);

router.post("/order", passport.authenticate('jwt', {session: false}), createOrder);

export default router;