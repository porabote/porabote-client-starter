import React from "react";
import store from "@store";
import { registrationReducer } from "../../../store";
import paymentsReducer from "../redux-store/reducer";
import Payments from "../models/Payments";

const ApiService = () => {

  registrationReducer("payments", paymentsReducer);

  return {

    getFeed: async () => {

      const state = store.getState().payments;

      if (state.filter.where.pay_week && !state.filter.whereBetween.date_payment.period.from) {
        state.filter.whereBetween.date_payment.period.from = new Date().getFullYear() + "-01-01";
      }

      if (!state.filter.where.status_id) {
        state.filter.where.status_id = {
          operand: "!=",
          value: "58"
        };
      }

      return new Payments()
        .setWith(state.relationships)
        .setWhereBetween(state.filter.whereBetween)
        .setWhere(state.filter.where)
        .setLimit(state.meta.limit)
        .setPage(state.meta.nextPage)
        .get();
    }

  };

};

export default ApiService();
