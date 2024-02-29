import { useAppDispatch, useAppSelector } from '../../store/store';
import { Button } from 'semantic-ui-react';
import { decrement, increment, incrementByAmount } from './testSlice';

function Scratch() {
  const { data } = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Scratch Page</h1>
      <h3>The data is: {data}</h3>
      <Button
        onClick={() => dispatch(increment())}
        color='green'
        content='Increment'
      />
      <Button
        onClick={() => dispatch(decrement())}
        color='red'
        content='Decrement'
      />
      <Button
        onClick={() => dispatch(incrementByAmount(5))}
        color='green'
        content='Increment by 5'
      />
    </div>
  );
}

export default Scratch;
