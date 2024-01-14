import React, { createContext } from "react";
import Entity, {IEntity} from "../models/entity";

export interface FormContextInterface {
  entity?: IEntity | null;
  submit: (...args: any[]) => any;
  setAttribute(name: string, number: number | string): void;
};

const FormContext = createContext<FormContextInterface>({
  setAttribute(name: string, number: number | string): void {
  },
  entity: null,
  submit: () => {}
});

const { Provider: FormProvider, Consumer: FormConsumer } = FormContext;

export {
  FormProvider,
  FormConsumer
}
export default FormContext;
