import { render, screen, fireEvent } from '@testing-library/react';
import ChoirList from './ChoirList'; // Default import
import { AddContext } from '@/state/AddContext';
import { ISong, IChoir, ID } from '@/types/types';
import { vi } from 'vitest';
import { uuid } from '@/res/helpers'; // To help with mocking new chorus id

// Mock the uuid function to control its output in tests
vi.mock('@/res/helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/res/helpers')>();
  return {
    ...actual,
    uuid: vi.fn(),
  };
});

const mockUuid = uuid as vi.MockedFunction<typeof uuid>;

describe('ChoirList component', () => {
  let mockUpdateState: vi.Mock;
  let mockState: ISong;

  const renderWithContext = (state: ISong, updateStateFn: vi.Mock) => {
    return render(
      <AddContext.Provider value={{ state, updateState: updateStateFn }}>
        <ChoirList />
      </AddContext.Provider>
    );
  };

  beforeEach(() => {
    mockUpdateState = vi.fn();
    // Basic initial state for ISong, chorus will be overridden in tests
    mockState = {
      id: 'song1',
      code: 'S1',
      title: 'Test Song',
      musicalNote: '_',
      chorus: [],
      paragraphs: [],
    };
    mockUuid.mockClear(); // Clear mock usage counts before each test
  });

  it('renders correctly with initial empty chorus', () => {
    renderWithContext(mockState, mockUpdateState);

    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument(); // Textareas are textboxes
  });

  it('adds a new chorus when "Agregar" is clicked', () => {
    const initialChorus: IChoir[] = [];
    mockState.chorus = initialChorus;
    const newChorusId = 'new-uuid-1';
    mockUuid.mockReturnValue(newChorusId); // Control the generated ID

    renderWithContext(mockState, mockUpdateState);

    const addButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(addButton);

    expect(mockUpdateState).toHaveBeenCalledTimes(1);
    // The component spreads the existing state and overrides chorus
    expect(mockUpdateState).toHaveBeenCalledWith({
      ...mockState, // it will include id, code, title, musicalNote, paragraphs from mockState
      chorus: [{ id: newChorusId, choir: '' }],
    });

    // To test if the UI updates if context were to change,
    // we update the mockState and re-render with the new context value.
    mockState.chorus = [{ id: newChorusId, choir: '' }];
    // mockUpdateState.mockClear(); // Clear calls if previous renderWithContext also calls it.
    renderWithContext(mockState, mockUpdateState); // Re-render with the new state

    expect(screen.getByRole('textbox')).toBeInTheDocument(); // Now a textarea should exist
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });

  it('updates chorus text when textarea value changes', () => {
    const chorusId1: ID = 'chorus-id-1';
    const initialChorus: IChoir[] = [{ id: chorusId1, choir: 'Initial choir text' }];
    mockState.chorus = initialChorus;

    renderWithContext(mockState, mockUpdateState);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('Initial choir text');

    fireEvent.change(textarea, { target: { value: 'Updated choir text' } });

    expect(mockUpdateState).toHaveBeenCalledTimes(1);
    // The component's changeChoir maps the existing chorus and updates the specific item
    // then calls updateState with the new chorus array.
    expect(mockUpdateState).toHaveBeenCalledWith({
        // No other state parts are passed by changeChoir, only {chorus: ...}
      chorus: [{ id: chorusId1, choir: 'Updated choir text' }],
    });

    // If we want to verify the textarea's value *would* change if context updated:
    // mockState.chorus = [{ id: chorusId1, choir: 'Updated choir text' }];
    // renderWithContext(mockState, mockUpdateState); // Re-render
    // const updatedTextarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    // expect(updatedTextarea.value).toBe('Updated choir text');
  });

  it('handles multiple chorus items and updates correctly', () => {
    const chorusId1: ID = 'c1';
    const chorusId2: ID = 'c2';
    mockState.chorus = [
      { id: chorusId1, choir: 'Choir 1 text' },
      { id: chorusId2, choir: 'Choir 2 text' },
    ];

    renderWithContext(mockState, mockUpdateState);

    const textareas = screen.getAllByRole('textbox') as HTMLTextAreaElement[];
    expect(textareas).toHaveLength(2);
    expect(textareas[0].value).toBe('Choir 1 text');
    expect(textareas[1].value).toBe('Choir 2 text');

    fireEvent.change(textareas[1], { target: { value: 'Choir 2 updated' } });

    expect(mockUpdateState).toHaveBeenCalledTimes(1);
    // The component's changeChoir maps the existing chorus and updates the specific item
    // then calls updateState with the new chorus array.
    expect(mockUpdateState).toHaveBeenCalledWith({
      // No other state parts are passed by changeChoir, only {chorus: ...}
      chorus: [
        { id: chorusId1, choir: 'Choir 1 text' },
        { id: chorusId2, choir: 'Choir 2 updated' },
      ],
    });
  });

  it('adds multiple choruses correctly', () => {
    mockState.chorus = [];
    mockUuid.mockReturnValueOnce('uuid-1').mockReturnValueOnce('uuid-2');

    renderWithContext(mockState, mockUpdateState);
    const addButton = screen.getByRole('button', { name: /agregar/i });

    // Add first chorus
    fireEvent.click(addButton);
    expect(mockUpdateState).toHaveBeenLastCalledWith({
      // Component spreads current state then adds new chorus array
      ...mockState,
      chorus: [{ id: 'uuid-1', choir: '' }],
    });

    // Simulate state update for next step by actually changing mockState.chorus
    // The component itself doesn't re-render automatically in test based on context change,
    // so we don't need to re-render here just to test the next click.
    // The crucial part is that mockState used by the component's click handler is updated.
    mockState.chorus = [{ id: 'uuid-1', choir: '' }];
    // Clear mock after the first assertion and before the second action
    mockUpdateState.mockClear();

    // Add second chorus
    // The same `addButton` from the initial render is used.
    fireEvent.click(addButton);
    expect(mockUpdateState).toHaveBeenCalledTimes(1); // Ensure it's called once for this action
    expect(mockUpdateState).toHaveBeenLastCalledWith({
      // Component spreads current state (which now includes the first chorus)
      // then adds the new chorus array
      ...mockState, // mockState here already has chorus: [{id: 'uuid-1', choir: ''}]
      chorus: [
        { id: 'uuid-1', choir: '' },
        { id: 'uuid-2', choir: '' },
      ],
    });

    // Simulate final state update and check UI
    // Now, mockState.chorus has been internally updated by the second click's logic
    // (as per how the component would call updateState, which then would update the actual state)
    // For the check, we use the state that *should* be there after the second update.
    const finalExpectedChorus = [
        { id: 'uuid-1', choir: '' },
        { id: 'uuid-2', choir: '' },
    ];
    mockState.chorus = finalExpectedChorus; // Ensure mockState reflects the final expected state for the render check

    // We need a fresh render to count the textareas based on the final state
    // cleanup(); // Or manage render results more carefully if not using cleanup in afterEach
    renderWithContext(mockState, mockUpdateState);
    expect(screen.getAllByRole('textbox')).toHaveLength(finalExpectedChorus.length);
  });
});
