import { Router } from 'express';
const router = Router();
import passport from 'passport';
import { changePassword, changeProfile } from './../controllers/user.controller';
import { checkPasswordChangeRequest } from './../middlewares/editProfile.midlleware';

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('success');
});

router.post('/changePwd', passport.authenticate('jwt', { session: false }), checkPasswordChangeRequest, changePassword);
router.post('/changeProfile', passport.authenticate('jwt', { session: false }), changeProfile);

export default router;