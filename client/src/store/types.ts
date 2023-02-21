export interface IValidation<T> {
  username: T;
  phone: T;
  email: T;
  password: T;
}

export type TValidationField = {
  value: string;
  isValid: boolean;
  isAlert: boolean;
  readonly regex: RegExp;
  readonly placeholder: string;
  readonly alert: string;
  modify: (this: TValidationField) => void;
  maxLength?: string;
};

export type TModifyFunc = (this: TValidationField) => void;
