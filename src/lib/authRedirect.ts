export const AUTH_REDIRECT_STORAGE_KEY = 'tripsync.authRedirectPath';

export const isSafeInternalPath = (path: string | null): path is string => {
  return Boolean(path?.startsWith('/') && !path.startsWith('//'));
};

export const saveAuthRedirectPath = (path: string) => {
  if (!isSafeInternalPath(path)) return;

  localStorage.setItem(AUTH_REDIRECT_STORAGE_KEY, path);
};

export const consumeAuthRedirectPath = () => {
  const savedPath = localStorage.getItem(AUTH_REDIRECT_STORAGE_KEY);
  localStorage.removeItem(AUTH_REDIRECT_STORAGE_KEY);

  return isSafeInternalPath(savedPath) ? savedPath : null;
};
