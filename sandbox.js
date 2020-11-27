
// let arr = ['aku', 'bila', 'cokelat', 'denmark']


let a = Math.floor(Math.random()*4)
let b = Math.floor(Math.random()*4)
let c = Math.floor(Math.random()*4)
let d = Math.floor(Math.random()*4)

while(b == a){
    b = Math.floor(Math.random()*4)
}

while (c == b || c == a){
    c = Math.floor(Math.random()*4)
}

while (d == a || d == b || d == c){
    d = Math.floor(Math.random()*4)
}

console.log(a, b, c, d);