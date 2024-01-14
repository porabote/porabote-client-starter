import React, {useState, useEffect, useRef, MutableRefObject, MouseEvent, ChangeEvent, MouseEventHandler} from "react";
import ArrayMapper from "@/app/Collections/ArrayMapper";
import Option, {OptionProps} from "./Option";
import {FormContextInterface} from "../FormContext";
import SelectTags from "./SelectTags";

type setData = () => { [key: string]: any; }[];

export interface ISelect {
  dataStorage: any[];
  children?: React.ReactElement;
  formContext: FormContextInterface;
  isEmpty?: boolean | undefined;
  emptyTitle?: string | undefined;
  value: string | number | number[] | null;
  label: string;
  name: string;
  options: { props: OptionProps }[] | [];
  optionValueKey: string | number;
  optionTitle: (record: { attributes: {}, relationships: {} }) => string;
  setData: setData;
  isMiltiple?: boolean | undefined;
  setTagTitle?: (value: number | string, dataStorage: any[], dataStorageMap: {}) => string;
  buttons?: [];
  onSelect?: (
    newValue: any,
    formContext: FormContextInterface,
    props: ISelect,
    dataStorage: any[],
    dataStorageMap: any[]
  ) => void | null | undefined; // TODO
};

const Select = (props: ISelect) => {

  const initValue = () => {
    let value: any = props.value || "";
    if (props.isMiltiple && Array.isArray(props.value)) value = new Set(props.value);

    if (props.formContext.entity) {
      props.formContext.entity.setAttribute(props.name, value);
    }

    return value;
  }

  const [isDataStorageLoaded, setIsDataStorageLoaded] = useState(false);
  const [dataStorage, setDataStorage] = useState<{}[]>([]);
  const [dataStorageMap, setDataStorageMap] = useState({});
  const [options, setOptions] = useState<{ props: OptionProps }[] | []>([]);
  const [value, setValue] = useState(null);
  const [name, setName] = useState(props.name || "");
  const [optionValueKey, setOptionValueKey] = useState(props.optionValueKey || "id");
  const [optionTitle] = useState(() => props.optionTitle);
  const [label, setLabel] = useState(props.label || "");
  const [isDisabled, setIsDIsabled] = useState(false);
  const [isEmpty, setIsEmpty] = useState(props.isEmpty || true);
  const [emptyTitle, setEmptyTitle] = useState(props.emptyTitle || "Не выбрано");
  const [seekValue, setSeekValue] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [seekDelay, setSeekDelay] = useState(300);
  const [isMultiple, setIsMultiple] = useState(props.isMiltiple || false);
  const [inputValue, setInputValue] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [buttons] = useState(props.buttons || []);
  const [onSelect] = useState(() => props.onSelect || null);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const wrap = useRef() as MutableRefObject<HTMLDivElement>;
  const toggle = useRef() as MutableRefObject<HTMLDivElement>;
  const textInput = useRef() as MutableRefObject<HTMLInputElement>;
  const dropPanel = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {

    setValue(initValue());
    setData();

    setDropPanelWidth();
    setElementPositions();
    setOptionsList();

    return () => {
      //clearDataStorage([]);
    };

  }, [isDataStorageLoaded, props.value]);

  const setData = async () => {

    if (isDataStorageLoaded) return;

    let data: {}[] = [];
    if (typeof props.setData == "function") {
      data = await props.setData();
    }

    setDataStorage([...data]);

    let dataStorageMap: { [key: number]: number } = {};
    data.map((item: any, index: number) => dataStorageMap[ArrayMapper.getValueByPath(optionValueKey, item)] = index);
    setDataStorageMap(dataStorageMap);

    setIsDataStorageLoaded(true);

  }

  const clearDataStorage = () => {
    setDataStorage([]);
    setDataStorageMap([]);
  }

  const setOptionsList = async () => {

    let selectedOptionTitle: string | null = null;

    let optionsList: any[] = dataStorage.map((item: { [key: string]: any; }, index: number): {} => {

      let optionValue = ArrayMapper.getValueByPath(optionValueKey, item);

      let itemTitle: string = optionTitle({attributes: item.attributes || item, relationships: item.relationships});
      let isSelected = (value == optionValue) ? true : false;
      if (isSelected) selectedOptionTitle = itemTitle;

      return (
        <Option
          key={optionValue}
          value={optionValue}
          selected={isSelected}
          onSelect={onSelectAction}
          onSelectMultiple={onSelectMultiple}
          isMultiple={isMultiple}
          dataStorage={dataStorage}
          dataStorageMap={dataStorageMap}
        >
          {itemTitle}
        </Option>
      );
    });

    if (selectedOptionTitle && !isMultiple) setInputValue(selectedOptionTitle);

    let emptyOption = setEmptyOption();

    setOptions([emptyOption,...optionsList]);
  }

  const setEmptyOption = () => {
    return (
      <Option
        key={`emptyKey`}
        value=""
        selected={!value ? true : false}
        onSelect={onSelectAction}
        onSelectMultiple={onSelectMultiple}
        isMultiple={isMultiple}
        dataStorage={dataStorage}
        dataStorageMap={dataStorageMap}
      >
        {emptyTitle}
      </Option>
    );
  }

  const onSelectAction = (
    newValue: any,
    title: string,
    e: MouseEvent<HTMLDivElement>,
    dataStorage: any[],
    dataStorageMap: any[]
  ) => {

    setValue(newValue);
    setInputValue(title);
    setIsOpened(false);

    setSeekValue("");

    if (props.formContext.entity) {
      props.formContext.entity.setAttribute(name, newValue);
    }

    if (typeof onSelect === "function") {
      onSelect(newValue, props.formContext, {...props}, dataStorage, dataStorageMap);
    }

    //e.preventDefault();
  }

  const onSelectMultiple = (newValue: any, optionProps: OptionProps, e: MouseEvent<HTMLDivElement>) => {

    if (!newValue) return;

    value.add(newValue);
    setValue(value);
    setIsOpened(false);

    if (props.formContext.entity) {
      props.formContext.entity.setAttribute(name, Array.from(value));
    }

  }

  const checkIsDIsabled = () => {
    // let disabled = (props.disabled) ? true : false;
    // if (typeof props.disabled == "function" ) {
    //   disabled = props.disabled(props.formContext);
    // }
    return false;
  }

  const setElementPositions = () => {
    dropPanel.current.style.top = "34px";
  }


  const toggleDropList = () => {
    if (!isOpened) {
      textInput.current.focus();
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }

  const showDropPanel = () => {
    dropPanel.current.style.zIndex = String(1000)
    setIsOpened(true);
  }

  const handleOnFocus = () => {
    showDropPanel();
    setIsInputFocus(true);
  }

  const handleOnBlur = () => {
    hideDropPanel();
    if (!inputValue.length && value) {
      onSelectAction(value, optionTitle(dataStorage[dataStorageMap[value]]), null,dataStorage, dataStorageMap );
      setIsInputFocus(false);
      // console.log(dataStorage);
      // console.log(dataStorage[dataStorageMap[value]]);
    }
  }

  const hideDropPanel = () => {//e: ChangeEvent<HTMLInputElement>
    dropPanel.current.style.zIndex = String(10);
    setIsOpened(false);
  }

  /* Если селект был инициализирован в display:none, обновляем ширину */
  const setDropPanelWidth = () => {
    if (wrap.current && dropPanel.current && wrap.current.offsetWidth !== dropPanel.current.offsetWidth) {
      dropPanel.current.style.width = wrap.current.offsetWidth + "px";
    }
  }

  const buildOptions = () => {

    return options.map((option, index) => {

      //  if (typeof option === "undefined" || typeof option.props === "undefined") return

      if (!checkOnSeek(option.props.children || "")) return;

      // let onSelect = clickByOption;
      // if (mode === "tags") afterSelectCallback = clickByOptionTagsMode

      return option;
      // return React.cloneElement(option, {...option.props, onSelect})
    })

  }

  const checkOnSeek = (value: string | number): boolean => {// | number

    if (typeof value != "string" || !value) return true;

    return (
      value
      && value.length > 0
      && !value.toLowerCase().includes(seekValue)
    ) ? false : true;
  }

  const onClickByInput = (): void => {
    textInput.current.select();
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setSeekValue(e.target.value.toLowerCase());
  }

  let dropStyle = {visibility: "hidden"}

  if (isOpened) {
    dropStyle = {visibility: "visible"}
  }

  let reOptions = buildOptions();

  return (
    <div className="form-item flex no_padding">
      <label className="form-item__label">{label}</label>
      <div
        className="form-item__select-wrap"
        ref={wrap}
      >
          <span className="form-item__select-custom">
              <input
                disabled={isDisabled}
                ref={textInput}
                className="form-item__select-custom__input"
                type="text"
                onChange={onChangeInput}
                onClick={onClickByInput}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                value={(inputValue) ? inputValue : (isInputFocus) ? inputValue : emptyTitle}
              />

              <span
                ref={toggle}
                className="form-item__select-custom__toggle"
                onMouseDown={(e) => {
                  if (isDisabled) return;
                  e.preventDefault();
                  toggleDropList()
                }}
              >
                  <span className="form-item__select-custom__icon"></span>
              </span>

              <div
                style={{visibility: (isOpened) ? "visible" : "hidden"}}
                ref={dropPanel}
                className="form-item__select__drop-blok"
              >
                  <span>
                      {reOptions}
                  </span>

              </div>

            <div className="form-item__select__buttons">
              {/*{buttons.map(item => item)}*/}
            </div>
          </span>
      </div>
      {isMultiple &&
        <SelectTags
          key={`tags__${props.name}`}
          name={`tags__${props.name}`}
          formContext={props.formContext}
          setTagTitle={props.setTagTitle}
          dataStorage={dataStorage}
          dataStorageMap={dataStorageMap}
          value={value}
        />
      }
    </div>
  );

}

export default Select;
