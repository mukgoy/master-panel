
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Permission } from '../enums';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequirePermissionsGuard } from './require-permissions.guard';

export function Auth(...permissions: Permission[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(JwtAuthGuard,RequirePermissionsGuard)
  );
}
