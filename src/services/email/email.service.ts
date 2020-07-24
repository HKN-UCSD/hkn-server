import * as SendGridMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

import { EmailInfo } from './email.definition';

dotenv.config();
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
 * Send one or more emails to one or more respective recipients
 * for each of those emails
 *
 * TODO: Add logging when there is a logging set up
 */
const _sendEmails = async (emailInfoArr: Array<EmailInfo>): Promise<void> => {
  await SendGridMail.send(emailInfoArr, true);
};
