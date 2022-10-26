import { promises } from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export class HandlebarsMailTemplate {
  static async parse(data: IParseMailTemplate): Promise<string> {
    const templateFileContent = await promises.readFile(data.file, 'utf-8');
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(data.variables);
  }
}
