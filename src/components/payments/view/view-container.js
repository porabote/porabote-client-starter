import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { useHistory } from 'react-router';
import Api from "@services";
import View from "./view";
import ViewPreloader from "@components/view/view-preloader";

const ViewContainer = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(state => state.auth);

  const { dictsRequired, title, meta, filter } = useSelector(state => state.payments);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.payments ? true : false;

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = title;
    //dispatch(requestDicts(dictsRequired, 'payments'));
    getRecord();
  }, [props.id]);

  const {relationships} = useSelector(state => state.payments);

  const getRecord = () => {

    const {id} = props;

    Api.get(`/api/payments/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setLoaded(true);
    });
  }

  const editRecord = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditRecordForm, { data, editRecordConfirm, dicts, getRecord }),
      `Редактировать данные`
    ));
  }

  const deleteRecord = (id, fetchFeedData) => {
    // Api.get(`/api/mails-patterns/method/delete/?id=${id}`)
    //   .then((resp) => {
    //     fetchFeedData();
    //     history.push('/mails-patterns/feed/');
    // });
  }

  const editRecordConfirm = (values, modalKey, getRecord) => {
    // Api.post(`/api/mails-patterns/method/edit/`, {
    //   body: values
    // }).then((resp) => {
    //   if( typeof resp.error != "undefined") {
    //     return dispatch(openConfirm(resp.error));
    //   }
    //   getRecord();
    //   dispatch(removeModalItem(modalKey));
    // });
  }


  if (!loaded) {
    return <ViewPreloader/>;
  }

  return (
    <View
      dicts={dicts}
      data={data}
      getRecord={getRecord}
      editRecord={editRecord}
      editRecordConfirm={editRecordConfirm}
      deleteRecord={deleteRecord}
      fetchFeedData={props.fetchFeedData}
    />
  );

}

export default ViewContainer;
