function subtractMonths(date, months) {
  date.setMonth(date.getMonth() - months);
  return date;
}

const initialState = {
  title: "Платежи",
  event_ids: [],
  alias: "payments",
  data: [],
  loading: true,
  meta: {
    count: 0, // total count of records
    limit: 100,
    offset: 0,
    nextPage: 1,
    perPage: 0, // total count of loaded records
    lastId: 0,
  },
  filter: {
    where: {
      object_id: "",
      contractor_id: "",
      client_id: "",
      status_id: "",
      bill_number: {
        operand: "like",
        pattern: "%T%",
        value: ""
      },
    },
    whereBetween: {
      date_payment: {
        //value: [subtractMonths(new Date(), 1), subtractMonths(new Date(), -1)],
        period: {from: null, to: null}
      },
    },
    // orWhereGrouped: [
    //   {
    //     subject: {
    //       operand: "like",
    //       pattern: "%T%",
    //       value: ""
    //     },
    //     description: {
    //       operand: "like",
    //       pattern: "%T%",
    //       value: ""
    //     },
    //   }
    // ],
    // whereIn: {
    //   department_id: [],
    // },
    seekString: "",
  },
  relationships: [
    "status",
    "bill.file_of_bill",
    "contractor.guid",
    "client",
    "object",
    "payments_set",
  ],
};

export default initialState;
