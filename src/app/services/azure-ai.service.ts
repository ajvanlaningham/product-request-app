import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureAiService {
  private apiUrl = 'https://YOUR_AZURE_OPENAI_ENDPOINT/openai/deployments/YOUR_MODEL_NAME/completions?api-version=2023-06-01-preview';
  private apiKey = 'YOUR_AZURE_API_KEY';

  constructor(private http: HttpClient) {}

  sendToAzureAI(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
