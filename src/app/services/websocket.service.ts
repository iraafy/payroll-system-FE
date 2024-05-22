import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public readonly url = 'http://192.168.20.75:8080/chat'
  public readonly topicMessage = '/send/chat/'
  public readonly topicChat = '/chat/'

}
