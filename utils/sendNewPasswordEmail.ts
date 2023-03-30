import {createTransport,} from 'nodemailer'

export const sendNewPasswordEmail = (email: string, password: string) => {

    const message = `<div style="height:100vh;
text-align: center;
background-color: #1c1b1b;
">
<h1 style="min-height: 30vh;
background-color: #1c1b1b;
color: cornflowerblue;
">MovieManiac</h1>
<p style="color:cornflowerblue;
text-align: center;">
  Your new password :
</p>
<h2 style="text-align: center;
color: cornflowerblue;"

>${password}</h2>


</div>`


    const transporter = createTransport({
        host: "smtp.poczta.onet.pl",
        port: 465,
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
        },
        auth: {
            user: 'madmax@onet.eu',
            pass: 'Lastv8interceptor'
        }
    });

    const mailOptions = {
        from: 'madmax@onet.eu',
        to: email,
        subject: 'Reset hasła do konta MovieManiac',
        html: message,

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
