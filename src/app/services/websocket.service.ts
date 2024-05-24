import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public readonly url = 'http://localhost:8080/chat'
  public readonly topicMessage = '/send/chat/'
  public readonly topicChat = '/chat/'

}
