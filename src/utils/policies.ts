import { Project, TeamMember } from "../types"

export const isManager = (idManager : Project['manager'], idUser : TeamMember['idUser']) => {
    return idManager === idUser
}