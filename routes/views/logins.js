import { Router } from 'express';
import passport from 'passport';

const routerLogV = Router();

routerLogV.get('/login', (req, res) => {
  res.redirect('/login');
});

routerLogV.get('/register', (req, res) => {
  res.redirect('/register');
});

routerLogV.get('/reset-password', (req, res) => {
  res.redirect('/reset-password');
});

routerLogV.get('/profile', (req, res) => {
  res.redirect('/profile');
});

routerLogV.get('/current', (req, res) => {
  res.redirect('/profile');
});

export default routerLogV;