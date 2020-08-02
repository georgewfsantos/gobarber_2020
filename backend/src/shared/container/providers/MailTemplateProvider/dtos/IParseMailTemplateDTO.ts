interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IparseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
