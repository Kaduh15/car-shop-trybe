import 'dotenv/config';
import App from './app';
import connectToDatabase from './Models/Connection';

const PORT = process.env.PORT || 3001;
const app = new App()
connectToDatabase()
  .then(() => {
    app.start(PORT);
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });
