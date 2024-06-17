import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

smtp_object = smtplib.SMTP('smtp.gmail.com', 587)
smtp_object.ehlo()
smtp_object.starttls()

fromemail = "shvwxyz05@gmail.com"
toemail = "gshvamsi@gmail.com"
password = "jqpr nran qhfk ohrs"  

smtp_object.login(fromemail, password)

sub = "Thought Bank"
message = "Welcome to Thought Bank"

msg = MIMEMultipart()
msg['From'] = fromemail
msg['To'] = toemail
msg['Subject'] = sub
msg.attach(MIMEText(message, 'plain'))  

smtp_object.sendmail(fromemail, toemail, msg.as_string())

smtp_object.quit()