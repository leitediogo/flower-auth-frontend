exports.decisions = [{
    name: 'decision One name',
    description: 'decision One description',
    status: 'Creating',//Initial status || Creating, Colaborating, Deciding
    category: 'Consumer',
    createdBy: 'Diogo Leite', //profile.name,
    owner: 'Diogo Leite', //profile.name,
    ownerAvatar: '', //profile.picture,
    participants: [
        { id: 1, name: 'Diogo Leite', description: 'Diogo description', role: 'owner' },
        { id: 2, name: 'Ricardo Mateus', description: 'Ricardo description', role: 'participant' },
    ],
    criteria: [
        { id: 2, name: 'criteria1', description: 'desc Crit1' },//Starts at 2 for cell handling
        { id: 3, name: 'criteria2', description: 'desc Crit2' },
        { id: 4, name: 'criteria3', description: 'desc Crit3' }],
    choices: [
        { id: 2, name: 'choice1', description: 'desc Choice1' },
        { id: 3, name: 'choice2', description: 'desc Choice2' },
        { id: 4, name: 'choice3', description: 'desc Choice3' }
    ],
    info: [
        {
            id: '2:2', name: '', listOfInfo: [
                {
                    title: 'title1',
                    description: 'description title1',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title2',
                    description: 'description title2',
                    avatar: '', //profile.picture,
                    votes: 1,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },

        {
            id: '2:3', name: '', listOfInfo: [
                {
                    title: 'title3',
                    description: 'description title3',
                    avatar: '', //profile.picture,
                    votes: 3,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title3',
                    description: 'description title3',
                    avatar: '', //profile.picture,
                    votes: 2,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '2:4', name: '', listOfInfo: [
                {
                    title: 'title4',
                    description: 'description title4',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title5',
                    description: 'description title5',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '3:2', name: '', listOfInfo: [
                {
                    title: 'title6',
                    description: 'description title6',
                    avatar: '', //profile.picture,
                    votes: 5,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title7',
                    description: 'description title7',
                    avatar: '', //profile.picture,
                    votes: 6,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '3:3', name: '', listOfInfo: [
                {
                    title: 'title8',
                    description: 'description title8',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title9',
                    description: 'description title9',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '3:4', name: '', listOfInfo: [
                {
                    title: 'title10',
                    description: 'description title10',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title11',
                    description: 'description title11',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '4:2', name: '', listOfInfo: [
                {
                    title: 'title12',
                    description: 'description title12',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title13',
                    description: 'description title13',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '4:3', name: '', listOfInfo: [
                {
                    title: 'title14',
                    description: 'description title14',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title15',
                    description: 'description title15',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
        {
            id: '4:4', name: '', listOfInfo: [
                {
                    title: 'title16',
                    description: 'description title16',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                },
                {
                    title: 'title17',
                    description: 'description title17',
                    avatar: '', //profile.picture,
                    votes: 0,
                    blockThumbUp: false,
                    blockThumbDown: true
                }
            ]
        },
    ]
}
]