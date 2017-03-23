"use strict"

var u = require ('./utils')
//import u from './utils'

let state = {
    finished: false,
    stepIndex: 0,
    open: false,
    id: 0,
    process: {
        name: '',
        acronym: '',
        description: '',
        type: 1,
        help: '',
        status: 'parametrization',
        version: '1.0',
        notifySupervisorOnEnd: false,
        notifySupervisorOnError: false,
        AssignSupervisorOnError: false,
        blockProcessExecution: false,
        supervisorTeam: [
            {
                name: 'John Smith',
                function: 'Manager'
            },
            {
                name: 'Mary Jane',
                function: 'Analyst'
            },
            ,
            {
                name: 'John Doe',
                function: 'Analyst'
            }
        ],
        step: [
            {
                order: 1,
                type: 'PPO',
                name: 'Get PPO customer data'
            },
            {
                order: 2,
                type: 'Other',
                name: 'Get PPO customer data'
            },
            {
                order: 3,
                type: 'More flow',
                name: 'Get PPO customer data'
            }
        ],
        tempStepName: '',
        tempStepType: 1
    },
    info: [
        { id: '1:1', name: 'choice1-crit1', description: 'teste1' },
        { id: '1:2', name: 'choice1-crit2', description: 'teste2' },
        { id: '1:3', name: 'choice1-crit3', description: 'teste3' },
        { id: '2:1', name: 'choice2-crit1', description: 'teste4' },
        { id: '2:2', name: 'choice2-crit2', description: 'teste5' },
        { id: '2:3', name: 'choice2-crit3', description: 'teste6' },
        { id: '3:1', name: 'choice3-crit1', description: 'teste7' },
        { id: '3:2', name: 'choice3-crit2', description: 'teste8' },
        { id: '3:3', name: 'choice3-crit3', description: 'teste9' },
    ],
    listOfInfo: [
        {
            title: 'test1 for sorting',
            description: 'test description',
            avatar: '',
            votes: 4,
            blockThumbUp: false,
            blockThumbDown: true
        },
        {
            title: 'test2 for sorting',
            description: 'test description',
            avatar: '',
            votes: 2,
            blockThumbUp: false,
            blockThumbDown: true
        },
        {
            title: 'test3 for sorting',
            description: 'test description',
            avatar: '',
            votes: 5,
            blockThumbUp: false,
            blockThumbDown: true
        }
    ]
}


//filter
let analystsFilter = state.process.supervisorTeam.filter(function (supervisor) {
    return supervisor.function === 'Analyst'
})
//filterArow
let analystsFilterA = state.process.supervisorTeam.filter(supervisor => supervisor.function === 'Analyst')

//map
let analystsMap = state.process.supervisorTeam.map(function (supervisor) {
    return supervisor.name + ' is a ' + supervisor.function
})
//mapArrow
let analystsMapA = state.process.supervisorTeam.map(supervisor => supervisor.name + ' is a ' + supervisor.function)

//reduce
let stepReduce = state.process.step.reduce(function (sum, step) {
    return sum + step.order
}, 0)

//Get max array value
let arr = [2, 5, 9, 10]
//maxValueInArray = Math.max.apply(null, arr)

//get max order from array step
let orderArray = state.process.step.map(function (step) {
    return step.order
})
let maxOrder = Math.max.apply(null, orderArray)

//console.log(maxOrder)
//console.log (analystsFilterA)
//console.log (analystsMapA)
//console.log (stepReduce)
//console.log(state)

//Find info cell in table
let i = state.info.filter(info => info.id === '2:1')[0].name
//console.log(i)

//Sort list per votes descending
/*
let result = state.listOfInfo.sort(function(a,b){
            return parseFloat(b.votes) - parseFloat(a.votes)
        })
console.log(result)
*/

//Sort list per votes descending generalized function
/*
function sortListOfObjects(list, attr){
    list.sort(function(a, b){
        return parseFloat(b[attr]) - parseFloat (a[attr])
    })
}
*/

//utils.sortListOfObjects(state.listOfInfo, 'votes')
//console.log(state.listOfInfo)


