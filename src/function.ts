import axios from 'axios';
function sum(a = 1, b = 2) {
  return a + b;
}

function reduce(a = 1, b = 3) {
  return b - a;
}

function getIntArray(num: number) {
  if (!Number.isInteger(num)) {
    throw Error('"getIntArray"只接受整数类型的参数');
  }

  const result = [];
  for (let i = 0, len = num; i < len; i++) {
    result.push(i);
  }

  return result;
}
function getInfo() {
  return axios
    .get(' https://www.easy-mock.com/mock/5bc5456f49027948642034b2/baseurl/userinfo')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

interface SquareConfig {
  color?:string;
  height?:number;
}

function createSquare(config:SquareConfig):{color:string;area:number}{
  let newSquare={color:'white',area:100};
  if(config.color){
    newSquare.color=config.color;
  }
  if(config.height){
    newSquare.area=config.height*config.height;
  }
  return newSquare;
}
let mySquare = createSquare({color:'black'})
let a :number[]=[1,2,3,4]
let ro: ReadonlyArray<number>=a;

a= ro as number[]

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch:SearchFunc;
mySearch=function(src,sub){
  let result=src.search(sub);
  return result > -1;
}
// module.exports = { sum , reduce};
export default { sum, reduce, getIntArray, getInfo };
