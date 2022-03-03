import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';

export default [
    ErrorInterceptor,
    JwtInterceptor
]
export * from './error.interceptor';
export * from './jwt.interceptor';