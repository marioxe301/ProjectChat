import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  SOCKET_ENDPOINT: string = 'localhost:3000';

  message: string;

  socket: any;

  channelId: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.channelId = this.activatedRoute.snapshot.paramMap.get('channelId');
   }

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string, id: string) => {
      console.log(data, id);
      if (data && id == this.channelId) {
       const element = document.createElement('li');
       element.innerHTML = data;
       element.style.background = 'white';
       element.style.padding =  '15px 30px';
       element.style.margin = '10px';
       document.getElementById('message-list').appendChild(element);
       }
     });
  }

  sendMessage() {
    this.socket.emit('message', this.channelId, this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = "";
  }

}