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
describe('Testa a pagina da cateira', () => {
  test('se os elementos são rederizados corrtamente', () => {
    const initialState = {
      user: {
        email: 'email@test.com',
      },
    };

    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    // act(() => { history.push('/carteira'); });
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
