import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithContext from "./helpers/renderWithContext";
import App from "../App";
import fetchMock from "./helpers/fetchMock";

describe('Testes para o componente Table.js', () => {

  it('Verifica se a tabela tem 13 colunas', () => {
    renderWithContext(<App />)
    fetchMock();

    expect(screen.getAllByRole('columnheader').length).toBe(13)
    expect(screen.getAllByRole('cell').length).toBe(13)
  })
  it('filtro de texto para a tabela', async () => {
    renderWithContext(<App />)
    fetchMock();

    expect(screen.getByTestId('name-filter')).toBeDefined()
    userEvent.type(screen.getByTestId('name-filter'), 'o')
    await waitFor(() => expect(screen.getAllByRole('cell').length).toBe(91) , 200)
    userEvent.type(screen.getByTestId('name-filter'), 'o')
    await waitFor(() => expect(screen.getAllByRole('cell').length).toBe(26) , 200)
    userEvent.clear(screen.getByTestId('name-filter'))
    await waitFor(() => expect(screen.getAllByRole('cell').length).toBe(130) , 200)
  })
  it('filtro para valores numéricos', async () => {
    renderWithContext(<App />)
    fetchMock();

    expect(screen.getByTestId("column-filter")).toBeDefined()
    expect(screen.getByTestId("button-filter")).toBeDefined()
    expect(screen.getByTestId("value-filter")).toBeDefined()
    userEvent.click(screen.getByTestId('button-remove-filters'))
    userEvent.type(screen.getByTestId('value-filter'), '100000000000')
    userEvent.click(screen.getByTestId('button-filter'))
    await waitFor(() => expect(screen.getAllByTestId('filter').length).toBe(1) , 200)
    userEvent.click(screen.getByTestId('button-filter'))
    await waitFor(() => expect(screen.getAllByTestId('filter').length).toBe(2) , 200)


    userEvent.click(screen.getByTestId('button-remove-filters'))
    userEvent.selectOptions(screen.getAllByRole('combobox')[1], ['menor que'])
    userEvent.click(screen.getByTestId("button-filter"))
    console.log(screen.getByTestId('filter').innerHTML);
    expect(screen.getByTestId('filter')).toBeDefined()

    userEvent.click(screen.getByTestId('button-remove-filters'))
    userEvent.selectOptions(screen.getAllByRole('combobox')[1], ['igual a'])
    userEvent.click(screen.getByTestId("button-filter"))
    console.log(screen.getByTestId('filter').innerHTML);
    expect(screen.getByTestId('filter')).toBeDefined()
    // expect(screen.getAllByRole('ombobox')[1])
    // Name "maior que":
    // <option
    //   value="maior que"
    // />

    // Name "menor que":
    // <option
    //   value="menor que"
    // />

    // Name "igual a":
    // <option
    //   value="igual a"
    // />



  })

});