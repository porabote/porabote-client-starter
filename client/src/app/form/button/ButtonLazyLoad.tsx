import React from 'react'

type ButtonLazyLoadProps = {
  offset: number;
  perPage: number;
  count: number;
  fetchData: Function;
};

const ButtonLazyLoad = (props: ButtonLazyLoadProps) => {

  let isActive = (props.offset + props.perPage >= props.count) ? false : true

  let showedCount = (typeof props.offset !== "undefined") ?
    props.offset + props.perPage : 'загрузка';

  return (
    <div>
      <div
        className={isActive ? "button_lazy-load" : "button_lazy-load non-active"}
        onClick={() => {
          if (isActive) {
            props.fetchData();
          }
        }}
      >
        <span key="showed" className="">Показано
            <span className="button_lazy-load__digital">
                {showedCount}
            </span>
                из
            <span key="count" className="button_lazy-load__digital">
                {props.count}
            </span>

        </span>

        показать еще ...

      </div>
    </div>
  )
}

export default ButtonLazyLoad
