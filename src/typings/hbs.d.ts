declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars";

  declare const template: TemplateDelegate;

  export default template;
}
declare module "*.svg";
declare module "*.png";
