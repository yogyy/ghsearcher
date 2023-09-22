import App from '@/App';
import { fireEvent, render, screen } from '@testing-library/react';

describe('App', () => {
  it('renders without errors', () => {
    render(<App />);
    const appElement = screen.getByRole('main');
    expect(appElement).toBeInTheDocument();
  });

  it('renders SearchUser components', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Enter username');
    const searchBtn = screen.getByRole('button', { name: /Search/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it('render search result summary of username', () => {
    render(<App />);
    const inputName = screen.getByPlaceholderText('Enter username');
    fireEvent.change(inputName, { target: { value: 'yogyy' } });
    
    const btnSearch = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(btnSearch);
    
    const summary = screen.findByTestId('username');
    expect(summary).toBeDefined();
  });
});
