const roadLevelStartPoints = [
    {
        levelStartX: 50,
        levelStartY: 0
    },
    {
        levelStartX: 900,
        levelStartY: 0
    }
]

const startMoney = [5000, 1000];

const roadLevels = [
    [
        {
            startX: 50,
            startY: 0,
            width: 50,
            height: 200,
            collisionSide: 'bottom',
            directionChangeX: 1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 100,
            startY: 150,
            width: 250,
            height: 50,
            collisionSide: 'right',
            directionChangeX: 0,
            directionChangeY: -1,
            color: '#5D12FC'
        }, 
        {
            startX: 300,
            startY: 50,
            width: 50,
            height: 100,
            collisionSide: 'top',
            directionChangeX: 1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 350,
            startY: 50,
            width: 600,
            height: 50,
            collisionSide: 'right',
            directionChangeX: 0,
            directionChangeY: 1,
            color: '#5D12FC'
        }, 
        {
            startX: 900,
            startY: 100,
            width: 50,
            height: 350,
            collisionSide: 'bottom',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 650,
            startY: 400,
            width: 250,
            height: 50,
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: -1,
            color: '#5D12FC'
        }, 
        {
            startX: 650,
            startY: 200,
            width: 50,
            height: 200,
            collisionSide: 'top',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        },         
        {
            startX: 500,
            startY: 200,
            width: 150,
            height: 50,
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: 1,
            color: '#5D12FC'
        },
        {
            startX: 500,
            startY: 250,
            width: 50,
            height: 200,
            collisionSide: 'bottom',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        },
        {
            startX: 300,
            startY: 400,
            width: 200,
            height: 50,
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: -1,
            color: '#5D12FC'
        },
        {
            startX: 300,
            startY: 300,
            width: 50,
            height: 100,
            collisionSide: 'top',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        },
        {
            startX: 50,
            startY: 300,
            width: 250,
            height: 50,
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: 1,
            color: '#5D12FC'
        },
        {
            startX: 50,
            startY: 350,
            width: 50,
            height: 150,
            collisionSide: 'bottom',
            directionChangeX: 0,
            directionChangeY: 1,
            color: 'blue'
        }   
    ],
    [
        {
            startX: 900,
            startY: 0,
            width: 50,
            height: 500, // test if I can set this to 450
            collisionSide: 'bottom',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 750,
            startY: 450,
            width: 150,
            height: 50, 
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: -1,
            color: 'green'
        }, 
        {
            startX: 750,
            startY: 0,
            width: 50,
            height: 450, 
            collisionSide: 'top',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 250,
            startY: 0,
            width: 500,
            height: 50, 
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: 1,
            color: 'green'
        }, 
        {
            startX: 250,
            startY: 50,
            width: 50,
            height: 400, 
            collisionSide: 'bottom',
            directionChangeX: 1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 300,
            startY: 400,
            width: 350,
            height: 50, 
            collisionSide: 'right',
            directionChangeX: 0,
            directionChangeY: -1,
            color: 'green'
        }, 
        {
            startX: 600,
            startY: 100,
            width: 50,
            height: 300, 
            collisionSide: 'top',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 350,
            startY: 100,
            width: 250,
            height: 50, 
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: 1,
            color: 'green'
        }, 
        {
            startX: 350,
            startY: 150,
            width: 50,
            height: 200, 
            collisionSide: 'bottom',
            directionChangeX: -1,
            directionChangeY: 0,
            color: 'blue'
        }, 
        {
            startX: 100,
            startY: 300,
            width: 250,
            height: 50, 
            collisionSide: 'left',
            directionChangeX: 0,
            directionChangeY: 1,
            color: 'green'
        }, 
        {
            startX: 100,
            startY: 350,
            width: 50,
            height: 150, 
            collisionSide: 'bottom',
            directionChangeX: 0,
            directionChangeY: 1,
            color: 'blue'
        }, 
    ]
]
