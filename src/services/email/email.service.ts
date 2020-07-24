import * as SendGridMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

import { EmailInfo, EmailInfoRequired } from './email.definition';

dotenv.config();
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const senderEmail: string = process.env.SENDER_EMAIL_ADDRESS;

/*
 * Send one or more emails to one or more respective recipients
 * for each of those emails
 *
 * TODO: Add logging when there is a logging set up
 */
const _sendEmails = async (emailInfoArr: Array<EmailInfo>): Promise<void> => {
  const emailsToSend = _setFromField(emailInfoArr);
  await SendGridMail.send(emailsToSend, true);
};

const _setFromField = (
  emailInfoArr: Array<EmailInfo>
): Array<EmailInfoRequired> => {
  const setEmailArr = emailInfoArr.map(emailInfo => {
    emailInfo.from = senderEmail;
    return emailInfo as EmailInfoRequired;
  });

  return setEmailArr;
};

const sendEmail = async (email: EmailInfo) => {
  await _sendEmails([email]);
};

export { sendEmail };
