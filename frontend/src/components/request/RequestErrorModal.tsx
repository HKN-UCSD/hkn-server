import React, { useState } from 'react';

import { ButtonProps } from '../buttons/Button';
import { ModalWithActionButtons } from '../modals/ModalWithActionButtons';

import { DEFAULT_403_MSG, DEFAULT_404_MSG, DEFAULT_500_MSG } from '@Constants/requestErrMsg';

interface CustomActionButtonsByStatus {
  [status: number]: ButtonProps[];
}

interface CustomModalTitleErrMsg {
  title: string;
  errorMessage: string;
}

interface CustomModalTexts {
  [status: number]: CustomModalTitleErrMsg;
}

interface RequestErrorModalProps {
  isError: boolean;
  error: Response;
  customActionButtonsByStatus: CustomActionButtonsByStatus;
  customModalTexts: CustomModalTexts;
}

const handleDefaultErrMsg = (status: number) => {
  let errorMessage = '';

  if (status === 403) {
    errorMessage = DEFAULT_403_MSG;
  } else if (status === 404) {
    errorMessage = DEFAULT_404_MSG;
  } else if (status === 500) {
    errorMessage = DEFAULT_500_MSG;
  }

  return errorMessage;
}

const RequestErrorModal = ({ isError, error, customActionButtonsByStatus, customModalTexts }: RequestErrorModalProps) => {
  const [isModalOpen, setModalOpen] = useState(isError);
  const { status, statusText } = error;
  const errorStatus = `${status} ${statusText}`;

  const handleErrorMessasge = () => {
    let errorMessage = '';

    if (status in customModalTexts) {
      errorMessage = customModalTexts[status]['errorMessage'];
    } else {
      errorMessage = handleDefaultErrMsg(status);
    }

    return errorMessage;
  }

  const title = (status in customModalTexts) ? `[${errorStatus}] ${customModalTexts[status]['title']}` : `[${errorStatus}]`;
  const contentText = handleErrorMessasge();
  const modalProps = {
    title,
    contentText,
    open: isModalOpen,
    handleClose: () => setModalOpen(false),
  };

  const actionButtonPropsList = (status in customActionButtonsByStatus) ? customActionButtonsByStatus[status] : [];
  return <ModalWithActionButtons modalProps={modalProps} actionButtonPropsList={actionButtonPropsList} />;
}

export default RequestErrorModal;