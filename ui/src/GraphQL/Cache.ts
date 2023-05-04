import { InMemoryCache, makeVar } from "@apollo/client";
import { persistCache } from "apollo-cache-persist";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isBackDrop: {
          read() {
            return isBackDropVar();
          }
        },
        pageWidth: {
          read() {
            return pageWidthVar();
          }
        },
        slideContact: {
          read() {
            return slideContactVar();
          }
        },
        orderSKU: {
          read() {
            return orderSKUVar();
          }
        }
      }
    },
    Order: {
      fields: {
        isHidden: {
          read(isHidden = false) {
            return isHidden;
          }
        }
      }
    }
  }
});

// отлично работает, сохраняет состояние в локальном хранилище
persistCache({
  cache,
  //@ts-ignore
  storage: window.localStorage,
  key: "finevideo-cache-data",
  // false - не сохранять кеш
  trigger: false
  // trigger: (persist) => {
  //   // Call `persist` every 10 seconds.
  //   const interval = setInterval(persist, 10000);
  //
  //   // Return function to uninstall this custom trigger.
  //   return () => clearInterval(interval);
  // }
});

export const isBackDropVar = makeVar(false);
export const pageWidthVar = makeVar(0);
export const slideContactVar = makeVar(0);
export const orderSKUVar = makeVar("");
