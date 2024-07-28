import { render, screen } from "./utils/customRender";
import React, { act } from "react";
import { RouterContextProvider } from "./utils/customRouterContext";
import { createMockRouter } from "./mockRouter";
import Create from "../../src/app/create/page";

describe("Create Recipe", () => {
  it("should render the input fields and update button", () => {
    act(() => {
      render(
        <RouterContextProvider router={createMockRouter({})}>
          <Create />
        </RouterContextProvider>
      );
    });

    const titleInput = screen.getByPlaceholderText("title");
    const ingredientInput = screen.getByPlaceholderText("ingredients");

    const instructionsInput = screen.getByPlaceholderText(
      "please give instructions on how to prepare the recipe"
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute("name", "title");

    expect(ingredientInput).toBeInTheDocument();
    expect(ingredientInput).toHaveAttribute("name", "ingredients");

    expect(instructionsInput).toBeInTheDocument();
    expect(instructionsInput).toHaveAttribute("name", "instructions");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("submit");
  });
});
