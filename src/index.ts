import { getExpressApp } from './app';

const port = process.env.PORT || 3001;

getExpressApp()
  .then(({ app }) => {
    app.listen(port);
  })
  .catch(err => console.log(err));
