const { spawn } = require('child_process');

export function execute(command: string, args: string[]): Promise<string>{
    return new Promise((res) => {
        const child = spawn(command, args);
        child.stdout.on('data', (buffer)=> {
            res(buffer.toString())
        })
    })
}

