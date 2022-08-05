import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testes da pagina de Login', () => {
  test('01. Testa se são renderizados o botão "Entrar" e os campos de login e senha.', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    
    const enterButton = screen.getByText('Entrar');
    expect(enterButton).toBeInTheDocument();
  });
});

describe('Testes de roteamento', () => {
  test('02. Testa se, ao prencher os campos corretamente e clicar em entrar, é feito o roteamento para a página Wallet.', async () => {
    renderWithRouterAndRedux(<App />);
  
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'tryber@trybe.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '99999999');

    const enterButton = screen.getByText('Entrar');
    userEvent.click(enterButton);

    const userField = screen.getByTestId('email-field');
    expect(userField.innerHTML).toBe('Usuário:tryber@trybe.com');
  });
})

describe('Testes do componete Wallet', () => {
  test('03. Testa se, ao prencher os campos e clicar no botão, o gasto é adicionado.', async () => {
    renderWithRouterAndRedux(<Wallet />);
// Preenchimento:
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '30');

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Cinema');

    const currencyInput = screen.getByTestId('currency-input');
    userEvent.selectOptions(currencyInput, 'CAD');

    const methodInput = screen.getByTestId('method-input');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');

    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, 'Lazer');

    const addBttn = screen.getByText('Adicionar despesa');
    userEvent.click(addBttn);

//  Verificações:
    const value = await screen.findByRole('cell', { name: '30.00' });
    expect(value).toBeInTheDocument();

    const description = await screen.findByRole('cell', { name: 'Cinema' });
    expect(description).toBeInTheDocument();

    const tag = await screen.findByRole('cell', { name: 'Lazer' });
    expect(tag).toBeInTheDocument();

    const method = await screen.findByRole('cell', { name: 'Cartão de crédito' });
    expect(method).toBeInTheDocument();

    const real = await screen.findByRole('cell', { name: 'Real' });
    expect(real).toBeInTheDocument();

    const excluirBttn = await screen.getByText('Excluir');
    expect(excluirBttn).toBeInTheDocument();
  });
});
