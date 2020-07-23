import { sendEmails } from './services/email.service';
const msg = [
  {
    to: 'gtthai1212@gmail.com',
    from: 'ttgilles@ucsd.edu',
    dynamicTemplateData: {
      name: 'Thai Gillespie',
      sentence: 'The quick brown fox jumps over the lazy dog',
    },
    templateId: 'd-f5a267b4703e489ebc40f22770888b01',
  },
];

const msgArr = [
  {
    to: 'gtthai1212@gmail.com',
    from: 'ttgilles@ucsd.edu',
    subject: 'Testing second time!',
    text: 'Sa, omae no tsumi wo kazaero!',
    html: '<strong>Sa, omae no tsumi wo kazaero!</strong>',
  },
  {
    to: 'gtthai1212@gmail.com',
    from: 'ttgilles@ucsd.edu',
    subject: 'Testing!',
    text: 'Let us see how this goes',
    html: '<strong>Let us see how this goes</strong>',
  },
];
(async () => {
  try {
    await sendEmails(msg);
    await sendEmails(msgArr);
  } catch (err) {
    console.log(err);
  }
})();
