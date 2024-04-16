import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  MouseEvent,
  ChangeEvent,
  FocusEventHandler,
  useContext
} from "react";
import ObjectMapper from "@/app/collections/ObjectMapper";
import Option from "./Option";
import {SelectOptionValueType, SelectType} from "../types";
import SelectTags from "./SelectTags";
import {RecordType} from "@/services/types";
import {FormContext} from "@/app/form";

const Select = (props: SelectType) => {

  const context = useContext(FormContext);

  const initValue: () => SelectOptionValueType = () => {

    let value: SelectOptionValueType = props.value || "";
    let title: string = props.emptyTitle || "Не выбрано";

    if (!value.length && !props.isEmpty) {
      if (!props.data) {
        return {value, title};
      }
      value = props.data[0]['id'];
      title = value = props.data[0]['name'];
    }

    if (props.isMultiple && Array.isArray(props.value)) {
      value = new Set(props.value);
    }

    if (context) {
      if (context.values[props.name]) {
        value = context.values[props.name];
      }

      context.setValue(props.name, value);
    }

    return {
      value: value || "",
      title,
    };
  }

  const optionTitleRender = (item: any) => {
    if (props.optionTitle) {
      return props.optionTitle;
    }
    return (item: any) => item.name;
  }

  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const [storage, setStorage] = useState<any[]>([]);
  const [storageMap, setStorageMap] = useState({});
  const [options, setOptions] = useState<React.JSX.Element[]>([]);
  const [value, setValue] = useState<SelectOptionValueType>(null);
  const [name] = useState(props.name || "");
  const [optionValueKey] = useState(props.optionValueKey || "id");
  const [optionTitle, setOptionTitle] = useState(optionTitleRender);
  const [label, setLabel] = useState(props.label || "");
  const [isDisabled, setIsDIsabled] = useState(false);
  const [isEmpty] = useState(props.isEmpty || true);
  const [emptyTitle, setEmptyTitle] = useState(null);
  const [seekValue, setSeekValue] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [seekDelay, setSeekDelay] = useState(300);
  const [isMultiple, setIsMultiple] = useState(props.isMultiple || false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpened, setIsOpened] = useState(false);
  const [buttons] = useState(props.buttons || []);
  const [onSelectCallback] = useState(() => props.onSelect || null);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputElement] = useState(props.inputElement || 'input');

  const wrap = useRef() as MutableRefObject<HTMLDivElement>;
  const toggle = useRef() as MutableRefObject<HTMLDivElement>;
  const textInput = useRef() as MutableRefObject<HTMLInputElement>;
  const dropPanel = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {

    let {value, title} = initValue();
    setValue(value);
    setEmptyTitle(title);
    setData();

    setDropPanelWidth();
    setElementPositions();
    setOptionsList();

    return () => {
      //clearStorage([]);
    };

  }, [isStorageLoaded]);

  const setData = async () => {

    if (isStorageLoaded) return;

    let data: any[] = [];
    if (typeof props.setData == "function") {
      data = await props.setData();
    } else if (typeof props.data != "undefined") {
      data = props.data;
    }

    setStorage([...data]);

    let storageMap: Map<any, any> = new Map();
    data.map((item: any, index: number) => storageMap.set(ObjectMapper.get(optionValueKey, item), index));
    setStorageMap(storageMap);

    setIsStorageLoaded(true);

  }

  const clearStorage = () => {
    setStorage([]);
    setStorageMap([]);
  }

  const setOptionsList = async () => {

    let selectedOptionTitle: string | null = null;

    let optionsList: React.JSX.Element[] = storage.map((item: RecordType<any>, index: number): React.JSX.Element => {

      let optionValue = ObjectMapper.get(optionValueKey, item);

      let itemTitle: string = optionTitle(item);
      let isSelected = (value == optionValue) ? true : false;
      if (isSelected) selectedOptionTitle = itemTitle;

      return (
        <Option
          key={optionValue}
          value={optionValue}
          selected={isSelected}
          onSelect={handleOnSelect}
          onSelectMultiple={handleOnSelectMultiple}
          isMultiple={isMultiple}>
          {itemTitle}
        </Option>
      );
    });

    if (selectedOptionTitle && !isMultiple) {
      setInputValue(selectedOptionTitle);
    }

    let emptyOption: React.JSX.Element = setEmptyOption();

    if (isEmpty) {
      setOptions([emptyOption, ...optionsList]);
    }
    setOptions(optionsList);
  }

  const setEmptyOption = () => {

    return (
      <Option
        key={`emptyKey`}
        value=""
        selected={!value ? true : false}
        onSelect={handleOnSelect}
        onSelectMultiple={handleOnSelectMultiple}
        isMultiple={isMultiple}
        storage={storage}
        storageMap={storageMap}
      >
        {emptyTitle || ""}
      </Option>
    );
  }

  const handleOnSelect = (e: MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLInputElement, Element>, params: {
    newValue: SelectOptionValueType,
    title: string | number
  }) => {

    const {newValue, title} = params;

    setValue(newValue);
    setInputValue(title.toString());
    setIsOpened(false);

    setSeekValue("");

    if (context) {
      context.setValue(name, newValue);
    }

    if (typeof onSelectCallback === "function") {
      onSelectCallback(e, {
        ...params,
        storage,
        storageMap,
        newValue,
        context: context,
      });
    }

  }

  const handleOnSelectMultiple = (e: MouseEvent<HTMLDivElement>, params: {
    newValue: SelectOptionValueType,
    title: string | number
  }) => {

    const {newValue, title} = params;

    if (!newValue) return;

    if (value instanceof Set) {
      value.add(newValue);
    }

    setValue(value);
    setIsOpened(false);

    if (context) {
      context.setValue(name, value);//Array.from(value)
    }

  }

  const checkIsDIsabled = () => {
    // let disabled = (props.disabled) ? true : false;
    // if (typeof props.disabled == "function" ) {
    //   disabled = props.disabled(props.context);
    // }
    return false;
  }

  const setElementPositions = () => {
    dropPanel.current.style.top = "36px";
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

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    hideDropPanel();
    if (!inputValue.length && value) {
      handleOnSelect(e, {
        newValue: value,
        title: '',//storage[storageMap[value]],
      });
      setIsInputFocus(false);
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

  const errors = context.validationErrors[props.name];

  return (
    <div className={`form-item ${props.classModifier ? props.classModifier : ''}`}>
      {props.label &&
        <label className="form_item__label">{props.label}</label>
      }
      <div
        className="form-item__select-wrap"
        ref={wrap}
      >
          <span className="form-item__select-custom">
            {inputElement == 'input' &&
              <input
                disabled={isDisabled}
                ref={textInput}
                className="form-item__select-custom__input"
                type="text"
                onChange={onChangeInput}
                onClick={onClickByInput}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                value={((inputValue) ? inputValue : (isInputFocus) ? inputValue : emptyTitle) || ""}
              />
            }

            {inputElement == 'div' &&
              <input readOnly={true} style={{cursor: "pointer"}}
                     ref={textInput}
                     className="form-item__select-custom__input"
                     onChange={onChangeInput}
                     onMouseDown={(e) => {
                       if (isDisabled) return;
                       e.preventDefault();
                       toggleDropList()
                     }}
                     value={((inputValue) ? inputValue : (isInputFocus) ? inputValue : emptyTitle) || ""}
              />
            }

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
      {isMultiple && value instanceof Set &&
        <SelectTags
          key={`tags__${props.name}`}
          name={`tags__${props.name}`}
          context={context}
          setTagTitle={props.setTagTitle}
          storage={storage}
          storageMap={storageMap}
          value={value}
        />
      }

      {errors &&
        <div className="form_item__input_error">{Object.keys(errors).map(errorType => {
          return <span key={errorType}>{errors[errorType]}</span>
        })}</div>
      }
    </div>
  );

}

export default Select;
