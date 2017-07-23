/* eslint-disable no-console*/
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import colors from 'colors';
// import devServer from './devServer';
import routes from './routes';

dotenv.config(); // dotenv

const app = express();
const secret = process.env.API_SECRET;
const PORT = process.env.PORT || 2700;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('superSecret', secret);

routes(app);

if(process.env.NODE_ENV === 'production') {
  console.log("production");
  
  app.use(express.static('build'));
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../public/index.html'));
  // });
 } //else {
//   console.log("devlopement");
//   devServer(app);
// }

app.listen(PORT, () => {
  console.log(colors.rainbow(`Docster is running on localhost:${PORT}`));
});

module.exports = app;
