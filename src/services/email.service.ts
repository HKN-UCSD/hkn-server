import * as SendGridMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
 * Send one or more emails to one or more respective recipients
 * for each of those emails
 *
 * TODO: Add logging when there is a logging set up
 */
const _sendEmails = async (
  emailInfoArr: SendGridMail.MailDataRequired[]
): Promise<void> => {
  const [
    {
      to,
      dynamicTemplateData,
      templateId,
      cc,
      bcc,
      sendAt,
      ...additionalFields
    },
    ...additionalEmailInfoObjs
  ] = emailInfoArr;

  const emailsToSend = [
    {
      to,
      dynamicTemplateData,
      templateId,
      cc,
      bcc,
      sendAt,
      ...additionalFields,
    },
    ...additionalEmailInfoObjs,
  ];

  await SendGridMail.send(emailsToSend, true);
};
