import React from "react";
import { render } from "@testing-library/react";

import Provider from "../../context/provider";

const renderWithContext = (component) => {
    return {
      ...render(<Provider>{component}</Provider>),
      history,
    };
};

export default renderWithContext;