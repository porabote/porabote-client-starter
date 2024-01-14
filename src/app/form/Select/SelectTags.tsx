import React, {useEffect} from "react";
import {FormContextInterface} from "../FormContext";
import SelectTag from "./SelectTag";

type SelectTagsProps = {
  name: string;
  dataStorage: any[];
  dataStorageMap: {};
  value: Set<number | string>;
  formContext: FormContextInterface;
  setTagTitle?: (value: string | number, dataStorage: any[], dataStorageMap: {}) => string;
};

const SelectTags = (props: SelectTagsProps) => {

  // useEffect(() => {
  //   //console.log(props.dataStorage);
  // }, []);

  const removeTag = (tagValue: number | string) => {
    props.value.delete(tagValue);
    props.formContext.entity?.setAttribute(props.name, props.value, "replace")
  }

  const getTags = () => {

    let tagsElements: any[] = [];

    if (props.value) {
      props.value.forEach((
        itemvalue: string | number,
        valueAgain: string | number,
        set: Set<string | number>
      ) => {
        let element = (typeof props.setTagTitle == "function") ?
          props.setTagTitle(itemvalue, props.dataStorage, props.dataStorageMap)
          : itemvalue;
        tagsElements.push(
          <SelectTag
            child={element}
            removeTag={removeTag}
            value={itemvalue}
            key={itemvalue}
          />
        )
      });
    }

    return tagsElements;
  }

  return (
    <div>
      <div className={props.value && props.value.size ? "select-tags active" : "select-tags"}>
        {getTags().map((item: any) => item)}
      </div>
    </div>
  );

}

export default SelectTags;
