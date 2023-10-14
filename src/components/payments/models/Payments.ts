import Model from "@/app/models/model";
import Api from "@/services";
import notify from "@app/notifications";

class Payments extends Model {

  static get apiEntityName(): string {
    return "Payments";
  }

  static setAccept = async (recordId: number, status: boolean) => {
    const result = await Api.get(`/api/payments/method/setAccept/${recordId}/`, {
      query: {status: +status}
    });
    if (result.error) {
      notify.push(result.error);
      return status ? false : true;
    } else {
      notify.push("Статус успешно изменен.");
      return status;
    }
  }

  static getScanFiles = async (recordId: number) => {
    const result = await Api.get(`/api/payments/method/getScanFiles/${recordId}/`);
    if (result.error) {
      alert(result.error);
    }

    return result;
  }

  static setPspTable = async (scanFileId, paymentId) => {
    const result = await Api.get(`/api/payments/method/createImageOfPspTable/`, {
      query: {
        scanFileId,
        paymentId,
      }
    });
    if (result.error) {
      alert(result.error);
    }

    return result.data;
  }

  static createFacsimileTable = async (userId, scanId, paymentId, attributes) => {

    try {
      const result = await Api.get(`/api/payments/method/createFacsimileTableImage/`, {
        query: {userId, scanId, paymentId, ...attributes}
      });
      if (result.error) {
        alert(result.error);
      } else {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }

  }

  static updateScanFiles = async (recordId: number, billFileId: number) => {

    try {

      const result = await Api.get(`/api/payments/method/updateScanFiles/`, {
        query: {
          recordId,
          billFileId,
        }
      });
      if (result.error) {
        alert(result.error);
      }

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  static cancelPayments = async (ids: number[]) => {

    const result = await Api.get(`/api/payments/method/cancelPayments/`, {
      query: {ids}
    });

    if (result.error) {
      alert(result.error);
    }
    return result;
  }


}

export default Payments;
