
function base64Decode(number) {
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
	let rv = 0;
	digits = number.split('');
	for(let i = 0; i < digits.length; i++) {
		rv = (rv * 64) + chars.indexOf(rixits[e]);
	}
	return result;
}

function base64Encode(number){
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
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