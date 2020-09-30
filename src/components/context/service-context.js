import { createContext } from 'react';

const { Provider: ServiceContextProvider, Consumer: ServiceContextConsumer } = createContext();

export { ServiceContextProvider, ServiceContextConsumer };
