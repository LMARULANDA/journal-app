import { startNewNote } from "../../../src/store/journal";

describe("Pruebas en Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("StartNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);
  });
});
