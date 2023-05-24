import { Router } from 'express'
import passport from 'passport';

const routerGH = Router()

routerGH.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login.html' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile');
  });

export default routerGH  