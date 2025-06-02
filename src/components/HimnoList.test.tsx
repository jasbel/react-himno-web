import { render, screen, fireEvent } from '@testing-library/react';
import HimnoList from './HimnoList'; // Default import
import { ISong } from '@/types/types';
import { BrowserRouter } from 'react-router-dom'; // For Link components potentially in HimnoItemNew
import { vi } from 'vitest';

// Import the components that will be mocked.
// Vitest's vi.mock will replace their actual implementations with mocks.
import HimnoSearch from './himno/HimnoSearch';
import HimnoItemNew from './himno/HimnoItemNew';
import FavoriteEmptyState from './favorite/FavoriteEmptyState';

// Mock child components to isolate HimnoList logic
// Using relative paths for vi.mock
vi.mock('./himno/HimnoSearch', () => ({
  __esModule: true,
  default: vi.fn(({ onChange }) => (
    <input data-testid="himno-search" onChange={(e) => onChange(e.target.value)} />
  )),
}));

vi.mock('./himno/HimnoItemNew', () => ({
  __esModule: true,
  default: vi.fn(({ id, title, num, onClick }) => (
    <div data-testid={`himno-item-${id}`} onClick={onClick} role="article">
      <span>{num}. {title}</span>
      <a href={`/himno/${id}`}>Link to {title}</a> {/* Assuming HimnoItemNew might render a link */}
    </div>
  )),
}));

vi.mock('./favorite/FavoriteEmptyState', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="favorite-empty-state">No favorites</div>),
}));


const mockSongs: ISong[] = Array.from({ length: 50 }, (_, i) => ({
  id: `id-${i + 1}`,
  code: `${i + 1}`, // num for HimnoItem
  slug: `hymn-${i + 1}`,
  title: `Hymn Title ${i + 1}`,
  date: '2023-01-01',
  created_at: '2023-01-01T00:00:00Z',
  paragraphs: [{ id: `p${i+1}`, paragraph: `Description for Hymn ${i + 1}`, chorusPos: [] }],
  musicalNote: '_',
  // type: 'himno', // ISong doesn't have 'type' directly
  // No 'lines' in IParagraph, it's 'paragraph'
}));


describe('HimnoList component', () => {
  let mockChangeSongBySearch: vi.Mock;
  let mockHandlePress: vi.Mock;

  beforeEach(() => {
    mockChangeSongBySearch = vi.fn();
    mockHandlePress = vi.fn();
    // Clear mocks for child components using the imported mock functions
    (HimnoSearch as vi.Mock).mockClear();
    (HimnoItemNew as vi.Mock).mockClear();
    (FavoriteEmptyState as vi.Mock).mockClear();
  });

  const renderHimnoList = (songs: ISong[], hasFavorite: boolean) => {
    return render(
      <BrowserRouter> {/* HimnoItemNew might contain Links */}
        <HimnoList
          songsSearch={songs}
          hasFavorite={hasFavorite}
          changeSongBySearch={mockChangeSongBySearch}
          handlePress={mockHandlePress}
        />
      </BrowserRouter>
    );
  };

  it('renders correctly with a list of songs (first page)', () => {
    renderHimnoList(mockSongs, true);
    // Default page length is 40
    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(40);
    expect(screen.getByText('1. Hymn Title 1')).toBeInTheDocument();
    expect(screen.queryByText('41. Hymn Title 41')).not.toBeInTheDocument();
    expect(FavoriteEmptyState).not.toHaveBeenCalled(); // Use imported mock
  });

  it('renders FavoriteEmptyState when hasFavorite is false', () => {
    renderHimnoList(mockSongs, false); // songs are still there, but hasFavorite is false
    expect(FavoriteEmptyState).toHaveBeenCalled(); // Use imported mock
  });

  it('renders empty state correctly when no songs are provided', () => {
    renderHimnoList([], true);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
    // It doesn't have a specific "no hymns found" message, just renders nothing.
    // FavoriteEmptyState would not be called if hasFavorite is true.
    expect(FavoriteEmptyState).not.toHaveBeenCalled(); // Use imported mock
  });


  it('calls changeSongBySearch when HimnoSearch input changes', () => {
    renderHimnoList([], true);
    const searchInput = screen.getByTestId('himno-search');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(mockChangeSongBySearch).toHaveBeenCalledWith('test query');
  });

  it('calls handlePress when a HimnoItem is clicked', () => {
    renderHimnoList([mockSongs[0]], true);
    const itemElement = screen.getByTestId(`himno-item-${mockSongs[0].id}`);
    fireEvent.click(itemElement);
    expect(mockHandlePress).toHaveBeenCalledWith(mockSongs[0]);
  });

  describe('Pagination', () => {
    it('displays the next page when "Siguiente" is clicked', () => {
      renderHimnoList(mockSongs, true); // 50 songs, page length 40
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
      const items = screen.getAllByRole('article');
      expect(items).toHaveLength(10); // Remaining 10 songs
      expect(screen.queryByText('1. Hymn Title 1')).not.toBeInTheDocument();
      expect(screen.getByText('41. Hymn Title 41')).toBeInTheDocument();
    });

    it('displays the previous page when "Anterior" is clicked', () => {
      renderHimnoList(mockSongs, true);
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i })); // Go to page 2
      fireEvent.click(screen.getByRole('button', { name: /anterior/i })); // Go back to page 1
      const items = screen.getAllByRole('article');
      expect(items).toHaveLength(40);
      expect(screen.getByText('1. Hymn Title 1')).toBeInTheDocument();
    });

    it('"Anterior" button is disabled on the first page', () => {
      renderHimnoList(mockSongs, true);
      expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled();
    });

    it('"Siguiente" button is enabled when there are exactly enough songs for the current page (potential bug)', () => {
      renderHimnoList(mockSongs.slice(0, 40), true); // Exactly 40 songs for a page of size 40
      // Component logic: 1*40 > 40 is false, so button is NOT disabled.
      expect(screen.getByRole('button', { name: /siguiente/i })).not.toBeDisabled();
    });

    it('"Siguiente" button is disabled when there are fewer songs than a full page', () => {
      renderHimnoList(mockSongs.slice(0, 39), true); // 39 songs, page size 40
      // Component logic: 1*40 > 39 is true, so button IS disabled
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeDisabled();
    });

    it('"Siguiente" button is enabled if there are more songs than one page', () => {
      renderHimnoList(mockSongs, true); // 50 songs, page length 40
      expect(screen.getByRole('button', { name: /siguiente/i })).not.toBeDisabled();
    });

    it('resets pagination when search query changes', () => {
      renderHimnoList(mockSongs, true);
      // Go to page 2
      fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
      expect(screen.getByText('41. Hymn Title 41')).toBeInTheDocument();

      // Simulate search
      const searchInput = screen.getByTestId('himno-search');
      fireEvent.change(searchInput, { target: { value: 'new query' } });

      // Expect changeSongBySearch to be called
      expect(mockChangeSongBySearch).toHaveBeenCalledWith('new query');

      // Check if pagination reset (page is back to 1)
      // We need to simulate that the parent component provides new songsSearch based on "new query"
      // For this test, let's assume the search results in the first 40 mock songs again.
      // The key is that HimnoList itself calls setPaginate(initPaginate)
      // So, even if songsSearch doesn't change, internal page state should be 1.
      // We can verify this by checking the items displayed.
      // Let's re-render with the same songs, the pagination should have reset.
      // This part is tricky because the resetPaginate is internal.
      // The effect of resetPaginate is that it will display the first page of current songsSearch

      // To properly test resetPaginate, we'd need to see that if we were on page 2,
      // after a search, we are now on page 1 of the *new* results.
      // The current test setup for `handleSearch` calls `changeSongBySearch` and then `resetPaginate`.
      // If `songsSearch` prop remains `mockSongs` (50 items), after reset, it should show page 1.
      expect(screen.getByText('1. Hymn Title 1')).toBeInTheDocument();
      expect(screen.queryByText('41. Hymn Title 41')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled(); // Confirms it's page 1
    });
  });
});
