const { resolve } = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const nodemailerhbs = require('nodemailer-express-handlebars');
const mailConfig = require('../../config/mail');

module.exports = {
  async Send({ id, email, name }) {
    const { host, port, secure, auth } = mailConfig;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    const viewPath = resolve(__dirname, '..', '..', 'app', 'views', 'emails');

    transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );

    await transporter.sendMail({
      to: email,
      subject: 'ID de acesso',
      template: 'register',
      context: { id, name },
    });
  },
};
