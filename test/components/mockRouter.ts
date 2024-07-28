import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { vi } from 'vitest';

export function createMockRouter(router: Partial<NextRouter> = {}): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {} as ParsedUrlQuery,
    back: vi.fn(),
    beforePopState: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    push: vi.fn().mockResolvedValue(true),
    reload: vi.fn(),
    replace: vi.fn().mockResolvedValue(true),
    forward: vi.fn(), 
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isReady: true,
    isLocaleDomain: false,
    isPreview: false,
    ...router,
  };
}
