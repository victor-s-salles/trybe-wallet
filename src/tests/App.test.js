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

describe('Testa a mecanica da pagimna carteira', () => {
  test('se os elementos são rederizados corrtamente', () => {
    const initialState = {
      user: {
        email: 'email@test.com',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const value = screen.getByLabelText('Valor da despesa:');
    expect(value).toBeInTheDocument();
    userEvent.type(value, 512);

    const describe = screen.getByLabelText('Descrição:');
    expect(describe).toBeInTheDocument();
    userEvent.type(describe, 'Teste de valor');

    const btnADD = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(btnADD).toBeInTheDocument();
    userEvent.click(btnADD);

    const tabValue = screen.findByText(512);
    expect(tabValue).toBeInTheDocument();
  });
});
