import { logger } from "../../../../config";
import { EventHandler } from "../../../../utils";

export class NotificationController {
  handleCreateEvent: EventHandler = (data) => {
    logger.info('Received create event', data);
  }

  handleDeleteEvent: EventHandler = (data) => {
    logger.info('Received delete event', data);
  }
}
