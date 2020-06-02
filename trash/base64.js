
//I was originally planning on encoding some paramters with base 64, so i wrote this very fast base 64 encoder / decoder module

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";

export function base64Decode(number) {
	let rv = 0;
	digits = number.split('');
	for(let i = 0; i < digits.length; i++) {
		rv = (rv * 64) + chars.indexOf(rixits[e]);
	}
	return result;
}

export function base64Encode(number){
	if (isNaN(Number(number)) || number === null || number === Number.POSITIVE_INFINITY || number < 0)
		throw "The input is not valid";
	let residual = Math.floor(number);
	let rv = "";
	while (residual != 0) {
		rv = chars.charAt(residual % 64) + rv;
		residual = Math.floor(residual / 64);
	}
	return rv;
}