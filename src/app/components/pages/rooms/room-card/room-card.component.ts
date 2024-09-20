import { Component, Input } from '@angular/core';
import { RoomButtonsComponent } from '../room-buttons/room-buttons.component';
import { Room } from '../rooms.types';



@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [RoomButtonsComponent],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room!: Room;
}
