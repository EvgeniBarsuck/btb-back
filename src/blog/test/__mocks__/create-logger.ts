export const createMockLogger = jest.fn().mockReturnValue({
  log: () => console.log('log'),
  error: () => console.log('error'),
});
