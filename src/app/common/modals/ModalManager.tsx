import TestModal from './TestModal';
import { useAppSelector } from '../../store/store';
import LoginForm from '../../features/auth/LoginForm';
import RegisterForm from '../../features/auth/RegisterForm';

function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    RegisterForm,
  };

  let renderedModal;

  const { type, data, open } = useAppSelector((state) => state.modals);

  if (open && type) {
    const ModalComponent = (modalLookup as any)[type];
    renderedModal = <ModalComponent data={data} />;
  }

  return <span>{renderedModal}</span>;
}

export default ModalManager;
