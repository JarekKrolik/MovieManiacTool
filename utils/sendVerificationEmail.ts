import {createTransport,} from 'nodemailer'

export const sendVerEmail =  (email:string,id:string)=>{


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
    const link =`http://localhost:3001/verify/${id}`
    const mailOptions = {
        from: 'madmax@onet.eu',
        to: email,
        subject: 'Weryfikacja konta MovieManiac',
        text: `Aby dokończyć rejestrację w aplikacji MovieManiac kliknij w link : `,
        html:'<a href=>kliknij aby potwierdzić konto</a>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
