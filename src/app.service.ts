import { Injectable } from '@nestjs/common';
import axios from 'axios';
import OpenAI from 'openai';
import { userType } from './types';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class AppService {

  openai: OpenAI;
  users: userType[];

  constructor(){
    this.openai = new OpenAI({apiKey: process.env.OPENAI_APIKEY})
    this.users = [{
      id: uuidv4(),
      name: "Steven",
      lastname: "Erraez"
    }]
  }

  async questionGPT(prompt: string){
    return (await this.openai.chat.completions.create({
      messages: [{role: "user", content: prompt}],
      model: "gpt-3.5-turbo"
    })).choices[0]
  }

  async getPosts(){
    return (await axios.get("https://api.unsplash.com/photos/?client_id=tmXX2qlmRsZbsX7eXhvWsY1wfSpKeQj6fU9EQN0fkAw")).data;
  }

  async getUsers(){
    return this.users;
  }

  addUser(user: any){
    const _user = {
      id: uuidv4(),
      ...user
    }
    this.users.push(_user);
    return _user;
  }

  editUser(id: string, user:any){
    const _userIndex = this.users.findIndex(x => x.id.toString() === id);
    this.users[_userIndex] = {...this.users[_userIndex], ...user};
    return this.users[_userIndex];
  }

  deleteUser(id: string){
    this.users = this.users.filter(x => x.id.toString() !== id);
    return this.users;
  }
}