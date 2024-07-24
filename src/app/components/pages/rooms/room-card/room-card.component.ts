import { Component, Input } from '@angular/core';

// Components
import { RoomButtonsComponent } from '../room-buttons/room-buttons.component';

// Types
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
