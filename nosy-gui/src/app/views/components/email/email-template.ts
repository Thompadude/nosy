export class EmailTemplate {
  emailFromProvider: string;
  emailTemplateCc: [string];
  emailTemplateId: string;
  emailTemplateName: string;
  emailTemplateTo: [string];

  fromAddress: string;
  priority: number;

  retryPeriod: number;
  retryTimes: number;

  subject: string;
  text: string;



  constructor(emailFromProvider: string,  emailTemplateName: string, emailTemplateTo: [string],  fromAddress: string, priority: number, retryPeriod: number, retryTimes: number, subject: string, text: string) {
    this.emailFromProvider = emailFromProvider;
    this.emailTemplateName = emailTemplateName;
    this.emailTemplateTo = emailTemplateTo;
    this.fromAddress = fromAddress;
    this.priority = priority;
    this.retryPeriod = retryPeriod;
    this.retryTimes = retryTimes;
    this.subject = subject;
    this.text = text;

  }
  setEmailCc(emailCc){
    this.emailTemplateCc=emailCc;
  }
}
