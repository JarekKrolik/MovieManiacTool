import {createTransport,} from 'nodemailer'

export const sendVerEmail =  (email:string,verificationCode:number)=>{



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
        subject: 'Weryfikacja konta MovieManiac',
        text: `Poprawna rejestracja konta, aby dokończyć proces podaj ten kod przy kolejnym logowaniu : ${verificationCode} `,

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
