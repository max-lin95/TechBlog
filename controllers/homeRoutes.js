const router = require('express').Router();
const sequelize = require('../config/connection');
const { posts, user, comments } = require('../models');

