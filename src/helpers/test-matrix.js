var decision= {
            criteria: [
                { id: 2, name: 'criteria1', description: 'desc Crit1' },//Starts at 2 for cell handling
                { id: 3, name: 'criteria2', description: 'desc Crit2' },
                { id: 4, name: 'criteria3', description: 'desc Crit3' }
            ],
            choices: [
                { id: 2, name: 'choice1', description: 'desc Choice1' },
                { id: 3, name: 'choice2', description: 'desc Choice2' },
                { id: 4, name: 'choice3', description: 'desc Choice3' }
            ],
            info: [
                { id: '2:2', name: 'choice1-crit1', description: 'teste1' },
                { id: '2:3', name: 'choice1-crit2', description: 'teste2' },
                { id: '2:4', name: 'choice1-crit3', description: 'teste3' },
                { id: '3:2', name: 'choice2-crit1', description: 'teste4' },
                { id: '3:3', name: 'choice2-crit2', description: 'teste5' },
                { id: '3:4', name: 'choice2-crit3', description: 'teste6' },
                { id: '4:2', name: 'choice3-crit1', description: 'teste7' },
                { id: '4:3', name: 'choice3-crit2', description: 'teste8' },
                { id: '4:4', name: 'choice3-crit3', description: 'teste9' },
            ]
    }

let XXX = decision.criteria[0].id
let len=decision.criteria.length
let result=decision.criteria[decision.criteria.length-1].id
console.log(result)

