import React from "react";
import {IconType} from "../icons/types";

const HrIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C8.96243 1.5 6.5 3.96243 6.5 7C6.5 10.0376 8.96243 12.5 12 12.5C15.0376 12.5 17.5 10.0376 17.5 7C17.5 3.96243 15.0376 1.5 12 1.5ZM8.5 7C8.5 5.067 10.067 3.5 12 3.5C13.933 3.5 15.5 5.067 15.5 7C15.5 8.933 13.933 10.5 12 10.5C10.067 10.5 8.5 8.933 8.5 7Z" fill={props.fill}/>
      <path d="M7.49219 17.3076C6.29665 18.566 5.625 20.2729 5.625 22.0526H3.5C3.5 21.3741 3.57322 20.7036 3.71504 20.0526C4.06923 18.4271 4.85133 16.9241 5.98959 15.7259C7.58365 14.0479 9.74566 13.1053 12 13.1053C14.2543 13.1053 16.4163 14.0479 18.0104 15.7259C19.1487 16.9241 19.9308 18.4271 20.285 20.0526C20.4268 20.7035 20.5 21.3741 20.5 22.0526H18.375C18.375 20.2729 17.7033 18.566 16.5078 17.3076C15.3123 16.0491 13.6908 15.3421 12 15.3421C10.3092 15.3421 8.68774 16.0491 7.49219 17.3076Z" fill={props.fill}/>
    </svg>
  );
}

export default HrIcon;