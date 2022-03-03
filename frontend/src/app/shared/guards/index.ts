import { AuthGuard } from './auth.guard';
import { BeforeloginGuard } from './beforelogin.guard';

export default [
    AuthGuard,
    BeforeloginGuard
]
export * from './auth.guard';
export * from './beforelogin.guard';