import React from 'react'
import Datas from 'porabote/datas'
import { TooltipForm } from 'porabote/tooltip'

const InputBare = (props) => {

    return(
      <span style={{position: 'relative'}}>
                {/*{state.tooltip && <TooltipForm display={state.isTooltipDisplayed}></TooltipForm>}*/}
        <input
          disabled={props.disabled || false}
          type={props.type || 'text'}
          value={props.value}
          placeholder={props.placeholder}
          name={props.name}
          onChange={(e) => {

            if (props.formContext.entity) {
              props.formContext.setAttribute(props.name, e.target.value);
            }

            if (typeof props.onChange === "function") {
              props.onChange(e.target.value, props.formContext, props);
            }
          }}
          onMouseEnter={() => {
            // setState({
            //   isTooltipDisplayed: 'block'
            // })
          }}
          onMouseLeave={() => {
            // setState({
            //   isTooltipDisplayed: 'none'
            // })
          }}
          onKeyUp={(e) => {
            if (typeof props.onKeyUp === "function") {
              props.onKeyUp(e, {
                name: props.name,
                value: e.target.value,
                formContext: props.formContext
              })
            }
          }}
          className={props.className || 'input-mini'}
          autoComplete='off'
          style={props.style || {}}
        />
            </span>
    );

}

export default InputBare
