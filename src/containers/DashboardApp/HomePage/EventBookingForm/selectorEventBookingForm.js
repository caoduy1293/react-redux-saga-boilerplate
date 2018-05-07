import {formValueSelector} from "redux-form";
import {EVENT_BOOKING_FORM_ID} from "../constants";

export const selectorEventBookingForm = formValueSelector(EVENT_BOOKING_FORM_ID);