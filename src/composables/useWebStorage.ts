export const useWebStorage = () => {
  const localStorageMethod = {
    localSet(key: string, value: string | object) {
      if (typeof value === "object") {
        localStorage.setItem(key, JSON.stringify(value));
        return;
      }
      localStorage.setItem(key, value as string);
    },
    localGet(key: string) {
      let keyContent = localStorage.getItem(key) as string;
      if (keyContent === null) {
        return keyContent;
      }
      if (keyContent[0] === "{" && keyContent[keyContent.length - 1] === "}") {
        keyContent = JSON.parse(keyContent);
      }
      return keyContent;
    },
    localRemove(key: string) {
      localStorage.removeItem(key);
    },
  };
  return { localStorageMethod };
};
