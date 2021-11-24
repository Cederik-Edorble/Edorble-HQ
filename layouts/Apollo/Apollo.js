import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";
import { useApollo } from "../../apollo/client";

const Apollo = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
    </ApolloProvider>
  );
};

Apollo.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    initialApolloState: PropTypes.shape({}),
  }).isRequired,
};

export default Apollo;
