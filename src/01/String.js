// ES5 문법
var string1 = '안녕하세요';
var string2 = '반갑습니다';
var greeting = string1 + ' ' + string2;
//안녕하세요 반갑습니다.
var product = {
    name: '도서',
    price: '4200원'
};
var message = '제품' + product.name + '의 가격은' + product.price + '입니다';
//제품 도서의 가격은 4200원입니다
var multiLine = '문자열1\n문자열2';
//문자열1
//문자열2

var value1 = 1;
var value2 = 2;
var boolValue = false;
var operator1 = '곱셈값은 ' + value1 * value2 + '입니다. ';
var operator2 = '불리언값은 ' + (boolValue ? '참' : '거짓') + '입니다. ';
//불리언값은 거짓입니다. 
var array1 = ['one', 'two'];
var array2 = ['three', 'four'];
var combined = [...array1, ...array2];
// combined = ['one', 'two', 'three', 'four'];
// || empty 연산자 와 조합하면 추출한 배열 요소가 없을때는 기본값 지정
var three = array1[2] || 'empty';