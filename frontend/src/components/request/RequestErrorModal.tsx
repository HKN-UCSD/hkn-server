import React, { useState } from 'react';

import { ButtonProps } from '../buttons/Button';
import { ModalWithActionButtons } from '../modals/ModalWithActionButtons';

import { DEFAULT_403_MSG, DEFAULT_404_MSG, DEFAULT_500_MSG } from '@Constants/requestErrMsg';

interface ModalErrorConfig {
}

interface CustomModalErrorConfigs {
  [status: number]: ModalErrorConfig;
}

interface RequestErrorModalProps {
  isError: boolean;
  error: Response;
  customModalErrorConfigs?: CustomModalErrorConfigs;
}

const RequestErrorModal = ({ isError, error, customModalErrorConfigs = {} }: RequestErrorModalProps) => {
  const [isModalOpen, setModalOpen] = useState(isError);

  return <></>;
}

export default RequestErrorModal;