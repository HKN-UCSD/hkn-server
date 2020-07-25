export interface EmailInfo {
  to?: Array<string>;
  from?: string;
  dynamicTemplateData: { [key: string]: any };
  templateId: string;
  cc?: Array<string>;
  bcc?: Array<string>;
  sendAt?: number;
}
