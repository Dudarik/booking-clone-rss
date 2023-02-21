import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { IValidation, TValidationField } from './types';
import { validationInfo } from './validation';

export const useModal = defineStore('Modal', () => {
  const modalIsShow = ref(false);
  const buyAttemt = ref(false);
  const orderIsCompleted = ref(false);

  const validation: IValidation<TValidationField> = reactive(validationInfo);

  const isAllValid = computed((): boolean => {
    const buyFieldKeys = <(keyof IValidation<TValidationField>)[]>Object.keys(validation);
    return buyFieldKeys.every((field) => validation[field].isValid);
  });

  const validate = (key: keyof IValidation<TValidationField>): void => {
    const setValidState = (valid: boolean, alert: boolean): void => {
      validation[key].isValid = valid;
      validation[key].isAlert = alert;
    };

    if (!validation[key].value) {
      setValidState(false, false);
      return;
    }

    const isValid: boolean = validation[key].regex.test(validation[key].value);

    if (isValid) {
      setValidState(true, false);
    } else {
      setValidState(false, true);
    }
  };

  return {
    modalIsShow,
    buyAttemt,
    orderIsCompleted,
    validation,
    validate,
    isAllValid,
  };
});
