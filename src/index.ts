import { getExpressApp } from './app';

const port = process.env.PORT || 3001;

getExpressApp()
  .then(({ app }) => {
    app.get('/.well-known/acme-challenge/:stuff', function(req, res) {
      res.send(
        'lY5ekOW4V3J5Md_RI-p6BKhm4S4wGH_y4aHa9ZTHhM8.XSTt1MkFj-yk3jqAG1v3Bk6iRbzyc_NsGWoLKXSvxqE'
      );
    });
    app.listen(port);
  })
  .catch(err => err);
