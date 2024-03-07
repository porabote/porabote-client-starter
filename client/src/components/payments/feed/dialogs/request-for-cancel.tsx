import React from 'react';
import Payments from "../../models/Payments";
import {NavLink} from "react-router-dom";
import {Button} from "@/app/form";

const RequestForCancel = (props: { payments_ids: number[] }) => {

  const paymentsList: JSX.Element[] = [];
  props.payments_ids.forEach((paymentId: number): JSX.Element => {
    console.log(paymentId);
    paymentsList.push(
      <span>
        <NavLink
          target="_blank"
          to={`/payments/view/${paymentId}`}
        >{paymentId}</NavLink> ,
  </span>
    );
  });

  const cancelPayment = async () => {
    let res = await Payments.cancelPayments(props.payments_ids);
  }

  return (
    <div>
      <p>
        <span style={{color: "#ccc"}}>Платёж номер:</span>
        {paymentsList}
      </p>
      <div>
        <Button
          onClick={cancelPayment}
          style={{maxWidth: '100px'}}
          text="Подтвердить"
        />
      </div>
    </div>
  );
};

export default RequestForCancel;