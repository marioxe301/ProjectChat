import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  SOCKET_ENDPOINT: string = 'localhost:3000';

  message = new FormControl('');

  socket: any;

  constructor() {
    this.setupSocketConnection();
  }

  ngOnInit(): void {
  }

  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
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
    this.socket.emit('message', this.message);
    console.log("emmited");
    const element = document.createElement('li');
    element.innerHTML = this.message.value;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message.setValue('');
  }

}
