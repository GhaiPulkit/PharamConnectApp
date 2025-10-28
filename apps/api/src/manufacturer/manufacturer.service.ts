import { Injectable } from '@nestjs/common';
import { CreateManufacturerInput } from './dto/create-manufacturer.input';
import { UpdateManufacturerInput } from './dto/update-manufacturer.input';

@Injectable()
export class ManufacturerService {
  create(createManufacturerInput: CreateManufacturerInput) {
    return 'This action adds a new manufacturer';
  }

  findAll() {
    return `This action returns all manufacturer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacturer`;
  }

  update(id: number, updateManufacturerInput: UpdateManufacturerInput) {
    return `This action updates a #${id} manufacturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturer`;
  }
}
