import nodemailer from "nodemailer";
import htmlToFormattedText from "html-to-formatted-text";

// нужно будет установить smtp-сервер и протестировать рассылку почты
// TODO p.156 B.Itan; p.112 B.Griggs
const sendMail = () => {
  const mailTtransport = nodemailer.createTransport({
    host: "0.0.0.0",
    port: "25",
    tls: {
      // для самоподписанных сертификатов
      rejectUnauthorized: false
    },
    auth: {
      user: "testuser",
      pass: "testpass"
    }
  });

  const from = '"FineVideo" <info@finevideo.com>';
  const errorRecipient = "mymail@mail.ru";

  return {
    send: (to, subject, html) => {
      try {
        mailTtransport.sendMail(
          {
            from,
            to,
            subject,
            html,
            text: htmlToFormattedText(html)
          },
          (err, info) => {
            if (err) console.error("Ошибка при отправке почты.", err.message);
            console.log("Message sent:", info);
          }
        );
        console.log("Success send mail");
      } catch (e) {
        mailTtransport.sendMail({
          from,
          to: errorRecipient,
          subject: "Ошибка отправки",
          html: to + "сообщение не доставлено.",
          text: htmlToFormattedText(html)
        });
        console.log("Not send mail", +e.message);
      }
    }
  };
};

export default sendMail;

// Применение:
// import sendMail from "lib/email.js"
const emailService = sendMail();
emailService.send("email@mail.ru", "Header", "<h1>Hello</h1><p>It is me.</p>");
