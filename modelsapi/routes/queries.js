const express = require('express')
const router = express.Router()

const query = require('../models/queryinst')
const Maria = require('../public/mariadb')