const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

