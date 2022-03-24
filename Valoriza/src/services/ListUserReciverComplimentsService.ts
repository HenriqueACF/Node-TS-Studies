import { getCustomRepository } from "typeorm";
import {ComplimentsRepository} from "../repositories/ComplimentsRepository";

export class ListUserReceiveComplimentsService {
    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepository)

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id,
            },
            relations: ["userSender", "userReceiver", "tag"],
        });

        return compliments;
    }
}
