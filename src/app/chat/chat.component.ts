import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor, *ngIf, and Pipes
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  date: string;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule & FormsModule
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatSessions: ChatSession[] = [];
  selectedSession: ChatSession | null = null;
  userInput: string = '';

  ngOnInit(): void {
    this.loadChatHistory();
  }

  loadChatHistory() {
    const storedChats = localStorage.getItem('chatSessions');
    if (storedChats) {
      this.chatSessions = JSON.parse(storedChats);
      this.chatSessions = this.chatSessions.filter(session => {
        const sessionDate = new Date(session.date);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return sessionDate >= sevenDaysAgo;
      });
    }
  }

  selectChat(session: ChatSession) {
    this.selectedSession = session;
  }

  startNewChat() {
    const newSession: ChatSession = {
      id: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      messages: []
    };
    this.chatSessions.unshift(newSession);
    this.selectedSession = newSession;
    this.saveChatHistory();
  }

  sendMessage() {
    if (this.userInput.trim() && this.selectedSession) {
      const userMessage: ChatMessage = {
        text: this.userInput,
        sender: 'user',
        timestamp: new Date()
      };
      this.selectedSession.messages.push(userMessage);
      this.userInput = '';
      this.getBotResponse();
      this.saveChatHistory();
    }
  }

  getBotResponse() {
    setTimeout(() => {
      if (this.selectedSession) {
        const botMessage: ChatMessage = {
          text: 'This is a placeholder response.',
          sender: 'bot',
          timestamp: new Date()
        };
        this.selectedSession.messages.push(botMessage);
        this.saveChatHistory();
      }
    }, 1000);
  }

  saveChatHistory() {
    localStorage.setItem('chatSessions', JSON.stringify(this.chatSessions));
  }
}
