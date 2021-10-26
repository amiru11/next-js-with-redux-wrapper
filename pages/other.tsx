import { useEffect, ReactNode } from "react";
import { bindActionCreators, Dispatch } from 'redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import type { NextPage, GetServerSidePropsResult } from 'next';

import { StoreState, wrapper } from 'store';
import { addCountThunk } from "store/modules/count";
import { serverRenderClock, startClock } from "store/modules/tick";

import Page from 'components/Page';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    serverRenderClock: bindActionCreators(serverRenderClock, dispatch),
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (ctx): Promise<GetServerSidePropsResult<any>> => {
      try {
        const { serverRenderClock } = mapDispatchToProps(store.dispatch);
        await store.dispatch(serverRenderClock(true));
      } catch (err) {}

      return {
        props: {}
      };
    }
);

const Other: NextPage = () => {
  const {} = useSelector((state: StoreState) => ({}), shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer: any = dispatch(startClock());
    
    return () => {
      clearInterval(timer);
    }
  }, [dispatch]);
  return (
    <Page title="Other Page" linkTo="/" />
  )
}

export default Other;
