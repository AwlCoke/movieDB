import React from 'react';

const withStorage = (Wrapped) => {
  return (props) => {
    const checkSessionStorageExists = () => {
      const testKey = 'test';
      try {
        sessionStorage.setItem('testKey', testKey);
        sessionStorage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    };

    const load = (key) => {
      if (checkSessionStorageExists) {
        return sessionStorage.getItem(key);
      }
      return null;
    };

    const save = (key, value) => {
      if (checkSessionStorageExists) {
        sessionStorage.setItem(key, value);
      }
    };

    return <Wrapped loadItem={load} saveItem={save} {...props} />;
  };
};

export default withStorage;
