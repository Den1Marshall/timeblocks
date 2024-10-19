export const authenticateUser = async (idToken: string): Promise<void> => {
  await fetch('/api/login', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
