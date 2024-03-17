import { User } from "../models"
import {EpisodeInstance } from "../models/Episode"
import { UserCreationAttributes } from "../models/User"

function filterLastEpisodesByCourse(episodes:EpisodeInstance[]){
    const coursesOnList:number[]=[]

    const lastEpisodes = episodes.reduce((currentlist,episode)=>{
if(!coursesOnList.includes(episode.courseId)){
    coursesOnList.push(episode.courseId)
    currentlist.push(episode)
    return currentlist
}

const episodeFromSameCourse = currentlist.find(ep=> ep.courseId === episode.courseId)

if(episodeFromSameCourse!.order> episode.order) return currentlist

const listWithoutEpisodeFromSameCourse = currentlist.filter(ep=>ep.courseId!==episode.courseId)
listWithoutEpisodeFromSameCourse.push(episode)

return listWithoutEpisodeFromSameCourse
    }, []as EpisodeInstance[])

return lastEpisodes
}


export const userService = {
    findByEmail:async (email: string) => {
        const user = await User.findOne({
            where:{
                email
            }
        })
        return user
    },

    create: async (attributes:UserCreationAttributes)=>{
        const user = await User.create(attributes)
        return user
    },

    getKeepWatchingList: async (id:number)=>{
        const userWithWatchingEpisodes = await User.findByPk(id, {
            include:{
                association:'Episodes',
                attributes:['id',
                'name',
                'synopsis',
                'order',
                ['video_url','videoUrl'],
                ['seconds_long','secondsLong'],
            ['course_id','courseId']],
                include:[{
                    association:'Course',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url','thumbnailUrl']
                    ],
                    as:'course'
                }],
                through:{
                    as:'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at','updatedAt']
                    ]
                }
            }
        })
        if(!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

        const getKeepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
//@ts-ignore
        getKeepWatchingList.sort((a,b)=>a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)

        return getKeepWatchingList
    }
}
