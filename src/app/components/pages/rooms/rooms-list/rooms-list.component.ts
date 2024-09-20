import { Component, Input } from '@angular/core';
import { RoomCardComponent } from '../room-card/room-card.component';
import { Room } from '../rooms.types';



@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent {
  @Input() rooms: Room[] = [];
}
