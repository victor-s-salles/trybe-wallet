import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testa a pagina de login', () => {
  test('se a tela inicial é renderizada', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText('Email:');
    expect(email).toBeInTheDocument();

    const senha = screen.getByLabelText('Senha:');
    expect(senha).toBeInTheDocument();
  });
  test('se ao digitar o login a pagina e liberada e redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('Entrar');
    expect(btn).toBeDisabled();

    expect(history.location.pathname).toBe('/');
    const email = screen.getByLabelText('Email:');
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'teste@teste.com');

    const senha = screen.getByLabelText('Senha:');
    expect(senha).toBeInTheDocument();
    userEvent.type(senha, '1234567');

    expect(btn).toBeEnabled();
    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
describe('Testa a pagina da carteira', () => {
  test('se os elementos são rederizados corrtamente', () => {
    const initialState = {
      user: {
        email: 'email@test.com',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const title = screen.getByRole('heading', { name: 'TrybeWallet', level: 1 });
    expect(title).toBeInTheDocument();

    const value = screen.getByLabelText('Valor da despesa:');
    expect(value).toBeInTheDocument();

    const describe = screen.getByLabelText('Descrição:');
    expect(describe).toBeInTheDocument();

    const coin = screen.getByLabelText('Moeda:');
    expect(coin).toBeInTheDocument();

    const method = screen.getByLabelText('Método:');
    expect(method).toBeInTheDocument();

    const tag = screen.getByLabelText('Tipo:');
    expect(tag).toBeInTheDocument();
  });
});

describe('Testa a mecanica da pagina carteira', () => {
  test('se ao entrar na pagina e possivel adicionar um despesa', async () => {
    renderWithRouterAndRedux(<App />);
    const loginBTN = screen.queryByText('Entrar');
    const email = screen.getByLabelText('Email:');
    const password = screen.getByLabelText('Senha:');
    userEvent.type(email, 'teste@testes.com');
    userEvent.type(password, '123456');
    expect(loginBTN).toBeEnabled();
    userEvent.click(loginBTN);

    const inputValue = screen.getByLabelText('Valor da despesa:');
    userEvent.type(inputValue, '105');
    const inputDescribe = screen.getByLabelText('Descrição:');
    userEvent.type(inputDescribe, 'Cento e cinco');

    const addBTN = screen.queryByText('Adicionar despesa');
    userEvent.click(addBTN);

    const tableValue = await screen.findByRole('cell', { name: '105.00' });
    expect(tableValue).toBeInTheDocument();
    const tableDescribe = await screen.findByRole('cell', { name: 'Cento e cinco' });
    expect(tableDescribe).toBeInTheDocument();

    const editBTN = await screen.findByText('Editar');
    userEvent.click(editBTN);

    userEvent.type(inputValue, '210');
    userEvent.type(inputDescribe, 'Duzentos e dez');

    const inputCoin = screen.getByLabelText('Moeda:');
    const inputTag = screen.getByLabelText('Tipo:');
    userEvent.selectOptions(
      inputCoin,
      await screen.findByText('BTC'),

    );
    userEvent.selectOptions(
      inputTag,
      screen.getByText('Trabalho'),

    );

    const confirmEditBTN = screen.queryByText('Editar despesa');
    userEvent.click(confirmEditBTN);

    const tableNewValue = await screen.findByRole('cell', { name: '210.00' });
    expect(tableNewValue).toBeInTheDocument();
    const tableNewDescribe = await screen.findByRole('cell', { name: 'Duzentos e dez' });
    expect(tableNewDescribe).toBeInTheDocument();

    const tableNewCoin = await screen.findByRole('cell', { name: 'Bitcoin/Real Brasileiro' });
    expect(tableNewCoin).toBeInTheDocument();
    const tableNewTag = await screen.findByRole('cell', { name: 'Trabalho' });
    expect(tableNewTag).toBeInTheDocument();

    const deleteBTN = await screen.findByTestId('delete-btn');
    userEvent.click(deleteBTN);

    expect(tableNewValue).not.toBeInTheDocument();
    expect(tableNewDescribe).not.toBeInTheDocument();
  });
});
