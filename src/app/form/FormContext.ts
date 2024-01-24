import React, { createContext } from "react";
import {FormContextType} from "./types";

const initContextValues = {
  setValue(name: string, number: number | string): void {},
  getValue: (name: string) => {},
  values: {},
  onSubmit: () => {}
};

const formContext: React.Context<FormContextType> = createContext<FormContextType>(initContextValues);

const { Provider: FormProvider, Consumer: FormConsumer } = formContext;

export {
  FormProvider,
  FormConsumer
}
export default formContext;
