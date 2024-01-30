import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/gpt")
  questionGPT(@Body() body:any){
    return this.appService.questionGPT(body.message);
  }

  @Post("/users")
  addUser(@Body() body:any){
    return this.appService.addUser(body);
  }

  @Get("/posts")
  getProfiles(){
    return this.appService.getPosts();
  }

  @Get("/users")
  getUsers(){
    return this.appService.getUsers()
  }

  @Put("/users/:id/edit")
  editUser(@Param("id") id: string, @Body() body: any){
    return this.appService.editUser(id, body);
  }

  @Delete("/users/:id/delete")
  deleteUser(@Param("id") id: string){
    return this.appService.deleteUser(id);
  }
}
