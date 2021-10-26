import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { StoreState } from "store";
import { addCountThunk } from "store/modules/count";

import styles from './AddCount.styled';

function AddCount(): JSX.Element {
  const { count } = useSelector((state: StoreState) => ({
    count: state.count.get('count')
  }), shallowEqual);
  const dispatch = useDispatch();

  const addCount = () => (ev: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addCountThunk(count+1))
  }

  return (
    <div>
      <h1>
        AddCount: <span>{count}</span>
      </h1>
      <button onClick={addCount()}>Add To Count</button>
      <style jsx>{styles}</style>
    </div>
  )
}

export default AddCount;
