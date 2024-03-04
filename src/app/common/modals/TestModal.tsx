import ModalWrapper from './ModalWrapper';
import { useAppSelector } from '../../store/store';

function TestModal() {
  const { data } = useAppSelector((state) => state.modals);
  return (
    <ModalWrapper header={'Test'}>
      <div>Test data: {data}</div>
    </ModalWrapper>
  );
}

export default TestModal;
