import {Injectable} from '@angular/core'
import { BASE_URL } from '../constants/global'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public readonly url = BASE_URL+"/chat"
  public readonly topicMessage = '/send/chat/'
  public readonly topicChat = '/chat/'

}
