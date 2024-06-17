const nodemailer = require('nodemailer');

// Function to send email
const sendWelcomeEmail = async (toEmail) => {
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'shvwxyz05@gmail.com', // Your email
        pass: 'jqpr nran qhfk ohrs'  // Your email password or app-specific password
      }
    });

    // Email options
    let mailOptions = {
      from: '"Thought Bank" <shvwxyz05@gmail.com>', // sender address
      to: 'gshvamsi@gmail.com' , // list of receivers
      subject: 'Welcome to Thought Bank', // Subject line
      html: `
        <html>
          <body>
            <p>Welcome to Thought Bank!<br>
               Please visit our website by clicking on the link below:<br>
               <a href="http://www.thoughtbank.com">Thought Bank</a>
            </p>
          </body>
        </html>
      ` // HTML body
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendWelcomeEmail;
