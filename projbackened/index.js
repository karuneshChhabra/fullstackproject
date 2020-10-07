const express = require('express');
const mongoose = require('mongoose');
const app =express();



const BlogPost = new mongoose.Schema({
    author: String,
    title: String,
    body: String,
    date: Date
  });

  

