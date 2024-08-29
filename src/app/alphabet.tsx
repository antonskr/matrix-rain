class Alphabet {
	static katakana =
		'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
	static latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	static nums = '0123456789';
	static chars = this.katakana + this.latin + this.nums;
}

export default Alphabet;
