import * as SendGridMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();
SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

/* Send an email to one or more recipients */
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

  try {
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
  } catch (err) {
    throw new Error(err);
  }
};
