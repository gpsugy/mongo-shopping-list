import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URL, PORT } from './config';
import { Item } from './models/item';
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

let runServer = (callback) => {
  mongoose.connect(DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    app.listen(PORT, () => {
      console.log('Listening on localhost:' + PORT);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main == module) {
  runServer((err) => {
    if (err) {
      console.error(err);
    }
  });
};

app.get('/items', (req, res) => {
  Item.find((err, items) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.json(items);
  });
});

app.post('/items', (req, res) => {
  Item.create({
    name: req.body.name
  }, (err, item) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(item);
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found'
  });
});

export { app, runServer };
