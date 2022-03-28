require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());
app.use(fileupload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRouter = require('./routes/user');
const catRouter = require('./routes/cat');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const tagRouter = require('./routes/tag');
const galleryRouter = require('./routes/gallery');

app.use('/users', userRouter);
app.use('/cats', catRouter);
app.use('/tags',tagRouter);
app.use('/posts', postRouter);
app.use('/comments',commentRouter);
app.use('/gallery', galleryRouter);

app.get("*", (req, res) => {
   res.json({ msg: "No route found!" });
});

app.use((err, req, res, next) => {
   err.status = err.status || 200;
   res.status(err.status).json({ con: false, msg: err.message });
})

app.listen(process.env.PORT, console.log(`Server is Running at port ${process.env.PORT}`));
