// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, NotFoundException } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

// DTO pour validation
class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  status?: string;
}

@Controller('users')
export class UsersController {
  private users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
  ];

  @Get()
  getAllUsers(@Query('status') status?: string) {
    if (status) return this.users.filter(u => u.status === status);
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    const user = this.users.find(u => u.id === +id);
    if (!user) throw new NotFoundException(`Utilisateur ${id} introuvable`);
    return user;
  }

  @Post()
createUser(@Body() userData: CreateUserDto) {
  const newUser = { 
    id: Date.now(), 
    username: userData.username, 
    email: userData.email, 
    status: userData.status || 'inactive' // valeur par défaut si undefined
  };
  this.users.push(newUser);
  return newUser;
}


  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userData: Partial<CreateUserDto>) {
    const user = this.users.find(u => u.id === +id);
    if (!user) throw new NotFoundException(`Utilisateur ${id} introuvable`);
    Object.assign(user, userData);
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    const index = this.users.findIndex(u => u.id === +id);
    if (index === -1) throw new NotFoundException(`Utilisateur ${id} introuvable`);
    const removedUser = this.users.splice(index, 1);
    return { message: `Utilisateur ${id} supprimé`, removedUser };
  }
}
