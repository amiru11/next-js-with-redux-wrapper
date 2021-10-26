import type { AppProps } from 'next/app';

import { wrapper } from 'store';

import Layout from 'components/Layout';

function WrappedApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default wrapper.withRedux(WrappedApp);
