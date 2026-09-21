export const API_VERSION_PATH = '/v1';

export function isPassengerRuntime(environment: NodeJS.ProcessEnv): boolean {
  return (
    environment.PASSENGER_APP_ENV !== undefined ||
    environment.PASSENGER_BASE_URI !== undefined
  );
}

export function getApiRouterMountPath(
  apiBasePath: string,
  passengerMounted: boolean,
): string {
  if (passengerMounted) return API_VERSION_PATH;
  if (apiBasePath === '/') return API_VERSION_PATH;
  return `${apiBasePath}${API_VERSION_PATH}`;
}
