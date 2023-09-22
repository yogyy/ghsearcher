import SearchUser from '@/components/layout/Search';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Search user component', () => {
  it('button enable when input entered', () => {
    render(<SearchUser />);
    const btnSearch = screen.getByRole('button', { name: /Search/i });
    expect(btnSearch).toBeDisabled();

    const inputName = screen.getByPlaceholderText('Enter username');
    fireEvent.change(inputName, { target: { value: 'yogyy' } });
    expect(btnSearch).not.toBeDisabled();
  });

  
});
