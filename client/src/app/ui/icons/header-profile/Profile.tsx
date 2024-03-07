import React from "react";
import {IconType} from "../types";

const ProfileIcon = (props: IconType) => {

  return (
    <svg width={props.size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5725 3.52447C14.6064 2.54182 13.243 2 11.6521 2C10.0612 2 8.69782 2.54182 7.73176 3.52447C6.76645 4.50636 6.23653 5.88891 6.23653 7.5C6.23653 9.669 7.1809 11.067 8.34969 11.9062C8.57684 12.0692 8.81159 12.2107 9.04841 12.3327C7.74224 12.6916 6.68167 13.3173 5.81818 14.0934C4.45281 15.3205 3.60656 16.8993 3.03642 18.313C2.93314 18.5691 3.05702 18.8604 3.31313 18.9637C3.56923 19.067 3.86056 18.9431 3.96384 18.687C4.50651 17.3414 5.28155 15.9202 6.48662 14.8371C7.67959 13.765 9.32018 13 11.6521 13C13.8321 13 15.4059 13.6685 16.5741 14.6279C17.7521 15.5953 18.5454 16.8816 19.1138 18.1532C19.493 19.0016 18.8275 20 17.7828 20H6.24497C5.96883 20 5.74497 20.2239 5.74497 20.5C5.74497 20.7761 5.96883 21 6.24497 21H17.7828C19.4349 21 20.748 19.3588 20.0268 17.7452C19.4233 16.3952 18.5505 14.9569 17.2088 13.8551C16.4124 13.2011 15.4604 12.6737 14.3204 12.3507C14.9301 12.0136 15.4313 11.5662 15.8301 11.0591C16.693 9.962 17.0677 8.60016 17.0677 7.5C17.0677 5.88891 16.5378 4.50636 15.5725 3.52447ZM14.8594 4.22553C15.6145 4.99364 16.0677 6.11109 16.0677 7.5C16.0677 8.39984 15.7542 9.538 15.0441 10.4409C14.3476 11.3265 13.2608 12 11.6521 12C11.0015 12 9.87899 11.7731 8.93293 11.0938C8.0126 10.433 7.23653 9.33102 7.23653 7.5C7.23653 6.11109 7.68972 4.99364 8.44486 4.22553C9.19925 3.45818 10.2936 3 11.6521 3C13.0106 3 14.105 3.45818 14.8594 4.22553Z" fill={props.fill}/>
    </svg>


  );
}

export default ProfileIcon;
