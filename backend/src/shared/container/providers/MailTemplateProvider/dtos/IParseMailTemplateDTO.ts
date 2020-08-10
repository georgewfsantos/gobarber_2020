interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IparseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
