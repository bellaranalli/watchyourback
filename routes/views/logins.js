import { Router } from 'express';
import passport from 'passport';

const routerLogV = Router();

routerLogV.get('/login', (req, res) => {
  res.render('login');
});

routerLogV.get('/register', (req, res) => {
  res.render('register');
});

routerLogV.get('/reset-password', (req, res) => {
  res.render('reset-password');
});

routerLogV.get('/profile', (req, res) => {
  res.render('profile');
});

routerLogV.get('/current', (req, res) => {
  res.render('profile');
});

export default routerLogV;