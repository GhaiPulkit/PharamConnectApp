import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerResolver } from './manufacturer.resolver';

@Module({
  providers: [ManufacturerResolver, ManufacturerService],
})
export class ManufacturerModule {}
