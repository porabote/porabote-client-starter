import React from "react";
import {IconType} from "../types";

const ConfigIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.1329 12.2665C19.1766 11.9341 19.2 11.5994 19.2031 11.2641C19.2 10.9289 19.1766 10.5942 19.1329 10.2618L21.303 8.5628C21.401 8.48795 21.468 8.37959 21.4911 8.25846C21.5142 8.13734 21.4919 8.01194 21.4283 7.90626L19.3735 4.34288C19.314 4.236 19.2174 4.15457 19.102 4.11395C18.9866 4.07334 18.8604 4.07633 18.747 4.12236L16.186 5.15479C15.6531 4.74807 15.0704 4.41122 14.4519 4.15243L14.066 1.43104C14.049 1.31062 13.9888 1.20049 13.8966 1.12119C13.8044 1.04189 13.6865 0.998827 13.5649 1.00002H9.44517C9.32356 0.998827 9.20566 1.04189 9.11345 1.12119C9.02124 1.20049 8.96101 1.31062 8.94399 1.43104L8.55809 4.15243C7.93888 4.40961 7.35592 4.74658 6.82401 5.15479L4.25297 4.12236C4.13962 4.07633 4.01336 4.07334 3.89796 4.11395C3.78257 4.15457 3.68601 4.236 3.6265 4.34288L1.57167 7.90626C1.50812 8.01194 1.48577 8.13734 1.50889 8.25846C1.532 8.37959 1.59896 8.48795 1.69696 8.5628L3.86205 10.2618C3.81856 10.5942 3.79513 10.9289 3.79188 11.2641C3.79496 11.5994 3.81839 11.9341 3.86205 12.2665L1.69696 13.9655C1.59896 14.0403 1.532 14.1487 1.50889 14.2698C1.48577 14.391 1.50812 14.5164 1.57167 14.622L3.6265 18.1854C3.68601 18.2923 3.78257 18.3737 3.89796 18.4143C4.01336 18.455 4.13962 18.452 4.25297 18.4059L6.81399 17.3735C7.34689 17.7802 7.92965 18.1171 8.54806 18.3759L8.93397 21.0973C8.95099 21.2177 9.01122 21.3278 9.10343 21.4071C9.19564 21.4864 9.31353 21.5295 9.43515 21.5283H13.5448C13.6664 21.5295 13.7843 21.4864 13.8765 21.4071C13.9687 21.3278 14.029 21.2177 14.046 21.0973L14.4319 18.3759C15.0511 18.1187 15.6341 17.7817 16.166 17.3735L18.727 18.4059C18.8403 18.452 18.9666 18.455 19.082 18.4143C19.1974 18.3737 19.2939 18.2923 19.3535 18.1854L21.4083 14.622C21.4718 14.5164 21.4942 14.391 21.4711 14.2698C21.448 14.1487 21.381 14.0403 21.283 13.9655L19.1329 12.2665ZM11.5 14.8626C10.7881 14.8636 10.0919 14.6534 9.49944 14.2586C8.90702 13.8638 8.44502 13.3021 8.17189 12.6447C7.89876 11.9872 7.82678 11.2636 7.96506 10.5652C8.10335 9.86684 8.44567 9.22519 8.94872 8.72143C9.45178 8.21768 10.093 7.87446 10.7911 7.7352C11.4893 7.59595 12.2131 7.66692 12.8709 7.93913C13.5287 8.21134 14.091 8.67256 14.4866 9.26443C14.8823 9.8563 15.0934 10.5522 15.0934 11.2641C15.0941 11.7365 15.0016 12.2043 14.8214 12.6408C14.6411 13.0774 14.3765 13.4741 14.0427 13.8083C13.709 14.1426 13.3126 14.4077 12.8763 14.5886C12.44 14.7695 11.9723 14.8626 11.5 14.8626Z" stroke={props.fill} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

export default ConfigIcon;