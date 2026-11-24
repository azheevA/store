import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { render, type RenderOptions } from "@testing-library/react";
import { makeStore, type AppStore } from "@/app/store";

type Options = Omit<RenderOptions, "wrapper"> & {
  store?: AppStore;
};

export function renderWithStore(ui: ReactElement, options: Options = {}) {
  const { store: providedStore, ...renderOptions } = options;
  const store = providedStore ?? makeStore();

  const result = render(ui, {
    ...renderOptions,
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  return { store, ...result };
}
